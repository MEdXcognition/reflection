Reflection Assistant XBlock
===========================

Instruction of metacognitive practices and guidance in students' use of their metacognitive skills has been proven to facilitate learning. This addition to the Open EdX implements a documented tool to evaluate and develop metacognitive skill in a way that can be utilized in the instruction of any subject. Through intentional reflection before and after problem solving activities, the student both exercises and sees the progress of his or her metacognitive skills.

# Install XBlock on an OpenEdX Instance

For installation instructions, please consult the latest OpenEdX documentation. These can be found [here](edx.readthedocs.io/projects/edx-developer-guide/en/latest/extending_platform/xblocks.html#deploying-your-xblock). These instructions are summarized below.

## Install XBlock in virtualenv out of which the platform runs

1. Retrieve the XBlock code:
```git clone https://github.com/MEdXcognition/reflection.git```
2. Install the XBlock:
```sudo -u edxapp /edx/bin/pip.edxapp install /path/to/cloned/block```
3. Add the block to the advanced settings of the desired course in Studio:
* `sudo su edxapp`
* `paver devstack lms`
* `paver devstack studio`
* In the studio instance, open the desired course
* Settings -> Advanced Settings
* Change the value for the key "advanced_modules" to ["reflection"]
4. Add the block into the desired course
* Edit a unit
* Select desired assessment

## Deploy XBlock
1. Add to the list of `ADVANCED_COMPONENT_TYPES` in `edx-platform/cms/djangoapps/contentstore/views/component.py`.

---

Copyright 2017 MEdXcognition Team, Georgia Institute of Technology

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
