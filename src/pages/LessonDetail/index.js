import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonApi } from "../../apis/lesson";
import LessonVideo from "./LessonVideo";
import styles from "./LessonDetail.module.css";

const LessonDetail = () => {
  const { lessonId } = useParams();
  const [toggle, setToggle] = useState("description");
  const [lesson, setLesson] = useState();

  useEffect(() => {
    getLessonApi(lessonId).then((data) => {
      setLesson(data.data);
    });
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
          </div>
        </div>
      </div>
      <div className={styles.courseFooter}></div>
    </section>
  );
};

export default LessonDetail;
