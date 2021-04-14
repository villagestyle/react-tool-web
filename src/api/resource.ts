import { Resource } from "src/types";
import axios from "./config";

export default {
  /** 新增资源 */
  add: (data: Resource) =>
    axios({
      method: "post",
      url: "resource",
      data
    }),
  /** 获取资源 */
  info: (id: string) => axios.get(`resource/${id}`),
  /** 修改资源 */
  edit: (id: string, data: Resource) =>
    axios({
      method: "put",
      url: `resource/${id}`,
      data
    }),
  /** 删除资源 */
  remove: (id: string) => axios.delete(`resource/${id}`),
  /** 分页获取资源 */
  page: (data: PageFilterParams) =>
    axios({
      method: "post",
      url: `resource/page`,
      params: data
    }),
  /** 获取资源列表 */
  list: () => axios.get(`resource/list`)
};

interface PageFilterParams {
  rows?: number;
  pageNum?: number;
  name?: string;
  permission?: string;
}
