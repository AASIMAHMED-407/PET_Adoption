import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function VRegister() {
    let [vLogin,setVLogin] = useState({
        "name":"",
        "email":"",
        "password":""
      })
      let alertBox = useRef()
      let alertText = useRef()
      let navigate = useNavigate()
      let handleVisiterRegister = async()=>{
        // console.log(vLogin);
        let data = await axios.post("http://127.0.0.1:5000/visiter/register",vLogin)
        // console.log(data.data); 
        if (data.data['id']>0) {
          alertBox.current.style.display="block"
          alertText.current.textContent= "visiter registration Success"
          setTimeout(()=>{
            alertBox.current.style.display="none"
            navigate("/")
          },2000)
        }else{
          alertBox.current.style.display="block"
          alertText.current.textContent= "visiter registeration failed"
          setTimeout(()=>{
            alertBox.current.style.display="none"
          },2000)
        }
        // navigate("/staff/home/2")
      }
  return (
    <>
    <div className="m-4 alert alert-dark alert-dismissible fade show" ref={alertBox} style={{display:"none"}} role="alert">
  <strong className=''>Hey, <p className='d-inline' ref={alertText}></p></strong>
</div>
        <div id="main-wrapper" className="container mt-5" style={{position:"relative",top:"60px"}}>
    <div className="row justify-content-center">
        <div className="col-xl-10">
            <div className="card border-0">
                <div className="card-body p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-6">
                            <div className="p-5">
                                <div className="mb-5">
                                    <h3 className="h4 font-weight-bold " style={{color:"#f9c54a"}}>Visiter Register</h3>
                                </div>

                                <h6 className="h5 mb-0">Welcome back!</h6>
                                <p className="text-muted mt-2 mb-5"></p>

                                <form>
                                <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Name</label>
                                        <input type="text" className="form-control" id="exampleIngdfhputEmail1" onChange={(e)=>{
                                            setVLogin((prev)=>{
                                              prev.name = e.target.value
                                              return prev
                                            })
                                        }}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInghputEmail1" onChange={(e)=>{
                                            setVLogin((prev)=>{
                                              prev.email = e.target.value
                                              return prev
                                            })
                                        }}/>
                                    </div>
                                    <div className="form-group mb-5">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputhPassword1" onChange={(e)=>{
                                            setVLogin((prev)=>{
                                              prev.password = e.target.value
                                              return prev
                                            })
                                        }}/>
                                    </div>
                                    <button type="button" className="btn align-self-center" style={{backgroundColor:"#f9c54a"}} onClick={handleVisiterRegister}>Create</button>
                                    {/* <a href="#l" className="forgot-link float-right text-primary">Forgot password?</a> */}
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 d-none d-lg-inline-block">
                            <div className="account-block rounded-right">
                                <div className="overlay rounded-right"></div>
                                {/* https://www.worldatlas.com/r/w1200-q80/upload/8b/72/3e/shutterstock-690150508.jpg */}
                                {/* https://askgramps.org/files/2006/06/multi-pet-image.jpg */}
                                <img src='https://askgramps.org/files/2006/06/multi-pet-image.jpg' width={"530px"} height={"530px"}/>
                                <div className="account-testimonial">
                                    {/* <h4 className="text-white">This  beautiful theme yours!</h4> */}
                                    <h4 className=" text-white">Adopting A Pet Means You Saved A life</h4>
                                    <p className="lead text-white">This Is A Rescue Home</p>
                                    <Link to={"/"} className='btn' style={{backgroundColor:"#f9c54a"}}>Have Account?</Link>
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

export default VRegister
