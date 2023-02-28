import React, { useEffect, useState } from "react";
import { HomeFilled } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NavigationBar = ({ path, changePath, items, changeNavItems }) => {
  const navigate = useNavigate();
  useEffect(() => navigate(path), [path]);

  return (
    <Menu
      style={{
        borderRadius: "15px",
        position: "sticky",
        top: 10,
        zIndex: 10,
      }}
      onClick={(e) => {
        changePath(e.key);
        if (e.key === "dashboard" || e.key === "courses") {
          changeNavItems({ key: e.key });
        }
      }}
      selectedKeys={[path]}
      mode="horizontal"
      items={items}
    />
  );
};

export default NavigationBar;
