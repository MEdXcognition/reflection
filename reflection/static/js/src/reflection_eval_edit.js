/* Javascript for ReflectionAssistantXBlock - EDIT VIEW */
function ReflectionAssistantEvalXBlock(runtime, element, config) {

    /* Helper functions for instance-unique IDs */
    function id(idname) {
        // return a JQuery-friendly id selector
        return String("#" + config.uniq + "-" + idname);
    };
    function id_begins_with(element, idstart) {
        // return a JQuery-friend id-starts-with selector like "div[id^='field-prep-']"
        return String(element + "[id^='" + config.uniq + "-" + idstart + "']");
    };

    /* Page Load Actions */
    $(function ($) {
        /* Test if FontAwesome is already loaded by edX LMS/Studio */
        var span = document.createElement('span');
        span.className = 'fa';
        span.style.display = 'none';
        document.body.insertBefore(span, document.body.firstChild);
        if ((window.getComputedStyle(span, null)
            .getPropertyValue('font-family')) !== 'FontAwesome') {
                // ...fallback to loading FA from CDN
                $.getScript("https://use.fontawesome.com/ce953509bb.js");
            }
        document.body.removeChild(span);

        /* Set form values from config data */
        $(id_begins_with("input", "checkbox-eval-")).each(function() {
            $(this).prop("checked", config[this.name]);
        });

        /* Form Validation */
        const parsley_options = {
            excluded: 'input:disabled,input:hidden,textarea:disabled,textarea:hidden',
            trigger: 'keyup',
            errorClass: 'has-error',
            successClass: 'has-success',
            errorsWrapper: '<div class="field-message has-error"></div>',
            errorTemplate: '<span class="field-message-content"></span>'
        };
        $(id('form-prompt-post')).parsley(parsley_options);
    });

    /* Submit settings */
    var handlerUrl = runtime.handlerUrl(element, 'set_student_view');
    $(id("form-prompt-post")).submit(function(e) {
        e.preventDefault();

        /* Confirm form validation */
        if ( $(this).parsley().isValid() ) {

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
        };
    });
}
