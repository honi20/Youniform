import axios from "axios";
import useUserStore from "./userStore";
const API_URL = "http://i11a308.p.ssafy.io:8080";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useUserStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (response) => {
    console.log(response);
    // 액세스 토큰이 응답의 일부로 반환될 때 토큰을 업데이트합니다.
    if (response.data && response.data.body && response.data.body.accessToken) {
      const { accessToken } = response.data.body;
      useUserStore.getState().setAccessToken(accessToken);
    }
    return response;
  },
  async (error) => {
    const { response, config } = error;
    // if (response && response.status === 401) {
    //   const { refreshToken } = useUserStore.getState();
    //   if (!refreshToken) return Promise.reject(error);

    //   try {
    //     // Refresh token을 이용하여 새로운 액세스 토큰을 요청합니다.
    //     const refreshResponse = await axios.post(
    //       `${API_URL}/auth/refresh-token`,
    //       { refreshToken }
    //     );
    //     const newAccessToken = refreshResponse.data.body.accessToken;

    //     // 새 액세스 토큰을 zustand 스토어에 저장합니다.
    //     useUserStore.getState().setAccessToken(newAccessToken);

    //     // 실패한 요청을 새 액세스 토큰을 사용하여 다시 시도합니다.
    //     config.headers.Authorization = `Bearer ${newAccessToken}`;
    //     return apiClient(config);
    //   } catch (refreshError) {
    //     useUserStore.getState().clearTokens();
    //     return Promise.reject(refreshError);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
