import styled from "styled-components";

export const StyledTag = styled.span`
  color: ${(props) => props.color};
  background-color: ${(props) => props["background-color"]};
  box-sizing: border-box;
  padding: 0 0.5rem;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
  border-radius: 5px;
`;
export const StyledTagPage = styled.div`
  color: ${(props) => props.color};
  background-color: ${(props) => props["background-color"]};
  box-sizing: border-box;
  padding: 0 0.5rem;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const PlusButton = styled.button`
  width: 150px;
  border: none;
  margin-top: 5px;
  border-radius: 5px;
`;

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
