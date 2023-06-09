/* eslint-disable no-unused-vars */
import React from 'react'
import './plan.css'
import { useState } from 'react'
import {RxDash} from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import {GiChart} from 'react-icons/gi'


const Plan = () => {
    const navigate = useNavigate()

    const [withdrawMethods,setWithdrawalMethods] = useState([
      {
        id:1,
        min:'$50',
        max:'$499',
        type:'basic ',
        percent:'4',
        duration:'24 hours',
        ref: '10%'
      },
      {
        id:2,
        min:'$500',
        max:'$2499',
        type:'forex/crypto ',
        percent:'8',
        duration:'48 hours',
        ref: '10%'
      },
      {
        id:3,
        min:'$2500',
        max:'$4999',
        type:'real estate ',
        percent:'14',
        duration:'72 hours',
        ref: '10%'
      },
      {
        id:4,
        min:'$5000',
        max:'$9999',
        type:'agro-techonology ',
        percent:'18',
        duration:'5 day(s)',
        ref: '10%'
      },
      {
        id:5,
        min:'$10000',
        max:'$49999',
        type:'stock ',
        percent:'24',
        duration:'15 day(s)',
        ref: '10%'
      },
      {
        id:6,
        min:'$50000',
        max: 'Unlimited',
        type:'Gold',
        percent:'30',
        duration:'30 day(s)',
        ref: '10%'
      },
      ])

  return (
    <div className='plan-section'>
        <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>our plans</h2>
            </div>
            <h1 data-aos="fade-up">choose an investment plan</h1>
            <p data-aos="fade-up">choose an investment plan of your choice, but remember , the bigger the investment the bigger the return</p>
        </div>
        <div className="plan-card-container">
                  
        {
          withdrawMethods.map(method => (
            <div className="plan" key={method.id }>

<div className="inner">
			<span className="pricing">

				<span>
					{method.percent} <small> % </small>
				</span>
			</span>

			<h2 className="title">{method.type}</h2>

			<ul className="features">

				<li>
					<span className="iconxx">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
					<span><strong>Min:</strong> {method.min} </span>
				</li>

				<li>
					<span className="iconxx">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
					<span><strong>Max: </strong> {method.max} </span>
				</li>

				<li>
					<span className="iconxx">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
					<span> <strong>Duration: </strong>{method.duration}</span>
				</li>

				<li>
					<span className="iconxx">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
					<span> <strong>Refferal Commission: </strong>{method.ref}</span>
				</li>

			</ul>
			<div className="action"  onClick={()=>{
                        navigate('/login')
                      }}>
      <Link to='#' className='button'>Choose plan</Link>
			</div>
		</div>
	</div>
    
          ))
        }
                  
        </div>
    </div>
  )
}

export default Plan