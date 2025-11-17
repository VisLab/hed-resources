# How can you use HED?

HED (Hierarchical Event Descriptors) serves different needs throughout the research lifecycle. Whether you're collecting data, annotating datasets, or analyzing results, HED provides tools and frameworks to make your work more efficient and your data more valuable.

```{admonition} **New to HED?**
---
class: tip
---
If this is your first time learning about HED, start with the [**Introduction to HED**](IntroductionToHed.md) for basic concepts and quick start paths. This guide provides detailed workflows for each research role.
```

## Research roles and HED workflows

HED serves researchers in different capacities throughout the data lifecycle. Choose your primary role to find relevant tools and guidance:

````{grid} 2
---
gutter: 3
---
```{grid-item-card} 🧪 **Experimenter**
:class-header: bg-primary
:link: #as-an-experimenter-anchor
:link-type: ref

Planning experiments, collecting data with proper event logging, and preparing data for analysis.

**Key needs:** Event logging best practices, data collection standards, log-to-event conversion
```

```{grid-item-card} 📝 **Data Annotator**
:class-header: bg-success
:link: #as-a-data-annotator-anchor
:link-type: ref

Adding HED annotations to existing datasets, curating data for sharing, BIDS/NWB integration.

**Key needs:** Annotation tools, validation workflows, standardized formats
```

```{grid-item-card} 📊 **Data Analyst**
:class-header: bg-info
:link: #as-a-data-analyst-anchor
:link-type: ref

Searching and analyzing HED-annotated data, extracting design matrices, cross-study comparisons.

**Key needs:** Search tools, programming APIs, analysis workflows
```

```{grid-item-card} 🛠️ **Tool Developer**
:class-header: bg-warning
:link: #as-a-tool-developer-anchor
:link-type: ref

Building software that integrates with HED, creating analysis pipelines, extending HED functionality.

**Key needs:** APIs, schema specifications, integration guidelines
```
````

````{grid} 1

```{grid-item-card} 🏗️ **Schema Builder**
:class-header: bg-secondary
:link: #as-a-schema-builder-anchor
:link-type: ref

Developing domain-specific vocabularies (HED library schemas) to
capture domain specific concepts in metadata.

**Key needs:** Schema development tools, community coordination, validation frameworks
```
````

<hr style="border: 3px solid #000080" />

(as-an-experimenter-anchor)=

## 🧪 As an experimenter

> **Planning experiments, collecting data, and preparing for analysis**

You're designing and running experiments to test hypotheses and study behavior. HED helps you capture what actually happened during data collection in a way that maximizes downstream usability and enables powerful analyses.

### Challenges for experimenters

````{grid} 2
---
gutter: 2
---
```{grid-item-card} ❌ **Without HED**
:class-header: bg-danger

- Meaningless event codes (1, 2, 3)
- Log files require constant documentation
- Analysis code breaks when events change
- Difficult to compare across experiments
- Data sharing requires extensive explanation
```

```{grid-item-card} ✅ **With HED**
:class-header: bg-success

- Self-documenting event annotations
- Standardized vocabulary across studies
- HED-enabled analysis works automatically
- Easy cross-experiment comparisons
- Data ready for sharing in BIDS/NWB
```
````

### Essential topics for experimenters

```{dropdown} **🎯 Planning and running experiments**

**Key questions to address:**
- What events should be logged during data collection?
- How will experimental design and conditions be recorded?
- How will logs be synchronized with neuroimaging data?
- What participant responses need to be captured?

**Critical principle:** <span style="color:#A00000; font-weight:bold;">Data that isn't recorded is lost forever!</span>

**Event logging best practices:**
- Mark ALL events visible to participants (stimuli, cues, instructions, feedback)
- Record participant responses with precise timing
- Include experimental control markers (trial/block boundaries, condition changes)
- Capture incidental events that might affect neural responses
- Plan for pilot testing to identify missing events

**Example event types to capture:**
- **Sensory presentations**: Visual stimuli, auditory cues, tactile feedback
- **Participant actions**: Button presses, eye movements, verbal responses  
- **Experimental control**: Trial starts, condition changes, break periods
- **Environmental events**: Equipment issues, interruptions, calibration
```

````{dropdown} **🔄 Post-processing and data transformation**

After data collection, raw logs need processing before analysis. HED remodeling tools help transform experimental logs into analysis-ready event files.

**Common transformations needed:**
1. **Log summarization**: Get overview of collected events
2. **Code expansion**: Convert numeric codes to meaningful categories  
3. **Column restructuring**: Create BIDS-compliant event files
4. **Data validation**: Check for missing or invalid events

**Example workflow using HED remodeling tools:**
```json
[{
   "operation": "summarize_column_values",
   "description": "Get overview of log contents",
   "parameters": {
       "summary_name": "Log_summary",
       "skip_columns": ["onset"],
       "value_columns": ["description"]
   }
}]
```
````

**Resources for experimenters:**

