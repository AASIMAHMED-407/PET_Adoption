import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from "react-router-dom"
function SViewPets() {
  let PID = null
  let [allPets,setAllPets]=useState([])
  let nopetsAdopted = useRef()
  let pid_ref = useRef()
  let pname_ref = useRef()
  let pbreed_ref = useRef()
  let pspecies_ref = useRef() 
  let page_ref = useRef() 
  let pgender_ref = useRef()
  let pimg_ref = useRef() 
  let alertBox = useRef()
  let alertText = useRef()
  useEffect(()=>{
    let getAllPets = async ()=>{
      let data = await axios.get("http://127.0.0.1:5000/all/not/adopted/pets")
      // console.log(data.data);
      if(data.data.length<=0){
        nopetsAdopted.current.style.display="block"
        
      }else{
        nopetsAdopted.current.style.display="none"
        setAllPets(data.data)
      }
      // setAllPets(data.data)
    }
    getAllPets()
  },[])
  let handleDeleteModel = (pid,pname,pbreed,pspecies,page,pgender,pimg)=>{
        PID = pid
        pid_ref.current.value = pid;
        pname_ref.current.textContent = pname;
        pbreed_ref.current.textContent = pbreed;
        pspecies_ref.current.textContent = pspecies;
        page_ref.current.textContent = page;
        pgender_ref.current.textContent = pgender;
        pimg_ref.current.src = "http://127.0.0.1:5000/static/images/"+pimg;
    // console.log(pid);
    // let data = await axios.delete("http://127.0.0.1:5000/staff/delete/pet/"+pid)
    // // console.log(data);
    // window.location.reload();
  }
  let handleDelete = async ()=>{
    let data = await axios.delete("http://127.0.0.1:5000/staff/delete/pet/"+PID)
    // window.location.reload();
      alertBox.current.style.display="block"
      alertText.current.textContent= "Accpet Success"
      setTimeout(()=>{
        alertBox.current.style.display="none"
        window.location.reload()
      },2000)
  }
  let handleUpdate = async(pid)=>{
    console.log(pid);
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
    <div className="m-4 alert alert-dark alert-dismissible fade show" style={{position:"relative",top:"100px",display:"none"}} ref={alertBox} role="alert">
  <strong className=''>Hey, <p className='d-inline' ref={alertText}></p></strong>
</div>
      <div className='container d-flex flex-wrap' style={{position:"relative",top:"100px"}}>
      <h3 style={{display:"none"}} ref={nopetsAdopted}>NO PETS AVIALABLE</h3>
      {
        allPets.map((item,i)=>(
          <div className="card" key={i} style={{maxWidth:"20rem",margin:"20px",minWidth:"15rem"}}>
            <img className="card-img-top" src={`http://127.0.0.1:5000/static/images/`+item[7]} alt="pet image " style={{maxHeight:"200px"}}/>
            <div className="card-body">
              <h5 className="card-title">Name: {item[1]}</h5>
              <h6>Breed: {item[2]}</h6>
              <h6>Species: {item[3]}</h6>
              <h6 className="card-text">Age:{item[4]}</h6>
              <p className="card-text">Gender:{item[5]}</p>
              <button  className="btn btn-danger mx-3" data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>handleDeleteModel(item[0],item[1],item[2],item[3],item[4],item[5],item[7])}>Delete</button>
              <button className="btn" style={{backgroundColor:"#f9c54a"}} onClick={()=>handleUpdate(item[0])}>Update</button>
            </div>
          </div>
        ))
      }

      <div className="modal fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">
      {/* <!-- Modal Header --> */}
      <div className="modal-header">
        <h4 className="modal-title" ref={pname_ref}></h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body">
      <input type='hidden' value={""} ref={pid_ref}/>
        <img src="" width={"470px"} height={"300px"} ref={pimg_ref}/>
        <p>BREED: <span ref={pbreed_ref}></span></p>
        <p>SPECIES: <span ref={pspecies_ref}></span></p>
        <p>GENDER: <span ref={pgender_ref}></span></p>
        <p>AGE: <span ref={page_ref}></span></p>
      </div>

      {/* <!-- Modal footer --> */}
      <div className="modal-footer">
        <button type="button" className="btn"  style={{backgroundColor:"#f9c54a"}} data-bs-dismiss="modal" onClick={handleDelete}>DELETE</button>
      </div>

    </div>
  </div>
</div>

      </div>
    </>
  )
}

export default SViewPets
