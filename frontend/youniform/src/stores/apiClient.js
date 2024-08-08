import axios from "axios";
const API_URL = "http://i11a308.p.ssafy.io:8080";

const createApiClient = (accessToken) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
};

// Axios 인스턴스를 생성합니다
const apiClient = createApiClient();

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      // 토큰 재발급 로직
      originalRequest._retry = true;
      console.log(error.response);
      try {
        // refreshToken을 사용하여 새로운 accessToken을 받아옴
        const response = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken: getRefreshToken(),
        });

        // 새로운 accessToken을 저장
        setAccessToken(response.data.accessToken);

        // 원래의 요청에 새로운 accessToken을 추가하여 재요청
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 재발급에 실패한 경우 (로그인 페이지로 리디렉션 등)
        console.error("토큰 재발급 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const getApiClient = () => {
  return createApiClient();
};
