"use client"
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns"
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";

interface FormData {
    teacher_id: string;
    guardian_name: string;
    aadhar_no: string,
    pan_no: string,
    epic_no: string,
    name: string;
    gender: string;
    bloodGroup: string;
    dateOfBirth: string;
    designation: string;
    maritalStatus: string;
    photo: string;
    qualification: string;
    majorSubject: string;
    experience: string;
    dateofjoin: string;
    contact: string;
    email: string;
}

export default function PopupAddTeacher() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        teacher_id: "BDUV15027",
        guardian_name: "",
        aadhar_no: "",
        pan_no: "",
        epic_no: "",
        name: "",
        gender: "",
        bloodGroup: "",
        dateOfBirth: "",
        designation: "Asst. Teacher",
        maritalStatus: "",
        photo: "",
        qualification: "",
        majorSubject: "",
        experience: "",
        dateofjoin: "",
        contact: "+91",
        email: "",
    });

    const handleInputChange = useCallback((field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const handleNext = () => {
        let requiredFields: (keyof FormData)[] = [];
        let isValid = true;

        if (currentStep === 1) {
            requiredFields = ["name", "teacher_id", "designation", "gender", "bloodGroup", "dateOfBirth", "maritalStatus", "guardian_name"];
            isValid = requiredFields.every(field => formData[field].trim() !== "") && !!imageFile;
        } else if (currentStep === 2) {
            requiredFields = ["qualification", "majorSubject", "experience", "dateofjoin"];
            isValid = requiredFields.every(field => formData[field].trim() !== "");
        } else if (currentStep === 3) {
            requiredFields = ["contact", "email", "aadhar_no", "pan_no", "epic_no"];
            isValid = requiredFields.every(field => formData[field].trim() !== "");
        }

        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        } else {
            toast.error("Please fill in all required fields before proceeding.");
        }
    };


    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    }, []);
    const router = useRouter();
    // Include handleInputChange in dependencies
    const handleComplete = async () => {
        // In your state declaration (add this if missing)
        try {
            // Validate required fields
            if (!imageFile) {
                toast.error("Please upload a profile photo");
                return;
            }

            // Generate UUID for teacher
            const teacherId = uuidv4();

            // Upload image to Supabase Storage
            const fileExt = imageFile.name.split('.').pop();
            const filePath = `Teachers/${teacherId}/profile.${fileExt}`;

            // Storage upload
            const { error: uploadError } = await supabase.storage
                .from('school-booster')
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('school-booster')
                .getPublicUrl(filePath);

            // Database insert
            const { error: dbError } = await supabase
                .from('teachers_info')
                .insert({
                    id: teacherId,
                    teacher_id: formData.teacher_id,
                    name: formData.name,
                    designation: formData.designation,
                    gender: formData.gender,
                    blood_group: formData.bloodGroup,
                    date_of_birth: new Date(formData.dateOfBirth).toISOString(),
                    date_of_join: new Date(formData.dateofjoin).toISOString(),
                    marital_status: formData.maritalStatus,
                    photo: publicUrl,
                    guardian_name: formData.guardian_name,
                    qualification: formData.qualification,
                    major_subject: formData.majorSubject,
                    experience: formData.experience,
                    contact: formData.contact,
                    email: formData.email,
                    aadhar_no: formData.aadhar_no,
                    pan_no: formData.pan_no,
                    epic_no: formData.epic_no,
                });

            if (dbError) throw dbError;

            toast.success("Teacher added successfully!");
            // Wait for 5 seconds and refresh the page
            setTimeout(() => {
                window.location.reload();
            }, 5000);
            // Reset form or close modal here
        } catch (error) {
            // Proper error type handling
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };


    const removeImage = () => {
        setImage(null);
        handleInputChange("photo", ""); // Clear formData.photo
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] }, // Only accept images
        multiple: false, // Allow only one file
    });



    return (
        <div className="flex w-full h-full flex-col justify-between items-center overflow-y-scroll scrollbar-hide gap-2">
            <div className="flex justify-center items-center">
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

            <div>
                {currentStep === 1 && (
                    <div className="space-y-4 flex flex-col justify-center items-center">
                        <h2 className="text-accent-foreground text-md text-center">General Information</h2>
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
                            <div {...getRootProps()} className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-primary cursor-pointer hover:border-primary-dark transition-all">
                                <input {...getInputProps()} />
                                {isDragActive ? <p className="text-center">Drop image here...</p> : <Image src="/person.png" width={50} height={50} alt="image" />}
                            </div>


                        )}
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <Input placeholder="Teacher ID" value={formData.teacher_id} onChange={(e) => handleInputChange("teacher_id", e.target.value)} required />
                            <Input placeholder="Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
                            <Input placeholder="Designation" value={formData.designation} onChange={(e) => handleInputChange("designation", e.target.value)} required />
                            <Select value={formData.gender} onValueChange={(value: string) => handleInputChange("gender", value)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={formData.bloodGroup} onValueChange={(value: string) => handleInputChange("bloodGroup", value)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Blood Group" />
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
                            <Input
                                type="date"
                                value={formData.dateOfBirth ? format(new Date(formData.dateOfBirth), "yyyy-MM-dd") : ""}
                                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                                className="w-[280px]"
                            />

                            <Select value={formData.maritalStatus} onValueChange={(value: string) => handleInputChange("maritalStatus", value)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Marital Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Married">Married</SelectItem>
                                    <SelectItem value="Unmarried">Unmarried</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input placeholder="Guardian's name" value={formData.guardian_name} onChange={(e) => handleInputChange("guardian_name", e.target.value)} required />
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className=" h-full justify-between items-center flex flex-col gap-2">
                        <h2 className="text-accent-foreground text-md text-center mb-6">School Information</h2>
                        <Input placeholder="Qualification" value={formData.qualification} onChange={(e) => handleInputChange("qualification", e.target.value)} />
                        <Input placeholder="Major Subject" value={formData.majorSubject} onChange={(e) => handleInputChange("majorSubject", e.target.value)} />
                        <Input placeholder="Experience" value={formData.experience} onChange={(e) => handleInputChange("experience", e.target.value)} />
                        <div className="w-full flex justify-between items-center">
                            <label htmlFor="dateofjoin">Date of Joining:</label>
                        <Input
                            type="date"
                            value={formData.dateofjoin ? format(new Date(formData.dateofjoin), "yyyy-MM-dd") : ""}
                            onChange={(e) => handleInputChange("dateofjoin", e.target.value)}
                        />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h2 className="text-accent-foreground text-md text-center mb-6">Personal Information</h2>
                        <Input type="tel" placeholder="Phone No." value={formData.contact} onChange={(e) => handleInputChange("contact", e.target.value)} />
                        <Input type="email" placeholder="E-Mail" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                        <Input type="text" placeholder="Aadhar Card No." value={formData.aadhar_no} onChange={(e) => handleInputChange("aadhar_no", e.target.value)} />
                        <Input type="text" placeholder="Pan Card no." value={formData.pan_no} onChange={(e) => handleInputChange("pan_no", e.target.value)} />
                        <Input type="text" placeholder="Epic no." value={formData.epic_no} onChange={(e) => handleInputChange("epic_no", e.target.value)} />
                    </div>
                )}
            </div>

            <Button className="w-full text-accent-foreground font-bold py-3 rounded-lg" onClick={currentStep === 3 ? handleComplete : handleNext}>
                {currentStep === 3 ? "Complete" : "Next"}
            </Button>
        </div>
    );
}
