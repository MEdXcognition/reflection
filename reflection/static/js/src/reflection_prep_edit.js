/* Javascript for ReflectionAssistantXBlock - EDIT VIEW */
function ReflectionAssistantPrepXBlock(runtime, element, config) {

    /* Form Validation Options */
    var parsley_options = {
        excluded: "input:disabled,input:hidden,textarea:disabled,textarea:hidden",
        trigger: "keyup",
        errorClass: "has-error",
        successClass: "has-success",
        errorsWrapper: "<div class='field-message has-error'></div>",
        errorTemplate: "<span class='field-message-content'></span>"
    };

    /* Helper functions for instance-unique IDs */
    function id(idname) {
        // return a JQuery-friendly id selector
        return String("#" + config.uniq + "-" + idname);
    }
    function id_begins_with(element, idstart) {
        // return a JQuery-friend id-starts-with selector like "div[id^='field-prep-']"
        return String(element + "[id^='" + config.uniq + "-" + idstart + "']");
    }

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

    /* Page Load Actions -- TODO: edX Studio mysteriously fails to run this */
    $(function ($) {

        /* Set form values from config data */
        $(id_begins_with("input", "checkbox-prep-")).each(function() {
            $(this).prop("checked", config[this.name]);
        });
        $(id("checkbox-prep-strat")).prop("checked", config.pre_q6_disp);
        $(id_begins_with("input", "checkbox-strat")).each(function() {
            $(this).prop("checked", config[this.name]);
            $(this).siblings().prop("disabled", !this.checked);
        });
        // correct enabled/disabled states on Strategies
        $(".strategies input[type=checkbox]").trigger("change");

        /* Strategy Selection: enable/disable strategies based on their checkboxes */
        // change event on strategy checkboxes
        $(id_begins_with("input", "checkbox-strat")).change(function() {
            $(this).siblings().prop("disabled", !this.checked);
        });
        // trigger a 'change' event when enabled/disabled state changes
        jQuery.propHooks.disabled = {
            set: function (elem, val) {
                if (elem.disabled !== val) {
                    $(elem).trigger("change");
                }
            }
        };
    });

    /* Submit settings */
    var handlerUrl = runtime.handlerUrl(element, "set_student_view");
    $(id("form-prompt-pre")).submit(function(e) {
        e.preventDefault();

        /* Confirm form validation */
        $(id("form-prompt-pre")).parsley(parsley_options).validate();
        if ( $(this).parsley().isValid() ) {

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
            })
            .done(function() {
                $(id("pre-submit-success")).fadeIn().delay(5000).fadeOut();
            })
            .fail(function() {
                $(id("pre-submit-error")).fadeIn().delay(5000).fadeOut();
            });
        }
    });
}
