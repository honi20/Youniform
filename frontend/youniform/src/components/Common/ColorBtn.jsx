import { Button } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

const ColorBtn = muiStyled(Button)(() => ({
  backgroundColor: "#D9D9D9",
  fontSize: "14px",
  fontWeight: "bold",
  boxShadow: "none",
  color: "#3A3A3A",
  height: "28px",
  '&:hover': {
    backgroundColor: "#D9D9D9",
    boxShadow: "none"
  },
  '&:active': {
    backgroundColor: "#D9D9D9"
  },
}));

export default ColorBtn;