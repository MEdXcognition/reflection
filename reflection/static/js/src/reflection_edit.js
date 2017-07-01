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

    /* Strategy Selection */
    // TODO: AJAX posting on all these inputs
    $("#checkbox-prep-strat").click(function(){
        if (this.checked) {
            $(".strategies input[type=checkbox]").prop("disabled", false);
            $("#textbox-strat1").prop("disabled", !$("#checkbox-strat1").is(':checked'));
            $("#textbox-strat2").prop("disabled", !$("#checkbox-strat2").is(':checked'));
            $("#textbox-strat3").prop("disabled", !$("#checkbox-strat3").is(':checked'));
            $("#textbox-strat4").prop("disabled", !$("#checkbox-strat4").is(':checked'));
            $("#textbox-strat5").prop("disabled", !$("#checkbox-strat5").is(':checked'));
            $("#textbox-strat6").prop("disabled", !$("#checkbox-strat6").is(':checked'));
        } else {
            $(".strategies input").prop("disabled", true);
        }
    });
    $("#checkbox-strat1").click(function(){
        $("#textbox-strat1").prop("disabled", !this.checked);
    });
    $("#checkbox-strat2").click(function(){
        $("#textbox-strat2").prop("disabled", !this.checked);
    });
    $("#checkbox-strat3").click(function(){
        $("#textbox-strat3").prop("disabled", !this.checked);
    });
    $("#checkbox-strat4").click(function(){
        $("#textbox-strat4").prop("disabled", !this.checked);
    });
    $("#checkbox-strat5").click(function(){
        $("#textbox-strat5").prop("disabled", !this.checked);
    });
    $("#checkbox-strat6").click(function(){
        $("#textbox-strat6").prop("disabled", !this.checked);
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
    });
}
