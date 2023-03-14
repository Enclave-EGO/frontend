import { useEffect, useState } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import styles from "./TestTeacher.module.css";
import { getTestDetailApi } from "../../apis/test";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

function TestTeacher() {
  const [courseByArrival, setCourseByArrival] = useState([]);
  const [testDetail, setTestDetail] = useState({});

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

  useEffect(() => {
    getTestDetail();
  }, []);

  return (
    <div className={styles.home}>
      <section className={`container ${styles.homeSlider}`}>
        <h2>New courses</h2>
        <div className={styles.row}>
          {testDetail.questions.map((question) => (
            <div className={styles.question_form}>
              <div className={styles.question}>
                <input type="text" value={question.content} />
                <RiDeleteBin6Line className={styles.icons} />
              </div>
              <div className={styles.answers}>
                {question.answers.map((answer) => (
                  <>
                    <div className={styles.answer_form}>
                      <input type="radio" value="cau1" name="cau1" />
                      <input
                        type="text"
                        className={styles.text}
                        value="Cau tra loi 1"
                      />
                    </div>
                    <div className={styles.answer_form}>
                      <input type="radio" value="cau2" name="cau2" />
                      <input
                        type="text"
                        className={styles.text}
                        value="Cau tra loi 2"
                      />
                      <BsCheck2 className={styles.answer_correct_icon} />
                    </div>
                    <div className={styles.answer_form}>
                      <input type="radio" value="cau3" name="cau3" />
                      <input
                        className={styles.text}
                        type="text"
                        value="Cau tra loi 3"
                      />
                    </div>
                  </>
                ))}
              </div>
              <div className={styles.formAction}>
                <div className={styles.formResult}>
                  <FiCheckCircle className={styles.icons} />
                  <span>Result</span>
                </div>
                <div className={styles.formSubmit}>
                  <button type="button">Cancel</button>
                  <button type="button">Save</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TestTeacher;
