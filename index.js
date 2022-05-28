const vscode = require("vscode");
const { generateApi } = require("./src/start");

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
