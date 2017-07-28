# -*- coding: utf-8 -*-
"""Reflection Assistant: Preparation XBlock"""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Boolean, Float, Integer, Scope, String
from xblock.fragment import Fragment
from xblockutils.studio_editable import StudioEditableXBlockMixin

from .utils import render_template

@XBlock.needs('i18n')
class ReflectionAssistantPrepXBlock(XBlock):
    """
    Prompts students before a problem-solving activity (Preparation Phase)
    to facilitate use of metacognition techniques
    """

    ###########################################################################
    # Fields: Display Settings

    # Display Name
    display_name = String(
        default="Reflection Assistant: Preparation"
        , scope=Scope.settings
        , help="Display Name"
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
    pre_q5_ans = Integer(
        default=0
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

    ###########################################################################
    # Config data for JavaScript

    def get_config(self):
        """
        Get the configuration data/fields the views will need.
        """
        return {
            "pre_q1_disp": self.pre_q1_disp
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
            render_template("/templates/html/reflection_prep.html", {"self": self,})
        )
        frag.add_css(
            self.resource_string("static/css/reflection.css")
        )
        frag.add_javascript(
            self.resource_string("static/js/src/reflection_prep.js")
        )
        frag.initialize_js('ReflectionAssistantPrepXBlock', self.get_config())
        return frag

    # Editor (Studio) View
    def studio_view(self, context=None):
        """
        The editor view of the ReflectionAssistantXBlock, shown to course
        authors when editing courses in edX Studio.
        """
        frag = Fragment()
        frag.add_content(
            render_template("/templates/html/reflection_prep_edit.html", {"self": self,})
        )
        frag.add_css(
            self.resource_string("static/css/reflection.css")
        )
        frag.add_javascript(
            self.resource_string("static/js/src/reflection_prep_edit.js")
        )
        frag.initialize_js('ReflectionAssistantPrepXBlock', self.get_config())
        return frag

    ###########################################################################
    # JSON Handlers

    @XBlock.json_handler
    def set_student_view(self, data, suffix=''):
        """
        Set the fields to be displayed on the student view
        """
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

    @XBlock.json_handler
    def save_student_answer(self, data, suffix=''):
        """
        Set the fields to be displayed on the student view
        """
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

    ###########################################################################
    # Miscellany

    # Property required for studio_view:
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
            ("Reflection Assistant: Preparation",
             """<reflection_prep/>
             """),
            ("Reflection Assistant: Prep and Eval",
             """<vertical_demo>
                <reflection_prep/>
                <reflection_eval/>
                </vertical_demo>
             """),
        ]
