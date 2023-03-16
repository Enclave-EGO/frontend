import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTestDetailApi } from "../../apis/test";
import Question from "../../components/Question";
import styles from "./TestTeacher.module.css";

function TestTeacher() {
  let testId = "63f6ddd471f240f9034f8e31";
  const [testDetail, setTestDetail] = useState({
    _id: testId,
    content: "Test",
    timeLimit: 60,
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState([]);

  const getTestDetail = () => {
    getTestDetailApi(testId).then((data) => {
      if (data.error) {
        toast.error(data.message);
      } else {
        setTestDetail(data?.data);
      }
    });
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
