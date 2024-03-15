import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from "react-router-dom"

function SPetRequests() {
  let [allPets,setAllPets]=useState([])
  let [visiterNameID,setVisiterName] = useState([])
  let nameCounter = 0
  let idCounter = 1
  let nopetsAdopted = useRef()
  let alertBox = useRef()
  let alertText = useRef()
  useEffect(()=>{
    let getAllPets = async ()=>{
      let data = await axios.get("http://127.0.0.1:5000/all/adoption/request/pets")
      // console.log(data);
      if(data.data["message"]=="FAILED"){
        nopetsAdopted.current.style.display="block"
      }
      else if(data.data[0].length<=0){
        nopetsAdopted.current.style.display="block"
        
      }else{
        nopetsAdopted.current.style.display="none"
        setAllPets(data.data[0])
        setVisiterName(data.data[1])
      }
    }
    getAllPets()
  },[])
  let handleAccept = async (pid)=>{
    let data = await axios.put("http://127.0.0.1:5000/staff/accept/pet/adoption/request/"+pid)
      alertBox.current.style.display="block"
      alertText.current.textContent= "Accpet Success"
      setTimeout(()=>{
        alertBox.current.style.display="none"
        window.location.reload()
      },2000)
    // window.location.reload()
  }
  let handleReject = async (pid,vid)=>{
    // console.log(pid,vid);
    let data = await axios.post("http://127.0.0.1:5000/staff/reject/pet/adoption/request",{pid:pid,vid:vid})
      alertBox.current.style.display="block"
      alertText.current.textContent= "Reject Success"
      setTimeout(()=>{
        alertBox.current.style.display="none"
        window.location.reload()
      },2000)
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

<div className="m-4 alert alert-dark alert-dismissible fade show" ref={alertBox} style={{display:"none"}} role="alert">
  <strong className=''>Hey, <p className='d-inline' ref={alertText}></p></strong>
</div>
<div className='mx-5 d-flex flex-wrap' style={{position:"relative",top:"100px"}}>

<h3 style={{display:"none"}} ref={nopetsAdopted}>NO PETS ADOPTION REWQUIEST YET</h3>
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
              <button  className="btn m-2" style={{backgroundColor:"#f9c54a"}} onClick={()=>handleAccept(item[0])}>Accept</button>
              <button className="btn btn-danger"  onClick={()=>handleReject(item[0],visiterNameID[i][idCounter++])}>Reject</button>
            </div>
            <div class="card-footer text-muted">
            Requester Name: <span className='card-text'>{visiterNameID[i][nameCounter++]}</span>
            </div>
          </div>
          
        ))
      }
</div>
    </>
  )
}

export default SPetRequests
