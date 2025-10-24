(introduction-to-hed-anchor)=
# Introduction to HED

**HED (Hierarchical Event Descriptors)** is a framework for annotating events in time-series data using a structured vocabulary. If you're working with EEG, fMRI, or other neuroimaging  or behavioral data, HED helps you describe *what happened* during your experiment in a way that computers can understand and process.

## Why use HED?

````{admonition} **Traditional event annotation problems**
:class: attention

- Event codes like "1", "2", "stimulus_onset" tell you little about what actually happened
- Different studies use different terminology for the same events
- Impossible to search across datasets or compare experiments automatically
- Manual interpretation required for every analysis
````

````{admonition} **HED solutions**
:class: tip

- **Standardized vocabulary**: Everyone uses the same terms for the same concepts
- **Machine-actionable**: Computers can automatically find and analyze events
- **Hierarchical structure**: Supports both simple and detailed annotations
- **Cross-study analysis**: Compare and combine data from different experiments
- **BIDS integration**: Works seamlessly with Brain Imaging Data Structure (BIDS)
- **NWB integration**: Works seamlessly with Neurodata Without Borders (NWB)
````

## What does HED annotation look like?

Instead of cryptic event codes, HED lets you describe events in plain, structured language:

````{admonition} **Example: Simple HED annotation**

**Traditional event marker:** `stimulus_type: 3`

**HED annotation:** `Sensory-event, Experimental-stimulus, Visual-presentation, (Image, Face)`

This tells us: A sensory event occurred involving visual presentation of a face image as part of the experimental protocol.
````

## The HED workflow for researchers

```{mermaid}
flowchart TD
    A["🔬 Your Experiment"] --> B["❌ Cryptic Event Codes<br/>stimulus_type: 1, 2, 3..."]
    B --> C["✨ HED Magic<br/>Add meaningful descriptions"]
    C --> D["✅ Rich Event Annotations<br/>Sensory-event, Visual-presentation, Face"]
    D --> E["� Powerful Analysis<br/>Find patterns across studies"]
    
    style A fill:#e8f5e8,stroke:#4caf50,stroke-width:3px
    style B fill:#ffebee,stroke:#f44336,stroke-width:3px
    style C fill:#fff3e0,stroke:#ff9800,stroke-width:3px
    style D fill:#e8f5e8,stroke:#4caf50,stroke-width:3px
    style E fill:#e1f5fe,stroke:#2196f3,stroke-width:3px
```

**HED transforms meaningless event codes into rich, searchable descriptions that unlock powerful cross-study analysis.**

### What HED gives you:
- **Before HED**: "Event code 3 occurred" → Meaningless without documentation  
- **After HED**: "Visual presentation of a face image as experimental stimulus" → Self-explanatory and searchable

## Who should use HED?

HED serves different roles in the research workflow:

````{grid} 2
:gutter: 3

```{grid-item-card} 🧪 **Experimenters & Data Collectors**
:class-header: bg-light
:margin: 3

Planning experiments and collecting data with proper event annotation from the start.

**What you need:** Basic HED concepts, online validation tools, integration with your data collection platform.
```

```{grid-item-card} 📝 **Data Annotators**
:class-header: bg-light  
:margin: 3

Adding HED annotations to existing datasets, often as part of BIDS curation.

**What you need:** HED annotation skills, online tools, understanding of experimental protocols.
```

```{grid-item-card} 📊 **Data Analysts**
:class-header: bg-light
:margin: 3

Using HED annotations to find, filter, and analyze events across datasets.

**What you need:** HED search tools, programming libraries (Python/MATLAB), analysis workflows.
```

```{grid-item-card} 🛠️ **Tool Developers**  
:class-header: bg-light
:margin: 3

Building software that works with HED-annotated data.

**What you need:** HED APIs, schema specifications, validation libraries.
```
````

## Quick start roadmap

Follow these pathways based on your immediate needs:

````{tab-set}
```{tab-item} I'm New to HED
:sync: new

**Start here if:** You've never used HED before and want to understand the basics.

1. **📖 Learn the concepts** - Read [HED annotation semantics](HedAnnotationSemantics.md) (15 min)
2. **🎯 Try a simple example** - Follow the [HED annotation quickstart](HedAnnotationQuickstart.md) (30 min)  
3. **🔍 Explore the vocabulary** - Browse the [HED Schema Viewer](https://www.hedtags.org/hed-schema-browser/) (10 min)
4. **✅ Validate your first annotation** - Use [HED online tools](./HedValidationGuide.md) (5 min)

**Next steps:** Choose a specific pathway below based on your role.
```

