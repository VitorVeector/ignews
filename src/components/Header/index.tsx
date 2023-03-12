import Image from 'next/image'
import styles from './styles.module.scss'
import Logo from '../../../public/images/logo.svg'

import { SignInButton } from '../SignInButtom'
import { ActiveLink } from '../ActiveLink'

export const Header = () => {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={Logo} alt="Logo Ig News" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}