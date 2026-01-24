// src/components/Layout/Header/Header.jsx
import { useState } from "react"; 
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import styles from "./Header.module.css";
import { ROUTE_PATHS } from "../../../configs/router-config";

function Header() {
  const { t, i18n } = useTranslation(); 
  const pageTitleKey = useSelector((state) => state.ui.pageTitle);
  const [isLangOpen, setIsLangOpen] = useState(false);//dropdown state

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    setIsLangOpen(false); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.mainLogo}>
{t("common.blog")} <span>| {t(pageTitleKey)}</span>      </div>

      <nav className={styles.headerNav}>
        <Link to={ROUTE_PATHS.HOME}>{t("nav.home")}</Link>
        <Link to={ROUTE_PATHS.ADD_BLOG}>{t("nav.add_blog")}</Link>

        <div className={styles.langDropdown}>
          <button 
            className={styles.burgerBtn} 
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            ☰ 
          </button>
          
          {isLangOpen && (
            <div className={styles.langMenu}>
              <button onClick={() => handleLanguageChange("ar")}>Arabic</button>
              <button onClick={() => handleLanguageChange("en")}>English</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;