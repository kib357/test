import { API_URI, CITY_LS_KEY } from '../const';
import history from '../services/history';

export const fetchCities = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CITIES_FETCH',
            $fetch: [`${API_URI}/cities/`, {
                method: 'GET',
            }],
            $success: () => {
                let savedId = localStorage.getItem(CITY_LS_KEY) * 1;
                //Выбираем сохраненный или первый город из списка, не сохраняя в localStorage
                dispatch({
                    type: 'CITIES_SELECT',
                    id: savedId || getState().cities.list[0].id,
                });
            },
        });
    };
};

export const selectCity = (id) => {
    return (dispatch, getState) => {
        localStorage.setItem(CITY_LS_KEY, id);
        //Получаем текущие данные для проверки URL – обязательно это сделать до смены города в store
        const state = getState();
        const current = state.cities.current;
        const next = state.cities.list.find(c => c.id === id);

        dispatch({
            type: 'CITIES_SELECT',
            id,
        });

        //Если город уже был выбран и он есть в URL, заменяем его
        if (current && next && current.id !== next.id) {
            const path = state.nav.path;
            if (path.indexOf(current.uri_name) === 1) {
                history.push(path.replace(current.uri_name, next.uri_name));
            }
        }
    };
};