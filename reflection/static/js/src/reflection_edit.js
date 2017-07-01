/* Javascript for ReflectionAssistantXBlock - EDIT VIEW */
function ReflectionAssistantXBlock(runtime, element) {

    /* Select Prompt Type */
    $("#radio-prompt-pre").click(function(eventObject) {
        $("#prompt-post").hide(200);
        $("#prompt-pre").show(400);
        // TODO: AJAX post choice of pre-problem prompt
    });

    $("#radio-prompt-post").click(function(eventObject) {
        $("#prompt-pre").hide(200);
        $("#prompt-post").show(400);
        // TODO: AJAX post choice of post-problem prompt
    });

    /* Strategy Selection: enable/disable entire section */
    // TODO: AJAX posting on all these inputs
    $("#checkbox-prep-strat").click(function(){
        if (this.checked) {
            //re-enable checkboxes (triggers change event too)
            $(".strategies input[type=checkbox]").prop("disabled", false);
        } else {
            //disable all the inputs in this section
            $(".strategies input").prop("disabled", true);
        }
    });

    /* Page Load */
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

        /* Strategy Selection: enable/disable strategies based on their checkboxes */
        // change event on strategy checkboxes
        $("input[id^='checkbox-strat']").change(function() {
            $(this).siblings().prop("disabled", !this.checked);
        });
        // trigger a 'change' event when enabled/disabled state changes
        jQuery.propHooks.disabled = {
            set: function (elem, val) {
                if (elem.disabled !== val) {
                    $(elem).trigger('change');
                }
            }
        };

    });
}
