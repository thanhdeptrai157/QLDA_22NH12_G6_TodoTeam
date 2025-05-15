
export const AUTH = {
    LOGIN: "/auth/login/",
    LOGOUT: "/auth/logout/",
    REGISTER: "/auth/register/",
    CHANGE_PASSWORD(id: number) {
        return `/auth/${id}/change-password/`;
    }
}

export const GOONG = {
    PLACE_SUGGEST: "/Place/AutoComplete",
    PLACE_DETAIL: "/Place/Detail",
}


export const POST = {
    GET_POST: "/posts/", 
    CREATE_POST: "/posts/",
}