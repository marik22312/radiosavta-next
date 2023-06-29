import React from "react";
import { Navbar } from "../ui/Page";
import styles from "./Page.module.scss";

export const asStandardPage = (Page: React.ElementType) => {
  // @ts-expect-error
  Page.getLayout = (page) => {
    return (
      <>
        <Navbar />
        <div className={styles.standardPage}>{page}</div>
      </>
    );
  };

  return Page;
};
