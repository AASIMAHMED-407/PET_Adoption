import React, { useEffect } from 'react'
import { NavLink, useNavigate, useNavigation, useParams } from "react-router-dom"

function VHome() {
  let navigate = useNavigate()
  let vidx = useParams()
  let vid = vidx.id
  useEffect(()=>{
    let goViewPret = ()=>{
      navigate("/visiter/view/pets/"+vid)
    }
    goViewPret()
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
    </>
  )
}

export default VHome
