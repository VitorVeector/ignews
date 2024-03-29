import { GetServerSideProps } from "next"
import Head from "next/head"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"

interface PostProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updateAt: string
    }
}

export default function Post({post}: PostProps){
    return(
        <>
            <Head>
                <title>{post.slug} | Ignews</title>
            </Head>
            <main>
                <article>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                </article>
            </main>
        </>     
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const {slug} = params

    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID('my-publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }
    return { props: { post }}
}