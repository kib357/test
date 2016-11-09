import { API_URI, CITY_LS_KEY } from '../const';

export const fetchCities = () => {
    return (dispatch) => {
        dispatch({
            type: 'CITIES_FETCH',
            $fetch: [`${API_URI}/cities/`, {
                method: 'GET',
            }],
            $success: () => {
                const savedId = localStorage.getItem(CITY_LS_KEY);
                if (savedId) {
                    dispatch({
                        type: 'CITIES_SELECT',
                        id: savedId * 1,
                    });
                }
            },
        });
    };
};

export const selectCity = (e) => {
    return (dispatch) => {
        const id = e.target.value * 1;
        localStorage.setItem(CITY_LS_KEY, id);
        dispatch({
            type: 'CITIES_SELECT',
            id,
        });
    };
};