import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchemaType } from "../validationSchemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchemaType) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("email")}
        helperText={errors.email?.message}
        label="Email"
        placeholder="Email"
      />

      <TextField
        {...register("password")}
        helperText={errors.password?.message}
        label="Password"
        type="Password"
      />

      <TextField
        {...register("confirmPassword")}
        helperText={errors.confirmPassword?.message}
        label="Confirm Password"
        type="Confirm Password"
      />

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
