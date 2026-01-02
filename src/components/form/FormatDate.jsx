function FormatDate(date) {
  if (!date) return ""
  const [ano, mes, dia] = date.split("-")
  return `${dia}/${mes}/${ano}`
}

export default FormatDate