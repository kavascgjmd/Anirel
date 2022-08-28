import React from 'react'
import Navbar from './Navbar'
import Image from 'next/image'

import otaku from './otaku.jpg'
function ProfileComp() {
  return (
    <div>
        <Navbar/>
        <Image src={otaku} height="80px" width = '80px' alt=""/>
        <div className = "nam">Name</div>
        <div className='posts'>Post : 10</div>
    </div>
  )
}

export default ProfileComp