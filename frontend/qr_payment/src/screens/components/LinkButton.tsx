import React from "react";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
    >
      {children}
    </a>
  );
};
