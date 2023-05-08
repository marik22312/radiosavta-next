import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect} from "react";
import { Page } from "../components/ui/Page";
import { motion } from "framer-motion";

const LandingPage = () => {
  const router = useRouter();
  
  return (
    <>
		<div>
          <div>
            <h2>עמוד נחיתה</h2>
          </div>
          <div>
            <Link href="/">כניסה לאתר</Link>
          </div>
		  </div>
    </>
  );
};

export default LandingPage;
