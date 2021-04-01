import aliAPI from "../api/aliyun";
import { Config, uuid } from "./index";

export default class Upload {
  constructor() {
    this.createEle();
  }

  public domain = "";
  private uploadEle: HTMLInputElement = {} as HTMLInputElement;

  private createEle() {
    this.uploadEle = document.createElement("input");
    this.uploadEle.type = "file";
  }

  public uploadFile(src: File, stuffx?: string) {
    const formData = new FormData();
    const key = `${Config.SYS_NO}/` + uuid();
    formData.append("file", src);
    formData.append("name", key + '.' + stuffx);
    return aliAPI.fileUpload(formData)
  }

  public open(limit?: Limit) {
    return new Promise((resolve, reject) => {
      if (limit?.accept) {
        this.uploadEle.accept = limit.accept;
      }
      this.uploadEle.onchange = (e: any) => {
        const file = e.target.files[0];
        this.upload(file, limit)
          .then(ret => {
            this.uploadEle.value = "";
            resolve(ret);
          })
          .catch(err => {
            this.uploadEle.value = "";
            reject(err);
          });
      };
      this.uploadEle.click();
    });
  }

  public upload(
    file: File,
    limit?: Limit,
    beforeUpload?: Function
  ): Promise<{ url: string; name: string }> {
    return new Promise((resolve, reject) => {
      beforeUpload && beforeUpload();
      this.limitFile(file, limit)?.then((ret: CheckResult) => {
        if (ret.status) {
          const strs = file.name.split(".");
          const suffix = strs[strs.length - 1];
          this.uploadFile(file, suffix)
            .then(ret => {
              const result = ret.data.url;
              resolve({
                url: result,
                name: file.name
              });
            })
            .catch(err => {
              reject(err);
            });
        } else {
          reject({ ...ret, self: true });
        }
      });
    });
  }

  private limitFile(file: File, limit?: Limit): Promise<CheckResult> {
    let WHCheck: Promise<any> | null = null;
    let result: any = {
      status: true,
      err: ""
    };
    if (limit) {
      if (limit.size) {
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > limit.size) {
          result = {
            status: false,
            err: limit.sizeErrorMsg || "图片太大"
          };
        }
      }
      if (limit.width && limit.height) {
        WHCheck = new Promise(resolve => {
          const imgSrc = URL.createObjectURL(file);
          const imgReader = new Image();
          imgReader.src = imgSrc;
          imgReader.onload = () => {
            if (
              imgReader.width !== limit.width &&
              imgReader.height !== limit.height
            ) {
              resolve({
                status: false,
                err: limit.HWErrmsg || "图片尺寸错误"
              });
            } else {
              resolve({
                status: true
              });
            }
          };
        });
      }
      return new Promise(resolve => {
        if (!result.status) resolve(result);
        if (WHCheck) {
          WHCheck.then(ret => {
            resolve(ret);
          });
        } else {
          resolve(result);
        }
      });
    } else {
      return Promise.resolve({ status: true, err: "" });
    }
  }
}

interface CheckResult {
  status: boolean;
  err: string;
}

export interface Limit {
  accept?: string;
  types?: string[];
  size?: number;
  sizeErrorMsg?: string;
  height?: number;
  width?: number;
  HWErrmsg?: string;
}
