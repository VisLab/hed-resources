# How can you use HED?

HED (Hierarchical Event Descriptors) serves different needs throughout the research lifecycle. Whether you're collecting data, annotating datasets, or analyzing results, HED provides tools and frameworks to make your work more efficient and your data more valuable.

```{admonition} **New to HED?**
---
class: tip
---
If this is your first time learning about HED, start with the [**Introduction to HED**](IntroductionToHed.md) for basic concepts and quick start paths. This guide provides detailed workflows for each research role.
```

```{admonition} **Choose your path**
---
class: note
---
- **Experimenters:** [Event logging and collection](as-an-experimenter-anchor)
- **Data annotators:** [Annotation workflows](as-a-data-annotator-anchor)
- **Data analysts:** [Search and analysis](as-a-data-analyst-anchor)
- **Tool developers:** [Integration guidance](as-a-tool-developer-anchor)
- **Schema builders:** [Library schema development](as-a-schema-builder-anchor)
```

## Research roles and HED workflows

HED serves researchers in different capacities throughout the data lifecycle. Choose your primary role to find relevant tools and guidance:

````{grid} 2
---
gutter: 3
---
```{grid-item-card} 🧪 **Experimenter**
:class-header: bg-primary
:link: as-an-experimenter-anchor
:link-type: ref

Planning experiments, collecting data with proper event logging, and preparing data for analysis.

**Key needs:** Event logging best practices, data collection standards, log-to-event conversion
```

```{grid-item-card} 📝 **Data annotator**
:class-header: bg-success
:link: as-a-data-annotator-anchor
:link-type: ref

Adding HED annotations to existing datasets, curating data for sharing, BIDS/NWB integration.

**Key needs:** Annotation tools, validation workflows, standardized formats
```

```{grid-item-card} 📊 **Data analyst**
:class-header: bg-info
:link: as-a-data-analyst-anchor
:link-type: ref

Searching and analyzing HED-annotated data, extracting design matrices, cross-study comparisons.

**Key needs:** Search tools, programming APIs, analysis workflows
```

```{grid-item-card} 🛠️ **Tool developer**
:class-header: bg-warning
:link: as-a-tool-developer-anchor
:link-type: ref

Building software that integrates with HED, creating analysis pipelines, extending HED functionality.

**Key needs:** APIs, schema specifications, integration guidelines
```
````

````{grid} 1

```{grid-item-card} 🏗️ **Schema builder**
:class-header: bg-secondary
:link: as-a-schema-builder-anchor
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

### 🎯 Data collection

```{dropdown} **Planning and running experiments**

#### Key questions to address
- What events should be logged during data collection?
- How will experimental design and conditions be recorded?
- How will logs be synchronized with neuroimaging data?
- What participant responses need to be captured?

**Critical principle:** <span style="color:#A00000; font-weight:bold;">Data that isn't recorded is lost forever!</span>

#### Event logging best practices
- Mark ALL events visible to participants (stimuli, cues, instructions, feedback)
- Record participant responses with precise timing
- Include experimental control markers (trial/block boundaries, condition changes)
- Capture incidental events that might affect neural responses
- Plan for pilot testing to identify missing events

#### Example event types to capture:
- **Sensory presentations**: Visual stimuli, auditory cues, tactile feedback
- **Participant actions**: Button presses, eye movements, verbal responses  
- **Experimental control**: Trial starts, condition changes, break periods
- **Environmental events**: Equipment issues, interruptions, calibration
```

### 🔄 Post-processing

`````{dropdown} **Post-processing and data transformation**

