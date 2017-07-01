"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, String
from xblock.fragment import Fragment


class ReflectionAssistantXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields
    block_type = String(
        help="What type of prompt is this XBlock instance,?",
        default="", scope=Scope.settings
    )

    def get_config(self):
        """
        Get the configuration data/fields the views will need.
        """
        return {
            "block_type": self.block_type,
        }

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # Student View
    def student_view(self, context=None):
        """
        The primary view of the ReflectionAssistantXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/reflection.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/edx_pattern_library.css"))
        frag.add_css(self.resource_string("static/css/reflection.css"))
        frag.add_javascript(self.resource_string("static/js/src/reflection.js"))
        frag.initialize_js('ReflectionAssistantXBlock', self.get_config())
        return frag

    # Editor (Studio) View
    def studio_view(self, context=None):
        """
        The editor view of the ReflectionAssistantXBlock, shown to course
        authors when editing courses in edX Studio.
        """
        html = self.resource_string("static/html/reflection_edit.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/edx_pattern_library.css"))
        frag.add_css(self.resource_string("static/css/reflection_edit.css"))
        frag.add_javascript(self.resource_string("static/js/src/reflection_edit.js"))
        frag.initialize_js('ReflectionAssistantXBlock', self.get_config())
        return frag

    # Author View
    def author_view(self, context=None):
        """
        The editor view of the ReflectionAssistantXBlock, shown to course
        authors when editing courses in edX Studio.
        """
        html = self.resource_string("static/html/reflection_author.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/edx_pattern_library.css"))
        frag.add_css(self.resource_string("static/css/reflection_author.css"))
        frag.add_javascript(self.resource_string("static/js/src/reflection_author.js"))
        frag.initialize_js('ReflectionAssistantXBlock', self.get_config())
        return frag

    # Required for studio_view:
    _non_editable_metadata_fields = []
    @property
    def non_editable_metadata_fields(self):
        """ List of the XBlock fields that should not be displayed in the Studio editor. """
        return self._non_editable_metadata_fields

    # Handlers
    @XBlock.json_handler
    def set_block_type(self, data, suffix=''):
        """
        Set the type of content in this instance: pre-problem or post-problem
        """
        #assert data['block_type'"'] in ('pre', 'post')
        if data['block_type'] not in ('pre', 'post'):
            log.error('invalid block_type posted')
            return

        self.block_type = data["block_type"]
        return {"block_type": self.block_type}

    # Scenarios you'd like to see in the workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ReflectionAssistantXBlock",
             """<reflection/>
             """),
        ]
