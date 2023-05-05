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
        {/* <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.75,
          }}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            animateState: {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            exitState: {
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            },
          }}
        > */}
		<div>
          <div>
            <h2>עמוד נחיתה</h2>
          </div>
          <div>
            <Link href="/">כניסה לאתר</Link>
          </div>
		  </div>
        {/* </motion.div> */}
    </>
  );
};

export default LandingPage;
