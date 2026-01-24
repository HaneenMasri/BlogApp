import { Pencil, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import { deleteBlog } from '../../../store/blogSlice';
import styles from "./BlogCard.module.css";

function BlogCard({ blog }) {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: t("delete_modal.title"),
      text: t("delete_modal.message"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t("delete_modal.btn_confirm"),
      cancelButtonText: t("delete_modal.btn_cancel"),
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlog(blog.id));
      }
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={blog.image} alt={blog.title} className={styles.cardImage} />
        
        <div className={styles.cardActions}>
          <button 
            className={`${styles.actionBtn} ${styles.editBtn}`} 
            onClick={() => navigate(`/edit-blog/${blog.id}`)}
          >
            <Pencil size={18} />
          </button>
          
          <button 
            className={`${styles.actionBtn} ${styles.deleteBtn}`} 
            onClick={handleDelete}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className={styles.contentContainer}>
        <h3 className={styles.cardTitle}>{blog.title}</h3>
        <p className={styles.cardDescription}>{blog.description}</p>
      </div>
    </div>
  );
}

export default BlogCard;