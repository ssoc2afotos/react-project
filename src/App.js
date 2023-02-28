import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import BasicLayout from "./BasicLayout";
import Dashboard from "./dashboard/Dashboard";
import Courses from "./courses/Courses";
import CoursePage from "./courses/CoursePage";

const App = () => {
  let courseID = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CoursePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
