"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer
from xblock.fragment import Fragment


class ReflectionAssistantXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

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
        frag.add_css(self.resource_string("static/css/reflection.css"))
        frag.add_javascript(self.resource_string("static/js/src/reflection.js"))
        frag.initialize_js('ReflectionAssistantXBlock')
        return frag

    # Editor (Studio) View
    def studio_view(self, context=None):
        """
        The editor view of the ReflectionAssistantXBlock, shown to course
        authors when editing courses in edX Studio.
        """
        html = self.resource_string("static/html/reflection_edit.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/reflection_edit.css"))
        frag.add_javascript(self.resource_string("static/js/src/reflection_edit.js"))
        frag.initialize_js('ReflectionAssistantXBlock')
        return frag

    # Required for studio_view:
    _non_editable_metadata_fields = []
    @property
    def non_editable_metadata_fields(self):
        """ List of the XBlock fields that should not be displayed in the Studio editor. """
        return self._non_editable_metadata_fields

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}

    # Scenarios you'd like to see in the workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ReflectionAssistantXBlock",
             """<reflection/>
             """),
        ]
