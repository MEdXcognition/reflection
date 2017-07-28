/* Javascript for Reflection Assistant: Preparation XBlock - Student View */

function ReflectionAssistantPrepXBlock(runtime, element, config) {

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
    });

    /* Tweak Constraint Validation Behavior */
    $form.find("textarea,input").on("blur", function() {
        $(this).addClass("interacted");
    });
}
