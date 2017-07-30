/* Javascript for Reflection Assistant: Evaluation XBlock - Student View */

function ReflectionAssistantEvalXBlock(runtime, element, config) {

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
    $form_post = $(element).find(".form-prompt-post");

    $form_post.bind("submit", function(e) {
        e.preventDefault();
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
            $form_post.find(".submit-success").fadeIn().delay(5000).fadeOut();
            setTimeout('location.reload()', 800)
        })
        .fail(function() {
            $form_post.find(".submit-error").fadeIn().delay(5000).fadeOut();
        });
    });

    /* Tweak Constraint Validation Behavior */
    $form_post.find("textarea,input").on("blur", function() {
        $(this).addClass("interacted");
    });

    /* Gauge Display Functions */
    function setGauge(gauge) {
        var percentage = $(gauge).data("percentage") / 100;
        var colorSet = $(gauge).data("colorset");

        var degrees = 180 * percentage;
        var pointerDegrees = degrees - 90;
        var spinner = $(gauge).find(".spinner");
        var pointer = $(gauge).find(".pointer");

        // set
        $(spinner).attr({
            style: "transform: rotate(" + degrees + "deg);"
        });
        $(pointer).attr({
            style: "transform: rotate(" + pointerDegrees + "deg)"
        });
    }

    function resetGauge(gauge) {
        var spinner = $(gauge).find(".spinner");
        var pointer = $(gauge).find(".pointer");
        $(spinner).attr({
            style: "transform: rotate(0deg)"
        });
        $(pointer).attr({
            style: "transform: rotate(-90deg)"
        });
    }

    /* Set intial gauge displays */
    if (config.learner_profile_disp) {
        setGauge($(element).find(".kma"));
        setGauge($(element).find(".kmb"));
        // clicking gauges re-animates them
        $(".gauge-cont").click(function() {
            resetGauge(this);
            setTimeout(setGauge, 800, this);
        });
    }
}
