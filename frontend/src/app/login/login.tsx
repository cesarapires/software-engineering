import * as React from "react";
import Link from "next/link";
import { Form as LoginForm } from "./form";

export default function Login() {
  return (
    <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
      <h1 className="font-semibold text-2xl">Login</h1>
      <LoginForm />
      <p className="text-center">
        Need to create an account?{" "}
        <Link className="text-indigo-500 hover:underline" href="/register">
          Create Account
        </Link>{" "}
      </p>
    </div>
  );
}
