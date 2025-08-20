import React, { useState } from "react";
import styles from "./FileUploader.module.css";
// import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FiUploadCloud, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function FileUploader({ onUploadComplete, folderPath = "uploads" }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const uploadFile = (file) => {
    setError("");
    setUploading(true);
    setFileName(file.name);

    const storageRef = ref(storage, `${folderPath}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
      },
      (err) => {
        setError("Upload failed. Please try again.");
        setUploading(false);
        console.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUploading(false);
          setProgress(100);
          if (onUploadComplete) onUploadComplete(url);
        });
      }
    );
  };

  return (
    <div
      className={styles.uploader}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label className={styles.dropZone}>
        <FiUploadCloud size={40} />
        <p>Drag & drop your file here, or click to select</p>
        <input
          type="file"
          onChange={handleFileSelect}
          className={styles.fileInput}
        />
      </label>

      {uploading && (
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
          <span>{progress}%</span>
        </div>
      )}

      {progress === 100 && !error && !uploading && (
        <div className={styles.success}>
          <FiCheckCircle color="green" /> Uploaded: {fileName}
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <FiAlertCircle color="red" /> {error}
        </div>
      )}
    </div>
  );
}
