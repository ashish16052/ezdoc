import React from 'react'
import { useNavigate } from "react-router-dom";
import './Home.scss'

const Home = (props) => {

  const user = props.user;
  const navigate = useNavigate();
  const docArray = [1, 2, 3, 4]
  const boilerPlateArray = [1, 2, 3, 4]

  const openDoc = () => {
    navigate("/doc");
  }

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
            <div className='doc-thumb' onClick={openDoc}>doc-{i}</div>
          ))
        }
        <div className='doc-thumb plus' onClick={openDoc}>+</div>
      </div>
      <h2 className='title'>Boiler plates</h2>
      <div className='doc-list'>
        {
          boilerPlateArray.map((i, k) => (
            <div className='doc-thumb' onClick={openDoc}>Boilerplate-{i}</div>
          ))
        }
        <div className='doc-thumb plus' onClick={openDoc}>+</div>
      </div>
    </div>
  )
}

export default Home