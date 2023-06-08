/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
import React from 'react'
import './admindashboard.css'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsEye,BsEyeSlash } from 'react-icons/bs'
import {RiLuggageDepositLine} from 'react-icons/ri'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {BiUser} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {IoIosNotificationsOutline} from 'react-icons/io'
import {MdClose} from 'react-icons/md'
import {GiHamburgerMenu,GiPayMoney} from 'react-icons/gi' 
import {RiMoneyDollarCircleFill} from 'react-icons/ri' 
import Loader from '../../pages/Loader'
import Login from '../../pages/Login'
const Admindashboard = ({route}) => {
   // sweet alert function 
   const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const creditUser = async ()=>{
    setLoader(true)
    const req = await fetch(`${route}/api/fundwallet`,
    {
      method:'POST',
      headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount:userAmount,email:email
    })
  })
  const res = await req.json()
  setLoader(false)
  if(res.status === 'ok'){

    const message = `Your account has been credited with $${res.funded} USD. you can proceed to choosing your preferred investment plan to start earning. Thanks.`
    
    const Data = {
      service_id: 'service_w9veki7',
      template_id: 'template_y66t3qt',
      user_id: 'BrEB12P3lMsZq-ixI',
      template_params: {    
          'to_name': `${res.name}`,
          'email': `${res.email}`,
          'email_subject': `Successful Deposit`,
          'message': `${message}`,
      }
  };

  const sendMail= async()=>{
      const req = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data), 
    })
    const res = await req.json()
    console.log(res)
  }
    sendMail()

    Toast.fire({
      icon: 'success',
      title: `Acoount credited with  $${res.funded} USD`
    })
    setEmail('')
    setUserAmount('')
  }
  else{
    Toast.fire({
      icon: 'error',
      title: `sorry, something went wrong ${res.error} `
    })
  }
  }
 
  const navigate = useNavigate()
  const [activeEmail,setActiveEmail] = useState()
  const [minPromo,setMinPromo] = useState()
  const [maxPromo,setMaxPromo] = useState()
  // const [showForm, SetShowFoarm] = useState(false)
  const [showDashboard,setShowDasboard] = useState(true)
  const [users,setUsers]= useState()
  const [loader,setLoader]= useState(false)
  // const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState()
  // const [password,setPassword] = useState()
  const [userAmount, setUserAmount] = useState()
  const [showModal,setShowModal] = useState(false)
  const fetchUsers = async ()=>{
    const req = await fetch(`${route}/api/getUsers`,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    const res = await req.json()
    setLoader(false)
    if(res){
      setUsers(res)
    }
    else{
      setUsers([])
    }
  }
  
  useEffect(()=>{
    setLoader(true)  
      fetchUsers()
  },[])


  const deleteUser = async(email)=>{
    const req = await fetch(`${route}/api/deleteUser`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,
      })
    })
    const res = await req.json()
    if(res.status === 200){
      Toast.fire({
        icon: 'success',
        title: `you have successfully deleted this user`
      })
      fetchUsers()
    }else{
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }

  return (
    <div>
      {
        loader && <Loader />
      }
        
        {
          showDashboard &&
          <main className="dashboard-wrapper">

              <div className="floating-btn" onClick={()=>{
                navigate('/')
                }}>
                <AiOutlineArrowLeft />
              </div>
            <div className="page-header">
              <h3>checkout your list of signed in users</h3>
              <h2>Users logs</h2>
              <p>we keep track of all users info</p>
            </div>
              <div className='credit-form-container'>
                <form className="credit-form" onSubmit={(e)=>{
                  e.preventDefault()
                  if(email !== undefined && userAmount !== undefined){
                    creditUser()
                  }
                  else{
                    Toast.fire({
                      icon: 'error',
                      title: `fill the required fields `
                    })
                  }
                }}>
                  <input type="email" name="" id="" className='my-input' required placeholder='enter user email' onChange={(e)=>{
                    setEmail(e.target.value)
                  }} value={email}/>
                  <input type="text" name="" id="" className='my-input' required placeholder='enter amount to credit user' onChange={(e)=>{
                    setUserAmount(parseInt(e.target.value))
                  }} value={userAmount}/>
                  <input type="submit" value="credit user" className='credi-user'/>
                </form>
            </div>
            {users && users.length !== 0 ? 
      <div className="page-swiper-wrapper">
      <div className="transaction-container no-ref">
        <table>
            <thead>
              <tr>
                <td>firstname</td>
                <td>lastname</td>
                <td>email</td>
                <td>deposit</td>
                <td>password</td>
                <td>credit user</td>
                <td>delete user</td>
              </tr>
            </thead>
            <tbody>
              {
                users.map(refer =>
                  <tr key={refer.email}>
                    <td>{refer.firstname}</td>
                    <td>{refer.lastname}</td>
                    <td>{refer.email}</td>
                    <td>${refer.funded} USD</td>
                    <td>{refer.password}</td>
                    {/* <td>Dashboard</td> */}
                    
                    {/* <td onClick={(e)=>{
                      if(refer.email) {
                        Toast.fire({
                          icon: "succcess",
                          title: "going to this users dashboard"
                        })
                      }
                    }}>
                      <button className='promo-btn'>view</button>
                      </td> */}

                    <td onClick={(e)=>{
                      console.log(e)
                    }}><button className='promo-btn'>credit user</button></td>

                    <td onClick={(e)=>{
                      // setActiveEmail(refer.email)
                      deleteUser(refer.email)
                      console.log(e)
                    }}><button className='active-promo-btn'>delete user</button></td>
                  </tr>
                )
              }
            </tbody>
          </table>
          </div>
        </div>
      :
      <div className="page-swiper-wrapper">
      <div className="failure-page no-referral-page">
        <img src="/preview.gif" alt="" className='failure-img'/>
        <p>You have not performed any transaction yet. click below to deposit and start transacting.</p>
        <Link to='/fundwallet'>deposit</Link>
      </div>
      </div>
      }
            <div className="dash-chart">
            <iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" style={{width:"100%",height:"536px",scrolling:"none",marginWidth:"0",marginHeight:"0", frameBorder:"0", border:"0",lineHeight: '14px'}}></iframe>
            </div>
        </main>
        }
       
    </div>
  )
}

export default Admindashboard

