import React from 'react';

const styles = {
    wrapper: {
        position: 'fixed',
        padding: '24px',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 1,
        transition: 'opacity .3s linear .2s',
    },
    hidden: {
        padding: 0,
        bottom: '100%',
        heigth: 0,
        overflow: 'hidden',
        opacity: 0,
        transition: 'none',
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: 0,
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    },
    text: {
        fontSize: '.9rem',
        textTransform: 'uppercase',
        // marginTop: "24px",
    },
    children: {
        marginTop: '24px',
    },
};

const Loader = ({style, text, children, position, hide}) => {
    const _position = { position: position || 'fixed' };
    const wrapperStyle = Object.assign({}, styles.wrapper, _position, style, hide && styles.hidden);
    return (
        <div style={wrapperStyle}>
            <div style={styles.progress}>
                <p style={styles.text}>{text || 'Загрузка...'}</p>
                {children && <div style={styles.children}>
                    {children}
                </div>}
            </div>
        </div>
    );
};

export default Loader;