```{tab-item} I Have BIDS Data
:sync: bids

**Start here if:** You have data in BIDS format and want to add HED annotations.

1. **📋 BIDS quickstart** - Follow [BIDS annotation quickstart](BidsAnnotationQuickstart.md) (45 min)
2. **🛠️ Use online tools** - Try the [BIDS annotation tool](HedOnlineTools.md#hed-annotation-tool) (20 min)
3. **✅ Validate your dataset** - Use [HED validation guide](./HedValidationGuide.md) (15 min)

**Need help?** See [BIDS-specific documentation](https://bids-specification.readthedocs.io/en/stable/appendices/hed.html)
```

```{tab-item} I Want to Analyze Data  
:sync: analyze

**Start here if:** You want to search or analyze HED-annotated data.

1. **🔍 Learn searching** - Read [HED search guide](HedSearchGuide.md) (30 min)
2. **🐍 Python tools** - Explore [HED Python tools](HedPythonTools.md) (45 min)
3. **📊 MATLAB tools** - Try [HED MATLAB tools](HedMatlabTools.md) (45 min)  
4. **📈 Analysis workflows** - See [conditions and design matrices](HedConditionsAndDesignMatrices.md) (30 min)

**Advanced:** Learn about [HED remodeling tools](HedRemodelingTools.md) for data transformation.
```

```{tab-item} I'm Developing Tools
:sync: develop

**Start here if:** You're building software that needs to work with HED.

1. **📚 Understand the schema** - Read [HED schemas guide](HedSchemas.md) (20 min)
2. **🔧 Choose your platform:**
   - [Python API](HedPythonTools.md#hed-python-api) (30 min)
   - [MATLAB API](HedMatlabTools.md#hed-matlab-api) (30 min)  
   - [JavaScript tools](HedJavascriptTools.md) (30 min)
3. **✅ Implement validation** - Use [validation examples](./HedValidationGuide.md#programmatic-validation) (45 min)

**Advanced:** Consider [contributing to HED schemas](HedSchemaDevelopersGuide.md).
```
````

## Essential resources

````{grid} 2
:gutter: 3

```{grid-item-card} 🌐 **Online Tools**
:class-header: bg-primary
:link: ./HedValidationGuide.md
:link-type: url

Validate annotations, explore schemas, and learn HED syntax without installing anything.

**Quick access:** [HED validation](./HedValidationGuide.md) • [Schema browser](https://www.hedtags.org/hed-schema-browser/)
```

```{grid-item-card} 📖 **Core Documentation**  
:class-header: bg-success
:link: HedAnnotationQuickstart.md
:link-type: doc

Step-by-step guides for learning HED annotation and validation.

**Start with:** [Annotation quickstart](HedAnnotationQuickstart.md) • [BIDS quickstart](BidsAnnotationQuickstart.md)
```

```{grid-item-card} 🔧 **Programming Tools**
:class-header: bg-info  
:link: HedPythonTools.md
:link-type: doc

APIs and libraries for working with HED in your analysis pipelines.

**Choose your platform:** [Python](HedPythonTools.md) • [MATLAB](HedMatlabTools.md) • [JavaScript](HedJavascriptTools.md)
```

```{grid-item-card} 🤝 **Community Support**
:class-header: bg-warning
:link: https://github.com/hed-standard/hed-python/discussions
:link-type: url

Get help, share experiences, and connect with other HED users.

**Join us:** [GitHub Discussions](https://github.com/hed-standard/hed-python/discussions) • [Specification](https://www.hedtags.org/hed-specification/)
```
````

## Key concepts to understand

Before diving into HED annotation, familiarize yourself with these fundamental concepts:

````{dropdown} **HED Schema - The Vocabulary**
:color: primary

The HED schema is a structured vocabulary organized as a hierarchy. Think of it like a taxonomy:
- **Event** → **Sensory-event** → **Visual-presentation**
- **Item** → **Object** → **Man-made-object** → **Tool**
- **Property** → *Sensory-pproperty** → **Visual-presentation**

You generally tag using short form (`Face`), but tools can automatically expand to long form (`Item/Biological-item/Anatomical-item/Body-part/Head/Face`) for tasks such as searching for all body parts.
````

````{dropdown} **Tags and Grouping**  
:color: info

- **Tags**: Individual terms from the HED schema (`Sensory-event`, `Red`, `Onset`)
- **Groups**: Related tags in parentheses `(Visual-presentation, (Face, Image))`
- **Comma separation**: Different aspects of the same event

