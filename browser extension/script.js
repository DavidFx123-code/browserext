// Inline copy of data.json so the page works when opened directly (file://).
// To use your own data.json instead, see the fetch note at the bottom.
const DATA = [
  {
    logo: "images/logo-devlens.svg",
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: "images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: "images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: "images/logo-json-wizard.svg",
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: "images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: "images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: "images/logo-markup-notes.svg",
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: "images/logo-grid-guides.svg",
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: "images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: "images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: "images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: "images/logo-console-plus.svg",
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

let extensions = DATA.map((e) => ({ ...e }));
let filter = "all";
const grid = document.getElementById("grid");

function render() {
  const list = extensions.filter(
    (e) => filter === "all" || (filter === "active") === e.isActive,
  );
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = '<li class="empty">No extensions to show.</li>';
    return;
  }

  list.forEach((ext) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <div class="card-top">
        <img src="${ext.logo}" alt="">
        <div><h2></h2><p></p></div>
      </div>
      <div class="card-bottom">
        <button class="remove">Remove</button>
        <button class="switch" role="switch" aria-checked="${ext.isActive}">
          <span class="visually-hidden">Toggle</span>
        </button>
      </div>`;

    li.querySelector("h2").textContent = ext.name;
    li.querySelector("p").textContent = ext.description;
    li.querySelector(".remove").setAttribute(
      "aria-label",
      "Remove " + ext.name,
    );

    const sw = li.querySelector(".switch");
    sw.setAttribute("aria-label", ext.name + " active");

    // Toggle active / inactive
    sw.addEventListener("click", () => {
      ext.isActive = !ext.isActive;
      if (filter === "all") {
        sw.setAttribute("aria-checked", ext.isActive); // keep focus on the switch
      } else {
        render(); // card no longer matches the current filter
      }
    });

    // Remove from list
    li.querySelector(".remove").addEventListener("click", () => {
      extensions = extensions.filter((e) => e !== ext);
      render();
    });

    grid.appendChild(li);
  });
}

// Filter buttons
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    document
      .querySelectorAll(".filter")
      .forEach((b) => b.setAttribute("aria-pressed", b === btn));
    render();
  });
});

// Theme: saved choice first, then system preference
const root = document.documentElement;
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");

function setTheme(t) {
  root.dataset.theme = t;
  themeIcon.src = "images/" + (t === "dark" ? "icon-sun.svg" : "icon-moon.svg");
  themeBtn.setAttribute(
    "aria-label",
    "Switch to " + (t === "dark" ? "light" : "dark") + " theme",
  );
  try {
    localStorage.setItem("theme", t);
  } catch (e) {}
}

let saved = null;
try {
  saved = localStorage.getItem("theme");
} catch (e) {}
setTheme(
  saved ||
    (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"),
);

themeBtn.addEventListener("click", () =>
  setTheme(root.dataset.theme === "dark" ? "light" : "dark"),
);

render();

/* To load from your own data.json instead of the DATA array above:
   fetch("./data.json").then(r => r.json()).then(d => { extensions = d; render(); });
   (needs a local server such as VS Code Live Server, because fetch doesn't work on file://)
   Make sure the "logo" paths in data.json match your assets/images folder. */
