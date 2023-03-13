import { useEffect, useState } from "react";
import { createLessonApi } from "../../apis/lesson";
import { getCourseApi } from "../../apis/course";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./CreateLesson.css";
import { isAuthenticated } from "../../components/Auth";

function createLesson() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const course = query.get("courseId");

  const [values, setValues] = useState({
    name: "",
    description: "",
    videoId: "",
    courseId: course
  });
  const [createdCourse, setCreatedCourse] = useState();
  const { name, description, videoId, courseId } = values;
  const { token, user } = isAuthenticated();

  const getCourse = () => {
    getCourseApi(course).then((data) => {
      setCreatedCourse(data.id);
    });
  };

  useEffect(() => {
    getCourse();
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const dataSubmit = { name, description, videoId, courseId };
    createLessonApi(user.id, token, dataSubmit)
      .then((data) => {
        toast.success("Created Success");
      })
      .catch((err) => {
        toast.success("Created Fail");
      });
  };

  const renderCreateLessonForm = () => {
    return (
      <form id="form-1">
        <div className="form-group">
          <span className="text-muted">Name</span>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <span className="text-muted">Description</span>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          ></textarea>
        </div>
        <div className="form-group">
          <span className="text-muted">Video Id</span>
          <input
            onChange={handleChange("videoId")}
            type="text"
            className="form-control"
            value={videoId}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={(e) => submitForm(e)}
        >
          Create
        </button>
      </form>
    );
  };

  return (
    <section className={`mt-4`}>
      <div>
        <h2 className={styles.textCreateLesson}>Create Lesson</h2>
        <div className="mt-4">{renderCreateLessonForm()}</div>
      </div>
    </section>
  );
}

export default createLesson;
