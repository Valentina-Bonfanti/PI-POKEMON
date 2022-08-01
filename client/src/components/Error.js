import React from "react";
import { Link } from "react-router-dom";
import styles from '../css/Error.module.css';

export default function Error() {
    return(
        <div className={styles.container}>
            <p>UPS! SOMETHING WENT WRONG!</p>
            <img alt="error" src="https://i.gifer.com/XZ9.gif"/>
            <p>Page not found</p>
            <Link to={'/home'}>
            <button>HOME</button>
            </Link>
        </div>
    )
}