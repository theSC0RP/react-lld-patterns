import { type ReactElement } from "react"

type IButton = {
  buttonText: string,
  className?: string,
  onClick: () => void,
}

const Button = ({buttonText, className, onClick}:IButton):ReactElement => {
  return (
    <div onClick={onClick} className={`button p-2 cursor-pointer rounded-md shadow-md hover:shadow-lg ${className}`}>
      {buttonText}
    </div>
  )
}

export default Button