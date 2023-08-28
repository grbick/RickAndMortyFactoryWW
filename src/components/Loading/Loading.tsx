import React from "react";
import { Alert, Spin } from "antd";
import "./loading.scss";

const Loading: React.FC = () => (
  <div className="loading">
    <Alert message="Loading characters..." />
    <Spin></Spin>
  </div>
);

export default Loading;
