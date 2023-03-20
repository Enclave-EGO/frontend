import { useState } from "react";
import { FiTarget } from "react-icons/fi";
import { IoMdTimer } from "react-icons/io";
import { MdPublish } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteTestApi } from "../../apis/test";
import DeleteModal from "../../modals/DeleteModal";
import styles from "./Test.module.css";

function Test({ test, index }) {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div key={index} className={styles.listTest}>
      <div className={styles.test__right}>
        <h3 className="test__name">{test.description}</h3>
        <div className={styles.test__cost}>
          <IoMdTimer />
          <b>Time:</b> {test.timeLimit} minutes
        </div>
        <div className={styles.test__cost}>
          <FiTarget />
          <b>Score:</b> {test.score}
        </div>
        <div className={styles.test__cost}>
          <MdPublish />
          {console.log(test)}
          <b>Created At:</b> {test.createdAt.slice(0, 10)}{" "}
          {test.createdAt.slice(11, 19)}
        </div>
        <GrEdit
          className={styles.editIcon}
          onClick={() => {
            navigate(`/tests/update/${test._id}`);
          }}
        />
        <MdDelete
          className={styles.deleteIcon}
          onClick={() => setOpenDeleteModal(!openDeleteModal)}
        />
        {openDeleteModal && (
          <DeleteModal
            body="Are you sure to delete this test?"
            setOpenDeleteModal={setOpenDeleteModal}
            deleteApi={deleteTestApi}
            deleteItemId={test._id}
          />
        )}
      </div>
    </div>
  );
}

export default Test;
