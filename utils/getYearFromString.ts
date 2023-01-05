export default function getYearFromString(strDate: string) {
  const date = new Date(strDate)
  return date.getFullYear()
}
