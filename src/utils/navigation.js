import { flatSidebarItems } from "../constants/sidebar";

const normalize = (path) => path.replace(/\/+$/, "") || "/";

export const toTitle = (value = "") =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const findNavigationItem = (pathname) => {
  const current = normalize(pathname);
  const ranked = [...flatSidebarItems].sort((a, b) => b.route.length - a.route.length);

  return ranked.find((item) => {
    const route = normalize(item.route);
    return current === route || current.startsWith(`${route}/`);
  });
};

export const buildBreadcrumbs = (pathname) => {
  const item = findNavigationItem(pathname);
  const parts = normalize(pathname).split("/").filter(Boolean);

  if (!item) {
    return parts.map((part, index) => ({
      title: toTitle(part),
      route: `/${parts.slice(0, index + 1).join("/")}`,
    }));
  }

  const crumbs = [{ title: item.title, route: item.route }];

  if (parts.includes("create")) {
    crumbs.push({ title: "Create", route: pathname });
  } else if (normalize(pathname) !== normalize(item.route)) {
    crumbs.push({ title: "Details", route: pathname });
  }

  return crumbs;
};
