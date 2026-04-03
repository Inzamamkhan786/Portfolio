
        /* ================================================================
           HOW TO PLUG IN YOUR PROJECT IMAGES
           ================================================================
           Each project card has a data-slides attribute.
           Replace the placeholder names like CLOUD_IMG_1 with real image URLs.
        
           Option A — Use hosted URLs (Imgur, GitHub raw, etc.):
             data-slides="https://i.imgur.com/abc.png,https://i.imgur.com/def.png"
        
           Option B — Use local paths (if running on a server):
             data-slides="images/cloud1.png,images/cloud2.png"
        
           The slider will auto-build from whatever URLs you provide.
           If a URL starts with "CLOUD_" / "ECOM_" / etc. (placeholder),
           the slider shows a styled placeholder card instead.
           ================================================================ */

        /* ---- Image Slider builder ---- */
        const PROJECT_LABELS = {
            CLOUD: { emoji: '☁️', name: 'Cloud Storage System' },
            ECOM: { emoji: '🛒', name: 'IngeneousStore' },
            VR: { emoji: '🥽', name: 'AR/VR Simulator' },
            MEOW: { emoji: '🐱', name: 'Meowtopia' },
            ML: { emoji: '🤖', name: 'Credit Score ML' },
        };

        function isPlaceholder(url) {
            return /^(CLOUD|ECOM|VR|MEOW|ML)_IMG_\d+$/.test(url) || url.trim() === '';
        }

        function buildSliders() {
            document.querySelectorAll('.img-slider').forEach(slider => {
                const rawSlides = (slider.dataset.slides || '').split(',').map(s => s.trim()).filter(Boolean);
                if (!rawSlides.length) return;

                const track = document.createElement('div');
                track.className = 'img-slider-track';

                rawSlides.forEach((url, i) => {
                    if (isPlaceholder(url)) {
                        // Show a styled placeholder instead of a broken image
                        const prefix = url.split('_IMG_')[0];
                        const info = PROJECT_LABELS[prefix] || { emoji: '🖼️', name: 'Screenshot' };
                        const ph = document.createElement('div');
                        ph.className = 'slide-placeholder';
                        ph.innerHTML = `
          <div class="slide-placeholder-icon">${info.emoji}</div>
          <div class="slide-placeholder-label">${info.name} · Screenshot ${i + 1}</div>
          <div style="font-size:.55rem;color:var(--text3);font-family:var(--font-mono);margin-top:6px;">Add your image URL in data-slides</div>`;
                        track.appendChild(ph);
                    } else {
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = `Screenshot ${i + 1}`;
                        img.className = 'img-slider-slide';
                        img.loading = 'lazy';
                        track.appendChild(img);
                    }
                });

                slider.appendChild(track);

                // Controls
                const ctrl = document.createElement('div');
                ctrl.className = 'slider-controls';

                const prevBtn = document.createElement('button');
                prevBtn.className = 'slider-btn'; prevBtn.textContent = '‹';

                const dotsWrap = document.createElement('div');
                dotsWrap.className = 'slider-dots';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'slider-btn'; nextBtn.textContent = '›';

                let current = 0;
                const total = rawSlides.length;

                const dots = rawSlides.map((_, i) => {
                    const d = document.createElement('div');
                    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
                    d.onclick = () => goTo(i);
                    dotsWrap.appendChild(d);
                    return d;
                });

                function goTo(idx) {
                    current = (idx + total) % total;
                    track.style.transform = `translateX(-${current * 100}%)`;
                    dots.forEach((d, i) => d.classList.toggle('active', i === current));
                }

                prevBtn.onclick = () => goTo(current - 1);
                nextBtn.onclick = () => goTo(current + 1);

                ctrl.appendChild(prevBtn);
                ctrl.appendChild(dotsWrap);
                ctrl.appendChild(nextBtn);
                slider.appendChild(ctrl);

                // Auto-slide every 3s
                let autoSlide = setInterval(() => goTo(current + 1), 3000);
                slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
                slider.addEventListener('mouseleave', () => { autoSlide = setInterval(() => goTo(current + 1), 3000); });
            });
        }
        buildSliders();

        /* ---- Cursor ---- */
        const cur = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
        (function animRing() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); })();
        document.querySelectorAll('a,button,.soc,.contact-email').forEach(el => {
            el.addEventListener('mouseenter', () => { cur.style.width = '14px'; cur.style.height = '14px'; ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = 'rgba(0,210,255,.6)'; });
            el.addEventListener('mouseleave', () => { cur.style.width = '8px'; cur.style.height = '8px'; ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(0,210,255,.35)'; });
        });

        /* ---- Loader ---- */
        const lmsgs = ['Initializing...', 'Loading modules...', 'Building UI...', 'Fetching projects...', 'Almost ready...', 'Welcome!'];
        let pct = 0;
        const lFill = document.getElementById('loaderFill');
        const lMsg = document.getElementById('loaderMsg');
        const ltid = setInterval(() => {
            pct += Math.random() * 20 + 6; if (pct >= 100) { pct = 100; clearInterval(ltid); }
            lFill.style.width = pct + '%';
            lMsg.textContent = lmsgs[Math.min(Math.floor(pct / 17), lmsgs.length - 1)];
            if (pct === 100) { setTimeout(() => { document.getElementById('loader').classList.add('hidden'); document.getElementById('nav').classList.add('visible'); }, 420); }
        }, 220);

        /* ---- Scroll reveal ---- */
        const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }); }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

        /* ---- Project filter ---- */
        function filterProj(stack, btn) {
            document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.proj-card').forEach(card => {
                card.style.display = (stack === 'all' || card.dataset.stack === stack) ? '' : 'none';
            });
        }

        /* ---- Active nav highlight ---- */
        const sIds = ['hero', 'skills', 'projects', 'experience', 'certificates', 'achievements', 'contact'];
        window.addEventListener('scroll', () => {
            const y = window.scrollY + 120;
            sIds.forEach(id => {
                const el = document.getElementById(id); if (!el) return;
                const lk = document.querySelector(`.nav-link[href="#${id}"]`); if (!lk) return;
                if (y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) { document.querySelectorAll('.nav-link').forEach(l => l.style.color = ''); lk.style.color = 'var(--cyan)'; }
            });
        }, { passive: true });

        /* ================================================================
           CONTACT FORM — powered by FormSubmit.co
           Zero configuration needed. First submission will ask you to
           confirm your email (one-time). After that every message goes
           straight to haquemdinzamamul3@gmail.com
           ================================================================ */
        async function sendEmail() {
            const name = document.getElementById('cf-name').value.trim();
            const email = document.getElementById('cf-email').value.trim();
            const subject = document.getElementById('cf-subject').value.trim();
            const message = document.getElementById('cf-msg').value.trim();
            const status = document.getElementById('formStatus');
            const btn = document.getElementById('sendBtn');

            // Basic validation
            if (!name || !email || !subject || !message) {
                status.textContent = '⚠ Please fill in all fields.';
                status.style.color = 'var(--gold)';
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                status.textContent = '⚠ Please enter a valid email address.';
                status.style.color = 'var(--gold)';
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Sending…';
            status.textContent = '';
            status.style.color = 'var(--text3)';

            try {
                const res = await fetch('https://formsubmit.co/ajax/haquemdinzamamul3@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message,
                        _captcha: 'false',
                        _template: 'table',
                    }),
                });

                const data = await res.json();

                if (data.success === 'true' || data.success === true) {
                    status.textContent = '✓ Message sent! I will get back to you soon.';
                    status.style.color = 'var(--green)';
                    btn.textContent = '✓ Sent!';
                    btn.style.background = 'rgba(16,185,129,.1)';
                    btn.style.borderColor = 'rgba(16,185,129,.28)';
                    btn.style.color = 'var(--green)';
                    // clear fields
                    ['cf-name', 'cf-email', 'cf-subject', 'cf-msg'].forEach(id => document.getElementById(id).value = '');
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.textContent = 'Send Message';
                        btn.style.background = btn.style.borderColor = btn.style.color = '';
                    }, 4000);
                } else {
                    throw new Error('FormSubmit returned failure');
                }
            } catch (err) {
                console.error('Form error:', err);
                status.innerHTML = '✗ Could not send. Email me directly: <a href="mailto:haquemdinzamamul3@gmail.com" style="color:var(--cyan)">haquemdinzamamul3@gmail.com</a>';
                status.style.color = '#ef4444';
                btn.disabled = false;
                btn.textContent = 'Try Again';
            }
        }

        /* ================================================================
           STAR FIELD — fills entire hero section
           ================================================================ */
        (function initStars() {
            const sc = document.getElementById('starCanvas');
            if (!sc) return;
            const ctx = sc.getContext('2d');
            const DPR = window.devicePixelRatio || 1;

            function resize() {
                sc.width = sc.parentElement.offsetWidth * DPR;
                sc.height = sc.parentElement.offsetHeight * DPR;
                sc.style.width = sc.parentElement.offsetWidth + 'px';
                sc.style.height = sc.parentElement.offsetHeight + 'px';
            }
            resize();
            window.addEventListener('resize', resize);

            // Generate stars with varied sizes and colours
            const N = 320;
            const stars = Array.from({ length: N }, () => ({
                x: Math.random(),
                y: Math.random(),
                r: Math.random() * 1.5 + 0.2,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.015 + 0.004,
                col: Math.random() < .12 ? [179, 157, 219] : Math.random() < .08 ? [128, 222, 234] : [255, 255, 255],
            }));

            // Shooting star state
            let shot = null;
            function spawnShot() {
                const W = sc.parentElement.offsetWidth;
                const H = sc.parentElement.offsetHeight;
                shot = { x: Math.random() * W * .6, y: Math.random() * H * .4, vx: 4 + Math.random() * 3, vy: 1.5 + Math.random() * 2, life: 1 };
                setTimeout(spawnShot, 4000 + Math.random() * 5000);
            }
            setTimeout(spawnShot, 2000);

            function draw(ts) {
                const W = sc.parentElement.offsetWidth;
                const H = sc.parentElement.offsetHeight;
                ctx.clearRect(0, 0, sc.width, sc.height);

                // Nebula blobs
                [[.15, .25, 140, 'rgba(0,100,160,.07)'], [.85, .65, 180, 'rgba(80,20,140,.09)'], [.5, .8, 100, 'rgba(0,150,120,.05)']].forEach(([fx, fy, r, c]) => {
                    const g = ctx.createRadialGradient(fx * W, fy * H, 0, fx * W, fy * H, r);
                    g.addColorStop(0, c); g.addColorStop(1, 'transparent');
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(fx * W, fy * H, r, 0, Math.PI * 2); ctx.fill();
                });

                // Stars
                stars.forEach(s => {
                    s.phase += s.speed;
                    const a = .35 + .65 * Math.abs(Math.sin(s.phase));
                    const [r, g, b] = s.col;
                    ctx.beginPath();
                    ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
                    ctx.fill();
                });

                // Shooting star
                if (shot) {
                    const tail = 60;
                    const grad = ctx.createLinearGradient(shot.x - shot.vx * tail / shot.vx, shot.y - shot.vy * tail / shot.vy, shot.x, shot.y);
                    grad.addColorStop(0, 'rgba(255,255,255,0)');
                    grad.addColorStop(1, `rgba(255,255,255,${(shot.life * .7).toFixed(2)})`);
                    ctx.beginPath(); ctx.moveTo(shot.x - shot.vx * 20, shot.y - shot.vy * 20); ctx.lineTo(shot.x, shot.y);
                    ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
                    shot.x += shot.vx; shot.y += shot.vy; shot.life -= .012;
                    if (shot.life <= 0 || shot.x > W || shot.y > H) shot = null;
                }

                requestAnimationFrame(draw);
            }
            requestAnimationFrame(draw);
        })();



        /* ================================================================
           CONTACT FORM — Web3Forms (truly zero-setup, free, works now)
           ================================================================ */
        async function sendEmail() {
            const name = document.getElementById('cf-name').value.trim();
            const email = document.getElementById('cf-email').value.trim();
            const subject = document.getElementById('cf-subject').value.trim();
            const message = document.getElementById('cf-msg').value.trim();
            const status = document.getElementById('formStatus');
            const btn = document.getElementById('sendBtn');

            if (!name || !email || !subject || !message) {
                status.textContent = '⚠ Please fill in all fields.';
                status.style.color = 'var(--gold)'; return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                status.textContent = '⚠ Please enter a valid email address.';
                status.style.color = 'var(--gold)'; return;
            }

            btn.disabled = true;
            btn.textContent = 'Sending…';
            status.textContent = ''; status.style.color = 'var(--text3)';

            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        /* ── IMPORTANT: Get your FREE key at https://web3forms.com
                           Enter your email → get a key → paste it below.
                           Current key below is a placeholder — replace it!       */
                        access_key: 'YOUR_WEB3FORMS_KEY_HERE',
                        name, email, subject, message,
                        from_name: name,
                    }),
                });
                const data = await res.json();
                if (data.success) {
                    status.textContent = '✓ Message sent! I will get back to you soon.';
                    status.style.color = 'var(--green)';
                    btn.textContent = '✓ Sent!';
                    btn.style.cssText = 'background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.28);color:var(--green)';
                    ['cf-name', 'cf-email', 'cf-subject', 'cf-msg'].forEach(id => document.getElementById(id).value = '');
                    setTimeout(() => { btn.disabled = false; btn.textContent = 'Send Message'; btn.style.cssText = ''; }, 4000);
                } else throw new Error(data.message || 'Failed');
            } catch (err) {
                console.error(err);
                status.innerHTML = '✗ Could not send. Email directly: <a href="mailto:haquemdinzamamul3@gmail.com" style="color:var(--cyan)">haquemdinzamamul3@gmail.com</a>';
                status.style.color = '#ef4444';
                btn.disabled = false; btn.textContent = 'Try Again';
            }
        }

        document.querySelectorAll('.img-slider').forEach(slider => {

            const track = slider.querySelector('.img-slider-track');
            const slides = slider.querySelectorAll('.img-slider-slide');
            const next = slider.querySelector('.slider-btn.next');
            const prev = slider.querySelector('.slider-btn.prev');
            const dots = slider.querySelectorAll('.slider-dot');

            let index = 0;

            function update() {
                track.style.transform = `translateX(-${index * 100}%)`;

                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            }

            function nextSlide() {
                index = (index + 1) % slides.length;
                update();
            }

            // Auto slide every 2 seconds
            let autoSlide = setInterval(nextSlide, 2000);

            // Optional: Pause on hover
            slider.addEventListener('mouseenter', () => {
                clearInterval(autoSlide);
            });

            slider.addEventListener('mouseleave', () => {
                autoSlide = setInterval(nextSlide, 2000);
            });

            // Manual buttons
            next?.addEventListener('click', nextSlide);

            prev?.addEventListener('click', () => {
                index = (index - 1 + slides.length) % slides.length;
                update();
            });

        });
    