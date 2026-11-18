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
    <title>欢迎来到 Chan 的小站</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
        background: #070b1a;
        color: #eef1ff;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        position: relative;
      }
      .aurora { position: fixed; inset: 0; overflow: hidden; z-index: 0; }
      .aurora::before, .aurora::after {
        content: ""; position: absolute; border-radius: 50%;
        filter: blur(90px); opacity: .55;
      }
      .aurora::before {
        width: 55vw; height: 55vw; left: -12vw; top: -18vw;
        background: radial-gradient(circle at 30% 30%, #4f7cff, transparent 65%);
        animation: drift1 22s ease-in-out infinite alternate;
      }
      .aurora::after {
        width: 48vw; height: 48vw; right: -10vw; bottom: -16vw;
        background: radial-gradient(circle at 70% 70%, #b04fe0, transparent 65%);
        animation: drift2 26s ease-in-out infinite alternate;
      }
      .blob3 {
        position: absolute; width: 34vw; height: 34vw; left: 38vw; top: 52vh;
        border-radius: 50%; filter: blur(100px); opacity: .35;
        background: radial-gradient(circle at 50% 50%, #22c1a3, transparent 65%);
        animation: drift1 30s ease-in-out infinite alternate-reverse;
      }
      @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(6vw, 4vh) scale(1.15); } }
      @keyframes drift2 { from { transform: translate(0,0) scale(1.1); } to { transform: translate(-5vw, -5vh) scale(.95); } }
      .stars { position: fixed; inset: 0; z-index: 0; background-image:
        radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,.8) 50%, transparent 51%),
        radial-gradient(1px 1px at 32% 68%, rgba(255,255,255,.55) 50%, transparent 51%),
        radial-gradient(1.5px 1.5px at 54% 14%, rgba(255,255,255,.7) 50%, transparent 51%),
        radial-gradient(1px 1px at 71% 42%, rgba(255,255,255,.5) 50%, transparent 51%),
        radial-gradient(1px 1px at 86% 78%, rgba(255,255,255,.65) 50%, transparent 51%),
        radial-gradient(1.5px 1.5px at 93% 9%, rgba(255,255,255,.6) 50%, transparent 51%),
        radial-gradient(1px 1px at 44% 88%, rgba(255,255,255,.45) 50%, transparent 51%),
        radial-gradient(1px 1px at 5% 55%, rgba(255,255,255,.5) 50%, transparent 51%);
      }
      main { position: relative; z-index: 1; width: min(680px, 92vw); animation: rise .9s cubic-bezier(.2,.7,.2,1) both; }
      @keyframes rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      .card {
        background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 28px;
        padding: 52px 48px 40px;
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        box-shadow: 0 30px 80px rgba(0,0,0,.45);
        text-align: center;
      }
      .logo {
        width: 76px; height: 76px; margin: 0 auto 22px;
        border-radius: 22px;
        background: linear-gradient(135deg, #4f7cff, #b04fe0 60%, #22c1a3);
        display: flex; align-items: center; justify-content: center;
        font-size: 34px; font-weight: 700; color: #fff;
        box-shadow: 0 12px 32px rgba(111, 92, 246, .45);
      }
      .status {
        display: inline-flex; align-items: center; gap: 8px;
        font-size: 13px; color: #a9f5d8; letter-spacing: .12em;
        border: 1px solid rgba(66, 230, 170, .35);
        background: rgba(34, 193, 163, .12);
        padding: 6px 14px; border-radius: 999px; margin-bottom: 26px;
      }
      .dot { width: 8px; height: 8px; border-radius: 50%; background: #2ee6a8; animation: pulse 1.8s ease-in-out infinite; }
      @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(46,230,168,.5); } 50% { box-shadow: 0 0 0 7px rgba(46,230,168,0); } }
      h1 {
        font-size: clamp(34px, 6vw, 52px); font-weight: 800; line-height: 1.15; letter-spacing: .01em;
        background: linear-gradient(92deg, #ffffff 20%, #a9c2ff 55%, #e3b3ff 90%);
        -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        margin-bottom: 14px;
      }
      .sub { font-size: 16px; line-height: 1.7; color: rgba(226,232,255,.78); margin-bottom: 8px; }
      .clock { font-size: 14px; color: rgba(226,232,255,.55); letter-spacing: .08em; margin-bottom: 34px; font-variant-numeric: tabular-nums; }
      .links { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
      .links a {
        text-decoration: none; color: #eef1ff; font-size: 15px;
        padding: 12px 22px; border-radius: 999px;
        border: 1px solid rgba(255,255,255,.18);
        background: rgba(255,255,255,.05);
        transition: transform .25s ease, background .25s ease, border-color .25s ease;
      }
      .links a:hover { transform: translateY(-2px); background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.35); }
      .links a.primary {
        background: linear-gradient(92deg, #4f7cff, #8a4fe0); border-color: transparent; font-weight: 600;
        box-shadow: 0 10px 26px rgba(98, 84, 240, .4);
      }
      .links a.primary:hover { background: linear-gradient(92deg, #6390ff, #9d63ec); }
      footer { text-align: center; margin-top: 26px; font-size: 12.5px; color: rgba(226,232,255,.4); letter-spacing: .06em; }
      @media (max-width: 560px) { .card { padding: 40px 26px 32px; } }
    </style>
  </head>
  <body>
    <div class="aurora"><div class="blob3"></div></div>
    <div class="stars"></div>
    <main>
      <div class="card">
        <div class="logo">福</div>
        <div><span class="status"><span class="dot"></span>服务器运行中</span></div>
        <h1 id="greeting">欢迎来到我的小站</h1>
        <p class="sub">这是 Chan 的第三台服务器，跑在 Abasthan 免费云上。<br />不大，但五脏俱全，还带着监控探针 24 小时值班。</p>
        <p class="clock" id="clock">--</p>
        <nav class="links">
          <a class="primary" href="https://gg6.space" target="_blank" rel="noopener">主站 gg6.space</a>
          <a href="https://monitor.gg6.space" target="_blank" rel="noopener">服务器监控</a>
          <a href="https://api.gg6.space" target="_blank" rel="noopener">API 服务</a>
          <a href="https://github.com/S2km1337/express-hello-world" target="_blank" rel="noopener">本站源码</a>
        </nav>
      </div>
      <footer>Powered by Node.js + Express · Hosted on Abasthan · 与福宝共同维护</footer>
    </main>
    <script>
      function pad(n) { return (n < 10 ? "0" : "") + n; }
      function tick() {
        var d = new Date();
        var h = d.getHours();
        var g = h < 6 ? "夜深了，欢迎来到我的小站" : h < 12 ? "早上好，欢迎来到我的小站" : h < 14 ? "中午好，欢迎来到我的小站" : h < 18 ? "下午好，欢迎来到我的小站" : "晚上好，欢迎来到我的小站";
        document.getElementById("greeting").textContent = g;
        var days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        document.getElementById("clock").textContent =
          d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月 " + d.getDate() + " 日 " + days[d.getDay()] +
          " · " + pad(h) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
      }
      tick();
      setInterval(tick, 1000);
    </script>
  </body>
</html>
`
