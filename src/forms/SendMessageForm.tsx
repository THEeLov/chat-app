import { IconButton, InputBase, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import {
  sendMessageSchema,
  SendMessageSchemaType,
} from "../validationSchemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendMessage } from "../hooks/useMessage";

const SendMessageForm = ({ receiverId }: { receiverId: string }) => {
  const { mutateAsync: sendMessage } = useSendMessage(receiverId);

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<SendMessageSchemaType>({
    resolver: zodResolver(sendMessageSchema),
  });

  const onSubmit = async (data: SendMessageSchemaType) => {
    try {
      await sendMessage(data);
      reset();
    } catch (error) {
      alert("Hello");
      console.log("Something went wrong");
    }
  };

  return (
    <Paper
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Send message ..."
        {...register("message")}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default SendMessageForm;
