(function ($) {
    "use strict";

    $(document).ready(function () {
        // Set active class on the current page link in the navbar
        const currentPage = window.location.pathname.split("/").pop();

        console.log(currentPage);

        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

        navLinks.forEach(link => {
            console.log(link.getAttribute("href"));
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
    
})(jQuery);

