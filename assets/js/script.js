// ==================== SCROLL & HAMBURGER ANIMATION ====================
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const navItemDropdowns = document.querySelectorAll('.nav-item-dropdown');
    // NOTE: 1199.98px matches the actual mobile off-canvas breakpoint used in
    // responsive-fixes.css / style.css. (Previously this was mismatched at
    // 991.98px, which caused the tap-to-open behavior to misfire between
    // 992px-1199px widths.)
    const mobileMedia = window.matchMedia('(max-width: 1199.98px)');
    const dropdownPanelSelector = '.full-width-dropdown, .academy-programs-dropdown, .about-simple-dropdown, .contact-simple-dropdown';

    if (!header || !hamburger || !nav) {
        return;
    }

    const setMenuState = function (isOpen) {
        hamburger.classList.toggle('active', isOpen);
        nav.classList.toggle('active', isOpen);
        document.body.classList.toggle('nav-offcanvas-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    const closeDropdowns = function () {
        navItemDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        // Also reset any nested off-canvas sub-level (e.g. V2's tab category panels)
        document.querySelectorAll('.academy-tab-content.mnav-open').forEach(panel => {
            panel.classList.remove('mnav-open');
        });
    };

    // Injects a sticky "Back" button as the first element of a mobile
    // off-canvas panel (idempotent - runs once per panel). Tapping it hands
    // control back to whatever level opened this panel.
    const ensureBackButton = function (panel, label, onBack) {
        if (!panel || panel.querySelector(':scope > .mnav-back-btn')) {
            return;
        }

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mnav-back-btn';
        btn.setAttribute('aria-label', 'Back to previous menu');
        btn.innerHTML = '<i class="bi bi-chevron-left"></i><span>' + label + '</span>';

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            onBack();
        });

        panel.insertBefore(btn, panel.firstChild);
    };

    hamburger.setAttribute('aria-expanded', 'false');

    // ==================== SCROLL EVENT ====================
    // Desktop relies on CSS alone (header slides from top:50px to top:0,
    // which is enough space for .top-header to scroll out of view first).
    // On responsive widths the header sits pinned at top:0 at all times
    // (see responsive-fixes.css / Navbar.css), which left no room for
    // .top-header to be shown at all - it was hidden outright instead.
    // Below we restore it on responsive widths by measuring its real
    // height and pushing the header down by that amount until the user
    // scrolls, then collapsing it out of view exactly like desktop does.
    const topHeader = document.querySelector('.top-header');
    let topHeaderHeight = 0;

    const measureTopHeader = function () {
        if (!topHeader) {
            return;
        }
        topHeaderHeight = topHeader.getBoundingClientRect().height;
    };

    const applyResponsiveHeaderState = function (isScrolled) {
        if (!topHeader) {
            return;
        }

        // Use setProperty(..., 'important') so this reliably wins over the
        // legacy `!important` rules already scattered across the responsive
        // stylesheets instead of fighting their specificity one by one.
        topHeader.style.setProperty('display', 'flex', 'important');

        if (isScrolled) {
            topHeader.style.setProperty('opacity', '0', 'important');
            topHeader.style.setProperty('visibility', 'hidden', 'important');
            topHeader.style.setProperty('pointer-events', 'none', 'important');
            header.style.setProperty('top', '0px', 'important');
        } else {
            topHeader.style.setProperty('opacity', '1', 'important');
            topHeader.style.setProperty('visibility', 'visible', 'important');
            topHeader.style.setProperty('pointer-events', 'auto', 'important');
            header.style.setProperty('top', topHeaderHeight + 'px', 'important');
        }
    };

    const resetResponsiveHeaderState = function () {
        if (!topHeader) {
            return;
        }
        topHeader.style.removeProperty('display');
        topHeader.style.removeProperty('opacity');
        topHeader.style.removeProperty('visibility');
        topHeader.style.removeProperty('pointer-events');
        header.style.removeProperty('top');
    };

    const syncHeaderForViewport = function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (mobileMedia.matches) {
            measureTopHeader();
            applyResponsiveHeaderState(scrollTop > 50);
        } else {
            resetResponsiveHeaderState();
        }
    };

    syncHeaderForViewport();
    window.addEventListener('resize', syncHeaderForViewport);
    window.addEventListener('load', syncHeaderForViewport);
    if (typeof mobileMedia.addEventListener === 'function') {
        mobileMedia.addEventListener('change', syncHeaderForViewport);
    }

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (mobileMedia.matches) {
            applyResponsiveHeaderState(scrollTop > 50);
        }
    });

    // ==================== HAMBURGER MENU TOGGLE ====================
    hamburger.addEventListener('click', function () {
        setMenuState(!nav.classList.contains('active'));
        closeDropdowns();
    });

    // ==================== MOBILE OFF-CANVAS DROPDOWN HANDLER =====================
    // Tapping a dropdown trigger no longer expands it inline (accordion-style).
    // Instead it slides in a full-cover off-canvas panel showing only that
    // category, with a "Back" button to return to the previous menu -
    // matching the pattern used by modern eCommerce mobile navigation.
    navItemDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector(':scope > a');
        const dropdownPanel = dropdown.querySelector(dropdownPanelSelector);

        if (!dropdownToggle || !dropdownPanel) {
            return;
        }

        const categoryLabel = dropdownToggle.textContent.trim();

        ensureBackButton(dropdownPanel, categoryLabel, function () {
            dropdown.classList.remove('active');
        });

        dropdownToggle.addEventListener('click', function (e) {
            if (!mobileMedia.matches) {
                return;
            }

            e.preventDefault();

            navItemDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Closing this dropdown should also reset any nested sub-level
            const isOpening = !dropdown.classList.contains('active');
            dropdown.classList.toggle('active');

            if (!isOpening) {
                dropdownPanel.querySelectorAll('.academy-tab-content.mnav-open').forEach(panel => {
                    panel.classList.remove('mnav-open');
                });
            }
        });

        // ---- Nested off-canvas level for tab-based mega menus (IndexV2's
        // "Our Programs" dropdown: Children / Adult / Kids categories) ----
        const tabButtons = dropdownPanel.querySelectorAll('.academy-tab-btn');

        tabButtons.forEach(tabBtn => {
            const targetId = tabBtn.getAttribute('data-tab');
            const tabContent = targetId ? document.getElementById(targetId) : null;

            if (!tabContent) {
                return;
            }

            ensureBackButton(tabContent, tabBtn.textContent.trim(), function () {
                tabContent.classList.remove('mnav-open');
            });

            tabBtn.addEventListener('click', function (e) {
                if (!mobileMedia.matches) {
                    return;
                }

                e.preventDefault();

                document.querySelectorAll('.academy-tab-content.mnav-open').forEach(panel => {
                    if (panel !== tabContent) {
                        panel.classList.remove('mnav-open');
                    }
                });

                tabContent.classList.add('mnav-open');
            });
        });
    });

    // ==================== NAVIGATION LINK HANDLER ====================
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const parentDropdown = this.closest('.nav-item-dropdown');

            const isMobile = mobileMedia.matches;

            // Tab-category buttons (V2 "Our Programs" mega menu) open a nested
            // off-canvas panel instead of navigating - handled above.
            if (isMobile && this.classList.contains('academy-tab-btn')) {
                e.preventDefault();
                return;
            }

            if (isMobile && parentDropdown && this === parentDropdown.querySelector(':scope > a')) {
                return;
            }

            if (!parentDropdown) {
                navLinks.forEach(l => {
                    if (!l.closest('.nav-item-dropdown')) {
                        l.classList.remove('active');
                    }
                });
                this.classList.add('active');
            }

            setMenuState(false);
            closeDropdowns();

            // Smooth scroll for anchor links
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ==================== CLOSE MENU ON OUTSIDE CLICK ====================
    document.addEventListener('click', function (e) {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('active')) {
            setMenuState(false);
            closeDropdowns();
        }
    });

    // ==================== CLOSE DROPDOWN WHEN CLICKING INSIDE ====================
    // Selecting a real link inside an off-canvas panel closes the whole
    // mobile menu. Taps on the Back button or a tab-category button are not
    // "final" selections, so they're excluded here.
    document.addEventListener('click', function (e) {
        if (e.target.closest('.mnav-back-btn') || e.target.closest('.academy-tab-btn')) {
            return;
        }

        if (e.target.closest(dropdownPanelSelector + ' a') || e.target.closest(dropdownPanelSelector + ' li')) {
            setMenuState(false);
            closeDropdowns();
        }
    });

    // ==================== HANDLE WINDOW RESIZE ====================
    // When resizing across the mobile/desktop breakpoint, reset mobile-specific states
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', function () {
        const currentWidth = window.innerWidth;

        if ((lastWidth <= 1199 && currentWidth > 1199) || (lastWidth > 1199 && currentWidth <= 1199)) {
            setMenuState(false);
            closeDropdowns();
        }

        lastWidth = currentWidth;
    });
});



