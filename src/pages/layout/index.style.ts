import styled from "styled-components";

export const Weaper = styled.div`
  width: 100%;
  height: 100%;
  > section {
    height: 100%;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 84px;
    text-align: center;
    /* background: rgba(255, 255, 255, 0.2); */
    img {
      height: 100%;
    }
    margin: 16px 8px;
  }

  .logo-s {
    height: 18px;
    margin: 16px 0;
  }

  .site-layout .site-layout-background {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user {
      display: inline-block;
      padding: 0 24px;
      a {
        margin-left: 8px;
        color: #575858;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  .sider {
    overflow-y: auto;
    height: 100%;
  }
`;

export const TabsWeaper = styled.div``;
