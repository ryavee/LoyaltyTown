export const ROLES = {
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
  QR_GENERATE: "QR Generate",
  GUEST: "Guest",
};

export const getCurrentUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem("lt_user"));

    return user?.role || user?.user?.role || ROLES.GUEST;
  } catch {
    return ROLES.GUEST;
  }
};
