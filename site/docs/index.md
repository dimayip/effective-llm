---
layout: home

hero:
  name: "Effective LLM"
  text: "编写大语言模型应用程序的 50 条具体方法"
  tagline: 适用读者：已经会用 OpenAI / Anthropic / 开源 LLM API 写过 Demo，正在或即将把它推进生产环境的工程师。
  actions:
    - theme: brand
      text: 开始阅读
      link: /preface
    - theme: alt
      text: 速查表
      link: /appendix/a

features:
  - title: A 档 · 可工程根治
    details: RAG、Tool、Schema、解码控制能把错误率压到 &lt; 1%
  - title: B 档 · 可大幅缓解
    details: 多采样、跨家族裁判、Spotlighting 等把概率事件摊薄到 1%-10%
  - title: C 档 · 当前无解
    details: 反转诅咒、组合墙、否定盲、CoT 不忠实，业务上必须绕开
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
