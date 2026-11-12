gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  gsap.from('.badge-work', {
    y: 22,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  });

  gsap.from('.section-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.08,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.reveal-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 86%'
      },
      y: 90,
      opacity: 0,
      scale: 0.88,
      duration: 1,
      delay: index * 0.08,
      ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.reveal-path').forEach((path, index) => {
    const curve = path.querySelector('.dash-path');
    const head = path.querySelector('.arrow-head');
    const len = curve.getTotalLength();
    gsap.set(curve, { strokeDasharray: len + 28, strokeDashoffset: len + 28 });
    gsap.set(head, { opacity: 0, scale: 0.8, transformOrigin: 'center center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.process-row',
        start: 'top 72%'
      },
      delay: index * 0.18
    });

    tl.to(curve, {
      strokeDashoffset: 0,
      duration: 1.15,
      ease: 'power2.out'
    }).to(head, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'back.out(2)'
    }, '-=0.15');
  });
}

document.querySelectorAll(".row.g-0").forEach((section) => {
  const leftImg = section.querySelector(".left-photo img");
  const rightBox = section.querySelector(".center-card");
  const rightCopy = section.querySelector(".right-copy");
  const rightItems = rightCopy
    ? rightCopy.querySelectorAll("p, .skill-inline")
    : [];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 35%",
      toggleActions: "play none none reverse",
      once: false
    }
  });

  tl.from(leftImg, {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  })
    .from(rightBox, {
      y: 70,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.35")
    .from(rightItems, {
      y: 35,
      opacity: 0,
      duration: 0.55,
      stagger: 0.12,
      ease: "power2.out"
    }, "-=0.25");
});



// gsap.from("#program-section .banner-content h1", {
//   y: 70,
//   opacity: 0,
//   duration: 0.9,
//   ease: "power3.out",
//   scrollTrigger: {
//     trigger: "#program-section",
//     start: "top 80%"
//   }
// });

// gsap.from("#program-section .banner-content p", {
//   y: 50,
//   opacity: 0,
//   duration: 0.8,
//   ease: "power3.out",
//   scrollTrigger: {
//     trigger: "#program-section",
//     start: "top 78%"
//   }
// });

gsap.from("#program-section .banner-content .btn", {
  y: 30,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#program-section",
    start: "top 76%"
  }
});

