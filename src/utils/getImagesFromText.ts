export default (textHtml: string) => {
  const imageURLRegEx = /<img[^>]+src="?([^"\s]+)"?\s*/g
  return imageURLRegEx.exec(textHtml)
}
