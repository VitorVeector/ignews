import { CheckoutLocale } from "@stripe/stripe-js";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
    const chunks = []

    for await (const chunk of readable) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
    }
    return Buffer.concat(chunks)
}

export const config = {
    api: {
        bodyParser: false
    }
}

const relevantEvents = new Set([
    "checkout.session.completed",
    "customer.subscription.updated",   
    "customer.subscription.deleted" ,  
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        const buf = await buffer(req)

        let event: Stripe.Event

        try{
            const secret = req.headers['stripe-signature']
            event = stripe.webhooks.constructEvent(
                buf,
                secret,
                process.env.STRIPE_WEBHOOK_SECRET
              );
        } catch (err){
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        const {type} = event

        try{
            if(relevantEvents.has(type)){
                switch(type){
                    case "customer.subscription.updated":

                        break;
                    case "customer.subscription.deleted":
                        const subscription = event.data.object as Stripe.Subscription
                        saveSubscription(
                            subscription.id, 
                            subscription.customer.toString(),
                            false)
                        break;
                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session
                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString(),
                            true
                        )
                        break;
                    default:
                        throw new Error('Unhandled event')
                }
            }
        } catch{
            return res.json({ error: 'Webhook handler failed.' })
        }
        

        res.json({ received: true })    
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
} 