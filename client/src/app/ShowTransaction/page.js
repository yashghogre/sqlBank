'use client'

import React, { useState } from 'react'
import styles from '@/app/styles/showTransaction.module.css'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {

  const [result, setResult] = useState([])

  const [userdata, setUserdata] = useState({
    accNo: ''
  })

  const setData = (e) => {
    const { name, value } = e.target;

    setUserdata(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/display', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    })

    const resData = await res.json();

    console.log(res.status)
    console.log(resData)

    setResult(resData.result)
    console.log(result)
  }

  return (
    <div className={styles.mainDiv}>
      <Toaster />
      <div className={styles.formDiv}>
        <h2>Transfer Money</h2>
        <form className={styles.form}>
          <div className={styles.inputField}>
            <label>Enter Your Account No.</label>
            <input type='number' placeholder='Sender Account No.' name='accNo' className={styles.input} value={userdata.accNo} onChange={setData} />
          </div>
          <div className={styles.btnDiv}>
            <input type='submit' className={styles.btn} onClick={onSubmit} />
          </div>
        </form>
      </div>
      <div>
        {`${result}`}
      </div>
    </div>
  )
}

export default page