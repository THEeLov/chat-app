import { Bounce, toast } from 'react-toastify';

export const showErrorNotification = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
    theme: "colored"
  });
}