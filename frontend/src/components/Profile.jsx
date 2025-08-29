import React from 'react'
import Navbar from './shared/Navbar'
import {Avatar,AvatarImage} from './ui/avatar'
const Profile = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
       <Avatar>
        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt=""/>
       </Avatar>
      </div>
    </div>
  )
}

export default Profile
