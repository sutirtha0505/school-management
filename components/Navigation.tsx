"use client"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import NavigationLink from "./NavigationLink";
import ProjectNavigation from "./ProjectNavigation";
import Image from "next/image";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const navigationItems = [
  { name: "Dashboard", image: "/home-updated.svg", route: "/dashboard" },
  { name: "Teachers", image: "/teacher-updated.svg", route: "/dashboard/teachers" },
  { name: "Students", image: "/student-updated.svg", route: "/dashboard/students" },
  { name: "Calendar", image: "/calendar-updated.svg", route: "/dashboard/calendar" },
  { name: "Subjects", image: "/book-updated.svg", route: "/dashboard/subjects" },
  { name: "Section", image: "/section-updated.svg", route: "/dashboard/sections" },
  { name: "Routine", image: "/routine-updated.svg", route: "/dashboard/routine" },
  { name: "Marks", image: "/grade-updated.svg", route: "/dashboard/marks" },
  { name: "Fees", image: "/fee-updated.svg", route: "/dashboard/fees" },
  { name: "Attendance", image: "/attendance-updated.svg", route: "/dashboard/attendance" },
];

const containerVariants = {
  close: { width: "5rem", transition: { type: "spring", damping: 15, duration: 0.5 } },
  open: { width: "16rem", transition: { type: "spring", damping: 15, duration: 0.5 } },
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const containerControls = useAnimationControls();

  useEffect(() => {
    containerControls.start(isOpen ? "open" : "close");
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-secondary flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-wrap w-full justify-center items-center">
          <Image src="/knowledge.svg" width={120} height={120} alt='logo' />
          <div className="w-full h-auto flex justify-between items-center">
            {isOpen && <h1 className="text-xl font-semibold">School Booster</h1>}
            <button className="p-1 rounded-full flex" onClick={handleOpenClose}>
              {isOpen?<PanelRightOpen />:<PanelRightClose />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {navigationItems.map((item) => (
            <NavigationLink key={item.name} name={isOpen?item.name:""} route={item.route}>
              <Image src={item.image} width={30} height={30} alt={item.name} />
            </NavigationLink>
          ))}
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;