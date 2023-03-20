import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTestResultAPI } from "../../apis/test";
import { toast } from "react-toastify";

function Test({ lessonId, visible, handleVisible }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const testId = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <React.Fragment>
      <div className={styles.blur}></div>
      <div className={styles.modal}>
        <label className={styles.formLabel}>Your Score: 100</label>
        <label className={styles.formLabel}>Description</label>
      </div>
      <div className={styles.submit}>
        <button
          type="button"
          className={styles.formSubmit}
          onClick={() => {
            getTestDetailApi();
            handleVisible();
          }}
        >
          OK
        </button>
        <button
          type="button"
          className={`${styles.formSubmit} ${styles.button_cancel}`}
          onClick={() => {
            handleVisible();
          }}
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
}

export default Test;
