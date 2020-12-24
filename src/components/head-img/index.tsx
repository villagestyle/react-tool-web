import { Image } from "antd";
import React from "react";
import { HeadImage, Weaper } from "./index.style";
import { UserOutlined } from "@ant-design/icons";
interface Prop {
  src: string;
  width: number;
  height: number;
  name: string;
}

const HeadImageComponent = (prop: Prop) => {
  return (
    <Weaper>
      <HeadImage>
        {prop.src ? (
          <Image
            src={prop.src}
            width={prop.width}
            height={prop.height}
            className="head-img"
          ></Image>
        ) : (
          <UserOutlined className="user-icon"></UserOutlined>
        )}
      </HeadImage>
      <span>{prop.name}</span>
    </Weaper>
  );
};

export default HeadImageComponent;
