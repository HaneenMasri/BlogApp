import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useLocation, useSubmit, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AddEditBlog.module.css";

function AddEditBlog() {
  const location = useLocation();
  const submit = useSubmit();
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const loaderData = useLoaderData();
  const blog = loaderData?.blog || null;

  const isEditMode = useMemo(() => location.pathname.includes("/edit"), [location.pathname]);
const schema = yup.object().shape({
  title: yup
    .string()
    .required(t("validation.titleRequired"))
    .max(50, t("validation.titleMax"))
    .test("no-arabic", t("validation.noArabic"), (value) => {
      if (!value) return true;
      return !/[ء-ي]/.test(value);
    })
    .test("no-special-chars", t("validation.noSpecialChars"), (value) => {
      if (!value) return true;
      return /^[A-Za-z\s]+$/.test(value); 
    })
    .test("capital-first", t("validation.capitalFirst"), (value) => {
      if (!value) return true;
      return /^[A-Z]/.test(value); 
    }),

  description: yup
    .string()
    .required(t("validation.descRequired"))
    .max(1000, t("validation.descMax"))
    .test("no-arabic", t("validation.noArabic"), (value) => {
      if (!value) return true;
      return !/[ء-ي]/.test(value);
    })
    .test("no-special-chars", t("validation.noSpecialChars"), (value) => {
      if (!value) return true;
      return /^[A-Za-z\s]+$/.test(value);
    }),
});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", 
    defaultValues: { title: "", description: "" },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEditMode && blog) {
      reset({
        title: blog.title || "",
        description: blog.description || "",
      });
    } else if (!isEditMode) {
      reset({ title: "", description: "" });
    }
  }, [blog, isEditMode, reset]);

  const onSubmit = (data) => {
    const fd = new FormData();
    fd.append("title", data.title.trim());
    fd.append("description", data.description.trim());

    submit(fd, {
      method: "post",
      action: location.pathname,
    });
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">{t("title")}</label>
          <input
            id="title"
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            type="text"
            {...register("title")}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">{t("description")}</label>
          <textarea
            id="description"
            className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
            rows={6}
            {...register("description")}
          />
          {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={!isValid}>
            {isEditMode ? t("edit") : t("add")}
          </button>
          
          <button type="button" className={styles.cancelBtn} onClick={() => navigate("/")}>
            {t("cancel")}
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddEditBlog;