import { useState } from "react";
import { useDispatch } from "react-redux";

import { Menu, Typography } from "@mui/material";

import FormLayout from "./FormLayout";

import {
  ADD,
  COMPANYFIELDSCONFIG,
  EDITBTN,
  EDITHEADING,
} from "../constants/CompanyProfile";

import {
  useAddCompanyMutation,
  useUpdateCompanyMutation,
} from "../store/slices/companyProfile/companyProfileApiSlice";

import {
  handleAddCompanyProfileMutation,
  handleUpdateCompanyProfileMutation,
} from "../services/companyProfile";

import { companyProfileFormSchema } from "../validations/schema";

import { FORM } from "../constants/Form";

import { menuPaper } from "./styles";
import { formDialogHeading } from "./dialogs/styles";

const DropdownMenuForm = ({
  anchorEl,
  setAnchorEl,
  refetch,
  companyProfile,
}) => {
  const open = Boolean(anchorEl);

  const [addCompany, { isLoading }] = useAddCompanyMutation();

  const [updateCompanyProfile, { isLoading: updateIsLoading }] =
    useUpdateCompanyMutation();

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);

    setTimeout(() => {
      setEdit(false);
    }, 100);
  };

  const handleSubmit = async (data) => {
    if (edit) {
      const res = await handleUpdateCompanyProfileMutation(
        data,
        data.id,
        updateCompanyProfile,
        setError,
        handleClose,
        dispatch
      );
      if (!res) return;
    } else {
      const res = await handleAddCompanyProfileMutation(
        data,
        addCompany,
        setError,
        handleClose,
        refetch,
        dispatch
      );
      if (!res) return;
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      disableAutoFocusItem
      disableEnforceFocus
      disableRestoreFocus
      slotProps={{
        paper: {
          sx: menuPaper,
        },
        list: {
          sx: {
            padding: 0,
          },
        },
      }}
    >
      <Typography
        variant="h5"
        textAlign={"center"}
        marginBottom={3}
        marginTop={3}
        sx={formDialogHeading}
      >
        {ADD}
      </Typography>

      <FormLayout
        title={ADD}
        editTitle={EDITHEADING}
        editBtn={EDITBTN}
        fieldsConfig={COMPANYFIELDSCONFIG}
        schema={companyProfileFormSchema}
        onSubmit={(data) => {
          if (companyProfile === null || edit) {
            handleSubmit(data);
          } else if (companyProfile !== null && !edit) {
            setEdit(true);
          }
        }}
        profile
        text={
          companyProfile !== null && !edit
            ? EDITBTN
            : companyProfile === null || !edit
            ? FORM.add
            : FORM.save
        }
        isLoading={isLoading || updateIsLoading}
        defaultValues={{
          ...companyProfile,
          profile_image: companyProfile?.profile_image?.image_url,
        }}
        edit={edit}
      />
    </Menu>
  );
};

export default DropdownMenuForm;
