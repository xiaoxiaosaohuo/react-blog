import React from 'react'
import { Spin } from 'antd';
import styles from './style.css'
export const Loading=()=>(
        <div className={styles.container}>
            <Spin size="large"/>
        </div>
);
