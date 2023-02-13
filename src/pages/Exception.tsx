import { HomeMaxOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  status?: number;
  desc?: string;
  detail?: string;
  style?: React.CSSProperties;
  className?: string;
};

const Exception = (props: Props) => {
  const { status = 404, desc = "Sorry, an unexpected error has occurred!", detail = "Not Found", className, style } = props;
  const navigate = useNavigate();

  return (
    <div className={`exception${className ? " " + className : ""}`} style={{ ...style }}>
      <div className="ex-status">{status}</div>
      <div className="ex-desc">{desc}</div>
      <div className="ex-detail">{detail}</div>
      <div className="ex-btn">
        <Button variant="outlined" startIcon={<HomeMaxOutlined />} onClick={() => navigate("/")}>
          回到首页
        </Button>
      </div>
    </div>
  );
};

export default Exception;
