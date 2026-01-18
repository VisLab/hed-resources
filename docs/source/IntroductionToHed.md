(introduction-to-hed-anchor)=

# Introduction to HED

**HED (Hierarchical Event Descriptors)** is a framework for annotating events in time-series data using a structured vocabulary. HED can also be used to annotate static information such as participant characteristics. If you're working with EEG, fMRI, or other neuroimaging or behavioral data, HED helps you describe *what happened* during your experiment in a way that computers can understand and process.

## What you'll learn

- What HED tags are and how they group into meaningful annotations
- How short-form tags map to long-form schema paths
- Where to start if you are new to HED or using BIDS/NWB

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
- **Reversible**: Good HED annotations can be translated to plain English and vice versa
- **Cross-study analysis**: Allows analysts to compare and combine data from different experiments
- **BIDS integration**: Works seamlessly with Brain Imaging Data Structure ([BIDS](https://bids.neuroimaging.io/index.html))
- **NWB integration**: Works seamlessly with Neurodata Without Borders ([NWB](https://nwb.org/))
```

### Machine interpretable annotations

Instead of cryptic event codes, HED lets you describe events in plain, structured language:

```{admonition} **Example:** Traditional event encoding vs simple HED annotation

**Traditional event marker:** `stimulus_type: 3`

**HED annotation:** `Sensory-event, Experimental-stimulus, Visual-presentation, (Image, Face)`
```

**Interpretation:** An experimental stimulus consisting of an image of a face is presented visually [to a single experiment participant on a computer screen] at the time associated with this annotation.

The portion of the interpretation in square brackets is implied because it has not been annotated to the contrary. The bracketed text is explanatory only and is **not** part of a HED annotation. See [Making HED meaningful](HedAnnotationSemantics.md) for more detail.

### Meaningful across experiments

- **Before HED**: "Event code 3 occurred" → Meaningless without documentation
- **After HED**: "Visual presentation of a face image as experimental stimulus" → Self-explanatory and searchable

### Standardized vocabulary

You can only use terms from the HED vocabulary (**HED schemas**). A HED **standard schema** contains terms generally applicable to all data. Various **HED library schemas** have also been developed for specialized terms in various research fields. These terms have been reviewed and agreed upon by groups of interested researchers. HED is an endorsed standard of the [INCF](https://www.incf.org/).

## Key HED concepts

Before diving into HED annotation, familiarize yourself with these fundamental concepts:

```{dropdown} **HED schemas - the vocabulary**
---
color: primary
---
The HED schema is a structured vocabulary organized as a hierarchy. It is a taxonomy so each child is a more specific version of its parent:
- **Event** → **Sensory-event** 
- **Item** → **Object** → **Man-made-object** → **Device** → **Tool**
- **Property** → **Sensory-property** → **Sensory-presentation** → **Visual-presentation**
- **Item** → **Biological-item** → **Anatomical-item** → **Body-part** → **Head** → **Face**

You should tag using **short form** (`Face`) and let tools automatically expand to **long form** (`Item/Biological-item/Anatomical-item/Body-part/Head/Face`) for tasks such as searching for all body parts.

```

```{dropdown} **Tags and grouping**
---
color: info
---
- **Tags**: Individual terms from the HED schema (e.g., `Sensory-event`, `Red`, `Onset`)
- **Groups**: Items associated with their properties (e.g., `(Face, Image)`)
- **Comma separation**: Separates tags and tag groups
- **Order doesn't matter**: Parentheses determine relationships, not order

**Example:** `Sensory-event, Experimental-stimulus, Visual-presentation, (Face, Image)`
```

```{dropdown} **Annotation levels**
---
color: success
---
- **Basic** describes what happened: `Sensory-event, Visual-presentation, (Face, Image)`
- **Detailed** includes experimental context: `Experimental-stimulus, Condition-variable/Famous-face`
- **Advanced** uses definitions and temporal scope for complex experiments
```

```{dropdown} **Validation tools**
---
color: warning
---
HED provides tools to check your annotations:
- [Online validator](https://hedtools.org/hed): Check syntax and schema compliance
- [Python](https://www.hedtags.org/hed-python) and [MATLAB libraries](https://www.hedtags.org/hed-matlab) libraries: Integrate validation and analysis into your workflows
- [HED validator for BIDS](https://www.hedtags.org/hed-javascript): Automatically checks HED in BIDS datasets
```

## Quick start

For quick hands-on learning, start with the tutorials:

- **New to HED?** Try the [HED annotation quickstart](HedAnnotationQuickstart.md)
- **Have BIDS data?** Follow the [BIDS annotation quickstart](BidsAnnotationQuickstart.md) followed by the [HED annotation quickstart](HedAnnotationQuickstart.md)
- **Need practical guidelines?** Read [Making HED meaningful](HedAnnotationSemantics.md)
- **View available vocabularies**: [HED schema browser](https://www.hedtags.org/hed-schema-browser)

## Next steps

**Ready to start?** Go to [How can you use HED?](HowCanYouUseHed.md) to find role-specific guidance and workflows tailored to your needs:

- [**🧪 Experimenters**](as-an-experimenter-anchor): Event logging, data collection, and log processing
- [**📝 Data annotators**](as-a-data-annotator-anchor): BIDS curation, annotation workflows, and quality control
- [**📊 Data analysts**](as-a-data-analyst-anchor): Search strategies, analysis pipelines, and cross-study methods
- [**🛠️ Tool developers**](as-a-tool-developer-anchor): API integration, schema handling, and validation frameworks
- [**🏗️ Schema builders**](as-a-schema-builder-anchor): Vocabulary development, library schemas, and community coordination
