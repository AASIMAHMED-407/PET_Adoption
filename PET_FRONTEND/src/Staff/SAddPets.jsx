import axios from 'axios'
import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"

function SAddPets() {
  let [file,setFile] = useState(null)
  let [pet,setPet] = useState({
    "name":"",
    "breed":"",
    "species":"",
    "age":"",
    "gender":"",
    "status":"NOT ADOPTED YET",
  })
  let alertBox = useRef()
  let alertText = useRef()
  let img = useRef()
  let navigate = useNavigate()

  let handleAddPet = async(e)=>{
    // console.log(pet);
    const formData = new FormData();
    formData.append('name', pet.name);
    formData.append('breed', pet.breed);
    formData.append('species', pet.species);
    formData.append('age', pet.age);
    formData.append('gender', pet.gender);
    formData.append('status', pet.status);
    formData.append('image', file);
    const response = await axios.post('http://127.0.0.1:5000/staff/add/pet', formData, {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response.data.id);
      if(response.data.id>0){
        alertBox.current.style.display="block"
        alertText.current.textContent= "pet added Success"
        setTimeout(()=>{
          alertBox.current.style.display="none"
          navigate("/staff/view/pets")
        },2000)
      }else{
        alertBox.current.style.display="block"
        alertText.current.textContent= "pet failed to add"
        setTimeout(()=>{
          alertBox.current.style.display="none"
        },2000)
      }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
  <div className="container">
  PET ADOPTION
    <img src="https://mdbootstrap.com/img/Photos/new-templates/animal-shelter/logo.png" height="70" alt=""
      loading="lazy" />
    <button className="navbar-toggler ps-0" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
      aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
        <i className="fas fa-bars"></i>
      </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarExample01">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/staff/view/pets" className="nav-link mx-3" aria-current="page">View Pets</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/staff/view/adopted/pets" className="nav-link mx-3" aria-current="page">Adopted Pets</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/staff/add/pet" className="nav-link mx-4" aria-current="page">Add Pet</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/staff/pet/requests" className="nav-link mx-4" aria-current="page" >Adoption Requests</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className='container d-flex flex-wrap' style={{position:"relative",top:"90px"}}>
 
<div className="m-4 alert alert-dark alert-dismissible fade show" ref={alertBox} style={{display:"none",backgroundColor:"#f9c54a"}} role="alert">
  <strong className=''>Hey, <p className='d-inline' ref={alertText}></p></strong>
</div>

      <div id="main-wrapper" className="container">
    <div className="row justify-content-center">
        <div className="col-xl-10">
            <div className="card border-0">
                <div className="card-body p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-6">
                            <div className="p-5">
                                <div className="mb-5">
                                    <h3 className="h4 font-weight-bold " style={{color:"#f9c54a"}}>Add Pet</h3>
                                </div>

                                <h6 className="h5 mb-0">You Are Doing A Great Job</h6>
                                <p className="text-muted mt-2 mb-5"></p>

                                <form>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputEmail1">Pet Name</label>
                                        <input type="text" className="form-control" id="exampleInputEmaitghl1" onChange={(e)=>{
                                          setPet((prev)=>{
                                            prev.name=e.target.value
                                            return prev
                                          })
                                        }}/>
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputPassword1">Pet Breed</label>
                                        <input type="text" className="form-control" id="exampleInputPanhssword1" onChange={(e)=>{
                                          setPet((prev)=>{
                                            prev.breed=e.target.value
                                            return prev
                                          })
                                        }}/>
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputPassword1">Pet Species</label>
                                        <input type="text" className="form-control" id="exampleInputPasswhgord1" onChange={(e)=>{
                                          setPet((prev)=>{
                                            prev.species=e.target.value
                                            return prev
                                          })
                                        }}/>
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="exampleInputPassword1">Pet Age</label>
                                        <input type="text" className="form-control" id="exampleIfgnputPassword1" onChange={(e)=>{
                                          setPet((prev)=>{
                                            prev.age=e.target.value
                                            return prev
                                          })
                                        }}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleInputPassword1">Pet Gender</label>
                                        <input type="text" className="form-control" id="exampledrgfInputPassword1" onChange={(e)=>{
                                          setPet((prev)=>{
                                            prev.gender=e.target.value
                                            return prev
                                          })
                                        }}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleInputPassword1">Pet Image</label>
                                        <input type="file" className="form-control" accept='image/jpg, image/jpeg, image/png' multiple={false} onChange={(e)=>{
                                          setFile(e.target.files[0])
                                          img.current.src=URL.createObjectURL(e.target.files[0])
                                        }}/>
                                    </div>
                                    <button type="button" className="btn align-self-center" style={{backgroundColor:"#f9c54a"}} onClick={handleAddPet}>Add</button>
                                    {/* <a href="#l" className="forgot-link float-right text-primary">Forgot password?</a> */}
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 d-none d-lg-inline-block">
                            <div className="account-block rounded-right">
                                <div className="overlay rounded-right"></div>
                                {/* https://www.worldatlas.com/r/w1200-q80/upload/8b/72/3e/shutterstock-690150508.jpg */}
                                {/* https://askgramps.org/files/2006/06/multi-pet-image.jpg */}
                                <img ref={img} src='' width={"515px"} height={"530px"}/>
                            </div>
                        </div>
                    </div>

                </div>
      
            </div>

        </div>
    
    </div>
  
</div>


</div>
    </>
  )
}

export default SAddPets
