import styled from "styled-components";

const Weaper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #4f8aff;
  z-index: 9999;
  transition: opacity 0.65s;

  .preloader-hidden-add {
    opacity: 1;
    display: block;
  }

  .preloader-hidden-add-active {
    opacity: 0;
  }

  .preloader-hidden {
    display: none;
  }

  .cs-loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .cs-loader-inner {
    transform: translateY(-50%);
    top: 50%;
    position: absolute;
    width: 100%;
    color: #fff;
    text-align: center;
  }

  .cs-loader-inner label {
    font-size: 20px;
    opacity: 0;
    display: inline-block;
  }

  @keyframes lol {
    0% {
      opacity: 0;
      transform: translateX(-300px);
    }

    33% {
      opacity: 1;
      transform: translateX(0);
    }

    66% {
      opacity: 1;
      transform: translateX(0);
    }

    100% {
      opacity: 0;
      transform: translateX(300px);
    }
  }

  .cs-loader-inner label:nth-child(6) {
    animation: lol 3s infinite ease-in-out;
  }

  .cs-loader-inner label:nth-child(5) {
    animation: lol 3s 0.1s infinite ease-in-out;
  }

  .cs-loader-inner label:nth-child(4) {
    animation: lol 3s 0.2s infinite ease-in-out;
  }

  .cs-loader-inner label:nth-child(3) {
    animation: lol 3s 0.3s infinite ease-in-out;
  }

  .cs-loader-inner label:nth-child(2) {
    animation: lol 3s 0.4s infinite ease-in-out;
  }

  .cs-loader-inner label:nth-child(1) {
    animation: lol 3s 0.5s infinite ease-in-out;
  }
`;

export { Weaper };
