import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const signUpStore = create((set, get) => ({
  // 진행 단계
  step: 1,
  setStep: (num) =>
    set((state) => {
      if (state.step < 4) {
        return { step: num };
      }
      return state;
    }),
  user: {
    email: "",
    password: "",
    confirmPw: "",
    profileUrl: null,
    nickname: "",
    introduce: "",
    players: [],
    isVerified: false,
    isPwVerified: false,
    isNicknameUnique: false,
    setEmail: (val) =>
      set((state) => ({ user: { ...state.user, email: val } })),
    setPassword: (val) =>
      set((state) => ({ user: { ...state.user, password: val } })),
    setConfirmPw: (val) =>
      set((state) => ({ user: { ...state.user, confirmPw: val } })),
    setNickname: (val) =>
      set((state) => ({ user: { ...state.user, nickname: val } })),
    setIntroduce: (val) =>
      set((state) => ({ user: { ...state.user, introduce: val } })),
    setIsVerified: (val) =>
      set((state) => ({ user: { ...state.user, isVerified: val } })),
    setIsPwVerified: (val) =>
      set((state) => ({ user: { ...state.user, isPwVerified: val } })),
    setIsNicknameUnique: (val) =>
      set((state) => ({ user: { ...state.user, isNicknameUnique: val } })),
    setPlayers: (players) =>
      set((state) => ({ user: { ...state.user, players } })),
  },
  sendEmail: async (email) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/users/email/send`,
        data: { email },
      });
      if (res.status === 200) {
        console.log(res.data);
        return "$OK";
      }
    } catch (error) {
      console.error("이메일 발송 중 오류 발생:", error);
      return error;
    }
  },
  verifyEmailCode: async (email, authenticCode) => {
    console.log(email);
    console.log(authenticCode);
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/users/email/verify`,
        params: {
          email: email,
          verifyCode: authenticCode,
        },
      });
      if (res.data.header.httpStatusCode === 200) {
        console.log("이메일 인증번호 확인 성공");
        console.log(res.data);
        return "$SUCCESS";
      }
    } catch (error) {
      console.log("Failed to verifyEmailCode", error);
      return "$FAIL";
    }
  },
  verifyNickname: async () => {
    try {
      const { user } = get();
      const res = await axios({
        method: "get",
        url: `${API_URL}/users/verify`,
        params: {
          nickname: user.nickname,
        },
      });
      console.log(res);
      return "$OK";
    } catch (err) {
      console.log(err);
      return "$FAIL";
    }
},
  fetchLocalSignUp: async () => {
    try {
      const { user } = get();

      const res = await axios({
        method: "post",
        url: `${API_URL}/users/signup/local`,
        data: {
          email: user.email,
          password: user.password,
          providerType: "local",
          profileUrl: user.profileUrl,
          nickname: user.nickname,
          introduce: user.introduce,
          team: "MONSTERS",
          players: (user.players.length === 1 && user.players[0] === 0) ? null : userplayers,
        },
      });
      console.log("Success to fetch Local SignUp");
      console.log(res.data.header);
      console.log(res.data.body);
    } catch (err) {
      console.log("Failed to fetch Local SignUp", err);
    }
  },
}));

export default signUpStore;
