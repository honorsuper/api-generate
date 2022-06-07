import * as vscode from "vscode";
import { generateApi } from "./start";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("start", generateApi);

  context.subscriptions.push(disposable);
}

export function deactivate() {}
