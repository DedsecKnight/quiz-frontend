export const injectClass = () => {
    var getNavbar = document.querySelector(".navbar");
    if (getNavbar?.classList.contains("hidden")) {
        getNavbar?.classList.remove("hidden");
        getNavbar?.classList.remove("md:block");

        getNavbar?.classList.add("block");
    } else {
        getNavbar?.classList.add("hidden");
        getNavbar?.classList.add("md:block");

        getNavbar?.classList.remove("block");
    }
};
