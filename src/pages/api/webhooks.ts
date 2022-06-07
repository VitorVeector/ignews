import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

async function buffer(readable: Readable) {
    const chunks = []

    for await (const chunks of readable) {
        chunks.push(typeof chunks === "string" ? Buffer.from(chunks) : chunks)
    }
    return Buffer.concat(chunks)
}

export const config = {
    api: {
        bodyPaser: false
    }
}

const relevantEvents = new Set(["checkout.session.completed"])

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        const buf = await buffer(req)
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event

        try{
            event = stripe.webhooks.constructEvent(
                buf,
                secret,
                process.env.STRIPE_WEBHOOK_SECRET
              );
        } catch (err){
            console.log(err)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        const {type} = event
        
        if(relevantEvents.has(type)){
            console.log('Evento recebido', event)
        }

        res.status(200).json({ received: true })    
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}