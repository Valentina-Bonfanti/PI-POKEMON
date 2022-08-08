import React from "react";
import mail from '../img/gmail-logo.png';
import github from '../img/github-logo.png';
import linkedin from '../img/linkedin.png';
import styles from '../css/Footer.module.css';

export default function Footer() {
  return(
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <a href="mailto:bonfantivalentina30@gmail.com">
            <img src={mail} alt="correo" />
          </a>
        </li>
        <li>
          <a href="https://github.com/ValentinaBonfanti">
            <img src={github} alt="github" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/valentina-bonfanti-1a7048213/">
            <img src={linkedin} alt="linkedin" />
          </a>
        </li>
      </ul>
    </div>
  )
}