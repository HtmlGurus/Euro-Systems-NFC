import * as yup from "yup";

import {
  aboutMeValidation,
  addressValidation,
  ageValidation,
  buttonNameValidation,
  codeValidation,
  companyNameValidation,
  dateTimeValidation,
  departmentNameValidation,
  departmentValidation,
  designationValidation,
  emailValidation,
  establishedValidation,
  facebookValidation,
  imageValidation,
  instagramValidation,
  linkedInValidation,
  nameValidation,
  newPasswordValidation,
  // noOfEmpolyeesValidation,
  passwordValidation,
  phoneNumberValidation,
  redirectedUrlValidation,
  secondPhoneNumberValidation,
  websiteLinkValidation,
  youtubeValidation,
} from "./validations";

const loginFormSchema = yup.object({
  email: emailValidation,
  password: passwordValidation(),
});

const verifyEmailSchema = yup.object({
  code: codeValidation,
});

const companyProfileFormSchema = yup.object({
  profile_image: imageValidation,
  company_name: companyNameValidation,
  website_link: websiteLinkValidation,
  established: establishedValidation,
  address: addressValidation,
  button_name: buttonNameValidation,
  button_redirect_url: redirectedUrlValidation,
});

const departmentFormSchema = yup.object({
  image: imageValidation,
  name: departmentNameValidation,
  email: emailValidation,
  // employee_count: noOfEmpolyeesValidation,
  // created_at: dateTimeValidation("Creation"),
});

const employeeFormSchema = yup.object({
  profile_image: imageValidation,
  name: nameValidation("Employee"),
  email: emailValidation,
  department_id: departmentValidation,
  phone_number: phoneNumberValidation,
  second_phone_number: secondPhoneNumberValidation,
  age: ageValidation,
  joining_date: dateTimeValidation("Joining"),
  designation: designationValidation,
  about_me: aboutMeValidation,
  address: addressValidation,
  facebook: facebookValidation,
  linkedin: linkedInValidation,
  instagram: instagramValidation,
  youtube: youtubeValidation,
});

const adminFormSchema = (edit) =>
  yup.object({
    profile_image: imageValidation,
    full_name: nameValidation("Admin"),
    email: emailValidation,
    phone_number: phoneNumberValidation,
    password: passwordValidation(edit),
  });

const changePasswordSchema = yup.object({
  current_password: passwordValidation(),
  new_password: newPasswordValidation(),
});

const resetPasswordSchema = yup.object({
  new_password: passwordValidation("", "New"),
});

export {
  loginFormSchema,
  verifyEmailSchema,
  companyProfileFormSchema,
  departmentFormSchema,
  employeeFormSchema,
  adminFormSchema,
  changePasswordSchema,
  resetPasswordSchema,
};
