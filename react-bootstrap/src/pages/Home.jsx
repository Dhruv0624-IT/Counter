// src/Pages/Home.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CoursesUi from "../Courses/CoursesUi"; 
import courses from "../Courses/Courses";     
export default function Home() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/slider/rnw_web_slider.png" alt="" width="100%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/rnw_web_slider1.png" alt="" width="100%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/rnw_web_slider2.png" alt="" width="100%" />
        </SwiperSlide>
      </Swiper>

      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#02395a" }}>
          Trending Courses
        </h2>
        <div className="row justify-content-center">
          {courses.slice(0, 6).map((course, idx) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
              key={idx}
            >
              <CoursesUi
                image={course.image}
                title={course.title.replace(/\\n/g, " ")}
                overlay={course.overlay}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
