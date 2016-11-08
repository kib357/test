const createFetchMiddleware = config => {
    config = Object.assign({ options: {} }, config);

    return ({ dispatch, getState }) => (next) => (action) => {
        const { type, $fetch, $success, $error } = action;
        if (!$fetch) {
            return next(action);
        }

        const [url, options] = $fetch;
        const fetchOptions = Object.assign({}, config.options, options);

        dispatch({ type, state: "REQUEST" });

        let _response;
        fetch(url, fetchOptions)
            .then(response => {
                _response = response;
                return response.json();
            })
            .then(data => {
                if (_response.ok) {
                    if (typeof $success === "function") {
                        setTimeout(() => { $success(data) });
                    }
                    dispatch({ type, state: "RESPONSE", data });
                    dispatch({ type: type + "_RESPONSE", data });
                } else {
                    throw new Error(data || `${_response.statusCode} ${_response.statusText}`);
                }
            })
            .catch(error => {
                error = error.message || error;
                if (typeof $error === "function") {
                    setTimeout(() => { $error(error) });
                }
                dispatch({ type, state: "ERROR", error });
                dispatch({ type: type + "_ERROR", error });
            });
    };
};

export default createFetchMiddleware;