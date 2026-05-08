import Banner from "../components/homeSections/Banner";
import DoctorList from "../components/homeSections/DoctorList";
import HospitalSearchBar from "../components/homeSections/HospitalSearchBar";

export default function Home() {
  return (
    <>
      <Banner />
      <HospitalSearchBar />
      <DoctorList />
    </>
  );
}
