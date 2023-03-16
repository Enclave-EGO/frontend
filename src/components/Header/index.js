import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../Auth/index";
import ProfileModal from "../../modals/ProfileModal";
import { DEFAULT_USER_AVATAR } from "../../constants";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const role = JSON.parse(localStorage.getItem("role"));
  const navigate = useNavigate();
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
            {role === 0 && (
              <button
                className={`${styles.manageButton}`}
                onClick={() => {
                  navigate(`/manage/courses`);
                }}
              >
                Manage Courses
              </button>
            )}
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
