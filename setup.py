"""Setup for reflection XBlock."""

import os
from setuptools import setup


def package_data(pkg, roots):
    """Generic function to find package_data.

    All of the files under each of the `roots` will be declared as package
    data for package `pkg`.

    """
    data = []
    for root in roots:
        for dirname, _, files in os.walk(os.path.join(pkg, root)):
            for fname in files:
                data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='reflection-xblock',
    version='1.0',
    description='Reflection Assistant XBlock',
    license='Apache 2.0',
    packages=[
        'reflection',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'reflection_prep = reflection:ReflectionAssistantPrepXBlock',
            'reflection_eval = reflection:ReflectionAssistantEvalXBlock',
        ]
    },
    package_data=package_data("reflection", ["static", "templates"]),
)
