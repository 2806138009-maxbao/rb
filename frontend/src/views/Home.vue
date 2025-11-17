<template>
  <div class="home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__background" aria-hidden="true">
        <div class="hero__gradient"></div>
        <div class="hero__sun"></div>
        <div class="hero__mist hero__mist--one"></div>
        <div class="hero__mist hero__mist--two"></div>
        <div class="hero__leaves">
          <span
            v-for="leaf in leaves"
            :key="leaf.id"
            class="hero__leaf"
            :style="{
              left: leaf.left,
              top: leaf.top,
              width: `${leaf.size}px`,
              height: `${Math.round(leaf.size * 0.55)}px`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
              background: leaf.gradient,
              opacity: leaf.opacity
            }"
          ></span>
        </div>
      </div>

      <div class="hero__content">
        <p class="hero__eyebrow">2024 秋季版本 · Autumn Refresh</p>
        <h1 id="hero-title">沉浸式 AI 搜题体验，灵感从秋日落叶开始</h1>
        <p class="hero__lead">
          以秋日调色板重新演绎系统主页：柔和渐变、动态微动画与语义驱动的智能搜索交织，
          将文本与图片搜题的旅程变成一段温暖的交互。
        </p>

        <div class="hero__actions" role="group" aria-label="主要操作">
          <button
            v-for="action in heroActions"
            :key="action.label"
            type="button"
            class="btn"
            :class="`btn--${action.variant}`"
            @click="handleAction(action.to)"
          >
            {{ action.label }}
          </button>
        </div>

        <div class="hero__meta">
          <span>LLM 语义联想</span>
          <span>Chroma 向量网络</span>
          <span>OCR 智能纠错</span>
        </div>
      </div>

      <div class="hero__stats" aria-label="系统核心指标">
        <article
          v-for="(stat, index) in heroStats"
          :key="stat.label"
          class="stat-card"
          :style="{ '--stat-delay': `${index * 80}ms` }"
        >
          <p class="stat-card__value">{{ stat.value }}</p>
          <p class="stat-card__label">{{ stat.label }}</p>
          <p class="stat-card__meta">{{ stat.helper }}</p>
        </article>
      </div>
    </section>

    <section class="feature-grid js-reveal" aria-labelledby="feature-title">
      <header class="section-header">
        <p class="section-eyebrow">核心能力矩阵</p>
        <h2 id="feature-title">秋色渐变之下的 4 大系统亮点</h2>
        <p class="section-lead">
          以模块化卡片呈现后台能力，卡片载入拥有延迟动画，并与 Figma 视觉中的色带相呼应。
        </p>
      </header>

      <div class="feature-grid__items">
        <article
          v-for="feature in featureCards"
          :key="feature.title"
          class="feature-card"
          :style="{ '--feature-accent': feature.accent }"
        >
          <div class="feature-card__icon" aria-hidden="true">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.copy }}</p>
        </article>
      </div>
    </section>

    <section class="workflow js-reveal" aria-labelledby="workflow-title">
      <header class="section-header">
        <p class="section-eyebrow">学习旅程</p>
        <h2 id="workflow-title">3 步完成一段沉浸式搜题体验</h2>
        <p class="section-lead">
          循序渐进的卡片伴随着轻微滚动动画，展示从「捕捉题目」到「沉浸解析」的完整路径。
        </p>
      </header>

      <div class="workflow__steps">
        <article
          v-for="step in workflowSteps"
          :key="step.step"
          class="workflow-step"
        >
          <div class="workflow-step__index">{{ step.step }}</div>
          <div class="workflow-step__content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <span>{{ step.meta }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="insights js-reveal" aria-labelledby="insight-title">
      <header class="section-header">
        <p class="section-eyebrow">Ambient Insights</p>
        <h2 id="insight-title">动画与数据脉搏同频，学习状态随时掌握</h2>
        <p class="section-lead">
          通过玻璃拟态卡片承载实时洞察，并用柔和的光晕强调每一个数据片段。
        </p>
      </header>

      <div class="insights__grid">
        <article
          v-for="item in insightItems"
          :key="item.title"
          class="insight-card"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </article>
      </div>
    </section>

    <section class="cta js-reveal" aria-labelledby="cta-title">
      <div class="cta__content">
        <p class="section-eyebrow">下一步</p>
        <h2 id="cta-title">把秋日灵感带入真实课堂</h2>
        <p class="section-lead">
          可视化 Checklist 帮助你快速确认上线前的关键体验节点。
        </p>

        <ul class="cta__checklist">
          <li v-for="item in ctaChecklist" :key="item">
            <span aria-hidden="true">✔</span>
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="hero__actions">
          <button type="button" class="btn btn--primary" @click="handleAction('/search')">
            立即体验文本搜索
          </button>
          <button type="button" class="btn btn--ghost" @click="handleAction('/ocr-search')">
            上传一张题目图片
          </button>
        </div>
      </div>

      <div class="cta__preview" aria-hidden="true">
        <div class="cta__orbit">
          <span class="cta__orb cta__orb--one"></span>
          <span class="cta__orb cta__orb--two"></span>
          <span class="cta__orb cta__orb--three"></span>
        </div>
        <p>动画演示在真实页面呈现为循环的秋叶轨迹与柔和光晕。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const heroActions = [
  { label: '体验文本搜索', to: '/search', variant: 'primary' },
  { label: '上传题目图片', to: '/ocr-search', variant: 'ghost' }
]

