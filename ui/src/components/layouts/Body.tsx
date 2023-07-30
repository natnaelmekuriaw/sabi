import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

type WebsiteLayout = {
  children: React.ReactNode;
};

const contentStyle: React.CSSProperties = {
  textAlign: "start",
  minHeight: 320,
  padding: 25,
  lineHeight: "120px",
  color: "#fff",
  //   backgroundColor: "#108ee9",
};

export default function Body({ children }: WebsiteLayout) {
  return (
    <div>
      <Content style={contentStyle}>{children}</Content>
    </div>
  );
}
