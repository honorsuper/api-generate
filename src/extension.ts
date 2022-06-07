import * as vscode from "vscode";
import { generateApi } from "./start";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "tsx-api-generate" is now active!'
  );

  let disposable = vscode.commands.registerCommand("start", generateApi);

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
