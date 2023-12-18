'use client'

import React, { useState } from 'react'
import styles from '@/app/styles/showBalance.module.css'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {

  const [data, setData] = useState({
    accNo: '',
    Pin: ''
  })

  const [balance, setBalance] = useState()

  const changeData = (e) => {
    const { name, value } = e.target;
    setData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/showBalance', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const resData = await res.json();
    console.log(res.status)
    console.log(resData)
    console.log(resData.result[0].balance)
    setBalance(resData.result[0].balance);

    if (res.status == 200) {
      toast.success('Account Balance Fetched Successfully!')
    }

    setData({
      accNo: '',
      Pin: ''
    })
  }

  return (
    <div className={styles.mainDiv}>
      <Toaster />
      <div className={styles.formDiv}>
        <form className={styles.form}>
          <div className={styles.inputField}>
            <label>Enter Your Account No.</label>
            <input type='number' name='accNo' placeholder='Account Number' className={styles.input} value={data.accNo} onChange={changeData} />
          </div>
          <div className={styles.inputField}>
            <label>Enter Your Pin</label>
            <input type='password' name='Pin' placeholder='Your Pin' className={styles.input} value={data.Pin} onChange={changeData} />
          </div>
          <div className={styles.btnDiv}>
            <input type='submit' className={styles.btn} onClick={onSubmit} />
          </div>
        </form>
      </div>
      <div>
        {balance ? `Your Balance is ₹${balance}` : null}
      </div>
    </div>
  )
}

export default page