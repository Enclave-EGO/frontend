import { useEffect, useState } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { getCourses } from "../../apis/course";
import { Banner } from "../../assets";
import Header from "../../components/Header";
import styles from "./Home.module.css";
import Course from "../../components/Course";

function Home() {
  const [courseByArrival, setCourseByArrival] = useState([]);

  const loadCourseByArrival = () => {
    getCourses().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCourseByArrival(data.data);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageTitle(PageTitle.HOME);
    loadCourseByArrival();
  }, []);

  return (
    <div className={styles.home}>
      <Header />
      <section className={`container_fluid ${styles.homeBanner}`}>
        <img src={Banner} alt=""></img>
      </section>
      <section className={styles.homeCourseText}>
        <h1>Course</h1>
        <div className={styles.homeCourseTextP}>
          <p>
            <b>Learning Programming Online Website</b> where you can find low
            cost online programming courses. We are committed to the quality of
            each course.
          </p>
        </div>
      </section>
      <section className={`container ${styles.homeSlider}`}>
        <h2>New courses</h2>
        <div className={styles.row}>
          {courseByArrival.map((course, index) => (
            <Course key={index} course={course} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
