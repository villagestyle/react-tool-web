import axios from "axios";

declare enum hitokotoType {
  a = "动画",
  b = "漫画",
  c = "游戏",
  d = "文学",
  e = "原创",
  f = "来自网络",
  g = "其他",
  h = "影视",
  i = "诗词",
  j = "网易云",
  k = "哲学",
  l = "抖机灵"
}

export default {
  hitokoto: (type?: keyof typeof hitokotoType) =>
    axios({
      method: "get",
      url: `https://v1.hitokoto.cn`,
      params: {
        c: type
      }
    })
};
