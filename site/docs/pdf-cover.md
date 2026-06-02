---
layout: page
---

<div class="pdf-cover">
  <div class="cover-content">
    <h1 class="cover-title">Effective LLM</h1>
    <p class="cover-subtitle">编写大语言模型应用程序的 50 条具体方法</p>
    <div class="cover-divider"></div>
    <p class="cover-tagline">适用读者：已经会用 OpenAI / Anthropic / 开源 LLM API 写过 Demo，正在或即将把它推进生产环境的工程师。</p>
    <div class="cover-features">
      <div class="cover-feature">
        <strong>A 档 · 可工程根治</strong>
        <span>RAG、Tool、Schema、解码控制能把错误率压到 &lt; 1%</span>
      </div>
      <div class="cover-feature">
        <strong>B 档 · 可大幅缓解</strong>
        <span>多采样、跨家族裁判、Spotlighting 等把概率事件摊薄到 1%-10%</span>
      </div>
      <div class="cover-feature">
        <strong>C 档 · 当前无解</strong>
        <span>反转诅咒、组合墙、否定盲、CoT 不忠实，业务上必须绕开</span>
      </div>
    </div>
  </div>
</div>

<style>
.pdf-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  text-align: center;
}

.cover-content {
  max-width: 600px;
}

.cover-title {
  font-size: 3rem !important;
  font-weight: 800 !important;
  line-height: 1.2 !important;
  background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem !important;
}

.cover-subtitle {
  font-size: 1.4rem;
  color: var(--vp-c-text-1);
  margin-top: 0.5rem;
}

.cover-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(120deg, #bd34fe, #41d1ff);
  margin: 2rem auto;
  border-radius: 2px;
}

.cover-tagline {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.cover-features {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.cover-feature {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border-left: 3px solid;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
}

.cover-feature:nth-child(1) { border-color: #41d1ff; }
.cover-feature:nth-child(2) { border-color: #bd34fe; }
.cover-feature:nth-child(3) { border-color: #f5a623; }

.cover-feature strong {
  font-size: 0.95rem;
}

.cover-feature span {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
