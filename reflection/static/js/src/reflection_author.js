/* Javascript for ReflectionAssistantXBlock - EDIT VIEW */
function ReflectionAssistantXBlock(runtime, element) {

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

    $(function ($) {
        /* Executes on page load. */

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
    });
}
