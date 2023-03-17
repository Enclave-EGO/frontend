import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTestDetailApi } from "../../apis/test";
import { toast } from "react-toastify";
import QuestionResult from "../../components/QuestionResult";
import styles from "./TestResult.module.css";

function TestResult() {
  const { testId } = useParams();

  const [testDetail, setTestDetail] = useState({
    _id: testId,
    content: "Test",
    timeLimit: 60,
    questions: []
  });

  const getTestDetail = () => {
    getTestDetailApi(testId).then((data) => {
      if (data.error) {
        toast.error(data.message);
      } else {
        setTestDetail(data?.data);
      }
    });
  };

  useEffect(() => {
    getTestDetail();
  }, []);

  return (
    <div className={styles.home}>
      <section className={`container ${styles.homeSlider}`}>
        <h2>Test Result</h2>
        <div className={styles.formScore}>
          <span>Test Score:</span>
          {/* <b>{test.testScore}</b> */}
        </div>
        <div className={styles.row}>
          {testDetail &&
            testDetail.questions?.map((question) => (
              <QuestionResult
                question={question}
                key={question._id}
                testId={testId}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default TestResult;
