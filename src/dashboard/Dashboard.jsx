import { Card } from "antd";
import CoursesTable from "./table/CoursesTable";
import Stats from "./Stats";
import PageHeader from "./PageHeader";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const [changePath, changeNavItems] = useOutletContext();

  return (
    <Card
      style={{
        width: "100%",
        maxHeight: "100%",
        overflowX: "hidden",
        display: "flex",
        justifyContent: "left",
        borderRadius: "15px",
        marginTop: "1rem",
        paddingLeft: "1rem",
      }}
      bodyStyle={{
        maxHeight: "85vh",
        overflowY: "hidden",
        overflowX: "hidden",
        padding: -10,
        paddindBottom: "5rem",
      }}
    >
      <PageHeader
        title="Welcome to out Dashboard!"
        description="Manage everything and have fun!"
      />
      <Stats />
      <CoursesTable changePath={changePath} changeNavItems={changeNavItems} />
    </Card>
  );
};

export default Dashboard;
