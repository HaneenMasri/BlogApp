// Home.jsx
import { useLoaderData } from "react-router-dom";
import styles from "./Home.module.css";
import BlogCard from "../../components/Home/BlogCard";
import Pagination from "../../components/Home/Pagination";

function Home() {
  const { blogs, pagination } = useLoaderData();

  return (
    <main className={styles.container}>
      {blogs.length > 0 ? (
        <>
          <section className={styles.cardsGrid}>
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
              />
            ))}
          </section>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </>
      ) : (
        <p>"Blogs Not Found"</p>
      )}
    </main>
  );
}

export default Home;