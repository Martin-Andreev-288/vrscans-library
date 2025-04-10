type DefaultInputProps = {
  type: string;
  name: string;
  placeholder: string;
  labeltext?: string;
  defaultValue?: string;
};

export default function DefaultInput({
  type,
  name,
  placeholder,
  labeltext,
  defaultValue
}: DefaultInputProps) {
  return (
    <>
      <label htmlFor={name} className="capitalize text-gray-400">
        {labeltext || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full h-[6vh] max-h-12 min-h-9 bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
      />
    </>
  );
}
