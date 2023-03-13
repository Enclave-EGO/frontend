import { useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import styles from "./NotFound.module.css";

function NotFound() {
  useEffect(() => updatePageTitle(PageTitle.NOTFOUND), []);

  return <h1>NOT FOUND PAGE</h1>;
}

export default NotFound;
