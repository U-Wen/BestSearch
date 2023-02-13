import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chartMap } from "../api/chart.data";
import { RootState } from "../app/store";

// 类型定义: 需要用到的图表数据
export interface ChartDataProps {
  name: string;
  growth: number; // 增长率
  created_at: number; // 起始时间
  updated_at: number; // 结束时间
  search_msv: { date: string; sv: number }[]; // 图表数据
  [key: string]: any;
}

// 类型定义: 当前文件创建的数据流
export interface SearchState {
  keywords: string;
  chartData: {
    loading: boolean;
    data: ChartDataProps[];
  };
  openTip: boolean;
}

// 初始数据流
const initialState: SearchState = {
  keywords: "", // 搜索字符串
  chartData: {
    // 图表数据
    loading: false,
    data: [],
  },
  openTip: false, // 空字符串搜索提示 controller
};

// 异步获取图表数据
export const chartMapAsync = createAsyncThunk("search/fetchChartData", async (str: string) => {
  const response = await chartMap("INTERVIEW_SIMPLY2021", str);
  if (response?.status === "OK") return response.data.product_trends;
});

// 创建 Redux
export const searchSlice = createSlice({
  name: "search",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    change: (state, action) => {
      if (state.keywords !== action.payload) state.keywords = action.payload;
    },
    setOpenTip: (state, action) => {
      if (typeof action.payload === "boolean") state.openTip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chartMapAsync.pending, (state) => {
        state.chartData.loading = true;
      })
      .addCase(chartMapAsync.fulfilled, (state, action) => {
        state.chartData = { loading: false, data: action.payload };
      })
      .addCase(chartMapAsync.rejected, (state) => {
        state.chartData.loading = false;
      });
  },
});

// 暴露所有 Action
export const { change, setOpenTip } = searchSlice.actions;

// 暴露获取搜索框值的 Action
export const selectKeywords = (state: RootState) => state.search.keywords;
// 暴露获取图表数据的 Action
export const selectChartData = (state: RootState) => state.search.chartData;
// 暴露获取提示框 controller 的 Action
export const selectOpenTip = (state: RootState) => state.search.openTip;

export default searchSlice.reducer;
