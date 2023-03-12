import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJS } from '../../services/getStripe'
import styles from './styles.module.scss'

interface SubscribeButtonProps{
    priceId: string
}

export const SubscribeButton = ({priceId}: SubscribeButtonProps) => {
    const {data: session} = useSession()

    async function handleSubscribe(){
        if(!session){
            signIn('github')
            return
        } else {
            try {
                const response = await api.post('/subscribe')

                const {sessionId} = response.data

                const stripe = await getStripeJS()
                stripe.redirectToCheckout({sessionId})
                
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}>
                Subscribe now
        </button>
    ) 
    
}