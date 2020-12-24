import { StoreValue } from "antd/lib/form/interface";
import { RuleObject } from "antd/lib/form";
import moment from "moment";
import { store } from "src";
import Md5 from 'md5';

export class Config {
  public static readonly SYS_NO = "tool";
  public static readonly SUCCESS_MSG = "操作成功！";
  public static readonly INT_BOOLEAN_TRUE = 1;
  public static readonly INT_BOOLEAN_FALSE = 0;
  public static readonly API_KEY = "";
  public static readonly USE_MOCK = false;
  public static readonly DEBUG_MODE = false;
}

export const InitPaginConfig = {
  current: 1,
  total: 0,
  showSizeChanger: true,
  pageSize: 6,
  pageSizeOptions: ["6", "10", "20", "30", "40", "50"],
  showTotal: (total: number) => `共${total}条`
};

export const InitPaginConfig2 = {
  showSizeChanger: true,
  pageSizeOptions: ["6", "10", "20", "30", "40", "50"],
  showTotal: (total: number) => `共${total}条`
};

export const getYearList = () => {
  const curYear = new Date().getFullYear();
  const arr: number[] = [];
  new Array(30).fill("1").map((d, i) => arr.push(curYear - i));
  return arr;
};

export const exportDownload = (
  data: any,
  title?: string,
  defaultOptions = {
    type: "application/vnd.ms-excel application/x-excel",
    suffix: ".xls"
  }
) => {
  let elea = document.createElement("a");
  var blob = new Blob([data], {
    type: defaultOptions.type
  });
  var objectUrl = URL.createObjectURL(blob);
  elea.href = objectUrl;
  elea.download = title + defaultOptions.suffix;
  elea.click();
  elea.remove();
};

export const IntValidator = (rule: RuleObject, value: StoreValue) => {
  if (!value || typeof value !== "number") {
    return Promise.resolve();
  }
  if (Math.floor(value) !== value) {
    return Promise.reject("不能是小数");
  }
  return Promise.resolve();
};

export const PositiveNumberValidator = (
  rule: RuleObject,
  value: StoreValue
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (isNaN(Number(value))) {
    return Promise.reject("请输入数字");
  }
  if (value < 0) {
    return Promise.reject("不能小于0");
  }
  return Promise.resolve();
};

export const TeamValidator = (value: StoreValue, formData: StoreValue) => {
  if (!value) {
    return Promise.resolve();
  }
  const targetYear = formData.targetYear;
  const arr = [
    `${targetYear - 1}-${targetYear}-2`,
    `${targetYear}-${targetYear + 1}-1`
  ];
  if (arr.includes(value)) {
    return Promise.resolve();
  }
  return Promise.reject("请选择正确的学期名称");
};

export const CellPhoneValidator = (rule: StoreValue, value: StoreValue) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return Promise.reject("手机号码格式错误");
  }
  return Promise.resolve();
};

export const PasswordValidator = (rule: StoreValue, value: StoreValue) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)) {
    return Promise.reject("密码需包含数字和大小写字母, 8-16位字符");
  }
  return Promise.resolve();
};

export const DeleteIndex = (arr: any[], index: number) => {
  return arr.filter((d, i) => i !== index);
};

export const AddIndex = (arr: any[], val: any, index: number) => {
  return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
};

export const uuid = () => {
  const s: any[] = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  const uuid = moment(new Date()).format("YYYYMMDDHHmmss") + s.join("");
  return uuid;
};

export const DifferenceCheck = (
  pre: string[],
  cur: string[],
  type: "del" | "add"
) => {
  if (type === "del") {
    return pre.filter(d => !cur.includes(d));
  } else {
    return cur.filter(d => !pre.includes(d));
  }
};

export const FormatTime = (date: string | number, format = "YYYY-MM-DD") => {
  if (!date) return "";
  return moment(date).format(format);
};

export const ReorderIndex = (arr: any[]) => {
  const result = arr.map((d, index) => {
    return {
      ...d,
      index: index + 1
    };
  });
  return result;
};

export const CompareDate = (date1: string | number, date2: string | number) => {
  date1 = new Date(moment(date1).format("YYYY-MM-DD")).getTime() / 1000;
  date2 = new Date(moment(date2).format("YYYY-MM-DD")).getTime() / 1000;

  if (date1 === date2) {
    return 0;
  } else if (date1 > date2) {
    return 1;
  } else {
    return 2;
  }
};

export const et = (url: string) => {
  const time = moment(Date.now()).format("X");
  const verify = Md5(Config.API_KEY + url + time);
  const token = btoa(
    `${time}:${verify}:${
      store.getState().user.token ? store.getState().user.token : ""
    }`
  );
  return token;
};
