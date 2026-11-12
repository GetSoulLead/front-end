// const mobileMenu = document.getElementById('mobileMenu');
// const menuToggleBtn = document.getElementById('menuToggleBtn');

// mobileMenu.addEventListener('shown.bs.offcanvas', function () {
//     menuToggleBtn.classList.add('active');
// });

// mobileMenu.addEventListener('hidden.bs.offcanvas', function () {
//     menuToggleBtn.classList.remove('active');
// });
gsap.registerPlugin(ScrollTrigger);

const mainSection = document.querySelector(".wedding-scroll-section");

gsap.utils.toArray(".wedding-row").forEach((section) => {

    const sectionColor = getComputedStyle(section)
        .getPropertyValue("--section-color")
        .trim();

    ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",

        onEnter: () => {
            gsap.to(mainSection, {
                backgroundColor: sectionColor,
                duration: 0.5,
                overwrite: "auto"
            });
        },

        onEnterBack: () => {
            gsap.to(mainSection, {
                backgroundColor: sectionColor,
                duration: 0.5,
                overwrite: "auto"
            });
        }
    });

});

// Blog highlight scrub removed — animation was commented out,
// leaving empty ScrollTrigger instances with no effect but real CPU overhead.
