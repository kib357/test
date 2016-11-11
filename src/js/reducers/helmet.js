const initialState = { title: 'Строительный двор' };
export default function (state = initialState, action) {
    switch (action.type) {
        case 'STATIC_PAGE_FETCH_RESPONSE': {
            const res = {
                title: action.data.metatitle,
                meta: [
                    { 'name': 'description', 'content': action.data.metadescription },
                    { 'name': 'keywords', 'content': action.data.metakeywords },
                ],
            };
            return Object.assign({}, initialState, res);
        }
        case 'NAV_OPEN_PAGE':
            return Object.assign({}, initialState);
        default:
            return state;
    }
}