gsap.to("#program-section", {
  backgroundPosition: "50% 100%",
  ease: "none",
  scrollTrigger: {
    trigger: "#program-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// ======================================================== PRogram V2 gsap =======================================================


gsap.to("#timelineFill", {
  height: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-wrap",
    start: "top top",
    end: "bottom 70%",
    scrub: 0.3
  }
});
// gsap.utils.toArray(".container-fluid").forEach((section) => {
//   const row = section.querySelector(".row");
//   const content = section.querySelector(".content-side");
//   const image = section.querySelector(".hero-image");
//   const skillBox = section.querySelector(".skill-box");
//   const dots = skillBox ? skillBox.querySelectorAll(".dot") : [];

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: row,
//       start: "top 75%",
//       toggleActions: "play none none reverse"
//     }
//   });

//   tl.from(content, {
//     y: 40,
//     opacity: 0,
//     duration: 0.7,
//     ease: "power3.out"
//   })
//     .from(image, {
//       y: 40,
//       opacity: 0,
//       duration: 0.7,
//       ease: "power3.out"
//     }, "-=0.35");

//   if (skillBox) {
//     tl.from(skillBox, {
//       y: 20,
//       opacity: 1,
//       duration: 0.5,
//       ease: "power2.out"
//     }, "-=0.1");

//     tl.from(dots, {
//       opacity: 0,
//       scale: 0,
//       duration: 0.22,
//       stagger: 0.16,
//       ease: "back.out(1.7)"
//     }, "-=0.05");
//   }
// });


gsap.utils.toArray(".timeline-item").forEach((section, index) => {
  const badge = section.querySelector(".timeline-badge");
  // const contentSide = section.querySelector(".content-side");

 gsap.fromTo(
  badge,
  { scale: 0, rotation: -180, opacity: 0 },
  {
    scale: 1,
    rotation: 0,
    opacity: 1,
    duration: 0.8,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: section,
      start: "top 95%",
      end: "top 50%",
      toggleActions: "play none none reverse",
      onUpdate: (self) => {
        gsap.to(badge, {
          rotation: self.direction === -1 ? 180 : 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    }
  }
);

  // gsap.fromTo(contentSide,
  //   { y: 80, opacity: 0 },
  //   {
  //     y: 0,
  //     opacity: 1,
  //     duration: 1,
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: contentSide,
  //       start: "top 85%",
  //       end: "top 60%",
  //       toggleActions: "play none none reverse"
  //     }
  //   }
  // );
  // left right image animation
  // const imageCol = section.querySelector(".right-col, .left-col, .left-photo");

  // if (!imageCol) return;

  // const imageElements = imageCol.querySelectorAll(".hero-image, .skill-box, img");

  // if (!imageElements.length) return;

  // if (imageCol.classList.contains("right-col")) {
  //   gsap.fromTo(
  //     imageElements,
  //     {
  //       x: "100%",
  //       opacity: 0,
  //       scale: 0.9
  //     },
  //     {
  //       x: "0%",
  //       opacity: 1,
  //       scale: 1,
  //       duration: 1.2,
  //       ease: "power3.out",
  //       stagger: 0.2,
  //       scrollTrigger: {
  //         trigger: imageCol,
  //         start: "top 85%",
  //         end: "top 60%",
  //         toggleActions: "play none none reverse"
  //       }
  //     }
  //   );
  // } else if (
  //   imageCol.classList.contains("left-col") ||
  //   imageCol.classList.contains("left-photo")
  // ) {
  //   gsap.fromTo(
  //     imageElements,
  //     {
  //       x: "-100%",
  //       opacity: 0,
  //       scale: 0.9
  //     },
  //     {
  //       x: "0%",
  //       opacity: 1,
  //       scale: 1,
  //       duration: 1.2,
  //       ease: "power3.out",
  //       stagger: 0.2,
  //       scrollTrigger: {
  //         trigger: imageCol,
  //         start: "top 85%",
  //         end: "top 60%",
  //         toggleActions: "play none none reverse"
  //       }
  //     }
  //   );
  // }
  // const imageCol = section.querySelector(".left-photo");

  // if (!imageCol) return;

  // const imageElements = imageCol.querySelectorAll("img");

  // if (!imageElements.length) return;

  // gsap.fromTo(
  //   imageElements,
  //   {
  //     x: "-100%",
  //     opacity: 0,
  //     scale: 0.9
  //   },
  //   {
  //     x: "0%",
  //     opacity: 1,
  //     scale: 1,
  //     duration: 1.2,
  //     ease: "power3.out",
  //     stagger: 0.2,
  //     scrollTrigger: {
  //       trigger: imageCol,
  //       start: "top 85%",
  //       end: "top 60%",
  //       toggleActions: "play none none reverse"
  //     }
  //   }
  // );

  gsap.utils.toArray(".section-animate").forEach((section) => {
    const image = section.querySelector(".left-photo img");
    const card = section.querySelector(".card-inner-anim");
    const content = section.querySelectorAll(".right-copy > *");

    gsap.fromTo(
      image,
      {
        opacity: 0,
        y: 80,
        clipPath: "inset(100% 0 0 0)"
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  const btn = section.querySelector(".btn-theme");
  gsap.fromTo(btn,
    {  y: 30, rotation: 0 },
    {
      // scale: 1,
      y: 0,
      rotation: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: btn,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

document.querySelectorAll(".btn-theme").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      // scale: 1.08,
      // y: -5,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      // scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

gsap.utils.toArray(".hero-image").forEach(img => {
  gsap.to(img, {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: img,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});