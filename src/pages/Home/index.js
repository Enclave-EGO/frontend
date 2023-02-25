import { useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import styles from "./Home.module.css";
import clsx from "clsx";

function Home() {
  useEffect(() => updatePageTitle(PageTitle.HOME), []);

  return (
    <h1 className={clsx(styles.textAlignCenter, styles.textBold)}>HOME PAGE</h1>
  );
}

export default Home;
