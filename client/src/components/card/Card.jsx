import React from 'react'
import { useState,useEffect } from 'react'
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import "./card.css"
import {Link} from "react-router-dom"


const Card = ({movie}) => {

  const [isloading,setIsLoading]  = useState(true);

  useEffect(()=>{
    setTimeout(() => {
        setIsLoading(false)
    }, 1500);
  },[])


  return <>
    {
        isloading
        ?
        <div className='cards'>
            <SkeletonTheme color='#202020' highlightColor='#444'>
                <SkeletonTheme height={300} duration={2}/>
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${movie.id}`} style={{textDecoration:"none",color:"white"}}>
            <div className='cards'>
                <img className='cards-image' src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} alt={movie?movie.original_title:""} />
                <div className="cards_overlay">
                    <div className="cards_title"> {movie?movie.original_title:""}</div>
                    <div className="cards_runtime">
                        {movie?movie.release_date:""}
                        <span className='cards_rating'>{movie?movie.vote_average:""}
                            <i className="fa-solid fa-star"></i>{" "}
                        </span>
                    </div>
                    <div className="cards_description">{movie?movie.overview.slice(0,118)+"...":""}</div>
                </div>
            </div>
        </Link>    
    }
  </>
}

export default Card
