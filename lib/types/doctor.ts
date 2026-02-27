// types/doctor.types.ts
export interface Doctor {
  id: number;
  name: string;
  gender: "Male" | "Female" | "Other";
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

export interface DoctorCartProps {
  doctors: Doctor[];  // This means array of Doctor objects
}