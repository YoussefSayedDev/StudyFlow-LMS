export const persistAuth = (token: string) => {
  localStorage.setItem("token", token);
};

export const clearAuth = () => {
  localStorage.removeItem("token");
};

export const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};
