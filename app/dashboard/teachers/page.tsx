import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Search, Dot, Mars, Eye, UserPen, Trash2, Venus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const staffData = [
  {
    id: 1,
    name: "Rajesh Sharma",
    designation: "Headmaster",
    gender: "Male",
    isActive:true,
    email: "rajesh.sharma@example.com",
    phone: "+91 9876543210",
    image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    name: "Priya Verma",
    designation: "Asst. Teacher",
    gender: "Female",
    isActive:false,
    email: "priya.verma@example.com",
    phone: "+91 9823456789",
    image: "https://plus.unsplash.com/premium_photo-1681210062532-ff531e87e41f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    name: "Amit Kumar",
    designation: "Asst. Teacher",
    gender: "Male",
    isActive:true,
    email: "amit.kumar@example.com",
    phone: "+91 9785642310",
    image: "https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    name: "Sunita Reddy",
    designation: "Headmaster",
    gender: "Female",
    isActive:true,
    email: "sunita.reddy@example.com",
    phone: "+91 9765432109",
    image: "https://images.unsplash.com/photo-1600275669439-14e40452d20b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    name: "Vikram Das",
    designation: "Asst. Teacher",
    gender: "Male",
    isActive:false,
    email: "vikram.das@example.com",
    phone: "+91 9898765432",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 6,
    name: "Neha Sinha",
    designation: "Asst. Teacher",
    gender: "Female",
    isActive:false,
    email: "neha.sinha@example.com",
    phone: "+91 9786754321",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 7,
    name: "Manoj Tiwari",
    designation: "Headmaster",
    gender: "Male",
    isActive:true,
    email: "manoj.tiwari@example.com",
    phone: "+91 9867543210",
    image: "https://plus.unsplash.com/premium_photo-1674932532821-708d9658c640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 8,
    name: "Kavita Yadav",
    designation: "Asst. Teacher",
    gender: "Female",
    isActive:true,
    email: "kavita.yadav@example.com",
    phone: "+91 9745632187",
    image: "https://plus.unsplash.com/premium_photo-1661768742069-4de270a8d9fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 9,
    name: "Sandeep Chauhan",
    designation: "Asst. Teacher",
    gender: "Male",
    isActive:false,
    email: "sandeep.chauhan@example.com",
    phone: "+91 9887765432",
    image: "https://plus.unsplash.com/premium_photo-1672239496412-ab605befa53f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 10,
    name: "Anjali Mehta",
    designation: "Asst. Teacher",
    gender: "Female",
    isActive:true,
    email: "anjali.mehta@example.com",
    phone: "+91 9723456789",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 11,
    name: "Ravi Gupta",
    designation: "Headmaster",
    gender: "Male",
    isActive:false,
    email: "ravi.gupta@example.com",
    phone: "+91 9654321098",
    image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG1hbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 12,
    name: "Pooja Pandey",
    designation: "Asst. Teacher",
    gender: "Female",
    isActive:true,
    email: "pooja.pandey@example.com",
    phone: "+91 9823456780",
    image: "https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 13,
    name: "Arun Sharma",
    designation: "Asst. Teacher",
    gender: "Male",
    isActive:false,
    email: "arun.sharma@example.com",
    phone: "+91 9786543212",
    image: "https://plus.unsplash.com/premium_photo-1666298858421-3765c17bcf80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1hbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 14,
    name: "Meenakshi Nair",
    designation: "Asst. Teacher",
    gender: "Female",
    isActive:true,
    email: "meenakshi.nair@example.com",
    phone: "+91 9812345678",
    image: "https://plus.unsplash.com/premium_photo-1668896122554-2a4456667f65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmVtYWxlfGVufDB8fDB8fHww"
  },
  {
    id: 15,
    name: "Deepak Joshi",
    designation: "Headmaster",
    gender: "Male",
    isActive:true,
    email: "deepak.joshi@example.com",
    phone: "+91 9678543210",
    image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG1hbGV8ZW58MHx8MHx8fDA%3D"
  }
];




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
        {
          staffData.map((staff) => {
            return (
              <div key={staff.id} className='w-full h-20 rounded-lg bg-primary-foreground flex justify-between items-center p-5 gap-5'>
                <div className='flex relative'>
                  <Dot className='absolute z-[2]' stroke={staff.isActive?'green':'red'} width={80} height={80} />
                  <div className='image rounded-full border-2 border-primary w-12 h-12 overflow-hidden'>
                    <Image className='object-cover w-full h-full' src={staff.image} height={60} width={60} alt='teacher-2' />
                  </div>
                </div>
                <div className='name&designation flex flex-col gap-1'>
                  <h2 className='font-bold text-accent-foreground text-lg '>{staff.name}</h2>
                  <p className='text-sm text-accent-foreground'>{staff.designation}</p>
                </div>
                <div className='flex justify-center items-center p-2 rounded-md bg-primary gap-2'>
                  {staff.gender === "Male" ? <Mars /> : <Venus />}
                  <p className='text-sm'>{staff.gender}</p>
                </div>
                <div className='flex flex-col justify-center items-start gap-2'>
                  <div className='flex gap-1 justify-center items-center'>
                    <Image className='object-cover' src='/email.svg' width={20} height={20} alt='email' />
                    <p className='text-sm text-accent-foreground'>{staff.email}</p>
                  </div>
                  <div className='flex gap-1 justify-center items-center'>
                    <Image className='object-cover' src='/phone-call.png' width={20} height={20} alt='phone' />
                    <p className='text-sm text-accent-foreground'>{staff.phone}</p>
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
            )
          })
        }
      </div>
    </div>
  )
}

export default TeachersPage