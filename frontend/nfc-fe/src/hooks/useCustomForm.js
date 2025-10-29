import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useCustomForm = (schema, defaultValues ) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  return methods;
};
