import { API_URI, CITY_LS_KEY } from "../const";

export const fetchCities = () => {
    return (dispatch, getState) => {
        dispatch({
            type: "CITIES_FETCH",
            $fetch: [`${API_URI}/cities/`, {
                method: "GET",
            }],
            $success: data => {
                const savedId = localStorage.getItem(CITY_LS_KEY);
                if (savedId) {
                    dispatch({
                        type: "CITIES_SELECT",
                        id: savedId * 1,
                    });
                }
            },
            $error: err => {
            },
        });
    };
};

export const selectCity = (e) => {
    return (dispatch, getState) => {
        const id = e.target.value * 1;
        localStorage.setItem(CITY_LS_KEY, id);
        dispatch({
            type: "CITIES_SELECT",
            id,
        })
    }
};