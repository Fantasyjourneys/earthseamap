const mapWidth = 4199;
const mapHeight = 2834;

const bounds = [[0, 0], [mapHeight, mapWidth]];

/* 1. CREATE MAP */
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
});

/* 2. FIX SIDEBAR TOUCH ISSUES (IMPORTANT) */
const sidebar = document.querySelector('.sidebar');

L.DomEvent.disableClickPropagation(sidebar);
L.DomEvent.disableScrollPropagation(sidebar);
L.DomEvent.disableClickPropagation(sidebar);
sidebar.addEventListener('touchmove', function(e) {
    e.stopPropagation();
}, { passive: true });

/* 3. BASE MAP */
L.imageOverlay('Earthseamap.png', bounds).addTo(map);

/* 4. ROUTES (START HIDDEN) */
const routes = {
    ged: L.imageOverlay('Ged.png', bounds, { opacity: 0 }),
    gedandtenar: L.imageOverlay('GedandTenar.png', bounds, { opacity: 0 }),
};

/* ADD ROUTES TO MAP */
routes.ged.addTo(map);
routes.gedandtenar.addTo(map);

/* 5. TOGGLE FUNCTION */
function toggleRoute(name) {

    const route = routes[name];

    const isVisible = route.options.opacity === 1;

    route.setOpacity(isVisible ? 0 : 1);

    updateButtonState(name, !isVisible);

}

/* 6. BUTTON STATE UI */
function updateButtonState(name, isActive) {
    const btn = document.getElementById(`btn-${name}`);

    if (!btn) return;

    if (isActive) {
        btn.classList.add("active");
    } else {
        btn.classList.remove("active");
    }
}

/* 7. TOGGLE SIDEBAR */
function toggleSidebar() {

    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const mapEl = document.getElementById('map');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        mapEl.style.pointerEvents = 'none';
    } else {
        mapEl.style.pointerEvents = 'auto';
    }
}

/* 8. APPLY INITIAL VIEW */
function applyInitialView() {

    if (window.innerWidth <= 768) {

        map.setView(
            [mapHeight / 2, mapWidth * 0.2],
            -2
        );

        document.querySelector('.sidebar').classList.remove('open');

    } else {

        map.fitBounds(bounds, {
            padding: [20, 20]
        });
    }
}

/* 9. WINDOW.LOAD */
window.addEventListener("load", () => {
    updateButtonState("ged", false);
    updateButtonState("gedandtenar", false);
});

/* 10. MAP.WHENREADY */
map.whenReady(() => {
    setTimeout(() => {
        // optional intro animation later
    }, 300);
});

/* run once on load */
applyInitialView();

window.addEventListener("resize", applyInitialView);
