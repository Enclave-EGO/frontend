import { useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import styles from "./Home.module.css";

function Home() {
  useEffect(() => updatePageTitle(PageTitle.HOME), []);

  return <h1>HOME PAGE</h1>;
}

export default Home;
