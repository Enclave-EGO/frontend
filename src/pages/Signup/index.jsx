import { useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import styles from "./Signup.module.css";

function Signup() {
  useEffect(() => updatePageTitle(PageTitle.SIGNUP), []);

  return <h1>SIGNUP PAGE</h1>;
}

export default Signup;
