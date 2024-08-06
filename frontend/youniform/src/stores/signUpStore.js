import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://i11a308.p.ssafy.io:8080";
const signUpStore = create((set) => ({
  // 진행 단계
  step: 1,
  setStep: (num) => set((state) => {
    if (state.step < 4) {
      return { step: num };
    }
    return state;
  }),
  user: {
    email: '',
    password: '',
    confirmPw: '',
    nickname: '',
    introduce: '',
    players: [],
    isVerified: false,
    isPwVerified: false,
    isNicknameUnique: false,
    setEmail: (val) => set((state) => ({ user: { ...state.user, email: val } })),
    setPassword: (val) => set((state) => ({ user: { ...state.user, password: val } })),
    setConfirmPw: (val) => set((state) => ({ user: { ...state.user, confirmPw: val } })),
    setNickname: (val) => set((state) => ({ user: { ...state.user, nickname: val } })),
    setIntroduce: (val) => set((state) => ({ user: { ...state.user, introduce: val } })),
    setIsVerified: (val) => set((state) => ({ user: { ...state.user, isVerified: val } })),
    setIsPwVerified: (val) => set((state) => ({ user: { ...state.user, isPwVerified: val } })),
    setIsNicknameUnique: (val) => set((state) => ({ user: { ...state.user, isNicknameUnique: val } })),
    setPlayers: (players) => set((state) => ({ user: { ...state.user, players } })),
  },
  sendEmail: async (email) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/users/email/send`,
        data: { email },
      })
      if (res.status === 200) {
        console.log(res.data)
        return "$OK";
      }
    } catch (error) {
      console.error('이메일 발송 중 오류 발생:', error);
      return "$FAIL";
    }
  },
  verifyEmailCode: async (email, authenticCode) => {
    console.log(1);
    try {
      console.log(2);
      const res = await axios({
        method: "get",
        url: `${API_URL}/users/email/verify`,
        params: {
          email: email,
          verifyCode: authenticCode
        },
      })
      console.log(3);
      console.log(res);
    } catch (error) {
      
    }
  }
}));

export default signUpStore;
