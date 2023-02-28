import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Flex from "./helpers/components/Flex";
import Footer from "./Footer";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { HomeFilled } from "@ant-design/icons";

const BasicLayout = () => {
  const [path, setPath] = useState("dashboard");
  const [navItems, setNavItems] = useState([
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <HomeFilled />,
    },
    {
      label: "Courses",
      key: "courses",
      icon: <DashboardIcon />,
    },
  ]);
  const changePath = (path) => setPath(path);

  const changeNavItems = (obj) => {
    if (obj.key === "dashboard" || obj.key === "courses") {
      setNavItems([
        {
          label: "Dashboard",
          key: "dashboard",
          icon: <HomeFilled />,
        },
        {
          label: "Courses",
          key: "courses",
          icon: <DashboardIcon />,
        },
      ]);
    } else {
      if (navItems.filter((item) => item.key === obj.key).length > 0) {
        setNavItems(navItems.filter((item) => item.key !== obj.key));
      } else {
        setNavItems([...navItems, obj]);
      }
    }
  };

  console.log("navItems: ", navItems);
  console.log("typeof navItems: ", typeof navItems);

  return (
    <Flex flexDirection={"column"}>
      <NavigationBar
        items={navItems}
        path={path}
        changePath={changePath}
        changeNavItems={changeNavItems}
      />
      <Outlet key={navItems.length} context={[changePath, changeNavItems]} />
      <Footer />
    </Flex>
  );
};

export default BasicLayout;
