/* Javascript for ReflectionAssistantXBlock. */

function ReflectionAssistantEvalXBlock(runtime, element, config) {

    /* Helper functions for instance-unique IDs */
    function id(idname) {
        // return a JQuery-friendly id selector
        return String("#" + config.uniq + "-" + idname);
    };
    function id_begins_with(element, idstart) {
        // return a JQuery-friend id-starts-with selector like "div[id^='field-prep-']"
        return String(element + "[id^='" + config.uniq + "-" + idstart + "']");
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
        $(id_begins_with("div", "field-eval-")).each(function() {
            if (!config[this.dataset.disp]) {
                $(this).hide();
            }
        });

        /* Hide section titles */
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
            excluded: 'input:disabled,input:hidden,textarea:disabled,textarea:hidden',
            trigger: 'keyup',
            errorClass: 'has-error',
            successClass: 'has-success',
            errorsWrapper: '<div class="field-message has-error"></div>',
            errorTemplate: '<span class="field-message-content"></span>'
        };

        $(id("form-prompt-post")).parsley(parsley_options);
    });

    /* Submit answers */
    var handlerUrl = runtime.handlerUrl(element, 'save_student_answer');
    $(id("form-prompt-post")).submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() ) {

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
            })
            .done(function() {
                $(id("post-submit-success")).fadeIn().delay(5000).fadeOut();
            })
            .fail(function() {
                $(id("post-submit-error")).fadeIn().delay(5000).fadeOut();
            });
        };
    });
}
