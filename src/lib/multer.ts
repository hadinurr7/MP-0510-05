import multer from "multer";

export const uploader = (filelimit: number = 7 * 1024 * 1024) => {
  const storage = multer.memoryStorage();
  const limits = { fileSize: filelimit };
  return multer({ storage, limits });
};
