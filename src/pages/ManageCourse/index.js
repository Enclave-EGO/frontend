import { useState, useEffect } from "react";
import { getCoursesByUserApi } from "../../apis/course";
import { toast } from "react-toastify";
import Course from "../../components/Course";
import Header from "../../components/Header";
import styles from "./ManageCourse.module.css";
import { useNavigate } from "react-router-dom";

const ManageCourse = () => {
  const navigate = useNavigate();
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
      <div className={`container ${styles.homeSlider}`}>
        <div className={styles.container}>
          <h2>Manage Courses</h2>
          <button
            type="button"
            className={styles.button}
            onClick={() => navigate("/courses/create")}
          >
            Create Course
          </button>
        </div>
        <div className={styles.row}>
          {courses.map((course, index) => (
            <Course key={index} course={course} index={index} type="manage" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
