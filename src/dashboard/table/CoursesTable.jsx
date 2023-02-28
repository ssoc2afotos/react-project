import "./coursesTable.css";
import { Spin, Button } from "antd";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import CoursesTableHead from "./CoursesTableHead";
import { useAuthStore } from "../../store/useStores";
import { message } from "antd";
import axios from "axios";
import CoursesTableBody from "./CoursesTableBody";
import Flex from "../../helpers/components/Flex";

const CoursesTable = ({ changePath, changeNavItems }) => {
  const baseURL = useAuthStore((state) => state.baseURL);
  const setNumberOfCourses = useAuthStore((state) => state.setNumberOfCourses);
  const [data, setData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCoursesData = async () => {
      const url = `${baseURL}/courses`;
      try {
        const response = await axios.get(url);
        console.log("response.data: ", response.data);
        setData(response.data);
        setHeadData([
          { id: 1, name: "Title", align: "left" },
          { id: 2, name: "Online", align: "center" },
          { id: 3, name: "Price", align: "left" },
          { id: 4, name: "Date", align: "left" },
        ]);
        setNumberOfCourses(response.data.length);
      } catch (err) {
        console.log("error: ", err);
        message.error(err, [3]);
      }
    };

    getCoursesData();
    setIsLoading(false);
  }, []);

  const coursesToDisplay = data.filter(
    (datum, index) => data.length - index <= 5
  );

  return (
    // <Card style={{ display: "flex", overflowY: "auto", borderRadius: "15px" }}>
    <div>
      {isLoading ? (
        <>
          <Spin size="large" />
        </>
      ) : (
        <Flex
          flexDirection={"column"}
          style={{ marginTop: "1rem", height: "100%" }}
        >
          <Flex
            flexDirection={"row"}
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "-1rem",
              marginTop: "1rem",
              justifyContent: "center",
            }}
          >
            <Flex style={{ width: "50%", justifyContent: "flex-start" }}>
              <p style={{ fontWeight: 700 }}>Last 5 courses</p>
            </Flex>
            <Flex style={{ width: "50%", justifyContent: "flex-end" }}>
              <Button
                style={{
                  border: "none",
                  color: "rgb(37, 150, 190)",
                }}
                onClick={() => changePath("courses")}
              >
                View All
              </Button>
            </Flex>
          </Flex>
          <div style={{ overflow: "hidden", maxHeight: "43vh", width: "95vw" }}>
            <TableContainer
              style={{ height: "43vh", marginBottom: "1rem" }}
              component={Paper}
              className="testing_table"
            >
              <Table stickyHeader size="small">
                <CoursesTableHead headers={headData} />
                <CoursesTableBody
                  data={coursesToDisplay}
                  changePath={changePath}
                  changeNavItems={changeNavItems}
                />
              </Table>
            </TableContainer>
          </div>
        </Flex>
      )}
    </div>
    // </Card>
  );
};

export default CoursesTable;