After data collection, raw logs need processing before analysis. The [**table-remodeler**](https://www.hedtags.org/table-remodeler) tools help transform experimental logs into analysis-ready event files.

#### Common transformations
1. **Log summarization**: Get overview of collected events
2. **Code expansion**: Convert numeric codes to meaningful categories  
3. **Column restructuring**: Create BIDS-compliant event files
4. **Data validation**: Check for missing or invalid events

Ideally, your experiment control software should be adjusted to produce event files in a tabular format that are suitable for BIDS or NWB. The [**table-remodeler**](https://www.hedtags.org/table-remodeler) allows users to perform these operations effectively. The tools can be run over an entire BIDS dataset using the table remodeler [**command line interface (CLI)**](https://www.hedtags.org/table-remodeler/user_guide.html#using-the-cli) or on a single file using the [**HED online tools**](https://hedtools.org/hed/events) with the *Execute remodel script* action for events. The table-remodeler allows users to assemble a complex list of command to execute but specifying in JSON as illustrated by the following example:

````{admonition} Workflow to summarize column values
---
class: tip
---

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
`````

### 📋 Data sharing

```{dropdown} **Standardizing data format for sharing**

An important aspect of data collection is organizing your data in a standardized format so that analysis tools can read and manipulate the data without special-purpose reformatting code. BIDS and NWB are the most widely-used standards for organizing brain and behavioral data in neuroscience.

#### BIDS (Brain Imaging Data Structure)

[**BIDS**](https://bids.neuroimaging.io/) is a widely used data organization standard for neuroimaging and behavioral data. BIDS focuses on file organization with appropriate experimental metadata.

- **Learn BIDS**: The [**BIDS Starter Kit**](https://bids-standard.github.io/bids-starter-kit/index.html) provides comprehensive introductions
- **File organization**: [**Folders and Files**](https://bids-standard.github.io/bids-starter-kit/folders_and_files/folders.html) explains BIDS directory structure
- **Metadata**: The [**Annotating a BIDS dataset**](https://bids.neuroimaging.io/getting_started/tutorials/annotation.html) tutorial covers required metadata
- **Specification**: See [**BIDS specification**](https://bids-specification.readthedocs.io/en/stable/) for detailed rules
- **Conversion tools**: [**BIDS Tools**](https://bids.neuroimaging.io/tools/index.html) lists available converters

#### HED in BIDS

There are two strategies for incorporating HED annotations in a BIDS dataset:

> **Method 1**: Use a JSON (sidecar) file to hold the annotations (recommended)

> **Method 2**: Annotate each line in each event file using the **HED** column

Method 1 is typical for most annotations. The [**HED online tools**](https://hedtools.org/hed/) generate annotation templates. The [**BIDS annotation quickstart**](https://www.hedtags.org/hed-resources/BidsAnnotationQuickstart.html) walks through this process.

Method 2 is usually used for instrument-generated annotations or manual marking (bad sections, special features).

When using HED in BIDS, specify HED schema versions in `dataset_description.json` in the dataset root directory. See [**HED schema versions**](https://bids-specification.readthedocs.io/en/stable/appendices/hed.html#hed-schema-versions) for examples.

### HED in NWB (Neurodata Without Borders)

[**NWB**](https://www.nwb.org/) is a data standard for neurophysiology, providing specifications for storing cellular, intracellular, and extracellular physiology data, along with experimental metadata and behavior. A single NWB file holds all session data synchronized to a common timeline.

- **Learn NWB**: [**PyNWB documentation**](https://pynwb.readthedocs.io/) provides tutorials and API references
- **HED extension**: [**ndx-hed extension**](https://www.hedtags.org/ndx-hed/) enables HED integration in NWB files
- **Guide**: [**HED annotation in NWB**](https://www.hedtags.org/hed-resources/HedAnnotationInNWB.html) provides detailed information
- **Examples**: [**ndx-hed examples**](https://github.com/hed-standard/ndx-hed/tree/main/examples) demonstrate real-world usage

HED annotations in NWB use the **ndx-hed** extension with three main classes:

- **HedLabMetaData**: Required for all HED-annotated NWB files; specifies HED schema version
- **HedTags**: Used for row-specific HED annotations in any NWB DynamicTable
- **HedValueVector**: Used for column-wide HED templates with value placeholders

Installation: `pip install -U ndx-hed`

BIDS allows NWB file format for recording sessions within a BIDS-organized experiment. HED is well-integrated into both standards.
```

### Resources for experimenters

- **📚 Guide**: [Actionable event annotation and analysis in fMRI](https://osf.io/93km8/) - Practical guidance with sample data
- **🛠️ Tools**: [Table remodeler](https://www.hedtags.org/table-remodeler) - Transform logs to event files
- **🌐 Online**: [Event processing](https://hedtools.org/hed/events) in the HED online tools - Process files without installation

______________________________________________________________________

(as-a-data-annotator-anchor)=

## 📝 As a data annotator

> **Curating datasets, adding HED annotations, and validating data quality**

You're adding meaningful annotations to event data, ensuring consistency and completeness, and validating that datasets meet quality standards. HED provides tools and workflows to make your data FAIR (Findable, Accessible, Interoperable, Reusable).

### Annotator challenges

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

(basic-background-anchor)=

### 📚 Basic background

```{dropdown} **Getting started resources**

- **Overview**: [**Introduction to HED**](https://www.hedtags.org/hed-resources/IntroductionToHed.html) - Basic concepts and framework
- **Quick start**: [**BIDS annotation quickstart**](./BidsAnnotationQuickstart.md) - Generate annotation templates from your data
- **Annotation guide**: [**HED annotation quickstart**](./HedAnnotationQuickstart.md) - Step-by-step annotation process
- **Best practices**: [**HED annotation semantics**](./HedAnnotationSemantics.md) - Guidelines for meaningful annotations
- **Vocabulary**: [**HED schema browser**](https://www.hedtags.org/hed-schema-browser) - Explore standard and library schema tags
- **Research paper**: [**"Capturing the nature of events..."**](https://www.sciencedirect.com/science/article/pii/S1053811921010387) - Practical examples and best practices
- **Specification**: [**HED specification**](https://www.hedtags.org/hed-specification/) - Complete annotation rules, especially [**Chapter 4: Basic annotation**](https://www.hedtags.org/hed-specification/04_Basic_annotation.html) and [**Chapter 5: Advanced annotation**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html)
```

(adding-hed-annotations-anchor)=

### ✏️ Adding HED annotations

```{dropdown} **Annotation strategies**

This section discusses strategies for adding HED annotations to event data. The primary method for BIDS datasets is using JSON sidecar files. For NWB, annotations are added using the ndx-hed extension classes.

##### Basic annotation workflow

HED annotations come in a variety of levels and complexity. Start simple and incrementally improve annotations:

1. **Generate template**: Use [**HED online tools**](https://hedtools.org/hed/) to create a JSON sidecar template from your event file
2. **Add descriptions**: Replace the template dummy descriptions with actual descriptions.
3. **Add core tags**: Annotate sensory presentations, agent actions, and experimental structure
4. **Validate frequently**: Use the online tools to validate after each addition to catch errors early
5. **Expand gradually**: Add temporal scope, conditions, and definitions as needed

#### Key annotation principles

- **Start with descriptions**: A good description clarifies what information to capture in tags
- **Be specific**: Use the most specific tags that accurately describe events 
- **Include context**: Capture participant actions, stimuli properties, and experimental conditions
- **Beware of semantics**: Follow guidelines in [**HED annotation semantics**](./HedAnnotationSemantics.md)

A proper HED annotation can be translated back into a meaningful sentence.

#### Viewing available tags

The HED vocabulary is hierarchically organized. Use the [**HED schema browser**](https://www.hedtags.org/hed-schema-browser/) to explore standard and library schema tags interactively.

#### Cross-format workflows

For NWB users, you can convert an NWB `Events` table to a BIDS `_events.tsv` file, generate templates, annotate, and transform back. See the [**BIDS to NWB conversion example**](https://github.com/hed-standard/ndx-hed/blob/main/examples/04_bids_conversion.py).

#### Advanced annotation concepts

For complete experimental descriptions, HED supports several advanced features:

- **Definitions**: Define complex, reusable concepts that can be referenced throughout annotations
  - [**Creating definitions**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html#creating-definitions)
  - [**Using definitions**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html#using-definitions)

- **Temporal scope**: Annotate processes extending over time using `Duration`, `Delay`, `Onset`, `Offset`, and `Inset` tags
  - Enables detection of everything happening at any time point
  - Supports complex, interleaved event processes
  - See [**Temporal scope**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html#temporal-scope)

- **Experimental design**: Express conditions, tasks, and temporal organization
  - See [**HED conditions and design matrices**](./HedConditionsAndDesignMatrices.md)
  - Enables automatic design matrix extraction

The [**Advanced annotation**](https://www.hedtags.org/hed-specification/05_Advanced_annotation.html) chapter explains complete rules and usage patterns.
```

(validating-hed-annotations-anchor)=

### ✓ Validating HED annotations

```{dropdown} **Validation workflow and resources**

#### Validation workflow

Checking for errors is an ongoing, iterative process. Build complex annotations on a foundation of valid annotations by validating frequently as you add tags.

#### Validation resources

- **Guide**: [**HED validation guide**](./HedValidationGuide.md) - Different validator types and usage
- **Error reference**: [**HED errors**](https://www.hedtags.org/hed-specification/Appendix_B.html) - Error types and causes
- **Online validation**: [**HED online tools**](https://hedtools.org/hed/) - Validate strings, JSON sidecars, and tabular files easily
- **Python validation**: Use `hedtools` package for programmatic validation

#### Validation strategy

1. **Validate JSON sidecars first**: Contains most annotations; easier to fix than full dataset
2. **Use standalone validation**: Validate HED separately before full BIDS validation
3. **Fix errors incrementally**: Address errors as you build annotations
4. **Validate after changes**: Revalidate whenever you modify annotations

#### Common validation issues

- Misspelled tags
- Improper use of values or units
- Duplicate tags or tag groups (particularly from multiple rows)
- Invalid tag combinations or groupings (`tagGroup` and `topLevelTagGroup`)
- Misunderstanding of how temporal tags such as `onset` are used
```

(checking-for-consistency-anchor)=

### 🔍 Checking for consistency

````{dropdown} **Consistency checking tools and strategies**

#### Consistency checking tools

Beyond syntactic validation, check that annotations are logically consistent and complete.

#### Summary-based checking

- **Column value summary**: Check all unique values in event columns (see [**column value summary**](./HedSummaryGuide.md#column-value-summary))
- **HED tag summary**: Review which event types are annotated (see [**HED tag summary**](./HedSummaryGuide.md#hed-tag-summary))
- **Design summary**: Verify experimental conditions and structure (see [**experimental design summary**](./HedSummaryGuide.md#experimental-design-summary))

These summaries help detect:
- Missing or unexpected event codes
- Incomplete annotations
- Data entry errors
- Inconsistent trial structures

#### Experiment-specific checks

Some consistency issues require domain knowledge:

```{admonition} Example: Trial sequence validation
---
class: tip
---
Suppose each trial should follow: **stimulus → key-press → feedback**

Participants may:
- Forget to press the key
- Press the wrong key
- Press multiple times
- Press before feedback

Annotators should mark these anomalies in the event file so downstream analysis handles them correctly.
```

#### Checking strategies

- Use summary tools to identify anomalies
- Write custom code for experiment-specific checks (work underway to add standard checks to [**table-remodeler**](https://www.hedtags.org/table-remodeler))
- Mark bad trials or unusual events explicitly
- Consider reorganizing event files using remodeling tools (see [**Remap columns**](https://www.hedtags.org/table-remodeler/operations_reference.html#remap-columns))
````

### Resources for data annotators:

- **📚 Guides**: [**HED annotation quickstart**](./HedAnnotationQuickstart.md), [**BIDS annotation quickstart**](./BidsAnnotationQuickstart.md)
- **🛠️ Tools**: [**HED online tools**](https://hedtools.org/hed/) - Validation, templates, and conversion
- **🌐 Browser**: [**HED schema browser**](https://www.hedtags.org/hed-schema-browser) - Explore available vocabularies
- **📖 Paper**: [**"Capturing the nature of events..."**](https://www.sciencedirect.com/science/article/pii/S1053811921010387) - Annotation best practices

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

(understanding-the-data-anchor)=

### 📊 Understanding the data

```{dropdown} **Data quality and content assessment**

Before running any analysis, you need to understand what events are actually present in your data. Most shared datasets have minimal documentation, so HED summary tools help you quickly assess data quality and content without manual inspection.

#### Column value summaries

The [**column value summary**](./HedSummaryGuide.md#column-value-summary) compiles a summary of the values in the various columns of the event files in a dataset.

- Does **not** require HED annotations
- Shows all unique values and their frequencies
- Helps identify missing or unexpected event codes
- Useful for detecting data entry errors

You can generate this summary using the [**HED online tools for debugging**](https://www.hedtags.org/table-remodeler/quickstart.html#online-tools-for-debugging-anchor) by uploading a single event file (e.g., a BIDS `_events.tsv`) and its associated JSON sidecar.

#### HED tag summaries

The [**HED tag summary**](./HedSummaryGuide.md#hed-tag-summary) creates a summary of the HED tags used to annotate the data.

- Shows what types of events are present
- Works across different event coding schemes
- Enables comparison between datasets
- Requires HED annotations in the dataset

#### Experimental design summaries

The [**experimental design summary**](./HedSummaryGuide.md#experimental-design-summary) gives a summary of the condition variables or other structural tags relating to experimental design, task, or temporal layout of the experiment.

- Extracts experimental conditions automatically
- Shows task structure and organization
- Identifies temporal markers (Onset/Offset/Duration)
- Requires HED annotations with condition variables

**Additional resources:**

- The [**table-remodeler**](https://www.hedtags.org/table-remodeler) documentation gives an overview of the remodeling tools and how to use them.
- The [**HED conditions and design matrices**](HedConditionsAndDesignMatrices.md) guide explains how information structure information is encoded in HED and how to interpret the summaries of this information.
```

(preparing-the-data-anchor)=

### 🛠️ Preparing the data

```{dropdown} **Data transformation and restructuring**

After understanding your data, you may need to transform or reorganize event files to support your analysis goals.

#### Data transformation

HED remodeling tools allow you to transform event files without writing custom code:

- **Remap columns**: Reorganize column structure for analysis tools
- **Factor extraction**: Create binary factor vectors for event selection
- **Column merging**: Combine information from multiple columns
- **Value renaming**: Standardize event codes across sessions

#### Event file restructuring

Common restructuring tasks include:

- Converting wide-format to long-format event files
- Extracting condition variables into separate columns
- Adding computed columns (e.g., reaction times, trial types)
- Filtering events based on criteria

See the [**table-remodeler**](https://www.hedtags.org/table-remodeler) documentation for detailed examples and operation descriptions.
```

(analyzing-the-data-anchor)=

### 📈 Analyzing the data

```{dropdown} **Event selection and analysis workflows**

HED enables powerful, flexible analysis through standardized event selection and design matrix extraction. The key advantage is that HED queries work consistently across different experiments using different event codes.

#### Factor vectors and selection

The most common analysis application is to select events satisfying particular criteria, and compare some measure on signals containing these events with a control.

HED facilitates this selection through **factor vectors**. A **factor vector** for an event file has the same number of rows as the event file (each row corresponding to an event marker). Factor vectors contain 1's for rows in which a specified criterion is satisfied and 0's otherwise.

**Types of factor operations:**

- **[factor column operation](https://www.hedtags.org/table-remodeler/operations_reference.html#factor-column)**: Creates factor vectors based on the unique values in specified columns. This operation **not** require HED annotations.

<p></p>

- **[factor HED tags](https://www.hedtags.org/table-remodeler/operations_reference.html#factor-hed-tags)**: Creates factor vectors based on a HED tag query. Enables flexible, generalizable event selection.

<p></p>

- **[factor HED type](https://www.hedtags.org/table-remodeler/operations_reference.html#factor-hed-type)**: Creates factors based on HED tags representing structural information such as *Condition-variable*, *Task*, or *Temporal-marker*.

#### HED search queries

HED search queries allow you to find events based on their semantic properties rather than specific event codes. This enables:

- **Cross-study analysis**: Same query works on different datasets
- **Flexible criteria**: Complex boolean logic with AND, OR, NOT
- **Hierarchical matching**: Search at any level of tag hierarchy
- **Temporal context**: Find events within ongoing processes

The [**HED search guide**](./HedSearchGuide.md) explains the HED query structure and available search options in detail.

#### HED analysis in EEGLAB

[**EEGLAB**](https://sccn.ucsd.edu/eeglab/index.php), the interactive MATLAB toolbox for EEG/MEG analysis, supports HED through the [**EEGLAB HEDTools plugin**](https://www.hedtags.org/CTagger/ctagger_in_eeglab.html).

**Key capabilities:**

- Event search and epoching based on HED queries
- Automated design matrix extraction
- Integration with EEGLAB's analysis pipeline
- Support for both GUI and scripting workflows

**Getting started with HED in EEGLAB:**

The *End-to-end processing of EEG with HED and EEGLAB* book chapter, which can be found at [**https://doi.org/10.1007/978-1-0716-4260-3_6**](https://doi.org/10.1007/978-1-0716-4260-3_6), works through the entire analysis process, including porting the analysis to high performance computing platforms. The site includes sample data to use in running the examples.

#### HED support in other tools

Work is underway to integrate HED support in other analysis packages:

- **FieldTrip**: Search and epoching integration in development
- **MNE-Python**: Planned support for HED search and summary
- **NEMAR/EEGNET**: Platform integration for large-scale analysis

If you are interested in helping with HED integration in other tools, please email hed.maintainers@gmail.com.
```

### Resources for data analysts

- **📚 Guides**: [**HED search guide**](./HedSearchGuide.md), [**HED summary guide**](./HedSummaryGuide.md), [**HED conditions and design matrices**](./HedConditionsAndDesignMatrices.md)
- **🛠️ Tools**: [**Table remodeler**](https://www.hedtags.org/table-remodeler) - Transform and analyze event files
- **🧪 EEGLAB**: [**HED and EEGLAB**](https://www.hedtags.org/CTagger/ctagger_in_eeglab.html) - HED integration in EEGLAB
- **📖 Book chapter**: [**End-to-end EEG processing**](https://doi.org/10.1007/978-1-0716-4260-3_6) - Complete analysis workflow

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

(getting-started-with-integration-anchor)=

### 🚀 Getting started with HEDTools

```{dropdown} **Understanding HED structure and choosing your platform**

Before diving into code, understanding HED's structure and choosing the right platform will save time and ensure your integration follows HED best practices.

#### Understanding HED schemas

HED schemas define the vocabulary available for annotations:

- **HED standard schema**: Contains basic terms common across neuroimaging experiments
- **HED library schemas**: Domain-specific vocabularies (e.g., SCORE for clinical EEG)
- **Schema versions**: Schemas evolve with numbered versions (e.g., 8.3.0)

####Key concepts for developers

- **Schema loading**: Most HED tools require a schema version (e.g., 8.4.0) in order to operate. The most recent versions are cached internally so that a given version of the schema is only loaded once.
- **Validation**: Use HED validator libraries rather than implementing your own
- **Short vs long form**: Tags can be written in short form (single tag: e.g., `Face`) or long form (full path to the root of the schema hierarchies: e.g., `Item/Biological-item/Anatomical-item/Body-part/Head/Face`). Tools should be able to handle all forms, including intermediate partial paths. Rely on the HED tools to transform when needed. The long form is needed mostly for search -- searching for `Body-part` should also return more specific annotations such as `Face`.

See [**HED schemas**](./HedSchemas.md) guide for detailed information about the HED schemas.

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

**Note**: HED REST services are available at [**HED online tools**](https://hedtools.org/hed).
```

(working-with-hed-code-bases-anchor)=

### 💻 Working with code bases

```{dropdown} **Open-source HED implementations and tools**

The GitHub [**HED standard**](https://github.com/hed-standard) organization maintains open-source code projects in Python, MATLAB, and JavaScript. All repositories welcome contributions, issue reports, and pull requests.

#### Core resources

- **Project page**: [**https://www.hedtags.org**](https://www.hedtags.org)
- **Documentation**: [**https://www.hedtags.org/hed-resources**](https://www.hedtags.org/hed-resources)
- **Annotated datasets**: [**hed-examples**](https://github.com/hed-standard/hed-examples) repository
- **Schemas**: [**hed-schemas**](https://github.com/hed-standard/hed-schemas) repository

#### Python HEDTools

**Focus**: Core HED technology including validation, analysis, and schema development

- **Repository**: [**hed-python**](https://github.com/hed-standard/hed-python) - **Package installation**: `pip install hedtools`
- **Documentation**: [**HED Python tools**](https://www.hedtags.org/hed-python)

#### JavaScript HEDTools

**Focus**: HED validation for web applications and BIDS validator

- **Repository**: [**hed-javascript**](https://github.com/hed-standard/hed-javascript)
- **Package installation**: `npm install hed-validator`
- **Documentation**: [**HED JavaScript tools**](https://www.hedtags.org/hed-javascript) -- includes browser-based HED validator for BIDS

#### MATLAB HEDTools

**Focus**: Analysis, annotation, and validation with EEGLAB integration

- **Repository**: [**hed-matlab**](https://github.com/hed-standard/hed-matlab) - **Installation**: Via EEGLAB plugin manager
- **Documentation**: [**HED MATLAB tools**](https://wwww/hedtags.org/hed-matlab)
- [**CTagger**](https://www.hedtags.org/CTagger) - a standalone annotation Java-based annotation tool with an EEGLAB plugin available.

#### Online tools and REST services

**Focus**: Web-based validation, debugging, and programmatic access

- **Production**: [**hedtools.org/hed**](https://hedtools.org/hed/)
- **Development**: [**hedtools.org/hed_dev**](https://hedtools.org/hed_dev)
- **Repository**: [**hed-web**](https://github.com/hed-standard/hed-web)
- **Documentation**: [**HED online tools**](https://www.hedtags.org/hed-web)
```

(contributing-to-hed-development-anchor)=

### 🤝 Contributing to HED development

The HED project welcomes contributions from the community. Whether you're reporting bugs, suggesting features, or contributing code, your input helps improve HED for everyone.

**Where to report:**

- **General questions**: [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues)
- **Python HEDTools**: [**hed-python/issues**](https://github.com/hed-standard/hed-python/issues)
- **JavaScript HEDTools**: [**hed-javascript/issues**](https://github.com/hed-standard/hed-javascript/issues)
- **MATLAB HEDTools**: [**hed-matlab/issues**](https://github.com/hed-standard/hed-matlab/issues)
- **Schema issues**: [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues)

#### Contributing code

All HED repositories welcome pull requests. See the CONTRIBUTING.md file in each repository for specific guidelines. If you have ideas or want to contribute to these efforts, please post an issue or email [**hed.maintainers@gmail.com**](mailto:hed.maintainers@gmail.com).

#### Long-term vision

The HED community is actively working on expanding HED's capabilities and integration:

- Develop more sophisticated analysis methods
- Leverage AI to reduce the cognitive burden on users
- Better integrate experimental control software with annotation workflows
- Capture event relationships for complex automated analysis
- Expand library schemas for specialized domains

### 📚 Resources for tool developers

- **🔧 Code repositories**: [**hed-python**](https://github.com/hed-standard/hed-python), [**hed-javascript**](https://github.com/hed-standard/hed-javascript), [**hed-matlab**](https://github.com/hed-standard/hed-matlab)
- **📖 Documentation**: [**Python tools**](https://www.hedtags.org/hed-python), [**JavaScript tools**](https://www.hedtags.org/hed-javascript), [**MATLAB tools**](https://www.hedtags.org/hed-matlab)
- **🌐 Online tools**: [**hedtools.org**](https://hedtools.org/hed) - REST services and web validation
- **📋 Schemas**: [**hed-schemas**](https://github.com/hed-standard/hed-schemas) - Standard and library schemas
- **💬 Support**: [**GitHub Discussions**](https://github.com/hed-standard/hed-python/discussions) or email hed.maintainers@gmail.com

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
```{grid-item-card} ❌ **Without structured schemas**
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

(exploring-existing-schemas-anchor)=

### 🔍 Exploring existing schemas

```{dropdown} **Understanding existing HED vocabularies**

Before proposing changes or creating a new schema, familiarize yourself with existing HED vocabularies to avoid duplication and understand HED's organizational principles.

#### Viewing available schemas

The [**HED schema browser**](https://www.hedtags.org/hed-schema-browser/) provides an interactive view of the HED standard schema, showing:

- Hierarchical tag structure
- Tag descriptions and attributes
- Value classes and unit classes
- Schema version history

All of the versions and prereleases of the schemas are available through the viewer.

| Schema<br>version | Type     | Description                                                        | Status     |
| ----------------- | -------- | ------------------------------------------------------------------ | ---------- |
| 8.4.0             | standard | Basic infrastructure and vocabulary needed to annotate experiments | released   |
| score_2.1.0       | library  | Clinical EEG annotation vocabulary                                 | released   |
| lang_1.1.0        | library  | Language stimulation annotations                                   | released   |
| slam_1.0.0        | library  | Sensor positions vocabulary for EMG                                | prerelease |
| mouse_1.0.0       | library  | Annotations for mouse experiments                                  | prerelease |
| media             | Library  | Tags for annotating images and video                               | proposed   |

#### Understanding schema structure

HED schemas have structured elements including:

- **Tags**: Hierarchically organized terms (e.g., `Sensory-event`)
- **Attributes**: Properties of tags (e.g., `relatedTag`, `reserved`, `topLevelTagGroup`)
- **Value classes**: Allowed value types (e.g., `textClass`, `numericClass`)
- **Unit classes**: Measurement units and conversions (e.g., `timeUnits`, `angleUnits`)

Tags are the main elements of interest. The tags have attributes that specify behavior. For example the `topLevelTagGroup` specifies that this tag is a special tag that can only appear inside parentheses at the top level of an annotation. The `Definition` tag is a special tag in the standard schema that has both the `reserved` and the `topLevelTagGroup` attributes.

The value classes and unit classes are mainly relevant for tags that take values. These tags have a `#` placeholder in the schema hierarchy, indicating that they can be specified with a value. For example, the `Temperature` tag's `#` child has the `numeric` value class and the `temperatureUnits` unit class, allowing annotations such as `Temperature/32 oC`.

**Key principles:**

- **Is-a relationship**: Every tag has an "is-a" relationship with its parents
- **Uniqueness**: Each term must be unique and not redundant with existing terms
- **Self-contained**: Tag descriptions should be understandable without external context

See the [**HED specification**](https://www.hedtags.org/hed-specification) for the rules that govern HED tag syntax and usage. See HED schema [**developer guide**](https://www.hedtags.org/hed-schemas/developer_guide.html) for detailed information on schema structure and design principles.
```

(contributing-to-existing-schemas-anchor)=

### ✏️ Contributing to existing schemas

````{dropdown} **Proposing improvements to HED schemas**

The HED community welcomes suggestions for improving existing schemas. Whether you've found an error, need additional terms, or want to clarify descriptions, your input helps improve HED for everyone.

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
````

(creating-new-schemas-anchor)=

### 🏛️ Creating new schemas

````{dropdown} **Developing new HED library schemas**

If your domain requires extensive specialized vocabulary not appropriate for the standard schema, you may want to create a new HED library schema.

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

The [**HED specification**](https://www.hedtags.org/hed-specification) is the definitive source for the syntax and rules of HED. If you are interested in developing The HED schema [**developer's guide**](https://www.hedtags.org/hed-schemas/developer_guide.html) provides comprehensive information on:

- Schema XML structure and syntax
- Attribute definitions and usage
- Value class and unit class design
- Versioning and compatibility
- Testing and validation
- Best practices for schema development

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

If you have a use case that genuinely requires a private vocabulary, please email [**hed.maintainers@gmail.com**](mailto:hed.maintainers@gmail.com) to discuss options.
````

### Resources for schema developers

- **🌐 Schema browser**: [**HED schema browser**](https://www.hedtags.org/hed-schema-browser/) - Interactive schema viewer
- **📖 Documentation**: [**HED specification**](https://www.hedtags.org/hed-specification), [**Schema developer's guide**](https://www.hedtags.org/hed-schemas/developer_guide.html)
- **📋 Repository**: [**hed-schemas**](https://github.com/hed-standard/hed-schemas) - All official HED schemas
- **💬 Discussions**: [**hed-schemas/issues**](https://github.com/hed-standard/hed-schemas/issues) - Propose changes or new schemas
- **📧 Contact**: [**hed.maintainers@gmail.com**](mailto:hed.maintainers@gmail.com) - Direct schema questions
