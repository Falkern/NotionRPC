const processWindows = require("node-process-windows");
const RPC = require("discord-rpc");
const os = require("os");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const clientId = "947582103095234562";
const refreshIntervalMs = 1000;
const updateCooldownMs = 15000;
const client = new RPC.Client({ transport: "ipc" });

if (os.platform() !== "win32") {
  console.error("This script is only supported on Windows.");
  process.exit(1);
}

let notionActivePage = null;
let lastPresenceUpdate = 0;

async function enableUTF8Commands() {
  try {
    await exec("@chcp 65001 >nul", { encoding: "UTF-8" });
  } catch (error) {
    console.error("Failed to enable UTF-8 commands:", error);
  }
}

async function fetchNotionProcess() {
  try {
    const processes = await new Promise((resolve, reject) => {
      processWindows.getProcesses((err, processes) => {
        if (err) reject(err);
        else resolve(processes);
      });
    });

    const notionProcess = processes.find(
      (p) => p.processName === "Notion" && p.mainWindowTitle
    );

    notionActivePage = notionProcess ? notionProcess.mainWindowTitle : null;
  } catch (error) {
    console.error("Failed to fetch Notion process:", error);
  }
}

/**
 * Updates the Discord Rich Presence activity.
 * @param {Date} startTimestamp - The session start timestamp.
 */
function updatePresence(startTimestamp) {
  const currentTimestamp = Date.now();

  if (currentTimestamp - lastPresenceUpdate < updateCooldownMs) return;

  const activity = {
    details: "Editing:",
    state: notionActivePage || "No file open",
    startTimestamp,
    largeImageKey: "notion",
    largeImageText: "Notion",
  };

  client
    .setActivity(activity)
    .then(() => {
      console.log(
        `Presence updated to: "${notionActivePage || "No file open"}"`
      );
      lastPresenceUpdate = currentTimestamp;
    })
    .catch((error) => {
      console.error("Failed to update presence:", error);
    });
}

async function main() {
  await enableUTF8Commands();

  setInterval(fetchNotionProcess, refreshIntervalMs);

  client.on("ready", () => {
    console.log("Discord Rich Presence is running...");
    const startTimestamp = new Date();

    setInterval(() => updatePresence(startTimestamp), refreshIntervalMs);
  });

  client.login({ clientId }).catch((error) => {
    console.error("Failed to log in to Discord RPC:", error);
  });
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
});

process.noDeprecation = true;
