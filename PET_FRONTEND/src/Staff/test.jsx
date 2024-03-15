import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

function SLogin() {
    let img = useRef()
    let [file,setFile] = useState(null)

    let handleUpload = async (e)=>{
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
    }
    let [imagesData,setImagesData] = useState([])
    useEffect(()=>{
      let getAllImages = async()=>{
        let data = await axios.get("http://127.0.0.1:5000/images")
        // let img = data.data[1][2].substring(0,6)
        // let loc = data.data[1][2].substring(7,)
        // console.log(data.data[0][0]);
        setImagesData(data.data)
        // http://127.0.0.1:5000/static/images/er.jpg
      }
      getAllImages()
    },[])
  return (
    <div className='container m-5'>
    <input type='file' accept='image/jpg, image/jpeg, image/png' multiple={false} onChange={(e)=>{
        // console.log(e.target.files[0])
        // img.current.src=URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0])
    }}></input>
    <button className='btn btn-danger' onClick={handleUpload}>UPLOAD</button>
    {
      imagesData.map((item,i)=>(
       <img src={`http://127.0.0.1:5000/static/images/`+item[0]} key={i} ref={img} alt='none'></img>
      ))
    }
    </div>
  )
}

export default SLogin
