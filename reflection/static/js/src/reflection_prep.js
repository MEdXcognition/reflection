/* Javascript for Reflection Assistant: Preparation XBlock - Student View */

define = define || RequireJS.define;

(function (require, define) {
    "use strict";

    require.config({
        baseUrl: "../",
        paths: {
            /* Load jquery from google cdn */
            "jquery": ["//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min"],
            /* Load from cdn */
            "parsley": ["https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.7.2/parsley.min"]
        }
    });

    require([
        "jquery",
        "parsley",
    ], function ($, parsley) {
        /* XBlock Code Here */

        function ReflectionAssistantPrepXBlock(runtime, element, config) {

            /* Form Validation Options */
            const parsley_options = {
                excluded: "input:disabled,input:hidden,textarea:disabled,textarea:hidden",
                trigger: "keyup",
                errorClass: "has-error",
                successClass: "has-success",
                errorsWrapper: "<div class='field-message has-error'></div>",
                errorTemplate: "<span class='field-message-content'></span>"
            };

            /* Test if FontAwesome is already loaded by edX LMS/Studio */
            var span = document.createElement("span");
            span.className = "fa";
            span.style.display = "none";
            document.body.insertBefore(span, document.body.firstChild);
            if ((window.getComputedStyle(span, null)
                .getPropertyValue("font-family")) !== "FontAwesome") {
                    // ...fallback to loading FA from CDN
                    $.getScript("https://use.fontawesome.com/ce953509bb.js");
                }
            document.body.removeChild(span);

            /* Submit answers */
            var handlerUrl = runtime.handlerUrl(element, "save_student_answer");
            $form = $(element).find(".form-prompt-pre");

            $form.bind("submit", function(e) {
                e.preventDefault();

                /* Confirm form validation */
                $form.parsley(parsley_options).validate();
                if ( $form.parsley().isValid() ) {
                    var serializedObj = $form.serializeArray()
                            .reduce(function(a, x) {
                                a[x.name] = x.value;
                                return a;
                            },
                            {}
                        );
                    var checkbox_val = {};

                    $form.find("input:checkbox").each(function() {
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
                        $form.find(".submit-success").fadeIn().delay(5000).fadeOut();
                    })
                    .fail(function() {
                        $form.find(".submit-error").fadeIn().delay(5000).fadeOut();
                    });
                };
            });
        }

        /* End of XBlock Code */
    });
}).call(this, require || RequireJS.require, define || RequireJS.define);
