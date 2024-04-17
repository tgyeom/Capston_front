import styled from "styled-components";

export const LoginBoxContainer = styled.div`
  max-width: 500px;
  padding: 28px;
  margin-top: -80px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  box-sizing: none;
`;

export const Topsection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 20%;
  justify-content: center;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  width: 100%;
  height: 80%;
  justify-content: center;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 30px;
`;

export const TextBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  margin: 0;
`;

export const Input = styled.input`
  width: 93%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const SubmitButton = styled.input`
  width: 100%;
  height: 13%;
  background-color: ${(props) => props.bgColor || "gray"};
  border: none;
  padding: 10px;
  font-size: 16px;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  margbbbbbin-top: 20px;
  font-weight: bolder;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  // &:hover {
  //   background: #0056b3;
  // }
  &:focus {
    outline: none;
  }
`;

export const Paragraph = styled.p`
  display: flex;
  justify-content: right;
  font-weight: 300;
  font-size: 15px;
  position: relative;
`;

export const SignupButton = styled.button`
  width: 100%;
  height: 50px;
  flex: 1;
  margin-bottom: 20px;
  border: none;
  padding: 0 20px;
  border-radius: 5px;
  background-color: gray;
  & > p {
    color: white;
    font-size: 17px;
    text-align: center;
    font-weight: bold;
  }
`;
