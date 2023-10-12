import React from 'react'
import LikePoke from './LikePoke'

function FavPoke({fav} ) {

  return (
    <div>

        <div className='grid grid-cols-5 mt-3'>
        {/* รับค่า Props จาก useState Faa ที่อยู่ใน App.jsx  และมา map เอาข้อมูลที่มีการกดปุ่ม addFav มาแสดง*/}
        {fav?.map((data,index)=>(
            <div key ={index} className='items-center flex flex-col justify-center mx-auto'>
                <h3 className='text-white text-xl'>{data.name}</h3>
                <img src={data?.sprites?.other?.home.front_default} alt="data.name" />
                <LikePoke />
            </div>
        ))}
        </div>
    </div>
  )
}

export default FavPoke