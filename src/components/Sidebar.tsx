import type {Dispatch, SetStateAction} from 'react'
import type { SidebarItem } from '../types';


type ISidebarProps = {
  items: SidebarItem[];
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

const Sidebar = ({ items, setActiveIndex }:ISidebarProps) => {
  return (
    <div className='w-[15%] px-4 rounded-lg border-neutral-950 border-r-1'>
      {
        items.map((item:SidebarItem) => {
          return <div className='bg-neutral-800 my-4 p-4 rounded-lg cursor-pointer hover:bg-gray-950 hover:border-neutral-950 hover:border-1' onClick={() => setActiveIndex(item.index)}>
            <div className='text-left'>{item.name}</div>
          </div>
        })
      }
    </div>
  )
}

export default Sidebar