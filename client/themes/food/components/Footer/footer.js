import React from "react";
import defaultClasses from "./footer.module.css";
import List from "./list";
import SocialIcons from "Components/SocialIcons";
import Logo from "Components/Logo";
import { mergeClasses } from "Helper/classify";

const data = [
  {
    text: "About Us",
    link: "",
  },
  {
    text: "Careers",
    link: "",
  },
  {
    text: "Why Chef",
    link: "",
  },
  {
    text: "Blog",
    link: "",
  },
  {
    text: "Contact Us",
    link: "",
  },

  {
    text: "Resources",
    link: "",
  },
  {
    text: "Help",
    link: "",
  },
  {
    text: "Services",
    link: "",
  },
  {
    text: "FAQ",
    link: "",
  },
  {
    text: "Partner with Us",
    link: "",
  },

  {
    text: "Site Map",
    link: "",
  },
  {
    text: "Security & Privacy",
    link: "",
  },
  {
    text: "Terms of Service",
    link: "",
  },
  {
    text: "Privacy Policy",
    link: "",
  },
];

const social = [
  { url: "https://www.facebook.com/" },
  { url: "https://www.linkedin.com/" },
  { url: "https://twitter.com/" },
  { url: "https://www.youtube.com/" },
  { url: "https://www.instagram.com/" },
];

const socialIcons = ["facebook", "linkedin", "twitter", "youtube", "instagram"];

const Footer = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <footer className={classes.root}>
      <div className={classes.curve} />
      <div className={classes.content}>
        <div className={classes.mainContainer}>
          <div className={classes.logoContainer}>
            <span className={classes.logo}>
              <Logo />
            </span>
          </div>

          <div className={classes.navs}>
            <div className={classes.navContainer}>
              <p className={classes.listTitle}>Company</p>
              <List data={data.slice(0, 5)} />
            </div>
            <div className={classes.navContainer}>
              <p className={classes.listTitle}>Support</p>
              <List data={data.slice(5, 10)} />
            </div>
            <div className={classes.navContainer}>
              <p className={`${classes.listTitle} ${classes.titlePolicy}`}>
                Policy
              </p>
              <List data={data.slice(10)} />
              <SocialIcons
                classes={{ root: classes.socialIcons }}
                icons={socialIcons}
                data={social}
              />
            </div>
          </div>
        </div>
        <div className={classes.copyContainer}>
          <small className={classes.copyRight}>
            {`${new Date().getFullYear()} Chef LLC. All Rights Reserved.`}
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
