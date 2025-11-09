const BASEURL = import.meta.env.VITE_APP_BASE_URL;


export const API = {
    USER : {
        SETTINGS : `${BASEURL}/user/settings`,
        REGISTER : `${BASEURL}/user/register`,
        LOGIN : `${BASEURL}/user/login`
    },

    CART : {
        URL : `${BASEURL}/cart`,
    },

    PRODUCTS : {
        GET_PRODUCTS : `${BASEURL}/products`
    }

}

