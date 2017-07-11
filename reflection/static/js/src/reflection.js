/* Javascript for ReflectionAssistantXBlock. */
function ReflectionAssistantXBlock(runtime, element, config) {

    /* Page Load Actions */
    $(function ($) {
        /* Display chosen block type */
        switch (config.block_type) {
            case "pre":
                $("#prompt-pre").show();
                if (!config.pre_q1_disp) {
                    document.getElementById("field-prep-q1").style.display = "none";
                }
                if (!config.pre_q2_disp) {
                    document.getElementById("field-prep-q2").style.display = "none";
                }
                if (!config.pre_q3_disp) {
                    document.getElementById("field-prep-q3").style.display = "none";
                }
                if (!config.pre_q4_disp) {
                    document.getElementById("field-prep-q4").style.display = "none";
                }
                if (!config.pre_q5_disp) {
                    document.getElementById("field-prep-q5").style.display = "none";
                }
                if (!config.pre_q6_disp) {
                    document.getElementById("prep-strategy-section").style.display = "none";
                } else {
                    if (!config.pre_s1_disp) {
                        document.getElementById("checkbox-strat1").style.display = "none";
                    }
                    if (!config.pre_s2_disp) {
                        document.getElementById("checkbox-strat2").style.display = "none";
                    }
                    if (!config.pre_s3_disp) {
                        document.getElementById("checkbox-strat3").style.display = "none";
                    }
                    if (!config.pre_s4_disp) {
                        document.getElementById("checkbox-strat4").style.display = "none";
                    }
                    if (!config.pre_s5_disp) {
                        document.getElementById("checkbox-strat5").style.display = "none";
                    }
                    if (!config.pre_s6_disp) {
                        document.getElementById("checkbox-strat6").style.display = "none";
                    }
                }
                break;
            case "post":
                $("#prompt-post").show();
                if (!config.post_q1_disp) {
                    document.getElementById("field-eval-q1").style.display = "none";
                }
                if (!config.post_q2_disp) {
                    document.getElementById("field-eval-q2").style.display = "none";
                }
                if (!config.post_q3_disp) {
                    document.getElementById("field-eval-q3").style.display = "none";
                }
                if (!config.post_q4_disp) {
                    document.getElementById("field-eval-q4").style.display = "none";
                }
                if (!config.post_q5_disp) {
                    document.getElementById("field-eval-q5").style.display = "none";
                }
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

    /* Submit Preparation Phase Answers */
    /*
    var handlerUrl = runtime.handlerUrl(element, 'save_student_answer');
    var submit_data = JSON.stringify(
        $('#form-prompt-pre,#form-prompt-post').serializeArray()
        .reduce(function(a, x) {
            a[x.name] = x.value;
            return a;
            },
            {}
        )
    );
    $('.submission_feedback_prep', element).click(function(eventObject) {
    $.ajax({
        type: "POST",
        url: handlerUrl,
        data: submit_data
        });
    });
    */
}
