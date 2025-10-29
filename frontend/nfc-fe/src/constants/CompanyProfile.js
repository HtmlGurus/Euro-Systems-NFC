const ADD = "profile";
const EDITHEADING = "Edit profile";
const EDITBTN = "Edit";

const COMPANYFIELDSCONFIG = [
  {
    name: "profile_image",
    label: "Upload Image",
    type: "file",
    placeholder: "Upload image",
  },
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    name: "website_link",
    label: "Website Link",
    type: "text",
    placeholder: "Enter website link",
  },
  {
    name: "established",
    label: "Established",
    type: "text",
    placeholder: "Enter established",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter address",
  },
  {
    name: "button_name",
    label: "Button Name",
    type: "text",
    placeholder: "Enter button name",
  },
  {
    name: "button_redirect_url",
    label: "Button Redirect URL",
    type: "text",
    placeholder: "Enter redirected url",
  },
];

export { ADD, EDITHEADING, EDITBTN, COMPANYFIELDSCONFIG };
