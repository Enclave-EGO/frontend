import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { createQuestionApi, deleteQuestionApi } from "../../apis/question";
import { toast } from "react-toastify";
import styles from "./Question.module.css";
import DeleteModal from "../../modals/DeleteModal";

function Question({ question }) {
  const [listCorrect, setListCorrect] = useState([]);
  const [listAnswers, setListAnswers] = useState([...question.answers]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [values, setValues] = useState({
    content: "",
    isMultiChoice: false,
    score: 0
  });

  const handleChangeQuestion = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const getListCorrect = () => {
    const corrects = question.answers.map((answer) => answer.isCorrect);
    setListCorrect(corrects);
  };

  const handleChangeCorrect = () => {
    const newListCorrect = listAnswers.map((answer) =>
      document.getElementById(answer._id).checked ? true : false
    );
    setListCorrect(newListCorrect);
  };

  const handleChangeAnswer = (index) => (event) => {
    const newAnswer = { ...listAnswers[index], content: event.target.value };
    setListAnswers({ ...listAnswers, [index]: newAnswer });
  };

  const handleCancel = () => {
    setListAnswers([...question.answers]);
    getListCorrect();
  };

  const handleSave = () => {
    const answers = listAnswers
      .map((answer) => {
        if (document.getElementById(answer._id).checked) return answer._id;
      })
      .filter((item) => item !== undefined);

    const questions = { ...values, answers };

    createQuestionApi(questions)
      .then((data) => {
        if (data.error) toast.error(data.message);
        else toast.success("Create Success");
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getListCorrect();
  }, []);

  return (
    <div className={styles.question_form}>
      <div className={styles.question}>
        <input
          type="text"
          value={question.content}
          onChange={handleChangeQuestion("content")}
        />
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
        {question.answers.map((answer, index) => (
          <>
            <div className={styles.answer_form} key={answer._id}>
              <input
                type={question.isMultiChoice ? "checkbox" : "radio"}
                onChange={() => handleChangeCorrect()}
                defaultValue={answer._id}
                name={question._id}
                id={answer._id}
                checked={listCorrect[index]}
              />
              <input
                className={styles.text}
                type="text"
                placeholder="Enter new answer"
                defaultValue={answer.content}
                onChange={handleChangeAnswer(index)}
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
          <IoMdAddCircleOutline className={styles.icons} />
          <span>Add answer</span>
        </div>
        <div className={styles.formSubmit}>
          <button type="button" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button type="button" onClick={() => handleSave(event)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
