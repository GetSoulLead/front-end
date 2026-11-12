gsap.registerPlugin(ScrollTrigger);

gsap.to(".banner-content h1", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".trial-section",
    start: "top 80%",
  }
});

gsap.to(".banner-content p", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".trial-section",
    start: "top 80%",
  }
});

gsap.to(".banner-content button", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".trial-section",
    start: "top 80%",
  }
});

gsap.to(".trial-section", {
  backgroundPosition: "0% center",
  ease: "none",
  scrollTrigger: {
    trigger: ".trial-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});

 const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".offer-wrap",
      start: "top 75%",
      end: "top 30%",
      toggleActions: "play none none reverse",
    }
  });

  tl.from(".offer-image", {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from(".offer-content h2", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .from(".heading-divider", {
    width: 0,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.4")
  .from(".offer-content p", {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: "power3.out"
  }, "-=0.3");

 const topCards = document.querySelectorAll(".top-card");
  const offerCards = document.querySelectorAll(".offer-card");

  topCards.forEach((card) => {
    card.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      topCards.forEach(c => c.classList.remove("active-card"));
      this.classList.add("active-card");

      offerCards.forEach((offer) => {
        offer.classList.remove("active");
        if (offer.id === target) {
          offer.classList.add("active");
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
  const topCards        = document.querySelectorAll(".top-card");
  const planContents    = document.querySelectorAll(".plan-content");
  const offerCards      = document.querySelectorAll(".offer-card");
  const paymentSection  = document.getElementById("payment-fields");
  const displayTotal    = document.getElementById("display-total");
  const formWrap        = document.querySelector(".step-form-wrap");
  const programSelect   = document.getElementById("programSelect");

  // --- 1. Category Switcher (Children, Adults, etc.) ---
  topCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Top tabs UI
      topCards.forEach((c) => c.classList.remove("active-card"));
      this.classList.add("active-card");

      // Plans UI
      const category = this.getAttribute("data-category");
      planContents.forEach((c) => c.classList.remove("active-plan"));
      const targetPlan = document.getElementById(`${category}-plans`);
      if (targetPlan) targetPlan.classList.add("active-plan");
      if (window.AOS) {
        AOS.refresh();
      }
    });
  });

  // --- 2. Select Plan & Show Form ---
  offerCards.forEach((card) => {
    card.addEventListener("click", function () {
      const parent = this.closest(".plan-content");

      // Clear all selections in current section
      parent.querySelectorAll(".offer-card").forEach((c) => {
        c.classList.remove("active");
        const btn = c.querySelector(".plan-btn");
        btn.innerHTML = '<span>SELECT</span> <span class="tick empty">✓</span>';
      });

      // Set this card as active
      this.classList.add("active");
      const btn = this.querySelector(".plan-btn");
      btn.innerHTML = '<span>SELECTED</span> <span class="tick">✓</span>';

      // --- 3. Show Form & Update Price ---
      const planType = this.getAttribute("data-plan-type");
      const price    = parseFloat(this.getAttribute("data-price") || 0);

      // Show form
      formWrap.style.display = "block";

      // Show/hide payment section
      if (planType === "paid") {
        paymentSection.style.display = "block";
        displayTotal.textContent = "$" + price.toFixed(2);
      } else {
        paymentSection.style.display = "none";
        displayTotal.textContent = "$0.00";
      }

      // Update Program dropdown with current category
      const sectionId = this.closest(".plan-content").id;
      const categoryKey = sectionId.replace("-plans", "");
      const title = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
      const text = title === "Children" ? "Children's Offers" :
                   title === "Adults" ? "Adults Offers" :
                   title;
      programSelect.value = text;
      if (window.AOS) {
        AOS.refresh();
      }
    });
  });
});
