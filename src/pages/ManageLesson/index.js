import { useState, useEffect } from "react";
import { getCourseApi } from "../../apis/course";
import { getLessonsByCourseApi } from "../../apis/lesson";
import { toast } from "react-toastify";
import useQuery from "../../hooks/useQuery";
import Lesson from "../../components/Lesson";
import Header from "../../components/Header";
import styles from "./ManageLesson.module.css";

const ManageLesson = () => {
  const query = useQuery();
  const courseId = query.get("courseId");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getCourseApi(courseId).then((data) => {
      if (data.error) {
        toast.error(data.message);
      } else {
        setCourse(data.data);
      }
    });

    getLessonsByCourseApi(courseId).then((data) => {
      if (data.error) {
        toast.error(data.message);
      } else {
        setLessons(data.data);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <h2 className={styles.homeSliderHeading}>Manage Lessons</h2>
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
