/* Javascript for Reflection Assistant: Evaluation XBlock - Studio View */

function ReflectionAssistantEvalXBlock(runtime, element, config) {

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

    /* Submit settings */
    var handlerUrl = runtime.handlerUrl(element, "set_student_view");
    $form = $(element).find(".form-prompt-post");

    $form.submit(function(e) {
        e.preventDefault();
        var submit_post_data = {};
        $form.find("input:checkbox").each(function(){
            submit_post_data[this.name] = this.checked;
        });
        submit_post_data = JSON.stringify(submit_post_data);
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: submit_post_data
        })
        .done(function() {
            $form.find(".submit-success").fadeIn().delay(5000).fadeOut();
        })
        .fail(function() {
            $form.find(".submit-error").fadeIn().delay(5000).fadeOut();
        });
    });

}
