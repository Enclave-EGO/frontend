import { useState, useEffect } from "react";
import { getLessonApi } from "../../apis/lesson";
import { getTestsByLessonApi } from "../../apis/test";
import { toast } from "react-toastify";
import useQuery from "../../hooks/useQuery";
import Header from "../../components/Header";
import Test from "../../components/Test";
import styles from "./ManageTest.module.css";

const ManageTest = () => {
  const query = useQuery();
  const lessonId = query.get("lessonId");
  const [lesson, setLesson] = useState();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getLessonApi(lessonId).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        setLesson(res.data);
      }
    });

    getTestsByLessonApi(lessonId).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        setTests(res.data.tests);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <h2 className={styles.homeSliderHeading}>Manage Tests</h2>
        <h2 className={styles.lessonName}>Lesson: {lesson && lesson.name}</h2>
        <div className={styles.row}>
          {tests &&
            tests.map((test, index) => (
              <Test key={index} test={test} index={index} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default ManageTest;
