import {
  User1,
  User2,
  User3,
  User4,
  User5,
  User6,
  User7,
} from "../assets/images/pngs";

const ROWS = [
  {
    id: 1,
    image: User1,
    name: "Savannah Nguyen",
    email: "Savannah Nguyen@gmail.com",
    department: "Marketing",
    phone_number: "(307) 555-0133",
    age: "23",
    joining_date: "1/15/12",
  },
  {
    id: 2,
    image: User2,
    name: "Cameron Williamson",
    email: "Cameron Williamson @gmail.com",
    department: "Human Resources",
    phone_number: "(629) 555-0129",
    age: "23",
    joining_date: "9/23/16",
  },
  {
    id: 3,
    image: User3,
    name: "Robert Fox",
    email: "Robert Fox@gmail.com",
    department: "Software Engineering",
    phone_number: "(208) 555-0112",
    age: "23",
    joining_date: "11/7/16",
  },
  {
    id: 4,
    image: User4,
    name: "Jenny Wilson",
    email: "Jenny Wilson@gmail.com",
    department: "Business Development",
    phone_number: "(205) 555-0100",
    age: "23",
    joining_date: "2/11/12",
  },
  {
    id: 5,
    image: User5,
    name: "Floyd Miles",
    email: "Floyd Miles@gmail.com",
    department: "DevOps",
    phone_number: "(225) 555-0118",
    age: "23",
    joining_date: "6/21/19",
  },
  {
    id: 6,
    image: User6,
    name: "Kathryn Murphy",
    email: "Kathryn Murphy@gmail.com",
    department: "Sales",
    phone_number: "(252) 555-0126",
    age: "23",
    joining_date: "8/30/14",
  },
  {
    id: 7,
    image: User7,
    name: "Guy Hawkins",
    email: "Guy Hawkins@gmail.com",
    department: "UX & UI",
    phone_number: "(319) 555-0115",
    age: "23",
    joining_date: "4/21/12",
  },
];

const ADD = "add new employee";
const EDIT = "edit";

const EMPOLYEEFIELDSCONFIG = [
  {
    name: "profile_image",
    label: "Upload Profie Image",
    type: "file",
    placeholder: "Upload Profie",
  },
  {
    name: "name",
    label: "Employee Name",
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
    name: "department_id",
    label: "Department name",
    type: "dropdown",
    placeholder: "Select department",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
    inputProps: {
      pattern: "^\\+?\\d{7,15}$",
      inputMode: "numeric",
    },
  },
  {
    name: "second_phone_number",
    label: "Second Phone Number",
    type: "tel",
    placeholder: "Enter second phone number",
    inputProps: {
      pattern: "^\\+?\\d{7,15}$",
      inputMode: "numeric",
    },
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter age",
  },
  {
    name: "joining_date",
    label: "Date of Joining",
    type: "date",
    placeholder: "Enter date of joining",
  },
  {
    name: "designation",
    label: "Employee Designation",
    type: "text",
    placeholder: "Enter employee designation",
  },
  {
    name: "about_me",
    label: "About Employee",
    type: "textarea",
    placeholder: "Enter employee details",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",

    placeholder: "Enter address",
  },
  {
    name: "facebook",
    label: "Facebook URL",
    type: "text",
    placeholder: "Enter facebook URL",
  },
  {
    name: "instagram",
    label: "Instagram URL",
    type: "text",
    placeholder: "Enter instagram URL",
  },
  {
    name: "linkedin",
    label: "Linkedin URL",
    type: "text",
    placeholder: "Enter Linkedin URL",
  },
  {
    name: "youtube",
    label: "Youtube URL",
    type: "text",
    placeholder: "Enter youtube URL",
  },
];

export { ROWS, ADD, EDIT, EMPOLYEEFIELDSCONFIG };
