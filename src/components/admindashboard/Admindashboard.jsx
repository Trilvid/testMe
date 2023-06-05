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
  if(res.status == 'ok'){
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
  const [showForm, SetShowFoarm] = useState(true)
  const [showDashboard,setShowDasboard] = useState(false)
  const [users,setUsers]= useState()
  const [loader,setLoader]= useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
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

  const login = async()=>{
    setLoader(true)
      const req = await fetch(`${route}/api/admin`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      })
      const res = await req.json()
      console.log(res)
      setLoader(false)
      if(res.status === 200){
        SetShowFoarm(false)
        setShowDasboard(true)
      }
  }
  return (
    <div>
      {
        loader && 
          <div className="wifi-loader-container">
            <div class="loader">
              <span class="l">L</span>
              <span class="o">o</span>
              <span class="a">a</span>
              <span class="d">d</span>
              <span class="i">i</span>
              <span class="n">n</span>
              <span class="g">g</span>
              <span class="d1">.</span>
              <span class="d2">.</span>
            </div>
        </div>
      }
        {
          showForm &&
          <div className="login-wrapper">
          <motion.div className="login-form-container contact-form-containere"
            initial={{ opacity:0}}
            animate={{ opacity:1}}
            transition={{duration:0.3}}
          >
            <div className="logintext-container">
              <div className="login-logo-container sign-up-img">
                  <img src="/whitelogo (1).png" alt="" className='logo' onClick={()=>{
                    navigate('/')
                }}/>
              </div>
            </div>
            <div className="contact-form-container">
            <form className="contact-form" data-aos="fade-up" onSubmit={(e)=>{
                    e.preventDefault()
                    login()
                    }}>
                      <div className="company-intro">
                        <img src="/whitelogo (2).png" alt="" />
                        <h2>login</h2>
                      </div>
                  <div class="input-group">
                      <input required type="text" name="text" autocomplete="off" className="input" onChange={(e)=>{
                        setEmail(e.target.value)
                      }}/>
                      <label className="user-label">email</label>
                  </div>
                  <div class="input-group">
                      <input required type={`${showPassword ? "text" : "password"}`} name="text" autocomplete="off" className="input" 
                        onChange={(e)=>{
                          setPassword(e.target.value)
                        }}
                      />
                      <label className="user-label">password</label>
                      <div className="eye-container" onClick={()=>{setShowPassword(!showPassword)}}>
                        {
                          showPassword ?
                          <BsEye />
                           :
                          <BsEyeSlash/>
                        }
                      </div>
                  </div>
                  <button className='sign-up-btn' type='submit' >
                      login
                      <div className="arrow-wrapper">
                          <div className="arrow"></div>
                      </div>
                  </button>
              </form>
          </div>
          </motion.div> 
        </div> 
        }
        
        {
          showDashboard &&
          <main className="dashboard-wrapper">
            {/* {
            showModal &&
            <motion.div 
            
          >
            <div className="modal-container">
              <div className="modal">
                <div className="modal-header">
                  <h2>enter plan amount</h2>
                </div>
              <MdClose className='close-modal-btn' onClick={()=>{setShowModal(false)}}/>
                <div className="modal-input-container">
                  <div className="modal-input">
                    <input type="text" placeholder='0.00' onChange={(e)=>{
                        setMaxPromo(parseInt(e.target.value))
                    }}/>
                    <input type="text" placeholder='0.00' onChange={(e)=>{
                        setMinPromo(parseInt(e.target.value))
                    }}/>
                    <span>USD</span>
                  </div>
                </div>
                <div className="modal-btn-container">
                  <button class="noselect" onClick={()=>{
                    setShowModal(false)
                  }}>
                    <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"       width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                  </button>
                  <button className='next'>
                    <span class="label">Next</span>
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
        } */}
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
                      // setActiveEmail(refer.email)
                      deleteUser(refer.email)
                      console.log(e)
                    }}className='active-promo-btn'>delete user</td>
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

