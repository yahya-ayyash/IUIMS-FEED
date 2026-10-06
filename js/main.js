/* ============================================
   IBNU UMAR ISLAMIC MATRICULATION SCHOOL
   Custom JavaScript — All Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 500);
        });
        // Fallback: hide preloader after 3 seconds regardless
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 3000);
    }

    // ============================================
    // AOS INIT
    // ============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            delay: 50
        });
    }

    // ============================================
    // NAVBAR SCROLL BEHAVIOR
    // ============================================
    const navbar = document.getElementById('mainNavbar');
    let lastScrollTop = 0;
    const topBar = document.querySelector('.top-bar');
    const ribbon = document.querySelector('.ribbon-marquee');

    // Pin the navbar below the top bar (+ announcement ribbon) at page top;
    // both glide out of view as the user scrolls.
    function updateNavTop() {
        if (!navbar) return;
        const topBarH = topBar ? topBar.offsetHeight : 0;
        const ribbonH = ribbon ? ribbon.offsetHeight : 0;
        const hidden = Math.min(window.pageYOffset, topBarH + ribbonH);
        navbar.style.top = `${Math.max(0, topBarH + ribbonH - hidden)}px`;
    }
    updateNavTop();

    function handleNavbarScroll() {
        updateNavTop();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show on scroll direction
            if (scrollTop > 300) {
                if (scrollTop > lastScrollTop) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }
            } else {
                navbar.classList.remove('hidden');
            }
        }

        // Shrink top bar
        if (topBar) {
            if (scrollTop > 100) {
                topBar.style.transform = 'translateY(-100%)';
                topBar.style.position = 'relative';
            } else {
                topBar.style.transform = 'translateY(0)';
            }
        }

        lastScrollTop = Math.max(0, scrollTop);
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // PARTICLES CANVAS (Hero Section)
    // ============================================
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        let animFrameId;

        function resizeCanvas() {
            particlesCanvas.width = particlesCanvas.parentElement.offsetWidth;
            particlesCanvas.height = particlesCanvas.parentElement.offsetHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > particlesCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > particlesCanvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles() {
            resizeCanvas();
            particles = [];
            const count = Math.min(80, Math.floor((particlesCanvas.width * particlesCanvas.height) / 12000));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animFrameId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            cancelAnimationFrame(animFrameId);
            initParticles();
            animateParticles();
        });
    }

    // ============================================
    // TYPING TEXT EFFECT
    // ============================================
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = [
            'Where Faith Meets Knowledge',
            'Building Future Leaders',
            'Nurturing Young Minds with Islamic Values',
            'Recognized by Govt. of Tamil Nadu'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeText() {
            const current = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingElement.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === current.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before next phrase
            }

            setTimeout(typeText, typingSpeed);
        }

        setTimeout(typeText, 1000);
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        const suffix = counter.getAttribute('data-suffix') || '';
                        counter.textContent = target + suffix;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // 3D TILT EFFECT
    // ============================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ============================================
    // GALLERY FILTER & LIGHTBOX
    // ============================================
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (lightbox && lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            closeLightbox();
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
                const offset = scrolled * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        }, { passive: true });
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const inputs = contactForm.querySelectorAll('[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    input.addEventListener('input', () => {
                        input.style.borderColor = '';
                    }, { once: true });
                }

                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = '#e74c3c';
                    }
                }

                // Phone validation
                if (input.type === 'tel' && input.value.trim()) {
                    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
                    if (!phoneRegex.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = '#e74c3c';
                    }
                }
            });

            if (isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Sent Successfully!';
                btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // Same for admission form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const inputs = admissionForm.querySelectorAll('[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    input.addEventListener('input', () => {
                        input.style.borderColor = '';
                    }, { once: true });
                }
            });

            if (isValid) {
                const btn = admissionForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Enquiry Submitted!';
                btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    admissionForm.reset();
                }, 3000);
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // CLOSE MOBILE NAV ON LINK CLICK
    // ============================================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.getElementById('navbarNav');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // ============================================
    // MOUSE GLOW EFFECT ON HERO
    // ============================================
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroSection.style.setProperty('--mouse-x', `${x}px`);
            heroSection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // ============================================
    // 3D TILT ON .tilt-3d CARDS (depth + sheen)
    // ============================================
    const tilt3dCards = document.querySelectorAll('.tilt-3d');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (finePointer && !reduceMotion && tilt3dCards.length) {
        tilt3dCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width;   // 0..1
                const py = (e.clientY - rect.top) / rect.height;   // 0..1
                const rotY = (px - 0.5) * 14;                      // ±7deg
                const rotX = (0.5 - py) * 12;                      // ±6deg
                card.classList.add('is-tilting');
                card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(14px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('is-tilting');
                card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
            });
        });
    }

    // ============================================
    // HERO 3D PARALLAX (art + headline float)
    // ============================================
    const heroArt = document.querySelector('.mosque-3d');
    const heroHeadline = document.querySelector('.headline-3d');
    const heroForTilt = heroArt ? heroArt.closest('.hero-section') : null;

    if (heroArt && heroForTilt && finePointer && !reduceMotion) {
        heroForTilt.addEventListener('mousemove', (e) => {
            const rect = heroForTilt.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            heroArt.style.transform = `rotateY(${-14 + px * 10}deg) rotateX(${6 - py * 8}deg)`;
            if (heroHeadline) {
                heroHeadline.style.transform = `translate3d(${px * -10}px, ${py * -6}px, 0)`;
            }
        });

        heroForTilt.addEventListener('mouseleave', () => {
            heroArt.style.transform = '';
            if (heroHeadline) heroHeadline.style.transform = '';
        });
    }

});
