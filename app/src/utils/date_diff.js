export function dateDiff(expired_day) {
  const date1 = new Date();
  const date2 = new Date(expired_day);

  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
