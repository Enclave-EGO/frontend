import { useParams } from "react-router-dom";
import { getLessonApi } from "../../apis/lesson";
import React, { useEffect, useState } from "react";
import CreateTestForm from "../../components/CreateTestForm";
import LessonVideo from "./LessonVideo";
import styles from "./LessonDetail.module.css";
import { getTestsByLessonApi } from "../../apis/test";
import Test from "../../components/Test";
import Header from "../../components/Header";

const LessonDetail = () => {
  const role = JSON.parse(localStorage.getItem("role"));
  const { lessonId } = useParams();
  const [toggle, setToggle] = useState("description");
  const [lesson, setLesson] = useState();
  const [tests, setTests] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getLessonApi(lessonId).then((res) => {
      setLesson(res.data);
    });

    getTestsByLessonApi(lessonId).then((res) => {
      setTests(res.data.tests);
    });
  }, [lessonId]);

  return (
    <div>
      <Header />
      <section>
        <div className={styles.course}>
          <div className={styles.lessonTitle}>
            Lesson: {lesson && lesson.name}
          </div>
          <div className={styles.courseVideoAndNotes}>
            <div className={styles.container}>
              <div className={styles.infoLesson}>
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
            <div className={styles.testLesson}>
              <div className={styles.test}>
                <h2>Tests</h2>
              </div>
              <div className={styles.row}>
                {tests &&
                  tests.map((test, index) => (
                    <Test key={index} test={test} index={index} />
                  ))}
              </div>
              {role === 0 && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.courseFooter}></div>
      </section>
    </div>
  );
};

export default LessonDetail;
