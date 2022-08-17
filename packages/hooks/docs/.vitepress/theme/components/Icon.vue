<template>
  <div class="container">
    <img src="http://43.138.187.142:9000/assets/vue-hooks-plus/logo@2x.png" alt="vue-hooks-plus" />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
  }
  img {
    width: 324px;
    height: 288px;
  }
  @media (max-width: 1450px) {
    img {
      width: 270px;
      height: 240px;
    }
  }
  @media (max-width: 1100px) {
    img {
      width: 216px;
      height: 192px;
    }
  }
  @media (max-width: 768px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
    }
    img {
      width: 162px;
      height: 144px;
    }
  }
  @media (max-width: 370px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
    }
    img {
      width: 108px;
      height: 96px;
    }
  }
</style>
