import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useNavigation, useParams } from "react-router-dom"

function VisiterPetRequest() {
    let vidx = useParams()
    let vid = vidx.id
    let nopetsReq = useRef()
    let [allPets,setAllPets]=useState([])
    useEffect(()=>{
      let getAllPets = async ()=>{
        let data = await axios.get("http://127.0.0.1:5000/visiter/request/pets/"+vid)
        // console.log(data);
        if(data.data.length<=0){
          nopetsReq.current.style.display="block"
        }else{
          nopetsReq.current.style.display="none"
          setAllPets(data.data)
        }
      }
      getAllPets()
    },[])
  return (
    <>
         <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
  <div className="container">
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
          <NavLink to={"/visiter/view/pets/"+vid} className="nav-link mx-3" aria-current="page">View Pets</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/visiter/pet/requests/"+vid} className="nav-link mx-4" aria-current="page" >Adoption Requests</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className='container d-flex flex-wrap' style={{position:"relative",top:"100px"}}>
<h3 style={{display:"none"}} ref={nopetsReq}>NO PETS ADOPTED YRT</h3>

{
        allPets.map((item,i)=>(
          <div className="card" key={i} style={{maxWidth:"20rem",margin:"20px",minWidth:"15rem"}}>
            <img className="card-img-top" src={`http://127.0.0.1:5000/static/images/`+item.img} alt="pet image " style={{maxHeight:"200px"}}/>
            <div className="card-body">
              <h5 className="card-title">Name: {item.name}</h5>
              <h6>Breed: {item.breed}</h6>
              <h6>Species: {item.species}</h6>
              <h6 className="card-text">Age:{item.age}</h6>
              <p className="card-text">Gender:{item.gender}</p>
              <p  className="btn"  style={{backgroundColor:"#f9c54a"}}>{item.status}</p>
            </div>
          </div>
        ))
      }

</div>
    </>
  )
}

export default VisiterPetRequest
