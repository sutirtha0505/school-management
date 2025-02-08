import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Search, Dot, Mars, Eye, UserPen, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TeachersPage = () => {
  return (
    <div className='w-full h-screen p-5 flex justify-center items-center flex-col gap-5'>
      <div className='flex w-full justify-around items-center h-auto'>
        <h1 className='font-semibold text-accent-foreground text-lg text-nowrap'>All Teachers</h1>
        <div className='w-full justify-center gap-6 items-center flex px-6'>
          <div>
            <Search className='z-10 w-9 h-10 absolute flex justify-center items-center bg-primary-foreground p-2 rounded-sm' />
            <Input type="text" className='pl-10 h-10 relative placeholder:text-sm' placeholder=" Search Teachers" />
          </div>
        </div>
        <Button>
          <Image src='/teacher-updated.svg' width={25} height={25} alt='add teacher' />
          Add Teacher
        </Button>
      </div>
      <div className='w-full h-[90%] flex flex-wrap gap-5 justify-center items-center'>
        <div className='w-full h-20 rounded-lg bg-primary-foreground flex justify-between items-center p-5 gap-5'>
          <div className='flex relative'>
            <Dot className='absolute z-[2]' stroke='green' width={80} height={80} />
            <div className='image rounded-full border-2 border-primary w-12 h-12 overflow-hidden'>
              <Image className='object-cover w-full h-full' src='/teacher-2.jpg' height={60} width={60} alt='teacher-2' />
            </div>

          </div>
          <div className='name&designation  flex flex-col gap-1'>
            <h2 className='font-bold text-accent-foreground text-lg '>John Doe</h2>
            <p className='text-sm text-accent-foreground'>Asst. Teacher</p>
          </div>
          <div className='flex justify-center items-center p-2 rounded-md bg-primary gap-2'>
            <Mars />
            <p className='text-sm'>Male</p>
          </div>
          <div className='flex flex-col justify-center items-start gap-2'>
            <div className='flex gap-1 justify-center items-center'>
              <Image className='object-cover' src='/email.svg' width={20} height={20} alt='email' />
              <p className='text-sm text-accent-foreground'>johndoe@example.com</p>
            </div>
            <div className='flex gap-1 justify-center items-center'>
              <Image className='object-cover' src='/phone-call.png' width={20} height={20} alt='phone' />
              <p className='text-sm text-accent-foreground'>+91 7980100840</p>
            </div>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <Button className='text-accent'>
              <Eye />
              View
            </Button>
            <Button className='text-accent'>
              <UserPen />
              Edit
            </Button>
            <Button variant={'destructive'}>
              <Trash2 />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeachersPage