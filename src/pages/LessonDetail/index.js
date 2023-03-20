import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonApi } from "../../apis/lesson";
import { toast } from "react-toastify";
import LessonVideo from "./LessonVideo";
import CreateTestForm from "../../components/CreateTestForm";
import styles from "./LessonDetail.module.css";

const LessonDetail = () => {
  const { lessonId } = useParams();
  const [toggle, setToggle] = useState("description");
  const [lesson, setLesson] = useState();
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const getLesson = () => {
    getLessonApi(lessonId)
      .then((res) => {
        const { error, message, data } = res.data;
        if (error) toast.error(message);
        else setLesson(data);
      })
      .catch(() => toast.error("Get Lesson Failed"));
  };

  useEffect(() => {
    getLesson(lessonId);
  }, [lessonId]);

  return (
    <section>
      <div className={styles.course}>
        <div className={styles.courseVideoAndNotes}>
          <div className={styles.lessonTitle}>
            Lesson: {lesson && lesson.name}
          </div>
          <LessonVideo videoId={lesson && lesson.videoId} />
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
            <div
              className={
                toggle === "tests"
                  ? `${styles.tabItem} ${styles.active}`
                  : `${styles.tabItem}`
              }
              onClick={() => setToggle("tests")}
            >
              <h6>
                <button>
                  <span>Tests</span>
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
              <div className={styles.courseCreateNote}>
                <div className={styles.lessonDescription}>
                  {lesson && lesson.description}
                </div>
              </div>
            </div>
            <div
              className={
                toggle === "comments"
                  ? `${styles.tabContent} ${styles.active}`
                  : `${styles.tabContent}`
              }
            ></div>
            <div
              className={
                toggle === "tests"
                  ? `${styles.tabContent} ${styles.active}`
                  : `${styles.tabContent}`
              }
            >
              <button
                className={styles.btn_create}
                onClick={() => handleVisible()}
              >
                Create test
              </button>
              {visible ? (
                <CreateTestForm
                  lessonId={lessonId}
                  handleVisible={handleVisible}
                  visible={visible}
                />
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.courseFooter}></div>
    </section>
  );
};

export default LessonDetail;
