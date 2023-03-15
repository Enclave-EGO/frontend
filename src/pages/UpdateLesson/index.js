import { useEffect, useState, useRef } from "react";
import { updateLessonApi, getLessonApi } from "../../apis/lesson";
import { getCourseApi } from "../../apis/course";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./UpdateLesson.module.css";

const UpdateLesson = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const courseId = query.get("courseId");
  const { lessonId } = useParams();

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
  const getLesson = () => {
    getLessonApi(lessonId).then((data) => {
      setValues(data.data);
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    updateLessonApi(lessonId, values)
      .then((data) => {
        if (data.status === "fail") {
          toast.error(data.message);
        } else {
          toast.success("Update Lesson Success");
        }
      })
      .catch((error) => {
        toast.error("Update Lesson Fail");
      });
  };

  useEffect(() => {
    getCourse(courseId);
    getLesson(lessonId);
    window.scrollTo(0, 0);
  }, [lessonId]);

  const renderUpdateLessonForm = () => {
    return (
      <form className={styles.container} id="form-1">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Name</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              value={values?.name}
              onChange={handleChange("name")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Video Id</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              value={values?.videoId}
              onChange={handleChange("videoId")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
            </div>
            <textarea
              className={styles.formControl}
              value={values?.description}
              onChange={handleChange("description")}
            />
          </div>
          <button
            type="button"
            className={`${styles.formSubmit}`}
            onClick={(e) => submitForm(e)}
          >
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="mt-4">
      <h2>Course: {course?.name}</h2>
      <h2 className="bold">Update Lesson</h2>
      <div className="mt-4 ">{renderUpdateLessonForm()}</div>
    </div>
  );
};

export default UpdateLesson;
