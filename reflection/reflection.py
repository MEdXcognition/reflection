"""Reflection Assistant XBlock"""

import uuid
import pkg_resources

from xblock.core import XBlock
from xblock.fields import Boolean, Float, Integer, Scope, String
from xblock.fragment import Fragment


class ReflectionAssistantXBlock(XBlock):
    """
    Shows prompts to student before (Preparation Phase) and after (Evaluation
    Phase) a problem-solving activity to facilitate use of metacognition
    techniques
    """

    # Fields

    ###########################################################################
    # Display Settings

    # Unique Instance ID
    uniq = String(
       default=uuid.uuid4().hex
       , scope=Scope.settings
       , help="Unique Instance ID"
    )

    # Display Preparation or Evaluation phase
    block_type = String(
        default=""
        , scope=Scope.settings
        , help="What type of prompt is this XBlock instance?"
        , values=["pre", "post"]
    )

    # Display questions for Preparation phase
    pre_q1_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Preparation Q1"
    )
    pre_q2_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Preparation Q2"
    )
    pre_q3_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Preparation Q3"
    )
    pre_q4_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Preparation Q4"
    )
    pre_q5_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Preparation Q5"
    )
    pre_q6_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Preparation Q6"
    )

    # Display metacognitive strategies
    pre_s1_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Metacognitive Strategy 1"
    )
    pre_s2_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Metacognitive Strategy 2"
    )
    pre_s3_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Metacognitive Strategy 3"
    )
    pre_s4_disp = Boolean(
        default=False
        , scope=Scope.settings
        , help="Display Metacognitive Strategy 4"
    )
    pre_s5_disp = Boolean(
        default=False
        , scope=Scope.settings
        , help="Display Metacognitive Strategy 5"
    )
    pre_s6_disp = Boolean(
        default=False
        , scope=Scope.settings
        , help="Display Metacognitive Strategy 6"
    )

    # Metacognitive strategies strings
    pre_s1_text = String(
        default="Monitor understanding"
        , scope=Scope.settings
        , help="Metacognitive Strategy 1"
    )
    pre_s2_text = String(
        default="Monitor progress and control errors"
        , scope=Scope.settings
        , help="Metacognitive Strategy 2"
    )
    pre_s3_text = String(
        default="Revise solution paths"
        , scope=Scope.settings
        , help="Metacognitive Strategy 3"
    )
    pre_s4_text = String(
        default=""
        , scope=Scope.settings
        , help="Metacognitive Strategy 4"
    )
    pre_s5_text = String(
        default=""
        , scope=Scope.settings
        , help="Metacognitive Strategy 5"
    )
    pre_s6_text = String(
        default=""
        , scope=Scope.settings
        , help="Metacognitive Strategy 6"
    )

    # Display questions for Evaluation phase
    post_q1_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Evaluation Q1"
    )
    post_q2_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Evaluation Q2"
    )
    post_q3_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Evaluation Q3"
    )
    post_q4_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Evaluation Q4"
    )
    post_q5_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Evaluation Q5"
    )

    ###########################################################################
    # Student Answers

    # Student answer for Preparation phase questions
    pre_q1_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Preparation Q1"
    )
    pre_q2_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Preparation Q2"
    )
    pre_q3_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Preparation Q3"
    )
    pre_q4_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Preparation Q4"
    )
    # TODO: Modify for KMA/KMB computation
    pre_q5_ans = Integer(
        default=1
        , scope=Scope.user_state
        , help="Student answer for Preparation Q5"
        , values=[1, 2, 3]
    )

    # Student answer for metacognitive strategies
    pre_s1_ans = Boolean(
        default=False
        , scope=Scope.user_state
        , help="Student answer for Metacognitive Strategy 1"
    )
    pre_s2_ans = Boolean(
        default=False
        , scope=Scope.user_state
        , help="Student answer for Metacognitive Strategy 2"
    )
    pre_s3_ans = Boolean(
        default=False
        , scope=Scope.user_state
        , help="Student answer for Metacognitive Strategy 3"
    )
    pre_s4_ans = Boolean(
        default=False
        , scope=Scope.user_state
        , help="Student answer for Metacognitive Strategy 4"
    )
    pre_s5_ans = Boolean(
        default=False
        , scope=Scope.user_state
        , help="Student answer for Metacognitive Strategy 5"
    )
    pre_s6_ans = Boolean(
        default=False
        , scope=Scope.user_state
        , help="Student answer for Metacognitive Strategy 6"
    )

    # Student answer for Evaluation phase questions
    post_q1_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Evaluation Q1"
    )
    post_q2_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Evaluation Q2"
    )
    post_q3_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Evaluation Q3"
    )
    post_q4_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Evaluation Q4"
    )
    post_q5_ans = String(
        default=""
        , scope=Scope.user_state
        , help="Student answer for Evaluation Q5"
    )

    ###########################################################################
    # Learner Profile
    learner_profile_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Learner Profile"
    )
    problem_score = Integer(
        default=None
        , scope=Scope.user_state
        , help="How completely the student has answered the problem"
        , values=[1, 2, 3]
    )
    kma = Float(
        default=55.0 # For display
        , scope=Scope.preferences
        , help="KMA score"
    )
    kmb = Float(
        default=85.0 # For display
        , scope=Scope.preferences
        , help="KMB score"
    )
    no_bias_count = Integer(
        scope=Scope.preferences
        , help="No Bias count"
    )
    partial_optimistic_bias_count = Integer(
        scope=Scope.preferences
        , help="Partial Optimistic Bias count"
    )
    partial_pessimistic_bias_count = Integer(
        scope=Scope.preferences
        , help="Partial Pessimistic Bias count"
    )
    full_optimistic_bias_count = Integer(
        scope=Scope.preferences
        , help="Full Optimistic Bias count"
    )
    full_pessimistic_bias_count = Integer(
        scope=Scope.preferences
        , help="Full Pessimistic Bias count"
    )

    def set_bias(self):
        """
        Set bias values from inputs
        """
        if self.problem_score == 1:
            if self.pre_q5_ans == 1:
                self.no_bias_count += 1
            elif self.pre_q5_ans == 2:
                self.partial_optimistic_bias_count += 1
            else:
                self.full_optimistic_bias_count += 1
        elif self.problem_score == 2:
            if self.pre_q5_ans == 1:
                self.partial_pessimistic_bias_count += 1
            elif self.pre_q5_ans == 2:
                self.no_bias_count += 1
            else:
                self.partial_optimistic_bias_count += 1
        elif self.problem_score == 3:
            if self.pre_q5_ans == 3:
                self.full_pessimistic_bias_count += 1
            elif self.pre_q5_ans == 2:
                self.partial_pessimistic_bias_count += 1
            else:
                self.no_bias_count += 1
        else:
            log.error('Problem score not specified')

    def compute_KMA(self):
        """
        Compute for KMA
        """
        self.kma = (
            (
                self.no_bias_count
                - 0.5 * (self.partial_pessimistic_bias_count
                    + self.partial_optimistic_bias_count)
                - (self.full_pessimistic_bias_count
                    + self.full_optimistic_bias_count)
            ) / (
                self.no_bias_count
                + self.partial_pessimistic_bias_count
                + self.partial_optimistic_bias_count
                + self.full_pessimistic_bias_count
                + self.full_optimistic_bias_count
            )
        )

    def compute_KMB(self):
        """
        Compute for KMB
        """
        self.kmb = (
            (
                self.full_optimistic_bias_count
                - 0.5 * self.partial_pessimistic_bias_count
                + 0.5 * self.partial_optimistic_bias_count
                - self.full_pessimistic_bias_count
            ) / (
                self.partial_pessimistic_bias_count
                + self.partial_optimistic_bias_count
                + self.full_pessimistic_bias_count
                + self.full_optimistic_bias_count
            )
        )

    ###########################################################################

    def get_config(self):
        """
        Get the configuration data/fields the views will need.
        """
        return {
            "uniq" : self.uniq
            , "block_type": self.block_type
            , "pre_q1_disp": self.pre_q1_disp
            , "pre_q2_disp": self.pre_q2_disp
            , "pre_q3_disp": self.pre_q3_disp
            , "pre_q4_disp": self.pre_q4_disp
            , "pre_q5_disp": self.pre_q5_disp
            , "pre_q6_disp": self.pre_q6_disp
            , "pre_s1_disp": self.pre_s1_disp
            , "pre_s2_disp": self.pre_s2_disp
            , "pre_s3_disp": self.pre_s3_disp
            , "pre_s4_disp": self.pre_s4_disp
            , "pre_s5_disp": self.pre_s5_disp
            , "pre_s6_disp": self.pre_s6_disp
            , "pre_q5_ans": self.pre_q5_ans
            , "pre_s1_text": self.pre_s1_text
            , "pre_s2_text": self.pre_s2_text
            , "pre_s3_text": self.pre_s3_text
            , "pre_s4_text": self.pre_s4_text
            , "pre_s5_text": self.pre_s5_text
            , "pre_s6_text": self.pre_s6_text
            , "pre_s1_ans": self.pre_s1_ans
            , "pre_s2_ans": self.pre_s2_ans
            , "pre_s3_ans": self.pre_s3_ans
            , "pre_s4_ans": self.pre_s4_ans
            , "pre_s5_ans": self.pre_s5_ans
            , "pre_s6_ans": self.pre_s6_ans
            , "learner_profile_disp": self.learner_profile_disp
            , "post_q1_disp": self.post_q1_disp
            , "post_q2_disp": self.post_q2_disp
            , "post_q3_disp": self.post_q3_disp
            , "post_q4_disp": self.post_q4_disp
            , "post_q5_disp": self.post_q5_disp
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
        frag.add_css(self.resource_string("static/css/reflection.css"))
        frag.add_javascript(self.resource_string(
            "static/js/src/reflection.js"))
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
        frag.add_css(self.resource_string("static/css/reflection.css"))
        frag.add_javascript(self.resource_string(
            "static/js/src/reflection_edit.js"))
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
        frag.add_css(self.resource_string("static/css/reflection.css"))
        frag.add_javascript(self.resource_string(
            "static/js/src/reflection_author.js"))
        frag.initialize_js('ReflectionAssistantXBlock', self.get_config())
        return frag

    # Required for studio_view:
    _non_editable_metadata_fields = []

    @property
    def non_editable_metadata_fields(self):
        """
        List of the XBlock fields that should not be displayed in the Studio
        editor.
        """
        return self._non_editable_metadata_fields

    # Handlers
    @XBlock.json_handler
    def set_block_type(self, data, suffix=''):
        """
        Set the type of content in this instance: pre-problem or post-problem
        """
        # assert data['block_type'"'] in ('pre', 'post')
        if data['block_type'] not in ('pre', 'post'):
            log.error('invalid block_type posted')
            return

        self.block_type = data["block_type"]
        return {"block_type": self.block_type}

    @XBlock.json_handler
    def set_student_view(self, data, suffix=''):
        """
        Set the fields to be displayed on the student view
        """
        if self.block_type == 'pre':
            self.pre_q1_disp = data["pre_q1_disp"]
            self.pre_q2_disp = data["pre_q2_disp"]
            self.pre_q3_disp = data["pre_q3_disp"]
            self.pre_q4_disp = data["pre_q4_disp"]
            self.pre_q5_disp = data["pre_q5_disp"]
            self.pre_q6_disp = data["pre_q6_disp"]
            self.pre_s1_disp = data["pre_s1_disp"]
            self.pre_s2_disp = data["pre_s2_disp"]
            self.pre_s3_disp = data["pre_s3_disp"]
            self.pre_s4_disp = data["pre_s4_disp"]
            self.pre_s5_disp = data["pre_s5_disp"]
            self.pre_s6_disp = data["pre_s6_disp"]
            self.pre_s1_text = data["pre_s1_text"]
            self.pre_s2_text = data["pre_s2_text"]
            self.pre_s3_text = data["pre_s3_text"]
            self.pre_s4_text = data["pre_s4_text"]
            self.pre_s5_text = data["pre_s5_text"]
            self.pre_s6_text = data["pre_s6_text"]
        elif self.block_type == 'post':
            self.post_q1_disp = data["post_q1_disp"]
            self.post_q2_disp = data["post_q2_disp"]
            self.post_q3_disp = data["post_q3_disp"]
            self.post_q4_disp = data["post_q4_disp"]
            self.post_q5_disp = data["post_q5_disp"]
            self.learner_profile_disp = data["learner_profile_disp"]
        else:
            log.error('invalid block_type posted')

    @XBlock.json_handler
    def save_student_answer(self, data, suffix=''):
        """
        Set the fields to be displayed on the student view
        """
        if self.block_type == 'pre':
            if self.pre_q1_disp:
                self.pre_q1_ans = data["pre_q1_ans"]
            if self.pre_q2_disp:
                self.pre_q2_ans = data["pre_q2_ans"]
            if self.pre_q3_disp:
                self.pre_q3_ans = data["pre_q3_ans"]
            if self.pre_q4_disp:
                self.pre_q4_ans = data["pre_q4_ans"]
            if self.pre_q5_disp:
                self.pre_q5_ans = data["pre_q5_ans"]
            if self.pre_q6_disp:
                if self.pre_s1_disp:
                    self.pre_s1_ans = data["pre_s1_ans"]
                if self.pre_s2_disp:
                    self.pre_s2_ans = data["pre_s2_ans"]
                if self.pre_s3_disp:
                    self.pre_s3_ans = data["pre_s3_ans"]
                if self.pre_s4_disp:
                    self.pre_s4_ans = data["pre_s4_ans"]
                if self.pre_s5_disp:
                    self.pre_s5_ans = data["pre_s5_ans"]
                if self.pre_s6_disp:
                    self.pre_s6_ans = data["pre_s6_ans"]
        if self.block_type == 'post':
            #if self.learner_profile_disp:
            #    self.problem_score = data["problem_score"]
            #    self.set_bias()
            #    self.compute_KMA()
            #    self.compute_KMB()
            if self.post_q1_disp:
                self.post_q1_ans = data["post_q1_ans"]
            if self.post_q2_disp:
                self.post_q2_ans = data["post_q2_ans"]
            if self.post_q3_disp:
                self.post_q3_ans = data["post_q3_ans"]
            if self.post_q4_disp:
                self.post_q4_ans = data["post_q4_ans"]
            if self.post_q5_disp:
                self.post_q5_ans = data["post_q5_ans"]

    # Scenarios you'd like to see in the workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ReflectionAssistantXBlock",
             """<reflection/>
             """),
        ]
