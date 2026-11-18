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
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
        background: #f7f7f4;
        color: #1c1c1a;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
      }
      main { text-align: center; padding: 24px; animation: fade 1.2s ease both; }
      @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
      .greeting { font-size: 15px; letter-spacing: .5em; text-indent: .5em; color: #8a8a84; margin-bottom: 28px; }
      .time {
        font-size: clamp(72px, 17vw, 168px);
        font-weight: 200;
        line-height: 1;
        letter-spacing: .02em;
        font-variant-numeric: tabular-nums;
      }
      .time .sec { font-size: .38em; color: #a3a39c; font-weight: 300; }
      .rule { width: 48px; height: 1px; background: #d8d8d2; margin: 34px auto 26px; }
      .date { font-size: 16px; letter-spacing: .3em; text-indent: .3em; color: #6f6f6a; }
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
