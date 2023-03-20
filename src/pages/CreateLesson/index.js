import { useEffect, useState, useRef } from "react";
import { createLessonApi } from "../../apis/lesson";
import { getCourseApi } from "../../apis/course";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useQuery from "../../hooks/useQuery";
import styles from "./CreateLesson.module.css";

const CreateLesson = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const courseId = query.get("courseId");

  const initialValues = {
    name: "",
    description: "",
    videoId: "",
    courseId: courseId
  };
  const [values, setValues] = useState(initialValues);
  const [course, setCourse] = useState();
  const nameInputRef = useRef();
  const videoIdInputRef = useRef();
  const descriptionInputRef = useRef();

  const getCourse = () => {
    getCourseApi(courseId)
      .then((res) => {
        setCourse(res.data);
      })
      .catch(() => toast.error("Get Course Failed"));
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearInputsText = () => {
    nameInputRef.current.value = "";
    videoIdInputRef.current.value = "";
    descriptionInputRef.current.value = "";
  };

  const submitForm = (e) => {
    e.preventDefault();

    createLessonApi(values)
      .then((data) => {
        if (data.status === "fail") {
          toast.error(data.message);
        } else {
          clearInputsText();
          setValues(initialValues);
          toast.success("Create Lesson Success");
          navigate(`/manage/lessons?courseId=${courseId}`);
        }
      })
      .catch(() => toast.error("Create Lesson Failed"));
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
              ref={nameInputRef}
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
              ref={videoIdInputRef}
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
              ref={descriptionInputRef}
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
