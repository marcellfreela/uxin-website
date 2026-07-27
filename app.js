const categories = [
  {
    title: "Estratégia",
    description: "Transformamos desafios de negócio em produtos e experiências digitais.",
    services: [
      "Business Design",
      "UX Strategy",
      "UX Research",
      "Strategic Design",
      "Digital Strategy",
      "Service Design",
      "Omnichannel Strategy",
      "Product Concept",
      "Product Growth",
    ],
  },
  {
    title: "Experiência",
    description: "Desenhamos jornadas claras, inclusivas e relevantes para quem usa.",
    services: [
      "Acessibilidade",
      "Design Content",
      "UX Writing",
      "User Experience",
      "User Interface",
      "Digital Experience",
      "Physical Experience",
    ],
  },
  {
    title: "Produto & Tecnologia",
    description: "Do conceito ao código, construímos soluções robustas, escaláveis e acessíveis.",
    services: [
      "Design Studio",
      "Transformação Digital",
      "Arquitetura de Solução",
      "Design System",
      "End to End Solutions",
      "Experience Engineering",
      "Product Design",
    ],
  },
  {
    title: "Marca & Movimento",
    description: "Criamos identidades que ganham forma, ritmo e presença em cada ponto de contato.",
    services: ["Branding", "Motion Design"],
  },
];

const serviceStage = document.querySelector("[data-service-stage]");
const categoryTitle = document.querySelector("[data-category-title]");
const categoryDescription = document.querySelector("[data-category-description]");
const currentIndex = document.querySelector("[data-current-index]");
const ghostIndex = document.querySelector("[data-ghost-index]");
const serviceList = document.querySelector("[data-service-list]");
const categoryAnnouncer = document.querySelector("[data-category-announcer]");
const progressButtons = [...document.querySelectorAll("[data-category-index]")];
const previousButton = document.querySelector("[data-previous-category]");
const nextButton = document.querySelector("[data-next-category]");
const siteHeader = document.querySelector("[data-site-header]");
const siteMenu = document.querySelector("[data-site-menu]");
const menuAccordion = document.querySelector("[data-menu-accordion]");
const openMenuButton = document.querySelector("[data-open-menu]");
const closeMenuButton = document.querySelector("[data-close-menu]");
const contactTitle = document.querySelector("[data-contact-title]");
const contactLink = document.querySelector("[data-contact-link]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeCategory = 0;
let transitionTimer;
let pointerStartX = null;

const twoDigits = (value) => String(value + 1).padStart(2, "0");

function serviceSubject(service) {
  return `Projeto de ${service} com a UXIN`;
}

function selectService(service) {
  contactTitle.textContent = `Vamos conversar sobre ${service}?`;
  contactLink.href = `mailto:contato@uxin.design?subject=${encodeURIComponent(
    serviceSubject(service),
  )}`;
}

function createServiceLink(service, className = "service-link") {
  const link = document.createElement("a");
  link.className = className;
  link.href = "#contato";
  link.textContent = service;
  link.addEventListener("click", () => selectService(service));
  return link;
}

function renderServiceList(category) {
  const fragment = document.createDocumentFragment();
  category.services.forEach((service) => {
    fragment.append(createServiceLink(service));
  });
  serviceList.replaceChildren(fragment);
}

function updateProgress() {
  progressButtons.forEach((button, index) => {
    if (index === activeCategory) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function commitCategory(index, announce = true) {
  activeCategory = (index + categories.length) % categories.length;
  const category = categories[activeCategory];
  const formattedIndex = twoDigits(activeCategory);

  currentIndex.textContent = formattedIndex;
  ghostIndex.textContent = formattedIndex;
  categoryTitle.textContent = category.title;
  categoryDescription.textContent = category.description;
  renderServiceList(category);
  updateProgress();

  if (announce) {
    categoryAnnouncer.textContent = `${category.title}. ${category.services.length} serviços.`;
  }
}

function changeCategory(index) {
  const normalizedIndex = (index + categories.length) % categories.length;
  if (normalizedIndex === activeCategory) return;

  window.clearTimeout(transitionTimer);

  if (reduceMotion.matches) {
    commitCategory(normalizedIndex);
    return;
  }

  serviceStage.classList.add("is-changing");
  transitionTimer = window.setTimeout(() => {
    commitCategory(normalizedIndex);
    requestAnimationFrame(() => serviceStage.classList.remove("is-changing"));
  }, 150);
}

progressButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeCategory(Number(button.dataset.categoryIndex));
  });
});

