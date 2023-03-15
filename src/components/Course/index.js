import { useState, Fragment } from "react";
import { ImPriceTags } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../modals/DeleteModal";
import styles from "./style.module.css";

function Course({ course, index, type = "register" }) {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
        {type === "register" ? (
          <button
            className={styles.register_button}
            onClick={() => {
              navigate(`courses/${course._id}`);
            }}
            style={{ background: "#adc8e0" }}
          >
            Register Now
          </button>
        ) : (
          <Fragment>
            <button
              className={styles.register_button}
              onClick={() => {
                navigate(`courses/update/${course._id}`);
              }}
              style={{ background: "rgb(87 191 136)" }}
            >
              Edit
            </button>
            <button
              className={styles.register_button}
              style={{ background: "rgb(249 84 53)", marginLeft: "4px" }}
              onClick={(e) => setOpenDeleteModal(!openDeleteModal)}
            >
              Delete
            </button>
            {openDeleteModal && (
              <DeleteModal
                body="Are you sure to delete this course?"
                setOpenDeleteModal={setOpenDeleteModal}
              />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default Course;
