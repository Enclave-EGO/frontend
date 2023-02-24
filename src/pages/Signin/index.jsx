import { useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import styles from "./Signin.module.css";

function Signin() {
  useEffect(() => updatePageTitle(PageTitle.SIGNIN), []);

  return <h1>SIGNIN PAGE</h1>;
}

export default Signin;
