var size = 64;
var height = $("#box").height();
var width = $("#box").width();
var canvasHeight;
var canvasWidth;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var line;
var dots = [];
var colorList = ["gold", "cyan", "magenta"];
$("#box").append(canvas);

//初始化MusicVisualizer
var mv = new MusicVisualizer({
  size: size,
  visualizer: draw,
});

//选择歌曲
$("#list").on("click", "li", function () {
  $(".loading").show();
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  mv.play("public/media/" + $(this).attr("title"));
});

//变化音量
$("#volume").on("mousedown", function (event) {
  $(this).on("mousemove", function (event) {
    mv.changeVolume($(this).val() / 100);
  });
});

draw.type = "column"; //初始化draw的类型
function draw(arr) {
  ctx.clearRect(0, 0, width, height);

  if (draw.type == "column") {
    line.addColorStop(0, "gold");
    line.addColorStop(0.5, "cyan");
    line.addColorStop(1, "magenta");
    ctx.fillStyle = line;
    ctx.shadowBlur = 0;
    var w = width / size;
    var cw = w * 0.6;
    var capH = cw > 10 ? cw : 10;
    for (var i = 0; i < size; i++) {
      ctx.beginPath();
      var h = (arr[i] / 256) * height;
      var o = dots[i];
      ctx.fillRect(w * i, height - h, cw, h);
      ctx.fillRect(w * i, height - o.cap - capH, cw, capH);
      ctx.closePath();
      o.cap--;
      if (o.cap < 0) {
        o.cap = 0;
      }
      if (h > 0 && o.cap < h + 40) {
        o.cap = h + 40 > height - capH ? height - capH : h + 40;
      }
    }
  }
}

//选择可视化的类型
$("#typeList").on("click", "li", function () {
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  draw.type = $(this).attr("data-type");
  if (draw.type == "3D") {
    $("#box").empty().append(render.domElement);
  } else {
    reSize();
    $("#box").empty().append(canvas);
  }
});
//随机函数 整数
function random(min, max) {
  min = min || 0;
  max = max || 1;
  return max >= min ? Math.round(Math.random() * (max - min) + min) : 0;
}
//随机生成点
function getDots() {
  dots = [];
  for (var i = 0; i < size; i++) {
    var x = random(0, width);
    var y = random(0, height);
    var color = colorList[random(0, colorList.length - 1)];
    var shadowBlur = Math.floor(Math.random() * 30) + 15;
    var alpha = random(0, 1);
    dots.push({
      x: x,
      y: y,
      dx: random(1, 2),
      color: color,
      cap: 0,
      shadowBlur: shadowBlur,
      alpha: alpha,
    });
  }
}

function reSize() {
  height = $("#box").height();
  width = $("#box").width();
  canvas.height = height;
  canvas.width = width;
  line = ctx.createLinearGradient(0, 0, 0, height);

  getDots();
  // init3D();
}
reSize();

$(window).resize(function () {
  reSize();
});

//移动端
$(document).ready(function () {
  prepareForMobile();
});

function prepareForMobile() {
  if (window.screen.availWidth < 500) {
    size = 16;
  }
}
//添加本地文件
$("#add").on("click", function () {
  $("#loadMusic").click();
});
$("#loadMusic").on("change", function () {
  var file = this.files[0];
  var fr = new FileReader();
  fr.onload = function (e) {
    mv.play(e.target.result);
  };
  fr.readAsArrayBuffer(file);
  $(".play") && ($(".play").className = "");
});
