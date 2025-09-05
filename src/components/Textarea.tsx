import { type ChangeEvent } from 'react'


type ITextarea<T extends string | number> = {
  value: T;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  placeholder?: string;
  className?: string;
  rows?: number;
};

const Textarea = <T extends string | number>({value, onChange, name, placeholder, className, rows}: ITextarea<T>) => {
  return (
    <textarea 
      placeholder={placeholder || "Enter your message here"}
      className={`bg-amber-50 text-gray-800 border-1 p-2 ${className}`}
      name = {name}
      value = {value}
      rows = {rows || 5}
      onChange = {(e) => onChange(e)}
    />
  )
}

export default Textarea