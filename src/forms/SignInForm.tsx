import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "../validationSchemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchemaType) => {
    // handle form submission
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
        type="text"
        label="Email"
        variant="outlined"
        placeholder="Email"
      />

      <TextField
        {...register("password")}
        helperText={errors.password?.message}
        type="text"
        label="Password"
        variant="outlined"
        placeholder="Email"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        Sign In
      </Button>

      <Typography>
        Don't have an account ?{" "}
        <Typography component="a" href="/signUp">
          Sign Up
        </Typography>
      </Typography>
    </Box>
  );
};

export default SignInForm;
