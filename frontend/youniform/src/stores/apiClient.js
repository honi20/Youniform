import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const createApiClient = (accessToken) => {
  if (!accessToken) {
    console.error("createApiClient: accessToken이 제공되지 않았습니다.");
    throw new Error("Access token is required to create an API client.");
  }
  // // console.log(accessToken)
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const isLoggedIn = () => {
  const accessToken = getAccessToken();
  return !!accessToken; // accessToken이 있으면 true, 없으면 false를 반환
};
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
export const clearAccessToken = () => {
  return localStorage.removeItem("accessToken");
};
const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};
export const getApiClient = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    // // console.log("getApiClient: accesToken이 존재합니다.");
  }
  const apiClient = createApiClient(accessToken);

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      // console.log(error.message);
      // // console.log('test1', accessToken)
      
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          if (error.response.data.body){
            setAccessToken(error.response.data.body);
          } else {
            return;
          }
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${error.response.data.body}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${error.response.data.body}`;

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
