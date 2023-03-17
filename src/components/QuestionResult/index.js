import { useEffect, useReducer, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import { deleteQuestionApi } from "../../apis/question";
import { toast } from "react-toastify";
import { questionReducer } from "../../reducers";
import DeleteModal from "../../modals/DeleteModal";
import styles from "./QuestionResult.module.css";

function QuestionResult({ question, testId }) {
  const [listCorrect, setListCorrect] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  let initalValue = question._id
    ? { ...question, testId }
    : {
        content: "Question",
        isMultiChoice: false,
        score: 100,
        testId: testId,
        answers: []
      };
  let [values, dispatch] = useReducer(questionReducer, initalValue);

  const getListCorrect = () => {
    const corrects = question.answers.map((answer) => answer.isCorrect);
    setListCorrect(corrects);
  };

  const handleChangeCorrect = () => {
    const newListCorrect = values.answers.map((answer, index) => {
      const id = answer._id ? answer._id : index;
      return document.getElementById(id).checked ? true : false;
    });
    setListCorrect(newListCorrect);
  };

  useEffect(() => {
    getListCorrect();
  }, []);

  return (
    <div className={styles.question_form}>
      <div className={styles.question}>
        <input
          type="text"
          value={values.content}
          onChange={(event) => dispatch({ type: "content", event: event })}
        />
        <div className={styles.formScore}>
          <span>Score:</span>
          <input
            type="text"
            value={values.score}
            onChange={(event) => dispatch({ type: "score", event: event })}
          />
        </div>
      </div>
      <div className={styles.answers}>
        {values.answers.map((answer, index) => (
          <>
            <div className={styles.answer_form} key={answer._id}>
              <input
                type={values.isMultiChoice ? "checkbox" : "radio"}
                onChange={() => handleChangeCorrect()}
                defaultValue={answer._id}
                name={question._id}
                id={answer._id ? answer._id : index}
                checked={listCorrect[index]}
              />
              <input
                className={styles.text}
                type="text"
                placeholder="Enter new answer"
                value={values.answers[index]?.content}
                onChange={(event) =>
                  dispatch({
                    type: "content-answer",
                    event: event,
                    index: index
                  })
                }
              />
              {listCorrect[index] && (
                <BsCheck2 className={styles.answer_correct_icon} />
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default QuestionResult;
