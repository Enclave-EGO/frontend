import { useState, useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { signInAPI } from "../../apis/user";
import { toast } from "react-toastify";
import { AppLogo } from "../../assets";
import styles from "./Signin.module.css";

function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: ""
  });
  const { username, password, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();

    signInAPI({ username, password }).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("signin_token", JSON.stringify(data.data.token));
        localStorage.setItem("userId", JSON.stringify(data.data._id));
        toast.success("Sign In Success");
        navigate("/");
      }
    });
  };

  useEffect(() => updatePageTitle(PageTitle.SIGNIN), []);

  const renderSignInForm = () => {
    return (
      <form className={styles.form} id="form-1">
        <img src={AppLogo} className={styles.logo}></img>
        <h2 className={styles.headingSignIn}>Sign In</h2>
        <p className={styles.desc}>Signin to start learning today!</p>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Username</label>
          <input
            className={styles.formControl}
            type="text"
            placeholder="Enter username"
            onChange={handleChange("username")}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            className={styles.formControl}
            type="password"
            placeholder="Enter password"
            onChange={handleChange("password")}
          />
        </div>

        <div className={styles.formRemind}>
          <div className={styles.formRemember}>
            <Link to="/signup">
              <span
                className={styles.formRememberText}
                style={{ fontSize: "14px" }}
              >
                Sign Up
              </span>
            </Link>
          </div>

          <Link to={"/forgot-password"} className={styles.formForgotPassword}>
            Forgot Password?
          </Link>
        </div>

        <button
          type="button"
          className={`${styles.formSubmit}`}
          onClick={submitForm}
        >
          Sign in
        </button>
      </form>
    );
  };

  return <div className={styles.main}>{renderSignInForm()}</div>;
}

export default Signin;
