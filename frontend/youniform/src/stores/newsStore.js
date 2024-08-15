import { create } from "zustand";
import axios from "axios";

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

const useNewsStore = create((set, get) => ({
  news: {}, // 선수별 뉴스 저장하는 객체 { [playerId]: [] }
  page: 1, // 현재 페이지
  hasMore: true, // 뉴스 존재 여부

  fetchTotalNews: async (playerList) => {
    // console.log(playerList);
    const { page, hasMore } = get();
    if (!hasMore) return;
    
    console.log("뉴스를 불러옵니다.");
    try {
      const newsPromises = playerList.map((player) => {
        return axios
          .get(`https://openapi.naver.com/v1/search/news.json`, {
            headers: {
              "X-Naver-Client-Id": NAVER_CLIENT_ID,
              "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
            },
            params: {
              query: player.name,
              display: 10,
              start: (page - 1) * 10 + 1,
            },
          })
          .then((response) => (
            {
            playerId: player.playerId,
            news: response.data.items || [],
            total: response.data.total,
          }));
      }
    );
    

      const results = await Promise.all(newsPromises);
      const newsMap = results.reduce((acc, { playerId, news }) => {
        acc[playerId] = (acc[playerId] || []).concat(news);
        return acc;
      }, {});


      const totalNews = results.reduce(
        (total, { total: playerTotal }) => total + playerTotal,
        0
      );

      set((state) => ({
        news: {
          ...state.news,
          ...newsMap,
        },
        page: state.page + 1, // 다음 페이지로 이동
        hasMore: totalNews > (state.page - 1) * 10 * playerList.length, // 더 많은 뉴스가 있는지 확인
      }));
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  },

  // 특정 선수의 뉴스 가져오기
  fetchTeamNews: async (team) => {
    console.log("test", team)
    if (team){
      console.log("팀 뉴스 조회")
    try {
      const response = await axios.get(`https://openapi.naver.com/v1/search/news.json`, {
        headers: {
          "X-Naver-Client-Id": NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        },
        params: {
          query: team.name,
          display: 10,
        },
      });
      console.log(response.data)
      set((state) => ({
        news: {
          ...state.news,
          [1000]: (state.news[1000] || []).concat(response.data.items || []),
        },
      }));
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  }
},

  // 특정 선수의 뉴스 반환
  getPlayerNews: (playerId) => {
    return get().news[playerId] || [];
  },

  // 전체 선수의 뉴스를 합친 총 뉴스 반환
  getTotalNews: () => {
    return Object.values(get().news).flat();
  },
}));

export default useNewsStore;
