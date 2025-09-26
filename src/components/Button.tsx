import { type ReactElement } from "react"

type IButton = {
  children: ReactElement[] | ReactElement | string,
  onClick: () => void,
  className?: string,
  disabled?: boolean
}

const Button = ({children, className, disabled, onClick}:IButton):ReactElement => {

  return (
    <button onClick={onClick} className={`button p-2 ${!disabled ? "cursor-pointer" : "cursor-not-allowed"} rounded-md shadow-md hover:shadow-lg ${className}`} disabled={disabled}>
      <>
        {children}
      </>
    </button>
  )
}

export default Button