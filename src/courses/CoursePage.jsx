import { Card, message, Spin, Image, Button } from "antd";
import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useStores";
import PageHeader from "../dashboard/PageHeader";
import Flex from "../helpers/components/Flex";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import transformDate from "../helpers/functions/transformDate";
import { DeleteModal } from "./DeleteModal";
import { CourseModal } from "./CourseModal";

const CoursePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({});
  const baseURL = useAuthStore((state) => state.baseURL);
  const [changePath, changeNavItems] = useOutletContext();
  const { id: courseID } = useParams();
  const previousPath = useAuthStore((state) => state.previousPath);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [changes, setChanges] = useState({});
  const [coursesUpdated, setCoursesUpdated] = useState(false);

  useEffect(() => {
    const getCoursesData = async () => {
      const url = `${baseURL}/courses/${courseID}`;
      try {
        const response = await axios.get(url);
        console.log("response.data: ", response.data);
        setCourse(response.data);
        setChanges(response.data);
      } catch (err) {
        console.log("error: ", err);
        message.error(err, [3]);
      }
    };

    getCoursesData();
    setIsLoading(false);
  }, [coursesUpdated]);

  const addChange = (id, value, key) => {
    if (key) {
      setChanges({ ...changes, [id]: { ...changes[id], [key]: value } });
    } else {
      setChanges({ ...changes, [id]: value });
    }
  };

  const onDelete = async () => {
    const url = `${baseURL}/courses/${courseID}`;
    try {
      const response = await axios.delete(url, { ...changes });
      console.log("response.data: ", response.data);
      changeNavItems({ key: "courses" });
      changePath("courses");
    } catch (err) {
      console.log("error: ", err);
      message.error(err, [3]);
    }
    setDeleteModalVisible(false);
  };

  const cancelDeleteModal = () => {
    setChanges({ ...course });
    setDeleteModalVisible(false);
  };

  const onSave = async () => {
    const url = `${baseURL}/courses/${courseID}`;
    try {
      const response = await axios.put(url, { ...changes });
      console.log("response.data: ", response.data);
      setCoursesUpdated(!coursesUpdated);
    } catch (err) {
      console.log("error: ", err);
      message.error(err, [3]);
    }

    cancelEditModal();
  };

  const cancelEditModal = () => {
    setEditModalVisible(false);
  };

  console.log("course: ", course);

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
      {isLoading ? (
        <Spin size="large" />
      ) : (
        Object.keys(course).length && (
          <Flex
            flexDirection={"column"}
            style={{ marginBottom: "2rem", minHeight: "72vh" }}
          >
            <PageHeader
              title={`${courseID}. ${course?.title}`}
              description={null}
            />
            <Flex
              flexDirection={"row"}
              style={{ width: "95vw", marginTop: "3rem" }}
            >
              <Image
                preview={false}
                width={"20vw"}
                height={"40vh"}
                style={{ borderRadius: 10 }}
                src={
                  course.imagePath && course.imagePath !== ""
                    ? course.imagePath
                    : "/courses/noImage.jpg"
                }
              />
              <Flex
                flexDirection={"column"}
                style={{
                  width: "70vw",
                  marginLeft: "3rem",
                  marginRight: "4rem",
                }}
              >
                <Flex
                  flexDirection={"row"}
                  style={{ width: "70vw", gap: "2rem", marginLeft: "2rem" }}
                >
                  <Flex
                    flexDirection={"row"}
                    style={{
                      width: "max-content",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <b style={{ marginRight: "0.5rem" }}>Price:</b>{" "}
                    {course?.price?.normal} €{" "}
                  </Flex>
                  <Flex
                    flexDirection={"row"}
                    style={{
                      width: "max-content",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <b style={{ marginRight: "0.5rem" }}>Online:</b>{" "}
                    {course?.online ? (
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
                      width: "max-content",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <b style={{ marginRight: "0.5rem" }}>Duration:</b>{" "}
                    {course?.duration}
                  </Flex>
                  <Flex
                    flexDirection={"row"}
                    style={{
                      width: "max-content",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <b style={{ marginRight: "0.5rem" }}>Dates:</b>{" "}
                    {transformDate(course?.dates?.start_date)} -{" "}
                    {transformDate(course?.dates?.end_date)}
                  </Flex>
                </Flex>
                <Flex
                  flexDirection={"row"}
                  style={{
                    width: "95%",
                    marginLeft: "2rem",
                    marginRight: "4rem",
                    marginTop: "3rem",
                    textAlign: "justify",
                  }}
                >
                  {course?.description}
                </Flex>
                <Flex
                  flexDirection={"column"}
                  style={{
                    width: "80%",
                    marginLeft: "2rem",
                    marginRight: "4rem",
                    marginTop: "3rem",
                    justifyContent: "center",
                    gap: "2rem",
                  }}
                >
                  <Flex
                    flexDirection={"row"}
                    style={{
                      width: "100%",
                      marginLeft: "2rem",
                      marginRight: "4rem",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "rgb(37, 150, 190)",
                        color: "white",
                      }}
                      onClick={() => setEditModalVisible(true)}
                    >
                      Edit
                    </Button>
                    {editModalVisible && (
                      <CourseModal
                        visible={editModalVisible}
                        course={course}
                        onSave={onSave}
                        onCancel={cancelEditModal}
                        addChange={addChange}
                        closable
                      />
                    )}
                    <Button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                      }}
                      onClick={() => setDeleteModalVisible(true)}
                    >
                      Delete
                    </Button>
                    {deleteModalVisible && (
                      <DeleteModal
                        visible={deleteModalVisible}
                        title={course?.title}
                        onDelete={onDelete}
                        onCancel={cancelDeleteModal}
                        closable
                      />
                    )}
                  </Flex>
                  <Flex
                    flexDirection={"row"}
                    style={{
                      width: "100%",
                      marginLeft: "2rem",
                      marginTop: "5rem",
                      marginRight: "4rem",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      style={{
                        width: "max-content",
                        backgroundColor: "#154c79",
                        color: "white",
                      }}
                      onClick={() => {
                        changeNavItems({
                          label: course?.title,
                          key: `courses/${course.id}`,
                        });
                        changePath(previousPath);
                      }}
                    >
                      Back to previous page
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )
      )}
    </Card>
  );
};

export default CoursePage;
