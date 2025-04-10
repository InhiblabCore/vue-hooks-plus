import { Banner } from "./banner";
import { Modal } from "./modal";

(function () {
  const shouldShowBanner = () => {
    const lastCloseTime = localStorage.getItem('vhp-sponsor-last-close');
    if (!lastCloseTime) return true;

    const oneMonth = 30 * 24 * 60 * 60 * 1000; // 一个月的毫秒数
    const now = new Date().getTime();
    return now - parseInt(lastCloseTime) > oneMonth;
  }
  if (shouldShowBanner()) {
    const shadowEle = document.createElement('sponsor-banner');
    const shadowModal = document.createElement('sponsor-modal');
    shadowEle.setAttribute('display', 'block');
    shadowEle.setAttribute(
      'style',
      'z-index: 2147483647; position: fixed; display: unset; bottom:0;width:100%'
    );
    // document.body.appendChild(shadowEle);
    document.body.insertBefore(shadowEle, document.body.firstChild);
    document.body.insertBefore(shadowModal, document.body.firstChild);
  }

  customElements.define('sponsor-banner', Banner);
  customElements.define('sponsor-modal', Modal);
})();

