const formate = (date) => {
  date = new Date(Number(date));
  const y = date.getFullYear();
  const M = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${y}-${M}-${d} ${h}:${m}:${s}`;
};

export default formate;