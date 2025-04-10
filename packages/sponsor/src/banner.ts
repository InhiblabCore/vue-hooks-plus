// @ts-ignore
import styleInline from './styles/app.css?inline';
import { updateLastCloseTime } from './updateLastCloseTime';


export class Banner extends HTMLElement {
  #banner: HTMLTemplateElement | null = null;
  #_observer: MutationObserver | null = null;
  lang: string = 'en';
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.addSponsorListener();  // 添加这行
  }

  addSponsorCloseListener() {

  }
  addSponsorListener() {
    this.shadowRoot?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.sponsor-btn')) {
        const modal = document.querySelector('sponsor-modal') as HTMLElement;
        modal.setAttribute('visible', 'true');
      }
      if (target.matches('.close-icon')) {
        updateLastCloseTime();
        // 销毁整个 web component
        this.remove();
        document.querySelector('sponsor-banner')?.remove();
      }
    });
  }

  getMainContent(lang: string = 'en') {
    if (lang === 'zh-Hans') {
      return `
    <div class="sponsor-message">
     如果这个项目对你 <span>有帮助</span>，您可以 <button class="sponsor-btn">赞助</button> 我们来帮助项目更好地发展！感谢你的支持 ❤️
    </div>
    `
    }
    return `
      <div class="sponsor-message">
        If this project <span>helps you in any way</span>, you can <button class="sponsor-btn">Sponsor</button> us to help the project grow better! Thanks for your support! ❤️ 
      </div>
      `
  }

  connectedCallback() {
    const style = document.createElement('style');
    style.innerHTML = styleInline + styleInline;

    const rootTemplate = document.createElement('template');
    rootTemplate.innerHTML = this.template();
    this.#banner = rootTemplate
    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(this.#banner.content.cloneNode(true));
    this.renderContent();
    this.observeLanguage();
  }
  template() {
    return `
    <div id="vhp-widget-sponsor-banner-root" class="vhp-widget-sponsor-banner-root">
      <div class="vhp-widget-sponsor-thumbnail">
        <strong class="main">-</strong>
      </div>
      <div style="cursor: pointer;" class="close-icon">
       <svg width="1em" height="1em" viewBox="0 0 24 24" class="bi bi-x close-icon" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
      </svg>
      </div>
    </div>
    `
  }

  renderContent() {
    this.lang = document.documentElement.getAttribute('lang') ?? 'en-US';
    // 修改 main 里面的内容
    const main = this.shadowRoot!.querySelector('.main') as HTMLElement;
    main.innerHTML = this.getMainContent(this.lang);
  }


  // observe html language
  observeLanguage() {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
          const lang = document.documentElement.getAttribute('lang');
          if (lang) {
            this.renderContent()
          }
        }
      }
    });

    // 开始观察 HTML 元素
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    // 存储 observer 以便后续清理
    this.#_observer = observer;
  }


  disconnectedCallback() {
    // 组件销毁时清理 observer
    if (this.#_observer) {
      this.#_observer.disconnect();
    }
  }
}