import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import { refreshPage } from "../../helpers";
import "./TestResultModal.module.css";

function TestResultModal({
  body = "Body",
  setOpenTestResultModal,
  lessonId,
  deleteItemId
}) {
  const navigate = useNavigate();
  const handleClickCancel = () => {
    setOpenTestResultModal(false);
    document.body.style.overflow = "visible";
    navigate(`lessons/${lessonId}`);
  };

  const handleClickOK = () => {
    deleteApi(deleteItemId).then((data) => {
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success("Delete Success");
        setOpenTestResultModal(false);
        document.body.style.overflow = "visible";
        refreshPage();
      }
    });
  };

  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button onClick={() => handleClickCancel()}>X</button>
      </div>
      <div className="body">
        <p>{body}</p>
      </div>
      <div className="footer">
        <button onClick={() => handleClickCancel()} id="cancelBtn">
          Cancel
        </button>
        <button onClick={() => handleClickOK()}>OK</button>
      </div>
    </div>
  );
}

export default TestResultModal;
