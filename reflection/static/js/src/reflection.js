/* Javascript for ReflectionAssistantXBlock. */

function ReflectionAssistantXBlock(runtime, element, config) {

    function id(idname) {
        // first escape special characters in the unique id for JQuery
        //var uniq = config.uniq.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
        // return a JQuery-friendly id selector
        //return String("#" + uniq + "-" + idname);
        return String("#" + config.uniq + "-" + idname);
    };

    function id_begins_with(idstart) {
        // ### TODO ### JQuery doesn't like this selector ###
        // return a JQuery-friend id-starts-with selector like "div[id^='field-prep-q']"
        // first escape special characters in the unique id for JQuery
        //var uniq = config.uniq.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
        //return String("div[id^='" + uniq + "-" + idstart + "']");
        return String("div[id^='" + config.uniq + "-" + idstart + "']");
    };

    /* Guage Display Functions */
    function setGauge(gauge) {
        var percentage = $(gauge).data('percentage') / 100;
        var colorSet = $(gauge).data('colorset');

        var degrees = 180 * percentage;
        var pointerDegrees = degrees - 90;
        var spinner = $(gauge).find('.spinner');
        var pointer = $(gauge).find('.pointer');

        // set
        $(spinner).attr({
            style: 'transform: rotate(' + degrees + 'deg);'
        });
        $(pointer).attr({
            style: 'transform: rotate(' + pointerDegrees + 'deg)'
        });
    };
    function resetGauge(gauge) {
        var spinner = $(gauge).find('.spinner');
        var pointer = $(gauge).find('.pointer');
        $(spinner).attr({
            style: 'transform: rotate(0deg)'
        });
        $(pointer).attr({
            style: 'transform: rotate(-90deg)'
        });
    }

    /* Page Load Actions */
    $(function ($) {
        /* Display chosen block type */
        switch (config.block_type) {
            case "pre":
                $(id("prompt-pre")).show();
                //$("#problem_id").value = config.problem_id;
                /* Hide fields set to be not displayed from Studio View */
                $(id_begins_with("field-prep-q")).each(function() {
                    if (!config[this.title]) {
                        $(this).hide();
                    }
                });

                /* Hide Section Titles */
                var keep = false;
                for (i=1; i<6; i++) {
                    var item = 'pre_q' + i + '_disp';
                    if(config[item]) {
                        keep = true;
                        break;
                    }
                }
                if (!keep) $(id("prep-assessment-section")).hide();

                /* Set Likert selection */
                if (config.pre_q5_disp) {
                    $('input:radio[name=pre_q5_ans][value='+ config.pre_q5_ans +']')
                        .prop("checked", true);
                }
                /* Display strategy section */
                if (!config.pre_q6_disp) {
                    $(id("prep-strategy-section")).hide();
                } else {
                    // TODO: this one depends on id not title or other attr :(
                    $(id_begins_with("checkbox-strat")).each(function() {
                        if (!config[this.value]) {
                            $(this).hide();
                            $("label[for=" + this.id + "]").hide();
                        } else {
                            $(this).prop("checked", config[this.name]);
                        }
                    });
                }
                break;

            case "post":
                $(id("prompt-post")).show();
                if (!config.learner_profile_disp) {
                    $(id("learner-profile")).hide();
                }
                $(id_begins_with("field-eval-q")).each(function() {
                    if (!config[this.title]) {
                        $(this).hide();
                    }
                });

                /* Hide Section Titles */
                if (!config["post_q1_disp"] && !config["post_q2_disp"]) {
                    $(id("eval-eval-section")).hide();
                };
                var keep = false;
                for (i=3; i<6; i++) {
                    var item = 'post_q' + i + '_disp';
                    if(config[item]) {
                        keep = true;
                        break;
                    }
                }
                if (!keep) $(id("eval-assessment-section")).hide();

                break;
        };

        /* Gauge Displays */
        setGauge($(id("kma")));
        setGauge($(id("kmb")));
        // clicking guages re-animates them
        $('.gauge-cont').click(function(){
            resetGauge(this);
            setTimeout(setGauge, 800, this);
        });

        /* Form Validation */
        var parsley_options = {
            excluded: 'input:disabled,input:hidden',
            trigger: 'keyup',
            errorClass: 'has-error',
            successClass: 'has-success',
            errorsWrapper: '<div class="field-message has-error"></div>',
            errorTemplate: '<span class="field-message-content"></span>'
        };

        $(id("form-prompt-pre")).parsley(parsley_options).on('form:submit', function() {
            return false;
        });
        $(id("form-prompt-post")).parsley(parsley_options).on('form:submit', function() {
            return false;
        });
    });

    /* Submit answers */
    var handlerUrl = runtime.handlerUrl(element, 'save_student_answer');
    $(id("form-prompt-pre")).submit(function() {
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
        });
    });
    $(id("form-prompt-post")).submit(function() {
        var submit_post_data = JSON.stringify($(this).serializeArray()
                .reduce(function(a, x) {
                a[x.name] = x.value;
                return a;
                },
                {}
            )
        );
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: submit_post_data
        });
    });
}
