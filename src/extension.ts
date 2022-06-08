import * as vscode from "vscode";
import { generate } from "./commands/start";

export function activate(context: vscode.ExtensionContext) {
  const copyAllReactDocCmd = vscode.commands.registerCommand("start", generate);

  context.subscriptions.push(copyAllReactDocCmd);
}

export function deactivate() {}
