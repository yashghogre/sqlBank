import Image from 'next/image'
import React from 'react'
import styles from '@/app/styles/navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.logoDiv}>
                <Image src={'/logo-image.png'} height={80} width={80} alt='logo' />
                <h1 style={{color: 'white'}}>Bank</h1>
            </div>

        </div>
    )
}

export default Navbar