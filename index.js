import util from "util";
import { exec } from "child_process";
import os from "os";

/**
 * Check if the current operating system is Windows and prepend "wsl" if true.
 * @returns {string} - The command prefix, which is "wsl" for Windows and an empty string for other OS.
 */
const isWindows = os.platform() === "win32";
const commandPrefix = isWindows ? "wsl " : "";

const execPromise = util.promisify(exec);

/**
 * Execute an osmosisd command and return the result as JSON.
 *
 * @param {string} command - The osmosisd command to be executed. e.g. "osmosisd q poolmanager pool 1", "osmosisd tx ...", etc...
 * @returns {Promise<{stdout: string, stderr: string}>} - A promise that resolves with an object containing stdout and stderr.
 */
async function runOsmosisdCommand(command) {
  try {
    // Check if the command includes "osmosisd tx" and add keyring-backend test option.
    if (command.includes("osmosisd tx")) {
      command = command + " --keyring-backend test -y"; // To avoid entering osmosisd's keychain password request for transactions.
    }
    const response = await execPromise(
      `${commandPrefix}${command} --output json`
    ); // Execute the command and return output as JSON.
    return response; // Returns { stdout: "...", stderr: "..." }
  } catch (error) {
    return error; // Returns any error that occurred during command execution.
  }
}

export default runOsmosisdCommand;