previousButton.addEventListener("click", () => changeCategory(activeCategory - 1));
nextButton.addEventListener("click", () => changeCategory(activeCategory + 1));

serviceStage.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "mouse") {
    pointerStartX = event.clientX;
  }
});

serviceStage.addEventListener("pointerup", (event) => {
  if (pointerStartX === null) return;
  const distance = event.clientX - pointerStartX;
  pointerStartX = null;

  if (Math.abs(distance) < 55) return;
  changeCategory(distance < 0 ? activeCategory + 1 : activeCategory - 1);
});

window.addEventListener("keydown", (event) => {
  if (siteMenu.open || event.altKey || event.ctrlKey || event.metaKey) return;
  const bounds = serviceStage.getBoundingClientRect();
  const stageIsActive = bounds.top < window.innerHeight * 0.35 && bounds.bottom > 0;

  if (!stageIsActive) return;
  if (event.key === "ArrowLeft") changeCategory(activeCategory - 1);
  if (event.key === "ArrowRight") changeCategory(activeCategory + 1);
});

function createMenuCategory(category, index) {
  const section = document.createElement("section");
  section.className = "menu-category";

  const trigger = document.createElement("button");
  trigger.className = "menu-category__trigger";
  trigger.type = "button";
  trigger.setAttribute("aria-expanded", String(index === 0));
  trigger.setAttribute("aria-controls", `menu-category-panel-${index}`);
  trigger.innerHTML = `
    <span class="menu-category__number">${twoDigits(index)}</span>
    <span class="menu-category__name">${category.title}</span>
    <span class="menu-category__icon" aria-hidden="true"></span>
  `;

  const panel = document.createElement("div");
  panel.className = "menu-category__panel";
  panel.id = `menu-category-panel-${index}`;
  panel.hidden = index !== 0;

  const list = document.createElement("ul");
  list.className = "menu-category__services";

  category.services.forEach((service) => {
    const item = document.createElement("li");
    const link = createServiceLink(service, "");
    link.addEventListener("click", () => siteMenu.close());
    item.append(link);
    list.append(item);
  });

  panel.append(list);
  section.append(trigger, panel);

  trigger.addEventListener("click", () => {
    const triggers = [...menuAccordion.querySelectorAll(".menu-category__trigger")];
    triggers.forEach((otherTrigger) => {
      const otherPanel = document.getElementById(otherTrigger.getAttribute("aria-controls"));
      const shouldOpen = otherTrigger === trigger;
      otherTrigger.setAttribute("aria-expanded", String(shouldOpen));
      otherPanel.hidden = !shouldOpen;
    });
  });

  return section;
}

function renderMenu() {
  const fragment = document.createDocumentFragment();
  categories.forEach((category, index) => {
    fragment.append(createMenuCategory(category, index));
  });
  menuAccordion.replaceChildren(fragment);
}

openMenuButton.addEventListener("click", () => {
  if (!siteMenu.open) siteMenu.showModal();
});

closeMenuButton.addEventListener("click", () => siteMenu.close());

siteMenu.addEventListener("click", (event) => {
  if (event.target === siteMenu) siteMenu.close();
});

siteMenu.querySelectorAll(".menu-utilities a").forEach((link) => {
  link.addEventListener("click", () => siteMenu.close());
});

function updateHeader() {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });

renderServiceList(categories[0]);
renderMenu();
updateProgress();
updateHeader();
