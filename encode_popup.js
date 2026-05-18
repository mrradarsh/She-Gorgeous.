// Build popup using createElement - ZERO innerHTML quoting issues
const code = `(function () {
    var o = document.createElement('div');
    o.id = 'dev-signature';

    var card = document.createElement('div');
    card.className = 'dev-card';

    var glow = document.createElement('div');
    glow.className = 'dev-card-glow';
    card.appendChild(glow);

    var closeBtn = document.createElement('div');
    closeBtn.className = 'dev-close';
    closeBtn.title = 'Close';
    closeBtn.textContent = '\u2715';
    card.appendChild(closeBtn);

    var badge = document.createElement('div');
    badge.className = 'dev-badge';
    badge.textContent = '\u2726 SECRET \u2726';
    card.appendChild(badge);

    var avatarWrap = document.createElement('div');
    avatarWrap.className = 'dev-avatar-wrap';
    var avatarImg = document.createElement('img');
    avatarImg.className = 'dev-avatar-img';
    avatarImg.src = 'https://unavatar.io/linkedin/mraadarshdubey';
    avatarImg.alt = 'Adarsh';
    avatarWrap.appendChild(avatarImg);
    card.appendChild(avatarWrap);

    var label = document.createElement('p');
    label.className = 'dev-label';
    label.textContent = 'Designed & Developed By';
    card.appendChild(label);

    var name = document.createElement('h2');
    name.className = 'dev-name';
    name.setAttribute('data-text', 'Adarsh');
    name.textContent = 'Adarsh';
    card.appendChild(name);

    var tagline = document.createElement('p');
    tagline.className = 'dev-tagline';
    tagline.textContent = 'Crafting Premium Web Experiences';
    card.appendChild(tagline);

    var divider = document.createElement('div');
    divider.className = 'dev-divider';
    card.appendChild(divider);

    var stack = document.createElement('div');
    stack.className = 'dev-stack';
    ['HTML','CSS','JavaScript','AI'].forEach(function(t) {
        var s = document.createElement('span');
        s.textContent = t;
        stack.appendChild(s);
    });
    card.appendChild(stack);

    var liBtn = document.createElement('a');
    liBtn.className = 'dev-linkedin-btn';
    liBtn.href = 'https://www.linkedin.com/in/mraadarshdubey/';
    liBtn.target = '_blank';
    liBtn.rel = 'noopener';
    liBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> Connect on LinkedIn';
    card.appendChild(liBtn);

    var hint = document.createElement('p');
    hint.className = 'dev-hint';
    hint.innerHTML = 'Press <kbd>Tab</kbd> + <kbd>A</kbd> to toggle';
    card.appendChild(hint);

    o.appendChild(card);
    document.body.appendChild(o);

    var st = document.createElement('style');
    st.textContent = [
        '.dev-avatar-wrap{width:80px;height:80px;border-radius:50%;overflow:hidden;margin:0 auto 6px;border:3px solid rgba(236,72,153,0.6);box-shadow:0 0 20px rgba(236,72,153,0.4);}',
        '.dev-avatar-img{width:100%;height:100%;object-fit:cover;display:block;}',
        '.dev-linkedin-btn{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:10px 22px;background:linear-gradient(135deg,#0077B5,#00A0DC);color:#fff !important;text-decoration:none;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:0.3px;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(0,119,181,0.4);}',
        '.dev-linkedin-btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,119,181,0.6);}'
    ].join('');
    document.head.appendChild(st);

    function hide() { o.classList.remove('dev-visible'); }
    o.addEventListener('click', function(e) { if (e.target === o) hide(); });
    closeBtn.addEventListener('click', hide);

    var tabPressed = false;
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') { tabPressed = true; }
        if (tabPressed && (e.key === 'a' || e.key === 'A')) {
            e.preventDefault();
            o.classList.toggle('dev-visible');
            if (o.classList.contains('dev-visible')) spawnBurst();
        }
    });
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') { tabPressed = false; }
    });

    function spawnBurst() {
        var colors = ['#FF2D55','#FFD43B','#3B82F6','#17D27F','#A855F7','#FF7A18'];
        var rect = card.getBoundingClientRect();
        for (var i = 0; i < 22; i++) {
            var dot = document.createElement('span');
            dot.className = 'dev-burst-dot';
            var angle = (i / 22) * 360;
            var dist = 80 + Math.random() * 60;
            var rad = (angle * Math.PI) / 180;
            dot.style.cssText = 'position:fixed;left:' + (rect.left + rect.width/2) + 'px;top:' + (rect.top + rect.height/2) + 'px;background:' + colors[i%colors.length] + ';--tx:' + (Math.cos(rad)*dist) + 'px;--ty:' + (Math.sin(rad)*dist) + 'px;';
            document.body.appendChild(dot);
            setTimeout(function(){ dot.remove(); }, 800);
        }
    }
})();`;

// Verify: decode back and check for syntax errors
try {
    const b64 = Buffer.from(code, 'utf8').toString('base64');
    const decoded = Buffer.from(b64, 'base64').toString('utf8');
    if (decoded !== code) {
        console.error('ENCODE/DECODE MISMATCH!');
        process.exit(1);
    }
    // Quick syntax check
    new Function(decoded);
    console.log('SYNTAX OK');
    console.log(b64);
} catch(e) {
    console.error('SYNTAX ERROR:', e.message);
    process.exit(1);
}
