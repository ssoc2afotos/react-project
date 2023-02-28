import Flex from "../helpers/components/Flex";
import { Card, Button, Modal } from "antd";

const DeleteModalContent = ({ title }) => {
  return (
    <Flex flexDirection={"column"}>
      <Card>
        <p>Are you sure you want to delete course {title} ?</p>
      </Card>
    </Flex>
  );
};

export const DeleteModal = ({ visible, title, onDelete, onCancel }) => {
  return (
    <Modal
      title={"Delete course"}
      open={visible}
      onCancel={onCancel}
      width={500}
      style={{ marginTop: -60.5 }}
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
          style={{ backgroundColor: "red", color: "white" }}
          onClick={onDelete}
        >
          Delete
        </Button>,
      ]}
    >
      <DeleteModalContent title={title} />
    </Modal>
  );
};
