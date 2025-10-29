import {
  Marketing,
  HR,
  SoftwareEngineering,
  BusinessDevelopment,
  Devops,
  Sales,
  UIUX,
} from "../assets/images/pngs";

const ROWS = [
  {
    id: 1,
    image: Marketing,
    name: "Marketing",
    email: "Marketing@gmail.com",
    no_of_empolyee: 193,
    creation_time: "Apr 12, 2023, 14:02:52",
  },
  {
    id: 2,
    image: HR,
    name: "Human Resources",
    email: "Human Resources @gmail.com",
    no_of_empolyee: 193,
    creation_time: "Apr 12, 2023, 14:02:52",
  },
  {
    id: 3,
    image: SoftwareEngineering,
    name: "Software Engineering",
    email: "Software Engineering@gmail.com",
    no_of_empolyee: 193,
    creation_time: "Apr 12, 2023, 14:02:52",
  },
  {
    id: 4,
    image: BusinessDevelopment,
    name: "Business Development",
    email: "Business Development@gmail.com",
    no_of_empolyee: 193,
    creation_time: "Apr 12, 2023, 14:02:52",
  },
  {
    id: 5,
    image: Devops,
    name: "DevOps",
    email: "DevOps@gmail.com",
    no_of_empolyee: 193,
    creation_time: "Apr 12, 2023, 14:02:52",
  },
  {
    id: 6,
    image: Sales,
    name: "Sales",
    email: "Sales@gmail.com",
    no_of_empolyee: 193,
    creation_time: "Apr 12, 2023, 14:02:52",
  },
  {
    id: 7,
    image: UIUX,
    name: "UX & UI",
    email: "UX & UI@gmail.com",
    no_of_empolyee: 193,
    creation_time: "Apr 12, 2023, 14:02:52",
  },
];

const ADD = "add new admin";
const RESETPASSWORD = "Reset password";
const EDIT = "edit";

const ADMINTFIELDSCONFIG = [
  {
    name: "profile_image",
    label: "Upload Profile",
    type: "file",
    placeholder: "Upload image",
  },
  {
    name: "full_name",
    label: "Admin Name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter phone number",
  },
];

const RESETPASSWORDFIELDSCONFIG = [
  {
    name: "new_password",
    label: "New password",
    type: "password",
    placeholder: "Enter new password",
  },
];

const CHANGEPASSWORDFIELDS = [
  {
    name: "current_password",
    label: "Current Password",
    type: "password",
    placeholder: "Enter current password",
  },
  {
    name: "new_password",
    label: "New Password",
    type: "password",
    placeholder: "Enter new password",
  },
];

export {
  ROWS,
  ADD,
  EDIT,
  RESETPASSWORD,
  ADMINTFIELDSCONFIG,
  CHANGEPASSWORDFIELDS,
  RESETPASSWORDFIELDSCONFIG,
};
