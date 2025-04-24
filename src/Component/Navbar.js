import React from 'react'

import tp from "../tp.png"
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();
  return (
    
    <div>
    <nav class="navbar navbar-expand-lg navbar-light navv" >
<div class="container-fluid">
 <a class="navbar-brand" href="Home"  onClick={() => {
                  navigate("/home");}} style={{fontWeight:"Bold", color:""}}> <img src={tp} alt='' height={"35px"}/></a>
 
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0 navvv" >
        <li>
        
        </li>
      
      

    </ul>
    
  </div>
</div>
</nav>
  </div>
  )
}

export default Navbar
