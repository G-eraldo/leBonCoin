import {
  default as AuthLogo,
  default as MenuLogo,
} from "./extensions/logo.png";

const config = {
  locales: ["fr"],
  auth: { logo: AuthLogo },
  menu: { logo: MenuLogo },

  translations: {
    fr: {
      "Auth.form.welcome.title": "Sacré-Cœur de Breteuil",
      "Auth.form.welcome.subtitle": "Espace d'administration",
      "app.components.LeftMenu.navbrand.title": "Sacré-Cœur",
      "HomePage.header.title": "Bonjour {name} !",
      "HomePage.header.subtitle":
        "Bienvenue dans votre interface d'administration",
      "HomePage.head.title": "Accueil",
      "app.components.HomePage.community": "STATISTIQUES DU PROJET",
      "content-manager.plugin.name": "Gestionnaire de contenu",
      "content-type-builder.plugin.name": "Constructeur de types",
      "Settings.profile.form.section.profile.title": "Profil",
      "Settings.profile.form.section.profile.subtitle": "Paramètres du profil",
    },
    en: {
      "Auth.form.welcome.title": "Sacré-Cœur de Breteuil",
      "Auth.form.welcome.subtitle": "Administration panel",
      "app.components.LeftMenu.navbrand.title": "Sacré-Cœur",
      "HomePage.header.title": "Hello {name}!",
      "HomePage.header.subtitle": "Welcome to your administration panel",
      "app.components.HomePage.community": "PROJECT STATISTICS",
      "content-manager.plugin.name": "Content Manager",
      "content-type-builder.plugin.name": "Content-Type Builder",
      "Settings.profile.form.section.profile.title": "Profile",
      "Settings.profile.form.section.profile.subtitle": "Profile Settings",
    },
  },

  theme: {
    light: {
      colors: {
        primary100: "#f9eef0",
        primary200: "#f0cdd3",
        primary500: "#7b1e2a",
        primary600: "#661826",
        primary700: "#4e1220",
        secondary100: "#faf7f0",
        secondary200: "#f0e5cc",
        secondary500: "#b08d57",
        secondary600: "#9a7a45",
        secondary700: "#7d6234",
        neutral0: "#ffffff",
        neutral100: "#f5f0e8",
        neutral200: "#e8e0d6",
        neutral300: "#ddd4c8",
        neutral400: "#9e8070",
        neutral500: "#6b4f4f",
        neutral600: "#3d2b2b",
        neutral700: "#2c1810",
        neutral800: "#2c1810",
        neutral900: "#1a0d09",
        buttonPrimary500: "#7b1e2a",
        buttonPrimary600: "#661826",
        alternative100: "#faf7f0",
        alternative200: "#f0e5cc",
        alternative500: "#b08d57",
        alternative600: "#9a7a45",
        alternative700: "#7d6234",
        danger500: "#c0392b",
        danger600: "#a93226",
      },
    },
  },
};

const bootstrap = () => {
  const applyStyles = () => {
    const nav = document.querySelector("nav");
    if (!nav) return false;

    const navClasses = Array.from(nav.classList).join(".");

    const style = document.createElement("style");
    style.id = "sacrecoeur-custom-css";

    style.textContent = `
      /* ── Fond bordeaux ───────────────────────────────────── */
      nav.${navClasses},
      nav.${navClasses} > div,
      nav.${navClasses} > div > div,
      nav.${navClasses} > div > div > div {
        background-color: #7b1e2a !important;
      }

      /* ── Supprime fond blanc des icônes ──────────────────── */
      nav.${navClasses} a,
      nav.${navClasses} button,
      nav.${navClasses} li,
      nav.${navClasses} ul,
      nav.${navClasses} ul > li,
      nav.${navClasses} ul > li > a,
      nav.${navClasses} ul > li > button {
        background-color: transparent !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: #b08d57 !important;
      }

      /* ── Icônes dorées ───────────────────────────────────── */
      nav.${navClasses} svg,
      nav.${navClasses} svg * {
        color: #b08d57 !important;
        fill: #b08d57 !important;
        stroke: none !important;
      }

      /* ── Item actif ──────────────────────────────────────── */
      nav.${navClasses} a[aria-current="page"] {
        background-color: #4e1220 !important;
        border-radius: 8px !important;
      }
      nav.${navClasses} a[aria-current="page"] svg,
      nav.${navClasses} a[aria-current="page"] svg * {
        color: #c9a46a !important;
        fill: #c9a46a !important;
      }

      /* ── Hover ───────────────────────────────────────────── */
      nav.${navClasses} a:hover,
      nav.${navClasses} button:hover {
        background-color: #661826 !important;
        border-radius: 8px !important;
      }

      /* ── Séparateur ──────────────────────────────────────── */
      nav.${navClasses} [role="separator"] {
        background-color: #661826 !important;
      }


      /* ── Avatar en bas ───────────────────────────────────── */
      nav.${navClasses} > div:last-child,
      nav.${navClasses} > div:last-child * {
        background-color: #7b1e2a !important;
        border-top: 1px solid #661826 !important;
        color: #b08d57 !important;
      }

      /* ── Badge doré ──────────────────────────────────────── */
      nav.${navClasses} span[class],
      nav.${navClasses} [aria-label*="notif"] {
        background-color: #b08d57 !important;
        border-color: #7b1e2a !important;
        color: #ffffff !important;
      }

      /* ════════════════════════════════════════════════════════
         MASQUER "Déployer" et "Marketplace"
         Ces liens pointent vers des routes connues de Strapi
      ════════════════════════════════════════════════════════ */
      
      /* Lien Marketplace */
      nav a[href*="/marketplace"],
      nav a[href*="marketplace"] {
        display: none !important;
      }

      /* Lien Déployer / Deploy */
      nav a[href*="/deploy"],
      nav a[href*="deploy"],
      nav a[href*="/plugins/deployment"],
      nav a[href*="cloud"] {
        display: none !important;
      }

      /* ── Bordures discrètes ───────────────────────────────── */
      hr, [role="separator"] {
        background-color: #e8e0d6 !important;
        border-color: #e8e0d6 !important;
      }
    `;

    if (!document.getElementById("sacrecoeur-custom-css")) {
      document.head.appendChild(style);
    }
    return true;
  };

  if (!applyStyles()) {
    const observer = new MutationObserver(() => {
      if (applyStyles()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
};

export default { config, bootstrap };
