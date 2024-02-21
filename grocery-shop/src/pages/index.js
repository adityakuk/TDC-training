import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/component/Navbar";
import HeaderBanner from "@/component/HeaderBanner";
import ItemDetails from "@/component/ItemDetails";
import Footer from "@/component/Footer"
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <div className="fixed top-0 w-full z-10 ">
        <Navbar setSearchTerm={setSearchTerm} />
      </div>
      <div className="mt-20 bg-[#F4F6FB]">
        <HeaderBanner />
        <ItemDetails searchTerm={searchTerm} />
      </div>
      <div>
        <Footer />
      </div >

    </>
  );
}
