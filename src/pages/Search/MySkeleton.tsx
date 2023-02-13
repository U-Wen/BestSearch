import { Card, Grid, Skeleton } from "@mui/material";
import { useCreation } from "ahooks";
import React from "react";

const DEFAULT_NUM = 5;
type Props = {
  height?: number | string;
  num?: number;
};

// 此组件用于渲染加载骨架
const MySkeleton = (props: Props) => {
  const { height = "14em", num } = props;
  const children = useCreation(() => {
    const temp: React.ReactNode[] = [];
    for (let i = 0; i < (num || DEFAULT_NUM); i++) {
      temp.push(
        <Grid item xs={12} sm={6} md={4} xl={3} key={i}>
          <Card sx={{ height, padding: "5%" }}>
            <Skeleton variant="text" sx={{ width: "60%", height: "10%" }} />
            <Skeleton variant="text" sx={{ width: "30%", height: "10%", margin: "1em 0" }} />
            <Skeleton variant="rectangular" sx={{ width: "100%", height: "50%" }} />
            <Skeleton variant="text" sx={{ width: "100%", height: "10%", marginTop: "1em" }} />
          </Card>
        </Grid>
      );
    }
    return temp;
  }, [num, height]);

  return <React.Fragment>{children}</React.Fragment>;
};

// 避免不必要的渲染
export default React.memo(MySkeleton, (preProps, nextProps) => {
  return preProps.height === nextProps.height && preProps.num === nextProps.num;
});
