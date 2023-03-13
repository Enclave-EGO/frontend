import { useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import Header from "../../components/Header";
import styles from "./Home.module.css";
import clsx from "clsx";

function Home() {
  useEffect(() => updatePageTitle(PageTitle.HOME), []);

  return (
    <div>
      <Header />
      <h1 className={clsx(styles.textAlignCenter, styles.textBold)}>
        HOME PAGE
      </h1>
    </div>
  );
}

export default Home;
