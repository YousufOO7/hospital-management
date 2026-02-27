import Banner from "../components/homeSections/Banner";
import DoctorList from "../components/homeSections/DoctorList";
import HospitalSearchBar from "../components/homeSections/HospitalSearchBar";
import PublicNav from "../components/shared/PublicNav";

export default function Home() {
  return (
    <>
      <div className="">
        <PublicNav />
      </div>
      <Banner />
      <HospitalSearchBar />
      <DoctorList />
    </>
  );
}
