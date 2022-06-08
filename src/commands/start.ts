import * as vscode from "vscode";
import * as docgen from "react-docgen-typescript";
import * as fs from "fs";
import { format } from "prettier";

const options = {
  savePropValueAsString: true,
};
function commentToMarkDown(componentInfo: docgen.ComponentDoc) {
  let { props } = componentInfo;
  const markdownInfo = renderMarkDown(props);
  const content = format(markdownInfo, {
    parser: "markdown",
  });
  return content;
}

function renderMarkDown(props: docgen.Props) {
  return `
  # 组件
  
  ## 参数 Props

  | 参数 |  说明 | 类型 | 默认值 | 必填 |
  | --- | --- | --- | --- | ---|
  ${Object.keys(props)
    .map((key) => renderProp(key, props[key]))
    .join("")}
  `;
}

function getType(type: docgen.PropItemType) {
  const handler: any = {
    enum: (type: docgen.PropItemType) =>
      type.value.map((item: any) => item.value.replace(/'/g, "")).join(" \\| "),
    union: (type: any) =>
      type.value.map((item: any) => item.name).join(" \\| "),
  };
  if (typeof handler[type.name] === "function") {
    return handler[type.name](type).replace(/\|/g, `&nbsp;&#124;&nbsp;`);
  } else {
    return type.name.replace(/\|/g, `&nbsp;&#124;&nbsp;`);
  }
}

const renderProp = (
  name: string,
  {
    type = { name: "-" },
    defaultValue = { value: "-" },
    required = false,
    description = "-",
  }
) => {
  if (defaultValue === null) {
    return `| ${name} | ${description || "-"}|${getType(type)} | "-" | ${
      required ? "true" : "false"
    } |
    `;
  }
  return `| ${name} | ${description || "-"}|${getType(type)} | ${
    defaultValue.value.replace(/\|/g, "<span>|</span>") || "-"
  } | ${required ? "true" : "false"} |
  `;
};

export async function generate(file: vscode.Uri) {
  const filePath = file.path.substring(1);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`);
    }

    if (stats.isDirectory()) {
      return vscode.window.showErrorMessage(
        `检测的是文件夹，不是文件，请重新选择！！！`
      );
    }
    if (!filePath.endsWith(".tsx")) {
      return vscode.window.showErrorMessage(
        `当前文件不是tsx组件，请重新选择！！！`
      );
    }

    if (stats.isFile()) {
      const res = docgen.parse(filePath, options);
      if (res.length === 0) {
        return vscode.window.showErrorMessage(
          `当前组件不符合开发规范，请修改后重新尝试`
        );
      }
      vscode.env.clipboard.writeText(commentToMarkDown(res[0]));
      vscode.window.showInformationMessage("API文档已复制到剪切板，及时粘贴");
    }
  });
}
