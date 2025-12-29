(introduction-to-hed-anchor)=

# Introduction to HED

**HED (Hierarchical Event Descriptors)** is a framework for annotating events in time-series data using a structured vocabulary. If you're working with EEG, fMRI, or other neuroimaging or behavioral data, HED helps you describe *what happened* during your experiment in a way that computers can understand and process.

## Why use HED?

```{admonition} **Traditional event annotation problems**
---
class: attention
---
- Event codes like "1", "2", "stimulus_onset" tell you little about what actually happened
- Different studies use different terminology for the same events
- Impossible to search across datasets or compare experiments automatically
- Manual interpretation required for every analysis
```

```{admonition} **HED solutions**
---
class: tip
---
- **Standardized vocabulary**: Everyone uses the same terms for the same concepts
- **Machine-actionable**: Computers can automatically find and analyze events
- **Hierarchical structure**: Supports both simple and detailed annotations
- **Cross-study analysis**: Compare and combine data from different experiments
- **BIDS integration**: Works seamlessly with Brain Imaging Data Structure (BIDS)
- **NWB integration**: Works seamlessly with Neurodata Without Borders (NWB)
```

## What do HED annotations look like?

Instead of cryptic event codes, HED lets you describe events in plain, structured language:

```{admonition} **Example: Simple HED annotation**

**Traditional event marker:** `stimulus_type: 3`

**HED annotation:** `Sensory-event, Experimental-stimulus, Visual-presentation, (Image, Face)`

This tells us: A sensory event occurred involving visual presentation of a face image as part of the experimental protocol.
```

**HED transforms meaningless event codes into rich, searchable descriptions that unlock powerful cross-study analysis.**

### What HED gives you:

- **Before HED**: "Event code 3 occurred" → Meaningless without documentation
- **After HED**: "Visual presentation of a face image as experimental stimulus" → Self-explanatory and searchable

## Quick start

For role-specific guidance and detailed workflows, see [**How can you use HED?**](HowCanYouUseHed.md) to find information tailored to your needs (experimenters, annotators, analysts, developers, or schema builders).

For quick hands-on learning, start with the tutorials:

- **New to HED?** Try the [HED annotation quickstart](HedAnnotationQuickstart.md)
- **Have BIDS data?** Follow the [BIDS annotation quickstart](BidsAnnotationQuickstart.md) followed by the [HED annotation quickstart](HedAnnotationQuickstart.md)
- **Need practical guidelines?** Review the [HED annotation semantics](HedAnnotationSemantics.md)

## Key concepts to understand

Before diving into HED annotation, familiarize yourself with these fundamental concepts:

```{dropdown} **HED schemas - the vocabulary**
---
color: primary
---
The HED schema is a structured vocabulary organized as a hierarchy. Think of it like a taxonomy:
- **Event** → **Sensory-event** 
- **Item** → **Object** → **Man-made-object** → **Device** → **Tool**
- **Property** → **Sensory-property** → **Sensory-presentation** → **Visual-presentation**

You generally tag using short form (`Face`), but tools can automatically expand to long form (`Item/Biological-item/Anatomical-item/Body-part/Head/Face`) for tasks such as searching for all body parts.
```

```{dropdown} **Tags and grouping**
---
color: info
---
- **Tags**: Individual terms from the HED schema (e.g., `Sensory-event`, `Red`, `Onset`)
- **Groups**: Items associated with their properties (e.g., `(Visual-presentation, (Face, Image))`)
- **Comma separation**: Separates tags and tag groups

Example: `Sensory-event, Experimental-stimulus, (Visual-presentation, (Face, Image))`
```

```{dropdown} **Annotation levels**
---
color: success
---
- **Basic**: Describe what happened (`Visual-presentation, Face`)
- **Detailed**: Include experimental context (`Experimental-stimulus, Condition-variable/Famous-face`)  
- **Advanced**: Use definitions and temporal scope for complex experiments
```

```{dropdown} **Validation and tools**
---
color: warning
---
HED provides tools to check your annotations:
- [**Online validator**](https://hedtools.org/hed): Check syntax and schema compliance
- [**Python**](https:/www.hedtags.org/hed-python)/[**MATLAB libraries**](https://www.hedtags.org/hed-matlab) libraries: Integrate validation and analysis into your workflows
- [**HED validator for BIDS**](https://github.com/hed-javascript): Automatically checks HED in BIDS datasets
```

## Next steps

**Ready to start?** Go to [**How can you use HED?**](HowCanYouUseHed.md) to find role-specific guidance and workflows tailored to your needs:

- [**🧪 Experimenters**](as-an-experimenter-anchor): Event logging, data collection, and log processing
- [**📝 Data annotators**](as-a-data-annotator-anchor): BIDS curation, annotation workflows, and quality control
- [**📊 Data analysts**](as-a-data-analyst-anchor): Search strategies, analysis pipelines, and cross-study methods
- [**🛠️ Tool developers**](as-a-tool-developer-anchor): API integration, schema handling, and validation frameworks
- [**🏗️ Schema builders**](as-a-schema-builder-anchor): Vocabulary development, library schemas, and community coordination
