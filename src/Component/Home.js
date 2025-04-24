import React from 'react'
import Navbar from './Navbar'
import tp from '../tp.png'
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../modules/PostModule/DashboardNavbar';
import UserProfile from '../modules/PostModule/UserProfile';
import FindFriends from '../modules/PostModule/FindFriends';

const Home = () => {
    const navigate = useNavigate();
  return (
    <>
    {/* <FindFriends/> */}
   
    {/* <DashboardNavbar/> */}
    {/* <UserProfile/> */}
    
<Navbar/>
<div className="Bgimage">
      <main className="main-content">
        <div className="hero-section">
        </div>

        <aside className="info-box">


          <div className="connect-us">
             <img src={tp} alt='' height={"80px"}/>
           
            
             <button type="button" class="btn btn-secondary" style={{width: "245px"}} onClick={()=>{navigate("/login")}}>
                Login

            </button>
            <br>
            </br>
            

           
            <button  type="button" class="btn btn-secondary"  style={{width: "245px", marginTop:"10px"}} onClick={()=>{navigate("/newuser")}}>
                New User?

            </button>
          </div>
        </aside>
      </main>
      </div>
    </>
  )
}

export default Home
