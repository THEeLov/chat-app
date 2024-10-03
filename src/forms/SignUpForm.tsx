import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchemaType } from "../validationSchemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../hooks/useAuth";
import useAuthData from "../hooks/useAuthData";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { mutateAsync: signUpUser } = useSignUp();
  const { signUp } = useAuthData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const result = await signUpUser(data);
      signUp(result);
      navigate("/chats");
    } catch (error) {
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        console.log();
        setError("root", {
          message:
            statusCode === 409
              ? "Email is already taken"
              : "Internal server error",
        });
      }
    }
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
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      borderRadius="10px"
      gap="1rem"
      textAlign="center"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.6)"
      className="card"
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
        type="password"
      />

      {errors.root && (
        <Typography color="error"> {errors.root.message}</Typography>
      )}

      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        disabled={isSubmitting}
      >
        Sign Up
      </Button>

      <Typography>
        Already have an account ?{" "}
        <Typography component="a" href="/signin" color="black">
          Sign In
        </Typography>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
