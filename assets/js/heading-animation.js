(function () {
    if (window.scrollHeadingAnimationLoaded) {
        return;
    }

    window.scrollHeadingAnimationLoaded = true;

    const styleId = "scroll-heading-animation-styles";

    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
.scroll-heading-reveal .scroll-heading-word {
    display: inline-block;
    white-space: nowrap;
}

.scroll-heading-reveal .scroll-heading-char {
    display: inline-block;
    opacity: 0;
    will-change: opacity;
}

.scroll-heading-reveal.is-active .scroll-heading-char {
    animation: headingScrollFade 360ms ease-out forwards;
    animation-delay: calc(var(--char-index) * 16ms);
}

.taste-text.scroll-heading-reveal .scroll-heading-char {
    background: linear-gradient(135deg, #000 0%, #333 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.section-title .scroll-heading-char {
    color: inherit;
    -webkit-text-fill-color: currentColor;
}

@keyframes headingScrollFade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
`;
        document.head.appendChild(style);
    }

    function splitTextNode(textNode, indexState) {
        const fragment = document.createDocumentFragment();
        const parts = textNode.textContent.split(/(\s+)/);

        parts.forEach((part) => {
            if (!part) {
                return;
            }

            if (/^\s+$/.test(part)) {
                fragment.appendChild(document.createTextNode(part));
                return;
            }

            const word = document.createElement("span");
            word.className = "scroll-heading-word";

            Array.from(part).forEach((char) => {
                const charSpan = document.createElement("span");
                charSpan.className = "scroll-heading-char";
                charSpan.style.setProperty("--char-index", indexState.value++);
                charSpan.textContent = char;
                word.appendChild(charSpan);
            });

            fragment.appendChild(word);
        });

        textNode.replaceWith(fragment);
    }

    function splitHeadingText(element) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                return node.textContent.trim()
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        });
        const textNodes = [];
        let currentNode = walker.nextNode();

        while (currentNode) {
            textNodes.push(currentNode);
            currentNode = walker.nextNode();
        }

        const indexState = { value: 0 };
        textNodes.forEach((node) => splitTextNode(node, indexState));
    }

    function updateHeadingTriggers(headings, allowActivate) {
        headings.forEach((heading) => {
            const triggerElement = heading.classList.contains("taste-text")
                ? heading.closest(".taste-section") || heading
                : heading.closest(".section-title")
                    ? heading.closest(".section-title") || heading
                    : heading;
            const rect = triggerElement.getBoundingClientRect();
            const isHidden = rect.width === 0 || rect.height === 0;
            const isInTriggerZone = !isHidden && rect.top < window.innerHeight * 0.72 && rect.bottom > 0;

            if (allowActivate && isInTriggerZone && !heading.classList.contains("is-active")) {
                // Remove and re-add class in next frame to retrigger animation
                // without forcing a synchronous layout reflow via offsetHeight
                heading.classList.remove("is-active");
                requestAnimationFrame(() => heading.classList.add("is-active"));
            } else if (!allowActivate && isInTriggerZone && !heading.classList.contains("is-active")) {
                heading.querySelectorAll(".scroll-heading-char").forEach((char) => {
                    char.style.animation = "none";
                    char.style.opacity = "1";
                });
                heading.classList.add("is-active");
            }
        });
    }

    function initHeadingAnimation() {
        const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6, .indexv1herodesc")).filter((heading) => {
            return !heading.closest("header, .top-header, .full-width-dropdown, .cart-dropdown");
        });

        headings.forEach((heading) => {
            if (heading.dataset.scrollHeadingReady === "true") {
                return;
            }

            heading.dataset.scrollHeadingReady = "true";
            heading.classList.add("scroll-heading-reveal");
            splitHeadingText(heading);
        });

        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        let rafPending = false;

        function updateCurrentHeadingTriggers(allowActivate) {
            updateHeadingTriggers(headings, allowActivate);
        }

        function handleScroll() {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
                const isScrollingDown = currentScrollY > lastScrollY;
                updateCurrentHeadingTriggers(isScrollingDown);
                lastScrollY = currentScrollY;
                rafPending = false;
            });
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", () => updateCurrentHeadingTriggers(false), { passive: true });
        updateCurrentHeadingTriggers(true);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHeadingAnimation);
    } else {
        initHeadingAnimation();
    }
})();
