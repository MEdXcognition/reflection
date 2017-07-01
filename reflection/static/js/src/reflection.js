/* Javascript for ReflectionAssistantXBlock. */
function ReflectionAssistantXBlock(runtime, element, config) {

    /* Page Load Actions */
    $(function ($) {
        switch (config.block_type) {
            case "pre":
                $("#prompt-pre").show();
                break;
            case "post":
                $("#prompt-post").show();
                break;
        }
    });

}
