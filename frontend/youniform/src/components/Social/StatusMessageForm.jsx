import React from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StatusMessageBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
`;

const StatusMessage = styled.span`
  font-size: 14px;
  color: #FF4949;
`;

const StatusMessageForm = ({ statusMsg }) => {
  return (
    <StatusMessageBox>
      <InfoOutlinedIcon style={{ width: "16px", color: "#FF4949" }} />
      <StatusMessage>
        {statusMsg}
      </StatusMessage>
    </StatusMessageBox>
  );
};

export default StatusMessageForm;