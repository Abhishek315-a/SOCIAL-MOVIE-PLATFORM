import React from 'react'
import "./FeedHome.css";
import Left from '../../components/left/Left'
import Right from '../../components/Right/Right'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useOtherUsers from '../../hooks/useOtherUsers';
import useGetMyTweets from '../../hooks/useGetMyTweets';

const FeedHome = () => {

  // custom hooks
  const {user,otherUsers} = useSelector(store=>store.user);
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);
  return (
    <div className='main-feedhome'>
      <Left/>
      <Outlet/>
      <Right otherUsers={otherUsers}/>
    </div>
  )
}

export default FeedHome
