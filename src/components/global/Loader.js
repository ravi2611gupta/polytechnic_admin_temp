import React from 'react'
import loader from '../../preloader.svg'
export default function Loader() {
  return (
    <div className='w-100 flex items-center justify-center'>
        <img src={loader} alt="" style={{height:'50px'}}/>
    </div>
  )
}
