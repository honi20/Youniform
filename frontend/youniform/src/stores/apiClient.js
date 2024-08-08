import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";

export const createApiClient = (accessToken) => {
  console.log("createApiClient 실행 중");
  if (accessToken) {
    console.log("createApiClient: accesToken이 존재합니다.");
  } else {
    console.log("createApiClient: accessToken이 없습니다.");
  }
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
};

const getAccessToken = () => {
  return (
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
  );
};
const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
    sessionStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
  }
};
export const getApiClient = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    console.log("getApiClient: accesToken이 존재합니다.");
  }
  const apiClient = createApiClient(accessToken);

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("토큰이 재발급 되었습니다.");
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log(error.response.data.body);
        try {
          setAccessToken(error.response.data.body);

          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;

          return apiClient(originalRequest); // 수정된 인스턴스 사용
        } catch (err) {
          console.error("토큰 재발급 실패:", err);
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};
