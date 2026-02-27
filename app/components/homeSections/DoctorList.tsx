"use client"
import DoctorCart from "@/app/lib/utlis/common/doctorCart/DoctorCart";
import { useEffect, useState } from "react";
import { Doctor } from "@/lib/types/doctor";


const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

   useEffect(() => {
    const fetchDoctorsData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("/doctors.json");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // এখানে data সরাসরি array, কারণ আপনার API array return করছে
        console.log("Doctors data:", data);
        
        // নিশ্চিত করুন data একটি array
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          console.warn("Data is not an array:", data);
          setDoctors([]);
        }
        
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch doctors");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsData();
  }, []);

  console.log("doctor", doctors)

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Doctor&apos;s Of Smart Hospital
          </h2>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} className="h-80 w-full rounded-lg" />
          ))}
        </div> */}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto p-4">
            Error loading doctors: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Doctor&apos;s Of Smart Hospital
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({doctors.length} doctor{doctors.length !== 1 ? 's' : ''} available)
          </span>
        </h2>
      </div>

      {/* Pass the doctors array to DoctorCart */}
      <DoctorCart doctors={doctors} />
    </div>
  );
};

export default DoctorList;