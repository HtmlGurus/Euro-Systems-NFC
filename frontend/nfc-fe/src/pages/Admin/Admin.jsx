import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

import GenericTable from "../../components/GenericTable";
import SlidePopover from "../../components/dialogs/SlidePopover";
import FormDialog from "../../components/dialogs/FormDialog";
import SmallDialog from "../../components/dialogs/SmallDialog";
import { adminTableColumns } from "./tableColumns";

import { adminFormSchema, resetPasswordSchema } from "../../validations/schema";

import {
  useAddAdminMutation,
  useDeleteAdminMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useResetPasswordMutation,
} from "../../store/slices/admin/adminApiSlice";

import { setAdmins } from "../../store/slices/admin/adminSlice";

import {
  handleCreateAdminMutation,
  handleDeleteAdminMutation,
  handleResetPasswordMutation,
  handleUpdateAdminMutation,
} from "../../services/admin";

import {
  ADMINTFIELDSCONFIG,
  ADD,
  EDIT,
  RESETPASSWORD,
  RESETPASSWORDFIELDSCONFIG,
} from "../../constants/Admin";

const Admin = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: allAdmins,
    isError,
    error,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetAdminQuery(
    {
      page,
      limit: rowsPerPage,
      sort_order: sortOrder,
      search: searchText,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [addAdmin, { isLoading: addIsLoading }] = useAddAdminMutation();

  const [updateAdmin, { isLoading: updateIsLoading }] =
    useUpdateAdminMutation();

  const [deleteAdmin, { isLoading: deleteIsLoading }] =
    useDeleteAdminMutation();

  const [resetPassword, { isLoading: resetIsLoading }] =
    useResetPasswordMutation();

  const dispatch = useDispatch();
  
  const { admins, loadingAdmins } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAdmins(allAdmins?.admins || []));
    }
  }, [isSuccess, isLoading, allAdmins]);

  useEffect(() => {
    if (isError && error && error?.data?.error !== "Invalid or expired token") {
      toast.error(error?.data?.error);
    }
  }, [isError, error]);

  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);
  const [errora, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const [resetAdminForm, setResetAdminForm] = useState(null);
  const [resetPasswordForm, setResetPasswordForm] = useState(null);

  useEffect(() => {
    if (admins) {
      setData(admins || []);
    }
  }, [admins]);

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setPage(1);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setPage(1);
  };

  const handleClick = async (e, row) => {
    setRowDetails(row);

    setAnchorEl(e.currentTarget);
    setVisible(true);
  };

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleClickDelete = () => {
    setDeleteDialog(true);
  };

  const handleClickEdit = () => {
    const defaultVal = {
      profile_image: rowDetails?.profile_image?.image_url || "",
      full_name: rowDetails?.full_name,
      email: rowDetails?.email,
      phone_number: rowDetails?.phone_number,
    };

    if (resetAdminForm) {
      resetAdminForm(defaultVal);
    }

    setEdit(true);
    setOpen(true);
  };

  const handleClickResetPassword = () => {
    const defaultVal = {
      new_password: "",
    };

    if (resetPasswordForm) {
      resetPasswordForm(defaultVal);
    }

    setOpenResetDialog(true);
  };

  const handleDelete = async () => {
    try {
      const res = await handleDeleteAdminMutation(
        rowDetails.id,
        deleteAdmin,
        setError,
        handleCloseFormDialog
      );

      if (res?.success) {
        dispatch(setAdmins(admins.filter((item) => item.id !== rowDetails.id)));
      }
    } catch (err) {
      toast.error("Failed to delete admin");
    }
  };

  const handleSubmit = async (data, methods) => {
    if (edit) {
      const res = await handleUpdateAdminMutation(
        data,
        rowDetails.id,
        updateAdmin,
        setError,
        methods,
        handleCloseFormDialog,
        dispatch
      );

      if (res && res.success) {
        const updateAdmin = admins?.map((item) => {
          if (item.id === rowDetails.id) {
            return res.admin;
          }

          return item;
        });

        dispatch(setAdmins(updateAdmin));
      }
    } else {
      const res = await handleCreateAdminMutation(
        data,
        addAdmin,
        setError,
        methods,
        handleCloseFormDialog,
        dispatch
      );

      if (res && res.success) {
        dispatch(setAdmins([res.admin, ...admins]));
      }
    }
  };

  const handleResetPasswordSubmit = async (data, methods) => {
    const payload = {
      id: rowDetails?.id,
      body: { new_password: data.new_password },
    };

    const res = await handleResetPasswordMutation(
      payload,
      resetPassword,
      methods.setError,
      methods,
      handleCloseResetPasswordDialog
    );
  };

  const handleCloseFormDialog = () => {
    setOpen(false);
    setDeleteDialog(false);

    setTimeout(() => {
      setEdit(false);
      setRowDetails(null);
      setPreview(null);
      handleResetAdminForm();
    }, 100);
  };

  const handleCloseResetPasswordDialog = () => {
    setOpenResetDialog(false);
    setDeleteDialog(false);
    setTimeout(() => {
      setEdit(false);
      setRowDetails(null);
      setPreview(null);
      handleResetPasswordFormReset();
    }, 100);
  };

  const handleResetAdminForm = () => {
    const emptyForm = ADMINTFIELDSCONFIG.reduce((acc, field) => {
      acc[field.name] = field.type === "date" ? null : "";
      return acc;
    }, {});

    if (resetAdminForm) resetAdminForm(emptyForm);
  };

  const handleResetPasswordFormReset = () => {
    const emptyForm = RESETPASSWORDFIELDSCONFIG.reduce((acc, field) => {
      acc[field.name] = field.type === "date" ? null : "";
      return acc;
    }, {});

    if (resetPasswordForm) resetPasswordForm(emptyForm);
  };

  const totalRows = allAdmins?.pagination?.total_count || 0;
  const totalPages = allAdmins?.pagination?.total_pages || 1;

  return (
    <>
      <GenericTable
        columns={adminTableColumns}
        rows={data}
        totalRows={totalRows}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
        loading={loadingAdmins || isLoading || isFetching}
        clickHandler={{
          onAddClick: handleClickAdd,
          onSortClick: handleSortClick,
          onSearch: handleSearch,
          onActionClick: (e, row) => handleClick(e, row),
        }}
        message={admins?.length === 0 ? allAdmins?.message : false}
      />

      <SlidePopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        visible={visible}
        setVisible={setVisible}
        handleDelete={handleClickDelete}
        handleEdit={handleClickEdit}
        handleResetPassword={handleClickResetPassword}
        reset
      />

      <FormDialog
        open={open}
        setOpen={setOpen}
        ADD={ADD}
        EDIT={EDIT}
        fieldsConfig={ADMINTFIELDSCONFIG}
        schema={adminFormSchema(edit)}
        onSubmit={handleSubmit}
        edit={edit}
        rowDetails={rowDetails}
        handleClose={handleCloseFormDialog}
        isLoading={addIsLoading || updateIsLoading}
        preview={preview}
        setPreview={setPreview}
        exposeReset={(resetFn) => setResetAdminForm(() => resetFn)}
        admin
      />

      <FormDialog
        open={openResetDialog}
        setOpen={setOpenResetDialog}
        ADD={RESETPASSWORD}
        fieldsConfig={RESETPASSWORDFIELDSCONFIG}
        schema={resetPasswordSchema}
        onSubmit={handleResetPasswordSubmit}
        rowDetails={rowDetails}
        handleClose={handleCloseResetPasswordDialog}
        isLoading={resetIsLoading}
        preview={preview}
        setPreview={setPreview}
        exposeReset={(resetFn) => setResetPasswordForm(() => resetFn)}
        admin
        reset
        text="Reset"
      />

      <SmallDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        itemTitle={rowDetails?.full_name}
        handleDelete={handleDelete}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Admin;
