const createRpcMiddleware = (config, WSClient) => {
    config = Object.assign({ options: {} }, config);

    return ({ dispatch, getState }) => (next) => (action) => {
        const { type, $rpc, $success, $error } = action;
        if (!$rpc) {
            return next(action);
        }
        const extra = {};
        for (let key of Object.keys(action)) {
            if (["type", "$rpc", "$success", "$error"].indexOf(key) >= 0) {
                continue;
            }
            extra[key] = action[key];
        }

        dispatch(Object.assign({ type, state: "REQUEST" }, extra));
        // setTimeout(() => {
        WSClient.call.apply(WSClient, $rpc)
            .then(data => {
                if (typeof $success === "function") {
                    setTimeout(() => { $success(data) });
                }
                dispatch(Object.assign({ type, state: "RESPONSE", data }, extra));
                // dispatch(Object.assign({ type: type + "_RESPONSE", data }, extra));
            })
            .catch(error => {
                error = error.desc || error;
                if (typeof $error === "function") {
                    setTimeout(() => { $error(error) });
                }
                dispatch(Object.assign({ type, state: "ERROR", error }, extra));
                // dispatch(Object.assign({ type: type + "_ERROR", error }, extra));
            });
        // }, 5000);
    };
};

export default createRpcMiddleware;