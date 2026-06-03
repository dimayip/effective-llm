# Effective LLM

**编写大语言模型应用程序的 50 条具体方法**

> 适用读者：已经会用 LLM API 写过 Demo，正在或即将把它推进生产环境的工程师。

---

## 这是什么

一本关于 LLM 失败模式与工程对策的书。模型每代都在变，但它出错的方式一直是那几种——算术出错、长上下文丢信息、谄媚用户、JSON 字段拼错、被注入夺权……

这本书回答一个工程师每天都要回答的问题：

> **当一个 LLM 用例失败时，我该用 Prompt、用 RAG、用 Tool、用解码控制，还是干脆放弃这条路？**

核心框架：把所有失败模式归到三档——

| 档位 | 含义 | 对策 |
|------|------|------|
| **A · 可工程根治** | 接入正确手段后误差率 < 1% | RAG / Tool Use / Schema / 解码控制 |
| **B · 可大幅缓解** | 概率显著下降但仍偶发，1%–10% | Self-Consistency / 跨家族裁判 / Spotlighting … |
| **C · 当前无解** | 推理侧只能识别 + 规避 | 业务上绕开 / KG / 规则 / 监控 |

## 项目结构

```
effective-llm/
├── effective-llm.md          # 全书正文（Markdown 源文件）
├── quickly/
│   ├── AGENTS.md             # Agent 运行时合规手册（复制到项目根目录即可生效）
│   └── HUMANS.md             # 人类可读的三档速览（5 分钟建立心智模型）
├── site/                     # VitePress 在线阅读站点
├── make-book.md              # 书籍构建与发布流程
├── DESIGN-HANDOFF.md         # 设计体系交接文档
└── README.md                 # 本文件
```

## 快速开始

### 在线阅读

访问 VitePress 站点浏览全书。

### 读完即用

1. 把 [`quickly/AGENTS.md`](./quickly/AGENTS.md) 复制到你的项目根目录——支持 [agents.md 协议](https://agents.md/) 的 AI Agent 会自动加载并强制遵守其中的规则
2. 让团队读 [`quickly/HUMANS.md`](./quickly/HUMANS.md)——5 分钟建立"先识别失败模式，再选对策"的心智模型

### 本地构建

```bash
# 安装依赖
cd site && npm install

# 开发预览
npm run docs:dev

# 构建静态站点
npm run docs:build
```

## 核心原则（三句话）

1. **把 LLM 当一个会出错的概率系统，再用确定性系统把它包起来。**
2. **能用工具的不要用 Prompt，能用 Schema 的不要用工具，能用确定代码的不要用 Schema。**
3. **C 档（训练侧问题）在系统设计阶段绕开——它不是 prompt 问题。**

## License

MIT
