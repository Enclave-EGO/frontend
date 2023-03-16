import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTestDetailApi, updateTestApi } from "../../apis/test";
import styles from "./UpdateTest.module.css";

const UpdateTest = () => {
  const { testId } = useParams();
  const initialValues = {
    timeLimit: 0,
    description: ""
  };
  const [values, setValues] = useState(initialValues);

  const getOldTestData = () => {
    getTestDetailApi(testId).then((data) => {
      setValues(data.data);
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    updateTestApi(testId, values)
      .then((data) => {
        if (data.error) {
          toast.error(data.message);
        } else {
          toast.success("Update Test Success");
        }
      })
      .catch((error) => toast.error("Update Test Fail"));
  };

  const renderUpdateTestForm = () => {
    return (
      <form className={styles.container} id="form-1">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Time limit (Minutes)</p>
            </div>
            <input
              className={styles.formControl}
              type="number"
              value={values.timeLimit}
              onChange={handleChange("timeLimit")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
            </div>
            <textarea
              className={styles.formControl}
              value={values.description}
              onChange={handleChange("description")}
            />
          </div>
          <button
            type="button"
            className={`${styles.formSubmit}`}
            onClick={(e) => submitForm(e)}
          >
            Update
          </button>
        </div>
      </form>
    );
  };

  useEffect(() => {
    getOldTestData();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="bold">Update Test</h2>
      <div className="mt-4 ">{renderUpdateTestForm()}</div>
    </div>
  );
};

export default UpdateTest;
