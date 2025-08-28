import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await updateProfile(currentUser, { photoURL: url });
      setPhotoURL(url);
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture");
    }
    setLoading(false);
  };

  const handleUpdateProfile = async () => {
    if (!displayName) return alert("Display name cannot be empty");
    setLoading(true);

    try {
      await updateProfile(currentUser, { displayName, photoURL });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <h2 className={styles.title}>My Profile</h2>

        <div className={styles.avatarWrapper}>
          <img
            src={photoURL || "https://via.placeholder.com/100?text=Profile"}
            alt="Profile"
            className={styles.avatar}
          />
          <label className={styles.uploadBtn}>
            Change Photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" value={currentUser?.email} disabled />
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className={styles.updateBtn}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}
