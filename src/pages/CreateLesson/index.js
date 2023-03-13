import { useEffect, useState } from "react";
import { createLessonApi } from "../../apis/lesson";
import { getCourseApi } from "../../apis/course";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./CreateLesson.module.css";

const CreateLesson = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const courseId = query.get("courseId");

  const [values, setValues] = useState({
    name: "",
    description: "",
    videoId: "",
    courseId: courseId
  });
  const [course, setCourse] = useState();

  const getCourse = () => {
    getCourseApi(courseId).then((data) => {
      setCourse(data.data);
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    createLessonApi(values)
      .then((data) => {
        toast.success("Create Success");
      })
      .catch((error) => {
        toast.error("Create Fail");
      });
  };

  useEffect(() => {
    getCourse();
    window.scrollTo(0, 0);
  }, []);

  const renderCreateLessonForm = () => {
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
              onChange={handleChange("name")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Video Id</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              onChange={handleChange("videoId")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
              <p className={styles.formForce}>*</p>
            </div>
            <textarea
              className={styles.formControl}
              onChange={handleChange("description")}
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
      <h2>Course: {course && course.name}</h2>
      <h2 className="bold">Create Lesson</h2>
      <div className="mt-4 ">{renderCreateLessonForm()}</div>
    </div>
  );
};

export default CreateLesson;
