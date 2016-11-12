import { CATALOG_API_URI } from '../const';

export const fetchProduct = () => {
    return (dispatch, getState) => {
        const state = getState();
        let uriName = state.nav.path.split('/').filter(p => p).pop();
        const erpId = uriName.split('-').pop();
        const cityId = state.cities.current.erp_id;
        console.debug('[fetchProduct] uriName:', uriName);
        console.debug('[fetchProduct] erpId:', erpId);
        dispatch({
            type: 'PRODUCT_FETCH',
            $fetch: [`${CATALOG_API_URI}/products/${erpId}/view/?city_id=${cityId}`, {
                method: 'GET',
            }],
        });
    };
};