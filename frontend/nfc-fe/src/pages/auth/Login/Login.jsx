import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import GenericForm from "../../../components/GenericForm";

import { loginFormSchema } from "../../../validations/schema";

import { LOGINFIELDSCONFIG, LOGIN } from "../../../constants/Login";

import { useLoginMutation } from "../../../store/slices/auth/authApiSlice";

import { handleLoginMutation } from "../../../services/auth";

import { backgroundImage, container, form } from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [error, setError] = useState(null);

  const handleFormSubmit = async (data, methods) => {
    const res = await handleLoginMutation(
      data,
      login,
      setError,
      navigate,
      methods
    );
    if (!res) return;
  };

  return (
    <Box sx={container} className="center">
      <Box sx={backgroundImage} className="center">
        <Box sx={form} className="center">
          <Typography variant="h1" color="#101828">
            {LOGIN.heading}
          </Typography>

          <GenericForm
            fieldsConfig={LOGINFIELDSCONFIG}
            schema={loginFormSchema}
            onSubmit={handleFormSubmit}
            submitText={LOGIN.submit}
            gap={1.5}
            isLoading={isLoading}
            login
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
