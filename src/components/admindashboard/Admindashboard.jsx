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
  const [showDashboard,setShowDasboard] = useState(true)
  const [users,setUsers]= useState()
  const [loader,setLoader]= useState(false)
  const [email,setEmail] = useState()
  const [userAmount, setUserAmount] = useState()
  const [showModal,setShowModal] = useState(false)
  const [showCreditModal, setShowCreditModal] = useState(false)
  // const [password,setPassword] = useState()
  // const [showForm, SetShowFoarm] = useState(false)
  // const [showPassword,setShowPassword] = useState(false)

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
showCreditModal &&
  <div className="modal-container" style={{marginTop: "0px", marginBottom: "0px", top: '0'}}>
              <div className="modal">
                <div className="modal-header">
                  <h2>Enter amount to credit user</h2>
                </div>
              <MdClose className='close-modal-btn' onClick={()=>{setShowCreditModal(false)}}/>
                <div className="modal-input-container">
                  <div className="modal-input">
                    <input type="text" placeholder='0.00' onChange={(e)=>{
                      setUserAmount(parseInt(e.target.value))
                    }}/>
                     <input type="hidden" name='text' onChange={(e) => {
                      setEmail(e.target.value)
                     }} />
                    <span>USD</span>
                  </div>
                </div>
                <div className="modal-btn-container">
                  <button class="noselect" onClick={()=>{setShowCreditModal(false)}}>
                    <span class="text">close</span><span class="icont"><svg xmlns="http://www.w3.org/2000/svg"       width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                  </button>
                  <button className='next' onClick={()=>{
                    creditUser()
                    setShowCreditModal(false)
                  }}>
                    <span class="label">Next</span>
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            }
           

      {
        showModal && 
        <div className="delete_container">
          
          <div class="del_card" id='del_body'>
     <div class="headerx">
       <div class="imagexx"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                   <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
                 </svg></div>
       <div class="content">
          <span class="title">Desactivate account</span>
          <p class="message">Are you sure you want to deactivate this account? All of the user data will be permanently removed. This action cannot be undone.</p>
       </div>
        <div class="actions">
          <button class="desactivate" type="button" onClick={(e)=>{
                        deleteUser(activeEmail)
                        setShowModal(false)
                         console.log(email)
                       }}>Deactivate</button>
          <button class="cancel" type="button" onClick={() => {
            setShowModal(false)
          }}>Cancel</button>
       </div>
     </div>
     </div>
           </div>
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

                    <td onClick={(e)=>{
                      setShowCreditModal(true)
                      setEmail(refer.email)
                      console.log(e)
                    }}><button className='promo-btn'>credit user</button></td>

                    <td onClick={(e)=>{
                      setShowModal(true)
                      setActiveEmail(refer.email)
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

