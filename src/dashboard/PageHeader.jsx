import { Button, message } from "antd";
import { useState } from "react";
import Flex from "../helpers/components/Flex";
import { CourseModal } from "../courses/CourseModal";
import axios from "axios";
import { useAuthStore } from "../store/useStores";

const PageHeader = ({ title, description, showButton, updateCourses }) => {
  const [newCourseModalVisible, setNewCourseModalVisible] = useState(false);
  const baseURL = useAuthStore((state) => state.baseURL);
  const numberOfCourses = useAuthStore((state) => state.numberOfCourses);
  const [changes, setChanges] = useState({
    title: "",
    duration: "",
    imagePath: "",
    online: false,
    description: "",
    dates: { start_date: "", end_date: "" },
    price: { normal: "", early_bird: "" },
  });

  const onCancel = () => {
    setChanges({
      title: "",
      duration: "",
      imagePath: "",
      online: false,
      description: "",
      dates: { start_date: "", end_date: "" },
      price: { normal: "", early_bird: "" },
    });
    setNewCourseModalVisible(false);
  };

  const onSave = async () => {
    const url = `${baseURL}/courses`;
    const id =
      numberOfCourses >= 9
        ? (numberOfCourses + 1).toString()
        : "0" + (numberOfCourses + 1).toString();

    console.log("id: ", id);
    try {
      const response = await axios.post(url, {
        ...changes,
        id: id,
      });
      updateCourses();
    } catch (err) {
      console.log("error: ", err);
      message.error(err, [3]);
    }

    onCancel();
  };

  const addChange = (id, value, key) => {
    if (key) {
      setChanges({ ...changes, [id]: { ...changes[id], [key]: value } });
    } else {
      setChanges({ ...changes, [id]: value });
    }
  };

  console.log("changes: ", changes);

  return (
    <Flex
      flexDirection={"row"}
      style={{
        display: "flex",
        width: "100%",
        marginBottom: "0.3rem",
        alignItems: "center",
      }}
    >
      <Flex
        flexDirection={"column"}
        style={{ width: "50%", justifyContent: "flex-start" }}
      >
        <h1>{title}</h1>
        {description && <h4 style={{ marginTop: "-0.3rem" }}>{description}</h4>}
      </Flex>
      {showButton && (
        <Flex style={{ width: "50%", justifyContent: "flex-end" }}>
          <Button
            onClick={() => setNewCourseModalVisible(true)}
            style={{ border: "none", color: "rgb(37, 150, 190)" }}
          >
            + Add new Course
          </Button>
          {newCourseModalVisible && (
            <CourseModal
              visible={newCourseModalVisible}
              course={{}}
              onCancel={onCancel}
              onSave={onSave}
              addChange={addChange}
              title={"Add new course"}
              closable
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default PageHeader;
