import styled from "styled-components";

export const Weaper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 720px;
  min-height: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    padding: 20vh 0 0;
    width: 420px;
    height: 100%;
    text-align: center;
    .tips {
      text-align: left;
    }
    .submit {
      margin-bottom: 10px;
      margin-top: 15%;
    }
    .form {
      margin: 50px 0;
      width: 100%;
    }
    .title {
      font-size: 32px;
      margin-top: 24px;
      color: #000;
    }
    form {
      width: 80%;
      margin: 50px auto;
      button {
        margin-top: 32px;
        width: 100%;
      }
    }
  }
  .componey {
    text-align: left;
    position: absolute;
    bottom: 50px;
  }
  .mr-20 {
    margin-right: 20px;
  }
`;
