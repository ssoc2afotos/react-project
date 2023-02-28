import { Space, Badge, Spin, message } from "antd";
import Flex from "../helpers/components/Flex";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useStores";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = useAuthStore((state) => state.baseURL);

  useEffect(() => {
    const getDashboardData = async () => {
      const url = `${baseURL}/stats`;
      try {
        const response = await axios.get(url);
        console.log("response.data: ", response.data);
        setStats(response.data);
      } catch (err) {
        console.log("error: ", err);
        message.error(err, [3]);
      }
    };

    getDashboardData();
    setIsLoading(false);
  }, []);

  return (
    <Flex
      flexDirection={"row"}
      style={{
        width: "100%",
        justifyContent: "space-between",
        gap: "3rem",
        marginBottom: "0.5rem",
        marginTop: "1rem",
      }}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        stats.map((stat) => (
          <Space
            key={stat.id}
            style={{
              borderRadius: "15px",
              border: "1px solid #eeeee4",
              display: "flex",
              width: "25%",
              height: "max-content",
              padding: "0.5rem",
              justifyContent: "center",
            }}
          >
            <Flex flexDirection={"row"}>
              {stat.title}:
              <Badge
                style={{ marginLeft: "0.5rem" }}
                count={stat.amount}
                showZero
                color="rgb(37, 150, 190)"
              />
            </Flex>
          </Space>
        ))
      )}
    </Flex>
  );
};

export default Stats;
