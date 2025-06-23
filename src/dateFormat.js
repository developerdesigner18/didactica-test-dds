export function toDate(date) {
  // returns same as moment(date).toDate()
  return new Date(Date.parse(`${date} 00:00:00`)).toString();
}

export function format(date) {
  // returns same aas moment(date).format("DD/MM/YYYY")
  return new Date(Date.parse(date)).toLocaleDateString("en-GB");
}
