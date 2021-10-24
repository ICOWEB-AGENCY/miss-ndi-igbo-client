import React from "react";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";
import constants from "../configs/constants";
import styles from "../styles/Create-account.module.css";

export default function ContestInfo() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
        backgroundColor: "rgba(255, 253, 251, 1)",
        padding: 16,
      }}
    >
      <div>
        <div>
          <div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 42,
              }}
            >
              <img src="./images/successful.svg" />
            </div> */}

            <h1
              style={{ textAlign: "center", color: "rgba(58, 33, 16, 1)" }}
              className={styles.successTextNew}
            >
              Voting Update
            </h1>
            <div
              style={{
                textAlign: "center",
                marginTop: 20,
                color: "rgba(159, 135, 114, 1)",
                marginBottom: 60,
                // maxWidth: 600,
              }}
              className={styles.successContentNew}
            >
              <p>Thank you for participating in the contest.</p>
              <p>Stage 1 Voting has ended!</p>
              <p>Stage 2 commences tomorrow.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
