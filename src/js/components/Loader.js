import React from "react";

const styles = {
    wrapper: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    progress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        margin: 0,
        transform: "translate(-50%, -50%)",
        textAlign: "center",
    },
    text: {
        fontSize: ".9rem",
        textTransform: "uppercase",
        marginTop: "24px",
    },
    children: {
        marginTop: "24px",
    },
};

const Loader = ({style, text, children}) => {
    const wrapperStyle = style ? Object.assign({}, styles.wrapper, style) : styles.wrapper;
    return (
        <div style={wrapperStyle}>
            <div style={styles.progress}>
                <p style={styles.text}>{text || "Загрузка..."}</p>
                {children && <div style={styles.children}>
                    {children}
                </div>}
            </div>
        </div>
    );
};

export default Loader;