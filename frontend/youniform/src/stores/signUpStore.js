import { create } from "zustand";
import axios from "axios";
import useUserStore from "./userStore";

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
    verifyCode: null,
    password: "",
    confirmPw: "",
    profileUrl: null,
    nickname: "",
    introduce: "",
    team: null,
    players: [],
    isVerified: false,
    isPwVerified: false,
    isNicknameUnique: false,
    setEmail: (val) =>
      set((state) => ({ user: { ...state.user, email: val } })),
    setVerifyCode: (val) =>
      set((state) => ({ user: { ...state.user, verifyCode: val } })),
    setPassword: (val) =>
      set((state) => ({ user: { ...state.user, password: val } })),
    setConfirmPw: (val) =>
      set((state) => ({ user: { ...state.user, confirmPw: val } })),
    setProfileUrl: (val) =>
      set((state) => ({ user: { ...state.user, profileUrl: val } })),
    setNickname: (val) =>
      set((state) => ({ user: { ...state.user, nickname: val } })),
    setIntroduce: (val) =>
      set((state) => ({ user: { ...state.user, introduce: val } })),
    setTeam: (val) =>
      set((state) => ({ user: { ...state.user, team: val } })),
    setIsVerified: (val) =>
      set((state) => ({ user: { ...state.user, isVerified: val } })),
    setIsPwVerified: (val) =>
      set((state) => ({ user: { ...state.user, isPwVerified: val } })),
    setIsNicknameUnique: (val) =>
      set((state) => ({ user: { ...state.user, isNicknameUnique: val } })),
    setPlayers: (players) =>
      set((state) => ({ user: { ...state.user, players } })),
  },

  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    // console.log("Access Token saved to localStorage:", token);
  },

  sendEmail: async (email) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/users/email/send`,
        data: { email },
      });
      if (res.status === 200) {
        // console.log(res.data);
        return "$OK";
      }
    } catch (error) {
      console.error("이메일 발송 중 오류 발생:", error);
      return error;
    }
  },
  verifyEmailCode: async (email, authenticCode) => {
    // console.log(email);
    // console.log(authenticCode);
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
        // console.log("이메일 인증번호 확인 성공");
        // console.log(res.data);
        return "$SUCCESS";
      }
    } catch (error) {
      // console.log("Failed to verifyEmailCode", error);
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
      // console.log(res);
      return "$OK";
    } catch (err) {
      // console.log(err);
      return "$FAIL";
    }
  },
  fetchLocalSignUp: async () => {
    // console.log(1);
    try {
      // console.log(2);
      const { user } = get();
      // console.log(user);
      // console.log("typeof team");
      // console.log(typeof user.team);
      // console.log("인증번호 확인");
      // console.log(user.verifyCode);
      const res = await axios({
        method: "post",
        url: `${API_URL}/users/signup/local`,
        data: {
          email: user.email,
          password: user.password,
          verifyCode: user.verifyCode,
          providerType: "local",
          profileUrl: null,
          nickname: user.nickname,
          introduce: user.introduce,
          team: user.team,
          players: user.players,
        },
      });
      // console.log(res);      
      // console.log("Success to fetch Local SignUp");
      if (res.data.header.httpStatusCode === 200) {
        const accessToken = res.data.body.accessToken;
        const { setAccessToken } = get();
        setAccessToken(accessToken);
        
        // console.log('Access Token:', accessToken);
        // console.log(res.data.body.accessToken);
        return "$SUCCESS"
      }
    } catch (err) {
      // console.log("Failed to fetch Local SignUp", err);
    }
  },
  fetchSocialSignUp: async () => {
    try {
      const { user } = get();
      const res = await axios({
        method: "post",
        url: `${API_URL}/users/signup/${user.providerType}`,
        data: {
          email: user.email,
          password: user.password,
          verifyCode: user.verifyCode,
          providerType: user.providerType,
          profileUrl: user.profileUrl,
          nickname: user.nickname,
          introduce: user.introduce,
          team: user.team,
          players: user.players,
        },
      });
      // console.log("Success to fetch Local SignUp");
      if (res.data.header.httpStatusCode === 200) {
        const accessToken = res.data.body.accessToken;
        const { setAccessToken } = get();
        setAccessToken(accessToken);
        // console.log('Access Token:', accessToken);
        // console.log(res.data.body.accessToken);
        return "$SUCCESS"
      }
    } catch (err) {
      // console.log("Failed to fetch Local SignUp", err);
    }
  },
}));

export default signUpStore;
