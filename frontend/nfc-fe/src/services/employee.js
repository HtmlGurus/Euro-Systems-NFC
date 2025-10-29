import { toast } from "sonner";

const handleCreateEmployeeMutation = async (
  body,
  createEmployee,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const res = await createEmployee(body).unwrap();

    if (res.success) {
      toast.success(res?.message || "Employee created successfuy");

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
        errors?.message ||
          errors?.error ||
          errors ||
          "Employee creation failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleUpdateEmployeeMutation = async (
  body,
  employeeId,
  updateEmployee,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const res = await updateEmployee({ body, id: employeeId }).unwrap();

    if (res.success) {
      toast.success(res?.message || "Employee updated successfuy");

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
        errors?.message ||
          errors?.error ||
          errors ||
          "Employee updation failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleDeleteEmployeeMutation = async (
  employeeId,
  deleteEmployee,
  setError,
  handleCloseFormDialog
) => {
  try {
    const res = await deleteEmployee({ id: employeeId }).unwrap();

    if (res.success) {
      toast.success(res?.message || "Employee deleted successfully");

      handleCloseFormDialog();

      return res;
    }
  } catch (error) {
    let errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message ||
          errors?.error ||
          errors ||
          "Employee deletion failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

export {
  handleCreateEmployeeMutation,
  handleUpdateEmployeeMutation,
  handleDeleteEmployeeMutation,
};
