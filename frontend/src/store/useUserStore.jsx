import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        memberId: "",
        email: "",
        nickname: "",
        profileImageUrl: "",
        profileImageId: "",
        alc: 0, // 숫자로 초기화
        sweet: 0, // 숫자로 초기화
        sour: 0, // 숫자로 초기화
        bitter: 0, // 숫자로 초기화
        sparking: 0, // 숫자로 초기화
        social: "",
        check: "",
      },
      setUser: (user) => {
        set({ user: user });
      },
    }),
    {
      name: "user-storage", // 로컬 스토리지에 저장될 때 사용될 키 이름
      getStorage: () => localStorage, // 사용할 스토리지 종류를 지정 (여기서는 localStorage)
    }
  )
);

export default useUserStore;

/* 꺼내서 쓰는 코드
 */
//  const memberId = useUserStore(state => state.user.memberId);
