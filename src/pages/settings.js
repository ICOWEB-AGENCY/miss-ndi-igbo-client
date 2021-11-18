import React, { useState } from "react";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import InputGroup from "../common/components/form/InputGroup";
import { logUser } from "../utils/services/postServices";
import Error from "../common/components/Error";
import constants from "../configs/constants";
import cookie from "js-cookie";
import { changePassword } from "../utils/services/putServices";

export default function Login() {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const change = async (e) => {
    try {
      e.preventDefault();
      const body = {
        newPassword: password,
        confirmNewPassword: confirmPassword,
      };
      console.log(body);

      const data = await changePassword(body);
      console.log(data);

      if (data.error) {
        //    console.log(data.error)
        setError(data.error.message);
        setTimeout(() => {
          setError("");
        }, 4000);
        return;
      }
      router.push("/password-change-success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div
        style={{
          margin: "25px 0",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {error && <Error category="Error Signing in" error={error} />}

        <img
          src="./images/back-white.svg"
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
        />
        <img
          src="./images/cancel-white.svg"
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
        />
      </div>
      <PageHeader
        title="Change Password"
        text="Make your password as strong and keep safe."
      />

      <form>
        <InputGroup
          value={password}
          placeholder="New Password"
          type="password"
          onChange={(e) => setPassword(e.target.value.trim())}
        />

        <InputGroup
          placeholder="Repeat New Password"
          value={confirmPassword}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={change}
          style={{
            color: "#fff",
            width: "100%",
            backgroundColor: "rgba(159, 135, 114, 1)",
            padding: 15,
            border: "1px solid rgba(159, 135, 114, 1)",
            marginTop: 35,
          }}
        >
          Update
        </button>
      </form>
    </main>
  );
}
