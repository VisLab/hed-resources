HED resources
===========================


.. sidebar:: **Links**
   
   * `HED homepage <https://www.hedtags.org/>`_ 

   * `HED schema browser <https://www.hedtags.org/hed-schema-browser>`_

   * `HED online tools <https://hedtools.org/hed/>`_

   * `HED browser tools <https://www.hedtags.org/hed-javascript>`_

   * `HED organization <https://github.com/hed-standard/>`_  

   * `HED specification <https://www.hedtags.org/hed-specification>`_ 

What is HED?
************

**HED (Hierarchical Event Descriptors)** is a framework for describing experiment events using a standardized,
machine-readable vocabulary. HED annotations enable researchers to create **analysis-ready datasets** that are
easily searchable and shareable across studies.

HED is used across neuroimaging (EEG, MEG, fMRI), physiological (ECG, EMG, GSR), and behavioral experiments
to create permanent, human- and machine-readable records of what happened during data collection.

HED is integrated into data standards like `BIDS <https://bids.neuroimaging.io/>`_ 
(Brain Imaging Data Structure) and `NWB <https://www.nwb.org/>`_ (Neurodata Without Borders),
making it easy to share analysis-ready datasets.

Where to begin?
***************

**New to HED?** Start with the `Introduction to HED <./IntroductionToHed.html>`_ for core concepts (5 min read).

**Ready to get started?** Use the `How can you use HED? <./HowCanYouUseHed.html>`_ guide to find role-specific
workflows and detailed guidance for your use case (experimenters, annotators, analysts, developers, or schema builders).

**To understand HED annotations** read `Making HED meaningful <./HedAnnotationSemantics.html>`_ the essential 
guide to HED annotation strategy and meaning.

**Need tools?** Browse the `HED online tools <https://hedtools.org/hed/>`_ for installation-free validation, annotation, and analysis.
You can also explore the `Python HEDTools <https://www.hedtags.org/hed-python>`_, the `MATLAB HEDTools <https://www.hedtags.org/hed-matlab>`_, and the `JavaScript HEDTools <https://www.hedtags.org/hed-javascript>`_ for programmatic access on various platforms.


.. toctree::
   :maxdepth: 5
   :hidden:
   :caption: Overview:

   IntroductionToHed.md
   HowCanYouUseHed.md
   Making HED meaningful <./HedAnnotationSemantics.md>
   HedSchemas.md
   WhatsNew.md   


.. toctree::
   :maxdepth: 5
   :hidden:
   :caption: Tutorials and guides:

   BidsAnnotationQuickstart.md
   HedAnnotationQuickstart.md
   HED annotation in NWB <https://www.hedtags.org/ndx-hed>
   HedValidationGuide.md
   HedSearchGuide.md
   HedSummaryGuide.md
   Design matrices <HedConditionsAndDesignMatrices>


.. toctree::
   :maxdepth: 3
   :hidden:
   :caption: Tool documentation:

   HED online tools <https://www.hedtags.org/hed-web>
   Schema developer guide <https://www.hedtags.org/hed-schemas>
   Python HEDTools <hed-python/index>
   JavaScript HedTools <https://www.hedtags.org/hed-javascript>
   MATLAB HEDTools <https://www.hedtags.org/hed-matlab>
   Table-remodeler <https://www.hedtags.org/table-remodeler>
   HED VSCode extension <HedVsCode.md>
   HED MCP <https://github.com/hed-standard/hed-mcp/blob/main/README.md>
   CTagger <https://www.hedtags.org/CTagger>


.. toctree::
   :maxdepth: 3
   :hidden:
   :caption: Other resources:

   DocumentationSummary.md
   UnderstandingHedVersions.md
   HedHistory.md
   HedGovernance.md


.. toctree::
   :maxdepth: 3
   :hidden:
   :caption: Data resources:

   HedTestDatasets.md

Index
***********

:ref:`genindex`
