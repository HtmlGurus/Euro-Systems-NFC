import { toast } from "sonner";

import { PATHS } from "../constants/Paths";
import { setCredentials } from "../store/slices/auth/authSlice";

const handleLoginMutation = async (
  { email, password },
  loginMutation,
  setError,
  navigate,
  methods
) => {
  try {
    const res = await loginMutation({ email, password }).unwrap();

    if (res.success) {
      toast.success(res?.message || "Login successful");

      navigate(PATHS.dashboard);

      methods.reset();
    }

    return null;
  } catch (error) {
    let errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      toast.error(
        errors?.message || errors?.error || errors || "Login failed",
        {
          id: "global-error",
        }
      );
    }

    return null;
  }
};

const handleVerifyEmailMutation = async (
  code,
  verifyEmail,
  setError,
  navigate,
  methods,
  dispatch
) => {
  try {
    const res = await verifyEmail(code).unwrap();

    if (res.success) {
      toast.success(res?.message || "Email verified successfully");

      const token = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const updatedUser = {
          ...user,
          email_verified: true,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(setCredentials({ user: updatedUser, token }));
      }

      navigate(PATHS.dashboard);
      methods.reset();

      return true;
    }

    toast.error(res?.message || "Email verification failed");
    return false;
  } catch (error) {
    const errors = error?.data;

    if (typeof errors?.errors === "object") {
      setError(errors?.errors);
    } else {
      const message =
        errors?.message ||
        errors?.error ||
        errors ||
        "Email verification failed";

      toast.error(message, {
        id: "global-error",
      });
    }

    return false;
  }
};

export { handleLoginMutation, handleVerifyEmailMutation };
