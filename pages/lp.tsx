import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect} from "react";
import { Page } from "../components/ui/Page";
import { animate, usePresence } from "framer-motion";

const LandingPage = () => {
  const router = useRouter();
  const [isPresent, safeToRemove] = usePresence();
  const scope = React.useRef(null);
  
  useEffect(() => {
     if (isPresent) {
       const enterAnimation = async () => {
         await animate(scope.current, { opacity: 1 })
       }
       enterAnimation()

     } else {
       const exitAnimation = async () => {
         await animate(scope.current, { opacity: 0 })
         safeToRemove?.()
       }
	   console.log('Exit')
       
       exitAnimation()
	}
	
	return () => {
		 const exitAnimation = async () => {
		   await animate(scope.current, { opacity: 0 })
		   safeToRemove?.()
		 }
		 console.log('Exit')
		 
		 exitAnimation()

	 }
  }, [isPresent, safeToRemove])
  return (
    <>
      {/* <AnimatePresence exitBeforeEnter>
        <motion.div
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
		<div ref={scope}>
          <div>
            <h2>עמוד נחיתה</h2>
          </div>
          <div>
            <Link href="/">כניסה לאתר</Link>
          </div>
		  </div>
        {/* </motion.div>
      </AnimatePresence> */}
    </>
  );
};

LandingPage.getLayout = (page: any) => {
  return <Page title="רדיוסבתא - שומעים אותך">{page}</Page>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log("#######", context.req.cookies);

  return {
    props: {},
  };
};

export default LandingPage;
