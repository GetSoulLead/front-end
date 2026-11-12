document.addEventListener("DOMContentLoaded", function () {

    const teamTexts = document.querySelectorAll('.team-card h2, .team-card p, .team-card .btn-theme');
    teamTexts.forEach(text => {
        Splitting({
            target: text,
            by: 'chars'
        });
    });

    const allSocials = document.querySelectorAll('.social-overlay');
    allSocials.forEach(box => {
        Splitting({
            target: box,
            by: 'nodes',
            key: 'item-index'
        });
    });
});

gsap.registerPlugin(ScrollTrigger);

const aboutImageRevealStyle = document.createElement("style");
aboutImageRevealStyle.textContent = `
    .about-scroll-image-reveal {
        opacity: 0;
        transform: translateX(-5%);
        clip-path: inset(0 100% 0 0);
        will-change: transform, clip-path, opacity;
    }

    .about-scroll-image-reveal.is-visible {
        opacity: 1;
        transform: translateX(0);
        clip-path: inset(0 0 0 0);
        animation: aboutImageScrollReveal 900ms ease-out forwards;
    }

    @keyframes aboutImageScrollReveal {
        0% {
            transform: translateX(-5%);
            clip-path: inset(0 100% 0 0);
            opacity: 0;
        }

        100% {
            transform: translateX(0);
            clip-path: inset(0 0 0 0);
            opacity: 1;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .about-scroll-image-reveal {
            opacity: 1;
            transform: none;
            clip-path: none;
            will-change: auto;
        }

        .about-scroll-image-reveal.is-visible {
            animation: none;
        }
    }
`;
document.head.appendChild(aboutImageRevealStyle);

document.addEventListener("DOMContentLoaded", function () {
    const canRevealImage = (element) => {
        return !element.closest("header, .top-header, footer, .discover-menu, .flip-card") && element.id !== "canvas-img";
    };

    // Only <img> tags — never CSS background-image containers.
    // Background-image divs/sections set to opacity:0 would stay hidden if
    // their ScrollTrigger start point is already past on load.
    const revealImages = Array.from(document.querySelectorAll("body img")).filter(canRevealImage);

    if (!revealImages.length) {
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        revealImages.forEach((image) => {
            image.classList.add("about-scroll-image-reveal", "is-visible");
        });
        return;
    }

    revealImages.forEach((image) => {
        image.classList.add("about-scroll-image-reveal");
        gsap.set(image, {
            opacity: 0,
            x: "-5%",
            clipPath: "inset(0 100% 0 0)"
        });

        gsap.to(image, {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0 0 0)",
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: image,
                start: "top 85%",
                once: true,
                onEnter: () => image.classList.add("is-visible")
            }
        });
    });
});

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top center",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
    }
});

tl.from(".banner-content h1", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
})
    .from(".banner-content p", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")

gsap.to(".hero-section", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".samurai-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
    }
});

// Image animation
tl2.from(".img-container", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
})

    .from(".brand-header, .title-text, .sub-text", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8")

    .from(".feature-item", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.4")

    .from(".cta-box", {
        y: 20,
        opacity: 0,
        duration: 0.5
    }, "-=0.2");

// Mission
const logoTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".logo-section",
        start: "top 80%",
    }
});

logoTl.from(".tailored-tag, .logo-heading", {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
});

logoTl.from(".logo-divider", {
    scaleX: 0,
    transformOrigin: "center center",
    duration: 1,
    ease: "power4.inOut"
}, "-=0.5");

logoTl.from(".brand-logo", {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "back.out(1.7)"
}, "-=0.3");


let oursection = gsap.timeline({
    scrollTrigger: {
        trigger: ".our-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
    }
});

oursection.from(".detail-card", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
    immediateRender: false
});

oursection.from(".detail-side-card", {
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
}, "-=0.5");

oursection.from(".detail-side-card .content h5, .detail-side-card .content p", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
}, "-=0.3");

const milestoneCards = gsap.timeline({
    scrollTrigger: {
        trigger: ".milestone-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

milestoneCards.from(".milestone-item", {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

milestoneCards.from(".card__background", {
    scale: 1.2,
    duration: 1.5,
    ease: "power2.out"
}, "-=1");

milestoneCards.from(".card__title", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
}, "-=0.8");

const trainersTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".trainers-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

trainersTl.from(".expert-badge, .trainers-section h2", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

trainersTl.from(".trainer-item", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
}, "-=0.4");


document.addEventListener("DOMContentLoaded", function () {
    const myOffcanvas = document.getElementById('trainerCanvas');
    const viewBtns = document.querySelectorAll('.btn-theme');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.team-card');
            const name = card.querySelector('h2').innerText;
            const role = card.querySelector('p').innerText;
            const img = card.querySelector('img').src;

            document.getElementById('canvas-name').innerText = name;
            document.getElementById('canvas-role').innerText = role;
            document.getElementById('canvas-img').src = img;

            const highlightColor = getComputedStyle(card).getPropertyValue('--highlight');
            document.querySelector('.prof-trainer-canvas').style.setProperty('--highlight', highlightColor);
        });
    });

    const tl = gsap.timeline({ paused: true });

    tl.from(".anim-stagger", {
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
    })
        .to(".accent-line", {
            width: 60,
            duration: 0.4,
            ease: "back.out(1.7)"
        }, "-=0.3");

    myOffcanvas.addEventListener('shown.bs.offcanvas', () => tl.play());

    myOffcanvas.addEventListener('hide.bs.offcanvas', () => {
        tl.reverse();
    });
});

const magicTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".magic-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
    }
});

magicTimeline.from(".small-title, .main-title", {
    // y: 30,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

magicTimeline.from(".main-img", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
}, "-=0.5");

magicTimeline.fromTo(".left-card",
    {
        xPercent: -100,
        autoAlpha: 0
    },
    {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility"
    },
    "-=0.8"
);

magicTimeline.fromTo(".right-card",
    {
        xPercent: 100,
        autoAlpha: 0
    },
    {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility"
    },
    "-=1"
);


window.addEventListener('scroll', () => {
    const sidebar = document.getElementById('sidebar');
    const hero = document.getElementById('hero-section');
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.custom-sidebar .icon-box');

    if (!sidebar || !hero) return;

    const scrollY = window.pageYOffset;

    if (scrollY >= hero.offsetHeight) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.remove('active');
    }

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");

    gsap.to(counter, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: ".stats-wrapper",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});


const jkdTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".promies-grid",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
    }
});

jkdTimeline.from(".descriptionp h2", {
    x: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
})
    .from(".descriptionp p", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4")

    .from(".logo-side-img img", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.6");

gsap.from(".program-content h1 span", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".program-section",
        start: "top 75%",
    }
});

gsap.from(".text-rotate-box p", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.5,
    scrollTrigger: {
        trigger: ".text-rotate-box",
        start: "top 85%",
    }
});


gsap.from(".program-curve", {
    x: "-100%",
    duration: 1.5,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".program-section",
        start: "top 80%",
    }
});



const ctaTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".new-cta",
        start: "top 85%",
        toggleActions: "play none none reverse"
    }
});

ctaTimeline.from(".new-cta__content", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
})

.from(".new-cta__left h2", {
    x: -50,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
}, "-=0.4")

gsap.from(".cta-content > *", {
    scrollTrigger: {
        trigger: ".bg-cta",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

gsap.to(".circle-drop-shadow", {
    scrollTrigger: {
        trigger: ".bg-cta",
        start: "top bottom",
        scrub: true
    },
    // x: 100,
    // y: 50
});

gsap.to(".circle-drop-shadow.two", {
    scrollTrigger: {
        trigger: ".bg-cta",
        start: "top bottom",
        scrub: true
    },
    x: -100,
    y: -50
});

gsap.from(".promies-grid .col-md-6:first-child .descriptions", {
    scrollTrigger: {
        trigger: ".promies-grid",
        start: "top 80%",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".promies-grid .col-md-6:last-child .descriptions", {
    scrollTrigger: {
        trigger: ".promies-grid",
        start: "top 80%",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.timeline({
    scrollTrigger: {
        trigger: ".academy-promise__visual",
        start: "top 80%",
    }
})
.from(".section-tag", {
    y: 30,
    opacity: 0,
    duration: 0.6
})
.from(".main-title", {
    y: 40,
    opacity: 0,
    duration: 0.8
}, "-=0.3")
.from(".main-desc", {
    y: 40,
    opacity: 0,
    duration: 0.8
}, "-=0.4")
.from(".academy-promise__visual", {
    scale: 0.9,
    opacity: 0,
    duration: 1
}, "-=0.5");


// RIGHT SIDE FEATURES (stagger animation)
gsap.from(".academy-promise__feature", {
    scrollTrigger: {
        trigger: ".academy-promise__features",
        start: "top 80%",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.25,
    ease: "power3.out"
});


// ICON POP EFFECT
gsap.from(".academy-promise__icon img", {
    scrollTrigger: {
        trigger: ".academy-promise__features",
        start: "top 85%",
    },
    scale: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: "back.out(2)"
});


// FLOATING LEAF
gsap.from(".academy-promise__leaf", {
    scrollTrigger: {
        trigger: ".academy-promise__leaf",
        start: "top 90%",
    },
    x: 100,
    opacity: 0,
    duration: 1
});


// CONTINUOUS FLOAT (premium feel)
gsap.to(".academy-promise__spark", {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut"
});
