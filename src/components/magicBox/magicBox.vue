<template>
  <div id="magicBox">
    <div id="container">
      <div id="box">
        <div class="page top"></div>
        <div class="page bottom"></div>
        <div class="page left"></div>
        <div class="page right"></div>
        <div class="page front"></div>
        <div class="page back"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        color: ['skyblue','yellow','violet','red','hotpink','orange']
      }
    },
    mounted() {
      var arr = document.querySelectorAll(".page"); //按选择器找到.page
      for (var i = 0; i < arr.length; i++) //历遍6个面
      {
        for (var j = 0; j < 4; j++) //历遍4个层
        {
          for (var k = 0; k < 4; k++) //历遍4个列
          {
            var divs = document.createElement("div"); //创建元素
            console.log(divs)
            divs.style.cssText = `width:40px;height:40px;border:1px solid white;position:absolute;background:${this.color[i]};box-shadow:0px 0px 20px white;`;
            divs.style.top = j * 40 + "px";
            divs.style.left = k * 40 + "px";
            divs.style.backgroundPositionX = -k * 40 + "px";
            divs.style.backgroundPositionY = -j * 40 + "px";
            arr[i].appendChild(divs);
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes frame1 {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }

    100% {
      transform: rotateX(360deg) rotateZ(360deg);
    }
  }

  @keyframes frame2 {
    0% {
      transform: translateZ(0px) scale(1) rotateZ(0deg);
    }

    35% {
      transform: translateZ(0px) scale(1) rotateZ(0deg);
    }

    55% {
      transform: translateZ(64px) scale(0.3) rotateZ(720deg);
    }

    85% {
      transform: translateZ(64px) scale(0.3) rotateZ(720deg);
    }

    100% {
      transform: translateZ(0px) scale(1) rotateZ(0deg);
    }
  }

  #magicBox {
    background-color: #4B0082;
    width: 100%;
    height: 100%;
    padding: 50px 0;
  }

  #container {
    width: 240px;
    height: 240px;
    margin: 50px auto;
    background-color: #7B68EE;
    border-radius: 50%;
    box-shadow: 0px 0px 100px white;
    border: 1px solid #7B68EE;
  }

  #box {
    width: 160px;
    height: 160px;
    margin: auto;
    transform-style: preserve-3d;
    animation: frame1 3s linear infinite;
    transform: rotateX(45deg) rotateZ(45deg);
  }

  .page {
    width: 160px;
    height: 160px;
    position: absolute;
    transform-style: preserve-3d;
  }

  .top {
    transform: translateY(-80px) rotateX(90deg);
  }

  .bottom {
    transform: translateY(80px) rotateX(-90deg);
  }

  .left {
    transform: translateX(-80px) rotateY(-90deg);
  }

  .right {
    transform: translateX(80px) rotateY(90deg);
  }

  .front {
    transform: translateZ(80px);
  }

  .back {
    transform: translateZ(-80px) rotateX(180deg);
  }
  .page div:nth-child(1) {
    animation: frame2 7s ease infinite;
  }

  .page div:nth-child(2) {
    animation: frame2 7s ease 0.15s infinite;
  }

  .page div:nth-child(3) {
    animation: frame2 7s ease 0.3s infinite;
  }

  .page div:nth-child(4) {
    animation: frame2 7s ease 0.45s infinite;
  }

  .page div:nth-child(5) {
    animation: frame2 7s ease 0.6s infinite;
  }

  .page div:nth-child(6) {
    animation: frame2 7s ease 0.75s infinite;
  }

  .page div:nth-child(7) {
    animation: frame2 7s ease 0.9s infinite;
  }

  .page div:nth-child(8) {
    animation: frame2 7s ease 1.05s infinite;
  }

  .page div:nth-child(9) {
    animation: frame2 7s ease 1.2s infinite;
  }

  .page div:nth-child(10) {
    animation: frame2 7s ease 0.3s infinite;
  }

  .page div:nth-child(11) {
    animation: frame2 7s ease 0.45s infinite;
  }

  .page div:nth-child(12) {
    animation: frame2 7s ease 0.6s infinite;
  }

  .page div:nth-child(13) {
    animation: frame2 7s ease 0.75s infinite;
  }

  .page div:nth-child(14) {
    animation: frame2 7s ease 0.9s infinite;
  }

  .page div:nth-child(15) {
    animation: frame2 7s ease 1.05s infinite;
  }

  .page div:nth-child(16) {
    animation: frame2 7s ease 1.2s infinite;
  }
</style>
