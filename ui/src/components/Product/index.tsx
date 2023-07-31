import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Layout } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import * as XLSX from "xlsx";

import { ProductAttributes } from "../../../types/types";
import {
  getProducts,
  massStoreProducts,
} from "../../actions/product/productServices";
import StyledTable from "../Table/StyledTable";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "end",
  minHeight: 320,
  lineHeight: "120px",
  color: "#fff",
};

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductAttributes[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [massData, setMassData] = useState<ProductAttributes[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    const massStore = await massStoreProducts(products);
    if (massStore) {
      message.success("rows updated successfully.");
      const productsWithKeys: ProductAttributes[] = massStore.map(
        (product: ProductAttributes, index: number) => ({
          ...product,
          key: index.toString(),
        })
      );
      setProducts(productsWithKeys);
    } else message.error("failed to update rows ");

    console.log("Mass store returned", massStore);
    setUploading(false);
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

  const parseExcel = (fileList: UploadFile[]): void => {
    try {
      if (fileList.length === 0) {
        console.error("No file selected");
        return;
      }

      const file = fileList[0] as RcFile;
      if (!file) {
        alert("Invalid file");
        console.error("Invalid file check your file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const data = event.target?.result as ArrayBuffer;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: "array" });
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        let parsedJson: any[] = XLSX.utils.sheet_to_json(worksheet);
        let massData: any[] = [];
        parsedJson.map((item, index: number) => {
          if (
            item["__EMPTY"] &&
            item["__EMPTY"] &&
            Number.parseFloat(item["__EMPTY"])
          ) {
            massData.push({
              key: index.toString(),
              itemNo: item["__EMPTY"],
              description: item["__EMPTY_1"],
              quantity: item["__EMPTY_3"],
              rate: item["__EMPTY_4"],
              amount: item["__EMPTY_5"],
              operations: false,
            });
          }
        });
        setMassData(massData);
        console.log("parsedJson", parsedJson, massData);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error parsing Excel file: ", error);
    }
  };

  const fetchProducts = async () => {
    const products = await getProducts();
    const productsWithKeys: ProductAttributes[] = products.map(
      (product: ProductAttributes, index: number) => ({
        ...product,
        key: index.toString(),
      })
    );
    setProducts(productsWithKeys);
    console.log(`Got products`, products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (fileList?.length) {
      parseExcel(fileList);
    }
  }, [fileList]);

  useEffect(() => {
    setProducts(massData);
  }, [massData]);

  return (
    <>
      <Upload {...props} accept=".xls,.xlsx" style={{ background: "red" }}>
        <Button icon={<UploadOutlined />}>Select Excel File</Button>
      </Upload>

      <StyledTable products={products} />
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

export default Product;
