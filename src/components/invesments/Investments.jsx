import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
const Investments = ({route}) => {

  
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader,setLoader] = useState(false)

  useEffect(()=>{
    setLoader(true)
    if(localStorage.getItem('token')){
        const getData = async()=>{
            const req = await fetch(`${route}/api/getData`,{
                headers: {
                'x-access-token': localStorage.getItem('token')
                }
            })
            const res = await req.json()
            setUserData(res)
            setLoader(false)
        }
        getData()
    }
    else{
        navigate('/login')
    }
  },[])
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
      {userData && userData.invest.length !== 0 ? 
      <div className="page-swiper-wrapper">
      <div className="page-header">
          <h3>checkout your investment logs</h3>
          <h2>Investment logs</h2>
          <p>we keep track of all your invesments</p>
      </div>
      <div className="transaction-container no-ref">
        <table>
            <thead>
              <tr>
                <td>amount</td>
                <td>plan</td>
                <td>started</td>
                <td>profit earned</td>
                <td>total profit</td>
              </tr>
            </thead>
            <tbody>
              {
                userData.invest.map(refer =>
                  <tr>
                    <td>${refer.amount} USD</td>
                    <td>{refer.plan}</td>
                    <td>{refer.startDate}</td>
                    <td>{userData.periodicProfit ? userData.periodicProfit : '0.00 USD'}</td>
                    <td>${refer.profit} USD</td>
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
        <p>You have not invested yet. Click the button below to make your first investment</p>
        <Link to='/fundwallet'>invest</Link>
      </div>
      </div>
      }
     
</div>
  )
}

export default Investments