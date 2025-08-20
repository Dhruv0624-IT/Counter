// utils/formatDate.js
export default function formatDate(dateString) {
  if (!dateString) return "";

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
