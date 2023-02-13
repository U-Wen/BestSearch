import React from "react";
import { useMemoizedFn } from "ahooks";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar, Typography } from "@mui/material";
import SearchInput, { SearchInputProps } from "../../components/SearchInput";
import styles from "./index.less";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { chartMapAsync, selectOpenTip, setOpenTip } from "../../models/search.model";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // 获取 redux 中提示框 controller
  const open = useAppSelector(selectOpenTip);

  /**
   * 这个搜索函数将被记住
   * @function searchFn 调用搜索接口、路由跳转
   * @param {string} str 格式化的输入框的内容
   * @param {boolean} flag flag=true 为点击搜索按钮触发；flag=false为键盘事件触发
   * @param {React.KeyboardEvent<HTMLDivElement>} e 鼠标键盘触发的事件对象，监听回车键搜索
   */
  const searchFn = useMemoizedFn<SearchInputProps["onSearch"]>((str, flag, e) => {
    if (flag === true || (e && e.key.toLocaleLowerCase() === "enter")) {
      // 空的搜索词，提示信息，回退搜索框信息
      if (str.length === 0) {
        dispatch(setOpenTip(true));
        return;
      }
      const searchStr = str.trim().replaceAll(/\s+/g, " ");
      dispatch(chartMapAsync(searchStr));
      navigate("/search/" + searchStr.replaceAll(" ", "+"));
    }
  });

  return (
    <div id="sys-home" className={styles.home}>
      <Header />
      <Typography variant="h3" classes={{ root: styles.searchTitle }}>
        Search Trends
      </Typography>
      <SearchInput onSearch={searchFn} />
      <Snackbar open={open} autoHideDuration={5000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => dispatch(setOpenTip(false))}>
        <Alert onClose={() => dispatch(setOpenTip(false))} severity="error" sx={{ width: "100%" }}>
          空的搜索词，请重新输入！
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
