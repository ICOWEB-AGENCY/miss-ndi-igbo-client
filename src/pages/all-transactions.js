import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";
import { getData } from "../utils/services/getServices";
import constants from "../configs/constants";
import styles from "../styles/All-transactions.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import Button from "../common/components/form/Button";
import cookie from "js-cookie";
import axios from "axios";
import queryString from "query-string";
import { getDateAndTime } from "../utils/dateAndTime/getDate";

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

const log = console.log;
export async function getServerSideProps({ req }) {
  try {
    const { token, refreshToken } = req.cookies;
    const data = await getData("transactions");

    if (data.error) {
      return {
        props: { error: data },
      };
    }
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Dashboard({ data = {}, error }) {
  console.log(data);
  const [transactions, setTransactions] = useState(data.data);
  const [allTransactions, setAllTransactions] = useState(data.data);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [top, setTop] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [bottom, setBottom] = useState(4);
  const router = useRouter();

  const [votedModalOpen, setVotedModalOpen] = useState(false);

  const query = queryString.parse(router.asPath.split("?")[1]);
  console.log(query);

  useEffect(() => {
    setTransactions(
      !searchTerm
        ? transactions
        : allTransactions.filter((transaction) =>
            transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
  }, [searchTerm]);

  return (
    <>
      <header
        style={{
          backgroundColor: "rgba(238, 219, 201, 1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className={styles.header}
      >
        <div>
          <Link href="/">
            <img src="./images/logo-big.png" style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {false && (
            <>
              {" "}
              <form>
                <input
                  style={{
                    padding: 10,
                    backgroundColor: "transparent",
                    border: "none",
                    fontStyle: "italic",
                  }}
                  className={styles.searchBar}
                  placeholder="Search by contestant name"
                />
              </form>
            </>
          )}
          <img
            onClick={() => setSearchOpen(!searchOpen)}
            src="./images/search.png"
            style={{ cursor: "pointer" }}
          />
        </div>
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
          {/* <NewMessage /> */}

          <main style={{ backgroundColor: "#fff", padding: 15 }}>
            <form>
              <input
                type="text"
                placeholder="Search by name"
                style={{ padding: 10 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div style={{ display: "inline-block", marginLeft: 10 }}>
                <Button title="Search" />
              </div>
            </form>
            <table className={styles.table}>
              <thead>
                <th className={styles.th}>S/N</th>
                <th className={styles.th}>email</th>
                <th className={styles.th}>name</th>

                <th className={styles.th}>phone</th>
                <th className={styles.th}>amount</th>
                <th className={styles.th}>votes</th>

                <th className={styles.th}>Contestant</th>
                <th className={styles.th}>reference</th>
                <th className={styles.th}>Date</th>
              </thead>
              <tbody className={styles.tbody}>
                {transactions.map((transaction, idx) => (
                  <tr>
                    <td className={styles.th}>{idx * 1 + 1}</td>
                    <td className={styles.th}>{transaction.email}</td>
                    <td
                      className={styles.th}
                      style={{
                        color:
                          transaction.name === "admin"
                            ? "rgba(255,0,0,0.6)"
                            : "inherit",
                      }}
                    >
                      {transaction.name}
                    </td>
                    <td className={styles.th}>{transaction.phone}</td>
                    <td
                      className={styles.th}
                      style={{
                        color:
                          transaction.amount < 0
                            ? "rgba(255,0,0,0.6)"
                            : "inherit",
                      }}
                    >
                      {transaction.amount < 0
                        ? -transaction.amount
                        : transaction.amount}
                      {transaction.amount < 0 && "**"}
                    </td>
                    <td className={styles.th}>{transaction.amount / 50}</td>
                    <td className={styles.th}>
                      {transaction.contestant.contestantId}
                    </td>
                    <td className={styles.th}>
                      {transaction.reference.reference}
                    </td>
                    <td className={styles.th}>
                      {getDateAndTime(transaction.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ padding: "20px 10px" }}>
                showing 1-{transactions.length}
              </p>

              <div>
                <button style={{ marginRight: 5, padding: 5 }}>{"<"}</button>
                <button style={{ marginRight: 5, padding: 5 }}>{">"}</button>
              </div>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}

const InputGroup = ({ icon = "user.svg", extraStyle, ...rest }) => {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: 4,
        marginBottom: 24,
        width: "100%",
        ...extraStyle,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(159, 135, 114, 1)",
          height: 54,
          width: 48,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={"./images/" + icon} alt="icon of user" />
      </div>
      <input
        type="text"
        placeholder="First Name"
        style={{
          padding: "16px 14px",
          border: "1px solid rgba(159, 135, 114, 1)",
          width: "100%",
        }}
        {...rest}
      />
    </div>
  );
};

const Contestant = ({ contestant, setSelectedUser }) => {
  var linkRef = useRef();
  const setValues = () => {
    cookie.set("contestant", contestant._id);
  };

  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  return (
    <li
      style={{
        border: "1px solid rgba(224, 202, 182, 1)",
        borderRadius: 6,
        margin: "0 24px 40px 24px",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", right: 20, top: 20 }}>
        <div>
          <img
            onClick={() => setSelectedUser(contestant)}
            style={{ cursor: "pointer" }}
            title="View Contestant's Profile"
            src="./images/contestant-circle.svg"
          />
        </div>
        <div>
          <img
            style={{ cursor: "pointer" }}
            title="Copy voting link"
            onClick={() => setShowCopyLinkModal(true)}
            src="./images/contestant-proceed.svg"
          />
        </div>
      </div>
      <div style={{ width: 290, height: 237 }}>
        <img
          src={contestant.avatar || "./images/placeholder.jpeg"}
          style={{
            width: "100%",
            borderRadius: "6px 6px 0 0",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontWeight: "700",
              fontStyle: "italic",
              textTransform: "uppercase",
              color: "rgba(58, 33, 16, 1)",
            }}
          >
            {contestant.firstName}
          </h2>
          <h3 style={{ fontWeight: "700", color: "rgba(58, 33, 16, 1)" }}>
            {contestant.lastName} {contestant.otherNames}
          </h3>
        </div>
        <div>Votes: {contestant.votes}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            Contestant{" "}
            <span style={{ color: "rgba(58, 33, 16, 1)", fontWeight: "700" }}>
              {" "}
              {contestant.contestantId}
            </span>
          </span>
          <Link
            href={`/vote-contestant?id=${contestant.contestantId}&contestant=${contestant.username}`}
          >
            <a
              onClick={setValues}
              style={{
                padding: "8px 34px",
                color: "#fff",
                backgroundColor: "rgba(58, 33, 16, 1)",
                borderRadius: 4,
                border: "1px solid rgba(58, 33, 16, 1)",
                fontWeight: "700",
              }}
            >
              Vote
            </a>
          </Link>
        </div>
      </div>
      {showCopyLinkModal && (
        <>
          <div
            onClick={() => setShowCopyLinkModal(false)}
            style={{
              width: "100vw",
              height: "100vh",
              position: "fixed",
              backgroundColor: "rgba(0,0,0,0.6)",
              top: 0,
              left: 0,
              zIndex: 2,
            }}
          ></div>

          <CopyToClipboard
            text={
              `https://ndiigbounitedforum.vercel.app/vote-contestant?id=${contestant.contestantId}&contestant=` +
              contestant.username
            }
            onCopy={() => setShowCopyLinkModal(false)}
          >
            <div
              style={{
                padding: "18px 56px",
                backgroundColor: "#fff",
                position: "absolute",
                zIndex: 3,
                top: 60,
                fontWeight: "500",
                color: constants.colors.primary1,
                borderRadius: 8,
                cursor: "pointer",
              }}
              className={styles.copyTextWrapper}
              onClick={() => {}}
            >
              Copy Link
            </div>
          </CopyToClipboard>
        </>
      )}
    </li>
  );
};

Dashboard.layout = "dashboard";
