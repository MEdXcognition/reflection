/* Javascript for ReflectionAssistantXBlock - EDIT VIEW */
function ReflectionAssistantEvalXBlock(runtime, element, config) {

    /* Helper functions for instance-unique IDs */
    function id(idname) {
        // return a JQuery-friendly id selector
        return String("#" + config.uniq + "-" + idname);
    }
    function id_begins_with(element, idstart) {
        // return a JQuery-friend id-starts-with selector like "div[id^='field-prep-']"
        return String(element + "[id^='" + config.uniq + "-" + idstart + "']");
    }

    /* Page Load Actions -- TODO: edX Studio mysteriously fails to run this */
    $(function ($) {
        /* Set form values from config data */
        $(id_begins_with("input", "checkbox-eval-")).each(function() {
            $(this).prop("checked", config[this.name]);
        });
    });

    /* Submit settings */
    var handlerUrl = runtime.handlerUrl(element, "set_student_view");
    $(id("form-prompt-post")).submit(function(e) {
        e.preventDefault();
        var submit_post_data = {};
        $(String(id("form-prompt-post") + " input:checkbox")).each(function(){
            submit_post_data[this.name] = this.checked;
        });
        submit_post_data = JSON.stringify(submit_post_data);
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: submit_post_data
        })
        .done(function() {
            $(id("post-submit-success")).fadeIn().delay(5000).fadeOut();
        })
        .fail(function() {
            $(id("post-submit-success")).fadeIn().delay(5000).fadeOut();
        });
    });
}
