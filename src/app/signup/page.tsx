"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const onSignup = async () => {
    try {
      setLoading(true);
      setError("");
      if (isFilled) {
        const { data } = await axios.post("/api/users/signup", user);
        console.log(data);
      }
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      setLoading(false);
      setError(error);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    console.log("effect");
    if (user.email !== "" && user.password !== "" && user.username !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [user]);
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <form className=" flex items-center justify-center flex-col max-w-xs py-5 space-y-5 border border-zinc-900 rounded-md">
        <h2 className="text-2xl">{loading ? "Processing" : "Sign Up"}</h2>
        <div className="spacey-y-3 *:py-1 *:px-2 *:w-full space-y-3 *:border-none *:outline-none *:text-zinc-800">
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <button
            className={`border border-zinc-600 py-1.5 rounded px-4 disabled:cursor-wait ${
              !isFilled && "opacity-0"
            }`}
            onClick={onSignup}
            disabled={loading}
          >
            {loading ? "Wait..." : "Sign Up"}
          </button>
        </div>

        {error && <div>There is something wrong</div>}
      </form>
    </div>
  );
};
export default SignupPage;
