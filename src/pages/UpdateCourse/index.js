import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCourseApi, updateCourseApi } from "../../apis/course";
import styles from "./UpdateCourse.module.css";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const initialValues = {
    name: "",
    cost: "",
    description: "",
    thumbnail: ""
  };
  const [values, setValues] = useState(initialValues);

  const getOldCourseData = () => {
    getCourseApi(courseId).then((res) => {
      setValues(res.data);
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    updateCourseApi(courseId, values)
      .then((res) => {
        if (res.error) {
          toast.error(res.message);
        } else {
          toast.success("Update Course Success");
        }
      })
      .catch(() => toast.error("Update Course Fail"));
  };

  const renderUpdateCourseForm = () => {
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
              value={values.name}
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
              value={values.cost}
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
              value={values.description}
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
              value={values.thumbnail}
              onChange={handleChange("thumbnail")}
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

  useEffect(() => {
    getOldCourseData();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="bold">Update Course</h2>
      <div className="mt-4 ">{renderUpdateCourseForm()}</div>
    </div>
  );
};

export default UpdateCourse;
