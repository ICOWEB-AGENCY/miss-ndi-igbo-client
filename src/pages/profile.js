import React, { useState, useEffect } from "react";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";
import ProfileHeader from "../common/components/profile/ProfileHeader";
import Button from "../common/components/form/Button";
import { getProtectedData } from "../utils/services/getServices";
import { useRouter } from "next/router";
import Main from "../common/components/profile/Main";
import Details from "../common/components/profile/Details";
import Settings from "../common/components/profile/Settings";
import Votes from "../common/components/profile/Votes";
import constants from "../configs/constants";
import styles from "../styles/Profile.module.css";

const log = console.log;
export async function getServerSideProps({ req }) {
  try {
    const { token, refreshToken } = req.cookies;
    const data = await getProtectedData("users/details", {
      token,
      refreshToken,
    });
    console.log(data);
    if (data.error) {
      return {
        props: { error: data },
      };
    }
    return {
      props: { theUser: data },
    };
  } catch (error) {
    console.log(error);
  }
}
export default function Profile({ theUser = {} }) {
  const [user, setUser] = useState(theUser);
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("Profile");

  const category = [
    { item: "Profile", img: "user" },
    { item: "Votes", img: "menu" },
    { item: "Account Settings", img: "settings" },
  ];
  return (
    <main>
      <header style={{ padding: "16px 94px" }} className={styles.desktopHeader}>
        <div style={{ marginRight: 450 }}>
          <Link href="/contestants">
            <img src="./images/logo-big.png" style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <ul style={{ display: "flex" }}>
          {category.map((menuItem) => {
            return (
              <li
                onClick={() => setActive(menuItem.item)}
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

      <header className={styles.mobileHeader}>
        {showMenu && (
          <nav
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              zIndex: 5,
              right: 0,
              top: 60,
              padding: 8,
              borderRadius: "10px 0px 0px 10px",
              boxShadow: "5px 5px 7px #f2f3f2",
            }}
          >
            <ul>
              {category.map((menuItem) => {
                return (
                  <li
                    onClick={() => {
                      setActive(menuItem.item);
                      setShowMenu(false);
                    }}
                    style={{
                      marginRight: 75,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      marginBottom: 10,
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
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        <Link href="/contestants">
          <img src="./images/logo.png" style={{ cursor: "pointer" }} />
        </Link>
        <ul style={{ display: "flex" }}>
          <li
            onClick={() => {
              setActive("mobile-profile");
              setShowMenu(false);
            }}
            style={{
              marginRight: 10,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={`./images/profile-user.svg`}
              style={{ marginRight: 17 }}
            />
          </li>

          <li
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            style={{
              marginRight: 10,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img src={`./images/profile-menu.svg`} style={{ marginRight: 0 }} />
          </li>
        </ul>
      </header>
      <div style={{ backgroundColor: "#E5E5E5" }} className={styles.grid}>
        <div className={styles.profileWrapper}>
          <Main user={user} setUser={setUser} />
        </div>

        {active === "mobile-profile" && (
          <div className={styles.mobileProfile}>
            <Main user={user} setUser={setUser} />
          </div>
        )}

        {active === "Profile" && <Details user={user} />}

        {active === "Account Settings" && (
          <Settings user={user} setActive={setActive} />
        )}
        {active === "Votes" && <Votes user={user} />}
      </div>
    </main>
  );
}
Profile.layout = "profile";