const heroStats = [
  { value: '1.2s', label: '平均响应速度', helper: '向量召回 + LLM 重写' },
  { value: '98%', label: '图片识别准确率', helper: 'PaddleOCR + 自研纠错' },
  { value: '4.9/5', label: '体验评分', helper: '内测学员即时反馈' }
]

const featureCards = [
  {
    title: '实时 OCR · 智能修正',
    copy: '自动识别截屏题目并进行结构化解析，兼顾手写、印刷体与公式格式。',
    icon: '📷',
    accent: '#F39C6B'
  },
  {
    title: '语义联想搜索',
    copy: '借助 Chroma + LLM 语义检索，智能联想到相近知识点与题型。',
    icon: '🧠',
    accent: '#E05D5D'
  },
  {
    title: '学习节奏仪表盘',
    copy: '实时跟踪做题频率、正确率与学习节奏，用数据点亮秋夜。',
    icon: '📊',
    accent: '#C8553D'
  },
  {
    title: '秋日沉浸体验',
    copy: '柔和渐变与微交互动效，打造具备 Figma 秋色风格的 UI 呈现。',
    icon: '🍂',
    accent: '#F2B880'
  }
]

const workflowSteps = [
  {
    step: '01',
    title: '捕捉题目灵感',
    description: '输入关键词或上传题目图片，系统快速完成清洗与结构化。',
    meta: '文本/图片统一入口'
  },
  {
    step: '02',
    title: '语义理解与推荐',
    description: '与秋日渐变同步的动画，展示 AI 如何联想相关知识点。',
    meta: '深色渐变节奏指示'
  },
  {
    step: '03',
    title: '沉浸式解析',
    description: '动画光晕突出关键解题步骤，辅助学习者快速记忆。',
    meta: '详解卡片 + 互动提示'
  }
]

const insightItems = [
  {
    title: '个性化学习节奏',
    copy: '根据做题时间与正确率自动生成热力图，提示何时需要复习。'
  },
  {
    title: '语义聚合建议',
    copy: '聚合同类题目，自动推送相邻知识点或更具挑战性的扩展题。'
  },
  {
    title: '安全可信赖',
    copy: '所有检索行为可追溯，具备完整的审计与隐私保护机制。'
  }
]

const ctaChecklist = [
  '跨学科标签联动齐备',
  'OCR & LLM 日志已校验',
  '动画在低端设备可自动降级'
]

