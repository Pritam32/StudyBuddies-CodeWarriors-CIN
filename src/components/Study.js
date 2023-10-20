import React from 'react'
import '../assets/css/study.css'

const Study = () => {
  return (
    <div>
        <div class="navbar navbar-expand-lg ">
            <div class="container">
              <a class="navbar-brand" href="#">StudyBuddies</a>
            </div>
          </div>
          <div class="choose">
        <div class="row ">
            <div class="col-lg-6 solo ">

                <div class="row py-2">
                    <div class="col-lg-6 m-auto text-center">
                      <img src="assets/solo.jpeg" alt="" width="400px"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6 m-auto text-center">
                        <h1>Study Solo</h1>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-lg-6 m-auto text-center">
                        <p>Introducing your Personal Learning Haven within our innovative meeting website— efficiency. Sometimes, all you need is a tranquil environment to dive deep into your materials, and that's exactly what we offer.</p>
                    </div>
                </div>

                <div class="row pb-5">
                    <div class="col-lg-6 m-auto text-center">
                     <button class="btn1">Study Solo</button>
                    </div>
                </div>
              
            </div>
            
            <div class="col-lg-6 together">
                <div class="row py-2">
                    <div class="col-lg-6 m-auto text-center">
                       <img src="assets/together.jpeg" alt="" width="450px"/>
                    </div>
                </div>
                <div class="row">
                   
                    <div class="col-lg-6 m-auto text-center">
                        <h1>Study Together</h1>
                    </div>
                    
                </div>
                <div class="row ">
                    <div class="col-lg-6 m-auto text-center">
                       <p>Step into the Collaborative Learning Oasis— In a world where you unite with fellow learners to share insights, conquer challenges, and collectively elevate your learning journey.</p>
                    </div>
                </div>

                <div class="row pb-lg-0 pb-5">
                <a href='/classes'>
                    <div class="col-12 m-auto text-center">
                     <button class="btn2">Study Together</button>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Study;