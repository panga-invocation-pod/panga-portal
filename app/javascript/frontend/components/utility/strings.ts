export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const nameToTitle = (name: string) =>
  capitalizeFirstLetter(name.replace(/_/g, " "))
