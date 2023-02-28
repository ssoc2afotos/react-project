import "./coursesTable.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableHead } from "@mui/material";

const CoursesTableHead = ({ headers }) => {
  return (
    <TableHead>
      <TableRow key={"header-row"} width="5%">
        <TableCell key={"ghost-cell"} />
        {headers.map((item) => (
          <TableCell
            key={item.id}
            align={item.name === "Online" ? "center" : "left"}
            className="admin-header"
          >
            <p key={`${item} - text`}>{item.name}</p>
          </TableCell>
        ))}
        <TableCell align="center" className="admin-header">
          <p key={`actions`}>Actions</p>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CoursesTableHead;
