import styled from "styled-components";
import EmptyIcon from "@assets/EmptyState/EmptyState_Photocard.svg?react";
import EmptyStateBox from "@components/Share/EmptyState";

const EmptyStateComp = styled.div`
  width: 90%;
  height: 84%;
  margin-top: 10%;
  margin-left: 3%;
`;
const EmptyState = () => {
  return (
    <EmptyStateComp>
      <EmptyStateBox
        icon={EmptyIcon}
        state="noPhotocards"
      />
    </EmptyStateComp>
  )
}


export default EmptyState