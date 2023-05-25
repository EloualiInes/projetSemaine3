trimObjectValues = (obj) => {
  const trimmedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        trimmedObj[key] = value.trim();
      } else {
        trimmedObj[key] = value;
      }
    }
  }
  return trimmedObj;
}

module.exports = { trimObjectValues }