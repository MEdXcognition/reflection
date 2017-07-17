/* Javascript for ReflectionAssistantXBlock - EDIT VIEW */
function ReflectionAssistantXBlock(runtime, element, config) {

   /* Select Prompt Type */
    $("#radio-prompt-pre").click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'set_block_type'),
            data: JSON.stringify({block_type: 'pre'}),
            success: function() {
                $("#prompt-post").hide(200);
                $("#prompt-pre").show(400);
            },
            error: function (xhr, exception) {
                alert(xhr.status + " " + xhr.responseText);
            }
        });
    });

    $("#radio-prompt-post").click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'set_block_type'),
            data: JSON.stringify({block_type: 'post'}),
            success: function() {
                $("#prompt-pre").hide(200);
                $("#prompt-post").show(400);
            },
            error: function (xhr, exception) {
                alert(xhr.status + " " + xhr.responseText);
            }
        });
    });

    /* Guage Display Functions */
    function setGauge(gauge) {
        var percentage = $(gauge).data('percentage') / 100;
        var colorSet = $(gauge).data('colorset');

        var degrees = 180 * percentage;
        var pointerDegrees = degrees - 90;
        var spinner = $(gauge).find('.spinner');
        var pointer = $(gauge).find('.pointer');

        // set
        $(spinner).attr({
            style: 'transform: rotate(' + degrees + 'deg);'
        });
        $(pointer).attr({
            style: 'transform: rotate(' + pointerDegrees + 'deg)'
        });
    };
    function resetGauge(gauge) {
        var spinner = $(gauge).find('.spinner');
        var pointer = $(gauge).find('.pointer');
        $(spinner).attr({
            style: 'transform: rotate(0deg)'
        });
        $(pointer).attr({
            style: 'transform: rotate(-90deg)'
        });
    }

    /* Page Load Actions */
    $(function ($) {
        /* Test if FontAwesome is already loaded by EdX LMS/Studio */
        var span = document.createElement('span');
        span.className = 'fa';
        span.style.display = 'none';
        document.body.insertBefore(span, document.body.firstChild);
        if ((window.getComputedStyle(span, null).getPropertyValue('font-family')) !== 'FontAwesome') {
            // ...fallback to loading FA from CDN
            $.getScript("https://use.fontawesome.com/ce953509bb.js");
        }
        document.body.removeChild(span);

        /* Fetch config data and respond accordingly */
        switch (config.block_type) {
            case "pre":
                $("#radio-prompt-pre").trigger("click");
                break;
            case "post":
                $("#radio-prompt-post").trigger("click");
                break;
        };

        /* Guage Displays */
        setGauge($("#kma"));
        setGauge($("#kmb"));
        // clicking guages re-animates them
        $('.gauge-cont').click(function(){
            resetGauge(this);
            setTimeout(setGauge, 800, this);
        });

    });
}
