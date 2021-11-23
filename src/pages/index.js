import Head from "next/head";
import styles from "../styles/Index.module.css";
import HomeMenuCards from "../common/components/home/HomeMenuTag";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ marginTop: 60 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "Center",
          alignItems: "center",
          flexWrap: "wrap",

          height: "80vh",
          fontSize: 50,
          textAlign: "center",
        }}
      >
        Site under lockdown, Failure to pay developers. Voting will be open once
        developers of the site are paid their fees.
      </div>
    </main>
  );
}
