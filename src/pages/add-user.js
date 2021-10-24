import React, { useState } from "react";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";
import InputGroup from "../common/components/form/InputGroup";
import { postProtectedData } from "../utils/services/postServices";
import styles from "../styles/Create-account.module.css";
import Error from "../common/components/Error";
import CreateNav from "../common/components/nav/CreateNav";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import constants from "../configs/constants";
const log = console.log;

export default function CreateAccountBio() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const save = async (e) => {
    e.preventDefault();
    const body = { email, password, confirmPassword };
    console.log(body);
    const data = await postProtectedData(body, "admin/users");
    console.log(data);

    if (data.error) {
      setError(data.error.message);
      setTimeout(() => {
        setError("");
        if (data.error.status === 401) {
          router.push("/login");
        }
      }, 2000);
      return;
    }
    cookie.set("_id", data._id);
    router.push("/registeration-success");
  };
  return (
    <main>
      <div
        style={{
          margin: "25px 0",
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        {error && <Error category="Error Creating Account" error={error} />}

        <img
          src="./images/cancel-white.svg"
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
        />
      </div>
      <PageHeader />
      <form>
        <div>
          <InputGroup
            placeholder="Email Address"
            type="email"
            icon="message.svg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <InputGroup
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />

          <CreateNav save={save} />
        </div>
      </form>
    </main>
  );
}
