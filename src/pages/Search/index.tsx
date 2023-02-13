import { Alert, Grid, Snackbar } from "@mui/material";
import { useMemoizedFn, useMount, useUpdateEffect } from "ahooks";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Header from "../../components/Header";
import SearchInput, { SearchInputProps } from "../../components/SearchInput";
import { change, chartMapAsync, selectChartData, selectKeywords, selectOpenTip, setOpenTip } from "../../models/search.model";
import ChartBox from "./ChartBox";
import styles from "./index.less";
import MySkeleton from "./MySkeleton";

// 10 个设计主色
export const colors = ["#13C2C2", "#1677FF", "#2F54EB", "#F5222D", "#52C41A", "#FA541C", "#FA8C16", "#FAAD14", "#FADB14", "#A0D911", "#722ED1", "#EB2F96", "#666666"];
type Props = {};
const Search = (props: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  // 获取图表数据
  const { loading, data } = useAppSelector(selectChartData);
  // 获取路由搜索字符串
  const { keywords } = useParams<{ keywords: string }>();
  // 获取 redux 中存储的搜索字符串
  const keywords2 = useAppSelector(selectKeywords);
  // 获取 redux 中提示框 controller
  const open = useAppSelector(selectOpenTip);

  // 同步 redux 与 路由
  useMount(() => {
    const serachStr = keywords ? keywords.replaceAll("+", " ") : "";
    if (serachStr.length > 0 && serachStr !== keywords2) {
      dispatch(change(serachStr));
    }
  });

  // ========= 监听路由和搜索词变化：比较路由和 redux 中的搜索词 =========
  useUpdateEffect(() => {
    // 如果格式化后相等，表示搜索词变化了，需要更新数据
    if (keywords && keywords2 === keywords?.replaceAll("+", " ")) {
      // 更新图表数据
      dispatch(chartMapAsync(keywords2));
    }
  }, [keywords2, keywords]);

  /**
   * 这个搜索函数将被记住
   * @function searchFn 路由跳转：与 Home 页面的不同，这里不请求图表数据，仅切换路由
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
      const to = "/search/" + str.trim().replaceAll(/\s+/g, "+"); // 目标路由
      if (pathname !== to) {
        navigate(to);
      }
    }
  });

  return (
    <div className={styles.searchPage}>
      <Header>
        <SearchInput onSearch={searchFn} className={styles.searchInput} />
      </Header>
      <div className={styles.listTitle}>Related product trends</div>
      <div className={styles.listBox}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 1, md: 2, xl: 2 }}>
          {loading === false ? (
            data.map((it, i) => (
              <Grid item xs={12} sm={6} md={4} xl={3} key={it.name}>
                <ChartBox data={it} chartColor={colors[i]} />
              </Grid>
            ))
          ) : (
            <MySkeleton num={data.length} />
          )}
        </Grid>
      </div>
      <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => dispatch(setOpenTip(false))}>
        <Alert onClose={() => dispatch(setOpenTip(false))} severity="error" sx={{ width: "100%" }}>
          空的搜索词，请重新输入！
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Search;
