export interface ILoginUser {
  email: String;
  password: String;
}

export interface ILoginUserRequest {
  user: ILoginUser;
}

export interface INewUser {
  username: String;
  email: String;
  password: String;
}

export interface INewUserRequest {
  user: INewUser;
}

export interface IUser {
  email: String;
  token: String;
  username: String;
  bio: String;
  image: String;
}

export interface IUserResponse {
  user: IUser;
}

export interface IUpdateUser {
  email?: String;
  token?: String;
  username?: String;
  bio?: String;
  image?: String;
}

export interface IUpdateUserRequest {
  user: IUpdateUser;
}

export interface IProfile {
  username: String;
  bio: String;
  image: String;
  following: Boolean;
}

export interface IProfileResponse {
  profile: IProfile;
}
