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
