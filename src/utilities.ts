
export const checkLength = ((value: string): boolean => {
  if (value.length >= 3) return true
  return false
})

export const isUserBG = (playerName:string, userName:string) => {
  if (playerName === userName) return "primary.main"
  return ""
}

export const isUserTxt = (playerName:string, userName:string) => {
  if (playerName === userName) return "white"
  return "initial"
}