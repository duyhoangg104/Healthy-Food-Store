/** @format */
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import storage from "../store/services/firebase";

const fileUploadHandler = async (
  file,
  setLoading,
  setProgress,
  setError,
  callback
) => {
  setLoading(true);
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: "image/jpeg, image/png, image/jpg",
  });
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      setLoading(false);
      setError(error.message);
      return "";
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setLoading(false);
        callback(downloadURL);
      });
    }
  );
};

const deleteFileHandler = async (file) => {
  const storageRef = ref(storage, "images/" + file.name);
  deleteObject(storageRef)
    .then(() => {
      console.log("Delete file from storage successfully");
    })
    .catch((err) => console.log(err));
};

export { fileUploadHandler, deleteFileHandler };
