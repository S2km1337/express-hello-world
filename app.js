const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>此刻</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        font-family: Georgia, "Times New Roman", "Songti SC", "STSong", "Noto Serif SC", serif;
        background: #f0eee6;
        color: #23211d;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
      }
      main { text-align: center; padding: 24px; animation: fade 1.2s ease both; }
      @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
      .greeting {
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 14px; letter-spacing: .55em; text-indent: .55em;
        color: #97907e; margin-bottom: 30px;
      }
      .time {
        font-size: clamp(76px, 17vw, 170px);
        font-weight: 400;
        line-height: 1;
        letter-spacing: .01em;
        font-variant-numeric: tabular-nums lining-nums;
      }
      .time .sec { font-size: .34em; color: #c15f3c; }
      .rule { width: 44px; height: 1px; background: #d9d3bf; margin: 36px auto 26px; }
      .date {
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 15px; letter-spacing: .32em; text-indent: .32em; color: #7d7767;
      }
    </style>
  </head>
  <body>
    <main>
      <p class="greeting" id="greeting">你好</p>
      <div class="time"><span id="hm">--:--</span><span class="sec" id="sec">--</span></div>
      <div class="rule"></div>
      <p class="date" id="date">--</p>
    </main>
    <script>
      function pad(n) { return (n < 10 ? "0" : "") + n; }
      function tick() {
        var d = new Date();
        var h = d.getHours();
        var g = h < 6 ? "夜深了" : h < 9 ? "早上好" : h < 12 ? "上午好" : h < 14 ? "中午好" : h < 18 ? "下午好" : h < 23 ? "晚上好" : "夜深了";
        document.getElementById("greeting").textContent = g;
        document.getElementById("hm").textContent = pad(h) + ":" + pad(d.getMinutes());
        document.getElementById("sec").textContent = " " + pad(d.getSeconds());
        var days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        document.getElementById("date").textContent =
          d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月 " + d.getDate() + " 日 · " + days[d.getDay()];
      }
      tick();
      setInterval(tick, 1000);
    </script>
  </body>
</html>
`
