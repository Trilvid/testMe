import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Userdashboardheader from './userdashboardheader/Userdashboardheader'
import './userdashboardwithdraw/userdashboardwithdraw.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
const WithdrawReview = ({Active,withdrawAmount,closepage,route,funded}) => {
    const [active,setActive] = useState(Active)
    const [wallet,setWallet] = useState()
    const [amount,setAmount] = useState(withdrawAmount)
    const [loader,setLoader] =  useState(false)

    const navigate = useNavigate()
    useEffect(()=>{
        if(Active === undefined){
            navigate('/fundwallet')
        }
    },[])

    // sweet Alert code 

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

    const withdraw = async ()=>{
        setLoader(true)
        const token = localStorage.getItem('token')
        const req = await fetch(`${route}/api/withdraw`,{
            method:'POST',
            headers : {
                'Content-Type':'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                wallet:wallet,
                WithdrawAmount:amount,
                method:active.method
            })
        })
        const res = await req.json()
        setLoader(false)
        if(res.status == 'ok'){
              Toast.fire({
                icon: 'success',
                title:  `You have successfully placed your withdrawal of ${res.withdraw}. kindly wait for few minutes to be approved by management,Thanks!`
              })
              setWallet('')
        }
        else{
              Toast.fire({
                icon: 'warning',
                title:  `${res.message}`
              })
              setWallet('')
        }
    }
  return (
    <div>
        <Userdashboardheader route={route}/>
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
        <div className="checkout-page">
        <div className="floating-btn" onClick={()=>{
                        closepage()
                    }}>
                        <AiOutlineArrowLeft />
                    </div>
            <h3>Withdrawal Preview</h3>
            <p>Review withdrawal details.</p>
            <div className="withdrawal-review-container">
                <div className="left-withdrawal-review-card">
                    <div className="review-left-card-tab">
                        <p>Current Balance: <b>0 USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Request Balance: <b>{amount ? amount : ''} USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Withdrawal Charge: <b>0 USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>After Charge: <b>1000 USD</b> </p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Conversion Rate: <b>1 USD = 1 USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>You Will Get: <b>{amount ? amount : ''} USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Balance Will be: <b>{funded - amount}</b></p>
                    </div>
                    
                </div>
                <div className="right-withdrawal-review-card">
                    <p>Please enter you <b>{active ? active.method : ''}</b>  Wallet address below</p>
                    <form action="" className="review-withdraw-form" onSubmit={(e)=>{
                        e.preventDefault()
                        withdraw()
                    }}>
                        <label htmlFor="wallet">wallet address</label>
                        <input type="text" id='wallet' placeholder='wallet address' onChange={(e)=>{
                            setWallet(e.target.value)
                        }} required value={wallet}/>
                        <input type="submit" value="confirm" className='confirm-withdraw-btn'/>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WithdrawReview