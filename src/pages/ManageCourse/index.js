import { useState, useEffect } from "react";
import { getCoursesByUserApi } from "../../apis/course";
import { toast } from "react-toastify";
import Course from "../../components/Course";
import Header from "../../components/Header";
import styles from "./ManageCourse.module.css";

const ManageCourse = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesByUserApi(userId).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        setCourses(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <h2>Manage Courses</h2>
        <div className={styles.row}>
          {courses.map((course, index) => (
            <Course key={index} course={course} index={index} type="manage" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ManageCourse;
