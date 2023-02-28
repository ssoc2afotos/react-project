import "./coursesTable.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableBody } from "@mui/material";
import { Button } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import transformDate from "../../helpers/functions/transformDate";
import { useAuthStore } from "../../store/useStores";

const CoursesTableBody = ({ data, changePath, changeNavItems }) => {
  const setPreviousPath = useAuthStore((state) => state.setPreviousPath);
  return (
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell key={"ghost-cell"}>
            <InfoCircleOutlined style={{ color: "rgb(37, 150, 190)" }} />
          </TableCell>
          <TableCell>
            <p>{item.title}</p>
          </TableCell>
          <TableCell align="center">
            <p>
              {item.online ? (
                <CheckCircleFilled style={{ color: "green" }} />
              ) : (
                <CloseCircleFilled style={{ color: "red" }} />
              )}
            </p>
          </TableCell>
          <TableCell>
            <p>{item.price.normal} €</p>
          </TableCell>
          <TableCell>
            <p>
              {transformDate(item.dates.start_date)} -{" "}
              {transformDate(item.dates.end_date)}
            </p>
          </TableCell>
          <TableCell align="center">
            <Button
              style={{
                backgroundColor: "rgb(37, 150, 190)",
                color: "white",
              }}
              onClick={() => {
                setPreviousPath("dashboard");
                changeNavItems({
                  label: item?.title,
                  key: `courses/${item.id}`,
                  icon: <BookOutlined />,
                });
                changePath(`courses/${item.id}`);
              }}
            >
              View Details
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CoursesTableBody;
