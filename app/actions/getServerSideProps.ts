import { parseCookies } from 'nookies'

import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parseCookies(context)

    const token = cookies['Eattrack-Auth']

    // Utilisez le token comme vous le souhaitez
    // ...
    console.log(token);


    return {
        props: { token}, // Renvoyez ici les props nécessaires à votre page
    }
}
