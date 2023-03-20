import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import {
  createQuestionApi,
  deleteQuestionApi,
  updateQuesionApi
} from "../../apis/question";
import { questionReducer } from "../../reducers";
import styles from "./Question.module.css";
import DeleteModal from "../../modals/DeleteModal";

function Question({ question, testId }) {
  const [listCorrect, setListCorrect] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const initialValue = question._id
    ? { ...question, testId }
    : {
        content: "Question",
        isMultiChoice: false,
        score: 100,
        testId: testId,
        answers: []
      };

  const [values, dispatch] = useReducer(questionReducer, initialValue);

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

  const handleCancel = () => {
    dispatch({
      type: "cancel",
      initialValue: initialValue
    });
    getListCorrect();
  };

  const handleSave = () => {
    const newAnswers = values.answers.map((answer, index) => ({
      content: answer.content,
      isCorrect: listCorrect[index],
      answerId: answer._id
    }));

    const questions = {
      ...values,
      answers: newAnswers
    };
    if (question._id) {
      const _id = question._id;

      updateQuesionApi(questions, _id)
        .then((res) => {
          if (res.error) toast.error(res.message);
          else {
            toast.success("Update question success");
            question = values;
          }
        })
        .catch(() => toast.error("Update question failed"));
    } else {
      createQuestionApi(questions)
        .then((res) => {
          if (res.error) toast.error(res.message);
          else {
            toast.success("Create question success");
            question = { ...values, _id: res.data._id };
          }
        })
        .catch(() => toast.error("Create question failed"));
    }
  };

  const handleClick = (action) => {
    dispatch({ type: action });
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
        <RiDeleteBin6Line
          className={styles.icons}
          onClick={() => setOpenDeleteModal(!openDeleteModal)}
        />
        {openDeleteModal && (
          <DeleteModal
            body="Are you sure to delete this question?"
            setOpenDeleteModal={setOpenDeleteModal}
            deleteApi={deleteQuestionApi}
            deleteItemId={question._id}
          />
        )}
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
      <div className={styles.formAction}>
        <div className={styles.formResult}>
          <IoMdAddCircleOutline
            className={styles.icons}
            onClick={() => handleClick("add-answer")}
          />
          <span>Add answer</span>
        </div>
        <div className={styles.multiChoice}>
          <input
            type="checkbox"
            onChange={() => dispatch({ type: "isMultiChoice" })}
            name={question._id}
            id={question._id}
            checked={values.isMultiChoice}
          />
          <span>Multichoice</span>
        </div>
        <div className={styles.formSubmit}>
          <button type="button" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button type="button" onClick={() => handleSave()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
