import styled from "styled-components";
import * as Font from "@/typography"

export const InfoContainer = styled.div`
  width: 45%;
  height: 90%;
  flex-shrink: 0;
  border: 1px solid;
  border-color: ${(props) => props.theme.primary};;
  margin-left: 1rem;
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
  
  &::before{
  content: '';
  position: relative;
  width: 20px;
  height: 2px;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.primary};
  }
  
  &::after {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  width: 2px; /* 세로선의 두께 */
  height: 20px; /* 세로선의 길이 */
  background-color: black;
}
&::before{
  content: '';
  position: relative;
  width: 2px;
  height: 20px;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.primary};
  }
`;