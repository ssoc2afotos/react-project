import { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useAuthStore } from "../store/useStores";
import Flex from "../helpers/components/Flex";
import { Card, Spin, Row, Col, Image, Button } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  BookOutlined,
} from "@ant-design/icons";
import transformDate from "../helpers/functions/transformDate";
import PageHeader from "../dashboard/PageHeader";
import { useOutletContext } from "react-router-dom";

const Courses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coursesUpdated, setCoursesUpdated] = useState(false);
  const [courses, setCourses] = useState([]);
  const baseURL = useAuthStore((state) => state.baseURL);
  const setPreviousPath = useAuthStore((state) => state.setPreviousPath);
  const setNumberOfCourses = useAuthStore((state) => state.setNumberOfCourses);
  const [changePath, changeNavItems] = useOutletContext();

  const updateCourses = () => {
    setCoursesUpdated(!coursesUpdated);
  };

  useEffect(() => {
    const getCoursesData = async () => {
      const url = `${baseURL}/courses`;
      try {
        const response = await axios.get(url);
        console.log("response.data: ", response.data);
        setCourses(response.data);
        setNumberOfCourses(response.data.length);
      } catch (err) {
        console.log("error: ", err);
        message.error(err, [3]);
      }
    };

    getCoursesData();
    setIsLoading(false);
  }, [coursesUpdated]);

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
        maxHeight: "83vh",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <PageHeader
        title={"All Courses"}
        description={null}
        showButton={true}
        updateCourses={updateCourses}
      />
      <Card
        style={{
          width: "94vw",
          maxHeight: "100%",
          overflowX: "hidden",
          display: "flex",
          justifyContent: "center",
          borderRadius: "15px",
        }}
        bodyStyle={{
          maxHeight: "85vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Flex flexDirection={"row"} style={{ width: "100%", gap: "1rem" }}>
          {isLoading ? (
            <>
              <Spin size="large" />
            </>
          ) : (
            <Row gutter={[40, 50]} justify="left" style={{ width: "100%" }}>
              {courses.map((course) => (
                <Col key={course.id} className="gutter-row" span={6}>
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "max-content",
                      paddingTop: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      paddingBottom: "2rem",
                      borderRadius: "15px",
                      overflowX: "hidden",
                    }}
                    bodyStyle={{ overflowX: "hidden" }}
                  >
                    <Flex style={{ marginBottom: "0.8rem" }}>
                      <b>{course.title}</b>
                    </Flex>
                    <Image
                      preview={false}
                      width={200}
                      src={
                        course.imagePath && course.imagePath !== ""
                          ? course.imagePath
                          : "/courses/noImage.jpg"
                      }
                    />
                    <Flex
                      flexDirection={"row"}
                      style={{
                        width: "100%",
                        alignItems: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <b style={{ marginRight: "0.5rem" }}>Price:</b>{" "}
                      {course.price.normal} €{" "}
                      <b style={{ margin: "0 0.5rem" }}>|</b> Online:
                      {course.online ? (
                        <CheckCircleFilled
                          style={{ color: "green", marginLeft: "0.5rem" }}
                        />
                      ) : (
                        <CloseCircleFilled
                          style={{ color: "red", marginLeft: "0.5rem" }}
                        />
                      )}
                    </Flex>
                    <Flex
                      flexDirection={"row"}
                      style={{
                        width: "100%",
                        alignItems: "center",
                        marginTop: "0.3rem",
                      }}
                    >
                      <b style={{ marginRight: "0.5rem" }}>Duration:</b>{" "}
                      {course.duration}
                    </Flex>
                    <Flex
                      flexDirection={"row"}
                      style={{
                        width: "100%",
                        alignItems: "center",
                        marginTop: "0.3rem",
                      }}
                    >
                      <b style={{ marginRight: "0.5rem" }}>Dates:</b>{" "}
                      {transformDate(course.dates.start_date)} -{" "}
                      {transformDate(course.dates.end_date)}
                    </Flex>
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "rgb(37, 150, 190)",
                        marginTop: "1rem",
                      }}
                      onClick={() => {
                        setPreviousPath("courses");
                        changeNavItems({
                          label: course?.title,
                          key: `courses/${course.id}`,
                          icon: <BookOutlined />,
                        });
                        changePath(`courses/${course.id}`);
                      }}
                    >
                      View
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Flex>
      </Card>
    </Card>
  );
};

export default Courses;
