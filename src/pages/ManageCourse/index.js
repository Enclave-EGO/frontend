import { useState, useEffect } from "react";
import { getCoursesApi } from "../../apis/course";
import { toast } from "react-toastify";
import Course from "../../components/Course";
import Header from "../../components/Header";
import styles from "./ManageCourse.module.css";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesApi().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        setCourses(data.data);
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
