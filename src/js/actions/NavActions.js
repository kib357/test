import history from '../services/history';

export const toggleMenu = (e) => {
    const menu = e.currentTarget.getAttribute('data-menu');
    return {
        type: 'NAV_TOGGLE_MENU',
        menu,
    };
};

export const addHistoryListener = () => {
    // return (dispatch, getState) => {
    return () => {
        const location = history.location;
        console.log('addHistoryListener:', location);
        history.listen((location, action) => {
            // location is an object like window.location
            console.log(action, location.pathname, location.state);
        });
    };
};