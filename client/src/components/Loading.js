import React from "react";
import styles from '../css/Loading.module.css'


export function Loading() {
    return(
        <div className={styles.div}>
            <img className={styles.loader} alt="loading" src="https://i.gifer.com/5SvD.gif" />
            {/* <p className={styles.text}>Loading...</p> */}
           
        </div>
    )
}