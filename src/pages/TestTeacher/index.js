import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTestDetailApi } from "../../apis/test";
import { toast } from "react-toastify";
import Question from "../../components/Question";
import styles from "./TestTeacher.module.css";

function TestTeacher() {
  const { testId } = useParams();

  const [testDetail, setTestDetail] = useState({
    _id: testId,
    content: "Test",
    timeLimit: 60,
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState([]);

  const getTestDetail = () => {
    getTestDetailApi(testId)
      .then((res) => {
        if (res.error) toast.error(res.message);
        else setTestDetail(res?.data);
      })
      .catch(() => toast.error("Get Test Failed"));
  };

  const handleCreateQuestion = () => {
    const question = {
      content: "Question",
      score: 100,
      isMultiChoice: false,
      testId: testId,
      answers: []
    };

    setNewQuestion([...newQuestion, question]);
  };

  useEffect(() => {
    getTestDetail();
  }, []);

  return (
    <div className={styles.home}>
      <section className={`container ${styles.homeSlider}`}>
        <h2>Test</h2>
        <div className={styles.row}>
          <button
            onClick={() => handleCreateQuestion()}
            className={styles.btnCreate}
          >
            New Question
          </button>
          {testDetail &&
            testDetail.questions?.map((question) => (
              <Question
                question={question}
                key={question._id}
                testId={testId}
              />
            ))}
          {newQuestion &&
            newQuestion.map((question, index) => (
              <Question question={question} testId={testId} key={index} />
            ))}
        </div>
      </section>
    </div>
  );
}

export default TestTeacher;
