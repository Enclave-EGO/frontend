import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoPricetags } from "react-icons/io5";
import { HiOutlineFilm } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import { getCourseApi } from "../../apis/course";
import { getLessonsByCourseApi } from "../../apis/lesson";
import { getRegisterApi, registerCourseApi } from "../../apis/register";
import { User1Avatar, User2Avatar, User3Avatar } from "../../assets";
import Header from "../../components/Header";
import styles from "./CourseDetail.module.css";
import LessonVideo from "../../components/Lesson/LessonVideo";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [register, setRegister] = useState(false);
  const [toggle, setToggle] = useState("description");
  const [lessons, setLessons] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const goToCourseDetail = () => {};

  const handleRegister = () => {
    setRegister(!register);
  };

  const getRegister = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));

    getRegisterApi({ userId, courseId })
      .then((res) => {
        if (res.error) toast.error(res.message);
        else setRegister(Boolean(res.data));
      })
      .catch((error) => toast.error(error));
  };

  const getLessons = () => {
    getLessonsByCourseApi(courseId)
      .then((res) => {
        if (res.data) setLessons(res.data);
      })
      .catch((error) => error);
  };

  const registerNewCourse = (userId, courseId) => {
    if (userId) {
      registerCourseApi({ userId, courseId })
        .then((data) => {
          if (data.error) toast.error(data.message);
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
      setRegister(!register);
      // navigate("/");
    } else {
      toast.info("You must sign in before");
      navigate("/signin");
    }
  };

  const showRegister = () => {
    if (course) {
      return (
        <button
          className={styles.register}
          onClick={() => addToCart(course)}
          disabled={register}
          style={{ background: register ? "f9f8f8" : "#adc8e0" }}
        >
          {register ? "Registered" : "Register now"}
        </button>
      );
    } else
      return (
        <button onClick={goToCourseDetail} className={styles.register}>
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
    getRegister();
    getLessons();
  }, []);

  return (
    <section>
      <body className={`${styles.detailInformation}`}>
        <Header />
        <section className={`container ${styles.homeSlider}`}>
          <div className={styles.course_detail_container}>
            <div className={styles.course_detail}>
              <div className={styles.course_image}>
                <img
                  className={styles.itemImage}
                  src={course.thumbnail}
                  alt=""
                />
              </div>
              <div className={styles.course_info}>
                <h2 className={styles.course_name}>{course.name}</h2>
                <div className={styles.course_cost}>
                  <IoPricetags /> {course.cost} VND
                </div>
                <div className={styles.course_lessons}>
                  <HiOutlineFilm /> <b>{lessons.length}</b> lessons
                </div>
                {showRegister()}
              </div>
            </div>
            <div className={styles.course_comment}>
              <div className={styles.courseTabs}>
                <div
                  className={
                    toggle === "description"
                      ? `${styles.tabItem} ${styles.active}`
                      : `${styles.tabItem}`
                  }
                  onClick={() => setToggle("description")}
                >
                  <h6>
                    <button>
                      <span>Description</span>
                    </button>
                  </h6>
                </div>
                <div
                  className={
                    toggle === "comments"
                      ? `${styles.tabItem} ${styles.active}`
                      : `${styles.tabItem}`
                  }
                  onClick={() => setToggle("comments")}
                >
                  <h6>
                    <button>
                      <span>Comments</span>
                    </button>
                  </h6>
                </div>
              </div>

              <div></div>

              <div className="tabContents">
                <div
                  className={
                    toggle === "description"
                      ? `${styles.tabContent} ${styles.active}`
                      : `${styles.tabContent}`
                  }
                >
                  <div className={styles.course_decription}>
                    <p className={styles.description_header}>{course.name}</p>
                    <p className={styles.description}>{course.description}</p>
                    <div className={styles.row}>
                      {register &&
                        lessons &&
                        lessons.map((lesson, index) => (
                          <div key={index} className={styles.listLesson}>
                            <div className={styles.lesson__left}>
                              <LessonVideo videoId={lesson.videoId} />
                            </div>
                            <div className={styles.lesson__right}>
                              <h3
                                className="lesson__name"
                                onClick={() =>
                                  navigate(`/lessons/${lesson._id}`)
                                }
                              >
                                {lesson.name}
                              </h3>
                              <div className={styles.lesson__cost}>
                                <BsYoutube /> {lesson.videoId}
                              </div>
                              <p className={styles.lesson__description}>
                                <MdDescription />
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div
                  className={
                    toggle === "comments"
                      ? `${styles.tabContent} ${styles.active}`
                      : `${styles.tabContent}`
                  }
                >
                  <div className={styles.commentExample}>
                    <img src={User1Avatar}></img>
                    <div className={styles.comment_item}>
                      <p className={styles.name}>Nguyen Duc Bao</p>
                      <p className={styles.content}>
                        Khoa hoc rat hay, rat tuyet voi, em hoc hoi duoc nhieu
                        thu
                      </p>
                    </div>
                  </div>
                  <div className={styles.commentExample}>
                    <img src={User2Avatar}></img>
                    <div className={styles.comment_item}>
                      <p className={styles.name}>Nguyen Thi Anh Tuyet</p>
                      <p className={styles.content}>
                        Khoa hoc rat hay, rat tuyet voi, em hoc hoi duoc nhieu
                        thu
                      </p>
                    </div>
                  </div>
                  <div className={styles.commentExample}>
                    <img src={User3Avatar}></img>
                    <div className={styles.comment_item}>
                      <p className={styles.name}>Huynh Duc Thanh Tuan</p>
                      <p className={styles.content}>
                        Khoa hoc rat hay, rat tuyet voi, em hoc hoi duoc nhieu
                        thu
                      </p>
                    </div>
                  </div>
                  <div className={styles.commentBtnPart}>
                    <img src={User3Avatar}></img>
                    <input
                      type="text"
                      name="comment"
                      placeholder="Enter your comment"
                    ></input>
                    <button>Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </section>
  );
};

export default CourseDetail;
