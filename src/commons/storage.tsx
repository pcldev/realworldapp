import _ from "lodash";
export const getUser = () => {
  try {
    const data: any = localStorage.getItem("TOKEN");
    if (!_.isObject(data)) {
      return JSON.parse(data);
    }
    return data;
  } catch (err) {
    return null;
  }
};

export const setUser = (data: any) => {
  localStorage.setItem("TOKEN", JSON.stringify(data));
};

export const deleteToken = () => {
  try {
    return localStorage.removeItem("TOKEN");
  } catch (error) {
    return false;
  }
};

export const clearLocalStorage = () => {
  try {
    return localStorage.clear();
  } catch (error) {
    return null;
  }
};
