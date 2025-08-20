import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  const { user, updateUserProfile, logout } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = async (file) => {
    if (!file || !user) return null;

    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let updatedPhotoURL = photoURL;
      const fileInput = document.getElementById("profilePic").files[0];

      if (fileInput) {
        updatedPhotoURL = await handleImageUpload(fileInput);
        setPhotoURL(updatedPhotoURL);
      }

      await updateUserProfile({
        displayName,
        photoURL: updatedPhotoURL,
      });

      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      setMessage("❌ Failed to update profile: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.profileContainer}>
      <h1>My Profile</h1>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <div className={styles.avatarSection}>
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className={styles.avatar}
          />
          <input type="file" id="profilePic" accept="image/*" />
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
          <input type="email" value={user?.email || ""} disabled />
        </div>

        {message && <p className={styles.message}>{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <button onClick={logout} className={styles.logoutBtn}>
        🚪 Logout
      </button>
    </div>
  );
}
