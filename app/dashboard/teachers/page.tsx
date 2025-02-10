"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Search, Dot, Mars, Eye, UserPen, Trash2, Venus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import PopupAddTeacher from '@/components/PopupAddTeacher';
import { supabase } from '@/lib/supabaseClient';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// Define the Teacher Type
type Teacher = {
  id: string; // UUID
  name: string;
  designation: string;
  gender: string;
  isActive: boolean;
  email: string;
  phone: string; // varchar in Supabase
  image: string;
};

const TeachersPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [staffData, setStaffData] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase.from("teachers_info").select("*");

      if (error) {
        console.error("Error fetching teachers:", error);
        return;
      }

      // Map data to match the Teacher type
      const formattedData: Teacher[] = data.map((teacher) => ({
        id: teacher.id,
        name: teacher.name,
        designation: teacher.designation,
        gender: teacher.gender,
        isActive: teacher.active,
        email: teacher.email,
        phone: teacher.contact,
        image: teacher.photo,
      }));

      setStaffData(formattedData);
    };

    fetchTeachers();
  }, []);

  return (
    <div className="w-full h-full p-5 flex justify-center items-center flex-col gap-5">
      <div className={`flex w-full justify-around items-center h-auto transition-all ${isPopupOpen ? 'custom-backdrop-filter opacity-25' : ''}`}>
        <h1 className='font-semibold text-accent-foreground text-lg text-nowrap'>All Teachers</h1>
        <div className='w-full justify-center gap-6 items-center flex px-6'>
          <div>
            <Search className='z-10 w-9 h-10 absolute flex justify-center items-center bg-primary-foreground p-2 rounded-sm' />
            <Input type="text" className='pl-10 h-10 relative placeholder:text-sm' placeholder=" Search Teachers" />
          </div>
        </div>
        <Button onClick={() => setIsPopupOpen(true)}>
          <Image src='/teacher-updated.svg' width={25} height={25} alt='add teacher' />
          Add Teacher
        </Button>
      </div>
      {/* Popup */}
      {isPopupOpen && (
        <>
          {/* Custom Blurred Background */}
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-[3]' style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}></div>

          {/* Popup Content */}
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-[4]'>
            <div className='bg-accent p-5 flex flex-col justify-between items-center rounded-lg w-[500px] h-[600px] relative'>
              <button
                className='absolute top-2 right-2 text-red-500 hover:text-accent-foreground'
                onClick={() => setIsPopupOpen(false)}
              >
                <X size={24} />
              </button>
              <h2 className='text-lg font-semibold mb-4'>Add New Teacher</h2>
              <PopupAddTeacher />
            </div>
          </div>
        </>
      )}

      <div className={`w-full h-[90%] flex flex-wrap gap-5 justify-center items-center ${isPopupOpen ? 'custom-backdrop-filter opacity-25 hidden' : 'visible'}`}>
        {
          staffData.map((teacher) => {
            return (
              <div key={teacher.id} className='w-full h-20 rounded-lg bg-primary-foreground flex justify-between items-center p-5 gap-5'>
                <div className='flex relative'>
                  <Dot className='absolute z-[2]' stroke={teacher.isActive ? 'green' : 'red'} width={80} height={80} />
                  <div className='image rounded-full border-2 border-primary w-12 h-12 overflow-hidden'>
                    <Image className='object-cover w-full h-full' src={teacher.image} height={60} width={60} alt={teacher.name} />
                  </div>
                </div>
                <div className='name&designation flex flex-col gap-1'>
                  <h2 className='font-bold text-accent-foreground text-lg '>{teacher.name}</h2>
                  <p className='text-sm text-accent-foreground'>{teacher.designation}</p>
                </div>
                <div className='flex justify-center items-center p-2 rounded-md bg-primary gap-2'>
                  {teacher.gender === "Male" ? <Mars /> : <Venus />}
                  <p className='text-sm'>{teacher.gender}</p>
                </div>
                <div className='flex flex-col justify-center items-start gap-2'>
                  <div className='flex gap-1 justify-center items-center'>
                    <Image className='object-cover' src='/email.svg' width={20} height={20} alt='email' />
                    <p className='text-sm text-accent-foreground'>{teacher.email}</p>
                  </div>
                  <div className='flex gap-1 justify-center items-center'>
                    <Image className='object-cover' src='/phone-call.png' width={20} height={20} alt='phone' />
                    <p className='text-sm text-accent-foreground'>{teacher.phone}</p>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-4'>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className='text-accent flex bg-primary gap-2 justify-center items-center hover:bg-primary/90 p-2 rounded-lg cursor-pointer text-sm font-medium'>
                        <Eye />
                        View
                      </div>
                    </AlertDialogTrigger>

                    <AlertDialogContent className=' pt-16 w-96 h-[500px] flex flex-col justify-between items-center'>
                      <div className='flex absolute -top-20'>
                        <Dot className='absolute -bottom-5 -right-10 z-[7]' stroke={teacher.isActive ? 'green' : 'red'} width={120} height={80} />
                        <div className='image rounded-full border-2 border-primary w-32 h-32 overflow-hidden'>
                          <Image className='object-cover w-full h-full' src={teacher.image} height={520} width={520} alt={teacher.name} />
                        </div>
                      </div>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-center'>
                          <div className='w-full flex gap-2 justify-center items-center'>
                            {teacher.name}
                            <div className='flex justify-center items-center'>
                            ({teacher.gender === "Male" ? <Mars className='w-4 h-4' /> : <Venus className='w-4 h-4' />})
                            </div>
                          </div>
                          <br />
                          <span className='text-xs font-light'>
                            {teacher.designation}
                          </span>
                        </AlertDialogTitle>
                        
                          <div className='w-full h-full bg-red-300 items-center justify-center'>
                            <p>Hello</p>
                          </div>
                        
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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