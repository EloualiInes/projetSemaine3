import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/redux/userReducer';

export default function Home() {
  const user = useSelector(selectUser)
  console.log("user :", user)
  return (
    <div>
        <h1>Bienvenue {user.infos?.nickName}</h1>
        
    </div>
  )
}
