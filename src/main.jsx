import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Gift, Heart, Sparkles, Wand2 } from 'lucide-react';
import { emotionalInsights, giftCategories, surprisePlans } from './data/gifts.js';
import './styles.css';

function App() {
  return (
    <main>
      <FloatingPetals />
      <section className="hero section-shell">
        <div className="hero__content reveal">
          <p className="eyebrow">520 / 情人节 / 纪念日礼物策划</p>
          <h1>让礼物不止被收到，而是被她记很久。</h1>
          <p className="hero__lead">
            从女性心理、审美偏好和惊喜脚本出发，把“送什么”变成“如何让她感到被看见、被偏爱、被认真对待”。
          </p>
          <div className="hero__actions">
            <a href="#gifts" className="button button--primary">
              查看礼物灵感 <ArrowRight size={18} />
            </a>
            <a href="#plans" className="button button--ghost">获取惊喜脚本</a>
          </div>
        </div>
        <div className="hero__card reveal delay-1" aria-label="520 礼物灵感卡片">
          <div className="ribbon">For Her</div>
          <Sparkles className="hero__sparkle" size={34} />
          <p>主礼物</p>
          <strong>珍珠项链 + 手写信</strong>
          <span>搭配一束奶油粉玫瑰，把心意藏在最后一页。</span>
        </div>
      </section>

      <section className="section-shell insights" id="insights">
        <div className="section-heading reveal">
          <p className="eyebrow">心理情态</p>
          <h2>女生真正心动的，不只是礼物本身。</h2>
          <p>节日礼物承担的是情绪确认：她是否被理解、被记得、被尊重、被坚定选择。</p>
        </div>
        <div className="insight-grid">
          {emotionalInsights.map((item, index) => (
            <article className="insight-card reveal" style={{ '--delay': `${index * 90}ms` }} key={item.title}>
              <Heart size={22} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell" id="gifts">
        <div className="section-heading reveal">
          <p className="eyebrow">Gift Library</p>
          <h2>女性喜欢的礼物方向</h2>
          <p>每一类礼物都对应不同心理价值，建议按她的性格、关系阶段和近期需求组合选择。</p>
        </div>
        <div className="gift-grid">
          {giftCategories.map((gift, index) => (
            <article className="gift-card reveal" style={{ '--accent': gift.palette, '--delay': `${index * 70}ms` }} key={gift.title}>
              <div className="gift-card__top">
                <span>{gift.tag}</span>
                <Gift size={20} />
              </div>
              <h3>{gift.title}</h3>
              <p className="budget">预算：{gift.budget}</p>
              <ul>
                {gift.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p><strong>适合：</strong>{gift.fit}</p>
              <p><strong>心动理由：</strong>{gift.reason}</p>
              <p><strong>惊喜搭配：</strong>{gift.surprise}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell plans" id="plans">
        <div className="section-heading reveal">
          <p className="eyebrow">Surprise Script</p>
          <h2>把礼物变成一场可以执行的惊喜</h2>
          <p>好的惊喜不是越大越好，而是越贴合她越好。</p>
        </div>
        <div className="plan-list">
          {surprisePlans.map((plan, index) => (
            <article className="plan-card reveal" style={{ '--delay': `${index * 100}ms` }} key={plan.name}>
              <div className="plan-card__number">0{index + 1}</div>
              <div>
                <h3>{plan.name}</h3>
                <p className="scene">适合：{plan.scene}</p>
                <ol>
                  {plan.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <blockquote>{plan.line}</blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell aesthetic reveal">
        <Wand2 size={28} />
        <div>
          <p className="eyebrow">Aesthetic Checklist</p>
          <h2>女性审美友好的细节清单</h2>
          <p>柔和色彩、漂亮包装、真诚卡片、舒适节奏、低压互动，比单纯堆价格更能提高心动概率。</p>
        </div>
      </section>

      <footer>
        <p>心动礼物研究所 · React + Vite + NodeJS · 可静态部署到 Pages</p>
      </footer>
    </main>
  );
}

function FloatingPetals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, index) => (
        <span key={index} style={{ '--i': index, '--drift': `${((index % 5) - 2) * 26}px` }} />
      ))}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
