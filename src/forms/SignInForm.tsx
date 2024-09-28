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
      sx={{backgroundColor: "rgba(255, 255, 255, 0.3)"}}
      borderRadius="10px"
      gap="1rem"
      textAlign="center"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.6)"
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
        variant="contained"
      >
        Sign In
      </Button>

      <Typography>
        Don't have an account ?{" "}
        <Typography component="a" href="/sign-up" color="black">
          Sign Up
        </Typography>
      </Typography>
    </Box>
  );
};

export default SignInForm;
