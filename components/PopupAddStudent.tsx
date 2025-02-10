"use client";
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
import { format } from "date-fns";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";

interface FormData {
  academic_year: string;
  student_id: string;
  class: string;
  section: string;
  addmission_no: string;
  date_of_addmission: string;
  roll_no: string;
  gender: string;
  name: string;
  aadhar_no: string;
  date_of_birth: string;
  mother_tongue: string;
  blood_group: string;
  religion: string;
  caste: string;
  photo: string;
  concession: string;
  father_name: string;
  mother_name: string;
  primary_mobile_no: string;
  secondary_mobile_no: string;
  address: string;
  email: string;
}

export default function PopupStudent() {
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from(
    { length: 5 },
    (_, i) => `${currentYear - i - 1}-${currentYear - i}`
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    academic_year: "",
    student_id: "",
    class: "",
    section: "",
    addmission_no: "",
    date_of_addmission: "",
    roll_no: "",
    gender: "",
    name: "",
    aadhar_no: "",
    date_of_birth: "",
    mother_tongue: "",
    blood_group: "",
    religion: "",
    caste: "",
    photo: "",
    concession: "",
    father_name: "",
    mother_name: "",
    primary_mobile_no: "",
    secondary_mobile_no: "",
    address: "",
    email: "",
  });

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleNext = () => {
    let requiredFields: (keyof FormData)[] = [];
    let isValid = true;

    if (currentStep === 1) {
      requiredFields = [
        "academic_year",
        "class",
        "section",
        "addmission_no",
        "date_of_addmission",
        "roll_no",
      ];
      isValid =
        requiredFields.every((field) => formData[field].trim() !== "") &&
        !!imageFile;
    } else if (currentStep === 2) {
      requiredFields = ["name", "date_of_birth", "gender", "aadhar_no"];
      isValid = requiredFields.every((field) => formData[field].trim() !== "");
    } else if (currentStep === 3) {
      requiredFields = [
        "mother_tongue",
        "blood_group",
        "religion",
        "caste",
        "concession",
      ];
      isValid = requiredFields.every((field) => formData[field].trim() !== "");
    } else if (currentStep === 4) {
      requiredFields = [
        "father_name",
        "mother_name",
        "primary_mobile_no",
        "secondary_mobile_no",
        "address",
      ];
      isValid = requiredFields.every((field) => formData[field].trim() !== "");
    }
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
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
      const studentId = uuidv4();

      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split(".").pop();
      const filePath = `Teachers/${studentId}/profile.${fileExt}`;

      // Storage upload
      const { error: uploadError } = await supabase.storage
        .from("school-booster")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("school-booster").getPublicUrl(filePath);

      // Database insert
      const { error: dbError } = await supabase.from("students_info").insert({
        id: studentId,
        student_id: formData.student_id,
        addmission_no: formData.addmission_no,
        name: formData.name,
        roll_no: formData.roll_no,
        gender: formData.gender,
        religion: formData.religion,
        mother_tongue: formData.mother_tongue,
        date_of_birth: new Date(formData.date_of_birth).toISOString(),
        caste: formData.caste,
        photo: publicUrl,
        blood_group: formData.blood_group,
        father_name: formData.father_name,
        mother_name: formData.mother_name,
        concession: formData.concession,
        email: formData.email,
        primary_mobile_no: formData.primary_mobile_no,
        secondary_mobile_no: formData.secondary_mobile_no,
        address: formData.address,
        date_of_addmision: new Date(formData.date_of_addmission).toISOString(),
        class: formData.class,
        section: formData.section,
        aadhar_no: formData.aadhar_no,
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
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step <= currentStep ? "bg-primary" : "bg-primary-foreground"
              }`}
            >
              <span
                className={`text-lg ${
                  step <= currentStep ? "text-accent" : "text-accent-foreground"
                }`}
              >
                {step}
              </span>
            </div>
            {step < 4 && (
              <div
                className={`w-16 h-0.5 ${
                  step < currentStep ? "bg-primary" : "bg-primary-foreground"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div>
        {currentStep === 1 && (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <h2 className="text-accent-foreground text-md text-center">
              Academic Information
            </h2>
            {image ? (
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={image}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
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
                {isDragActive ? (
                  <p className="text-center">Drop image here...</p>
                ) : (
                  <Image src="/person.png" width={50} height={50} alt="image" />
                )}
              </div>
            )}
            <div className="flex flex-col gap-2 justify-center items-center">
              <Select
                value={formData.academic_year}
                onValueChange={(value: string) =>
                  handleInputChange("academic_year", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Student ID"
                value={formData.student_id}
                onChange={(e) =>
                  handleInputChange("student_id", e.target.value)
                }
                required
              />
              <Input
                placeholder="Class"
                value={formData.class}
                onChange={(e) => handleInputChange("class", e.target.value)}
                required
              />
              <Input
                placeholder="Section"
                value={formData.section}
                onChange={(e) => handleInputChange("section", e.target.value)}
                required
              />
              <Input
                placeholder="Addmission NO."
                value={formData.addmission_no}
                onChange={(e) =>
                  handleInputChange("addmission_no", e.target.value)
                }
                required
              />
              <Input
                type="date"
                placeholder="Date of Addmission"
                value={
                  formData.date_of_addmission
                    ? format(
                        new Date(formData.date_of_addmission),
                        "yyyy-MM-dd"
                      )
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("date_of_addmission", e.target.value)
                }
                className="w-[280px]"
              />
              <Input
                placeholder="Roll NO."
                value={formData.roll_no}
                onChange={(e) => handleInputChange("roll_no", e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className=" h-full justify-between items-center flex flex-col gap-2">
            <h2 className="text-accent-foreground text-md text-center mb-6">
              Personal Information
            </h2>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <Input
              placeholder="Date of Birth"
              type="date"
              value={
                formData.date_of_birth
                  ? format(new Date(formData.date_of_birth), "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                handleInputChange("date_of_birth", e.target.value)
              }
              className="w-[280px]"
            />
            <Select
              value={formData.gender}
              onValueChange={(value: string) =>
                handleInputChange("gender", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Aadhar Card No."
              value={formData.aadhar_no}
              onChange={(e) => handleInputChange("aadhar_no", e.target.value)}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-accent-foreground text-md text-center mb-6">
              Additional Information
            </h2>
            <Input
              placeholder="Mother Tongue"
              value={formData.mother_tongue}
              onChange={(e) =>
                handleInputChange("mother_tongue", e.target.value)
              }
            />
            <Select
              value={formData.blood_group}
              onValueChange={(value) => handleInputChange("blood_group", value)}
            >
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
              placeholder="Religion"
              value={formData.religion}
              onChange={(e) => handleInputChange("religion", e.target.value)}
            />
            <Input
              placeholder="Caste"
              value={formData.caste}
              onChange={(e) => handleInputChange("caste", e.target.value)}
            />
            <Input
              placeholder="Concession"
              value={formData.concession}
              onChange={(e) => handleInputChange("concession", e.target.value)}
            />
          </div>
        )}
        {currentStep === 4 && (
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-accent-foreground text-md text-center mb-6">
              Guardian Information
            </h2>
            <Input
              placeholder="Father Name"
              value={formData.father_name}
              onChange={(e) => handleInputChange("father_name", e.target.value)}
            />
            <Input
              placeholder="Mother Name"
              value={formData.mother_name}
              onChange={(e) => handleInputChange("mother_name", e.target.value)}
            />
            <Input
              placeholder="Primary Mobile No"
              value={formData.primary_mobile_no}
              onChange={(e) =>
                handleInputChange("primary_mobile_no", e.target.value)
              }
            />
            <Input
              placeholder="Secondary Mobile No"
              value={formData.secondary_mobile_no}
              onChange={(e) =>
                handleInputChange("secondary_mobile_no", e.target.value)
              }
            />
            <Input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        )}
      </div>

      <Button
        className="w-full text-accent-foreground font-bold py-3 rounded-lg"
        onClick={currentStep === 4 ? handleComplete : handleNext}
      >
        {currentStep === 4 ? "Complete" : "Next"}
      </Button>
    </div>
  );
}