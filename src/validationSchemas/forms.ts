import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "At least 4 characters required"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

// Password should have stronger validation
export const signUpSchema = signInSchema
  .extend({
    username: z.string().min(1, "Username is required"),
    confirmPassword: z.string().min(4, "At least 4 characters required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const sendMessageSchema = z.object({
  message: z.string().min(1),
});

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>;
