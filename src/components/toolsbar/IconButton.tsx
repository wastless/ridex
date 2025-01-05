import React from "react";

export default function IconButton({
  onClick,
  children,
  isActive,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex min-h-[36px] min-w-[36px] items-center justify-center rounded-[8px] ${
        isActive
          ? "bg-primary-200" // Активное состояние
          : "hover:bg-greyscale-50" // Дефолтное и наведение
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
