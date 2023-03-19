import { useEffect, useState } from "react";
import { getMyRegisteredCoursesApi } from "../../apis/register";
import { Banner } from "../../assets";
import Header from "../../components/Header";
import Course from "../../components/Course";
import styles from "./MyCourses.module.css";

function MyCourses() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [myRegisteredCourses, setMyRegisteredCourses] = useState([]);

  const loadMyRegisteredCourses = () => {
    getMyRegisteredCoursesApi(userId).then((res) => {
      if (res.error) toast.error("Load all courses failed");
      else setMyRegisteredCourses(res.data);
    });
  };

  useEffect(() => {
    loadMyRegisteredCourses();
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
