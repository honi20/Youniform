import { create } from 'zustand';

const useSignUpStore = create((set) => ({
  // 진행 단계
  step: 1,
  setStep: () => set((state) => {
    if (state.step < 4) {
      return { step: state.step + 1 };
    }
    return state;
  }),
  // 이메일 형식
  currency: '',
  // 이메일 형식
  currency: '',
  setCurrency: (val) => set({ currency: val }),
  curDropdown: '',
  setCurDropdown: (val) => set({curDropdown: val}),
  // 비밀번호 입력 & 확인
  values: {
    amount: '',
    password: '',  // 비밀번호 입력
    confirmPw: '', // 비밀번호 확인
    weight: '',
    weightRange: '',
    showPassword: false,
    showConfirmPw: false,
  },
  setValues: (key, value) => set((state) => ({
    values: { ...state.values, [key]: value }
  })),
  toggleShowPassword: (key) => set((state) => ({
    values: { ...state.values, [key]: !state.values[key] }
  })),
  // 이메일 도메인 직접 입력
  isCustomDomain: false,
  setIsCustomDomain: (val) => set(() => ({ isCustomDomain: val })),
}));

export default useSignUpStore;
