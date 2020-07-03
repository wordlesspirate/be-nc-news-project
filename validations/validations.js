isNumber = (value) => Number(value) !== NaN && value % 1 === 0;

isPositiveNumber = (value) => isNumber(value) && Number(value) > 0;

isStringNotEmpty = (value) => typeof value === "string" && value.length > 0;

isValidOrder = (order) => order === "asc" || order === "desc"

module.exports = {
  isNumber,
  isPositiveNumber,
  isStringNotEmpty,
  isValidOrder,
}