Example: `Sensory-event, Experimental-stimulus, (Visual-presentation, (Face, Image))`
````

````{dropdown} **Annotation Levels**
:color: success

- **Basic**: Describe what happened (`Visual-presentation, Face`)
- **Detailed**: Include experimental context (`Experimental-stimulus, Condition-variable/Famous-face`)  
- **Advanced**: Use definitions and temporal scope for complex experiments
````

````{dropdown} **Validation and Tools**
:color: warning

HED provides tools to check your annotations:
- **Online validator**: Check syntax and schema compliance
- **Python/MATLAB libraries**: Integrate validation and analysis into your workflows
- **BIDS validator**: Automatically checks HED in BIDS datasets
````

## Example walkthrough

Let's see HED in action with a simple face recognition experiment:

````{admonition} **Scenario:** Participant views face images and presses buttons
:class: note

**Event 1: Face image appears**
```
Sensory-event, Experimental-stimulus, (Visual-presentation, (Image, Face)), 
Condition-variable/Famous-face
```

**Event 2: Participant presses button**  
```
Agent-action, Participant-response, Correct, (Experiment-participant, (Press, Mouse-button)), 
Condition-variable/Correct-response
```

**What this tells us:**
- Event 1: A sensory event involving visual presentation of a face image, serving as experimental stimulus, with condition "famous face"
- Event 2: The participant performed an action (button press) that represents their response, classified as correct
````

## Common use cases

HED annotations enable powerful analysis capabilities:

- **🔍 Find specific events**: "Show me all incorrect responses to visual stimuli"
- **📊 Extract design matrices**: Automatically generate condition regressors  
- **🔄 Compare across studies**: Use same vocabulary for meta-analyses
- **🧹 Data cleaning**: Identify and handle experimental mishaps
- **📈 Temporal analysis**: Understand sequence and timing of events

## Next steps

Ready to start? Choose your path based on your immediate needs:

````{tab-set}
```{tab-item} 👶 Complete Beginner
:sync: beginner

**New to HED entirely?** Start with the fundamentals:

1. **📖 Learn core concepts** - Read [HED annotation semantics](HedAnnotationSemantics.md) (15 min)
2. **🎯 Try a hands-on example** - Follow [HED annotation quickstart](HedAnnotationQuickstart.md) (30 min)
3. **� Explore the vocabulary** - Browse the [HED Schema Viewer](https://www.hedtags.org/hed-schema-browser/) (10 min)
```

```{tab-item} �🗂️ BIDS Data
:sync: bids

**Have existing BIDS datasets?** Add HED annotations:

1. **📋 BIDS integration** - Follow [BIDS annotation quickstart](BidsAnnotationQuickstart.md) (45 min)
2. **🛠️ Use online tools** - Try the [BIDS annotation tool](HedOnlineTools.md#hed-annotation-tool) (20 min)
3. **✅ Validate everything** - Use [HED validation guide](./HedValidationGuide.md) (15 min)
```

```{tab-item} 📊 Analysis Focus
:sync: analyze

**Want to analyze HED data?** Learn search and analysis:

1. **🔍 Search techniques** - Read [HED search guide](HedSearchGuide.md) (30 min)
2. **🐍 Python workflows** - Explore [HED Python tools](HedPythonTools.md) (45 min)
3. **� Advanced analysis** - See [conditions and design matrices](HedConditionsAndDesignMatrices.md) (30 min)
```

```{tab-item} �🛠️ Tool Building
:sync: develop

**Building HED-aware tools?** Get the technical details:

1. **📚 Schema structure** - Read [HED schemas guide](HedSchemas.md) (20 min)
2. **🔧 APIs and libraries** - Choose [Python](HedPythonTools.md), [MATLAB](HedMatlabTools.md), or [JavaScript](HedJavascriptTools.md) (30 min)
3. **✅ Validation integration** - See [validation examples](./HedValidationGuide.md#programmatic-validation) (45 min)
```
````

## Detailed workflows by research role

This introduction covers the basics, but HED serves different needs throughout the research lifecycle. For detailed guidance specific to your role and situation:

**👉 See [How can you use HED?](HowCanYouUseHed.md)** for comprehensive workflows covering:

- **🧪 Experimenters**: Event logging, data collection, log processing
- **📝 Data Annotators**: BIDS curation, annotation workflows, quality control  
- **📊 Data Analysts**: Search strategies, analysis pipelines, cross-study methods
- **🛠️ Tool Developers**: API integration, schema handling, validation frameworks
- **🏗️ Schema Builders**: Vocabulary development, library schemas, community coordination
