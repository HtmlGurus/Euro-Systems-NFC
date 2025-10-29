import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Alert, Snackbar } from "@mui/material";

import GenericTable from "../../components/GenericTable";
import SlidePopover from "../../components/dialogs/SlidePopover";
import FormDialog from "../../components/dialogs/FormDialog";
import SmallDialog from "../../components/dialogs/SmallDialog";
import { employeeTableColumns } from "./tableColumns";

import { employeeFormSchema } from "../../validations/schema";

import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../store/slices/employee/employeeApiSlice";

import { setEmployees } from "../../store/slices/employee/employeeSlice";

import {
  handleCreateEmployeeMutation,
  handleDeleteEmployeeMutation,
  handleUpdateEmployeeMutation,
} from "../../services/employee";

import { ADD, EDIT, EMPOLYEEFIELDSCONFIG } from "../../constants/Employee";
import { toast } from "sonner";
import { useLazyGetDepartmentDropdownQuery } from "../../store/slices/department/departmentApiSlice";
import {
  setDepartments,
  setLoadingDepartments,
} from "../../store/slices/department/departmentSlice";

dayjs.extend(utc);

const Employee = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: allEmployees,
    isError,
    error,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetEmployeeQuery(
    {
      page: page,
      limit: rowsPerPage,
      sort_order: sortOrder,
      search: searchText,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [addEmployee, { isLoading: addIsLoading }] = useAddEmployeeMutation();

  const [updateEmployee, { isLoading: updateIsLoading }] =
    useUpdateEmployeeMutation();

  const [deleteEmployee, { isLoading: deleteIsLoading }] =
    useDeleteEmployeeMutation();

  const dispatch = useDispatch();
  const { employees, loadingEmployees } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setEmployees(allEmployees?.employees || []));
    }
  }, [isSuccess, isLoading, allEmployees]);

  useEffect(() => {
    if (isError && error && error?.data?.error !== "Invalid or expired token") {
      toast.error(error?.data?.error);
    }
  }, [isError, error]);

  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errora, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resetForm, setResetForm] = useState(null);
  const [triggerGetDepartmentDropdown] = useLazyGetDepartmentDropdownQuery();

  useEffect(() => {
    if (employees) {
      setData(employees || []);
    }
  }, [employees]);

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setPage(1);
  };

  const handleClick = async (e, row, index) => {
    if (index === 0) {
      await copyToClipboard(
        `${window.location.origin}/employee-detail/${row.id}`
      );
      setCopied(true);
    } else if (index === 1) {
      window.open(
        `${window.location.origin}/employee-detail/${row?.id}`,
        "_blank"
      );
    } else {
      setRowDetails(row);

      setAnchorEl(e.currentTarget);
      setVisible(true);
    }
  };

  const handleClickDelete = () => {
    setDeleteDialog(true);
  };

  const handleFetchDepartments = async () => {
    try {
      dispatch(setLoadingDepartments(true));

      const res = await triggerGetDepartmentDropdown().unwrap();

      if (res?.success) {
        dispatch(setDepartments(res.departments || []));
      }
    } catch (error) {
      console.error("Failed to fetch departments", error);
    } finally {
      dispatch(setLoadingDepartments(false));
    }
  };

  const handleClickAdd = () => {
    setOpen(true);
    handleFetchDepartments();
  };

  const handleClickEdit = () => {
    handleFetchDepartments();
    const defaultVal = {
      profile_image: rowDetails?.profile_image?.image_url,
      name: rowDetails?.name,
      email: rowDetails?.email,
      department_id: rowDetails?.department_id?.id,
      phone_number: rowDetails?.phone_number,
      second_phone_number: rowDetails?.second_phone_number,
      age: rowDetails?.age,
      joining_date: rowDetails?.joining_date
        ? dayjs.utc(rowDetails?.joining_date)
        : null,
      designation: rowDetails?.designation,
      about_me: rowDetails?.about_me,
      address: rowDetails?.address,
      facebook: rowDetails?.social_links?.facebook,
      linkedin: rowDetails?.social_links?.linkedin,
      instagram: rowDetails?.social_links?.instagram,
      youtube: rowDetails?.social_links?.youtube,
    };
    resetForm(defaultVal);

    setEdit(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    const res = await handleDeleteEmployeeMutation(
      rowDetails.id,
      deleteEmployee,
      setError,
      handleCloseFormDialog
    );

    if (res && res.success) {
      const updatedEmployees = employees?.filter(
        (item) => item.id !== rowDetails.id
      );

      dispatch(setEmployees(updatedEmployees || []));
    }
  };

  const handleSubmit = async (data, methods) => {
    const payload = {
      ...data,
      joining_date: data.joining_date?.toISOString(),
    };

    if (edit) {
      const res = await handleUpdateEmployeeMutation(
        payload,
        rowDetails.id,
        updateEmployee,
        setError,
        methods,
        handleCloseFormDialog
      );

      if (res && res.success) {
        const updateEmp = employees?.map((item) => {
          if (item.id === rowDetails.id) {
            return res.employee;
          }

          return item;
        });

        dispatch(setEmployees(updateEmp));
      }
    } else {
      const res = await handleCreateEmployeeMutation(
        payload,
        addEmployee,
        setError,
        methods,
        handleCloseFormDialog
      );

      if (res && res.success) {
        dispatch(setEmployees([res.employee, ...employees]));
      }
    }
  };

  const handleCloseFormDialog = () => {
    setOpen(false);
    setDeleteDialog(false);

    setTimeout(() => {
      setEdit(false);
      setRowDetails(null);
      setPreview(null);
      handleReset();
    }, 100);
  };

  const handleReset = () => {
    const emptyForm = EMPOLYEEFIELDSCONFIG.reduce((acc, field) => {
      acc[field.name] = field.type === "date" ? null : "";
      return acc;
    }, {});

    if (resetForm) resetForm(emptyForm);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const totalRows = allEmployees?.pagination?.total_count || 0;
  const totalPages = allEmployees?.pagination?.total_pages || 1;

  return (
    <>
      <GenericTable
        columns={employeeTableColumns}
        rows={data}
        totalRows={totalRows}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
        loading={loadingEmployees || isLoading || isFetching}
        clickHandler={{
          onAddClick: handleClickAdd,
          onSortClick: handleSortClick,
          onSearch: handleSearch,
          onActionClick: (e, row, index) => handleClick(e, row, index),
        }}
        employee
        message={employees?.length === 0 ? allEmployees?.message : false}
      />

      <SlidePopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        visible={visible}
        setVisible={setVisible}
        handleDelete={handleClickDelete}
        handleEdit={handleClickEdit}
      />

      <FormDialog
        open={open}
        setOpen={setOpen}
        ADD={ADD}
        EDIT={EDIT}
        fieldsConfig={EMPOLYEEFIELDSCONFIG}
        schema={employeeFormSchema}
        onSubmit={handleSubmit}
        edit={edit}
        rowDetails={rowDetails}
        handleClose={handleCloseFormDialog}
        isLoading={addIsLoading || updateIsLoading}
        preview={preview}
        setPreview={setPreview}
        exposeReset={(resetFn) => setResetForm(() => resetFn)}
      />

      <SmallDialog
        itemTitle={rowDetails?.name || ""}
        open={deleteDialog}
        setOpen={setDeleteDialog}
        handleDelete={handleDelete}
        isLoading={deleteIsLoading}
      />

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCopied(false)}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Employee link copied
        </Alert>
      </Snackbar>
    </>
  );
};

export default Employee;
