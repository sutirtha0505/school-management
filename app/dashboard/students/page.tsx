"use client";
import PopupAddStudent from "@/components/PopupAddStudent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dot,
  Eye,
  Mars,
  Search,
  Trash2,
  UserPen,
  Venus,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
type Student = {
  id: string; // UUID
  name: string;
  designation: string;
  gender: string;
  isActive: boolean;
  email: string;
  phone: string; // varchar in Supabase
  image: string;
};

const studentData = [
    { "name": "Aryan Sharma", "admissionID": "A1001", "gender": "Male", "rollNumber": "R1", "class": "10", "section": "A", "religion": "Hindu", "attendance": "Present", "parentContact": "9876543210" },
    { "name": "Ayesha Khan", "admissionID": "A1002", "gender": "Female", "rollNumber": "R2", "class": "10", "section": "A", "religion": "Muslim", "attendance": "Absent", "parentContact": "8765432109" },
    { "name": "Rohan Patel", "admissionID": "A1003", "gender": "Male", "rollNumber": "R3", "class": "10", "section": "B", "religion": "Hindu", "attendance": "Present", "parentContact": "7654321098" },
    { "name": "Priya Mehta", "admissionID": "A1004", "gender": "Female", "rollNumber": "R4", "class": "10", "section": "B", "religion": "Jain", "attendance": "Absent", "parentContact": "6543210987" },
    { "name": "Mohammad Ali", "admissionID": "A1005", "gender": "Male", "rollNumber": "R5", "class": "9", "section": "A", "religion": "Muslim", "attendance": "Present", "parentContact": "5432109876" },
    { "name": "Ananya Gupta", "admissionID": "A1006", "gender": "Female", "rollNumber": "R6", "class": "9", "section": "A", "religion": "Hindu", "attendance": "Absent", "parentContact": "4321098765" },
    { "name": "Karan Verma", "admissionID": "A1007", "gender": "Male", "rollNumber": "R7", "class": "9", "section": "B", "religion": "Hindu", "attendance": "Present", "parentContact": "3210987654" },
    { "name": "Simran Kaur", "admissionID": "A1008", "gender": "Female", "rollNumber": "R8", "class": "9", "section": "B", "religion": "Sikh", "attendance": "Present", "parentContact": "2109876543" },
    { "name": "Neha Rani", "admissionID": "A1010", "gender": "Female", "rollNumber": "R10", "class": "8", "section": "A", "religion": "Christian", "attendance": "Present", "parentContact": "1098765432" },
    { "name": "Sanya Iyer", "admissionID": "A1012", "gender": "Female", "rollNumber": "R12", "class": "8", "section": "B", "religion": "Jain", "attendance": "Absent", "parentContact": "9988776655" },
    { "name": "Divya Sharma", "admissionID": "A1020", "gender": "Female", "rollNumber": "R20", "class": "6", "section": "B", "religion": "Hindu", "attendance": "Present", "parentContact": "8877665544" }
];

const StudentsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [staffData, setStaffData] = useState<Student[]>([]);
  return (
    <div className="w-full h-full p-5 flex justify-center items-center flex-col gap-5">
      <div
        className={`flex w-full justify-around items-center h-auto transition-all ${
          isPopupOpen ? "custom-backdrop-filter opacity-25" : ""
        }`}
      >
        <h1 className="font-semibold text-accent-foreground text-lg text-nowrap">
          All Students
        </h1>
        <div className="w-full justify-center gap-6 items-center flex px-6">
          <div>
            <Search className="z-10 w-9 h-10 absolute flex justify-center items-center bg-primary-foreground p-2 rounded-sm" />
            <Input
              type="text"
              className="pl-10 h-10 relative placeholder:text-sm"
              placeholder=" Search Students"
            />
          </div>
        </div>
        <Button onClick={() => setIsPopupOpen(true)}>
          <Image
            src="/male-student.svg"
            width={25}
            height={25}
            alt="add student"
          />
          Add Student
        </Button>
      </div>
      {/* Popup */}
      {isPopupOpen && (
        <>
          {/* Custom Blurred Background */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-[3]"
            style={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
          ></div>

          {/* Popup Content */}
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[4]">
            <div className="bg-accent p-5 flex flex-col justify-between items-center rounded-lg w-[500px] h-[600px] relative">
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-accent-foreground"
                onClick={() => setIsPopupOpen(false)}
              >
                <X size={24} />
              </button>
              <h2 className="text-lg font-semibold mb-4">Add New Students</h2>
              <PopupAddStudent />
            </div>
          </div>
        </>
      )}

      <div
        className={`w-full h-[90%] flex flex-wrap gap-5 justify-center items-center ${
          isPopupOpen ? "custom-backdrop-filter opacity-25 hidden" : "visible"
        }`}
      >
        {studentData.map((student) => {
          return (
            <div
              key={student.admissionID}
              className="w-full h-20 rounded-lg bg-primary-foreground flex justify-between items-center p-5 gap-5"
            >
              <div className="flex relative">
                <Dot
                  className="absolute z-[2]"
                  stroke={student.attendance==="Present" ? "green" : "red"}
                  width={80}
                  height={80}
                />
                <div className="image rounded-full border-2 border-primary w-12 h-12 overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1587723958656-ee042cc565a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height={60}
                    width={60}
                    alt={student.name}
                  />
                </div>
              </div>
              <div className="name&designation flex flex-col gap-1">
                <h2 className="font-bold text-accent-foreground text-lg ">
                  {student.name}
                </h2>
                <p className="text-sm text-accent-foreground">
                  {student.rollNumber}
                </p>
              </div>
              <div className="flex justify-center items-center p-2 rounded-md bg-primary gap-2">
                {student.gender === "Male" ? <Mars /> : <Venus />}
                <p className="text-sm">{student.gender}</p>
              </div>
              <div className="flex justify-center items-center p-2 rounded-md bg-primary gap-2">
                {student.religion === "Hindu" ? (
                  <Image
                    src="/hindu.svg"
                    height={30}
                    width={30}
                    alt={student.religion}
                  />
                ) : student.religion === "Muslim" ? (
                  <Image
                    src="/muslim.svg"
                    height={30}
                    width={30}
                    alt={student.religion}
                  />
                ) : student.religion === "Christian" ? (
                  <Image
                    src="/christian.svg"
                    height={30}
                    width={30}
                    alt={student.religion}
                  />
                ) : student.religion === "Sikh" ? (
                  <Image
                    src="/sikh.svg"
                    height={30}
                    width={30}
                    alt={student.religion}
                  />
                ) : student.religion === "Buddhist" ? (
                  <Image
                    src="/buddhism.svg"
                    height={30}
                    width={30}
                    alt={student.religion}
                  />
                ) : student.religion === "Jain" ? (
                  <Image
                    src="/jainism.svg"
                    height={30}
                    width={30}
                    alt={student.religion}
                  />
                ) : (
                  <Image
                    src="/nature.svg"
                    height={30}
                    width={30}
                    alt={student.religion}
                  />
                )}

                <p className="text-sm">{student.religion}</p>
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                
                <div className="flex gap-1 justify-center items-center">
                  <Image
                    className="object-cover"
                    src="/phone-call.png"
                    width={20}
                    height={20}
                    alt="phone"
                  />
                  <p className="text-sm text-accent-foreground">
                    {student.parentContact}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="text-accent flex bg-primary gap-2 justify-center items-center hover:bg-primary/90 p-2 rounded-lg cursor-pointer text-sm font-medium">
                      <Eye />
                      View
                    </div>
                  </AlertDialogTrigger>

                  <AlertDialogContent className=" pt-16 w-96 h-[500px] flex flex-col justify-between items-center">
                    <div className="flex absolute -top-20">
                      <Dot
                        className="absolute -bottom-5 -right-10 z-[7]"
                        stroke={student.attendance==="Present" ? "green" : "red"}
                        width={120}
                        height={80}
                      />
                      <div className="image rounded-full border-2 border-primary w-32 h-32 overflow-hidden">
                        <Image
                          className="object-cover w-full h-full"
                          src="https://images.unsplash.com/photo-1587723958656-ee042cc565a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          height={520}
                          width={520}
                          alt={student.name}
                        />
                      </div>
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center">
                        <div className="w-full flex gap-2 justify-center items-center">
                          {student.name}
                          <div className="flex justify-center items-center">
                            (
                            {student.gender === "Male" ? (
                              <Mars className="w-4 h-4" />
                            ) : (
                              <Venus className="w-4 h-4" />
                            )}
                            )
                          </div>
                        </div>
                        <br />
                        <span className="text-xs font-light">
                          {student.rollNumber}
                        </span>
                      </AlertDialogTitle>

                      <div className="w-full h-full bg-red-300 items-center justify-center">
                        <p>Hello</p>
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button className="text-accent">
                  <UserPen />
                  Edit
                </Button>
                <Button variant={"destructive"}>
                  <Trash2 />
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentsPage;
