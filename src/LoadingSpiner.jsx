import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spin
        size="large"
        description="Загрузка..."
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    </div>
  );
};

export default LoadingSpinner;
