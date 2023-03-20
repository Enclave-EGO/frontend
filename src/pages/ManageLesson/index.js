import { useState, useEffect } from "react";
import { getCourseApi } from "../../apis/course";
import { getLessonsByCourseApi } from "../../apis/lesson";
import { toast } from "react-toastify";
import useQuery from "../../hooks/useQuery";
import Lesson from "../../components/Lesson";
import Header from "../../components/Header";
import styles from "./ManageLesson.module.css";
import { useNavigate } from "react-router-dom";

const ManageLesson = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const courseId = query.get("courseId");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getCourseApi(courseId).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        setCourse(res.data);
      }
    });

    getLessonsByCourseApi(courseId).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        setLessons(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <div className={styles.container}>
          <h2 className={styles.homeSliderHeading}>Manage Lessons</h2>
          <button
            type="button"
            className={styles.button}
            onClick={() => navigate(`/lessons/create?courseId=${courseId}`)}
          >
            Create Lesson
          </button>
        </div>
        <h2 className={styles.courseName}>Course: {course && course.name}</h2>
        <div className={styles.row}>
          {lessons.map((lesson, index) => (
            <Lesson key={index} lesson={lesson} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ManageLesson;
