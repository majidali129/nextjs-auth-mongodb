"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profilepage = () => {
  const [data, setData] = useState("");
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      console.log(data);
      setData(data.user._id);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("user logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col space-y-3 ">
      {data && (
        <Link href={`profile/${data}`}>
          <h3 className="text-lg text-zinc-400 ">{data}</h3>
        </Link>
      )}

      <button
        onClick={getUserDetails}
        className="border border-zinc-600 py-1.5 rounded px-4 disabled:cursor-wait"
      >
        Get user info
      </button>
      <button
        onClick={logoutUser}
        className="border border-red-400 bg-red-900 py-1.5 rounded px-4 disabled:cursor-wait"
      >
        logout
      </button>
    </div>
  );
};

export default Profilepage;
