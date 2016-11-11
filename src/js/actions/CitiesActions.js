import { API_URI, CITY_LS_KEY } from '../const';

export const fetchCities = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CITIES_FETCH',
            $fetch: [`${API_URI}/cities/`, {
                method: 'GET',
            }],
            $success: () => {
                let savedId = localStorage.getItem(CITY_LS_KEY) * 1;
                if (savedId && savedId !== getState().cities.currentId) {
                    dispatch({
                        type: 'CITIES_SELECT',
                        id: savedId,
                    });
                }
            },
        });
    };
};

export const selectCity = (id) => {
    localStorage.setItem(CITY_LS_KEY, id);
    return {
        type: 'CITIES_SELECT',
        id,
    };
};