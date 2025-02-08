import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TeachersPage = () => {
  return (
    <div className='w-full h-screen p-5 flex justify-center items-center flex-col gap-5'>
      <div className='flex w-full justify-between items-center h-auto'>
        <h1 className='font-bold text-accent-foreground text-lg text-nowrap'>All Teachers</h1>
        <div className='w-full justify-center relative gap-6 items-center flex px-6'>
          <div>
            <Search className='w-9 h-9 absolute flex justify-center items-center bg-primary-foreground p-2 rounded-sm'/>
          <Input type="text" className='pl-6' placeholder="👉 Search Teachers" />
          </div>
          <Button>Search</Button>
        </div>
        <div className='bg-secondary cursor-pointer p-2 flex flex-wrap gap-2 justify-center items-center rounded-lg'>
          <Image src='/teacher-add.svg' width={30} height={30} alt='add teacher' />
          <h2 className='text-accent-foreground text-center font-semibold text-[15px]'>Add Teacher</h2>
        </div>
      </div>
      <div className='w-full h-[90%] flex flex-wrap gap-5 justify-center items-center'>
        <div className='w-full h-16 rounded-lg bg-primary-foreground flex justify-between items-center p-5 gap-5'>
          <div className='image rounded-full object-cover border-2 border-green-500 w-12 h-12 overflow-hidden'><Image className='object-contain' src='/teacher-2.jpg' height={60} width={60} alt='teacher-2' />
          </div>
          <div className='name&designation  flex flex-col gap-1'>
            <h2 className='font-bold text-accent-foreground text-lg '>John Doe</h2>
            <h4 className='text-sm text-accent-foreground'>Asst. Teacher</h4>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default TeachersPage