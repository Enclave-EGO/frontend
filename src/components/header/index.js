import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../Auth/index";
import ProfileModal from "../../modals/ProfileModal";
import { defaultAvatarUrl } from "../../constants";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import cartIcon from "../../assets/icons/shopping-cart.png";

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
                src={defaultAvatarUrl}
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
            <button className="btn btn-secondary">Sign Up</button>
          </Link>
          <Link to="/signin">
            <button className="btn btn-secondary ml-4 mr-4">Sign In</button>
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
