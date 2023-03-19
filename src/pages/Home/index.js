import { useEffect, useState } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { getCoursesApi } from "../../apis/course";
import {
  getMyNotRegisteredCoursesApi,
  getMyRegisteredCoursesApi
} from "../../apis/register";
import { isAuth } from "../../components/Auth";
import { Banner } from "../../assets";
import Header from "../../components/Header";
import Course from "../../components/Course";
import styles from "./Home.module.css";

function Home() {
  const isLoggedIn = isAuth();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [allCourses, setAllCourses] = useState([]);
  const [myRegisteredCourses, setMyRegisteredCourses] = useState([]);
  const [myNotRegisteredCourses, setMyNotRegisteredCourses] = useState([]);

  const loadAllCourses = () => {
    getCoursesApi().then((res) => {
      if (res.error) toast.error("Load all courses failed");
      else setAllCourses(res.data);
    });
  };

  const loadMyRegisteredCourses = () => {
    getMyRegisteredCoursesApi(userId).then((res) => {
      if (res.error) toast.error("Load my courses failed");
      else setMyRegisteredCourses(res.data);
    });
  };

  const loadMyNotRegisteredCourses = () => {
    getMyNotRegisteredCoursesApi(userId).then((res) => {
      if (res.error) toast.error("Load other courses failed");
      else setMyNotRegisteredCourses(res.data);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageTitle(PageTitle.HOME);

    if (isLoggedIn) {
      loadMyRegisteredCourses();
      loadMyNotRegisteredCourses();
    } else {
      loadAllCourses();
    }
  }, []);

  return isLoggedIn ? (
    <div className={styles.home}>
      <Header />
      <section className={`container_fluid ${styles.homeBanner}`}>
        <img src={Banner} alt=""></img>
      </section>
      <section className={`container ${styles.homeSlider}`}>
        <h2>My Courses</h2>
        <div className={styles.row}>
          {myRegisteredCourses.map((course, index) => (
            <Course key={index} course={course} index={index} type="learn" />
          ))}
        </div>
      </section>
      <section className={`container ${styles.homeSlider}`}>
        <h2>Other Courses</h2>
        <div className={styles.row}>
          {myNotRegisteredCourses.map((course, index) => (
            <Course key={index} course={course} index={index} />
          ))}
        </div>
      </section>
    </div>
  ) : (
    <div className={styles.home}>
      <Header />
      <section className={`container_fluid ${styles.homeBanner}`}>
        <img src={Banner} alt=""></img>
      </section>
      <section className={`container ${styles.homeSlider}`}>
        <h2>All Courses</h2>
        <div className={styles.row}>
          {allCourses.map((course, index) => (
            <Course key={index} course={course} index={index} type="register" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
