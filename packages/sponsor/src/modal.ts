// @ts-ignore
import modalInline from './styles/modal.css?inline'
export class Modal extends HTMLElement {
  #modal: HTMLElement | null = null;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const modalStyle = document.createElement('style');
    modalStyle.innerHTML = modalInline;
    this.shadowRoot!.appendChild(modalStyle);
    this.addCloseListener();
    this.addPaymentListener(); // 添加支付按钮监听
  }

  addPaymentListener() {
    this.shadowRoot?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.wechat-pay')) {
        window.open('https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/docs/public/wx.JPG', '_blank');
      } else if (target.matches('.alipay')) {
        window.open('https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/docs/public/zfb.JPG', '_blank');
      }
    });
  }

  addCloseListener() {
    this.shadowRoot?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // 检查点击的是否是遮罩层本身
      if (target.classList.contains('modal-overlay')) {
        this.closeModal();
        return;
      }
      // 检查是否点击了关闭按钮或其子元素
      const closeButton = target.closest('.modal-close');
      if (closeButton) {
        this.closeModal();
      }
    });
  }

  openModal() {
    const template = `
  <div class="modal-overlay">
  <div class="modal-container">
    <div class="modal-content">
      <div class="modal-header">
        <h4> Sponsor </h4>
        
      <div style="cursor: pointer;" class="modal-close">
       <svg width="1em" height="1em" viewBox="0 0 24 24" class="bi bi-x close-icon" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
       </svg>
      </div>
        
      </div>
      <div class="modal-body">
        <p>如果您已经赞助了我们，请通过邮箱 <span class="email">1013588891@qq.com</span> 联系我们，感谢您的支持！</p>
        <p>If you have sponsored us, please contact us via email <span class="email">1013588891@qq.com</span>. Thank you for your support!</p>
      </div>
      <div class="modal-footer">
        <button class="wechat-pay">微信支付/Wechat</button>
        <button class="alipay">支付宝支付/AliPay</button>
      </div>
    </div>
  </div>
</div>
    `
    this.#modal = document.createElement('div');
    this.#modal.className = 'modal';
    this.#modal.innerHTML = template;
    this.shadowRoot!.appendChild(this.#modal);
  }

  closeModal() {

    if (this.#modal) {
      this.#modal.remove();
      this.#modal = null;
    }
  }
  static get observedAttributes() {
    return ['visible'];
  }

  // 监听属性变化
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'visible') {
      if (newValue === 'true') {
        this.openModal();
      } else {
        this.closeModal();
      }
    }
  }


}
