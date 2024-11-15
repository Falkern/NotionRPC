# NotionRPC

NotionRPC is a Node.js script that updates your Discord Rich Presence status based on the active page in your Notion application. This script is designed to work on Windows operating systems.

## Features

- Automatically detects the active Notion page.
- Updates Discord Rich Presence with the current Notion page title.
- Refreshes the status every second.

## Prerequisites

- Windows operating system
- Node.js installed
- Discord application installed and running

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/NotionRPC.git
   cd NotionRPC
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

## Usage

1. Run the script:

   ```sh
   node index.js
   ```

2. Ensure that Notion is running and you are logged into Discord.

## Configuration

- `clientId`: The client ID for your Discord application.
- `refreshIntervalMs`: The interval in milliseconds to refresh the Notion process check.
- `updateCooldownMs`: The cooldown period in milliseconds between presence updates.

## Troubleshooting

- Ensure that Notion is running and has an active window.
- Check that you are logged into Discord.
- Verify that the script is running on a Windows operating system.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [node-process-windows](https://www.npmjs.com/package/node-process-windows)
- [discord-rpc](https://www.npmjs.com/package/discord-rpc)
