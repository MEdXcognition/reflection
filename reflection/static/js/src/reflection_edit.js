/* Javascript for ReflectionAssistantXBlock - EDIT VIEW */
function ReflectionAssistantXBlock(runtime, element, config) {

    /* Helper functions for instance-unique IDs */
    function id(idname) {
        // return a JQuery-friendly id selector
        return String("#" + config.uniq + "-" + idname);
    };
    function id_begins_with(element, idstart) {
        // return a JQuery-friend id-starts-with selector like "div[id^='field-prep-']"
        return String(element + "[id^='" + config.uniq + "-" + idstart + "']");
    };

    /* Select Prompt Type */
    $(id("radio-prompt-pre")).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'set_block_type'),
            data: JSON.stringify({block_type: 'pre'}),
            success: function() {
                $(id("prompt-post")).hide(200);
                $(id("prompt-pre")).show(400);
            },
            error: function (xhr, exception) {
                alert(xhr.status + " " + xhr.responseText);
            }
        });
        // correct enabled/disabled states on Strategies
        $(".strategies input[type=checkbox]").trigger("change");
    });

    $(id("radio-prompt-post")).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'set_block_type'),
            data: JSON.stringify({block_type: 'post'}),
            success: function() {
                $(id("prompt-pre")).hide(200);
                $(id("prompt-post")).show(400);
            },
            error: function (xhr, exception) {
                alert(xhr.status + " " + xhr.responseText);
            }
        });
    });

    /* Strategy Selection: enable/disable entire section */
    $(id("checkbox-prep-strat")).click(function(){
        if (this.checked) {
            //re-enable checkboxes (triggers change event too)
            $(String(id("checkbox-prep-strat") + " .strategies input[type=checkbox]")).prop("disabled", false);
        } else {
            //disable all the inputs in this section
            $(String(id("checkbox-prep-strat") + " .strategies input")).prop("disabled", true);
        }
    });

    /* Page Load Actions */
    $(function ($) {
        /* Test if FontAwesome is already loaded by EdX LMS/Studio */
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
        switch (config.block_type) {
            case "pre":
                $(id("radio-prompt-pre")).trigger("click");
                $(id_begins_with("input", "checkbox-prep-")).each(function() {
                    $(this).prop("checked", config[this.name]);
                });
                $(id("checkbox-prep-strat")).prop("checked", config.pre_q6_disp);
                $(id_begins_with("input", "checkbox-strat")).each(function() {
                    $(this).prop("checked", config[this.name]);
                    $(this).siblings().prop("disabled", !this.checked);
                });
                break;
            case "post":
                $(id("radio-prompt-post")).trigger("click");
                $(id_begins_with("input", "checkbox-eval-")).each(function() {
                    $(this).prop("checked", config[this.name]);
                });
                break;
        };

        /* Strategy Selection: enable/disable strategies based on their checkboxes */
        // change event on strategy checkboxes
        $(id_begins_with("input", "checkbox-strat")).change(function() {
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
        $(id('form-prompt-pre')).parsley(parsley_options).on('form:submit', function() {
            return false;
        });
    });

    /* Submit settings */
    var handlerUrl = runtime.handlerUrl(element, 'set_student_view');
    $(id("form-prompt-pre")).submit(function() {
        /* Set strategy text to default values so there would be values for
        disabled fields */
        var strat_text_val = {};
        $(id_begins_with("input", "textbox-strat")).each(function() {
            strat_text_val[this.name] = config[this.name];
        });
        /* Get values from form */
        var serializedObj = $(this).serializeArray()
                .reduce(function(a, x) {
                    a[x.name] = x.value;
                    return a;
                },
                {}
            );
        /* Get checkbox states */
        var checkbox_val = {};
        $(String(id("form-prompt-pre") + " input:checkbox")).each(function(){
            checkbox_val[this.name] = this.checked;
        });
        /* Get union of strat_text_val, serializedObj and checkbox_val */
        var submit_pre_data = JSON.stringify(
            jQuery.extend(true,
                strat_text_val,
                serializedObj,
                checkbox_val
            )
        );
        /* AJAX to Python backend */
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: submit_pre_data
        });
    });
    $(id("form-prompt-post")).submit(function() {
        var submit_post_data = {};
        $(String(id("form-prompt-post") + " input:checkbox")).each(function(){
            submit_post_data[this.name] = this.checked;
        });
        submit_post_data = JSON.stringify(submit_post_data);
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: submit_post_data
        });
    });

}
