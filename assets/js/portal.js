/* portal.js — Apex Martial Arts Student Portal */

// ── Mobile offcanvas nav ──
(function () {
    const navToggle = document.querySelector('.nav-toggle');
    const sourceNav = document.querySelector('.nav-inner ul');
    if (!navToggle || !sourceNav) return;

    // Build offcanvas
    const backdrop = document.createElement('div');
    backdrop.className = 'portal-oc-backdrop';
    document.body.appendChild(backdrop);

    const drawer = document.createElement('nav');
    drawer.className = 'portal-oc';
    drawer.setAttribute('aria-label', 'Mobile navigation');

    const header = document.createElement('div');
    header.className = 'portal-oc-header';
    header.innerHTML =
        '<span class="portal-oc-brand"><span class="apex">Apex</span> Student Portal</span>' +
        '<button class="portal-oc-close" aria-label="Close menu">&times;</button>';

    const navClone = sourceNav.cloneNode(true);
    navClone.className = 'portal-oc-nav';

    drawer.appendChild(header);
    drawer.appendChild(navClone);
    document.body.appendChild(drawer);

    function openDrawer() {
        drawer.classList.add('portal-oc--open');
        backdrop.classList.add('portal-oc-backdrop--visible');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('portal-oc--open');
        backdrop.classList.remove('portal-oc-backdrop--visible');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', openDrawer);
    backdrop.addEventListener('click', closeDrawer);
    header.querySelector('.portal-oc-close').addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    // For .has-mega: build a simple flat dropdown-nav from L1 links
    navClone.querySelectorAll('.has-mega').forEach(function(li) {
        var mega = li.querySelector(':scope > .mega-dropdown');
        if (!mega) return;
        var simpleList = document.createElement('ul');
        simpleList.className = 'dropdown-nav';
        li.querySelectorAll('.mega-col-1 [data-l1]').forEach(function(l1Link) {
            var item = document.createElement('li');
            var a = document.createElement('a');
            a.href = 'video-library.html';
            a.textContent = l1Link.textContent.replace(/[‹›→»›<>]/g, '').trim();
            item.appendChild(a);
            simpleList.appendChild(item);
        });
        mega.parentNode.replaceChild(simpleList, mega);
    });

    // Build dropdown row: wrap link + chevron in a flex row
    navClone.querySelectorAll('.has-dropdown').forEach(function(li) {
        var parentLink = li.querySelector(':scope > a');
        var dd = li.querySelector(':scope > .dropdown-nav');
        if (!parentLink || !dd) return;

        // Wrap link in a flex row div
        var row = document.createElement('div');
        row.className = 'portal-oc-row';

        // Move the <a> inside the row
        li.insertBefore(row, parentLink);
        row.appendChild(parentLink);

        // Chevron button
        var btn = document.createElement('button');
        btn.className = 'portal-oc-chevron';
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-label', 'Toggle submenu');
        btn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        row.appendChild(btn);

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var isOpen = dd.classList.toggle('open');
            btn.classList.toggle('open', isOpen);
        });
    });

    // Close drawer when a leaf link is tapped
    navClone.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
            if (!a.closest('.has-dropdown') || a.parentElement.classList.contains('portal-oc-row') && !a.parentElement.closest('.has-dropdown').classList.contains('has-dropdown')) {
                closeDrawer();
            }
        });
    });
})();

// Dropdown on desktop (tap fallback)
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dd = link.nextElementSibling;
            if (dd) dd.classList.toggle('open');
        }
    });
});

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-inner ul > li > a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === currentPage || href.includes(currentPage))) {
        a.classList.add('active');
    }
});

// Sticky nav shadow
const mainNav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (mainNav) {
        mainNav.style.boxShadow = window.scrollY > 10
            ? '0 4px 24px rgba(0,0,0,.5)'
            : 'none';
    }
});

// Calendar (only on calendar page)
function buildCalendar(year, month) {
    const grid = document.getElementById('calGrid');
    const titleEl = document.getElementById('calTitle');
    if (!grid || !titleEl) return;

    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    titleEl.textContent = `${months[month]} ${year}`;

    const events = {
        3: 'Beginner Class', 7: 'Tournament', 10: 'Belt Test',
        14: 'Open Mat', 17: 'Adult Class', 21: 'Kids Class',
        24: 'Belt Ceremony', 28: 'Sparring Night'
    };

    const first = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    grid.innerHTML = '';
    // blanks
    for (let i = 0; i < first; i++) {
        grid.insertAdjacentHTML('beforeend', `<div class="cal-cell other-month"><div class="cal-num"></div></div>`);
    }
    // days
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
        const ev = events[d];
        grid.insertAdjacentHTML('beforeend', `
            <div class="cal-cell ${isToday ? 'today' : ''} ${ev ? 'has-event' : ''}">
                <div class="cal-num">${d}</div>
                ${ev ? `<span class="cal-event-dot"></span><span class="cal-event-label">${ev}</span>` : ''}
            </div>
        `);
    }
    // trailing blanks
    const trailing = (7 - (first + daysInMonth) % 7) % 7;
    for (let i = 0; i < trailing; i++) {
        grid.insertAdjacentHTML('beforeend', `<div class="cal-cell other-month"></div>`);
    }
}

let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();

buildCalendar(calYear, calMonth);

document.getElementById('prevMonth')?.addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    buildCalendar(calYear, calMonth);
});
document.getElementById('nextMonth')?.addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    buildCalendar(calYear, calMonth);
});

// Form submit (prevent default, show toast)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const toast = document.getElementById('formToast');
        if (toast) {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
            }, 3500);
        }
        contactForm.reset();
    });
}

// ── Mega 3-Level Dropdown ──
function activateL1(link) {
    const panel = link.dataset.l1;
    document.querySelectorAll('.mega-col-2, .mega-col-3').forEach(el => el.classList.remove('visible'));
    const l2 = document.querySelector(`.mega-col-2[data-panel="${panel}"]`);
    if (l2) {
        l2.classList.add('visible');
        // auto-activate first L2 item
        const firstL2 = l2.querySelector('[data-l2]');
        if (firstL2) activateL2(firstL2);
    }
    document.querySelectorAll('.mega-col-1 li').forEach(li => li.classList.remove('active-col'));
    link.closest('li').classList.add('active-col');
}

function activateL2(link) {
    const panel = link.dataset.l2;
    document.querySelectorAll('.mega-col-3').forEach(el => el.classList.remove('visible'));
    const l3 = document.querySelector(`.mega-col-3[data-panel="${panel}"]`);
    if (l3) l3.classList.add('visible');
    const parentCol2 = link.closest('.mega-col-2');
    if (parentCol2) parentCol2.querySelectorAll('li').forEach(li => li.classList.remove('active-col'));
    link.closest('li').classList.add('active-col');
}

document.querySelectorAll('.mega-col-1 [data-l1]').forEach(link => {
    link.addEventListener('mouseenter', () => activateL1(link));
});

document.querySelectorAll('.mega-col-2 [data-l2]').forEach(link => {
    link.addEventListener('mouseenter', () => activateL2(link));
});

// Auto-activate first L1 + L2 when mega opens
document.querySelectorAll('.has-mega').forEach(li => {
    li.addEventListener('mouseenter', () => {
        const firstL1 = li.querySelector('.mega-col-1 [data-l1]');
        if (firstL1) activateL1(firstL1);
    });
});

// Add to cart button feedback
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        btn.style.color = '#fff';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 1800);
    });
});
