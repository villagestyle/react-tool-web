import axios, { postForm } from "./config";
import { LoginData, Screen, StaffFile, RegisterData } from "src/types";

export default {
  /** 登录 */
  login: (data: LoginData) => postForm(`user/login`, data),
  /** 注册学生用户 */
  register: (data: RegisterData) =>
    postForm("user/register", data),
  /** 动态验证码 */
  captcha: (token: string) =>
    axios.get(`captcha`, {
      params: { token },
      responseType: "blob"
    }),
  /** 登出 */
  logout: () => axios.post(`user/logout`),
  /** 分页获取系统用户 */
  page: (data: PageScreen) =>
    axios({
      method: "post",
      url: `user/page`,
      params: data
    }),
  /** 获取系统用户信息 */
  info: (id: string | number) => axios.get(`user/${id}`),
  /** 新增系统用户 */
  add: (data: StaffFile) =>
    axios({
      method: "post",
      url: `user`,
      data
    }),
  /** 修改系统用户 */
  edit: (data: StaffFile, id: string | number) =>
    axios({
      method: "put",
      url: `user/${id}`,
      data
    }),
  /** 删除用户 */
  remove: (id: string) => axios.delete(`user/${id}`),
  /** 重置用户密码 */
  resetPWD: (id: string) => axios.put(`user/reset_password/${id}`),
  /** 修改密码 */
  changePWD: (data: { oldPassword: string; newPassword: string }) =>
    postForm(`user/change_password`, data, "put"),
  /** 获取当前登录用户的权限列表 */
  resource: () => axios.get('user/resource')
};

export interface PageScreen extends Screen {
  name?: string;
  no?: string;
  roleId?: number;
  state?: 1 | 2;
}

export interface StaffPageScreen {
  page: number;
  rows: number;
  params?: any;
}
