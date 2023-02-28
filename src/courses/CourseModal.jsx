import Flex from "../helpers/components/Flex";
import { Card, Button, Modal, Input, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";
import transformDate from "../helpers/functions/transformDate";

const { TextArea } = Input;

const CourseModalContent = ({ course, addChange }) => {
  console.log();
  return (
    <Flex flexDirection={"column"}>
      <Card bodyStyle={{ minWidth: "60vw", paddingRight: "5rem" }}>
        <Flex
          style={{
            display: "flex",
            width: "100%",
            minWidth: "50vw",
            flexDirection: "row",
            padding: "0rem",
            gap: "0.5rem",
          }}
        >
          <Flex
            flexDirection={"column"}
            style={{
              width: "50%",
              marginRight: "2rem",
              marginLeft: "2rem",
            }}
          >
            <h1 style={{ marginBottom: "-0.2rem" }}>Info</h1>
            <Flex flexDirection={"column"}>
              <p>Title: </p>
              <Input
                defaultValue={course?.title ?? ""}
                onChange={(e) => addChange("title", e.target.value)}
                placeholder={"Title"}
              />
            </Flex>

            <Flex flexDirection={"column"}>
              <p>Duration: </p>
              <Input
                defaultValue={course?.duration ?? ""}
                onChange={(e) => addChange("duration", e.target.value)}
                placeholder={"Duration"}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <p>Image path: </p>
              <Input
                defaultValue={course?.title ?? ""}
                onChange={(e) => addChange("imagePath", e.target.value)}
                placeholder={"Image path"}
              />
            </Flex>

            <Flex flexDirection={"column"} style={{ marginTop: "1rem" }}>
              <Checkbox
                defaultChecked={course?.online ?? false}
                onChange={(checkedValue) =>
                  addChange("online", checkedValue.target.checked)
                }
              >
                Online
              </Checkbox>
            </Flex>

            <Flex flexDirection={"column"}>
              <p>Description: </p>
              <TextArea
                rows={4}
                defaultValue={course?.title ?? ""}
                onChange={(e) => addChange("description", e.target.value)}
                placeholder={"Description"}
              />
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            style={{ width: "50%", marginRight: "2rem", gap: "0.4rem" }}
          >
            <h1 style={{ marginBottom: "-0.2rem" }}>Dates</h1>
            <Flex flexDirection={"column"}>
              <p>Start date: </p>
              <DatePicker
                key={"start_date"}
                id={"start_date"}
                defaultValue={
                  course?.dates?.start_date
                    ? dayjs(
                        transformDate(course?.dates?.start_date),
                        "DD/MM/YYYY"
                      )
                    : ""
                }
                placeholder={"Start date"}
                format={"DD/MM/YYYY"}
                onChange={(dateString) =>
                  addChange(
                    "dates",
                    dateString ? dateString.format("YYYY-MM-DD") : "",
                    "start_date"
                  )
                }
              />
            </Flex>

            <Flex flexDirection={"column"}>
              <p>End date: </p>
              <DatePicker
                key={"end_date"}
                id={"end_date"}
                placeholder={"End Date"}
                format={"DD/MM/YYYY"}
                onChange={(dateString) =>
                  addChange(
                    "dates",
                    dateString ? dateString.format("YYYY-MM-DD") : "",
                    "end_date"
                  )
                }
                defaultValue={
                  course?.dates?.end_date
                    ? dayjs(
                        transformDate(course?.dates?.end_date),
                        "DD/MM/YYYY"
                      )
                    : ""
                }
              />
            </Flex>
            <h1 style={{ marginBottom: "-0.2rem" }}>Price</h1>
            <Flex flexDirection={"column"}>
              <p>Normal: </p>
              <Input
                suffix="€"
                defaultValue={course?.price?.normal ?? ""}
                onChange={(e) => addChange("price", e.target.value, "normal")}
                placeholder={"Normal price"}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <p>Early brid: </p>
              <Input
                suffix="€"
                defaultValue={course?.price?.early_bird ?? ""}
                placeholder={"Early bird price"}
                onChange={(e) =>
                  addChange("price", e.target.value, "early_bird")
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export const CourseModal = ({
  visible,
  onSave,
  onCancel,
  course,
  addChange,
  title,
}) => {
  console.log("course: ", course);
  return (
    <Modal
      title={
        <b
          style={{
            fontSize: "1.3em",
            color: "rgb(37, 150, 190)",
          }}
        >
          {title}
        </b>
      }
      open={visible}
      onCancel={onCancel}
      onSave={onSave}
      width={"60vw"}
      style={{ marginTop: -80 }}
      destroyOnClose={true}
      footer={[
        <Button
          key="back"
          style={{ backgroundColor: "rgb(37, 150, 190)", color: "white" }}
          onClick={onCancel}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          className="confirm-btn"
          style={{ backgroundColor: "#154c79", color: "white" }}
          onClick={onSave}
        >
          Save
        </Button>,
      ]}
    >
      <CourseModalContent course={course} addChange={addChange} />
    </Modal>
  );
};
