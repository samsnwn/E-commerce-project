const Button = ({
  submit,
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      type={`${submit ? "submit" : ""}`}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-[teal]" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${outline ? "hover:bg-[teal] hover:text-white" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
