import path from "path";
import fs from "fs";
import { URL, fileURLToPath } from "url";

export const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

export const imageRemover = (imgPath) => {
  const __dir = fileURLToPath(new URL(import.meta.url));
  const fullPath = path.join(__dir, "../", "../", imgPath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
