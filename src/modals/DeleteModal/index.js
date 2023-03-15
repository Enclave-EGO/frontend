import { toast } from "react-toastify";
import "./DeleteModal.module.css";

function DeleteModal({ body = "Body", setOpenDeleteModal }) {
  const handleClickCancel = () => {
    setOpenDeleteModal(false);
    document.body.style.overflow = "visible";
  };

  const handleClickOK = () => {
    setOpenDeleteModal(false);
    document.body.style.overflow = "visible";
    toast.success("Delete Success");
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

export default DeleteModal;
