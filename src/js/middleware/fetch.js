const createFetchMiddleware = config => {
    config = Object.assign({ options: {} }, config);

    return ({ dispatch }) => (next) => (action) => {
        if (action == null || action.$fetch == null) {
            return next(action);
        }
        const { type, $fetch, $success, $error } = action;
        const extra = {};
        for (let key of Object.keys(action)) {
            if (['type', '$fetch', '$success', '$error', 'data', 'error'].indexOf(key) >= 0) {
                continue;
            }
            extra[key] = action[key];
        }
        let url, options;
        if (Array.isArray($fetch)) {
            [url, options] = $fetch;
        } else {
            url = $fetch;
        }
        const fetchOptions = Object.assign({}, config.options, options);

        dispatch(Object.assign({ type: type + '_REQUEST' }, extra));

        let _response;
        fetch(url, fetchOptions)
            .then(response => {
                _response = response;
                return response.json();
            })
            .then(data => {
                if (_response.ok) {
                    if (typeof $success === 'function') {
                        setTimeout(() => { $success(data) });
                    }
                    try {
                        dispatch(Object.assign({ type: type + '_RESPONSE', data }, extra));
                    } catch (e) {
                        console.error(`Error while dispatching ${type}_RESPONSE action:`, e);
                    }
                } else {
                    console.log(_response);
                    const e = new Error(`${_response.status} ${_response.statusText}`);
                    e.data = data;
                    throw e;
                }
            })
            .catch(error => {
                error = error.message || error;
                if (typeof $error === 'function') {
                    setTimeout(() => { $error(error) });
                }
                try {
                    dispatch(Object.assign({ type: type + '_ERROR', error }, extra));
                } catch (e) {
                    console.error('Error while dispatching fetch ERROR action:', e);
                }
            });
    };
};

export default createFetchMiddleware;