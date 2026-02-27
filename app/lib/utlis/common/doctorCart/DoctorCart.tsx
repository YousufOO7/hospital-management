/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { DoctorCartProps } from "@/lib/types/doctor";
import Image from "next/image";
import { 
  FaClock, 
  FaCalendarAlt, 
  FaDollarSign,
  FaStar,
  FaHospitalUser
} from "react-icons/fa";
import { MdDiscount } from "react-icons/md";


const DoctorCart: React.FC<DoctorCartProps> = ({ doctors }) => {
  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to format time
//   const formatTime = (time) => {
//     return time; // Already in formatted string like "05:00 PM"
//   };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {doctors?.map((doctor: any) => (
        <div 
          key={doctor.id} 
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border"
        >
          <div className="p-6">
            {/* Header Section with Avatar */}
            <div className="flex items-start gap-4 mb-4">
              <div className="h-16 w-16 border-2 border-blue-500">
                <Image 
                width={100} 
                height={100} 
                src={`/doctor-avatars/${doctor.id}.jpg`} 
                alt="image"
                />
                <p className="bg-blue-100 text-blue-600 text-lg">
                  {getInitials(doctor.name)}
                </p>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.designation}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Button variant="secondary" className="bg-blue-50 text-blue-700">
                    {doctor.specialization}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    {doctor.experience_years}+ years
                  </Button>
                </div>
              </div>
            </div>

            {/* Gender and Experience */}
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <FaHospitalUser className="text-blue-500" />
              <span>{doctor.gender}</span>
            </div>

            {/* Symptoms/Keywords */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Specializes in:</p>
              <div className="flex flex-wrap gap-2">
                {doctor.symptom_keywords.map((symptom: any, index: number) => (
                  <Button key={index} variant="outline" className="bg-gray-50">
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>

            {/* Available Days */}
            <div className="mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <FaCalendarAlt className="text-blue-500" />
                <span className="font-semibold">Available Days:</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-6">
                {doctor.available_days.map((day: any, index: number) => (
                  <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* Visit Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <FaClock className="text-blue-500" />
              <span className="font-semibold">Time:</span>
              <span>{doctor.visit_time.start} - {doctor.visit_time.end}</span>
            </div>

            {/* Price and Discount Section */}
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-green-600" />
                    <span className="text-xl font-bold text-gray-800">
                      {doctor.visit_charge}
                    </span>
                  </div>
                  {doctor.discount_percentage > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <MdDiscount className="text-red-500" />
                      <span className="text-red-500 font-semibold">
                        {doctor.discount_percentage}% off
                      </span>
                    </div>
                  )}
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCart;