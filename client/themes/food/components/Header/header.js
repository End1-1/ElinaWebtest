import React, { useState } from "react";
import classes from "./header.module.css";
import Icon from "Components/Icon";
import Search from "Components/Search";
import SearchTrigger from "Components/SearchBar/searchTrigger";
import LanguageSelect from "Components/LanguageSelect";
import AuthBar from "Components/AuthBar";
import Logo from "Components/Logo";
import useWindowSize from "Hooks/useWindowSize";
import Minicart from "Components/Minicart";

const Header = (props) => {
  const { width } = useWindowSize();
  const [isAuthBarOpen, setIsAuthBarOpen] = useState(false);

  return (
    <header className={classes.root}>
      <div className={classes.content}>
        <div className={classes.container1}>
          <Logo />
        </div>

        <div className={classes.container2}>
          <Icon name="menu" size="56px" />
          {width > 992 ? <Search followTrigger={false} /> : <SearchTrigger />}
        </div>

        <div className={classes.container3}>
          <div className={classes.LanguageSelectContainer}>
            {width > 992 ? <LanguageSelect /> : null}
          </div>
          <div className={classes.iconContainer}>
            <Minicart />
            <span className={classes.iconUserBox}>
              <Icon
                name="user"
                size={width > 992 ? "36px" : "40px"}
                onClick={() => setIsAuthBarOpen((prevState) => !prevState)}
              />
            </span>
          </div>
          <div className={classes.authBarBox}>
            {isAuthBarOpen ? (
              <AuthBar onItemClick={() => setIsAuthBarOpen(false)} />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
