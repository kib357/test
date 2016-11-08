export const toggleMenu = (e) => {
    const menu = e.currentTarget.getAttribute("data-menu");
    return {
        type: "NAV_TOGGLE_MENU",
        menu,
    }
};