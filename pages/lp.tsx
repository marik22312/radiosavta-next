import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Page } from "../components/ui/Page";
import { motion } from "framer-motion";

const LandingPage = () => {
  const router = useRouter();

  return (
    <motion.main
      exit={{
        top: "100%",
        opacity: 0,
      }}
      transition={{
        duration: 0.75,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h2>עמוד נחיתה</h2>
        </div>
        <div>
          <Link href="/">כניסה לאתר</Link>
        </div>
      </div>
    </motion.main>
  );
};

export default LandingPage;
