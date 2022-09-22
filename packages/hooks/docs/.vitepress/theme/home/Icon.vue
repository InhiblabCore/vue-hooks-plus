<template>
  <div class="container">
    <div class="img"> </div>
    <img src="http://43.138.187.142:9000/assets/vue-hooks-plus/logo@2x.png" alt="vue-hooks-plus" />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    padding-top: 80px;

    position: relative;
    margin: 0 auto;
  }
  .img {
    background-image: linear-gradient(-25deg, #647eff 40%, #42d392 50%);
    filter: blur(80px);
    position: absolute;
    width: 324px;
    height: 288px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    width: 260px;
    height: 230px;
    z-index: 1;
  }
  @media (max-width: 1450px) {
    .img {
      width: 270px;
      height: 240px;
      filter: blur(70px);
    }
    img {
      width: 216px;
      height: 192px;
    }
  }
  @media (max-width: 1100px) {
    .img {
      width: 216px;
      height: 192px;
      filter: blur(60px);
    }
    img {
      width: 173px;
      height: 154px;
    }
  }
  @media (max-width: 768px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      padding-top: 32px;
    }

    .img {
      width: 162px;
      height: 144px;
      filter: blur(50px);
    }

    img {
      width: 131px;
      height: 115px;
    }
  }
  @media (max-width: 370px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
    }

    .img {
      width: 108px;
      height: 96px;
      filter: blur(30px);
    }

    img {
      width: 87px;
      height: 77px;
    }
  }
</style>
