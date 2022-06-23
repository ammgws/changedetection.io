$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: browser_steps_sync_url,
//      data : data,
        statusCode: {
            400: function () {
                // More than likely the CSRF token was lost when the server restarted
                alert("There was a problem processing the request, please reload the page.");
            }
        }
    }).done(function (data) {
        console.log(data);
        $('#browsersteps-img').attr('src', data.screenshot);
    }).fail(function (data) {
        console.log(data);
        alert('There was an error communicating with the server.');
    });

    // Look up which step was selected, and enable or disable the related extra fields
    // So that people using it dont' get confused
    $('ul#browser_steps select').on("change", function () {
        var config = browser_steps_config[$(this).val()].split(' ');
        var elem_selector = $('tr:nth-child(2) input', $(this).closest('tbody'));
        var elem_value = $('tr:nth-child(3) input', $(this).closest('tbody'));

        if (config[0] == 0) {
            $(elem_selector).fadeOut();
        } else {
            $(elem_selector).fadeIn();
        }
        if (config[1] == 0) {
            $(elem_value).fadeOut();
        } else {
            $(elem_value).fadeIn();
        }
    });
    $('ul#browser_steps select').change();


    function r() {
        $('ul#browser_steps select option:selected[value="Choose one"]').closest('li').css('opacity', 0.35);
    }

    $("ul#browser_steps select ").change(function () {
        $(this).closest('li').css('opacity', 1);
        r();
    });
    r();


    //attach_browserstep_screenshots();
});