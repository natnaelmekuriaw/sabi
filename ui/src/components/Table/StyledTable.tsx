import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";

import {
  updateProduct,
  deleteProduct,
  getProducts,
} from "../../actions/product/productServices";

interface ProductAttributes {
  id: number;
  key: string;
  itemNo: number;
  description: string;
  rate: number;
  quantity: number;
  amount: number;
  operations: boolean;
}

interface TableAttributes {
  products: ProductAttributes[];
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: ProductAttributes;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const StyledTable: React.FC<TableAttributes> = ({ products }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ProductAttributes[]>([]);

  const [editingKey, setEditingKey] = useState("");
  const [deleteKey, setDeleteKey] = useState("");

  const isEditing = (record: ProductAttributes) => record.key === editingKey;

  const edit = (record: Partial<ProductAttributes> & { key: React.Key }) => {
    console.log("Editing", record);
    form.setFieldsValue({
      id: "",
      itemNo: "",
      description: "",
      quantity: "",
      rate: "",
      amount: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    setDeleteKey("");
  };

  const save = async (
    record: Partial<ProductAttributes> & { key: React.Key }
  ) => {
    const key = record.key;
    try {
      const row = (await form.validateFields()) as ProductAttributes;

      console.log("got edit data is ", record);
      const newData: ProductAttributes[] = data;
      if (newData?.length) {
        const index = newData.findIndex(
          (item: ProductAttributes) => key === item.key
        );
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          console.log("here updated", newData[index]);
          const update = await updateProduct(newData[index]);
          console.log("got update table", update);
          if (update) {
            setData([...newData]);
            // setData([]);
            setEditingKey("");
            message.success("row updated successfully.");
          } else message.error("failed to update row ");
        } else {
          {
            newData.push(row);
            setData(newData);
            setEditingKey("");
          }
        }
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteRow = async (
    record: Partial<ProductAttributes> & { key: React.Key }
  ) => {
    const key = record.key;
    try {
      const row = (await form.validateFields()) as ProductAttributes;

      const newData: ProductAttributes[] = data;

      const index = newData.findIndex(
        (item: ProductAttributes) => key === item.key
      );
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        const deleteData = await deleteProduct(newData[index]);
        if (deleteData) {
          console.log("got response delete row", deleteData);
          const products = await getProducts();
          const productsWithKeys: ProductAttributes[] = products.map(
            (product: ProductAttributes, index: number) => ({
              ...product,
              key: index.toString(),
            })
          );
          console.log("got delete table", deleteData, productsWithKeys);
          setData(productsWithKeys);
          setEditingKey("");
          message.success("row deleted successfully.");
        } else message.error("failed to delete row ");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Item No",
      dataIndex: "itemNo",
      width: "10%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      editable: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      width: "10%",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "20%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: ProductAttributes) => {
        const editable = isEditing(record);
        return (
          <>
            {record.operations == false ? (
              <></>
            ) : (
              <>
                {editable ? (
                  <span style={{ marginRight: 8 }}>
                    <Typography.Link
                      onClick={() => save(record)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <>
                    <Typography.Link
                      disabled={editingKey !== ""}
                      onClick={() => edit(record)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </Typography.Link>
                  </>
                )}
                <span>
                  <Popconfirm
                    title="Sure to Delete?"
                    onConfirm={() => deleteRow(record)}
                  >
                    <a style={{ color: "#f87462" }}>Delete</a>
                  </Popconfirm>
                </span>
              </>
            )}
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ProductAttributes) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    setData(products);
  }, [products]);
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default StyledTable;

// .editable-row .ant-form-item-explain {
//   position: absolute;
//   top: 100%;
//   font-size: 12px;
// }
