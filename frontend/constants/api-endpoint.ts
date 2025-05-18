
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
    GET_DETAIL_POST(id: number ){
        return `/posts/${id}`
    },
    GET_POST_BY_USER(user_id: number){
        return `/posts/user/${user_id}`
    }
}

export const CATEGORY = {
    GET_CATEGORY: "/categories/",
}

export const COMMENT = {
    CREATE_COMMENT: "/comments/",
    GET_COMMENTS_BY_POST(post_id: number){
        return `/comments/post/${post_id}`
    }
}