// Cart dropdown toggle
const cartToggle = document.getElementById('cartToggle');
const cartDropdown = document.getElementById('cartDropdown');

if (cartToggle && cartDropdown) {
    cartToggle.addEventListener('mouseenter', () => {
        cartDropdown.classList.add('show');
    });

    cartDropdown.addEventListener('mouseleave', () => {
        cartDropdown.classList.remove('show');
    });
}
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper === "undefined" || !document.querySelector(".testimonial-carousel")) {
        return;
    }

    const swiper = new Swiper('.testimonial-carousel', {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 1000,
        effect: 'slide',

        pagination: {
            el: '.ma-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

// Contact Section - Map & Call Toggle
document.addEventListener("DOMContentLoaded", function () {

    const mapBox = document.getElementById("map-container");
    const callBox = document.getElementById("call-container");
    const btnMap = document.getElementById("btn-map");
    const btnCall = document.getElementById("btn-call");

    // Safety check (IMPORTANT)
    if (!btnCall || !btnMap) {
        console.error("Buttons nahi mile! ID check karo");
        return;
    }

    btnCall.addEventListener("click", function () {

        mapBox.classList.remove("active-content");
        callBox.classList.add("active-content");

        btnCall.classList.add("active");
        btnMap.classList.remove("active");
    });

    btnMap.addEventListener("click", function () {

        callBox.classList.remove("active-content");
        mapBox.classList.add("active-content");

        btnMap.classList.add("active");
        btnCall.classList.remove("active");
    });

});


// tilt Card Animation — DISABLED (replaced by CSS snip1425 hover effect)
/* document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll('.card-3d');

    cards.forEach((card) => {

        const overlay = card.querySelector('.overlay-bg');
        const text = card.querySelector('.card-text-overlay');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)
            `;

            overlay.style.transform = `
                translateZ(40px)
                translateX(${rotateY * 2}px)
                translateY(${rotateX * 2}px)
                scale(1.05)
            `;

            text.style.transform = `
                translateZ(80px)
                translateX(${rotateY * 3}px)
                translateY(${rotateX * 3}px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;

            overlay.style.transform = `
                translateZ(40px) scale(1.05)
            `;

            text.style.transform = `
                translateZ(80px)
            `;
        });

    });

}); */

// ========================================== How its Work Section - Tab Toggle ==========================================
// document.addEventListener("DOMContentLoaded", function () {

//   const path = document.getElementById("squiggle");
//   const svg = document.getElementById("svgC");

//   if (!path || !svg) return;

//   const pathLength = path.getTotalLength();

//   const arrowGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
//   const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

// arrow.setAttribute("points", "0,25 40,15 0,0 0,15");
// arrow.setAttribute("fill", "#eb0029");
// arrow.setAttribute("fill-opacity", "0.6");

//   arrowGroup.appendChild(arrow);
//   svg.appendChild(arrowGroup);

//   let progress = 0;
//   let speed = 0.0018;
//   let isPaused = false;

//   function animate() {

//     if (!isPaused) {
//       progress += speed;

//       path.style.strokeDashoffset =
//         parseFloat(path.style.strokeDashoffset || 0) - 0.35;

//       if (progress >= 1) {
//         progress = 1;
//         isPaused = true;

//         arrowGroup.style.opacity = "0.3";

//         setTimeout(() => {
//           progress = 0;
//           isPaused = false;
//           arrowGroup.style.opacity = "1";
//         }, 1000);
//       }
//     }

//     const currentLength = pathLength * progress;
//     const point = path.getPointAtLength(currentLength);
//     const nextPoint = path.getPointAtLength(Math.min(currentLength + 2, pathLength));

//     const angle =
//       Math.atan2(
//         nextPoint.y - point.y,
//         nextPoint.x - point.x
//       ) * (180 / Math.PI);

//     arrowGroup.setAttribute(
//       "transform",
//       `translate(${point.x}, ${point.y}) rotate(${angle}) translate(-42, -14)`
//     );

//     requestAnimationFrame(animate);
//   }

//   animate();

// });

document.addEventListener("DOMContentLoaded", function () {
    if (typeof Snap === "undefined" || typeof mina === "undefined" || !document.getElementById("svgC")) {
        return;
    }

    // SVG Select
    const svg = Snap("#svgC");

    // Path create
    const myPathC = svg.path("M62.9 14.9c-25-7.74-56.6 4.8-60.4 24.3-3.73 19.6 21.6 35 39.6 37.6 42.8 6.2 72.9-53.4 116-58.9 65-18.2 191 101 215 28.8 5-16.7-7-49.1-34-44-34 11.5-31 46.5-14 69.3 9.38 12.6 24.2 20.6 39.8 22.9 91.4 9.05 102-98.9 176-86.7 18.8 3.81 33 17.3 36.7 34.6 2.01 10.2.124 21.1-5.18 30.1");

    myPathC.attr({
        id: "squiggle",
        fill: "none",
        strokeWidth: "1",
        stroke: "rgba(0,0,0,0.1)",
        strokeMiterLimit: "10",
        strokeDasharray: "5 10",
        strokeDashoffset: "180"
    });

    // Triangle (Arrow)
    const triangle = svg.polyline("0,30 15,0 30,30");
    triangle.attr({
        id: "plane",
        fill: "#eb0029"
    });

    const lenC = myPathC.getTotalLength();

    let triangleGroup = svg.g(triangle);

    // Animate function
    function animateSVG() {

        // Path animation
        myPathC.attr({
            stroke: 'rgba(0,0,0,0.1)',
            strokeWidth: 1,
            fill: 'none',
            strokeDasharray: "5 10",
            strokeDashoffset: "180"
        }).animate({ strokeDashoffset: 10 }, 2500, mina.easeinout);

        // Move triangle
        setTimeout(function () {
            Snap.animate(0, lenC, function (value) {

                const movePoint = myPathC.getPointAtLength(value);

                triangleGroup.transform(
                    't' + (movePoint.x - 15) + ',' + (movePoint.y - 15) +
                    'r' + (movePoint.alpha - 90)
                );

            }, 2500, mina.easeinout);
        }, 0);
    }

    // Scroll trigger (pure JS)
    window.addEventListener("scroll", function () {
        animateSVG();
    });

});
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof Observer === "undefined") {
        return;
    }

    gsap.registerPlugin(Observer);

    let cards = document.querySelectorAll('.testimonial_slider_item_wrap');
    let arrows = document.querySelectorAll('.testimonial_slider_arrow');

    if (!cards.length || arrows.length < 2 || !document.querySelector(".testimonial_slider_holder")) {
        return;
    }

    let config = { scale: 0.92, offset: 20 };

    let isMobile = () => window.innerWidth < 991;
    if (isMobile()) { config.offset = 10; }

    config.offsetPlus = `+=${config.offset}px`;
    config.offsetMinus = `-=${config.offset}px`;

    let tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power4.inOut', duration: 0.5 }
    });

    tl.addLabel('start');

    cards.forEach((e, i) => {
        let label = `card-${i}`;

        if (i > 0) {
            gsap.set(e, {
                x: config.offset * i,
                y: -10 * i,
                zIndex: -i,
                scale: config.scale
            });
        }

        if (i !== cards.length - 1) {
            tl.to(cards[i + 1], {
                y: '-=180px',
                rotateZ: 40,
            }, '>');

            tl.to(cards[i + 1], {
                zIndex: i + 10,
                duration: 0
            });

            tl.to(e, {
                scale: config.scale,
                x: isMobile() ? '-=10px' : '-=16px',
                y: '-=10px',
                zIndex: -1
            }, ">");

            tl.to(cards[i + 1], {
                rotateZ: 0,
                scale: 1,
                y: '+=190px',
                x: config.offsetMinus,
            }, '<');

            tl.addLabel(label);
        }
    });

    function updateArrowState() {
        let labels = Object.keys(tl.labels);
        let current = tl.currentLabel();
        arrows[0].classList.toggle('disabled', current === labels[0]);
        arrows[1].classList.toggle('disabled', current === labels[labels.length - 1]);
    }

    function goNext() {
        let next = tl.nextLabel();
        if (next) tl.tweenTo(next, { onComplete: updateArrowState });
    }

    function goPrev() {
        let prev = tl.previousLabel();
        if (prev) tl.tweenTo(prev, { onComplete: updateArrowState });
    }

    arrows[1].addEventListener('click', goNext);
    arrows[0].addEventListener('click', goPrev);

    Observer.create({
        target: ".testimonial_slider_holder",
        type: "touch,pointer",
        onLeft: goNext,
        onRight: goPrev,
        tolerance: 20,
        preventDefault: true
    });

    updateArrowState();
    let autoPlay = setInterval(() => {
        let next = tl.nextLabel();
        if (next) {
            goNext();
        } else {
            tl.tweenTo("start", { onComplete: updateArrowState });
        }
    }, 5000);
});



// location card
const container = document.getElementById("dojoContainer");
if (container) {
const items = Array.from(container.children);
const total = items.length;

// Clear container
container.innerHTML = "";

// Patterns (client requirement)
const patterns = {
  4: [2,2],
  5: [3,2],
  6: [3,3],
  7: [4,3],
  8: [3,3,2],
  9: [3,3,3],
  10: [4,4,2],
  11: [3,3,3,2],
  12: [4,4,4]
};

// fallback (default)
const layout = patterns[total] || [3,3,3];

let index = 0;

layout.forEach(rowCount => {
  const row = document.createElement("div");
  row.className = "row g-4 justify-content-center";

  for (let i = 0; i < rowCount; i++) {
    if (!items[index]) break;

    const col = items[index];

    // Reset column width based on count
    col.className = "col-lg-" + Math.floor(12 / rowCount) + " col-md-6";

    row.appendChild(col);
    index++;
  }

  container.appendChild(row);
});
}

