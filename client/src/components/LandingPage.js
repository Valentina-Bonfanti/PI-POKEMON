import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../css/LandingPage.module.css'

export default function LandingPage() {
    return(
        <div className={styles.component}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>POKEAPP</h1>
            </div>
            <div>
              <Link to ='/home'>
                <button className={styles.landing_button}>HOME</button>
              </Link>
            </div>
        </div>
    )
}