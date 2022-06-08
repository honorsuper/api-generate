import * as vscode from "vscode";
import { reactDocgen } from "./commands/start";

export function activate(context: vscode.ExtensionContext) {
  const copyAllReactDocCmd = vscode.commands.registerCommand(
    "start",
    reactDocgen
  );

  context.subscriptions.push(copyAllReactDocCmd);
}

export function deactivate() {}
