import { toast } from "sonner";

const handleCreateAdminMutation = async (
  body,
  addAdmin,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const res = await addAdmin(body).unwrap();

    if (res.success) {
      toast.success(res?.message || "Admin created successfuy");

      handleCloseFormDialog();

      methods.reset();

      return res;
    }

    return null;
  } catch (error) {
    let errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || errors || "Admin creation failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleUpdateAdminMutation = async (
  body,
  adminId,
  updateAdmin,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const res = await updateAdmin({ body, id: adminId }).unwrap();

    if (res.success) {
      toast.success(res?.message || "Admin updated successfuy");

      handleCloseFormDialog();

      methods.reset();
      return res;
    }
  } catch (error) {
    let errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || errors || "Admin updation failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleDeleteAdminMutation = async (
  adminId,
  deleteAdmin,
  setError,
  handleCloseFormDialog
) => {
  try {
    const res = await deleteAdmin({ id: adminId }).unwrap();

    if (res.success) {
      toast.success(res?.message || "Admin deleted successfully");

      handleCloseFormDialog();

      return res;
    }
  } catch (error) {
    let errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || errors || "Admin deletion failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleChangePasswordMutation = async (
  body, // { current_password, new_password }
  changePasswordFn, // mutation function like mutation.mutateAsync or changePassword().unwrap()
  setError, // RHF setError
  methods, // RHF methods
  handleCloseFormDialog // optional: modal/dialog close
) => {
  try {
    const res = await changePasswordFn(body).unwrap();

    if (res.success) {
      toast.success(res?.message || "Password updated successfully");

      handleCloseFormDialog?.(); // optional

      methods.reset();
      return res;
    }
  } catch (error) {
    const errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || errors || "Password update failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleResetPasswordMutation = async (
  payload, // { id, body: { new_password } }
  mutationFn,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const res = await mutationFn(payload).unwrap();

    if (res.success) {
      toast.success(res?.message || "Password reset successfully");
      handleCloseFormDialog?.();
      methods.reset();
      return res;
    }
  } catch (error) {
    const errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || errors || "Password reset failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

export {
  handleCreateAdminMutation,
  handleUpdateAdminMutation,
  handleDeleteAdminMutation,
  handleChangePasswordMutation,
  handleResetPasswordMutation,
};
