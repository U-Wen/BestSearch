import { Card } from "@mui/material";
import { useCreation } from "ahooks";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChartDataProps } from "../../models/search.model";
import styles from "./index.less";
// 以下为 echarts 按需加载
import * as echarts from "echarts";
import { ECharts } from "echarts";

// echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type Props = {
  data: ChartDataProps;
  height?: number | string;
  padding?: number | string;
  chartColor?: string;
};

const ChartBox = (props: Props) => {
  const { data, height = "16em", padding = "0.5em 0", chartColor = "#5470c6" } = props;
  const chartDom = useRef<HTMLDivElement>(null);
  const myChartRef = useRef<ECharts>();
  // 获取路由搜索字符串
  const { keywords } = useParams<{ keywords: string }>();
  // 处理标题：含搜索词加粗；生成图表 ID
  const [title, ID] = useCreation(() => {
    const temp: React.ReactNode[] = [];
    const words = keywords ? keywords.split("+") : [];
    if (words.length > 0) {
      const names = data.name.split(" ");
      names.forEach((name) => {
        if (words.includes(name)) temp.push(<b key={name}>{name + " "}</b>);
        else temp.push(name + " ");
      });
    } else {
      temp.push(data.name);
    }
    return [temp, data.name.replaceAll(" ", "")];
  }, [data.name]);
  // 处理底部显示的时间区间
  const timeRange = useCreation<string>(() => {
    let temp = "";
    const length = data.search_msv.length;
    if (length === 0) {
      temp = "/ - /";
    } else {
      const sTime = new Date(data.search_msv[0].date).toDateString().split(" "); // exp: Tue Dec 01 2015
      const eTime = new Date(data.search_msv[1].date).toDateString().split(" ");
      temp = `${sTime[1]} ${sTime[3]} - ${eTime[1]} ${eTime[3]}`;
    }
    return temp;
  }, [data.created_at, data.updated_at]);

  // ========= 渲染图表 =========
  useEffect(() => {
    // 初始化图表实例
    if (!myChartRef.current && chartDom.current) myChartRef.current = echarts.init(chartDom.current);
    // 开始渲染
    if (myChartRef.current) {
      const myChart = myChartRef.current;
      myChart.setOption({
        color: [chartColor],
        grid: {
          left: 0,
          top: 20,
          right: 0,
          bottom: 0,
        },
        dataset: {
          source: data.search_msv,
          dimensions: ["date", "sv"],
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            type: "line",
            areaStyle: {
              opacity: 0.5,
            },
            smooth: true,
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              opacity: 0,
            },
            markPoint: {
              symbolSize: 20,
              label: {
                fontSize: 10,
                color: "rgba(0,0,0,0.65)",
              },
              itemStyle: {
                color: "#FADEA7",
              },
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
          },
        ],
      });
    }
    // 下次图表更新前，clear
    return () => {
      const myChart = myChartRef.current;
      if (myChart && !myChart.isDisposed) {
        myChart.clear();
      }
    };
  }, [chartDom.current, data.search_msv]); // eslint-disable-line

  return (
    <Card sx={{ height, padding }} classes={{ root: styles.chartbox }}>
      <div className={styles.chartTitle}>{title}</div>
      <div className={styles.growth}>Growth {data.growth}%</div>
      <div className={styles.chart} id={ID} ref={chartDom}></div>
      <div className={styles.time}>{timeRange}</div>
    </Card>
  );
};

export default React.memo(ChartBox, (preProps, nextProps) => {
  return Object.is(preProps.data, nextProps.data) && preProps.height === nextProps.height && preProps.padding === nextProps.padding;
});
