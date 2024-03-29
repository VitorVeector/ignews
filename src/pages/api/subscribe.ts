import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from 'next-auth/react'
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";

interface User {
    ref: {
        id: string;
    },
    data: {
        stripe_customer_id: string
    }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req })

        const user = session?.user ? await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        ) : null;

        let customerId = user?.data?.stripe_customer_id;

        if (!customerId) {
            const sessionUserEmail = session?.user?.email;
            if (!sessionUserEmail) {
                return res.status(400).json({ error: 'Missing user email in session.' });
            }

            const stripeCustomer = await stripe.customers.create({
                email: sessionUserEmail,
            });

            await fauna.query(
                q.Update(q.Ref(q.Collection('users'), user.ref.id), {
                    data: {
                        stripe_customer_id: stripeCustomer.id,
                    },
                })
            );

            customerId = stripeCustomer.id;
        }



        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [{ price: 'price_1L0oFdABek0xbiMyYMPSvO53', quantity: 1 }], // We have one product, because this we can to put a static Id of the price
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}