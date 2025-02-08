"use client"
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface FormData {
    name: string;
    gender: string;
    bloodGroup: string;
    dateOfBirth: string;
    maritalStatus: string;
    photo: string;
    qualification: string;
    majorSubject: string;
    experience: string;
    contact: string;
}

export default function PopupAddTeacher() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        gender: "",
        bloodGroup: "",
        dateOfBirth: "",
        maritalStatus: "",
        photo: "",
        qualification: "",
        majorSubject: "",
        experience: "",
        contact: "",
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const handleComplete = () => {
        console.log("Form submitted:", formData);
    };
    const [date, setDate] = useState<Date>();
    const [image, setImage] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const imageUrl: string = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    }, []);
    const removeImage = () => {
        setImage(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1,
    });


    return (
        <>
            <div className="flex justify-center items-center mb-8">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${step <= currentStep ? "bg-primary" : "bg-primary-foreground"
                                }`}
                        >
                            <span className={`text-lg ${step <= currentStep ? "text-accent" : "text-accent-foreground"}`}>{step}</span>
                        </div>
                        {step < 3 && <div className={`w-16 h-0.5 ${step < currentStep ? "bg-primary" : "bg-primary-foreground"}`} />}
                    </div>
                ))}
            </div>

            <div className="mb-8">
                {currentStep === 1 && (
                    <div className="space-y-4 flex flex-col justify-center items-center">
                        <h2 className="text-accent-foreground text-md text-center mb-6">General Information</h2>
                        {image ? (
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
                                    <Image src={image} alt="Preview" width={128} height={128} className="object-cover w-full h-full" />
                                </div>
                                <button
                                    className="absolute z-10 top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    onClick={removeImage}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div
                                {...getRootProps()}
                                className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-primary cursor-pointer hover:border-primary-dark transition-all"
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? <p className="text-center">Drop image here...</p> : <Image src="/person.png" width={50} height={50} alt="image"/>}
                            </div>
                        )}
                        <Input placeholder="Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required/>
                        <Select value={formData.gender} onValueChange={(value: string) => handleInputChange("gender", value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={formData.bloodGroup} onValueChange={(value: string) => handleInputChange("bloodGroup", value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder="BloodGroup" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="AB+">AB+</SelectItem>
                                <SelectItem value="O+">O+</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="AB-">AB-</SelectItem>
                                <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick your Birthday</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Select value={formData.maritalStatus} onValueChange={(value: string) => handleInputChange("maritalStatus", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Marital Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="single">Single</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-4">
                        <h2 className="text-accent-foreground text-md text-center mb-6">Educational Information</h2>
                        <Input placeholder="Qualification" value={formData.qualification} onChange={(e) => handleInputChange("qualification", e.target.value)} />
                        <Input placeholder="Major Subject" value={formData.majorSubject} onChange={(e) => handleInputChange("majorSubject", e.target.value)} />
                        <Input placeholder="Experience" value={formData.experience} onChange={(e) => handleInputChange("experience", e.target.value)} />
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-accent-foreground text-md text-center mb-6">Contact Information</h2>
                        <Input placeholder="Contact" value={formData.contact} onChange={(e) => handleInputChange("contact", e.target.value)} />
                    </div>
                )}
            </div>

            <Button className="w-full text-accent-foreground font-bold py-3 rounded-lg" onClick={currentStep === 3 ? handleComplete : handleNext}>
                {currentStep === 3 ? "Complete" : "Next"}
            </Button>
        </>
    );
}
