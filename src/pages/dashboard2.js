import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";
import { getProtectedData } from "../utils/services/getServices";
import constants from "../configs/constants";
import styles from "../styles/Dashboard.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import Button from "../common/components/form/Button";
import cookie from "js-cookie";
import axios from "axios";
import queryString from "query-string";
import SectionedContestants from "../common/components/contestants/SectionedContestants";
import { useQuery } from "react-query";

const NewMessage = () => {
  return (
    <div
      style={{
        marginTop: 48,
        backgroundImage:
          "radial-gradient(132.86% 9015.67% at 0.95% -15%, #9F8772 0%, #3A2110 100%)",
        borderRadius: 10,
        padding: "0px 40px",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 64,
      }}
      className={styles.container}
    >
      <div style={{ marginTop: 29 }}>
        <h3 style={{ color: "rgba(238, 219, 201, 1)", fontFamily: "cabin" }}>
          New Message
        </h3>
        <p
          className="cw"
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#fff",
            marginBottom: 8,
            margintop: 16,
          }}
        >
          10 Contestants could not qualify
        </p>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 700 }}>
          10 Contestants could not qualify for the next round (Stage 2) Please
          confirm so the next round can commennce
        </p>
      </div>
      <div>
        <img src="./images/new-message-image.svg" alt="hero image" />
      </div>
    </div>
  );
};

const Summaries = () => {
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        columnGap: 25,
      }}
      className={styles.container}
    >
      {[1, 2, 3].map((summary) => {
        return (
          <li
            style={{
              backgroundColor: "rgba(58, 33, 16, 1)",
              height: 180,
              borderRadius: 10,
            }}
            className={styles.summaryCard}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div>
                <h2
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: "400",
                    fontFamily: "overpass",
                    marginBottom: 10,
                  }}
                >
                  CONTESTANTS
                </h2>
                <h3
                  style={{
                    fontSize: 40,
                    fontWeight: "700",
                    color: "#fff",
                    fontFamily: "cabin",
                  }}
                >
                  23.1k
                </h3>
              </div>

              <div className={styles.cardimageWrapper}>
                <img src="./images/user-group.svg" alt="card image" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="./images/arrow-inc.svg" style={{ marginRight: 2 }} />
              <span
                style={{
                  color: "rgba(112, 255, 172, 1)",
                  marginRight: 10,
                  fontSize: 12,
                }}
              >
                3.46%
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 14 }}>
                Since last month
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const log = console.log;
export async function getServerSideProps({ req, res }) {
  try {
    const { token, refreshToken } = req.cookies;
    console.log(useQuery);
    const data = await getProtectedData("admin/users", { token, refreshToken });
    if (data.error) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: { contestants: data },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Dashboard({ contestants = [], error }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();
  const category = [
    { item: "Dashboard", img: "user", route: "dashboard" },
    { item: "Transactions", img: "menu", route: "all-transactions" },
    { item: "Contestants", img: "settings", route: "all-contestants" },
  ];

  const query = queryString.parse(router.asPath.split("?")[1]);
  console.log(query);

  return (
    <>
      <header
        style={{ padding: "16px 94px", display: "flex" }}
        className={styles.desktopHeader}
      >
        <div style={{ marginRight: 200 }}>
          <Link href="/contestants">
            <img src="./images/logo-big.png" style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <ul style={{ display: "flex" }}>
          {category.map((menuItem) => {
            return (
              <li
                onClick={() => router.push(menuItem.route)}
                style={{
                  marginRight: 75,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img
                  src={`./images/profile-${menuItem.img}.svg`}
                  style={{ marginRight: 17 }}
                />
                <span
                  style={{
                    color:
                      active === menuItem.item
                        ? constants.colors.primary1
                        : "rgba(159, 135, 114, 1)",
                    fontWeight: "600",
                  }}
                >
                  {menuItem.item}
                </span>
                {active === menuItem.item && (
                  <div
                    style={{
                      height: 5,
                      width: "100%",
                      backgroundColor: constants.colors.primary1,
                      borderRadius: 100,
                      position: "absolute",
                      bottom: -20,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </header>
      <main
        style={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          backgroundColor: "rgba(255, 253, 251, 1)",
        }}
      >
        <div style={{ paddingTop: 40 }}>
          {/* <Summaries />
          <NewMessage /> */}

          <SectionedContestants
            contestants={contestants.slice(0, 4)}
            section="LATEST CONTESTANTS"
            text="This Contestants just Registered"
          />
          <SectionedContestants
            contestants={contestants.slice(4, 8)}
            section="TOP CONTESTANTS"
            text="This Contestants are currently topping the list"
          />
        </div>
      </main>
    </>
  );
}

Dashboard.layout = "dashboard";
