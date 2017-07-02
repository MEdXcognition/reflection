/* Javascript for ReflectionAssistantXBlock. */
function ReflectionAssistantXBlock(runtime, element, config) {

    /* Page Load Actions */
    $(function ($) {
        /* Display chosen block type */
        switch (config.block_type) {
            case "pre":
                $("#prompt-pre").show();
                break;
            case "post":
                $("#prompt-post").show();
                break;
        };

        /* Form Validation */
        var parsley_options = {
            excluded: 'input:disabled,input:hidden',
            trigger: 'keyup',
            errorClass: 'has-error',
            successClass: 'has-success',
            errorsWrapper: '<div class="field-message has-error"></div>',
            errorTemplate: '<span class="field-message-content"></span>'
        };
        $('#form-prompt-pre,#form-prompt-post').parsley(parsley_options).on('form:submit', function() {
            return false;
        });

    });

}
