export const storeToken = (name: string, token: string) => {
  sessionStorage.setItem(name, token);
};
