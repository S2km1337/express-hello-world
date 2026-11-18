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
    <meta name="theme-color" content="#f0eee6" />
    <title>此刻</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::selection { background: #e3ddcb; }
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
        text-rendering: optimizeLegibility;
        overflow: hidden;
      }
      main { text-align: center; padding: 24px; animation: fade 1.4s cubic-bezier(.22,.61,.21,1) both; }
      @keyframes fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      .greeting {
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 14px; letter-spacing: .55em; text-indent: .55em;
        color: #97907e; margin-bottom: 30px;
      }
      .time {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        font-size: clamp(72px, 16vw, 160px);
        font-weight: 400;
        line-height: 1;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: "lnum" 1, "tnum" 1;
        user-select: none;
      }
      .cell {
        flex: 0 0 auto;
        width: .64em; height: 1em;
        overflow: hidden;
      }
      .strip {
        display: block;
        will-change: transform;
        transition-property: transform;
        transition-duration: .68s;
        transition-timing-function: cubic-bezier(.25,.8,.24,1);
      }
      .strip span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1em;
        line-height: 1;
      }
      .noanim .strip { transition: none !important; }
      .colon {
        flex: 0 0 auto;
        width: .3em; height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: breathe 2s ease-in-out infinite;
      }
      @keyframes breathe { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
      .gap { flex: 0 0 auto; width: .2em; }
      .sec { display: flex; align-items: flex-start; font-size: .34em; color: #c15f3c; padding-top: .12em; }
      .rule { width: 44px; height: 1px; background: #d9d3bf; margin: 36px auto 26px; }
      .date {
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        font-size: 15px; letter-spacing: .32em; text-indent: .32em; color: #7d7767;
      }
      @media (prefers-reduced-motion: reduce) {
        .strip { transition: none !important; }
        .colon { animation: none; }
        main { animation: none; }
      }
    </style>
  </head>
  <body>
    <main id="main">
      <p class="greeting" id="greeting">你好</p>
      <div class="time" id="time" aria-label="当前时间"></div>
      <div class="rule"></div>
      <p class="date" id="date">--</p>
    </main>
    <script>
      function pad(n) { return (n < 10 ? "0" : "") + n; }
      var mainEl = document.getElementById("main");
      var timeEl = document.getElementById("time");
      var greetingEl = document.getElementById("greeting");
      var dateEl = document.getElementById("date");

      function makeCell(parent, delay) {
        var cell = document.createElement("span");
        cell.className = "cell";
        var strip = document.createElement("span");
        strip.className = "strip";
        strip.style.transitionDelay = delay + "ms";
        for (var i = 0; i < 10; i++) {
          var s = document.createElement("span");
          s.textContent = i;
          strip.appendChild(s);
        }
        cell.appendChild(strip);
        parent.appendChild(cell);
        return strip;
      }
      function makeStatic(parent, text, cls) {
        var s = document.createElement("span");
        s.className = cls;
        s.textContent = text;
        parent.appendChild(s);
        return s;
      }

      // Cascade: rightmost digit rolls first, the rest follow in 40ms steps.
      var strips = [];
      strips.push(makeCell(timeEl, 200));
      strips.push(makeCell(timeEl, 160));
      makeStatic(timeEl, ":", "colon");
      strips.push(makeCell(timeEl, 120));
      strips.push(makeCell(timeEl, 80));
      makeStatic(timeEl, "", "gap");
      var secWrap = document.createElement("span");
      secWrap.className = "sec";
      timeEl.appendChild(secWrap);
      strips.push(makeCell(secWrap, 40));
      strips.push(makeCell(secWrap, 0));

      var current = [-1, -1, -1, -1, -1, -1];
      function setDigit(idx, val, snap) {
        if (current[idx] === val) return;
        current[idx] = val;
        if (snap) mainEl.classList.add("noanim");
        strips[idx].style.transform = "translate3d(0," + (-val) + "em,0)";
        if (snap) { void mainEl.offsetWidth; mainEl.classList.remove("noanim"); }
      }

      var lastSecond = -1;
      var lastGreeting = "";
      var lastDate = "";
      function render(now, snap) {
        var h = now.getHours();
        var digits = [
          Math.floor(h / 10), h % 10,
          Math.floor(now.getMinutes() / 10), now.getMinutes() % 10,
          Math.floor(now.getSeconds() / 10), now.getSeconds() % 10
        ];
        for (var i = 0; i < 6; i++) setDigit(i, digits[i], snap);
        var g = h < 6 ? "夜深了" : h < 9 ? "早上好" : h < 12 ? "上午好" : h < 14 ? "中午好" : h < 18 ? "下午好" : h < 23 ? "晚上好" : "夜深了";
        if (g !== lastGreeting) { lastGreeting = g; greetingEl.textContent = g; }
        var days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var ds = now.getFullYear() + " 年 " + (now.getMonth() + 1) + " 月 " + now.getDate() + " 日 · " + days[now.getDay()];
        if (ds !== lastDate) { lastDate = ds; dateEl.textContent = ds; }
        timeEl.setAttribute("aria-label", pad(h) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds()));
      }

      // First paint: snap into place with no motion, then let the loop take over.
      render(new Date(), true);
      lastSecond = Math.floor(Date.now() / 1000);

      function frame() {
        var nowMs = Date.now();
        var sec = Math.floor(nowMs / 1000);
        if (sec !== lastSecond) {
          // If we were stalled (hidden tab, busy main thread), snap instead of replaying.
          var snap = (sec - lastSecond) !== 1;
          lastSecond = sec;
          render(new Date(nowMs), snap);
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
          lastSecond = Math.floor(Date.now() / 1000);
          render(new Date(), true);
        }
      });
    </script>
  </body>
</html>
`
