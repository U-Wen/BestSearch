### 写在前面

**代码全部使用 React Hook + TypeScript，使用以下 React 生态包**

- [React Router](https://reactrouter.com/en/6.8.1/start/overview)
- [React Redux](https://react-redux.js.org/)
- [React Thunk](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware)
- [Material UI](https://mui.com/core/)

**除要求的依赖以外，另外安装了以下依赖，所有依赖版本都是 `@latest`**

- [less](https://less.bootcss.com/)——处理样式，个人不喜欢用sass
- [echarts](https://echarts.apache.org/)——绘制图表
- [ahooks](https://ahooks.js.org/)——性能优化&更丰富的Hook

> 另外：某些样式的地方与视频显示的有些许差异

### 运行环境

  开发时使用到的运行环境，如果无法正常运行，可以尝试将环境更新到一致

- node v16
- npm v8

### 安装依赖

注意：请不要带`$`符号，之后所有`shell`命令都不需要

``` shell
$ npm install
```

### 运行开发环境

``` shell
$ npm run start
```

### 项目结构

```
├── config                   # eject webpack 配置
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── industrial-envir-protect-ui   		# -连接的一般为子仓库【submodule】，子仓库目录结构和src一样
│   ├── actions              # 从model中抽离出的action【不建议，提高复杂性，降低可维护性】
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务【建议在全局model中使用这一层，在页面model中直接yeild call】
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── app.js          	 # 入口文件
│   ├── defaultSettings.js   # 默认设置
│   ├── global.less          # 全局样式
│   └── typing.d.ts          # 全局类型声明文件
├── tests                    # 测试工具
├── README.md
└── package.json
```

