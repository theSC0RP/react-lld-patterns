import { type ChangeEvent } from 'react'


type IInput<T extends string | number> = {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  className?: string;
  type?: string;
};

const Input = <T extends string | number>({value, type = "string", name, onChange, placeholder, className}: IInput<T>) => {
  return (
    <input 
      placeholder={placeholder || "Enter your message here"}
      className={`bg-amber-50 text-gray-800 border-1 p-2 ${className}`}
      value = {value}
      type={type}
      onChange={(e) => onChange(e)}
      name={name}
    />
  )
}

export default Input