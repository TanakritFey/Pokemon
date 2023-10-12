import { useState } from 'react'
import Heart from '../assets/Img/icons8-heart-64.png'
import Heart2 from '../assets/Img/heart.png'

function LikePoke() {

    const [like,setLike] = useState(false);

    // Functionสำหรับกด Like เมื่อกด หัวใจสีขาว จะเปลี่ยนเป็น สีแดง
    const toggleLike = () => {

        // set ค่า ให้กับ like โดยรับพารามิเตอร์ มา Check จาก false -> true คือ หากมี การกดปุ่ม จะให้แสดง หัวใจสีแดง
        setLike((check) => !check)
    }

  return (
    <div className='w-[40%]'>
        {/* เมื่อกด หัวใจ จะให้แสดง รูป ที่ต่างกันโดยใช้ if...else */}
        <button onClick={toggleLike} className='mt-3 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100'>
            {like ? <img src={Heart} alt="heart" /> : <img src={Heart2} alt="heart2" /> } 
        </button>
    </div>
  )
}

export default LikePoke