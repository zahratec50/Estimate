
type InputProps = {
  name: string;
  labelName: string;
  type: string;
  register: any;
  // error: any;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  toggle?: () => void;
  disabled?: boolean;
};

export default function Input({
  name,
  labelName,
  type,
  register,
  // error,
  icon1,
  icon2,
  toggle,
  disabled,
}: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{labelName}</label>
      <div className="relative">
        <input
          {...register(name)}
          type={type}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder={`Enter Your ${name}`}
          disabled={disabled}
        />
        {toggle && (
          <span
            onClick={toggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {type === "password" ? icon1 : icon2}
          </span>
        )}
      </div>
      {/* {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>} */}
    </div>
  );
}
