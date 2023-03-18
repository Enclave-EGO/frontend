import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseApi } from "../../apis/course";
import { registerCourseApi } from "../../apis/register";
import { toast } from "react-toastify";
import {
  User1Avatar,
  User2Avatar,
  User3Avatar,
  AddToCartIcon
} from "../../assets";
import styles from "./CourseDetail.module.css";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [register, setRegister] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const goToCourseDetail = () => {};

  const handleRegister = () => {
    setRegister(!register);
  };

  const registerNewCourse = (userId, courseId) => {
    if (userId) {
      registerCourseApi({ userId, courseId })
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

  const addToCart = () => {
    if (userId) {
      registerNewCourse(userId, courseId);
      navigate("/cart");
    } else {
      toast.info("You must sign in before");
      navigate("/signin");
    }
  };

  const showRegister = () => {
    if (course) {
      return (
        <button onClick={() => addToCart(course)} className={`btn btn-info`}>
          Register
        </button>
      );
    } else
      return (
        <button onClick={goToCourseDetail} className={`btn btn-info`}>
          Start
        </button>
      );
  };

  useEffect(() => {
    getCourseApi(courseId).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        setCourse(res.data);
      }
    });
  }, []);

  return (
    <section>
      <body className={`${styles.detailInformation}`}>
        <h1 className={styles.courseName}>Course: {course.name}</h1>
        <section className={`${styles.courseDetailBox}`}>
          <div className={`${styles.courseInteract}`}>
            <div className={styles.coursePart}>
              <img
                src={course && course.thumbnail}
                className={styles.courseThumnail}
              />
              <div className={`${styles.courseDescription}`}>
                <p className={styles.courseDesP}>
                  <b>Price</b>: {course.cost} VND
                </p>
                <p className={styles.courseDesP}>Description</p>
                <div className={styles.courseDesBox}>
                  <p>{course.description}</p>
                </div>
              </div>
            </div>
            <div className={styles.commentAndCart}>
              <div className={styles.courseOnlPeople}>
                <div className={styles.courseDetailRate}>
                  <p>Comments</p>
                </div>
                <br />
                <div className={styles.commentExample}>
                  <img src={User1Avatar}></img>
                  <div>
                    <b>Nguyễn Đức Bảo</b>: Cám ơn tác giả
                  </div>
                </div>
                <div className={styles.commentExample}>
                  <img src={User2Avatar}></img>
                  <div>
                    <b>Ánh Tuyết Nguyễn</b>: Khoá học rất chất lượng ạ!
                  </div>
                </div>
                <div className={styles.commentExample}>
                  <img src={User3Avatar}></img>
                  <div>
                    <b>Thanh Tuan</b>: Khoá học rất hay và bổ ích cho tôi
                  </div>
                </div>
                <div className={styles.commentBtnPart}>
                  <input
                    type="text"
                    name="binhluan"
                    placeholder="Comment ..."
                  ></input>
                  <button>Comment</button>
                </div>
              </div>
              <div className={`col-3 ${styles.courseImage}`}>
                <img src={AddToCartIcon} />
                {showRegister()}
              </div>
            </div>
          </div>
        </section>
      </body>
    </section>
  );
};

export default CourseDetail;
