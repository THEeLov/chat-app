import { Box, Button, TextField, Typography } from "@mui/material";
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
      display="flex"
      flexDirection="column"
      padding="2rem"
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
      borderRadius="10px"
      gap="1rem"
      textAlign="center"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.6)"
    >
      <TextField
        {...register("username")}
        helperText={errors.username?.message}
        label="Username"
        placeholder="Username"
      />
      
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

      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        variant="contained"
      >
        Sign Up
      </Button>

      <Typography>
        Already have an account ?{" "}
        <Typography component="a" href="/sign-in" color="black">
          Sign In
        </Typography>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
