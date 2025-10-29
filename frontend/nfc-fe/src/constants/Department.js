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

const ADD = "add new department";
const EDIT = "edit";

const DEPARTMENTFIELDSCONFIG = [
  {
    name: "name",
    label: "Department Name",
    type: "text",
    placeholder: "Enter department name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter department email",
  },
  {
    name: "image",
    label: "Department Image",
    type: "file",
    placeholder: "Upload image",
  },
  {
    name: "banner_image",
    label: "Department Banner",
    type: "file",
    placeholder: "Upload banner",
  },
];

export { ROWS, ADD, EDIT, DEPARTMENTFIELDSCONFIG };
