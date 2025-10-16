//获取随机颜色
export default function rdmRgbColor() {
  //随机生成RGB颜色
  let arr = []
  for (let i = 0; i < 3; i++) {
    // // 暖色
    // arr.push(Math.floor(Math.random() * 128 + 64))
    // 亮色
    arr.push(Math.floor(Math.random() * 128 + 128))
  }
  let [r, g, b] = arr
  // rgb颜色
  // var color=`rgb(${r},${g},${b})`;
  // 16进制颜色
  return `#${
    r.toString(16).length > 1 ? r.toString(16) : '0' + r.toString(16)
  }${g.toString(16).length > 1 ? g.toString(16) : '0' + g.toString(16)}${
    b.toString(16).length > 1 ? b.toString(16) : '0' + b.toString(16)
  }`
}
