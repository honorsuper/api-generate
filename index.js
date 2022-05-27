const vscode = require("vscode");
import { generateApi } from "./src/start";

function activate(context) {
  let commandOfGetFileState = vscode.commands.registerCommand(
    "start",
    generateApi
  );

  context.subscriptions.push(commandOfGetFileState);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
