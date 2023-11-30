"use client";
import Image from "next/image";
import { useAuth } from "./context/AuthContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, login } = useAuth();
  console.log(user);
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      const emailValue = emailRef.current.value;
      const passwordValue = passwordRef.current.value;

      try {
        await login(emailValue, passwordValue);

        router.push("/serviceProviders");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/serviceProviders");
    }
  }, [user, router]);

  return (
    <main className="">
      <section className="flex justify-center items-center h-screen">
        <div className="h-[65%] flex flex-col justify-between">
          <div className="flex items-center">
            {/* logo */}
            <div className="h-32 w-32 relative me-6">
              <Image
                src="/logo_1080px.png"
                alt="Image Logo of athome-convenience"
                className="object-contain h-full w-full"
                fill
              />
            </div>
            {/* Logo title */}
            <div>
              <h1 className="text-5xl font-bold mb-3 text-athome-blue ">
                At-Home
              </h1>
              <h1 className="text-5xl font-bold text-athome-orange ">
                Convenience
              </h1>
            </div>
          </div>

          <h3 className="text-3xl text-center font-bold text-athome-blue">
            Log In
          </h3>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col items-center">
              <input
                ref={emailRef}
                className="w-3/4 border border-black rounded mb-4 p-3"
                type="text"
                name=""
                id=""
                placeholder="Email"
              />
              <input
                ref={passwordRef}
                className="w-3/4 border border-black rounded mb-10 p-3"
                type="password"
                name=""
                id=""
                placeholder="Password"
              />
              <button
                className="px-6 py-2 bg-athome-blue text-xl uppercase font-semibold text-white rounded-xl"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