- **📚 Guide**: [Actionable event annotation and analysis in fMRI](https://osf.io/93km8/) - Practical guidance with sample data
- **🛠️ Tools**: [HED remodeling tools](./HedRemodelingTools.md) - Transform logs to event files
- **🌐 Online**: [Event remodeling service](https://hedtools.org/hed_dev/events) - Process files without installation

______________________________________________________________________

(as-a-data-annotator-anchor)=

## 📝 As a data annotator

> **Organizing data, adding HED annotations, and preparing datasets for sharing**

You're curating datasets for sharing, adding meaningful annotations to event data, and ensuring data meets standards like BIDS or NWB. HED provides tools and workflows to make your data FAIR (Findable, Accessible, Interoperable, Reusable).

### Challenges for data annotators

````{grid} 2
---
gutter: 2
---
```{grid-item-card} ❌ **Without HED**
:class-header: bg-danger

- Events meaningless without docs
- Each dataset needs custom interpretation
- Hard to validate metadata completeness
- Manual coding for every analysis
- Hard to find similar datasets
```

```{grid-item-card} ✅ **With HED**
:class-header: bg-success

- Self-documenting event annotations
- Standardized vocabulary across datasets
- Automated validation and quality checks
- Analysis tools work out of the box
- Easy cross-dataset search and comparison
```
````

**Here are some topics of interest to data annotators:**

- [**Standardizing the format**](standardizing-the-format-anchor)
  - [**Learning about HED**](learning-about-hed-anchor)
  - [**HED and BIDS**](hed-and-bids-anchor)
  - [**HED and NWB**](hed-and-nwb-anchor)
- [**Adding HED annotations**](adding-hed-annotations-anchor)
  - [**Viewing available tags**](viewing-available-tags-anchor)
  - [**Basic annotation strategies**](basic-annotation-strategies-anchor)
  - [**More advanced annotations**](more-advanced-annotations-anchor)
- [**Checking correctness**](checking-correctness-anchor)
  - [**Validating HED annotations**](validating-hed-annotations-anchor)
  - [**Checking for consistency**](checking-for-consistency-anchor)

(standardizing-the-format-anchor)=

### Standardizing the format

An important aspect of data-sharing is putting your data into a standardized format so that tools can read and manipulate the data without the need for special-purpose reformatting code. BIDS and NWB are the most widely-used standards for organizing data in neuroscience.

[**BIDS**](https://bids.neuroimaging.io/) (Brain Imaging Data Structure) is a widely used data organization standard for neuroimaging and behavioral data. BIDS focuses on file organization with appropriate experimental metadata.

[**NWB**](https://www.nwb.org/) (Neurodata Without Borders) is a data standard for neurophysiology, providing specifications for storing cellular, intracellular, and extracellular physiology data, and more recently neuroimaging and behavioral data. A single NWB file holds all of the data from an experimental session, synchronized to a common time line.

HED is well-integrated into both the BIDS and NWB standards.

(learning-about-hed-anchor)=

#### Learning about HED

- The [**Introduction to HED**](https://www.hedtags.org/hed-resources/IntroductionToHed.html) gives a basic overview of HED's history and goals and a quickstart introduction.

<p></p>

- Use the [**HED schema Browser**](https://www.hedtags.org/hed-schema-browser) to explore the available HED standard vocabulary and the field-specific library schema extensions.

- The [**"Capturing the nature of events..."**](https://www.sciencedirect.com/science/article/pii/S1053811921010387) paper works through a practical example of using HED annotations and suggests best practices for annotation.

<p></p>

- The [**HED anntotation semantics**](HedAnnotationSemantics.md) tutorial presents detailed rules for making HED annotations meaningful.

- See also the [**HED specification**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html) for detailed information on the rules for HED. Of special interest to HED users are [**Chapter 4: Basic annotation**](https://www.hedtags.org/hed-specification/04_Basic_annotation.html) and [**Chapter 5: Advanced annotation**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html). These chapters explain the different types of HED annotations and the rules for using them.

(hed-and-bids-anchor)=

#### HED and BIDS

[**BIDS (Brain Imaging Data Structure)**](https://bids.neuroimaging.io/) is a widely used data organization standard for neuroimaging and behavioral data. BIDS focuses on file organization with appropriate experimental metadata.

**Learning about BIDS:**

- If you are unfamiliar with BIDS, we recommend the [**BIDS Starter Kit**](https://bids-standard.github.io/bids-starter-kit/index.html).

<p></p>

- [**Folders and Files**](https://bids-standard.github.io/bids-starter-kit/folders_and_files/folders.html) gives an overview of how files in a BIDS dataset are organized.

<p></p>

- The [**Annotating a BIDS dataset**](https://bids.neuroimaging.io/getting_started/tutorials/annotation.html) tutorial gives an overview of how to get the appropriate metadata into a BIDS dataset.

<p></p>

- See the [**BIDS specification**](https://bids-specification.readthedocs.io/en/stable/) for detailed information on the rules for BIDS. Of special interest to HED annotators are the sections on [**Events**](https://bids-specification.readthedocs.io/en/stable/modality-agnostic-files/events.html) and the [**Hierarchical Event Descriptors**](https://bids-specification.readthedocs.io/en/stable/appendices/hed.html) appendix.

<p></p>

- There are a variety of tools available to convert to and from BIDS format as summarized in [**BIDS Tools**](https://bids.neuroimaging.io/tools/index.html).

**Integrating HED in BIDS:**

There are two strategies for incorporating HED annotations in a BIDS dataset:

> **Method 1**: Use a JSON (sidecar) file to hold the annotations.

> **Method 2**: Annotate each line in each event file using the **HED** column.

Method 1 is the typical way that HED annotations are incorporated into a BIDS dataset. The [**HED online tools**](https://hedtools.org/hed/) allow you to easily generate a template JSON sidecar to fill in. The [**BIDS annotation quickstart**](https://www.hedtags.org/hed-resources/BidsAnnotationQuickstart.html) walks through this process step-by-step.

Method 2 is usually used for instrument-generated annotations or for manual processing (such as users marking bad sections of the data or special features). In both cases the annotations are usually created using special-purpose tools.

When using HED you must provide a HED schema version indicating the HED vocabulary you are using. In BIDS, the schema versions are specified in `dataset_description.json`, a required JSON file that must be placed in the root directory of the dataset. See [**HED schema versions**](https://bids-specification.readthedocs.io/en/stable/appendices/hed.html#hed-schema-versions) in the BIDS specification for examples.

(hed-and-nwb-anchor)=

#### HED and NWB

[**NWB (Neurodata Without Borders)**](https://www.nwb.org/) is a data standard for neurophysiology, providing specifications for storing cellular, intracellular, and extracellular physiology data, along with experimental metadata and behavior. A single NWB file holds all of the data from an experimental session, synchronized to a common time line.

**Learning about NWB:**

- The [**PyNWB documentation**](https://pynwb.readthedocs.io/) provides tutorials and API references for working with NWB files in Python.

<p></p>

- The [**ndx-hed extension**](https://www.hedtags.org/ndx-hed/) enables HED integration in NWB files. This extension provides data types for storing HED annotations alongside neurophysiology data.

<p></p>

- The [**HED annotation in NWB guide**](https://www.hedtags.org/hed-resources/HedAnnotationInNWB.html) provides detailed information on using HED with NWB, including examples and best practices.

<p></p>

- See the [**ndx-hed examples**](https://github.com/hed-standard/ndx-hed/tree/main/examples) for runnable code demonstrating real-world usage patterns and integration techniques.

**Integrating HED in NWB:**

HED annotations in NWB are stored using the **ndx-hed** extension, which provides three main classes:

> **HedLabMetaData**: Required for all HED-annotated NWB files. Specifies the HED schema version and optional lab-specific definitions.

> **HedTags**: Used for row-specific HED annotations in any NWB DynamicTable (e.g., trials, events).

> **HedValueVector**: Used for column-wide HED templates with value placeholders for shared annotation patterns.

**Installation:**

```bash
pip install -U ndx-hed
```

**Basic workflow:**

1. Install the ndx-hed extension package
2. Add HedLabMetaData to your NWB file with the HED schema version
3. Add HED columns to DynamicTables (trials, events, etc.) using HedTags
4. Annotate individual rows with HED strings

````{dropdown} **Example: Creating an NWB file with HED annotations**

```python
from pynwb import NWBFile
from ndx_hed import HedLabMetaData, HedTags
from datetime import datetime

# Create NWB file
nwbfile = NWBFile(
    session_description="Example session with HED annotations",
    identifier="example_session_001",
    session_start_time=datetime.now()
)

# Add HED schema metadata (required)
hed_metadata = HedLabMetaData(hed_schema_version="8.4.0")
nwbfile.add_lab_meta_data(hed_metadata)

# Add HED column to trials table
nwbfile.add_trial_column(
    name="HED",
    col_cls=HedTags,
    data=[],
    description="HED annotations for trials"
)

# Add trials with HED annotations
nwbfile.add_trial(
    start_time=0.0,
    stop_time=1.0,
    HED="Experimental-trial, (Sensory-event, Visual-presentation)"
)
```
````

The ndx-hed extension supports comprehensive validation to ensure HED annotations conform to schema specifications, and provides seamless conversion between BIDS events files and NWB EventsTable format with HED preservation.

(adding-hed-annotations-anchor)=

### Adding HED annotations

This section discusses the strategy for adding annotations in a BIDS dataset using sidecars. The discussion assumes that you have a JSON sidecar template file ready to annotate.

(basic-annotation-strategies-anchor)=

#### Basic annotation strategies

HED annotations come in variety of levels and complexity. If your HED annotations are in a JSON sidecar, it is easy to start simple and incrementally improve your annotations just by editing the JSON sidecar.

- The [**HED annotation quickstart**](https://www.hedtags.org/hed-resources/HedAnnotationQuickstart.html) provides a recipe for creating a simple HED annotation.

**A key part of the annotation is to include a good description** of each type event. One way to do this is to include a *Description/* tag with a text value as part of each annotation. A good description helps to clarify the information that you want to convey in the tags.

<p></p>
If you have NWB, you can convert an NWB `Events` table to a
BIDS `_events.tsv` file, generate the template, annotate, and transform back.
See the [**BIDS to NWB conversion example**](https://github.com/hed-standard/ndx-hed/blob/main/examples/04_bids_conversion.py) to see how that is done.

(viewing-available-tags-anchor)=

#### Viewing available tags

The HED vocabulary is hierarchically organized as shown in the schema as viewed in the [**HED Schema Viewer**](https://www.hedtags.org/hed-schema-browser/). Library schemas can also be viewed using this viewer.

<p></p>

(more-advanced-annotations-anchor)=

#### More advanced annotations

HED supports a number of advanced annotation concepts which are necessary for a complete description of the experiment.

- **HED definitions**: allow users to define complex concepts. See [**Creating definitions**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html#creating-definitions) and [**Using definitions**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html#using-definitions) for an overview and syntax.

<p></p>

- **Temporal scope**: annotate event processes that extend over time and provide a context for events. Expression of temporal scope is enabled by *Temporal-marker* tags such as `Duration` and `Delay`. Temporal scope allows tools to detect everything that is happening at any point in time, not just at the marked events.

For more complex temporal interactions, the `Onset`, `Offset`, and `Inset` tags together with the `Definition` tag allow simple HED annotations to encode complex, interleaved event processes.

See [**Temporal scope**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html#temporal-scope) for the rules and usage.

<p></p>

- **Conditions and experimental design**: HED allows users to express annotate experiment design, as well as other information such as task, and the experiment's temporal organization. See [**HED conditions and design matrices**](./HedConditionsAndDesignMatrices.md).

The [**Advanced annotation**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html) chapter of the HED specification explains the rules for using these more advanced concepts.

(checking-correctness-anchor)=

### Checking correctness

Checking for errors is an ongoing and iterative process. It is much easier to build more complex annotations on a foundation of valid annotations. Thus, as you are adding HED annotations, you should frequently revalidate.

(validating-hed-annotations-anchor)=

#### Validating HED annotations

- The [**HED validation guide**](./HedValidationGuide.md) describes the different types of validators available.

<p></p>

- The [**HED errors**](https://www.hedtags.org/hed-specification/Appendix_B.html) documentation lists the different types of HED errors and their potential causes.

<p></p>

- The JSON sidecar, which usually contains most of the HED annotations, can be easily validated using the [**HED online tools**](https://hedtools.org/hed/).

<p></p>

- You should validate the HED annotations separately using the online tools or the HED Python tools before doing a full BIDS validation, as this will make the validation process much simpler.

(checking-for-consistency-anchor)=

#### Checking for consistency

Several HED summary tools allow you to check consistency. The [**Understanding the data**](./HowCanYouUseHed.md#understanding-the-data) tutorial in the next section describes some tools that are available to help check the contents of the events files for surprises.

The summary tools are a start, but there are also experiment-specific aspects which ideally should be checked. Bad trial identification is a typical example of experiment-specific checking.

```{admonition} Example of experiment-specific checking.
---
class: tip
---
Suppose each trial in an experiment should consist of a sequence:

> **stimulus-->key-press-->feedback**

You can expect that there will be situations in which participants
forget to press the key, press the wrong key, press the key multiple times,
or press the key both before and after the feedback.
```

Ideally, a data annotator would provide information in the event file marking unusual things such as these bad trials, since it is easy for downstream users to improperly handle these situations, reducing the accuracy of analysis.

At this time, your only option is to do manual checks or write custom code to detect these types of experiment-specific inconsistencies. However, work is underway to include some standard types of checks in the HED [**HED remodeling tools**](./HedRemodelingTools.md) in future releases.

You may also want to reorganize the event files using the remodeling tools. See the [**Remap columns**](remap-columns-anchor) a discussion above and links to examples of how to reorganize the information in the columns of the event files.

<hr style="border: 3px solid #000080;" />

(as-a-data-analyst-anchor)=

## 📊 As a data analyst

> **Using HED-annotated data for scientific discovery and cross-study analysis**

Whether you are analyzing your own data or using shared data produced by others to answer a scientific question, fully understanding the data and its limitations is essential for accurate and reproducible analysis. HED annotations and tools enable powerful analysis workflows that work consistently across different experiments.

### Challenges for data analysts

````{grid} 2
---
gutter: 2
---
```{grid-item-card} ❌ **Without HED**
:class-header: bg-danger

- Each dataset requires custom code
- Event meanings buried in documentation
- Cannot compare across studies
- Manual data inspection for every analysis
- Difficult to validate assumptions
```

```{grid-item-card} ✅ **With HED**
:class-header: bg-success

- Standardized search across datasets
- Self-documenting event structure
- Automatic design matrix extraction
- Consistent analysis workflows
- Built-in data quality summaries
```
````

**Here are some topics of interest to data analysts:**

- [**Understanding the data**](understanding-the-data-anchor)
  - [**Column value summaries**](column-value-summaries-anchor)
  - [**HED tag summaries**](hed-tag-summaries-anchor)
  - [**Experimental design summaries**](experimental-design-summaries-anchor)
- [**Preparing the data**](preparing-the-data-anchor)
  - [**Data transformation**](data-transformation-anchor)
  - [**Event file restructuring**](event-file-restructuring-anchor)
- [**Analyzing the data**](analyzing-the-data-anchor)
  - [**Factor vectors and selection**](factor-vectors-and-selection-anchor)
  - [**HED search queries**](hed-search-queries-anchor)
  - [**HED analysis in EEGLAB**](hed-analysis-in-eeglab-anchor)
  - [**HED support in other tools**](hed-support-in-other-tools-anchor)

(understanding-the-data-anchor)=

### Understanding the data

Before running any analysis, you need to understand what events are actually present in your data. Most shared datasets have minimal documentation, so HED summary tools help you quickly assess data quality and content without manual inspection.

(column-value-summaries-anchor)=

#### Column value summaries

The [**column value summary**](./HedSummaryGuide.md#column-value-summary) compiles a summary of the values in the various columns of the event files in a dataset.

- Does **not** require HED annotations
- Shows all unique values and their frequencies
- Helps identify missing or unexpected event codes
- Useful for detecting data entry errors

You can generate this summary using the [**HED online tools for debugging**](./HedRemodelingQuickstart.md#online-tools-for-debugging) by uploading a single event file (e.g., a BIDS `_events.tsv`) and its associated JSON sidecar.

(hed-tag-summaries-anchor)=

#### HED tag summaries

The [**HED tag summary**](./HedSummaryGuide.md#hed-tag-summary) creates a summary of the HED tags used to annotate the data.

- Shows what types of events are present
- Works across different event coding schemes
- Enables comparison between datasets
- Requires HED annotations in the dataset

(experimental-design-summaries-anchor)=

#### Experimental design summaries

The [**experimental design summary**](./HedSummaryGuide.md#experimental-design-summary) gives a summary of the condition variables or other structural tags relating to experimental design, task, or temporal layout of the experiment.

- Extracts experimental conditions automatically
- Shows task structure and organization
- Identifies temporal markers (Onset/Offset/Duration)
- Requires HED annotations with condition variables

**Additional resources:**

- The [**HED remodeling quickstart**](./HedRemodelingQuickstart.md) tutorial gives an overview of the remodeling tools and how to use them.
- More detailed information can be found in [**HED remodeling tools**](./HedRemodelingTools.md).
- The [**HED conditions and design matrices**](HedConditionsAndDesignMatrices.md) guide explains how information structure information is encoded in HED and how to interpret the summaries of this information.

(preparing-the-data-anchor)=

### Preparing the data

After understanding your data, you may need to transform or reorganize event files to support your analysis goals.

(data-transformation-anchor)=

#### Data transformation

HED remodeling tools allow you to transform event files without writing custom code:

- **Remap columns**: Reorganize column structure for analysis tools
- **Factor extraction**: Create binary factor vectors for event selection
- **Column merging**: Combine information from multiple columns
- **Value renaming**: Standardize event codes across sessions

(event-file-restructuring-anchor)=

#### Event file restructuring

Common restructuring tasks include:

- Converting wide-format to long-format event files
- Extracting condition variables into separate columns
- Adding computed columns (e.g., reaction times, trial types)
- Filtering events based on criteria

See the [**HED remodeling tools**](./HedRemodelingTools.md) documentation for detailed examples and operation descriptions.

(analyzing-the-data-anchor)=

### Analyzing the data

HED enables powerful, flexible analysis through standardized event selection and design matrix extraction. The key advantage is that HED queries work consistently across different experiments using different event codes.

(factor-vectors-and-selection-anchor)=

#### Factor vectors and selection

The most common analysis application is to select events satisfying particular criteria, and compare some measure on signals containing these events with a control.

HED facilitates this selection through **factor vectors**. A **factor vector** for an event file has the same number of rows as the event file (each row corresponding to an event marker). Factor vectors contain 1's for rows in which a specified criterion is satisfied and 0's otherwise.

**Types of factor operations:**

- **[factor column operation](./HedRemodelingTools.md#factor-column)**: Creates factor vectors based on the unique values in specified columns. Does **not** require HED annotations.

<p></p>

- **[factor HED tags](./HedRemodelingTools.md#factor-hed-tags)**: Creates factor vectors based on a HED tag query. Enables flexible, generalizable event selection.

<p></p>

- **[factor HED type](./HedRemodelingTools.md#factor-hed-type)**: Creates factors based on HED tags representing structural information such as *Condition-variable*, *Task*, or *Temporal-marker*.

(hed-search-queries-anchor)=

#### HED search queries

HED search queries allow you to find events based on their semantic properties rather than specific event codes. This enables:

- **Cross-study analysis**: Same query works on different datasets
- **Flexible criteria**: Complex boolean logic with AND, OR, NOT
- **Hierarchical matching**: Search at any level of tag hierarchy
- **Temporal context**: Find events within ongoing processes

The [**HED search guide**](./HedSearchGuide.md) explains the HED query structure and available search options in detail.

(hed-analysis-in-eeglab-anchor)=

#### HED analysis in EEGLAB

[**EEGLAB**](https://sccn.ucsd.edu/eeglab/index.php), the interactive MATLAB toolbox for EEG/MEG analysis, supports HED through the [**EEGLAB HEDTools plugin**](./HedAndEEGLAB.md).

**Key capabilities:**

- Event search and epoching based on HED queries
- Automated design matrix extraction
- Integration with EEGLAB's analysis pipeline
- Support for both GUI and scripting workflows

**Getting started with HED in EEGLAB:**

The *End-to-end processing of EEG with HED and EEGLAB* book chapter, which can be found at [**https://doi.org/10.1007/978-1-0716-4260-3_6**](https://doi.org/10.1007/978-1-0716-4260-3_6), works through the entire analysis process, including porting the analysis to high performance computing platforms. The site includes sample data to use in running the examples.

(hed-support-in-other-tools-anchor)=

#### HED support in other tools

Work is underway to integrate HED support in other analysis packages:

- **FieldTrip**: Search and epoching integration in development
- **MNE-Python**: Planned support for HED search and summary
- **NEMAR/EEGNET**: Platform integration for large-scale analysis

If you are interested in helping with HED integration in other tools, please email hed.maintainers@gmail.com.

<hr style="border: 3px solid #000080" />

(as-a-tool-developer-anchor)=

## 🛠️ As a tool developer

> **Building software that integrates with HED and expanding the HED ecosystem**

The HED ecosystem relies on tools that read, understand, and incorporate HED as part of analysis. Whether you're adding HED support to existing software or creating new analysis tools, HED provides well-documented APIs and validation libraries to make integration straightforward.

### Challenges for tool developers

````{grid} 2
---
gutter: 2
---
```{grid-item-card} ❌ **Without HED**
:class-header: bg-danger

- Custom event parsing for each dataset
- Hard-coded event interpretations
- Difficult to support multiple studies
- Manual validation of event structure
- Limited cross-tool compatibility
```

```{grid-item-card} ✅ **With HED**
:class-header: bg-success

- Standardized event parsing
- Semantic event interpretation
- Works across any HED-annotated dataset
- Automated validation with clear errors
- Interoperable with HED ecosystem
```
````

**Here are some topics of interest to tool developers:**

- [**Getting started with HED integration**](getting-started-with-integration-anchor)
  - [**Understanding HED schemas**](understanding-hed-schemas-anchor)
  - [**Choosing your platform**](choosing-your-platform-anchor)
- [**Working with HED code bases**](working-with-hed-code-bases-anchor)
  - [**The HED Python code base**](the-hed-python-code-base-anchor)
  - [**The HED JavaScript code base**](the-hed-javascript-code-base-anchor)
  - [**The HED MATLAB code base**](the-hed-matlab-code-base-anchor)
  - [**Web tools and REST services**](web-tools-and-rest-services-anchor)
- [**Contributing to HED development**](contributing-to-hed-development-anchor)
  - [**Reporting issues and feature requests**](reporting-issues-anchor)
  - [**Future development plans**](future-development-plans-anchor)

(getting-started-with-integration-anchor)=

### Getting started with HED integration

Before diving into code, understanding HED's structure and choosing the right platform will save time and ensure your integration follows HED best practices.

(understanding-hed-schemas-anchor)=

#### Understanding HED schemas

HED schemas define the vocabulary available for annotations:

- **HED standard schema**: Contains basic terms common across neuroimaging experiments
- **HED library schemas**: Domain-specific vocabularies (e.g., SCORE for clinical EEG)
- **Schema versions**: Schemas evolve with numbered versions (e.g., 8.3.0)

**Key concepts for developers:**

- **Schema loading**: Most HED tools require a schema version (e.g., 8.4.0) in order to operate. The most recent versions are cached internally so that a given version of the schema is only loaded once.
- **Validation**: Use HED validator libraries rather than implementing your own
- **Short vs long form**: Tags can be written in short form (single tag: e.g., `Face`) or long form (full path to the root of the schema hierarchies: e.g., `Item/Biological-item/Anatomical-item/Body-part/Head/Face`). It is recommend that short form be used in most cases. Tools refer to the applicable schema and expand paths when needed. The long form is needed mostly for search -- searching for `Body-part` should also return more specific annotations such as `Face`.

See [**HED schemas guide**](./HedSchemas.md) for detailed information.

(choosing-your-platform-anchor)=

#### Choosing your platform

HED provides official tools in three languages:

- **Python**: Most comprehensive, includes validation, analysis, and schema development tools
- **JavaScript**: Focuses on validation, used by BIDS validator. A completely browser-based validator allows a complete data directory to be validated
- **MATLAB**: Analysis-focused, integrates with EEGLAB - uses the Python tools underneath.

**Decision guide:**

- **Web applications**: Use JavaScript validator or call REST services
- **Analysis pipelines**: Use Python for maximum flexibility
- **MATLAB workflows**: Use HEDTools plugin or MATLAB wrappers
- **Custom needs**: Consider calling REST services from any language

(working-with-hed-code-bases-anchor)=

### Working with HED code bases

The [**HED standard organization**](https://github.com/hed-standard) maintains open-source code projects in Python, MATLAB, and JavaScript. All repositories welcome contributions and issue reports.

**Core resources:**

- **Project page**: [**https://www.hedtags.org**](https://www.hedtags.org)
- **Documentation**: [**https://www.hedtags.org/hed-resources**](https://www.hedtags.org/hed-resources)
- **Annotated datasets**: [**hed-examples repository**](https://github.com/hed-standard/hed-examples)
- **Schemas**: [**hed-schemas repository**](https://github.com/hed-standard/hed-schemas)

(the-hed-python-code-base-anchor)=

#### Python tools

**Focus**: Core HED technology including validation, analysis, and schema development

**Repository**: [**hed-python**](https://github.com/hed-standard/hed-python) | **Package**: `pip install hedtools`

**Documentation**: [**HED Python tools**](./HedPythonTools.md)

(the-hed-javascript-code-base-anchor)=

#### JavaScript tools

**Focus**: HED validation for web applications and BIDS validator

**Repository**: [**hed-javascript**](https://github.com/hed-standard/hed-javascript) | **Package**: `npm install hed-validator`

**Documentation**: [**HED JavaScript tools**](./HedJavascriptTools.md)

(the-hed-matlab-code-base-anchor)=

#### MATLAB tools

**Focus**: Analysis and annotation with EEGLAB integration

**Repository**: [**hed-matlab**](https://github.com/hed-standard/hed-matlab) | **Installation**: Via EEGLAB plugin manager

**Documentation**: [**HED MATLAB tools**](./HedMatlabTools.md) | [**CTagger GUI**](./CTaggerGuide.md)

(web-tools-and-rest-services-anchor)=

#### Online tools and REST services

**Focus**: Web-based validation, debugging, and programmatic access

**Production**: [**hedtools.org/hed**](https://hedtools.org/hed/) | **Development**: [**hedtools.org/hed_dev**](https://hedtools.org/hed_dev)

**Repository**: [**hed-web**](https://github.com/hed-standard/hed-web)

**Documentation**: [**HED online tools**](./HedOnlineTools.md)

(contributing-to-hed-development-anchor)=

### Contributing to HED development

The HED project welcomes contributions from the community. Whether you're reporting bugs, suggesting features, or contributing code, your input helps improve HED for everyone.

(reporting-issues-anchor)=

#### Reporting issues and feature requests

**Where to report:**

- **Python tools**: [**hed-python/issues**](https://github.com/hed-standard/hed-python/issues)
- **JavaScript tools**: [**hed-javascript/issues**](https://github.com/hed-standard/hed-javascript/issues)
- **MATLAB tools**: [**hed-matlab/issues**](https://github.com/hed-standard/hed-matlab/issues)
- **Schema issues**: [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues)
- **General questions**: [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues)

**Contributing code:**

All HED repositories welcome pull requests. See the CONTRIBUTING.md file in each repository for specific guidelines.

Alternatively, you can email hed.maintainers@gmail.com with questions or suggestions.

(future-development-plans-anchor)=

### Future development plans

The HED community is actively working on expanding HED's capabilities and integration.

**Long-term vision:**

- Develop more sophisticated analysis methods
- Leverage AI to reduce the cognitive burden on users
- Better integrate experimental control software with annotation workflows
- Capture event relationships for complex automated analysis
- Expand library schemas for specialized domains

**Get involved:**

If you have ideas or want to contribute to these efforts, please join the discussion on [**GitHub Discussions**](https://github.com/hed-standard/hed-python/discussions) or email hed.maintainers@gmail.com.

<hr style="border: 3px solid #000080;" />

(as-a-schema-builder-anchor)=

## 🏗️ As a schema builder

> **Extending HED vocabulary to support specialized domains and applications**

HED annotations use terms from a hierarchically structured vocabulary called a HED schema. The **HED standard schema** contains basic terms common across most experiments, while **HED library schemas** extend the vocabulary for specialized domains like clinical EEG, movie annotation, or language studies.

### Challenges for schema builders

````{grid} 2
---
gutter: 2
---
```{grid-item-card} ❌ **Without structured schema development**
:class-header: bg-danger

- Inconsistent terminology across studies
- Duplicate or conflicting terms
- No validation of vocabulary structure
- Difficult to share domain vocabularies
- Hard to maintain backward compatibility
```

```{grid-item-card} ✅ **With HED schema framework**
:class-header: bg-success

- Structured, hierarchical vocabulary
- Automated validation of schema structure
- Version control and compatibility tracking
- Community review process
- Standardized schema attributes and rules
```
````

**Here are some topics of interest to schema developers:**

- [**Exploring existing schemas**](exploring-existing-schemas-anchor)
  - [**Viewing available schemas**](viewing-available-schemas-anchor)
  - [**Understanding schema structure**](understanding-schema-structure-anchor)
- [**Contributing to existing schemas**](contributing-to-existing-schemas-anchor)
  - [**Improving an existing schema**](improving-an-existing-schema-anchor)
  - [**Schema review process**](schema-review-process-anchor)
- [**Creating new schemas**](creating-new-schemas-anchor)
  - [**Creating a new library schema**](creating-a-new-library-schema-anchor)
  - [**Schema development workflow**](schema-development-workflow-anchor)
  - [**Private vocabularies and extensions**](private-vocabularies-and-extensions-anchor)

(exploring-existing-schemas-anchor)=

### Exploring existing schemas

Before proposing changes or creating a new schema, familiarize yourself with existing HED vocabularies to avoid duplication and understand HED's organizational principles.

(viewing-available-schemas-anchor)=

#### Viewing available schemas

**HED standard schema:**

The [**HED Schema Viewer**](https://www.hedtags.org/hed-schema-browser/) provides an interactive view of the HED standard schema, showing:

- Hierarchical tag structure
- Tag descriptions and attributes
- Value classes and unit classes
- Schema version history

**HED library schemas:**

Currently available library schemas include:

- **SCORE**: Clinical EEG annotation vocabulary\
  [**View SCORE schema**](https://www.hedtags.org/hed-schema-browser/?schema=score)

**Under development:**

- Movie annotation library
- Language annotation library

These are not yet available for community comment. Email hed.maintainers@gmail.com for information about participating in ongoing library development efforts.

(understanding-schema-structure-anchor)=

#### Understanding schema structure

HED schemas are XML files with structured elements:

- **Tags**: Hierarchically organized terms (e.g., `Event/Sensory-event`)
- **Attributes**: Properties of tags (e.g., `requireChild`, `unique`, `recommended`)
- **Value classes**: Allowed value types (e.g., `textClass`, `numericClass`)
- **Unit classes**: Measurement units and conversions (e.g., `timeUnits`, `angleUnits`)

**Key principles:**

- **Is-a relationship**: Every tag has an "is-a" relationship with its parents
- **Uniqueness**: Each term must be unique and not redundant with existing terms
- **Self-contained**: Tag descriptions should be understandable without external context

See [**HED schema developer's guide**](https://www.hedtags.org/hed-resources/HedSchemaDevelopersGuide.html) for detailed information on schema structure and design principles.

(contributing-to-existing-schemas-anchor)=

### Contributing to existing schemas

The HED community welcomes suggestions for improving existing schemas. Whether you've found an error, need additional terms, or want to clarify descriptions, your input helps improve HED for everyone.

(improving-an-existing-schema-anchor)=

#### Improving an existing schema

If you see a need for additional terms in an existing schema, post an issue to [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues) on GitHub.

```{admonition} **Proposing changes to HED schemas**
---
class: tip
---
**For new tags, include:**

- The name of the schema (standard or library name)
- Proposed name of the new term
- Brief and informative description of its meaning
- Suggested location in the schema hierarchy
- Explanation of why this term is needed and how it will be used
- Examples of usage in annotations

**For modifications to existing terms:**

- Current term name and location
- Proposed changes (description, attributes, hierarchy)
- Rationale for the change
- Impact on existing annotations (if applicable)

**For schema attributes or structure:**

- Description of the proposed new attribute, value class, or unit class
- Use cases and examples
- How it relates to existing schema features
```

(schema-review-process-anchor)=

#### Schema review process

Schema changes go through a community review process:

1. **Issue posted**: You describe the proposed change on GitHub
2. **Community discussion**: Others comment on the proposal
3. **Refinement**: The proposal is refined based on feedback
4. **Implementation**: Approved changes are implemented in the schema
5. **Version release**: Changes are included in the next schema version

**Important considerations:**

- **Is-a relationship**: New terms must satisfy the "is-a" relationship with parent tags
- **Uniqueness**: Terms must not duplicate existing vocabulary
- **Clarity**: Descriptions should be self-contained and unambiguous
- **Backward compatibility**: Changes should minimize breaking existing annotations

All suggested changes should be reported using the [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues) mechanism on GitHub.

(creating-new-schemas-anchor)=

### Creating new schemas

If your domain requires extensive specialized vocabulary not appropriate for the standard schema, you may want to create a new HED library schema.

(creating-a-new-library-schema-anchor)=

#### Creating a new library schema

Creating a library schema is a collaborative process that requires community engagement.

**Getting started:**

Post an issue on [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues) to start the discussion.

```{admonition} **Proposing a new HED library schema**
---
class: tip
---
**Initial proposal should include:**

- Proposed name for the HED library schema
- Brief description of the library's purpose and scope
- Example use cases and target audience
- List of potential collaborators (GitHub handles)
- Initial thoughts on vocabulary organization
- Relationship to existing HED schemas (what's missing from standard schema)

```

**Requirements:**

- **GitHub account**: All schema development uses GitHub Pull Request mechanism
- **Community engagement**: Willingness to participate in review discussions
- **Documentation**: Commitment to documenting terms clearly
- **Long-term maintenance**: Plan for maintaining the schema over time

(schema-development-workflow-anchor)=

#### Schema development workflow

The schema development process follows these general steps:

1. **Proposal and discussion**: Post issue and gather community feedback
2. **Planning**: Define scope, structure, and initial term list
3. **Initial schema creation**: Develop first version following HED schema rules
4. **Validation**: Use schema validation tools to check structure
5. **Community review**: Gather feedback through GitHub discussions
6. **Iteration**: Refine based on feedback
7. **Release**: Publish to hed-schemas repository

**Essential reading:**

The [**HED schema developer's guide**](https://www.hedtags.org/hed-resources/HedSchemaDevelopersGuide.html) provides comprehensive information on:

- Schema XML structure and syntax
- Attribute definitions and usage
- Value class and unit class design
- Versioning and compatibility
- Testing and validation
- Best practices for schema development

(private-vocabularies-and-extensions-anchor)=

#### Private vocabularies and extensions

**Can I create my own private HED schema?**

While technically possible, **private schemas are not recommended** and have limited tool support.

**Why standardized schemas are preferred:**

- **Tool compatibility**: Many HED tools assume standardized schemas from the [**hed-schemas**](https://github.com/hed-standard/hed-schemas) repository
- **Schema fetching**: Tools automatically fetch/cache official schemas
- **Cross-dataset comparison**: Standardized vocabularies enable meta-analyses
- **Community benefit**: Shared vocabularies benefit the entire research community
- **Long-term maintainability**: Official schemas are maintained by the community

**Alternatives to private schemas:**

- **Propose library schema**: Work with the community to develop a standardized library
- **Extend existing schema**: Suggest additions to standard or library schemas
- **Use definitions**: Create complex concepts using existing vocabulary
- **Temporary extensions**: Use descriptive tags (e.g., `Description/...`) until proper terms are available

**Decision rationale:**

The HED Working Group decided to prioritize standardized schemas after observing that unvetted private vocabularies would compromise HED's ability to enable standardized dataset summaries and cross-study comparisons.

If you have a use case that genuinely requires a private vocabulary, please email hed.maintainers@gmail.com to discuss options.
