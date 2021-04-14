import axios from "./config";

export default {
  /** 新增角色 */
  add: (data: Role) =>
    axios({
      method: "post",
      url: "role",
      data
    }),
  /** 获取角色 */
  info: (id: string) => axios.get(`role/${id}`),
  /** 修改角色 */
  edit: (id: string, data: Role) =>
    axios({
      method: "put",
      url: `role/${id}`,
      data
    }),
  /** 删除角色 */
  remove: (id: string) => axios.delete(`role/${id}`),
  /** 分页获取角色 */
  page: (data: PageFilterParams) =>
    axios({
      method: "post",
      url: `role/page`,
      params: data
    }),
  /** 获取角色列表 */
  list: () => axios.get(`role/list`)
};

interface Role {
  name: string;
  resources: string[];
}

interface PageFilterParams {
  rows?: number;
  pageNum?: number;
  name?: string;
}
