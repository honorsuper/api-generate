const vscode = require("vscode");
const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("11");
  vscode.window.showWarningMessage("插件激活");

  // 注册命令
  let commandOfGetFileState = vscode.commands.registerCommand(
    "start",
    (uri) => {
      // 文件路径
      const filePath = uri.path.substring(1);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`);
        }

        if (stats.isDirectory()) {
          vscode.window.showWarningMessage(
            `检测的是文件夹，不是文件，请重新选择！！！`
          );
        }

        if (stats.isFile()) {
          const size = stats.size;
          const createTime = stats.birthtime.toLocaleString();
          const modifyTime = stats.mtime.toLocaleString();

          vscode.window.showInformationMessage(
            `
					文件大小为:${size}字节;
					文件创建时间为:${createTime};
					文件修改时间为:${modifyTime}
				`,
            { modal: true }
          );
        }
      });

      const stats = fs.statSync(filePath);
      console.log("stats", stats);
      console.log("isFile", stats.isFile());
    }
  );

  context.subscriptions.push(commandOfGetFileState);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
