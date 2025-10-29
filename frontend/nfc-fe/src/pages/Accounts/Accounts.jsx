import { toast } from "sonner";
import { Box, Typography } from "@mui/material";
import { changePasswordSchema } from "../../validations/schema";
import { CHANGEPASSWORDFIELDS } from "../../constants/Admin";
import GenericForm from "../../components/GenericForm";
import { useChangePasswordMutation } from "../../store/slices/admin/adminApiSlice";

const handleChangePasswordMutation = async (
  body,
  changePassword,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const res = await changePassword(body).unwrap();

    if (res.success) {
      toast.success(res?.message || "Password updated successfully");
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
        errors?.message || errors?.error || errors || "Password update failed",
        { id: "global-error" }
      );
    }
    return null;
  }
};

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (data, methods) => {
    await handleChangePasswordMutation(
      data,
      changePassword,
      methods.setError,
      methods
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 450,
        p: 4,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "24px", md: "26px" }, lineHeight: "normal" }}
        color="#101828"
      >
        {"Change Password"}
      </Typography>
      <GenericForm
        fieldsConfig={CHANGEPASSWORDFIELDS}
        schema={changePasswordSchema}
        onSubmit={handleSubmit}
        submitText="Change Password"
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ChangePassword;
