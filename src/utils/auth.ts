export const persistToken = (token: string) => {
  localStorage.setItem("studyflow-token", token);
};

export const persistRefreshToken = (token: string) => {
  localStorage.setItem("studyflow-refresh-token", token);
};

export const clearToken = () => {
  localStorage.removeItem("studyflow-token");
};

export const clearRefreshToken = () => {
  localStorage.removeItem("studyflow-refresh-token");
};

export const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("studyflow-token");
};

export const getStoredRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("studyflow-refresh-token");
};
