'use client'

import React, { useState } from 'react'
import styles from '@/app/styles/sendMoney.module.css'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {

  const router = useRouter();

  const [userdata, setUserdata] = useState({
    senAcc: '',
    recAcc: '',
    amount: '',
    Pin: ''
  })

  const setData = (e) => {
    const { value, name } = e.target;

    setUserdata(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(userdata);

    const response = await fetch('http://localhost:3001/transfer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata)
    })

    const resData = response.json();
    console.log(response.status);

    if(response.status === 200) {
      toast.success('Amount Successfully Transferred!')
    }

    setUserdata({
      senAcc: '',
      recAcc: '',
      amount: '',
      Pin: ''
    })
  }

  return (
    <div className={styles.mainDiv}>
      <Toaster />
      <div className={styles.formDiv}>
        <h2>Transfer Money</h2>
        <form className={styles.form}>
          <div className={styles.inputField}>
            <label>Enter Your Account No.</label>
            <input type='number' placeholder='Sender Account No.' name='senAcc' className={styles.input} value={userdata.senAcc} onChange={setData} />
          </div>
          <div className={styles.inputField}>
            <label>Enter Receiver's Account No.</label>
            <input type='number' placeholder='Receiver Account No.' name='recAcc' className={styles.input} value={userdata.recAcc} onChange={setData} />
          </div>
          <div className={styles.inputField}>
            <label>Enter Amount</label>
            <input type='number' placeholder='Amount in Rupees' name='amount' className={styles.input} value={userdata.amount} onChange={setData} />
          </div>
          <div className={styles.inputField}>
            <label>Enter Your Pin</label>
            <input type='password' placeholder='Sender Account No.' name='Pin' className={styles.input} value={userdata.Pin} onChange={setData} />
          </div>
          <div className={styles.btnDiv}>
            <input type='submit' className={styles.btn} onClick={onSubmit} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default page