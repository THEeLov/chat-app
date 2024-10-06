import { Bounce, toast } from "react-toastify";

export const showErrorNotification = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
    theme: "colored",
  });
};

export const showSuccessNotification = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
    theme: "colored",
  });
}

export const showWarningNotification = (message: string) => {
  toast.warning(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
    theme: "colored",
  });
}
