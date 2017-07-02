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

        /* Form Validation */
        var parsley_options = {
            excluded: 'input:disabled,input:hidden',
            trigger: 'keyup',
            errorClass: 'has-error',
            successClass: 'has-success',
            errorsWrapper: '<div class="field-message has-error"></div>',
            errorTemplate: '<span class="field-message-content"></span>'
        };
        $('#form-prompt-pre').parsley(parsley_options).on('form:submit', function() {
            return false;
        });

    });
}
