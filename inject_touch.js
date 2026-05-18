const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

const touchScript = `
    <script>
        /* \u2500\u2500\u2500 4-FINGER TOUCH TRIGGER (Mobile Secret Popup) \u2500\u2500\u2500 */
        (function () {
            var cooldown = false;
            document.addEventListener('touchstart', function (e) {
                if (e.touches.length >= 4 && !cooldown) {
                    cooldown = true;
                    setTimeout(function () { cooldown = false; }, 1200);
                    var popup = document.getElementById('dev-signature');
                    if (!popup) return;
                    popup.classList.toggle('dev-visible');
                    if (popup.classList.contains('dev-visible')) {
                        var card = popup.querySelector('.dev-card');
                        if (!card) return;
                        var rect = card.getBoundingClientRect();
                        var colors = ['#FF2D55', '#FFD43B', '#3B82F6', '#17D27F', '#A855F7', '#FF7A18'];
                        for (var i = 0; i < 22; i++) {
                            var dot = document.createElement('span');
                            dot.className = 'dev-burst-dot';
                            var angle = (i / 22) * 360;
                            var dist = 80 + Math.random() * 60;
                            var rad = (angle * Math.PI) / 180;
                            dot.style.cssText = 'position:fixed;left:' + (rect.left + rect.width / 2) + 'px;top:' + (rect.top + rect.height / 2) + 'px;background:' + colors[i % colors.length] + ';--tx:' + (Math.cos(rad) * dist) + 'px;--ty:' + (Math.sin(rad) * dist) + 'px;';
                            document.body.appendChild(dot);
                            setTimeout(function () { dot.remove(); }, 800);
                        }
                    }
                }
            }, { passive: true });
        })();
    <\/script>`;

// Insert before </body>
if (h.includes('</body>')) {
    h = h.replace('</body>', touchScript + '\n</body>');
    fs.writeFileSync('index.html', h, 'utf8');
    console.log('DONE - 4-finger touch trigger added');
} else {
    console.log('ERROR - </body> not found');
}
