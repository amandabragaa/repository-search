import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20%;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 30px;
    color: #0d2636;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const ButtonIssues = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background: #0d2636;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.3s;

    & + button {
      margin-left: 10px;
    }

    &:hover {
      background: #0071db;
    }
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesList = styled.ul`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }

    div {
      flex: 1;
      margin-left: 12px;

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    strong {
      font-size: 15px;

      a {
        text-decoration: none;
        color: #222;
        transition: 0.3s;
        word-break: break-all;

        &:hover {
          color: #0071db;
        }
      }

      span {
        background: #222;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 7px;
        margin-left: 10px;
        height: 20px;
        display: inline-flex;
        align-items: center;
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    background: #0d2636;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #0071db;
    }

    &:disabled {
      cursor: not-allowed;
      background: #ccc;
      opacity: 0.5;
      color: #0d2636;
    }
  }
`;