const leaves = [
  { id: 1, left: '6%', top: '-40px', size: 32, delay: 0, duration: 18, opacity: 0.8, gradient: 'linear-gradient(130deg, #f4a259, #fcd8bd)' },
  { id: 2, left: '18%', top: '10px', size: 18, delay: 4, duration: 22, opacity: 0.55, gradient: 'linear-gradient(130deg, #e76f51, #f4a259)' },
  { id: 3, left: '32%', top: '-60px', size: 26, delay: 2, duration: 16, opacity: 0.6, gradient: 'linear-gradient(130deg, #f4d35e, #f6a01a)' },
  { id: 4, left: '48%', top: '-20px', size: 14, delay: 7, duration: 20, opacity: 0.5, gradient: 'linear-gradient(130deg, #d66f4a, #f2c57c)' },
  { id: 5, left: '62%', top: '-50px', size: 22, delay: 3, duration: 19, opacity: 0.65, gradient: 'linear-gradient(130deg, #f4a259, #f77f00)' },
  { id: 6, left: '78%', top: '0', size: 16, delay: 6, duration: 17, opacity: 0.55, gradient: 'linear-gradient(130deg, #de9151, #f7c59f)' },
  { id: 7, left: '88%', top: '-35px', size: 28, delay: 1.5, duration: 21, opacity: 0.7, gradient: 'linear-gradient(130deg, #f6bd60, #f28482)' },
  { id: 8, left: '94%', top: '-70px', size: 20, delay: 5, duration: 23, opacity: 0.6, gradient: 'linear-gradient(130deg, #ee964b, #f4a261)' }
]

let revealObserver = null

const handleAction = (target) => {
  router.push(target)
}

const activateRevealAnimation = () => {
  const elements = Array.from(document.querySelectorAll('.js-reveal'))
  if (!elements.length) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (prefersReducedMotion.matches || typeof IntersectionObserver === 'undefined') {
    elements.forEach((el) => el.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    }
  )

  elements.forEach((el) => revealObserver?.observe(el))
}

onMounted(() => {
  activateRevealAnimation()
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
})
</script>

<style scoped>
.home {
  --bg: #fff9f4;
  --bg-stronger: #fdeee2;
  --text: #3c2c23;
  --text-muted: rgba(60, 44, 35, 0.74);
  --accent: #da6743;
  --accent-strong: #b3482c;
  --card-bg: rgba(255, 255, 255, 0.7);
  background: radial-gradient(circle at top left, #fff4e8, #fffaf6 38%, #ffe8d5 75%);
  border-radius: 32px;
  padding: clamp(16px, 4vw, 64px);
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 8vw, 96px);
  color: var(--text);
  position: relative;
  isolation: isolate;
}

.hero {
  position: relative;
  overflow: hidden;
  border-radius: 40px;
  padding: clamp(24px, 5vw, 72px);
  background: linear-gradient(135deg, #502a2a 0%, #a3442c 42%, #f0a05b 100%);
  color: #fff9f4;
  box-shadow: 0 40px 120px rgba(122, 55, 26, 0.35);
}

.hero__background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.2), transparent 60%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.35), transparent 60%);
}

.hero__sun {
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 214, 153, 0));
  top: -120px;
  right: -40px;
  filter: blur(0.5px);
}

.hero__mist {
  position: absolute;
  width: 70%;
  height: 160px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  filter: blur(20px);
}

.hero__mist--one {
  top: 120px;
  right: -10%;
}

.hero__mist--two {
  bottom: 140px;
  left: -20%;
}

