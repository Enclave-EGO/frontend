import { useEffect, useState } from "react";
import { getMyRegisteredCoursesApi } from "../../apis/register";
import Header from "../../components/Header";
import Course from "../../components/Course";
import styles from "./MyCourses.module.css";

function MyCourses() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [myRegisteredCourses, setMyRegisteredCourses] = useState([]);

  const getMyRegisteredCourses = () => {
    getMyRegisteredCoursesApi(userId)
      .then((res) => {
        if (res.error) toast.error("Load all courses failed");
        else setMyRegisteredCourses(res.data);
      })
      .catch(() => toast.error("Get Courses Failed"));
  };

  useEffect(() => {
    getMyRegisteredCourses();
  }, []);

  return (
    <div className={styles.home}>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <h2>My Registered Courses</h2>
        <div className={styles.row}>
          {myRegisteredCourses.map((course, index) => (
            <Course key={index} course={course} index={index} type="learn" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyCourses;
