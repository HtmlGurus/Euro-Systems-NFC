import {
  Action,
  Add,
  Attachment,
  Delete,
  Sort,
  View,
} from "../assets/images/svgs";

const actionButton = [
  {
    name: "Sort",
    icon: Sort,
  },
  {
    name: "Add",
    icon: Add,
  },
];

const TABLEACTIONBUTTONS = [
  {
    name: "Attachment",
    icon: Attachment,
  },
  {
    name: "View",
    icon: View,
  },
  {
    name: "Action",
    icon: Action,
  },
];

const TABLEBUTTONPOPUP = ["Edit", "Delete", "Reset password"];

const TABLEDELETEPOPUP = {
  icon: Delete,
  delete: "Delete",
  makesureText: "Do you want to delete this",
};

export { actionButton, TABLEACTIONBUTTONS, TABLEBUTTONPOPUP, TABLEDELETEPOPUP };
