import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'
import ReactLoading from 'react-loading';
import { FcNext } from 'react-icons/fc'


// Components
import FavPoke from './components/FavPoke'

function App() {
  
  // ใช้ useState เก็บข้อมูลของ Pokemon
  const [poke, setPoke] = useState("");

  const [loading, setLoading] = useState(false);

  const [erorr , setError] = useState("");

  // เอา useState number ไปใช้กับ response ใน api เพื่อจะดึง id ของแต่ตัวออกมา
  const [number , setNumber] = useState(1);

  // ขั้นตอนที่ 3 : useState สำหรับเก็บ add pokemon -> ให้ค่าเริ่มต้นเป็น Array เปล่า // ต้องเก็บเป็น Array เพราะ มีข้อมูล Pokemon หลายตัว 
  const [fav, setFav] = useState([]);   // ขั้นตอนที่ 4 : หลังจากทำ addFave Function เสร็จ จะส่งค่า Fav ไปที่ Components FavPoke.jsx

  // สร้าง function สำหรับปุ่ม ย้อนกลับ , ถัดไป เพื่อให้เปลี่ยนเป็นตัวถัดไป ฟังก์ชั่นสำหรับ + และ - เพื่ออัพเดท useState number เอาไปใช้กับ Button
  const prevPoke = () => {
    setNumber((number) => number - 1);  // function ให้ setNumber รับพารามิเตอร์ number เข้ามา และเอา number ที่รับเข้ามาไป -1 (number นี้ไม่ใช้ state number บรรทัดที่ 15)
  }
  const nextPoke = () => {
    setNumber((number) => number + 1);
  }

  // function add Favorite pokemon : เวลาที่เพิ่ม Pokemon ใหม่ทีชอบ ต้องเก็บ Pokemon เก่าที่ Add มาแล้วด้วย คือ ต้องเก็บ State เก่า ด้วยถ้ามีการ Add State ใหม่่
  const addFav = () => {
    // รับพารามิเตอร์ state ตัวเก่า ต้องเก็บเป็น Array เพราะ มี ข้อมูล หลายข้อมูล จะให้เวลากด Button -> Push ข้อมูล เข้าไปเก็บใน Array ที่มี State ตัวเก่าอยู่
    setFav((oldState) => [...oldState, poke])  // ใน [] ส่ง state เก่า และ เพิ่ม state ตัวใหม่ คือ State poke ที่เก็บข้อมูล Pokemon ไว้
  }

  
  // ใช้เพื่อให้ Run ครั้งเดียว ตอนที่ Components หรือ หน้า Web ของเรา Render เสร็จ
  useEffect (() => {
    // ใช้ยกเลิก request เพื่อไม่ให้เรียกซ้ำ ป้องกันการเรียกซ้ำ
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        // ให้ Loading เปลี่ยนจาก false -> true
        setLoading(true);

        // เรียกใช้ axios ยิง req ไปที่ API poke โดยจะ Get ข้อมูลมา
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`,{ 
          //ส่ง signal ให้กับ req ที่ยิงไป
          signal: abortController.signal
        });
        // ให้ poke เก็บข้อมูลที่ดึงมา ในตัวแปร response
        setPoke(response.data)

        // Fetch ข้อมูลเรียบร้อยไม่มีข้อผิดพลาด Error ให้เป็น String เปล่า
        setError("")
        
      } catch (error) {
        // ถ้ามี Error ในการ Fetch api จะให้ Erorr useState แสดงข้อความ
        setError("Something went wrong!",erorr);

      } finally{

        // ถ้า fetch api แล้วไม่มีข้อผิดพลาดจะให้ Loading เป็น false เหมือนเดิม ให้มันหายไป
        setLoading(false);
      }
    }

    loadPoke();

    // return เพื่อเคลีย Cancel Request
    return () => abortController.abort();
    
  },[number])
  // depedencies คือ เมื่อมีการกด Click Function ที่เราทำคือ ให้ + , -  number เมื่อ  state number มีการเปลี่ยนแปลงเช่น การกดคลิก Next จะให้มีการ Fetch ข้อมูลใหม่ หรือ รัน Code ใน useEffect ใหม่อีกครั้ง

  // เช็คว่าข้อมูลที่ดึง API มา ติดหรือไม่ เช็คใน Console 
  //console.log(poke);
  
  //เช็คว่า เป็น Pokemon Id ไหน เวลาเราเปลี่ยน ตัว โดยใช้ Button Next , prev
//console.log("PokemonID",number);

  console.log("Fav Pokemon",fav);

  return (
    <div className='max-w-5xl p-6 border border-gray-200 rounded-lg shadow bg-[#003459]'>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 '>

      <div>
      {loading ? 
          <ReactLoading type='spin' color='black' height={'20%'} width={'20%'} />
       : 
      <>
      {/* เครื่องหมาย ? คือ optional chaining เป็นตัวดำเนินการที่ทำให้เราสามารถอ่านค่าใน Object. ที่ซ้อนกันหลาย ๆ ชั้น  เป็นการเช็คค่าว้ามีไหม*/}
      <h1 className='text-3xl text-white'>{poke?.name}</h1>  {/* ดึงชื่อ Pokemon id =1  มาใช้จากการดึง API axois */}

      <button onClick={addFav} className='mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2'>Add to favourite</button>  {/* add Favourite Pokemon */}
      <br/>

      <img src={poke?.sprites?.other?.home.front_default}  alt="img" />

      
      <ul >
        <h2 className='text-xl text-white my-1'>Ability</h2>
        {poke?.abilities?.map((abil, index) => (
          <li key={index} className='text-lg  text-white'> • {abil.ability.name} </li>
        ))}
      </ul>

      <button onClick={prevPoke} className='shadow-2xl mr-5 mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2'>Back</button>
      <button onClick={nextPoke} className='shadow-2xl text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2'>Next</button>
      </>
      }
      </div>

      <div >
        <h2 className='text-xl text-white my-2'>Your Favourite Pokemon</h2>
        {/* ถ้า fav.length มากกว่า 0 หรือ มี Pokemon ที่ add มาแล้ว จะให้แสดง ภาพ Pokemon และ ส่งค่า props -> useState Fav ไปที่ FavPoke.jsx */}
        {fav.length > 0 ? <FavPoke fav={fav}/> : <div className='flex h-full justify-center items-center'> <h3 className='text-white'>No Favourite Pokemon</h3> </div> }
      </div>

    </div>
  </div>

    
  )
}

export default App
