import React from "react";

import styles from "./Title.module.scss";

export const Title: React.FC<{ as: "h1" | "h2" | "h3" }> = (props) => {
  return (
    <div className={styles.pageTitleWrapper}>
      <props.as className={styles.pageTitle}>{props.children}</props.as>
    </div>
  );
};
