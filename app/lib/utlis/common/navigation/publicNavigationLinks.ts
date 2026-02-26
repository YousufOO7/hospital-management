

export interface INavigationLinks {
  label: string; // Simplify the label to a string
  key: string;
  href: string;
}

// Main navigation links
export const publicNavigationLinks: INavigationLinks[] = [
  {
    label: "Doctors",
    key: "doctors",
    href: "/doctors",
  },
  {
    label: "Services",
    key: "services",
    href: "/services",
  },
  {
    label: "Appointment",
    key: "appointment",
    href: "/appointment",
  },
];