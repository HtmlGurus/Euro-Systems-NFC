export const formatAdminResponse = (admin, includeImage = true) => {
  const formatted = {
    id: admin._id,
    full_name: admin.full_name,
    email: admin.email,
    email_verified: admin.email_verified,
    phone_number: admin.phone_number,
    role: admin.role,
  };

  if (includeImage && admin.profile_image?.image_url) {
    formatted.image_url = admin.profile_image.image_url;
  }

  return formatted;
};