import { ImPriceTags } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

function Course({ course, index }) {
  const navigate = useNavigate();

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
          onClick={() => {
            navigate(`course/${course._id}`);
          }}
          style={{ background: "#adc8e0" }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
}

export default Course;
