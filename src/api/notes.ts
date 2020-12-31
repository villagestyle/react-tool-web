import axios from "./config";

export default {
  /** 新增备忘 */
  add: (data: AddNotesData) =>
    axios({
      method: "post",
      url: `notes`,
      data
    }),
  list: (screen: NotesScreen) => axios.get(`notes/list`, { params: screen })
};

export interface AddNotesData {
  name: string;
  date: string;
  content: string;
}

export interface NotesScreen {
  mode: NotesScreenMode;
  beginDate: string;
  endDate: string;
}

export type NotesScreenMode = "year" | "month";
