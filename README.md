# 好名有据

## 在线地址

https://hanq233.github.io/

一个纯静态的起名工具。输入姓氏，从真实人名语料中筛选候选名，并按音韵规则（平仄、双声、叠韵、同音避讳）打分排序，支持指定用字、避讳名单与候选列表下载。

本站只保留「他山石」一套名字库：**87190 个候选名**，源自约 16.8 万条现代公开人名（政府公示信息，如积分落户公示等），以及后续补充的博士后名单、国家博后资助、自然科学基金/社科公示、1994–2024 全国大学生数学建模竞赛获奖名单等 12.5 万条公开姓名去重统计后的结果。


## 本仓库的定制说明

- **只保留「他山石」一个名字库**
- 删除「登科录」「古人云」「五道口」「财富论」四个名字库及其出处文件
- 删除 `resource/` 下的全部原始语料（仅保留 `resource/img` 站点图标），仓库体积从约 95MB 降到几 MB
- 删除未被前端引用的 `candidate_name_db.json`、`api/database/source/`、`api/database/extracted/`
- 修复 `.github/workflows/deploy.yml` 中 `on: push:` 的嵌套 bug，并把 pnpm 从 8 升到 9（`pnpm-lock.yaml` 是 lockfileVersion 9.0）

## 如何增删名字

直接编辑 `api/database/candidate/sources/modern_people.candidate_names.json`，它是一个纯字符串数组：

```json
["明远", "清和", "若水"]
```

提交推送后 GitHub Actions 会自动重新构建并发布到 GitHub Pages（约 1 分钟）。

两个前提：

1. 必须是**恰好两个汉字**，多字或少字都不会生效；
2. 两个字都要在 `api/database/candidate/candidate_char_db.json`（共 7474 字）中，否则运行时会被丢弃。该字库**已排除多音字**（如 长 / 乐 / 朝 / 重 / 燕 / 相 / 行），含这些字的名字不会生效。

> 若不想重建语料库，也可以只改这一个分片文件——前端运行期只读它。

## 部署方式

仓库名为 `HanQ233.github.io`，GitHub Pages 发布源为 `gh-pages` 分支。推送到 `master` 后由 `.github/workflows/deploy.yml` 自动构建并发布。

注意：若通过 API（而非网页端或本地 git）提交，Push 事件可能不触发 Actions，需要到 Actions 页面手动 `Run workflow`。

## 本地开发

```bash
npm install
npm run dev:h5        # 打开 http://localhost:10086/
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev:h5` | 本地开发（热更新） |
| `npm run build:h5` | 生产构建到 `dist/` |
| `npm run query:name` | 命令行查名字 |

> 依赖安装建议保留 `.npmrc` 中的 `ignore-scripts=true`，以跳过 `nodejieba`、`better-sqlite3` 等原生模块的编译（数据流水线并不使用它们）。

---

## 原始项目

本项目 fork 并修改自原作者 **YaoZeyuan** 的「好名有据」：

- 原项目仓库：https://github.com/YaoZeyuan/name-generator
- 原作者在线预览：https://name-generator.yaozeyuan.online/

原项目完整的设计说明（诗云思路、音韵学规则、五套名库的来源与采集范围、多音字取音标准等）请查阅其仓库 README 与 `doc/` 目录。本仓库已删除其余四套名库及其原始语料，仅保留「他山石」。
