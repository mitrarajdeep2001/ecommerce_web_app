import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function uploadImageToCloudinary(imageFile) {
  const data = new FormData();
  data.append("my_file", imageFile);
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/admin/products/upload-image`,
    data
  );

  return response.data.result.url;
}
