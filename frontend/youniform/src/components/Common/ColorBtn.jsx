import { Button } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

const ColorBtn = muiStyled(Button)(() => ({
  height: "38px",
  backgroundColor: "#D9D9D9",
  fontSize: "12px",
  fontWeight: "bold",
  boxShadow: "none",
  color: "#3A3A3A",
  '&:hover': {
    backgroundColor: "#d0d0d0",
    boxShadow: "none"
  },
  '&:active': {
    backgroundColor: "#D9D9D9"
  },
}));

export default ColorBtn;