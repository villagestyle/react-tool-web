import styled from "styled-components";

export const Weaper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  .content {
    margin: 0 auto;
    width: 480px;
    text-align: center;
    padding: 25px 0;
    .title {
      font-size: 32px;
      margin-top: 24px;
      color: #000;
    }
    form {
      width: 80%;
      margin: 50px auto;
      img.code {
        height: 32px;
      }
      .foot button {
        margin-top: 32px;
        width: 100%;
      }
    }
  }
`;
