import { useRef, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { getTestDetailApi } from "../../apis/test";
import { submitTestApi } from "../../apis/testResult";
import styles from "./Test.module.css";

function Test() {
  const startDate = useRef(Date.now());

  const { testId } = useParams();
  const [testDetail, setTestDetail] = useState({
    _id: testId,
    content: "Test",
    timeLimit: 60,
    questions: []
  });

  const [results, setResults] = useState({});
  const [checked, setChecked] = useState({});

  const getTestDetail = () => {
    getTestDetailApi(testId).then((res) => {
      if (res.error) {
        toast.error(data.message);
      } else {
        const test = res?.data;
        setTestDetail(test);

        const initResults = test.questions.map((question) => ({
          questionId: question._id,
          answers: []
        }));

        setChecked({ ...Array(test.questions.length).fill([]) });
        setResults({ ...initResults });
      }
    });
  };

  const handleChecked = (id, isMultiChoice, index) => {
    let newChecked;

    if (isMultiChoice) {
      const isChecked = checked[index].includes(id);

      newChecked = isChecked
        ? checked[index].filter((item) => item !== id)
        : [...checked[index], id];
    } else {
      newChecked = [id];
    }

    const resultChange = { ...results[index], answers: newChecked };
    setResults({
      ...results,
      [index]: resultChange
    });

    setChecked({ ...checked, [index]: newChecked });
  };

  const handleSubmitTest = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const newTestResult = {
      testId: testId,
      userId: userId,
      results: Object.values(results)
    };

    submitTestApi(newTestResult)
      .then((data) => {
        if (data.error) toast.error(data.message);
        else toast.success("Submit test success");
      })
      .catch(() => toast.error("Submit test failed"));
  };

  const defaultRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Show test result
    } else
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
  };

  useEffect(() => {
    getTestDetail();
  }, []);

  return (
    <div className={styles.home}>
      <section className={`container ${styles.homeSlider}`}>
        <h2>Test</h2>
        <div className={styles.countdown}>
          <Countdown
            renderer={defaultRenderer}
            date={startDate.current + testDetail.timeLimit * 60 * 1000}
            key={startDate.current + testDetail.timeLimit * 60 * 1000}
          />
        </div>
        <div className={styles.row}>
          {testDetail &&
            testDetail.questions?.map((question, index) => (
              <div className={styles.question_form}>
                <div className={styles.question}>
                  <span className={styles.content}>
                    Question {index}. {question.content}
                  </span>
                  <span className={styles.score}>Score: {question.score}</span>
                </div>
                <div className={styles.answers}>
                  {question.answers.map((answer) => (
                    <div className={styles.answer_form} key={answer._id}>
                      <input
                        type={question.isMultiChoice ? "checkbox" : "radio"}
                        onChange={() =>
                          handleChecked(
                            answer._id,
                            question.isMultiChoice,
                            index
                          )
                        }
                        checked={checked[index].includes(answer._id)}
                        name={question._id}
                        id={answer._id}
                      />
                      <span>{answer.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div>
          <button
            onClick={() => handleSubmitTest()}
            className={styles.btnSubmit}
          >
            Submit test
          </button>
        </div>
      </section>
    </div>
  );
}

export default Test;