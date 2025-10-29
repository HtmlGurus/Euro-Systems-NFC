import { toast } from "sonner";

const handleCreateDepartmentMutation = async (
  body,
  addDepartment,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const formData = new FormData();

    if (body.name) formData.append("name", body.name);
    if (body.email) formData.append("email", body.email);
    if (body.image instanceof File) formData.append("image", body.image);
    if (body.banner_image instanceof File)
      formData.append("banner_image", body.banner_image);

    const res = await addDepartment(formData).unwrap();

    if (res.success) {
      toast.success(res?.message || "Department created successfully");
      handleCloseFormDialog();
      methods.reset();
      return res;
    }

    return null;
  } catch (error) {
    const errors = error?.data;
    toast.error(
      errors?.message || errors?.error || "Department creation failed",
      { id: "global-error" }
    );
    return null;
  }
};

const handleUpdateDepartmentMutation = async (
  body,
  departmentId,
  updateDepartment,
  setError,
  methods,
  handleCloseFormDialog
) => {
  try {
    const formData = new FormData();
    formData.append("id", departmentId);
    formData.append("name", body.name || "");
    formData.append("email", body.email || "");

    if (body.image instanceof File) {
      formData.append("image", body.image);
    } else if (body.image && !body.image.startsWith("http")) {
      formData.append("image", body.image);
    }

    if (body.banner_image instanceof File) {
      formData.append("banner_image", body.banner_image);
    } else if (body.banner_image && !body.banner_image.startsWith("http")) {
      formData.append("banner_image", body.banner_image);
    }

    const res = await updateDepartment(formData).unwrap();

    if (res.success) {
      toast.success(res?.message || "Department updated successfully");
      handleCloseFormDialog();
      methods.reset();
      return res;
    }
  } catch (error) {
    const errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || "Department update failed",
        { id: "global-error" }
      );
    }
    return null;
  }
};

const handleDeleteDepartmentMutation = async (
  departmentId,
  deleteDepartment,
  setError,
  handleCloseFormDialog
) => {
  try {
    const res = await deleteDepartment({ id: departmentId }).unwrap();

    if (res.success) {
      toast.success(res?.message || "Department deleted successfully");
      handleCloseFormDialog();
      return res;
    }
  } catch (error) {
    const errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || "Department deletion failed",
        { id: "global-error" }
      );
    }
    handleCloseFormDialog();
    return null;
  }
};

export {
  handleCreateDepartmentMutation,
  handleUpdateDepartmentMutation,
  handleDeleteDepartmentMutation,
};
