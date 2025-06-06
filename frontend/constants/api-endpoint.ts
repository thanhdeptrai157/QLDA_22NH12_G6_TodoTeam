import { get } from "http";

export const AUTH = {
    LOGIN: "/auth/login/",
    LOGOUT: "/auth/logout/",
    REGISTER: "/auth/register/",
    CHANGE_PASSWORD(id: number) {
        return `/auth/${id}/change-password/`;
    },
    CHANGE_PROFILE(id: number) {
        return `/auth/${id}/change-profile/`;
    }
}

export const GOONG = {
    PLACE_SUGGEST: "/Place/AutoComplete",
    PLACE_DETAIL: "/Place/Detail",
    MAP_NORMAL(MAP_KEY: string) {
        return `https://tiles.goong.io/assets/goong_map_web.json?api_key=${MAP_KEY}`;
    },
    MAP_SATELLITE(MAP_KEY: string) {
        return `https://tiles.goong.io/assets/goong_satellite.json?api_key=${MAP_KEY}`;
    }
};

export const PLACE = {
    GET_ALL_PLACES: "/places/",
    GET_PLACE_BY_ID(id: number) {
        return `/places/${id}`;
    },
    GET_PLACE_TRENDING: "/places/trending",
    GET_PLACE_RECENT: "/places/recent",
    GET_PLACE_TOP_RATED: "/places/top-rated",
    GET_PLACE_POPULAR: "/places/popular",
}

export const POST = {
    GET_POST: "/posts/", 
    CREATE_POST: "/posts/",
    GET_DETAIL_POST(id: number ){
        return `/posts/${id}`
    },
    GET_POST_BY_USER(user_id: number){
        return `/posts/user/${user_id}`
    },
    GET_TOP_POSTS_BY_LIKES(limit?: number) {
        return `/posts/top/likes${limit ? `?limit=${limit}` : ''}`;
    },
    GET_NEWEST_POSTS(limit?: number) {
        return `/posts/top/newest${limit ? `?limit=${limit}` : ''}`;
    },
    GET_POST_BY_CATEGORY(category_id: number) {
        return `/posts/category/${category_id}`;
    }
}

export const CATEGORY = {
    GET_CATEGORY: "/categories/",
    GET_ALL_NUM_POST_BY_CATEGORY: `/categories/with-post-count/`,
    GET_ALL_CATEGORY_WITH_DETAILS: `/categories/with-details/`,
    GET_TOP_CATEGORY: `/categories/top/`,
}

export const COMMENT = {
    CREATE_COMMENT: "/comments/",
    GET_COMMENTS_BY_POST(post_id: number){
        return `/comments/${post_id}`
    }
}
export const LIKE = {
    CREATE_LIKE: "/likes/",
    DELETE_LIKE(is_post: boolean, user_id: number, target_id: number) {
        return `/likes?is_post=${is_post}&user_id=${user_id}&target_id=${target_id}`;
    }
}


export const WEATHER = {
    GET_WEATHER_BY_LOCATION(lat: number, lng: number) {
        return `/weather?lat=${lat}&lon=${lng}`;
    }
}

export const GEMINI = {
    MODEL_2_0_FLASH: "/models/gemini-2.0-flash:generateContent",
}