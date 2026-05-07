export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const calculateAge = (dob) => {
  if (!dob) return "-";
  const birth = new Date(dob);
  const diff = Date.now() - birth.getTime();
  return new Date(diff).getUTCFullYear() - 1970;
};

export const getBloodTypeColor = (bloodType) => {
  const colors = {
    A: "#ff4d4f",
    B: "#3b82f6",
    AB: "#8b5cf6",
    O: "#10b981",
  };
  return colors[bloodType?.toUpperCase()] || "#6b7280";
};

export const getStockStatus = (jumlah) => {
  if (jumlah === 0) {
    return { status: "Kosong", color: "border-red-500 text-red-600" };
  }
  if (jumlah <= 5) {
    return { status: "Menipis", color: "border-orange-500 text-orange-600" };
  }
  return { status: "Aman", color: "border-green-500 text-green-600" };
};

export const getDaysUntilExpiry = (expiryDate) => {
  if (!expiryDate) return null;

  const now = new Date();
  const exp = new Date(expiryDate);

  const diff = exp.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isExpiringSoon = (expiryDate) => {
  const days = getDaysUntilExpiry(expiryDate);
  return days !== null && days <= 7;
};
