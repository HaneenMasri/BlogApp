// src/pages/AddEditBlog/AddEditBlog.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addBlog, updateBlog } from "../../store/blogSlice";
import { setPageTitle } from "../../store/uiSlice"; 
import styles from "./AddEditBlog.module.css";

function AddEditBlog() {
  const { t } = useTranslation();
  const { id } = useParams();//يجيب رقم البلوج من الرابط /edit-blog/:id
  const isEditMode = !!(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingBlog = useSelector((state) =>
    state.blogs.items.find((item) => item.id === Number(id))
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",//يعني الفورم يتحقق من القيم أثناء الكتابة وليس بعد الضغط على submit.
  });

  useEffect(() => {
    const titleKey = isEditMode ? "form.edit_title" : "nav.add_blog";
    dispatch(setPageTitle(titleKey));
  }, [dispatch, isEditMode]); 

  useEffect(() => {
    if (isEditMode && existingBlog) {
      reset(existingBlog);
    }
  }, [isEditMode, existingBlog, reset]);

  const onSubmit = (data) => { //data → القيم الجديدة اللي دخلها المستخدم في الفورم.
    if (isEditMode) {
      dispatch(updateBlog({ ...existingBlog, ...data }));//ندمج القيم القديمة مع الجديدة.
    } else {
      dispatch(addBlog(data));
    }
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>
          {isEditMode ? t("form.edit_title") : t("form.add_title")}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>{t("form.label_title")}</label>
            <input
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 50, message: "Max 50 characters allowed" },
                validate: {
                 noArabic: (v) => !v.match(/[ء-ي]/) || "Arabic characters are not allowed",
                  noSpecial: (v) => /^[a-zA-Z0-9 ]*$/.test(v) || "Special characters are not allowed",
                  capitalize: (v) => /^[A-Z]/.test(v) || "First letter must be capitalized",
                  englishOnly: (v) => /^[a-zA-Z ]*$/.test(v) || "Only English allowed"
                }
              })}
              placeholder={t("form.placeholder_title")}
            />
            {errors.title && <span className={styles.errorText}>{errors.title.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>{t("form.label_desc")}</label>
            <textarea
              {...register("description", {
                required: "Description is required",
                maxLength: { value: 1000, message: "Max 1000 characters" },
                validate: {
                  noArabic: (v) => !v.match(/[ء-ي]/) || "Arabic characters are not allowed",
                  noSpecial: (v) => /^[a-zA-Z0-9 ]*$/.test(v) || "Special characters are not allowed",
                  englishOnly: (v) => /^[a-zA-Z ]*$/.test(v) || "Only English allowed"

                }
              })}
              rows="5"
              placeholder={t("form.placeholder_desc")}
            ></textarea>
            {errors.description && <span className={styles.errorText}>{errors.description.message}</span>}
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={() => navigate("/")} className={styles.cancelBtn}>
              {t("form.btn_cancel")}
            </button>
            <button type="submit" className={styles.submitBtn} disabled={!isValid}>
              {isEditMode ? t("form.edit_title") : t("form.btn_add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditBlog;