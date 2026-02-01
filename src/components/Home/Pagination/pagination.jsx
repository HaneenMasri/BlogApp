// src/components/Home/Pagination/Pagination.jsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Pagination.module.css";

//props: currentPage, totalPages from loader by useLoaderData()
function Pagination({ currentPage, totalPages }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Function to navigate to a specific page
  const goToPage = (page) => {
    navigate(`/?page=${page}`);
  };

  return (
    <div className={styles.pagination}>
      {/*  Previous Button */}
      <button
        type="button"
        className={styles.btn}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t("prev")}
      </button>

      <span className={styles.info}>
        {t("pageOf", { current: currentPage, total: totalPages })}
      </span>

      <button
        type="button"
        className={styles.btn}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t("next")}
      </button>
    </div>
  );
}

export default Pagination;
