import React from 'react'
import styles from './Header.module.css'

export default function PageHeader({title="Create Account",text="Create an account to participate in this pargent"}) {
    return (
        <header style={{marginBottom:30}}>
        <h1 style={{marginBottom:16,fontWeight:"700"}}
        className={styles.h1}
        >
        {title}
        </h1>
        <p style={{fontSize:14}}>
       {text}
        </p>
      </header>
    )
}
