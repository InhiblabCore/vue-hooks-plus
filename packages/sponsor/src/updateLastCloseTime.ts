// 导出用于关闭时调用的方法
export const updateLastCloseTime = () => {
  localStorage.setItem('vhp-sponsor-last-close', new Date().getTime().toString());
};