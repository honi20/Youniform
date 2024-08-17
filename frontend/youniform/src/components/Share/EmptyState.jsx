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

const EmptyState = ({ icon: Icon, state }) => {
  let title = '';
  let subTitle = '';

  switch (state) {
    case 'noAlerts':
      title = '새로운 알림이 없습니다.';
      subTitle = '새 다이어리를 작성하고\n더 많은 친구를 만나보세요.';
    break;
    case 'noFriends':
      title = '친구가 없습니다.';
      subTitle = '친구를 추가하고\n더 많은 소식을 받아보세요.';
    break;
    case 'noPosts':
      title = '게시글이 없습니다.';
      subTitle = '새로운 게시글을 작성하고\n활동을 시작하세요.';
    break;
    case 'noPhotocards':
      title = '생성된 포토카드가 없습니다.';
      subTitle = '나만의 포토카드를 만들고 수집해보세요.';
    break;
    case 'noDiaries':
      title = '다이어리가 없습니다.';
      subTitle = '나만의 다이어리를 만들고 수집해보세요.';
    break;
    case 'noSongs':
      title = '응원가가 없습니다.';
      subTitle = '해당 정보가 없습니다.';
    break;
    default:
      title = '정보가 없습니다.';
      subTitle = '원하는 정보를 찾을 수 없습니다.\n다시 시도해 주세요.';
    break;
  }

  return (
    <EmptyStateContainer>
      <IconBox>
        <Icon />
      </IconBox>
      <EmptyTitle>
        {title}
      </EmptyTitle>
      <EmptyText>
        {subTitle}
      </EmptyText>
    </EmptyStateContainer>
  );
}

export default EmptyState;
