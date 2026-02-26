"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Image from "next/image";

import banner1 from "@/public/assist/banner/banner1.jpg";
import banner2 from "@/public/assist/banner/banner2.jpg";
import banner3 from "@/public/assist/banner/banner4.jpg";
import { Button } from "@/components/ui/button";

const Banner = () => {
  const images = [banner1, banner2, banner3];

  return (
    <div className="py-10 bg-[#F8F9FA]">
    <div className="container mx-auto ">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Hospital Management <span className="text-primary">Website</span>
          </h1>

          <p className="text-muted-foreground text-lg">
            We create modern, fast and responsive web applications
            that help your business grow faster than ever.
          </p>

          <Button variant={"default"} size={"lg"}>
            Get Started
          </Button>
        </div>

        {/* RIGHT SIDE (SWIPER) */}
        <div className="relative w-full h-[400px] rounded-md overflow-hidden ">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`banner-${index}`}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Banner;