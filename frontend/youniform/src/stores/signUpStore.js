import { create } from 'zustand';

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
}));

export default signUpStore;
