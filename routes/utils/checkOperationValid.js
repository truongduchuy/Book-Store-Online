module.exports = (createdFields, allowedFields) => {
  return createdFields.every(item => allowedFields.includes(item));
};
