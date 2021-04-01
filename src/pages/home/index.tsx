import { Card, Col, message, Row, Modal, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import OperationText from "src/components/operation-text";
import { Author, Hitokoto, Weaper } from "./index.style";
import thridPartyAPI from "src/api/thrid-part";
import uploadSrv from "src/utils/upload";

const upload = new uploadSrv();

const Home = () => {
  const [hitokoto, setHitokoto] = useState<Hitokoto>();
  const [uploadLoading, setUploadLoading] = useState(false);

  const hitokotoReflush = useCallback(() => {
    thridPartyAPI.hitokoto("g").then(ret => {
      setHitokoto(ret.data);
    });
  }, []);

  useEffect(() => {
    hitokotoReflush();
    const interval = setInterval(() => {
      hitokotoReflush();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [hitokotoReflush]);

  return (
    <Weaper>
      <header>你好</header>
      <main>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="一言"
              extra={
                <OperationText onClick={hitokotoReflush}>刷新</OperationText>
              }
            >
              <Hitokoto>{hitokoto?.hitokoto}</Hitokoto>
              <Author>
                {hitokoto?.from} - {hitokoto?.from_who || "无"}
              </Author>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="上传至阿里云(返回链接)">
              <Button
                loading={uploadLoading}
                onClick={() => {
                  setUploadLoading(true);
                  upload
                    .open()
                    .then((ret: any) => {
                      Modal.success({
                        title: "上传成功",
                        content: `资源地址为：${ret.url}`,
                        mask: true
                      });
                      setUploadLoading(false);
                    })
                    .catch(() => {
                      message.error("上传失败，请重新再试");
                      setUploadLoading(false);
                    });
                }}
              >
                上传
              </Button>
            </Card>
          </Col>
        </Row>
      </main>
    </Weaper>
  );
};

export default Home;

interface Hitokoto {
  hitokoto: string;
  from: string;
  creator: string;
  from_who: string;
}
