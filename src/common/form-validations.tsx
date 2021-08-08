export const maximumCharacters = function (value: any, mode: any) {
  const char_Regex =
    mode === "summary"
      ? new RegExp(/^[a-zA-Z]{3,150}$/g)
      : new RegExp(/^[a-zA-Z]{10,500}$/g);
  if (char_Regex.test(value)) {
    return true;
  }
  return false;
};
