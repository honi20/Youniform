import styled from 'styled-components';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 70px);
  justify-content: center;
  align-items: center;
  gap: 13px;
`;

const IconBox = styled.div`
  width: 120px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 100%;  /* IconBox의 width에 맞춰 크기 조절 */
    height: auto;  /* 비율에 따라 자동으로 세로 크기 조절 */
  }
`;

const EmptyTitle = styled.span`
  margin-top: 1rem;
  font-weight: bold;
  color: #626262;
`;

const EmptyText = styled.span`
  text-align: center;
  font-size: 13px;
  color: #787878;
`;

const EmptyState = ({ icon: Icon }) => {
  return (
    <EmptyStateContainer>
      <IconBox>
        <Icon />  {/* 전달받은 React 컴포넌트를 렌더링 */}
      </IconBox>
      <EmptyTitle>
        새로운 알림이 없습니다.
      </EmptyTitle>
      <EmptyText>
        새 다이어리를 작성하고<br />
        더 많은 친구를 만나보세요.
      </EmptyText>
    </EmptyStateContainer>
  );
}

export default EmptyState;
