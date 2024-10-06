import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "../validationSchemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../hooks/useAuth";
import useAuthData from "../hooks/useAuthData";
import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignInForm = () => {
  const { mutateAsync: signInUser } = useSignIn();
  const { signIn } = useAuthData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      const response = await signInUser(data);
      signIn(response);
      navigate("/chats");
    } catch (error) {
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        console.log();
        setError("root", {
          message:
            statusCode === 401
              ? "Invalid email or password"
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
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      borderRadius="10px"
      gap="1rem"
      textAlign="center"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.6)"
      className="card"
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
        type="password"
        label="Password"
        variant="outlined"
        placeholder="Email"
      />

      {errors.root && (
        <Typography color="error">{errors.root.message}</Typography>
      )}

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
        <Typography component={Link} to="/signup" color="black">
          Sign Up
        </Typography>
      </Typography>
    </Box>
  );
};

export default SignInForm;
