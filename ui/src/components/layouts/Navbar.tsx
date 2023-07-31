import { Menu } from "antd";

export default function Navbar() {
  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={new Array(1).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `SSSS Project`,
          };
        })}
      />
    </div>
  );
}
