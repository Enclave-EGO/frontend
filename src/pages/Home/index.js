import { useEffect, useState } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { checkValidTokenAPI } from "../../apis/user";
import { getCoursesApi } from "../../apis/course";
import {
  getMyNotRegisteredCoursesApi,
  getMyRegisteredCoursesApi
} from "../../apis/register";
import { Banner } from "../../assets";
import Header from "../../components/Header";
import Course from "../../components/Course";
import styles from "./Home.module.css";

function Home() {
  const token = localStorage.getItem("signin_token");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [myRegisteredCourses, setMyRegisteredCourses] = useState([]);
  const [myNotRegisteredCourses, setMyNotRegisteredCourses] = useState([]);

  const loadAllCourses = () => {
    getCoursesApi()
      .then((res) => {
        if (res.error) toast.error("Get All Courses Failed");
        else setAllCourses(res.data);
      })
      .catch(() => toast.error("Get All Courses Failed"));
  };

  const loadMyRegisteredCourses = () => {
    getMyRegisteredCoursesApi(userId)
      .then((res) => {
        if (res.error) toast.error("Get Registered Courses Failed");
        else setMyRegisteredCourses(res.data);
      })
      .catch(() => toast.error("Get Registered Courses Failed"));
  };

  const loadMyNotRegisteredCourses = () => {
    getMyNotRegisteredCoursesApi(userId)
      .then((res) => {
        if (res.error) toast.error("Get Not Registered Courses Failed");
        else setMyNotRegisteredCourses(res.data);
      })
      .catch(() => toast.error("Get Not Registered Courses Failed"));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageTitle(PageTitle.HOME);
  }, []);

  useEffect(() => {
    if (token) {
      const checkValidToken = async () => await checkValidTokenAPI(token);
      checkValidToken().then((res) => setIsLoggedIn(res.data.data));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadMyRegisteredCourses();
      loadMyNotRegisteredCourses();
    } else {
      loadAllCourses();
    }
  }, [isLoggedIn]);

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
