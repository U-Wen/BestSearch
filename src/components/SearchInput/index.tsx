import React from "react";
import { TextField, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { change, selectKeywords } from "../../models/search.model";
import styles from "./index.less";

export type SearchInputProps = {
  className?: string;
  onSearch: (str: string, flag: boolean, e?: React.KeyboardEvent<HTMLDivElement>) => void;
};

const SearchInput = (props: SearchInputProps) => {
  const { className, onSearch } = props;
  const dispatch = useAppDispatch();
  const keywords = useAppSelector(selectKeywords);

  return (
    <div className={`${styles.search}${className ? " " + className : ""} `}>
      <TextField
        id="outlined-basic"
        autoFocus
        placeholder="Search for new products in 961K stores"
        variant="outlined"
        classes={{ root: styles.input }}
        onChange={(e) => dispatch(change(e.target.value))}
        value={keywords}
        onKeyUp={(e) => onSearch(keywords, false, e)}
      />
      <IconButton className={styles.btn} onClick={() => onSearch(keywords, true)}>
        <SearchOutlined style={{ color: "rgba(0,0,0,0.23)" }} />
      </IconButton>
    </div>
  );
};

// 避免不必要的更新
export default React.memo(SearchInput, (preProps, nextProps) => {
  return preProps.className === nextProps.className;
});
