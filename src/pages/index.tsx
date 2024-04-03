import Head from "next/head";
import React from "react";
import Clock from "../components/Clock";
import Today from "../components/Today";
import LoginAvatar from "../components/LoninAvatar";
import { ModeToggle } from "../components/DarkMode";

import TimeLogComponent from "../components/TimeLogComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="mx:right-10 absolute right-5 top-10 flex gap-2 lg:right-20 ">
          <LoginAvatar />
          <ModeToggle />
        </div>
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <Today />
            <Clock />
          </div>
          <div className="mt-8">
            <TimeLogComponent />
          </div>
        </div>
      </div>
    </>
  );
}
