import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { createCourseApi } from "../../apis/course";
import { useNavigate } from "react-router-dom";
import styles from "./CreateCourse.module.css";

const CreateCourse = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const initialValues = {
    name: "",
    cost: "",
    description: "",
    thumbnail: "",
    userId: userId
  };
  const [values, setValues] = useState(initialValues);
  const nameInputRef = useRef();
  const costInputRef = useRef();
  const descriptionInputRef = useRef();
  const thumbnailInputRef = useRef();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearInputsText = () => {
    nameInputRef.current.value = "";
    costInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    thumbnailInputRef.current.value = "";
  };

  const submitForm = (e) => {
    e.preventDefault();

    createCourseApi(values)
      .then((res) => {
        if (res.status === "fail") {
          toast.error(res.message);
        } else {
          clearInputsText();
          setValues(initialValues);
          toast.success("Create Course Success");
          navigate("/manage/courses");
        }
      })
      .catch(() => toast.error("Create Course Failed"));
  };

  const renderCreateCourseForm = () => {
    return (
      <form className={styles.container} id="form-1">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Name</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              ref={nameInputRef}
              onChange={handleChange("name")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Cost (VND)</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              ref={costInputRef}
              onChange={handleChange("cost")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
              <p className={styles.formForce}>*</p>
            </div>
            <textarea
              className={styles.formControl}
              ref={descriptionInputRef}
              onChange={handleChange("description")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Thumbnail</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              ref={thumbnailInputRef}
              onChange={handleChange("thumbnail")}
            />
          </div>
          <button
            type="button"
            className={`${styles.formSubmit}`}
            onClick={(e) => submitForm(e)}
          >
            Create
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="mt-4">
      <h2 className="bold">Create New Course</h2>
      <div className="mt-4 ">{renderCreateCourseForm()}</div>
    </div>
  );
};

export default CreateCourse;
