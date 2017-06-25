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
        /* Here's where you'd do things on page load. */
    });
}
