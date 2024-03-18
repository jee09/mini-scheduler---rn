import { atom } from "recoil";

// 로그인 시 유저 아이디 및 닉네임 저장
export type TUserInfoStateProps = {
  userId: string;
  userNm: string;
};
export const userInfoState = atom<TUserInfoStateProps | null>({
  key: "userInfo",
  default: null,
});
