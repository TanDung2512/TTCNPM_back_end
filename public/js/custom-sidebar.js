$(document).ready(function(){
    $(".ui.dropdown").dropdown({
        allowCategorySelection: true,
        transition: "fade up",
        context: 'sidebar',
        on: "hover"
    });

    /* To open selection in sidebar */
    $('.ui.accordion').accordion({
        selector: {

        }
    });


    /* toggle sidebar when click */
    $(".toggle-sidebar").click(function() {
        $('.ui.sidebar').sidebar('toggle');

    });

    /* toggle "menu" text */
    $('.toggle-sidebar span').transition('swing right');

    $(".toggle-sidebar").hover(function() {
        $('.toggle-sidebar span').transition('swing right');
    });

});
