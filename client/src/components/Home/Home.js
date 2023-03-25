import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Home.scss'
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid'

const Home = (props) => {

  const user = props.user;
  const navigate = useNavigate();
  const [docArray, setDocArray] = useState([])
  const boilerPlateArray = [1, 2, 3, 4]

  const openDoc = (i) => {
    navigate(`/doc/${i._id}`);
  }

  const openNewDoc = () => {
    navigate(`/doc/${uuidV4()}`);
  }

  const getDocs = async () => {
    const docs = await axios.get(`http://localhost:3001/doc/findall/${props.user._id}`)
    console.log(docs.data);
    setDocArray(docs.data)
  }

  useEffect(() => {
    getDocs()
  }, [])


  const signout = (e) => {
    sessionStorage.removeItem("user");
    window.open(`http://localhost:3001/auth/logout`, "_self");
  }

  return (
    <div className='home'>
      <div className='nav'>
        <h1>📄EzDoc</h1>
        <div className='user'>
          <p>{user.name}</p>
          <img src={user.pfp} />
          <div className='sign-out' onClick={signout}>Sign out</div>
        </div>
      </div>
      <h2 className='title'>Your Documents</h2>
      <div className='doc-list'>
        {
          docArray.map((i, k) => (
            <div doc={i} className='doc-thumb' onClick={() => openDoc(i)}>doc-{i._id}</div>
          ))
        }
        <div className='doc-thumb plus' onClick={openNewDoc}>+</div>
      </div>
      <h2 className='title'>Boiler plates</h2>
      <div className='doc-list'>
        {
          boilerPlateArray.map((i, k) => (
            <div className='doc-thumb' onClick={openDoc}>Boilerplate-{i}</div>
          ))
        }
        <div className='doc-thumb plus' onClick={openNewDoc}>+</div>
      </div>
    </div>
  )
}

export default Home