import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../auth/index";
import { DEFAULT_USER_AVATAR } from "../../constants";
import ProfileModal from "../../modals/ProfileModal";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";

const Header = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleClickAvatarImage = () => {
    document.body.style.overflow = openProfileModal ? "visible" : "hidden";
    setOpenProfileModal(!openProfileModal);
  };

  const renderList = () => {
    if (isAuth()) {
      return (
        <div className={`${styles.headerRightFrame} d-flex`}>
          <div className={`${styles.headerButton} ml-4`}>
            <div onClick={handleClickAvatarImage}>
              <img
                src={DEFAULT_USER_AVATAR}
                alt=""
                className={styles.avatarImage}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.headerButton}>
          <Link to="/signup">
            <button className={styles.button}>Sign Up</button>
          </Link>
          <Link to="/signin">
            <button className={styles.button}>Sign In</button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      {openProfileModal && (
        <ProfileModal setOpenProfileModal={setOpenProfileModal} />
      )}

      <header className={`container ${styles.header}`}>
        <Link to="/">
          <div className={styles.headerLogo}>
            <img alt="" src={logo}></img>
          </div>
        </Link>
        {renderList()}
      </header>
    </div>
  );
};

export default Header;
