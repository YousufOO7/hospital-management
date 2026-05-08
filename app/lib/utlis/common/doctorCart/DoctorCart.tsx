/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { DoctorCartProps } from "@/lib/types/doctor";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaHospitalUser
} from "react-icons/fa";


const DoctorCart: React.FC<DoctorCartProps> = ({ doctors }) => {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {doctors?.map((doctor: any) => (
      <>
       <Link href={`doctor-details/${doctor._id}`}>
        <div 
          key={doctor._id} 
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border"
        >
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-20 w-20 border-2 border-blue-500">
                <Image 
                width={100} 
                height={100} 
                src={`/doctor-avatars/.jpg`} 
                alt="image"
                />
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

            {/* Price and Discount Section */}
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <FaHospitalUser className="text-blue-500" />
              <span>{doctor.gender}</span>
            </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
      </>
      ))}
    </div>
  );
};

export default DoctorCart;