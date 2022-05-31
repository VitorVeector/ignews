import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
import {signIn, useSession, signOut} from 'next-auth/react'

export const SignInButton = () => {
    const {data: session} = useSession() 

    return session ? (
        <button
            type="button"
            onClick={() => signOut()}
            className={styles.signInButton}>
                <FaGithub color="#04d361"/>
                {session.user.name}
                <FiX color='#737380' className='closeIcon'/>
        </button>
    ) : (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={()=> signIn('github')}>   
            <FaGithub color="#eba417"/>
            Sign in with Github
        </button>
    )
}