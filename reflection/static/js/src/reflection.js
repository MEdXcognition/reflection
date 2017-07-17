/* Javascript for ReflectionAssistantXBlock. */
function ReflectionAssistantXBlock(runtime, element, config) {

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
                } /*else {
                    $('input:radio[name=pre_q5_ans]').val([config.pre_q5_ans]).prop("checked", true);
                }*/
                if (!config.pre_q6_disp) {
                    document.getElementById("prep-strategy-section").style.display = "none";
                } else {
                    if (!config.pre_s1_disp) {
                        document.getElementById("checkbox-strat1").style.display = "none";
                        document.getElementById("checkbox-strat1-label").style.display = "none";
                    } /*else {
                        document.getElementById("checkbox-strat1").checked = config.pre_s1_ans;
                    }*/
                    if (!config.pre_s2_disp) {
                        document.getElementById("checkbox-strat2").style.display = "none";
                        document.getElementById("checkbox-strat2-label").style.display = "none";
                    } /*else {
                        document.getElementById("checkbox-strat2").checked = config.pre_s2_ans;
                    }*/
                    if (!config.pre_s3_disp) {
                        document.getElementById("checkbox-strat3").style.display = "none";
                        document.getElementById("checkbox-strat3-label").style.display = "none";
                    } /*else {
                        document.getElementById("checkbox-strat3").checked = config.pre_s3_ans;
                    }*/
                    if (!config.pre_s4_disp) {
                        document.getElementById("checkbox-strat4").style.display = "none";
                        document.getElementById("checkbox-strat4-label").style.display = "none";
                    } /*else {
                        document.getElementById("checkbox-strat4").checked = config.pre_s4_ans;
                    }*/
                    if (!config.pre_s5_disp) {
                        document.getElementById("checkbox-strat5").style.display = "none";
                        document.getElementById("checkbox-strat5-label").style.display = "none";
                    } /*else {
                        document.getElementById("checkbox-strat5").checked = config.pre_s5_ans;
                    }*/
                    if (!config.pre_s6_disp) {
                        document.getElementById("checkbox-strat6").style.display = "none";
                        document.getElementById("checkbox-strat6-label").style.display = "none";
                    } /*else {
                        document.getElementById("checkbox-strat6").checked = config.pre_s6_ans;
                    }*/
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

        /* Guage Displays */
        setGauge($("#kma"));
        setGauge($("#kmb"));
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
        $('#form-prompt-pre').parsley(parsley_options).on('form:submit', function() {
            return false;
        });
        $('#form-prompt-post').parsley(parsley_options).on('form:submit', function() {
            return false;
        });
    });

    /* For saving checkbox state in JSON */
    /*function unique(x) {
      return x.filter(function(elem, index) { return x.indexOf(elem) === index; });
    };

    function union(x, y) {
      return unique(x.concat(y));
    };*/

    /* Submit answers */
    var handlerUrl = runtime.handlerUrl(element, 'save_student_answer');
    $('#form-prompt-pre,#form-prompt-post').submit(function() {
        var serializedObj = JSON.stringify($(this).serializeArray()
                .reduce(function(a, x) {
                a[x.name] = x.value;
                return a;
                },
                {}
            )
        );
        /*var checkbox_val = {};
        $("form input:checkbox").each(function(){
            checkbox_val[this.name] = this.checked;
        });
        var submit_data = union(serializedObj, checkbox_val)
        //alert(submit_data);
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: submit_data
        });*/
    });
}
