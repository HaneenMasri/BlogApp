import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../../store/blogSlice";
import { setPageTitle } from "../../store/uiSlice";
import BlogCard from "../../components/Home/BlogCard/BlogCard";
import styles from "./Home.module.css";

function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const allBlogsFromLoader = useLoaderData(); 
  const allBlogs = useSelector((state) => state.blogs.items);
//2. Fetch Blogs and Pagination
useEffect(() => {
  dispatch(setPageTitle(t("home.title"))); 

  if (allBlogs.length === 0 && allBlogsFromLoader.length > 0) {
    dispatch(setBlogs(allBlogsFromLoader));
  }
}, [dispatch, allBlogs.length, allBlogsFromLoader, t]);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const reversedBlogs = [...allBlogs].reverse();
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage) || 1;
  
  const lastIndex = currentPage * blogsPerPage;// 1*6=6
  const firstIndex = lastIndex - blogsPerPage;//6-6=0
  const currentBlogs = reversedBlogs.slice(firstIndex, lastIndex);//(0,6)

  return (
    <div className={styles.homeContainer}>
      <div className={styles.blogGrid}>
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p className={styles.noData}>{t("home.no_blogs")}</p>
        )}
      </div>

      <div className={styles.pagination}>
        <button 
          className={styles.pageBtn}
          onClick={() => setCurrentPage(p => p - 1)} 
          disabled={currentPage === 1} 
        >
          {t("pagination.prev")}
        </button>
        
        <span className={styles.pageInfo}>
          {/* ex Page 1 of 3  */}
          {t("pagination.page")} 
          {currentPage}
          {t("pagination.of")} {totalPages}
        </span>

        <button 
          className={styles.pageBtn}
          onClick={() => setCurrentPage(p => p + 1)} 
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {t("pagination.next")}
        </button>
      </div>
    </div>
  );
}

export default Home;