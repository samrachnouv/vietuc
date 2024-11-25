(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
        
        loadComponent('header.html', 'header');
        loadComponent('footer.html', 'footer');
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });

    // Component loading script
    async function loadComponent(componentPath, elementId) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            const content = await response.text();
            
            const preferredLanguage = localStorage.getItem('preferredLanguage') || 'zh';

            document.getElementById(elementId).innerHTML = content;
            
            const currentPage = window.location.pathname.split("/").pop();

            const navLinks =  document.getElementById(elementId).querySelectorAll(".navbar-nav .nav-link");

            navLinks.forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                } else if (currentPage === 'dried-tapioca-pulp.html' || currentPage === 'native-tapioca-starch.html') {
                    document.getElementById('navProduct').classList.add("active");
                } else if (currentPage === '') {
                    document.getElementById('navHome').classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });

            $('#langChinese').click(function () {
                changeLanguage('zh');
            });

            $('#langEnglish').click(function () {
                changeLanguage('en');
            });

            $('#langVietnamese').click(function () {
                changeLanguage('vi');
            });

            $('#langChinese-hidden').click(function () {
                changeLanguage('zh');
            });

            $('#langEnglish-hidden').click(function () {
                changeLanguage('en');
            });

            $('#langVietnamese-hidden').click(function () {
                changeLanguage('vi');
            });

            loadLanguage(preferredLanguage);
        } catch (error) {
            console.error(error);
        }
    }

    const languageFiles = {
        en: 'languages/en.json',
        vi: 'languages/vi.json',
        zh: 'languages/zh.json'
    };

    async function loadLanguage(lang) {
        try {
            const response = await fetch(languageFiles[lang]);
            const translations = await response.json();

            // Populate elements with 
            trySetInnerHtml('navHome', translations.home);
            trySetInnerHtml('navProduct', translations.product);
            trySetInnerHtml('navCertification', translations.certification);
            trySetInnerHtml('navAbout', translations.about);
            trySetInnerHtml('native-tapioca-starch-slide', translations.nativeTapiocaStarchTitle);
            trySetInnerHtml('dried-tapioca-pulp-slide', translations.driedTapiocaPulpTitle);
            trySetInnerHtml('index-native-tapioca-starch-titlle', translations.nativeTapiocaStarchTitle);
            trySetInnerHtml('index-native-tapioca-starch-desc', translations.nativeTapiocaStarchDesc);
            trySetInnerHtml('index-native-tapioca-starch-read-more', translations.readMore);
            trySetInnerHtml('index-dried-tapioca-pulp-title', translations.driedTapiocaPulpTitle);
            trySetInnerHtml('index-dried-tapioca-pulp-desc', translations.driedTapiocaPulpDesc);
            trySetInnerHtml('index-dried-tapioca-pulp-read-more', translations.readMore);

            trySetInnerHtml('native-tapioca-starch-process-title', translations.nativeTapiocaStarchProcessTitle);
            trySetInnerHtml('native-tapioca-starch-process-desc', translations.nativeTapiocaStarchProcessDesc);
            trySetInnerHtml('fresh-tapioca-roots-title', translations.freshTapiocaRootsTitle);
            trySetInnerHtml('fresh-tapioca-roots-desc', translations.freshTapiocaRootsDesc);
            trySetInnerHtml('washing-title', translations.washingTitle);
            trySetInnerHtml('washing-desc', translations.washingDesc);
            trySetInnerHtml('grinding-title', translations.grindingTitle);
            trySetInnerHtml('grinding-desc', translations.grindingDesc);
            trySetInnerHtml('centrifuging-title', translations.centrifugingTitle);
            trySetInnerHtml('centrifuging-desc', translations.centrifugingDesc);
            trySetInnerHtml('drying-title', translations.dryingTitle);
            trySetInnerHtml('drying-desc', translations.dryingDesc);
            trySetInnerHtml('packing-title', translations.packingTitle);
            trySetInnerHtml('packing-desc', translations.packingDesc);
            trySetInnerHtml('footer-popular-links', translations.popularLinks);
            trySetInnerHtml('footer-get-in-touch', translations.getInTouch);
            trySetInnerHtml('footer-home', translations.home);
            trySetInnerHtml('footer-product', translations.product);
            trySetInnerHtml('footer-certification', translations.certification);
            trySetInnerHtml('footer-about', translations.about);
            trySetInnerHtml('footer-address', translations.address);
            trySetInnerHtml('product-native-tapioca-starch-title', translations.nativeTapiocaStarchTitle);
            trySetInnerHtml('product-native-tapioca-starch-desc', translations.nativeTapiocaStarchDesc);
            trySetInnerHtml('product-native-tapioca-starch-see-more', translations.readMore);
            trySetInnerHtml('product-dried-tapioca-pulp-title', translations.driedTapiocaPulpTitle);
            trySetInnerHtml('product-dried-tapioca-pulp-desc', translations.driedTapiocaPulpDesc);
            trySetInnerHtml('product-dried-tapioca-pulp-see-more', translations.readMore);
            trySetInnerHtml('native-tapioca-starch-page-title', translations.nativeTapiocaStarchTitle);
            trySetInnerHtml('native-tapioca-starch-page-desc', translations.nativeTapiocaStarchDesc);
            
            trySetInnerHtml('starch-specification', translations.specification);
            trySetInnerHtml('starch-chemical', translations.chemical);
            trySetInnerHtml('starch-heavy-metal', translations.heavyMetal);
            trySetInnerHtml('starch-microbiology', translations.microbiology);
            trySetInnerHtml('starch-application', translations.application);
            trySetInnerHtml('starch-in-food', translations.inFood);
            trySetInnerHtml('starch-in-industries', translations.inIndustry);
            trySetInnerHtml('starch-packaging', translations.packaging);
            trySetInnerHtml('starch-shelf-life', translations.shelfLife);
            
            trySetInnerHtml('starch-chemical-property', translations.starchChemicalProperty);
            trySetInnerHtml('starch-chemical-property-value', translations.starchChemicalPropertyValue);
            trySetInnerHtml('starch-heavy-metal-property-value', translations.starchHeavyMetalPropertyValue);
            trySetInnerHtml('starch-heavy-metal-property', translations.starchHeavyMetalProperty);
            trySetInnerHtml('starch-microbiology-property-value', translations.starchMicrobiologyPropertyValue);
            trySetInnerHtml('starch-microbiology-property', translations.starchMicrobiologyProperty);
            trySetInnerHtml('starch-application-property', translations.starchApplicationProperty);
            trySetInnerHtml('starch-in-food-property', translations.starchInFoodProperty);
            trySetInnerHtml('starch-in-industries-property', translations.starchInIndustryProperty);
            trySetInnerHtml('starch-packaging-property', translations.starchPackagingProperty);
            trySetInnerHtml('starch-shelf-life-property', translations.starchShelfLifeProperty);

            trySetInnerHtml('dried-tapioca-pulp-page-title', translations.driedTapiocaPulpTitle);
            trySetInnerHtml('dried-tapioca-pulp-page-desc', translations.driedTapiocaPulpDesc);
            
            trySetInnerHtml('dried-pulp-specification', translations.specification);
            trySetInnerHtml('dried-pulp-chemical', translations.chemical);
            trySetInnerHtml('dried-pulp-heavy-metal', translations.heavyMetal);
            trySetInnerHtml('dried-pulp-microbiology', translations.microbiology);
            trySetInnerHtml('dried-pulp-in-food', translations.inFood);
            trySetInnerHtml('dried-pulp-in-industries', translations.inIndustry);
            trySetInnerHtml('dried-pulp-application', translations.application);
            trySetInnerHtml('dried-pulp-packaging', translations.packaging);
            trySetInnerHtml('dried-pulp-shelf-life', translations.shelfLife);

            trySetInnerHtml('dried-pulp-chemical-property', translations.driedPulpChemicalProperty);
            trySetInnerHtml('dried-pulp-chemical-property-value', translations.driedPulpChemicalPropertyValue);
            trySetInnerHtml('dried-pulp-heavy-metal-property-value', translations.driedPulpHeavyMetalPropertyValue);
            trySetInnerHtml('dried-pulp-heavy-metal-property', translations.driedPulpHeavyMetalProperty);
            trySetInnerHtml('dried-pulp-microbiology-property-value', translations.driedPulpMicrobiologyPropertyValue);
            trySetInnerHtml('dried-pulp-microbiology-property', translations.driedPulpMicrobiologyProperty);
            trySetInnerHtml('dried-pulp-application-property', translations.driedPulpApplicationProperty);
            trySetInnerHtml('dried-pulp-in-food-property', translations.driedPulpInFoodProperty);
            trySetInnerHtml('dried-pulp-in-industries-property', translations.driedPulpInIndustryProperty);
            trySetInnerHtml('dried-pulp-packaging-property', translations.driedPulpPackagingProperty);
            trySetInnerHtml('dried-pulp-shelf-life-property', translations.driedPulpShelfLifeProperty);

            trySetInnerHtml('vietuc-bio-title', translations.vietucBioTitle);
            trySetInnerHtml('vietuc-bio-desc', translations.vietucBioDesc);

            trySetInnerHtml('competitive-pricing', translations.competitivePricing);
            trySetInnerHtml('premium-quality', translations.premiumQuality);
        } catch (error) {
            console.error("Error loading language file:", error);
        }
    }

    function trySetInnerHtml(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = text;
        }
    }

    function changeLanguage(lang) {
        // Save the chosen language to localStorage
        localStorage.setItem('preferredLanguage', lang);
        loadLanguage(lang);
    }
    
})(jQuery);

