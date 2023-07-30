import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Layout } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import StyledTable from "../Table/StyledTable";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "end",
  minHeight: 320,
  //   padding: 25,
  lineHeight: "120px",
  color: "#fff",
  //   backgroundColor: "#108ee9",
};

const StyledSelectButton: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    setUploading(true);
    fetch("localhost:80001", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props} accept=".xls,.xlsx">
        <Button icon={<UploadOutlined />}>Select Excel File</Button>
      </Upload>
      <StyledTable />
      <Content style={contentStyle}>
        {fileList.length > 0 && (
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 10 }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        )}
      </Content>
    </>
  );
};

export default StyledSelectButton;
