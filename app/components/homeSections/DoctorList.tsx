"use client"
import DoctorCart from "@/app/lib/utlis/common/doctorCart/DoctorCart";
import { useEffect, useState } from "react";
import { Doctor } from "@/lib/types/doctor";
import Pagination from "@/app/lib/utlis/common/Pagination";

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6); 

  useEffect(() => {
    const fetchDoctorsData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("https://chat-server-rust.vercel.app/allDoctors");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
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

  useEffect(() => {
    setCurrentPage(1);
  }, [doctors]);

  // Pagination calculations
  const totalDoctors = doctors.length;
  const totalPages = Math.ceil(totalDoctors / itemsPerPage);
  
  // Get current page doctors
  const indexOfLastDoctor = currentPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Handle page change
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Doctor&apos;s Of Smart Hospital
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {/* Optional: Add skeleton loaders here */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border p-6 animate-pulse">
              <div className="h-20 w-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading doctors: {error}
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Doctor&apos;s Of Smart Hospital
          </h2>
          <p className="text-gray-600">No doctors available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Doctor&apos;s Of Smart Hospital
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({totalDoctors} doctor{totalDoctors !== 1 ? 's' : ''} available)
          </span>
        </h2>
        
        {/* Optional: Items per page selector */}
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstDoctor + 1} - {Math.min(indexOfLastDoctor, totalDoctors)} of {totalDoctors}
        </div>
      </div>

      <DoctorCart doctors={currentDoctors} />
      
      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-end">
          <Pagination
            currentPage={currentPage}
            lastPage={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorList;