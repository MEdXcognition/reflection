/* Javascript for ReflectionAssistantXBlock. */

function ReflectionAssistantPrepXBlock(runtime, element, config) {

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

        /* Hide unused fields */
        $(id_begins_with("div", "field-prep-")).each(function() {
            if (!config[this.dataset.disp]) {
                $(this).hide();
            }
        });

        /* Hide section titles */
        var keep = false;
        for (i=1; i<6; i++) {
            var item = 'pre_q' + i + '_disp';
            if(config[item]) {
                keep = true;
                break;
            }
        };
        if (!keep) $(id("prep-assessment-section")).hide();

        /* Set Likert selection */
        if (config.pre_q5_disp) {
            $("input:radio[name=pre_q5_ans][value="+ config.pre_q5_ans +"]")
                .prop("checked", true);
        };

        /* Display strategy section */
        if (!config.pre_q6_disp) {
            $(id("prep-strategy-section")).hide();
        } else {
            $("input[data-disp]").each(function() {
                if (!config[this.dataset.disp]) {
                    $(this).hide();
                    $("label[for=" + this.id + "]").hide();
                } else {
                    $(this).prop("checked", config[this.name]);
                }
            });
        };

        /* Form Validation */
        var parsley_options = {
            excluded: 'input:disabled,input:hidden,textarea:disabled,textarea:hidden',
            trigger: 'keyup',
            errorClass: 'has-error',
            successClass: 'has-success',
            errorsWrapper: '<div class="field-message has-error"></div>',
            errorTemplate: '<span class="field-message-content"></span>'
        };

        $(id("form-prompt-pre")).parsley(parsley_options);
    });

    /* Submit answers */
    var handlerUrl = runtime.handlerUrl(element, 'save_student_answer');
    $(id("form-prompt-pre")).submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() ) {
            var serializedObj = $(this).serializeArray()
                    .reduce(function(a, x) {
                        a[x.name] = x.value;
                        return a;
                    },
                    {}
                );
            var checkbox_val = {};
            $("form input:checkbox").each(function(){
                checkbox_val[this.name] = this.checked;
            });
            var submit_pre_data = JSON.stringify(jQuery.extend(serializedObj,
                checkbox_val));
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
        };
    });
}
