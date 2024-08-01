import { create } from 'zustand';

const signUpStore = create((set) => ({
  // 진행 단계
  step: 1,
  setStep: () => set((state) => {
    if (state.step < 4) {
      return { step: state.step + 1 };
    }
    return state;
  }),
  user: {
    email: '',
    password: '',
    nickname: '',
    
  }
}));

export default signUpStore;
