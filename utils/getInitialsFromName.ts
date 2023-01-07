export function getInitialsFromFullName(fullname: string) {
  const nameSplitted = fullname.split(' ')
  return nameSplitted.reduce((acc, val) => acc + val[0], '')
}
