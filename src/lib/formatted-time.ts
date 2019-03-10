export const formattedTime = (time: number = 1): string => {
  const secNum = Math.ceil(time)
  const hours = Math.floor(secNum / 3600)
  const minutes = Math.floor((secNum - hours * 3600) / 60)
  const seconds = secNum - hours * 3600 - minutes * 60
  let formattedText = ""

  if (hours > 0) {
    formattedText += `${hours}:`
  }

  if (minutes < 10) {
    if (hours === 0) {
      formattedText += `${minutes}:`
    } else {
      formattedText += `0${minutes}:`
    }
  } else {
    formattedText += `${minutes}:`
  }

  if (seconds < 10) {
    formattedText += `0${seconds}`
  } else {
    formattedText += `${seconds}`
  }

  return formattedText
}
