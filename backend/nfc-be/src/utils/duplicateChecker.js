export const checkDuplicateAdmin = async ({ email, phone_number, excludeId, Admin }) => {
  return Admin.findOne({
    $or: [...(email ? [{ email }] : []), ...(phone_number ? [{ phone_number }] : [])],
    ...(excludeId && { _id: { $ne: excludeId } }),
    is_deleted: false,
  });
};

export const checkDuplicateEmployee = async ({ email, phone_number, excludeId, Employee }) => {
  return Employee.findOne({
    $or: [...(email ? [{ email }] : []), ...(phone_number ? [{ phone_number }] : [])],
    ...(excludeId && { _id: { $ne: excludeId } }),
  });
};

export const checkDuplicateDepartment = async ({ name, email, excludeId, Department }) => {
  const query = {
    $or: [{ email }, { name: new RegExp(`^${name}$`, 'i') }],
    ...(excludeId && { _id: { $ne: excludeId } }),
  };
  return Department.findOne(query);
};
