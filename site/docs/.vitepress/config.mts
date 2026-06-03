import { defineConfig, type DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = [
  {
    text: '前言',
    link: '/preface',
  },
  {
    text: 'Part I · 理解 LLM 的本质',
    collapsible: true,
    items: [
      { text: 'Chapter 1 · 把 LLM 当作概率分布生成器', link: '/part1/chapter1' },
      { text: 'Chapter 2 · 识别可解、可缓解、不可解的失败模式', link: '/part1/chapter2' },
    ],
  },
  {
    text: 'Part II · 用工程手段根治（A 档）',
    collapsible: true,
    items: [
      { text: 'Chapter 3 · 用工具替代心算', link: '/part2/chapter3' },
      { text: 'Chapter 4 · 用 RAG 替代记忆', link: '/part2/chapter4' },
      { text: 'Chapter 5 · 用 Schema 替代格式自由', link: '/part2/chapter5' },
      { text: 'Chapter 6 · 用解码控制约束输出形态', link: '/part2/chapter6' },
      { text: 'Chapter 7 · 用任务分解处理多步逻辑', link: '/part2/chapter7' },
    ],
  },
  {
    text: 'Part III · 用统计手段缓解（B 档）',
    collapsible: true,
    items: [
      { text: 'Chapter 8 · 直面 Lost in the Middle', link: '/part3/chapter8' },
      { text: 'Chapter 9 · 消除评判的偏差', link: '/part3/chapter9' },
      { text: 'Chapter 10 · 缩小幻觉的爆发面', link: '/part3/chapter10' },
      { text: 'Chapter 11 · 处理推理与谄媚', link: '/part3/chapter11' },
      { text: 'Chapter 12 · 知识冲突与上下文优先', link: '/part3/chapter12' },
      { text: 'Chapter 13 · Prompt Injection 与 Jailbreak 防御', link: '/part3/chapter13' },
      { text: 'Chapter 14 · 多轮对话保真度', link: '/part3/chapter14' },
    ],
  },
  {
    text: 'Part IV · 识别不可解的失败（C 档）',
    collapsible: true,
    items: [
      { text: 'Chapter 15 · 与 Transformer 的结构边界共处', link: '/part4/chapter15' },
      { text: 'Chapter 16 · 评估的元问题', link: '/part4/chapter16' },
    ],
  },
  {
    text: 'Part V · 上线与监控',
    collapsible: true,
    items: [
      { text: 'Chapter 17 · 模型上线前的体检', link: '/part5/chapter17' },
      { text: 'Chapter 18 · 上线后的持续监控', link: '/part5/chapter18' },
    ],
  },
  {
    text: '附录',
    collapsible: true,
    items: [
      { text: 'A · Things to Remember 速查表', link: '/appendix/a' },
      { text: 'B · 论文与延伸阅读索引', link: '/appendix/b' },
      { text: 'C · 配套文档与快速上手', link: '/appendix/c' },
    ],
  },
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'Effective LLM',
  description: '编写大语言模型应用程序的 50 条具体方法',
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '阅读', link: '/preface' },
      { text: '速查表', link: '/appendix/a' },
      { text: '下载 PDF', link: '/effective-llm.pdf', target: '_blank', rel: 'noopener' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dimayip/effective-llm' },
    ],

    footer: {
      message: 'Effective LLM',
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
