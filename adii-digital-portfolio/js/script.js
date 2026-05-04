// js/script.js
(function(){
    'use strict';

    const loaderWrapper = document.getElementById('loaderWrapper');
    if(loaderWrapper) {
        window.addEventListener('load', () => { setTimeout(() => loaderWrapper.classList.add('hidden'), 700) });
        setTimeout(() => loaderWrapper.classList.add('hidden'), 3500);
    }

    const cursorOuter = document.getElementById('cursorOuter');
    const cursorInner = document.getElementById('cursorInner');
    let mx = 0, my = 0, cx = 0, cy = 0;
    if(cursorOuter && cursorInner) {
        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cursorInner.style.left = mx + 'px';
            cursorInner.style.top = my + 'px';
        });
        function animCursor() {
            cx += (mx - cx) * 0.12;
            cy += (my - cy) * 0.12;
            cursorOuter.style.left = cx + 'px';
            cursorOuter.style.top = cy + 'px';
            requestAnimationFrame(animCursor);
        }
        animCursor();
        const magEls = document.querySelectorAll('.magnetic-btn, a, button, input, textarea, select, .portfolio-card, .service-card, .pricing-card, .feature-card');
        magEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOuter.classList.add('hover-magnetic');
                cursorInner.classList.add('hover-magnetic');
            });
            el.addEventListener('mouseleave', () => {
                cursorOuter.classList.remove('hover-magnetic');
                cursorInner.classList.remove('hover-magnetic');
            });
        });
    }

    const scrollBar = document.getElementById('scrollProgressBar');
    window.addEventListener('scroll', () => {
        const st = window.scrollY;
        const dh = document.documentElement.scrollHeight - window.innerHeight;
        if(scrollBar && dh > 0) scrollBar.style.width = (st / dh) * 100 + '%';
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    if(mobileBtn && navbar) {
        mobileBtn.addEventListener('click', () => navbar.classList.toggle('mobile-open'));
    }

    const revealEls = document.querySelectorAll('.reveal-element');
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting) {
                e.target.classList.add('visible');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => revealObs.observe(el));

    // ✅ Form ab sahi se submit hogi – preventDefault hataya
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Feedback ke liye button temporary change
            const btn = contactForm.querySelector('.form-submit-btn');
            if(btn) {
                const orig = btn.innerHTML;
                btn.innerHTML = '✓ Sending...';
                btn.style.background = '#22c55e';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2500);
            }
            // Ab yahan koi e.preventDefault() nahi – form direct formspree ko submit hogi
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if(id === '#') return;
            const target = document.querySelector(id);
            if(target) {
                e.preventDefault();
                const nh = navbar ? navbar.offsetHeight + 18 : 80;
                const tp = target.getBoundingClientRect().top + window.scrollY - nh;
                window.scrollTo({ top: tp, behavior: 'smooth' });
                if(navbar) navbar.classList.remove('mobile-open');
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let cur = '';
        sections.forEach(s => {
            if(window.scrollY >= s.offsetTop - 180) cur = s.getAttribute('id');
        });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if(l.getAttribute('data-section') === cur) l.classList.add('active');
        });
    });

    const orbs = document.querySelectorAll('.hero-orb');
    if(orbs.length) {
        document.addEventListener('mousemove', e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 18;
            const y = (e.clientY / window.innerHeight - 0.5) * 18;
            orbs.forEach((o, i) => {
                const f = (i + 1) * 0.5;
                o.style.transform = `translate(${x * f}px, ${y * f}px)`;
            });
        });
    }

    console.log('%c Adii Digital %c Portfolio v2.0 ',
        'background:#6366f1;color:#fff;padding:6px 14px;border-radius:6px 0 0 6px;font-weight:700;',
        'background:#0a0a14;color:#06b6d4;padding:6px 14px;border-radius:0 6px 6px 0;');
})();