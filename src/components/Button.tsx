import { type ReactElement } from "react"

type IButton = {
  children: ReactElement[] | ReactElement | string,
  className?: string,
  onClick: () => void,
}

const Button = ({children, className, onClick}:IButton):ReactElement => {
  return (
    <div onClick={onClick} className={`button p-2 cursor-pointer rounded-md shadow-md hover:shadow-lg ${className}`}>
      <>
        {children}
      </>
    </div>
  )
}

export default Button