import React, { type ReactElement } from 'react'
import type { SidebarItem } from '../types'

type IMainViewProps = {
  children: ReactElement,
  item: SidebarItem
}

const MainView = ({item, children}: IMainViewProps) => {
  return (
    <div className='w-[95%]'>
      <div className='w-[100%] h-[100%] p-6'>
        <div className='text-left text-2xl mb-4'>{item.name}</div>
        {children}
      </div>
    </div>
  )
}

export default MainView