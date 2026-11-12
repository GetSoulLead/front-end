document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. HERO SECTION ---
    const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 }
    });

    tl.from(".hero-logo", { y: -40, opacity: 0 })
        .from(".hero-title", { y: 50, opacity: 0 }, "-=0.8")
        .from(".hero-desc", { y: 30, opacity: 0 }, "-=0.8")
        .from(".hero-buttons .btn", {
            y: 30, opacity: 0, scale: 0.9, stagger: 0.2, duration: 0.8, clearProps: "all"
        }, "-=0.6");

    gsap.to(".hero-background video", {
        scale: 1.2,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    // --- 2. MAIN FORM SECTION ---
    gsap.from(".form-card", {
        y: 100, opacity: 0, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: ".main-form", start: "top 85%" }
    });

    gsap.from(".form-card h3", {
        x: -30, opacity: 0, duration: 1, delay: 0.3,
        scrollTrigger: { trigger: ".form-card", start: "top 80%" }
    });

    gsap.from(".form-card .col-md-3, .form-card .col-12", {
        y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: "form", start: "top 85%" }
    });

    // --- 3. WHY SECTION (About Us) ---
    const whySection = document.querySelector('.why-section');
    const whyTl = gsap.timeline({
        scrollTrigger: { trigger: whySection, start: "top 70%" }
    });

    whyTl.from(whySection.querySelector(".small-title"), { x: -50, opacity: 0, duration: 0.6 })
        // .from(whySection.querySelector(".main-title"), { x: -50, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(whySection.querySelector(".desc"), { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(whySection.querySelectorAll(".feature-box"), { x: -30, opacity: 0, stagger: 0.3, duration: 0.8 }, "-=0.4")
        .from(whySection.querySelector(".btn-theme"), { y: 20, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.3");

    // Right side images
    gsap.from(".image-area .img1", { x: 100, opacity: 0, duration: 1.2, scrollTrigger: { trigger: ".image-area", start: "top 60%" } });
    gsap.from(".image-area .img2", { y: 100, opacity: 0, duration: 1.2, delay: 0.3, scrollTrigger: { trigger: ".image-area", start: "top 60%" } });

    gsap.from(".experience-badge", {
        scale: 0, rotation: -180, opacity: 0, duration: 1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".image-area", start: "top 50%" }
    });

    gsap.to(".circle-svg", { rotation: 360, duration: 10, repeat: -1, ease: "none" });

    // --- 4. DISCOVER MENU SECTION ---
    const discoverMenu = document.querySelector('.discover-menu');
    const menuTl = gsap.timeline({
        scrollTrigger: { trigger: discoverMenu, start: "top 80%" }
    });

    menuTl.from(discoverMenu.querySelector(".small-title"), { y: -30, autoAlpha: 1, opacity: 0, duration: 0.8 })
        // .from(discoverMenu.querySelector(".main-title"), { y: 30, autoAlpha: 1, opacity: 0, duration: 0.8 }, "-=0.5");

    gsap.from(".menu-grid > div", {
        scale: 0.8, y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "expo.out",
        scrollTrigger: { trigger: ".menu-grid", start: "top 85%" }
    });

    // Button Hover
    const cards = document.querySelectorAll('.menu-item');
    cards.forEach(card => {
        const btn = card.querySelector('.btn-theme');
        if (btn) {
            card.addEventListener('mouseenter', () => gsap.to(btn, { y: -5, scale: 1.05, duration: 0.3 }));
            card.addEventListener('mouseleave', () => gsap.to(btn, { y: 0, scale: 1, duration: 0.3 }));
        }
    });
    // --- 5. TASTE SECTION  ---
    const tasteSection = document.querySelector('.taste-section');
    const tasteTl = gsap.timeline({
        scrollTrigger: {
            trigger: tasteSection,
            start: "top 70%", 
            toggleActions: "play none none none"
        }
    });

    tasteTl.from(".red-half-bg", {
        xPercent: 100,
        duration: 1,
        ease: "power2.inOut"
    })

        // B. Black Box 
        .from(".black-box", {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5")

        // C. Taste Text
        .from(".taste-text", {
            x: -100,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4")

        // D. Stats Grid
        .from(".stat-item", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6
        }, "-=0.3");

    // E. Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => {
        const value = parseInt(num.innerText);
        if (!isNaN(value)) {
            gsap.from(num, {
                textContent: 0,
                duration: 2,
                ease: "power1.out",
                snap: { textContent: 1 }, 
                scrollTrigger: {
                    trigger: num,
                    start: "top 90%"
                }
            });
        }
    });

    // --- 6. FEATURES SECTION  ---
    const featureCards = document.querySelectorAll('.feature-card');

    if (featureCards.length > 0) {
        gsap.from(".features-section .small-title, .features-section", {
            scrollTrigger: {
                trigger: ".features-section",
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });

        // 2. Cards Animation
        gsap.from(featureCards, {
            scrollTrigger: {
                trigger: ".features-section .row",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 40,          
            scale: 0.98,    
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            onComplete: function () {
              
                featureCards.forEach(card => card.classList.add('is-ready'));
            },
            clearProps: "all"
        });
    }
    // --- 7. BLOG SECTION ANIMATION ---
    const blogSection = document.querySelector('.blog-section');
    
    if (blogSection) {
        gsap.from(blogSection.querySelectorAll(".small-title"), {
            scrollTrigger: {
                trigger: blogSection,
                start: "top 85%",
            },
            x: -50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(".blog-card", {
            scrollTrigger: {
                trigger: ".blog-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            clearProps: "all" 
        });

        gsap.from(".blog-image", {
            scrollTrigger: {
                trigger: ".blog-grid",
                start: "top 80%",
            },
            scale: 1.1,
            duration: 1.5,
            ease: "power2.out"
        });
    }
});

gsap.to(".ma-testimonial-section", {
  backgroundPosition: "50% 80%",
  ease: "none",
  scrollTrigger: {
    trigger: ".ma-testimonial-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  }
});

const promisesTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".promies-grid", 
        start: "top 85%",       
        toggleActions: "play none none reverse"
    }
});

promisesTl.from(".promies-grid .col-6", {
    y: 40,              
    scale: 0.8,           
    opacity: 0,         
    duration: 0.8,
    stagger: 0.2,        
    ease: "back.out(1.7)" 
});

promisesTl.from(".promies-grid p", {
    opacity: 0,
    duration: 0.5,
}, "-=0.4"); 



const magic = gsap.timeline({
    scrollTrigger: {
        trigger: ".magic-section",
        start: "top 80%", 
        toggleActions: "play none none reverse"
    }
});

magic.from(".magic-section .text-center", {
    y: 50,
    opacity: 0,
    duration: 1
});

magic.from(".left-card", {
    x: -100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
}, "-=0.5");

magic.from(".right-card", {
    x: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
}, "-=1");

magic.from(".center-img-wrapper", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
}, "-=0.8");