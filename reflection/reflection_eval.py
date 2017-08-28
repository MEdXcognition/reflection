# -*- coding: utf-8 -*-
"""Reflection Assistant: Evaluation XBlock"""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Boolean, Float, Integer, Scope, String
from xblock.fragment import Fragment

from .utils import render_template


@XBlock.needs('i18n')
class ReflectionAssistantEvalXBlock(XBlock):
    """
    Prompts students after a problem-solving activity (Evaluation Phase)
    to facilitate use of metacognition techniques
    """

    ###########################################################################
    # Fields: Display Settings

    # Display Name
    display_name = String(
        default="Reflection Assistant: Evaluation"
        , scope=Scope.settings
        , help="Display Name"
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
    # TODO: Address Bogdan's feedback?

    learner_profile_disp = Boolean(
        default=True
        , scope=Scope.settings
        , help="Display Learner Profile"
    )
    confidence = Integer(
        default=None
        , scope=Scope.user_state
        , help="Confidence level during preparation phase"
        , values=[1, 2, 3]
    )
    performance = Integer(
        default=None
        , scope=Scope.user_state
        , help="How completely the student has answered the problem"
        , values=[1, 2, 3]
    )
    profiled = Boolean(
        default=False
        , scope=Scope.user_state
        , help="True if learner profile was already computed"
    )
    kma = Float(
        default=55.0  # For display
        , scope=Scope.user_state
        , help="KMA score"
    )
    kmb = Float(
        default=85.0  # For display
        , scope=Scope.user_state
        , help="KMB score"
    )
    no_bias = Integer(
        default=0
        , scope=Scope.preferences
        , help="No Bias count"
    )
    partial_optimistic = Integer(
        default=0
        , scope=Scope.preferences
        , help="Partial Optimistic Bias count"
    )
    partial_pessimistic = Integer(
        default=0
        , scope=Scope.preferences
        , help="Partial Pessimistic Bias count"
    )
    full_optimistic = Integer(
        default=0
        , scope=Scope.preferences
        , help="Full Optimistic Bias count"
    )
    full_pessimistic = Integer(
        default=0
        , scope=Scope.preferences
        , help="Full Pessimistic Bias count"
    )

    def set_bias(self):
        """
        Set bias values from inputs
        """
        performance = int(self.performance)
        confidence = int(self.confidence)
        if performance == 1:
            if confidence == 1:
                self.no_bias += 1
            elif confidence == 2:
                self.partial_optimistic += 1
            else:
                self.full_optimistic += 1
        elif performance == 2:
            if confidence == 1:
                self.partial_pessimistic += 1
            elif confidence == 2:
                self.no_bias += 1
            else:
                self.partial_optimistic += 1
        elif performance == 3:
            if confidence == 1:
                self.full_pessimistic += 1
            elif confidence == 2:
                self.partial_pessimistic += 1
            else:
                self.no_bias += 1

    def normalize(self, value):
        """
        Normalize values from [-1, 1] to [0, 100]
        """
        return int(100 * (value + 1) / 2)

    def compute_KMA(self):
        """
        Compute for KMA
        """
        partial_bias = self.partial_pessimistic + self.partial_optimistic
        full_bias = self.full_pessimistic + self.full_optimistic
        numerator = self.no_bias - 0.5 * partial_bias - full_bias
        denominator = self.no_bias + partial_bias + full_bias
        self.kma = self.normalize(numerator / denominator)

    def compute_KMB(self):
        """
        Compute for KMB
        """
        partial_balance = self.partial_optimistic - self.partial_pessimistic
        full_balance = self.full_optimistic - self.full_pessimistic
        partial_bias = self.partial_pessimistic + self.partial_optimistic
        full_bias = self.full_pessimistic + self.full_optimistic
        numerator = full_balance + 0.5 * partial_balance
        denominator = partial_bias + full_bias + self.no_bias
        self.kmb = self.normalize(numerator / denominator)

    ###########################################################################
    # Config data for JavaScript

    def get_config(self):
        """
        Get the configuration data/fields the views will need.
        """
        return {
            "learner_profile_disp": self.learner_profile_disp
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

    ###########################################################################
    # Views

    # Student View
    def student_view(self, context=None):
        """
        The primary view of the ReflectionAssistantXBlock, shown to students
        when viewing courses.
        """
        frag = Fragment()
        frag.add_content(
            render_template(
                "/templates/html/reflection_eval.html", {"self": self, })
        )
        frag.add_css(
            self.resource_string("static/css/reflection.css")
        )
        frag.add_javascript(
            self.resource_string("static/js/src/reflection_eval.js")
        )
        frag.initialize_js('ReflectionAssistantEvalXBlock', self.get_config())
        return frag

    # Editor (Studio) View
    def studio_view(self, context=None):
        """
        The editor view of the ReflectionAssistantXBlock, shown to course
        authors when editing courses in edX Studio.
        """
        frag = Fragment()
        frag.add_content(
            render_template(
                "/templates/html/reflection_eval_edit.html", {"self": self, })
        )
        frag.add_css(
            self.resource_string("static/css/reflection.css")
        )
        frag.add_javascript(
            self.resource_string("static/js/src/reflection_eval_edit.js")
        )
        frag.initialize_js('ReflectionAssistantEvalXBlock', self.get_config())
        return frag

    ###########################################################################
    # JSON Handlers

    @XBlock.json_handler
    def set_student_view(self, data, suffix=''):
        """
        Set the fields to be displayed on the student view
        """
        self.post_q1_disp = data["post_q1_disp"]
        self.post_q2_disp = data["post_q2_disp"]
        self.post_q3_disp = data["post_q3_disp"]
        self.post_q4_disp = data["post_q4_disp"]
        self.post_q5_disp = data["post_q5_disp"]
        self.learner_profile_disp = data["learner_profile_disp"]

    @XBlock.json_handler
    def save_student_answer(self, data, suffix=''):
        """
        Set the fields to be displayed on the student view
        """
        if self.learner_profile_disp and not self.profiled:
            self.confidence = data["confidence"]
            self.performance = data["performance"]
            self.set_bias()
            self.compute_KMA()
            self.compute_KMB()
            self.profiled = True
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

    ###########################################################################
    # Miscellany

    # Required for studio_view:
    _non_editable_metadata_fields = []
    @property
    def non_editable_metadata_fields(self):
        """
        List of the XBlock fields that should not be displayed in the Studio
        editor.
        """
        return self._non_editable_metadata_fields

    # Property required for edX LMS:
    _icon_class = "problem"
    @property
    def icon_class(self):
        """
        Controls the icon that displays to learners in the unit navigation bar
        on the LMS Course page when the XBlock is in that unit. Must be one of
        "problem", "video", or "other".
        """
        return self._icon_class

    # Scenarios you'd like to see in the workbench while developing your XBlock
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("Reflection Assistant: Evaluation",
             """<reflection_eval/>
             """),
        ]
