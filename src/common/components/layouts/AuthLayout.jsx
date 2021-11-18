import { useState } from "react";
import Head from "next/head";
import styles from "./Auth.module.css";
import HomeMenuCards from "../home/HomeMenuTag";
import PageHeader from "../headers/PageHeader";
import Link from "next/link";
import constants from "../../../configs/constants";
import { useRouter } from "next/router";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const category = [
    { item: "Dashboard", img: "user", route: "dashboard" },
    { item: "Transactions", img: "menu", route: "all-transactions" },
    { item: "Settings", img: "settings", route: "settings" },
  ];

  if (children.type.layout === "admin") {
    const [active, setActive] = useState(
      category.filter((item) => item.route === router.asPath.substr(1))[0].item
    );
    return (
      <>
        <header
          style={{ padding: "16px 94px", display: "flex" }}
          className={styles.desktopHeader}
        >
          <div style={{ marginRight: 200 }}>
            <Link href="/dashboard">
              <img src="./images/logo-big.png" style={{ cursor: "pointer" }} />
            </Link>
          </div>
          <ul style={{ display: "flex" }}>
            {category.map((menuItem) => {
              return (
                <li
                  onClick={() => {
                    router.push(menuItem.route);
                    setActive(menuItem.item);
                  }}
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
        {children}
      </>
    );
  }
  if (
    children.type.layout === "profile" ||
    children.type.layout === "dashboard"
  ) {
    return <>{children}</>;
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(255, 253, 251, 1)",
        overflow: "hidden",
      }}
      className={styles.layout}
    >
      <div className={styles.imageWrapper} style={{ height: "100vh" }}>
        <img
          src="./images/hero.png"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
      </div>

      <div className={styles.autPadding}>
        {/* <PageHeader 
   /> */}

        {children}
      </div>
    </div>
  );
}
