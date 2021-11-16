import React, { useState, useEffect } from "react";
import PageHeader from "../common/components/headers/PageHeader";
import Link from "next/link";
import InputGroup from "../common/components/form/InputGroup";
import { getData } from "../utils/services/getServices";
import { postData } from "../utils/services/postServices";
import styles from "../styles/Create-account.module.css";
import Error from "../common/components/Error";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import constants from "../configs/constants";
import Button from "../common/components/form/Button";
import { usePaystackPayment } from "react-paystack";
import queryString from "query-string";
const log = console.log;

export const getServerSideProps = async ({ req, res, query }) => {
  // return {
  //   redirect: {
  //     destination: "/contest-info",
  //     permanent: false,
  //   },
  // };

  const data = await getData("users/u/" + query.id);

  return {
    props: {
      contestant: data,
    },
  };
};

export default function VoteContestant({ contestant = {} }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [votes, setVotes] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState("");
  const [phone, setPhone] = useState("");
  const [dontProceed, setDontProceed] = useState(true);
  const [user, setUser] = useState(contestant);
  const parsed = queryString.parse(router.asPath.split("?")[1]);
  console.log(parsed);

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: 100 * total,
    publicKey: "pk_live_b46762cf95f045b5d7b9e8ca27e7bc1d28d178be",
    // publicKey:process.NODE_ENV==="production"?"pk_live_b46762cf95f045b5d7b9e8ca27e7bc1d28d178be":'pk_test_b8241186ab1ccd92c2a4a302501be9066f4c452c'
  };

  const onSuccess = async (reference) => {
    const body = {
      reference,
      email,
      votes,
      contestant: parsed.contestant,
      phone,
      name,
      amount,
    };

    const data = await postData(body, "transactions");
    console.log(data);
    router.push(`/contestants?reference=${parsed.contestant}&id=${parsed.id}`);
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);
  useEffect(() => {
    setAmount(votes * 50);
    setTotal(votes * 50 + votes * (50 * 0.015));
  }, [votes]);

  // useEffect(() => {
  //   (async function () {
  //     console.log(parsed);
  //     try {
  //       const data = await getData("users/u/" + parsed.id);
  //       setUser(data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   })();
  // }, []);

  const initiatePayment = (e) => {
    setError("");
    e.preventDefault();
    if (!email) {
      setError("Email field can not be  Empty");
      return;
    }
    if (!name) {
      setError("Name field can not be  Empty");
      return;
    }
    if (!phone) {
      setError("Phone field can not be  Empty");
      return;
    }
    if (!votes) {
      setError("Number of Votes Must be specified");
      return;
    }
    initializePayment(onSuccess, onClose);
  };

  useEffect(() => {
    if (email && phone && votes && name) {
      setDontProceed(false);
    } else {
      setDontProceed(true);
    }
  }, [email, phone, name.votes]);

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
        {error && <Error category="Voting Error" error={error} />}

        <img
          src="./images/cancel-white.svg"
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: 180,
          fontSize: 30,
          fontWeight: "700",
        }}
      >
        Sorry , you can't vote online{"\n"}.Please contact Contestant or
        organizers to vote.
      </div>
    </main>
  );
}
