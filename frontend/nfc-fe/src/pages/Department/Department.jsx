import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import GenericTable from "../../components/GenericTable";
import FormDialog from "../../components/dialogs/FormDialog";
import SlidePopover from "../../components/dialogs/SlidePopover";
import SmallDialog from "../../components/dialogs/SmallDialog";
import { ADD, DEPARTMENTFIELDSCONFIG, EDIT } from "../../constants/Department";
import {
  handleCreateDepartmentMutation,
  handleDeleteDepartmentMutation,
  handleUpdateDepartmentMutation,
} from "../../services/department";
import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../store/slices/department/departmentApiSlice";
import { setDepartments } from "../../store/slices/department/departmentSlice";
import { departmentFormSchema } from "../../validations/schema";
import getCroppedImg from "./cropImage";
import { departmentTableColumns } from "./tableColumns";

const Department = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [localSearch, setLocalSearch] = useState("");

  const [croppingState, setCroppingState] = useState({
    isCropping: false,
    image: null,
    fieldName: null,
    onChange: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    croppedAreaPixels: null,
    cropConfig: { aspect: 1, minWidth: 200, minHeight: 200 },
  });

  const {
    data: allDepartments,
    isError,
    error,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetDepartmentQuery(
    { page, limit: rowsPerPage, sort_order: sortOrder, search: searchText },
    { refetchOnMountOrArgChange: true }
  );

  const [addDepartment, { isLoading: addIsLoading }] =
    useAddDepartmentMutation();
  const [updateDepartment, { isLoading: updateIsLoading }] =
    useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: deleteIsLoading }] =
    useDeleteDepartmentMutation();

  const dispatch = useDispatch();
  const { departments, loadingDepartments } = useSelector(
    (state) => state.department
  );

  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);
  const [errora, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [resetForm, setResetForm] = useState(null);
  const [lastAppliedBanner, setLastAppliedBanner] = useState(null);
  const [lastAppliedProfile, setLastAppliedProfile] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setDepartments(allDepartments?.departments || []));
    }
  }, [isSuccess, allDepartments, dispatch]);

  useEffect(() => {
    if (isError && error?.data?.error !== "Invalid or expired token") {
      const errorMessage = error?.data?.error || "An error occurred";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  useEffect(() => {
    if (departments) {
      setData(departments || []);
    }
  }, [departments]);

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setPage(1);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchText(localSearch);
      setPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [localSearch]);

  const handleSearch = (text) => setLocalSearch(text);

  const handleClick = (e, row) => {
    setRowDetails(row);
    setAnchorEl(e.currentTarget);
    setVisible(true);
  };

  const handleClickAdd = () => {
    setOpen(true);
    setEdit(false);
    setRowDetails(null);
    setPreview(null);
    setPreviewBanner(null);
  };

  const handleClickDelete = () => setDeleteDialog(true);

  const handleClickEdit = () => {
    const defaultVal = {
      name: rowDetails?.name || "",
      email: rowDetails?.email || "",
      image: rowDetails?.image?.image_url || "",
      banner_image: rowDetails?.banner_image?.image_url || "",
      created_at: rowDetails?.created_at || null,
      employee_count: rowDetails?.employee_count || 0,
    };

    if (resetForm) {
      resetForm(defaultVal);
    }

    setEdit(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    const res = await handleDeleteDepartmentMutation(
      rowDetails.id,
      deleteDepartment,
      setError,
      handleCloseFormDialog
    );

    if (res?.success) {
      const updated = departments?.filter((item) => item.id !== rowDetails.id);
      dispatch(setDepartments(updated || []));
    } else {
      toast.error(res?.error || "Failed to delete department");
    }
  };

  const handleCropRequest = (file, fieldName, onChange) => {
    const previewUrl = URL.createObjectURL(file);

    const cropConfig =
      fieldName === "banner_image"
        ? {
            aspect: 3,
            minWidth: 600,
            minHeight: 200,
          }
        : {
            aspect: 1,
            minWidth: 200,
            minHeight: 200,
          };

    setCroppingState({
      isCropping: true,
      image: previewUrl,
      fieldName,
      onChange,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
      cropConfig,
    });

    fieldName === "banner_image"
      ? setPreviewBanner(previewUrl)
      : setPreview(previewUrl);
  };

  const onCropComplete = (_, croppedAreaPixels) =>
    setCroppingState((prev) => ({ ...prev, croppedAreaPixels }));

  const performCrop = async () => {
    try {
      const { image, croppedAreaPixels, fieldName, onChange } = croppingState;
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);

      let finalBlob = croppedBlob;

      if (fieldName === "banner_image") {
        finalBlob = await resizeImage(croppedBlob, 1200, 400, 0.7);
      } else if (fieldName === "image") {
        finalBlob = await resizeImage(croppedBlob, 500, 500, 0.6);
      }

      const maxSize = fieldName === "image" ? 1 * 1024 * 1024 : 2 * 1024 * 1024;

      if (finalBlob.size > maxSize) {
        const errorMessage =
          fieldName === "image"
            ? "Profile image must be less than 1MB"
            : "Banner image must be less than 2MB";
        toast.error(errorMessage);
        return;
      }

      const croppedFile = new File([finalBlob], `cropped-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      const previewUrl = URL.createObjectURL(croppedFile);

      if (fieldName === "banner_image") {
        setPreviewBanner(previewUrl);
        setLastAppliedBanner(previewUrl);
      } else {
        setPreview(previewUrl);
        setLastAppliedProfile(previewUrl);
      }

      onChange?.(croppedFile);

      setCroppingState({
        isCropping: false,
        image: null,
        fieldName: null,
        onChange: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        croppedAreaPixels: null,
        cropConfig: { aspect: 1, minWidth: 200, minHeight: 200 },
      });

      toast.success("Image cropped successfully!");
    } catch {
      toast.error("Error cropping image");
    }
  };

  const resizeImage = (file, maxWidth, maxHeight, quality = 0.6) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, "image/jpeg", quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const continueFormSubmission = async (processedData, methods) => {
    try {
      if (processedData.image && processedData.image.size > 1 * 1024 * 1024) {
        toast.error("Profile image must be less than 1MB");
        return;
      }

      if (
        processedData.banner_image &&
        processedData.banner_image.size > 2 * 1024 * 1024
      ) {
        toast.error("Banner image must be less than 2MB");
        return;
      }

      let res;
      if (edit) {
        res = await handleUpdateDepartmentMutation(
          processedData,
          rowDetails.id,
          updateDepartment,
          setError,
          methods,
          handleCloseFormDialog,
          dispatch
        );

        if (res?.success) {
          const updated = departments?.map((item) =>
            item.id === rowDetails.id
              ? {
                  ...res.department,
                  created_at: processedData.created_at || item.created_at,
                }
              : item
          );
          dispatch(setDepartments(updated || []));
        }
      } else {
        res = await handleCreateDepartmentMutation(
          processedData,
          addDepartment,
          setError,
          methods,
          handleCloseFormDialog,
          dispatch
        );

        if (res?.success) {
          dispatch(
            setDepartments([
              {
                ...res.department,
                created_at: dayjs(processedData.created_at || dayjs()),
              },
              ...departments,
            ])
          );
        }
      }
    } catch (error) {
      if (error?.status === 413) {
        toast.error("Image file is too large. Please use a smaller image.");
      } else {
        toast.error(error.message || "Failed to save department");
      }
    }
  };

  const cancelCrop = () => {
    const wasBanner = croppingState?.fieldName === "banner_image";
    const wasProfile = croppingState?.fieldName === "image";

    setCroppingState({
      isCropping: false,
      image: null,
      fieldName: null,
      onChange: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
      cropConfig: { aspect: 1, minWidth: 200, minHeight: 200 },
    });

    if (wasBanner) {
      if (lastAppliedBanner) {
        setPreviewBanner(lastAppliedBanner);
      } else {
        setPreviewBanner(null);
      }
    } else if (wasProfile) {
      if (lastAppliedProfile) {
        setPreview(lastAppliedProfile);
      } else {
        setPreview(null);
      }
    }

    toast.info("Cropping cancelled");
  };
  const handleSubmit = (data, methods) => {
    if (!data.name || !data.email) {
      toast.error("Name and email are required fields");
      return;
    }
    continueFormSubmission(data, methods);
  };

  const handleCloseFormDialog = () => {
    setOpen(false);
    setDeleteDialog(false);
    setVisible(false);
    setAnchorEl(null);

    setCroppingState({
      isCropping: false,
      image: null,
      fieldName: null,
      onChange: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
      cropConfig: { aspect: 1, minWidth: 200, minHeight: 200 },
    });

    setPreview(null);
    setPreviewBanner(null);
    setError(null);

    setTimeout(() => {
      setEdit(false);
      setRowDetails(null);

      if (resetForm) {
        handleReset();
      }
    }, 100);
  };

  const handleReset = () => {
    const empty = DEPARTMENTFIELDSCONFIG.reduce((acc, field) => {
      acc[field.name] = field.type === "date" ? null : "";
      return acc;
    }, {});

    if (resetForm) {
      resetForm(empty);
    }

    setPreview(null);
    setPreviewBanner(null);
  };

  const totalRows = allDepartments?.pagination?.total_count || 0;
  const totalPages = allDepartments?.pagination?.total_pages || 1;

  return (
    <>
      <GenericTable
        columns={departmentTableColumns}
        rows={data}
        totalRows={totalRows}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
        loading={loadingDepartments || isLoading || isFetching}
        clickHandler={{
          onAddClick: handleClickAdd,
          onSortClick: handleSortClick,
          onSearch: handleSearch,
          onActionClick: handleClick,
        }}
        message={departments?.length === 0 ? allDepartments?.message : false}
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
        fieldsConfig={DEPARTMENTFIELDSCONFIG}
        schema={departmentFormSchema}
        onSubmit={handleSubmit}
        edit={edit}
        rowDetails={rowDetails}
        handleClose={handleCloseFormDialog}
        isLoading={addIsLoading || updateIsLoading}
        preview={preview}
        setPreview={setPreview}
        previewBanner={previewBanner}
        setPreviewBanner={setPreviewBanner}
        exposeReset={(resetFn) => setResetForm(() => resetFn)}
        handleImageValidationAndCrop={handleCropRequest}
        croppingState={croppingState}
        onCropComplete={onCropComplete}
        performCrop={performCrop}
        cancelCrop={cancelCrop}
        setCrop={(crop) => setCroppingState((prev) => ({ ...prev, crop }))}
        setZoom={(zoom) => setCroppingState((prev) => ({ ...prev, zoom }))}
      />

      <SmallDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        itemTitle={rowDetails?.name}
        handleDelete={handleDelete}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default Department;
