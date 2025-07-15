import React from 'react'

 import Course from "./Pages/Courses";
 import CoursesUi from './CoursesUi';

const Course = () => {
  return (
    <div className='container-fluid  pt-6  ' >
           <p  className='text-center mt-5 fs-1 fw-medium mb-5' style={{color:"#02395a" }}>Pick The Right Course To Build Your Career</p>
        <div className="row text-center  w-100 h-100 d-flex flex-wrap justify-content-center align-items-stretch   p-2"  >
            {courses.map((course , index)  => {
            return(
               <div className='col-12 mb-5 col-sm-4 text-center  col-md-3 col-xl-2  col-lg-4  ' key={index}>
                <CoursesUi image={course.image} title={course.title} />
                </div>
            )
            })
            
            
            }
        </div> 
    </div>
  );
};

export default Course

