"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVirified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyEmail", { token });
      console.log(response);
      setVirified(true);
    } catch (error: any) {
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken);
  }, []);
  console.log(token);
  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-3">
      <h3 className="text-3xl">Verify Email</h3>
      <p>{token ? `${token}` : "No Token"}</p>
      <hr />
      {verified && (
        <>
          <h3 className="text-xl">Verified</h3>
          <Link href={"/login"}>Login</Link>
        </>
      )}
      {error && (
        <>
          <h3 className="text-xl">error</h3>
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