.hero__leaves {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero__leaf {
  position: absolute;
  border-radius: 60% 40% 70% 30%;
  filter: blur(0.2px);
  box-shadow: 0 10px 30px rgba(94, 35, 18, 0.25);
  animation: leaf-drift linear infinite;
}

.hero__content,
.hero__stats {
  position: relative;
  z-index: 2;
}

.hero__eyebrow {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: inline-flex;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 1.2rem;
}

.hero__content h1 {
  font-size: clamp(2.75rem, 5vw, 4.6rem);
  line-height: 1.1;
  margin-bottom: 1.2rem;
}

.hero__lead {
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 58ch;
  color: rgba(255, 255, 255, 0.92);
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 1.5rem;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.hero__meta span {
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}

.hero__stats {
  margin-top: clamp(2rem, 6vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 1.2rem;
  backdrop-filter: blur(16px);
  transform: translateY(20px);
  opacity: 0;
  animation: stat-pop 0.8s ease forwards;
  animation-delay: var(--stat-delay, 0ms);
}

.stat-card__value {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.stat-card__label {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.stat-card__meta {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
}

.section-header {
  max-width: 720px;
  text-align: left;
}

.section-eyebrow {
  font-size: 0.88rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-strong);
  margin-bottom: 0.8rem;
}

.section-lead {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.6;
}

.feature-grid__items {
  margin-top: clamp(1.8rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.feature-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.75));
  border-radius: 28px;
  padding: 1.8rem;
  box-shadow: 0 20px 60px rgba(150, 60, 20, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: relative;
  overflow: hidden;
}

.feature-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(0, 0, 0, 0.08), transparent 60%);
  mix-blend-mode: multiply;
  opacity: 0.35;
}

.feature-card__icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.35rem;
  margin-bottom: 0.6rem;
  color: var(--accent-strong);
}

.feature-card p {
  margin: 0;
  color: var(--text-muted);
  position: relative;
}

.feature-card {
  border-inline-start: 6px solid var(--feature-accent);
}

.workflow__steps {
  margin-top: clamp(2rem, 4vw, 3.5rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.workflow-step {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28px;
  padding: 1.6rem;
  border: 1px solid rgba(218, 103, 67, 0.16);
  box-shadow: 0 20px 60px rgba(87, 47, 33, 0.1);
}

.workflow-step__index {
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.workflow-step__content h3 {
  margin: 0 0 0.6rem;
  font-size: 1.35rem;
}

.workflow-step__content p {
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 0.8rem;
}

.workflow-step__content span {
  font-size: 0.92rem;
  color: var(--accent-strong);
  background: rgba(218, 103, 67, 0.1);
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
}

.insights__grid {
  margin-top: clamp(2rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.insight-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  padding: 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px rgba(160, 80, 40, 0.12);
}

.insight-card h3 {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
}

.insight-card p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.6;
}

.cta {
  background: linear-gradient(120deg, #381b1b 0%, #7a3722 55%, #ef9d5b 100%);
  color: #fff4ec;
  border-radius: 36px;
  padding: clamp(24px, 5vw, 64px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: clamp(24px, 4vw, 60px);
  position: relative;
  overflow: hidden;
}

.cta__content {
  position: relative;
  z-index: 2;
}

.cta__checklist {
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.cta__checklist li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
}

.cta__checklist span:first-child {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta__preview {
  background: rgba(0, 0, 0, 0.18);
  border-radius: 32px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.2);
}

.cta__orbit {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.cta__orb {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffe1c0;
  animation: orbit 16s linear infinite;
}

.cta__orb--one {
  top: -6px;
}

.cta__orb--two {
  bottom: -6px;
  animation-duration: 20s;
}

.cta__orb--three {
  right: -6px;
  animation-duration: 26s;
}

.cta__preview p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.btn {
  border: none;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.9);
  outline-offset: 3px;
}

.btn--primary {
  background: linear-gradient(135deg, #ffe8d1 0%, #f9b37b 100%);
  color: #5b2309;
  box-shadow: 0 12px 30px rgba(255, 181, 118, 0.4);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(255, 181, 118, 0.5);
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.12);
  color: #fff6ed;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.btn--ghost:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
}

.js-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.js-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes leaf-drift {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(-25px, 220px, 0) rotate(22deg);
  }
  100% {
    transform: translate3d(40px, 430px, 0) rotate(46deg);
  }
}

@keyframes stat-pop {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(calc(50% - 6px));
  }
  to {
    transform: rotate(360deg) translateX(calc(50% - 6px));
  }
}

@media (max-width: 960px) {
  .hero__content h1 {
    font-size: clamp(2.2rem, 6vw, 3.4rem);
  }

  .hero__stats {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

@media (max-width: 720px) {
  .home {
    border-radius: 0;
    padding: clamp(16px, 6vw, 32px);
  }

  .hero {
    border-radius: 32px;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .cta {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__leaf,
  .stat-card,
  .btn,
  .cta__orb,
  .js-reveal {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }

  .js-reveal {
    opacity: 1 !important;
  }
}
</style>
