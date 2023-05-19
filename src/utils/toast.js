import { toast } from "react-hot-toast";

const defaultStyle = {
  color: '#FFFFFF', fontFamily: 'sans-serif'
}

export function toastSuccess(text) {
  toast.success(text, {
    style: {
      ...defaultStyle,
      backgroundColor: '#1E8465'
    }
  })
}

export function toastError(text) {
  toast.error(text, {
    style: {
      ...defaultStyle,
      backgroundColor: '#C70037'
    }
  })
}