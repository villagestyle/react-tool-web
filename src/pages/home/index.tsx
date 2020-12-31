import { Card, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import OperationText from "src/components/operation-text";
import { Author, Hitokoto, Weaper } from "./index.style";
import thridPartyAPI from "src/api/thrid-part";

const Home = () => {
  const [hitokoto, setHitokoto] = useState<Hitokoto>();

  const hitokotoReflush = useCallback(() => {
    thridPartyAPI.hitokoto("d").then(ret => {
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
        <Row>
          <Col span={8}>
            <Card
              title="一言"
              extra={
                <OperationText onClick={hitokotoReflush}>刷新</OperationText>
              }
            >
              <Hitokoto>{hitokoto?.hitokoto}</Hitokoto>
              <Author>
                {hitokoto?.from} - {hitokoto?.from_who || '无'}
              </Author>
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
