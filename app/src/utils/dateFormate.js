const formate = (date) => {
  date = new Date(Number(date));
  const D = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
  for (let ele in D) {
    if (D[ele] < 10) {
      D[ele] = '0' + D[ele];
    } else {
      D[ele] = String(D[ele]);
    }
  }
  return `${D.y}-${D.M}-${D.d} ${D.h}:${D.m}:${D.s}`;
};

export default formate;