import { useEffect, useState } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import styles from "./TestTeacher.module.css";
import { getTestDetailApi } from "../../apis/test";
import { toast } from "react-toastify";
import Question from "../../components/Question";

function TestTeacher() {
  const [courseByArrival, setCourseByArrival] = useState([]);
  const [testDetail, setTestDetail] = useState({});
  const [status, setStatus] = useState(false);

  const getTestDetail = () => {
    getTestDetailApi("63f6ddd471f240f9034f8e31").then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setTestDetail(data.data);
      }
    });
  };

  const changeStatus = () => {
    setStatus(!status);
  };

  useEffect(() => {
    getTestDetail();
  }, []);

  return (
    <div className={styles.home}>
      <section className={`container ${styles.homeSlider}`}>
        <h2>New courses</h2>
        <div className={styles.row}>
          {testDetail &&
            testDetail.questions?.map((question) => (
              <Question question={question} key={question._id} />
            ))}
        </div>
      </section>
    </div>
  );
}

export default TestTeacher;
