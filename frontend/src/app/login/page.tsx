"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [isLoginView, setIsLoginView] = useState(true);
  return (
    <div className="grid w-full min-h-screen">
      <div className="flex items-center justify-center bg-muted p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[420px] space-y-6">
          <form className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">
                {isLoginView ? "Login" : "Create an account"}
              </h1>
              <p className="text-muted-foreground">
                {isLoginView
                  ? "Enter your email and password to access your account."
                  : "Enter your details to get started."}
              </p>
            </div>
            {isLoginView ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-sm font-medium underline underline-offset-4"
                      prefetch={false}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="button" className="w-full">
                  Create account
                </Button>
              </>
            )}
            <Button
              variant={isLoginView ? "outline" : "default"}
              onClick={() => setIsLoginView(!isLoginView)}
              className="w-full"
            >
              {isLoginView ? "Create Account" : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
