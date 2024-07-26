import { getCookie } from "typescript-cookie";
const { OAuth2Client } = import('google-auth-library')

export function headersWithAuth() {
    return {
        'Authorization': `Bearer ${getCookie('token')}`
    }
}

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
export const getDecodedOAuthJwtGoogle = async token => {

    const CLIENT_ID_GOOGLE = process.env.GOOGLE_CLIENTID;

    try {
        const client = new OAuth2Client(CLIENT_ID_GOOGLE)

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID_GOOGLE,
        })

        return ticket
    } catch (error) {
        return { status: 500, data: error }
    }
}