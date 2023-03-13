import { useState } from "react";
import { ImPriceTags } from "react-icons/im";
import { registerCourse } from "../../apis/register";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

function Course({ course, index }) {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleRegister = () => {
    setRegister(!register);
  };

  const registerNewCourse = (userId, courseId) => {
    if (userId) {
      registerCourse({ userId, courseId })
        .then((data) => {
          if (data.error) toast.error(data.error);
          else {
            handleRegister();
            toast.success("Register Success");
          }
        })
        .catch((error) => toast.error(error));
    } else {
      navigate("/signin");
    }
  };

  return (
    <div key={index} className={styles.listCourse}>
      <div className={styles.course__left}>
        <img className={styles.itemImage} src={course.thumbnail} alt="" />
      </div>
      <div className={styles.course__right}>
        <h3 className="course__name">{course.name}</h3>
        <div className={styles.course__cost}>
          <ImPriceTags /> {course.cost}
        </div>
        <p className={styles.course__description}>{course.description}</p>
        <button
          className={styles.register_button}
          disabled={register}
          onClick={() => {
            registerNewCourse(userId, course._id);
          }}
          style={{ background: register ? "#f9f8f8" : "#adc8e0" }}
        >
          {register ? "Registered" : "Register Now"}
        </button>
      </div>
    </div>
  );
}

export default Course;
