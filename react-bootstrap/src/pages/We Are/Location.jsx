import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import WeAreUi from '../We Are/WeAreUi'
import weAre from './WeAre'


function Location (){
  
  return (
    <div className="container">
      <h1 className='text-center fw-bold ine-height: 1.3' >We are in</h1>
        <div className="row my-4 d-flex flex-row justify-content-center  text-center">
                {weAre.map((we , index) => (
                <div className=" col-12 col-sm-5 col-md-3  col-lg-3  mb-5 " key={index}>
                  <WeAreUi image={we.image} title={we.title} branch={we.branch} />   
                  </div>
                )) }
                
        </div>
    </div>
  )
}




export default Location;