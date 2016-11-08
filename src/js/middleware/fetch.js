const createFetchMiddleware = config => {
    config = Object.assign({ options: {} }, config);

    return ({ dispatch, getState }) => (next) => (action) => {
        const { type, $fetch, $success, $error } = action;
        if (!$fetch) {
            return next(action);
        }

        const [url, options] = $fetch;
        const fetchOptions = Object.assign({}, config.options, options);

        dispatch({ type: type + "_REQUEST" });

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
                    try {
                        dispatch({ type: type + "_RESPONSE", data });
                    } catch (e) {
                        console.error("Error while dispatching fetch RESPONSE action:", e);
                    }
                } else {
                    throw new Error(data || `${_response.statusCode} ${_response.statusText}`);
                }
            })
            .catch(error => {
                error = error.message || error;
                if (typeof $error === "function") {
                    setTimeout(() => { $error(error) });
                }
                try {
                    dispatch({ type: type + "_ERROR", error });
                } catch (e) {
                    console.error("Error while dispatching fetch ERROR action:", e);
                }
            });
    };
};

export default createFetchMiddleware;