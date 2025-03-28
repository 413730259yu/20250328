let seaweeds = []; // 儲存水草屬性的陣列
let numSeaweeds = 80; // 水草數量
let colors = ['#a41623', '#f85e00', '#ffb563', '#ffd29d', '#918450']; // 指定的顏色範圍
let swayAmplitude = 10; // 統一的搖晃幅度
let iframe; // 用於儲存 iframe 元素

function setup() { // 初始值設定
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute'); // 設定畫布位置
  canvas.style('z-index', '1'); // 設定畫布層級為較高

  // 初始化水草屬性
  initializeSeaweeds();

  // 建立 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 嵌入的網址
  iframe.style('position', 'absolute');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('left', '10%'); // 置中 (視窗寬度的 10%)
  iframe.style('top', '10%'); // 置中 (視窗高度的 10%)
  iframe.style('z-index', '-1'); // 設定 iframe 層級為較低
}

function draw() { // 畫圖
  clear(); // 清除畫布，實現透明背景
  blendMode(BLEND); // 啟用顏色混合模式

  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i];
    let baseX = seaweed.x; // 水草的基底位置
    let baseY = height; // 水草的底部位置
    let lineHeight = seaweed.height; // 水草的高度
    let sway = sin(frameCount * seaweed.frequency) * swayAmplitude; // 統一的搖晃幅度

    // 設定水草顏色，加入透明度
    let seaweedColor = color(seaweed.color);
    seaweedColor.setAlpha(128); // 設定透明度為 50% (128/255)
    stroke(seaweedColor);

    strokeWeight(seaweed.thickness); // 設定水草粗細
    noFill(); // 確保沒有填充

    // 使用 beginShape 和 vertex 繪製平滑的水草
    beginShape();
    let segments = 10; // 將線條分成 10 段
    let segmentHeight = lineHeight / segments; // 每段的高度
    let currentX = baseX; // 當前 X 座標
    let currentY = baseY; // 當前 Y 座標

    vertex(currentX, currentY); // 起始點
    for (let j = 0; j < segments; j++) {
      let nextX = currentX + sin(frameCount * seaweed.frequency + j * 0.5) * (1 - j / segments) * sway;
      let nextY = currentY - segmentHeight;
      vertex(nextX, nextY); // 添加頂點
      currentX = nextX;
      currentY = nextY;
    }
    endShape(); // 結束繪製
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布大小隨視窗大小改變
  initializeSeaweeds(); // 重新初始化水草屬性

  // 調整 iframe 的位置和大小
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('left', '10%');
  iframe.style('top', '10%');
}

function initializeSeaweeds() {
  seaweeds = []; // 清空水草陣列
  for (let i = 0; i < numSeaweeds; i++) {
    seaweeds.push({
      x: random(width), // 水草的水平位置
      height: random(100, 300), // 水草的高度
      color: colors[int(random(colors.length))], // 隨機選擇顏色
      thickness: random(10, 20), // 水草的粗細
      frequency: random(0.005, 0.02) // 水草搖晃的頻率 (更慢)
    });
  }
}

