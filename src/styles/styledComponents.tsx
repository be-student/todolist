import styled from "styled-components";

export const StyledTag = styled.div`
  box-sizing: "border-box";
  padding: "0 0.5rem";
  overflow: "no-wrap";
  margin-right: "0.5rem";
  border-radius: "10px";
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
`;
