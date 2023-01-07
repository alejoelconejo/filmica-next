export function getCountryFromPlace(place: string) {
  return place.split(' ').at(-1)
}
