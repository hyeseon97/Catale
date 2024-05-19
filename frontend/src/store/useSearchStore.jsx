import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSearchStore = create(
  persist(
    (set) => {
      set({
        searchtrue: false, // 기본값을 false로 설정
        cocktail: [], // 검색 결과를 담을 배열
        setSearchTrue: (value) => {
          set({ searchtrue: value });
        },
        setCocktailList: (cocktailList) => {
          set({ cocktail: cocktailList });
        },
      });
    },
    {
      name: "search-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useSearchStore;
