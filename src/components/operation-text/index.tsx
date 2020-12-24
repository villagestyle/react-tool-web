import React from "react";
import styled from "styled-components";

const Weaper = styled.span`
  cursor: pointer;
  color: #1890ff;
`;

interface Prop {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  children?: Element | number | string;
}

const OperationText = (prop: Prop) => {
  return <Weaper onClick={prop.onClick}>{prop.children || prop.text}</Weaper>;
};

export default React.memo(OperationText);
