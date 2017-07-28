/* Javascript for Reflection Assistant: Preparation XBlock - Studio View */

function ReflectionAssistantPrepXBlock(runtime, element, config) {

    /* Test if FontAwesome is already loaded by edX LMS/Studio */
    var span = document.createElement("span");
    span.className = "fa";
    span.style.display = "none";
    document.body.insertBefore(span, document.body.firstChild);
    if ((window.getComputedStyle(span, null)
        .getPropertyValue("font-family")) !== "FontAwesome") {{
            // ...fallback to loading FA from CDN
            $.getScript("https://use.fontawesome.com/ce953509bb.js");
        }}
    document.body.removeChild(span);

    /* Strategy Selection click handler to enable/disable entire section */
    $pre_q6_disp = $(element).find(".pre_q6_disp");
    $pre_q6_disp.click(function() {
        if (this.checked) {
            // re-enable checkboxes, triggers change event as side effect
            $(element).find(".strategies input:checkbox").prop("disabled", false);
        } else {
            // disable all the inputs in this section
            $(element).find(".strategies input").prop("disabled", true);
        }
    });

    /* Strategy Selection checkboxes enable/disable associated text inputs */
    // set change event handler on strategy checkboxes
    $(element).find(".strategies input:checkbox").change(function() {
        $(this).siblings().prop("disabled", !this.checked);
    });
    // trigger a 'change' event whenever the enabled/disabled state changes
    jQuery.propHooks.disabled = {
        set: function (elem, val) {
            if (elem.disabled !== val) {
                $(elem).trigger("change");
            }
        }
    };

    /* Strategy Selection - set initial enabled/disabled states appropriately */
    $pre_q6_disp.each(function() {
        if (this.checked) {
            // re-enable checkboxes, then manually trigger change event
            $(element).find(".strategies input:checkbox").prop("disabled", false).change();
        } else {
            // disable all the inputs in this section
            $(element).find(".strategies input").prop("disabled", true);
        }
    });

    /* Submit settings */
    var handlerUrl = runtime.handlerUrl(element, "set_student_view");
    $form = $(element).find(".form-prompt-pre");

    $form.bind("submit", function(e) {
        e.preventDefault();

        /* Set strategy text to default values so there would be values for
        disabled fields */
        var strat_text_val = {};
        $form.find("input:text").each(function() {
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
        $form.find("input:checkbox").each(function() {
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
            $form.find(".submit-success").fadeIn().delay(5000).fadeOut();
        })
        .fail(function() {
            $form.find(".submit-error").fadeIn().delay(5000).fadeOut();
        });
    });

    /* Form Validation: require at least one Stragegy checkbox */
    $cbx_group = $form.find("input:checkbox[name^='pre_s1']");
    $cbx_group.on("click", function() {
        if ($cbx_group.is(":checked")) {
            // checkboxes become unrequired as long as one is checked
            $cbx_group.prop("required", false);
            $cbx_group.each(function() {
                this.setCustomValidity("");
            });
        } else {
            // require checkboxes and set custom validation error message
            $cbx_group.prop("required", true);
            $cbx_group.each(function() {
                this.setCustomValidity("Please select at least one checkbox.");
            });
        }
    });
}
