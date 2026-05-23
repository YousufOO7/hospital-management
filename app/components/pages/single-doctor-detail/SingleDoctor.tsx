"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FaStar,
  FaHospitalUser,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaTags,
  FaStethoscope,
  FaUserMd,
  FaBriefcase,
  FaSyringe,
} from "react-icons/fa";

// Type definitions
interface DoctorDetails {
  _id: string;
  name: string;
  gender: string;
  specialization: string;
  designation: string;
  experience_years: number;
  symptom_keywords: string[];
  visit_charge: number;
  discount_percentage: number;
  available_days: string[];
  visit_time: {
    start: string;
    end: string;
  };
}

const SingleDoctor = () => {
  const params = useParams();
  const doctorId = params?.id as string;
  
  const [doctor, setDoctor] = useState<DoctorDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!doctorId) {
        setError("Doctor ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://chat-server-rust.vercel.app/single-doctor/${doctorId}`
        );
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Doctor not found");
          } else if (response.status === 500) {
            throw new Error("Server error. Please try again later.");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setDoctor(data);
        
      } catch (err) {
        console.error("Error fetching doctor details:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  // Calculate discounted price
  const calculateDiscountedPrice = (charge: number, discount: number) => {
    return charge - (charge * discount) / 100;
  };

  // Loading State with Skeleton
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-xl mb-2">⚠️ Error</div>
          <p className="text-red-700 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!doctor) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700">Doctor not found</p>
        </div>
      </div>
    );
  }

  // Main Doctor Details View
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
              <FaUserMd className="text-blue-600 text-5xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{doctor.name}</h1>
              <p className="text-blue-100">{doctor.designation}</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {doctor.specialization}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {doctor.experience_years}+ years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaHospitalUser className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-semibold">{doctor.gender}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaBriefcase className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-semibold">{doctor.experience_years} years</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaStethoscope className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-semibold">{doctor.specialization}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaCalendarAlt className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Available Days</p>
                <p className="font-semibold">{doctor.available_days.join(", ")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaClock className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Visit Time</p>
                <p className="font-semibold">
                  {doctor.visit_time.start} - {doctor.visit_time.end}
                </p>
              </div>
            </div>
          </div>

          {/* Symptoms Section */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FaSyringe className="text-blue-500" />
              Commonly Treats
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.symptom_keywords.map((symptom, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />
              Consultation Fee
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {doctor.discount_percentage > 0 ? (
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                      ৳{doctor.visit_charge}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ৳{calculateDiscountedPrice(doctor.visit_charge, doctor.discount_percentage)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                    <FaTags className="text-green-600" />
                    <span className="text-green-700 font-semibold">
                      {doctor.discount_percentage}% OFF
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  ৳{doctor.visit_charge}
                </p>
              )}
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="border-t pt-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
              Book Appointment
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              * No cancellation fee. Free rescheduling up to 24 hours before appointment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDoctor;