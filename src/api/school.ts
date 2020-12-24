import axios from "./config";

export default {
  /** 根据编号获取学校 */
  byNo: (no: string) => axios.get(`basic/school/no`, { params: { no } }),
  /** 根据id获取学校信息 */
  byId: (id: string) => axios.get(`basic/school/${id}`),
  /** 获取下拉可选院系 */
  departmentList: (schoolId: string, includeDisabled: 0 | 1) =>
    axios.get(`basic/department/selectable`, {
      params: { schoolId, includeDisabled }
    }),
  /** 获取下拉可选专业 */
  majorList: (data: {
    schoolId: string;
    departmentId?: string;
    includeDisabled?: 0 | 1;
  }) => axios.get(`basic/major/selectable`, { params: data })
};
