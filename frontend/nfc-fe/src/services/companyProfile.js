import { toast } from "sonner";

import { setCompanyProfile } from "../store/slices/companyProfile/companyProfileSlice";

const handleAddCompanyProfileMutation = async (
  body,
  addCompanyProfileMutation,
  setError,
  handleClose,
  refetch,
  dispatch
) => {
  try {
    const res = await addCompanyProfileMutation(body).unwrap();

    if (res.success) {
      toast.success(res?.message || "Company profile created successfuy");

      dispatch(setCompanyProfile(res?.company_profile));
      handleClose();
      refetch();
    }

    return null;
  } catch (error) {
    let errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message ||
          errors?.error ||
          errors ||
          "Company profile creation failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleUpdateCompanyProfileMutation = async (
  body,
  companyProfileId,
  updateCompanyProfile,
  setError,
  handleClose,
  dispatch
) => {
  try {
    const res = await updateCompanyProfile({
      body,
      id: companyProfileId,
    }).unwrap();

    if (res.success) {
      toast.success(res?.message || "Company profile updated successfuy");

      dispatch(setCompanyProfile(res?.company_profile));

      handleClose();
    }

    return null;
  } catch (error) {
    let errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message ||
          errors?.error ||
          errors ||
          "Company profile updation failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleDeleteCompanyProfileMutation = async (
  { id },
  deleteCompanyProfileMutation,
  setError,
  methods
) => {};

export {
  handleAddCompanyProfileMutation,
  handleUpdateCompanyProfileMutation,
  handleDeleteCompanyProfileMutation,
};
