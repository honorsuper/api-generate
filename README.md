# TSX组件文档生成

使用TypeScript开发React组件时，定义组件的属性类型，并且配合JS Doc注解，就可以自动生成组件属性API文档。

## DEMO演示

基础组件

```tsx
import * as React from "react";
import { Component } from "react";

/**
 * Column properties.
 */
export interface IBaseComponentProps {
  /** 属性一*/
  prop1?: string;
  /** 属性二 */
  prop2: number;
  /**属性三*/
  prop3: () => void;
  /** 属性四 */
  prop4: "option1" | "option2" | "option3";
}

/**
 * Form column.
 */
export class BaseComponent extends Component<IBaseComponentProps, {}> {
  render() {
    return <div>BaseComponent</div>;
  }
}
```

<br/>

API文档

```Plain Text
# 组件

## 参数 Props

| 参数  | 说明   | 类型                                                                | 默认值 | 必填  |
| ----- | ------ | ------------------------------------------------------------------- | ------ | ----- |
| prop1 | 属性一 | string                                                              | -      | false |
| prop2 | 属性二 | number                                                              | -      | true  |
| prop3 | 属性三 | () => void                                                          | -      | true  |
| prop4 | 属性四 | "option1" &nbsp;&#124;&nbsp; "option2" &nbsp;&#124;&nbsp; "option3" | -      | true  |
```


<br/>

操作

在对应的文件下，或者在侧边栏文件名上右击，选择「组件API文档生成」，即可自动生成组件属性API文档，并自动复制到粘贴板，用户直接到对应文件粘贴即可。
