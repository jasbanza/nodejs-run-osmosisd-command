# nodejs-run-osmosisd-command
### Nodejs helper function to spawn an osmosisd child-process as a promise, and resolve the json response.

This Node.js module allows you to execute Osmosisd commands and retrieve the results as JSON. It also automatically handles certain Windows-specific functionality by prepending "wsl" to commands when running on a Windows operating system. Additionally, it includes a feature to add the --keyring-backend test option to Osmosisd transaction commands to avoid entering the Osmosisd keychain password during execution.

## Installation
You can install this module using npm:

```bash
npm install nodejs-run-osmosisd-command
```

## Usage
Import the module and use the runOsmosisdCommand function to execute Osmosisd commands:

```js
import runOsmosisdCommand from 'nodejs-run-osmosisd-command';

// Example usage
(async () => {
  try {
    const command = 'osmosisd q poolmanager pool 1';
    const result = await runOsmosisdCommand(command);
    console.log(JSON.parse(result.stdout)); // The JSON output of the Osmosisd command
  } catch (error) {
    console.error('Error:', error.message || error);
  }
})();
```

## Windows Compatibility
This module automatically detects if your operating system is Windows and adds the "wsl" prefix to commands when necessary.

## Transaction Commands
This module automatically appends the `--keyring-backend test` flag if a transaction command is detected. This is to avoid entering the Osmosisd keychain password request. It is assumed that your keyring-backend is set to test for the wallet you are transacting from.

## API Reference

### `runOsmosisdCommand(command: string): Promise<{ stdout: string, stderr: string } | Error>`

Execute an Osmosisd command and return the result as JSON.

- `command`: The Osmosisd command to be executed (e.g., "osmosisd q poolmanager pool 1", "osmosisd tx ...").
- Returns a promise that resolves with an object containing `stdout` (string JSON output) and `stderr` (error output) or rejects with an error if the command execution fails.

## License

This project is licensed under the MIT License. You can find the full license text in the [LICENSE.md](LICENSE.md) file included with this package.
