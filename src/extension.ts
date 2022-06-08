import * as vscode from "vscode";
import { start } from "./start";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("start", start);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
