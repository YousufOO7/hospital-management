"use client";

import Image from "next/image";
import logo1 from "@/public/assist/images/logo.avif"
import diagnostic from "@/public/assist/images/diagnostic.png"

const HospitalSearchBar = () => {
  return (
    <div className="mb-10">
    <div className="relative w-full bg-[url('/assist/images/babyHand.jpg')] bg-cover bg-center py-16">
      {/* Overlay for slight transparency */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative container mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-md p-2 md:p-4 items-center">
          <input
            type="text"
            placeholder="Search For Doctor/Department/Any Thing..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <select className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
            <option>-- Select Option --</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
            Search
          </button>
        </div>

        {/* Category Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Hospital */}
          <div className="bg-transparent bg-opacity-40 backdrop-blur-md border rounded-lg flex flex-col items-center justify-center p-8 shadow-md hover:shadow-lg transition cursor-pointer">
            <Image
              width={100}
              height={100}
              src={logo1 || ""}
              alt="Hospital"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-lg font-semibold text-white">Hospital</h3>
          </div>

          {/* Diagnostic */}
          <div className="bg-transparent bg-opacity-40 border backdrop-blur-md rounded-lg flex flex-col items-center justify-center p-8 shadow-md hover:shadow-lg transition cursor-pointer">
            <Image
              width={100}
              height={100}
              src={diagnostic || ""}
              alt="Diagnostic"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-lg font-semibold text-white">Diagnostic</h3>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HospitalSearchBar;
