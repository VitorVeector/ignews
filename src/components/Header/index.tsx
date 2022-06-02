import Image from 'next/image'
import styles from './styles.module.scss'
import Logo from '../../../public/images/logo.svg'

import { SignInButton } from '../SignInButtom'

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={Logo} alt="Logo Ig News" />
                <nav>
                    <a>Home</a>
                    <a>Posts</a>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}