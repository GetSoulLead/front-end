(function () {
    const products = [
        {
            id: 1,
            name: "Elite Karate Gi Uniform",
            category: "Uniforms",
            brand: "Dojo Pro",
            size: ["S", "M", "L", "XL"],
            price: 79,
            oldPrice: 99,
            rating: 4.8,
            availability: "In Stock",
            image: "assets/images/about/karate-dress.png",
            newest: 9,
            description: "Lightweight cotton blend uniform built for kata, sparring, and everyday academy training."
        },
        {
            id: 2,
            name: "Strike Force Boxing Gloves",
            category: "Boxing Gloves",
            brand: "FightFlex",
            size: ["M", "L"],
            price: 64,
            oldPrice: 84,
            rating: 4.6,
            availability: "In Stock",
            image: "assets/images/f1.png",
            newest: 8,
            description: "Dense foam padding, secure wrist wrap, and durable synthetic leather for bag and mitt work."
        },
        {
            id: 3,
            name: "Curved Focus Training Pads",
            category: "Training Pads",
            brand: "TigerClaw",
            size: ["One Size"],
            price: 52,
            oldPrice: 0,
            rating: 4.5,
            availability: "In Stock",
            image: "assets/images/f2.png",
            newest: 7,
            description: "Curved strike pads with reinforced grip for speed drills, accuracy work, and partner training."
        },
        {
            id: 4,
            name: "Rank Belt Set",
            category: "Belts",
            brand: "Dojo Pro",
            size: ["S", "M", "L"],
            price: 28,
            oldPrice: 35,
            rating: 4.3,
            availability: "In Stock",
            image: "assets/images/program/star.png",
            newest: 4,
            description: "Color rank belt pack with firm stitching and a smooth tie for class progression."
        },
        {
            id: 5,
            name: "Mat Grip Martial Arts Shoes",
            category: "Shoes",
            brand: "KataCore",
            size: ["S", "M", "L", "XL"],
            price: 72,
            oldPrice: 0,
            rating: 4.2,
            availability: "Limited",
            image: "assets/images/1.jpg",
            newest: 6,
            description: "Flexible sole training shoes designed for quick pivots, warmups, and light indoor practice."
        },
        {
            id: 6,
            name: "Youth Protective Sparring Kit",
            category: "Protective Gear",
            brand: "FightFlex",
            size: ["S", "M"],
            price: 119,
            oldPrice: 149,
            rating: 4.9,
            availability: "In Stock",
            image: "assets/images/about/professional.png",
            newest: 10,
            description: "Complete youth protection kit with head guard, gloves, shin guards, and carry mesh."
        },
        {
            id: 7,
            name: "Foam Nunchaku Trainer",
            category: "Weapons",
            brand: "TigerClaw",
            size: ["One Size"],
            price: 24,
            oldPrice: 0,
            rating: 4.1,
            availability: "In Stock",
            image: "assets/images/nunchaku.png",
            newest: 5,
            description: "Soft training nunchaku for beginners practicing coordination, control, and safe flow drills."
        },
        {
            id: 8,
            name: "Heavy Duty Dojo Sports Bag",
            category: "Sports Bags",
            brand: "KataCore",
            size: ["M", "L"],
            price: 58,
            oldPrice: 75,
            rating: 4.4,
            availability: "Limited",
            image: "assets/images/2.jpg",
            newest: 3,
            description: "Spacious gear bag with ventilated compartments for uniform, gloves, pads, and daily essentials."
        },
        {
            id: 9,
            name: "Agility Ladder Training Kit",
            category: "Fitness Equipment",
            brand: "Dojo Pro",
            size: ["One Size"],
            price: 39,
            oldPrice: 49,
            rating: 4.0,
            availability: "In Stock",
            image: "assets/images/program/trial.png",
            newest: 2,
            description: "Footwork ladder, cones, and carry pouch for speed, stance transitions, and conditioning drills."
        },
        {
            id: 10,
            name: "Competition Black Gi",
            category: "Uniforms",
            brand: "KataCore",
            size: ["M", "L", "XL"],
            price: 96,
            oldPrice: 120,
            rating: 4.7,
            availability: "In Stock",
            image: "assets/images/teacher.jpg",
            newest: 11,
            description: "Premium black uniform with reinforced stress points for advanced classes and demonstrations."
        },
        {
            id: 11,
            name: "MMA Shin Guard Pair",
            category: "Protective Gear",
            brand: "FightFlex",
            size: ["S", "M", "L"],
            price: 69,
            oldPrice: 0,
            rating: 4.5,
            availability: "Out of Stock",
            image: "assets/images/side-1.jpg",
            newest: 1,
            description: "Contoured shin guards with hook-and-loop support for sparring and kick defense training."
        },
        {
            id: 12,
            name: "Double Kick Paddle Target",
            category: "Training Pads",
            brand: "TigerClaw",
            size: ["One Size"],
            price: 31,
            oldPrice: 39,
            rating: 4.2,
            availability: "In Stock",
            image: "assets/images/about/discipline.png",
            newest: 12,
            description: "Responsive double paddle target with crisp feedback for kicks, strikes, and timing practice."
        }
    ];

    const PAGE_SIZE = 6;

    const state = {
        category: "all",
        page: 1
    };

    const els = {
        grid: document.querySelector("[data-product-grid]"),
        count: document.querySelector("[data-product-count]"),
        empty: document.querySelector("[data-product-empty]"),
        category: document.querySelector("[data-category]"),
        pagination: document.querySelector("[data-pagination]")
    };

    if (!els.grid) {
        return;
    }

    function populateCategories() {
        const categories = Array.from(new Set(products.map((product) => product.category))).sort();
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            els.category.appendChild(option);
        });
    }

    function formatPrice(value) {
        return "$" + value.toFixed(2);
    }

    function discount(product) {
        if (!product.oldPrice) {
            return "";
        }
        const percent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        return `<span class="pl-badge pl-badge--discount">-${percent}%</span>`;
    }

    function productCard(product, index) {
        const stockClass = product.availability === "Limited" ? "pl-badge--limited" : "pl-badge--stock";
        return `
            <article class="pl-product-card" data-aos="fade-up" data-aos-duration="850" data-aos-delay="${(index % 4) * 70}">
                <div class="pl-card-image">
                    <div class="pl-badge-row">
                        ${discount(product)}
                        <span class="pl-badge ${stockClass}">${product.availability}</span>
                    </div>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="pl-card-hover-actions">
                        <button class="pl-hover-action" type="button" aria-label="Quick view ${product.name}">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="pl-hover-action pl-wishlist" type="button" aria-label="Add ${product.name} to wishlist">
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="pl-card-body">
                    <span class="pl-category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <div class="pl-price">
                        <span class="pl-current-price">${formatPrice(product.price)}</span>
                        ${product.oldPrice ? `<span class="pl-old-price">${formatPrice(product.oldPrice)}</span>` : ""}
                    </div>
                    <div class="pl-card-actions">
                        <button class="btn btn-theme" type="button">Add to Cart</button>
                    </div>
                </div>
            </article>
        `;
    }

    function getFilteredProducts() {
        let filtered = products;
        if (state.category !== "all") {
            filtered = filtered.filter((product) => product.category === state.category);
        }
        return filtered.slice().sort((a, b) => a.id - b.id);
    }

    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / PAGE_SIZE);
        if (totalPages <= 1) {
            els.pagination.innerHTML = "";
            return;
        }

        let html = `<button class="pl-page-btn" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="Previous page"><i class="bi bi-chevron-left"></i></button>`;
        for (let page = 1; page <= totalPages; page++) {
            html += `<button class="pl-page-btn ${page === state.page ? "is-active" : ""}" data-page="${page}">${page}</button>`;
        }
        html += `<button class="pl-page-btn" data-page="${state.page + 1}" ${state.page === totalPages ? "disabled" : ""} aria-label="Next page"><i class="bi bi-chevron-right"></i></button>`;

        els.pagination.innerHTML = html;
    }

    function render() {
        state.category = els.category.value;

        const filtered = getFilteredProducts();
        const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
        if (state.page > totalPages) state.page = totalPages;
        if (state.page < 1) state.page = 1;

        const start = (state.page - 1) * PAGE_SIZE;
        const pageItems = filtered.slice(start, start + PAGE_SIZE);

        els.grid.innerHTML = pageItems.map(productCard).join("");
        els.count.textContent = `Showing ${pageItems.length} of ${filtered.length} products`;
        els.empty.classList.toggle("is-visible", filtered.length === 0);
        els.grid.hidden = filtered.length === 0;
        renderPagination(filtered.length);
        if (window.AOS) {
            AOS.refreshHard();
        }
    }

    function renderFromFilters() {
        state.page = 1;
        render();
    }

    els.category.addEventListener("input", renderFromFilters);

    els.pagination.addEventListener("click", function (event) {
        const btn = event.target.closest(".pl-page-btn");
        if (!btn || btn.disabled) return;
        state.page = parseInt(btn.dataset.page, 10);
        render();
    });

    els.grid.addEventListener("click", function (event) {
        const wishlist = event.target.closest(".pl-wishlist");
        if (wishlist) {
            wishlist.classList.toggle("is-active");
            const icon = wishlist.querySelector("i");
            icon.className = wishlist.classList.contains("is-active") ? "bi bi-heart-fill" : "bi bi-heart";
        }
    });

    populateCategories();
    render();
})();
