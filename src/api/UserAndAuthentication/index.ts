import axiosClient from "../axiosClient";

interface IUserLoginModel {
  email: String;
  password: String;
}

interface IUserRegisterModel {
  username: String;
  email: String;
  password: String;
}

interface IUserUpdateModel {
  email?: String;
  token?: String;
  username?: String;
  bio?: String;
  image?: String;
  password?: String;
}

const UserAndAuthenAPI = {
  getCurrentUser: () => {
    const url = "/user";
    return axiosClient.get(url);
  },

  postExistingUserLogin: (user: IUserLoginModel) => {
    const url = "/users/login";
    return axiosClient.post(url, {
      user,
    });
  },

  postRegisterANewUser: (user: IUserRegisterModel) => {
    const url = "/users";
    return axiosClient.post(url, {
      user,
    });
  },

  putUpdateCurrentUser: (user: IUserUpdateModel) => {
    const url = "/user";
    return axiosClient.put(url, {
      user,
    });
  },
};

export default UserAndAuthenAPI;
