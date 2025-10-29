import dayjs from "dayjs";
import * as yup from "yup";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const emailValidation = yup
  .string()
  .trim()
  .email("Enter a valid email")
  .lowercase()
  .required("Email is required");

const passwordValidation = (edit, confirm) =>
  yup
    .string()
    .trim()
    .when([], {
      is: () => !edit,
      then: (schema) =>
        schema
          .required(
            `${confirm ? `${confirm} password` : "Password"} is required`
          )
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/,
            `${
              confirm ? `${confirm} password` : "Password"
            } must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces`
          ),
      otherwise: (schema) =>
        schema.test(
          "password-optional-check",
          `${
            confirm ? `${confirm} password` : "Password"
          } must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces`,
          (value) => {
            if (!value) return true;
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/.test(
              value
            );
          }
        ),
    });

export const newPasswordValidation = (
  currentField = "current_password",
  label = "New"
) =>
  yup
    .string()
    .trim()
    .required(`${label} password is required`)
    .notOneOf(
      [yup.ref(currentField)],
      `${label} password must be different from current password`
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/,
      `${label} password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces`
    );

const codeValidation = yup
  .string()
  .required("Verification code is required")
  .matches(/^\d{6}$/, "Code must be exactly 6 digits");

const imageValidation = yup
  .mixed()
  .test("required", "Image is required", (value) => {
    return value instanceof File || typeof value === "string";
  })
  .test("fileSize", "File size too large", (value) => {
    if (!value || !(value instanceof File)) return true;
    return value.size <= 5 * 1024 * 1024;
  })
  .test("fileType", "Only JPEG, PNG, and WEBP formats are allowed", (value) => {
    if (!value || !(value instanceof File)) return true;
    return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
  });

const nameValidation = (label = "Department") =>
  yup
    .string()
    .trim()
    .required(`${label} name is required`)
    .max(100, "Name can be up to 100 characters")
    .matches(
      /[a-zA-Z]/,
      "Department name must include at least one alphabet character"
    );

const companyNameValidation = yup
  .string()
  .required("Company name is required")
  .max(150, "Company name must not exceed 150 characters");

const departmentNameValidation = yup
  .string()
  .trim()
  .required("Department name is required")
  .max(100, "Name can be up to 100 characters")
  .matches(
    /[a-zA-Z]/,
    "Department name must include at least one alphabet character"
  );

const websiteLinkValidation = yup
  .string()
  .nullable()
  .transform((value) => (value ? value.toLowerCase() : null))
  .url("Invalid website URL")
  .notRequired();

const establishedValidation = yup
  .string()
  .max(30, "Established field must not exceed 30 characters")
  .notRequired();

const addressValidation = yup
  .string()
  .trim()
  .required("Address is required")
  .max(500, "Address must not exceed 500 characters");

const buttonNameValidation = yup
  .string()
  .max(50, "Button name must not exceed 50 characters")
  .notRequired();

const redirectedUrlValidation = yup
  .string()
  .nullable()
  .transform((value) => (value ? value.toLowerCase() : null))
  .url("Invalid redirect URL")
  .notRequired();

const noOfEmpolyeesValidation = yup
  .number()
  .typeError("Must be a number")
  .min(1, "Must be at least 1");

const dateTimeValidation = (label) =>
  yup
    .date()
    .required(`${label} date is required`)
    .typeError("Invalid date format")
    .max(
      dayjs().endOf("day").toDate(),
      `${label} date cannot be in the future`
    );
const departmentValidation = yup.string().required("Department is required");

const phoneNumberValidation = yup
  .string()
  .matches(
    /^\+?\d+$/,
    "Phone number must be digits only (optionally starting with +)"
  )
  .min(7, "Phone number is too short")
  .max(15, "Phone number is too long")
  .required("Phone number is required");

const secondPhoneNumberValidation = yup
  .string()
  .matches(
    /^\+?\d+$/,
    "Phone number must be digits only (optionally starting with +)"
  )
  .min(7, "Phone number is too short")
  .max(15, "Phone number is too long")
  .required("Phone number is required");

const ageValidation = yup
  .number()
  .typeError("Age must be a number")
  .min(18, "Minimum age is 18")
  .max(100, "Maximum age is 100")
  .required("Age is required");

const urlValidation = yup
  .string()
  .url("Must be a valid URL")
  .required("URL is required");

const designationValidation = yup
  .string()
  .trim()
  .required("Designation is required")
  .test(
    "not-numeric-only",
    "Designation cannot be only numbers",
    (value) => !/^\d+$/.test(value || "")
  );

const departmentIdValidation = yup
  .string()
  .required("Department is required")
  .matches(objectIdRegex, "Invalid department ID");

const aboutMeValidation = yup
  .string()
  .trim()
  .required("About employee is required")
  .max(500, "About employee can be up to 500 characters");

const facebookValidation = yup
  .string()
  .trim()
  .lowercase()
  .url("Invalid Facebook URL")
  .nullable()
  .notRequired();

const linkedInValidation = yup
  .string()
  .trim()
  .lowercase()
  .url("Invalid LinkdIn URL")
  .nullable()
  .notRequired();

const instagramValidation = yup
  .string()
  .trim()
  .lowercase()
  .url("Invalid Instagram URL")
  .nullable()
  .notRequired();

const youtubeValidation = yup
  .string()
  .trim()
  .lowercase()
  .url("Invalid YouTube URL")
  .nullable()
  .notRequired();

export {
  emailValidation,
  passwordValidation,
  codeValidation,
  imageValidation,
  nameValidation,
  companyNameValidation,
  departmentNameValidation,
  websiteLinkValidation,
  establishedValidation,
  addressValidation,
  buttonNameValidation,
  redirectedUrlValidation,
  noOfEmpolyeesValidation,
  dateTimeValidation,
  departmentValidation,
  phoneNumberValidation,
  secondPhoneNumberValidation,
  ageValidation,
  linkedInValidation,
  urlValidation,
  designationValidation,
  departmentIdValidation,
  aboutMeValidation,
  facebookValidation,
  instagramValidation,
  youtubeValidation,
};
