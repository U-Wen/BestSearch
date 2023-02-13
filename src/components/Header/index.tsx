import { Typography } from "@mui/material";
import React from "react";
import styles from "./index.less";

type Props = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const Header = (props: Props) => {
  const { className, children, style } = props;

  return (
    <Typography variant="h4" classes={{ root: `${styles.header}${className ? " " + className : ""}` }} style={{ ...style }}>
      <div className={styles.title}>BestSearch</div>
      <div className={styles.slot}>{children}</div>
    </Typography>
  );
};

// 避免不必要的更新
export default React.memo(Header, (preProps, nextProps) => {
  return preProps.className === nextProps.className && Object.is(preProps.children, nextProps.children) && Object.is(preProps.style, nextProps.style);
});
