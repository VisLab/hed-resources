```{index} single: NWB; annotation
single: annotation; NWB
single: quickstart; NWB annotation
pair: ndx-hed; annotation
pair: Neurodata Without Borders; HED
```

```{eval-rst}
.. meta::
   :description: Step-by-step guide to annotating NWB files with HED (Hierarchical Event Descriptors)
   :keywords: NWB, HED annotation, ndx-hed, Neurodata Without Borders, quickstart, tutorial
```

# NWB annotation quickstart

This tutorial provides a step-by-step guide to adding HED (Hierarchical Event Descriptors) annotations to NWB ([Neurodata Without Borders](https://nwb.org)) files using the **ndx-hed** extension. See [HED annotation quickstart](HedAnnotationQuickstart.md) for guidelines on what annotations to choose.

We assume you have basic familiarity with creating NWB files in Python and focus on the mechanics of adding HED annotations to various NWB data structures. See the [NWB Software overview](https://nwb-overview.readthedocs.io/en/latest/) for information about setting up your NWB software environment.

The examples in this tutorial use the **ndx-hed** extension, which provides three main classes for HED integration in NWB files. These classes work with any NWB `DynamicTable`, making HED annotation flexible across different types of neurophysiology data.

(what-is-nwb-anchor)=

```{index} single: NWB; what is NWB
pair: Neurodata Without Borders; overview
```

## What is NWB?

[Neurodata Without Borders (NWB)](https://www.nwb.org/) is a data standard for organizing neurophysiology data. NWB is used extensively as the data representation for single cell and animal recordings as well as human neuroimaging modalities such as intracranial EEG (IEEG). NWB organizes all of the data from one recording session into a single file.

In contrast to [BIDS (Brain Imaging Data Structure)](https://bids.neuroimaging.io/), which organizes an entire experiment's data across multiple files and directories, NWB focuses on individual recording sessions with all associated metadata, events, and measurements stored together.

(installing-ndx-hed-anchor)=

```{index} single: ndx-hed; installation
pair: NWB extension; installation
```

## Installing ndx-hed

The **ndx-hed** extension for Python can be installed using `pip`:

```bash
pip install -U ndx-hed
```

```{admonition} MATLAB support
The ndx-hed extension for MATLAB is under development and not currently available.
```

(how-hed-works-in-nwb-anchor)=

```{index} single: NWB; how HED works
pair: HED; NWB integration
```

## How HED works in NWB

HED annotations in NWB are integrated through the **ndx-hed** extension, which provides specialized classes that extend standard NWB data structures. The extension adds HED validation at creation time, ensuring annotations are correct before data is saved.

### The three main classes

The **ndx-hed** extension provides three classes for different annotation scenarios:

```{list-table} ndx-hed classes for HED annotation
---
header-rows: 1
name: ndx-hed-classes
---
* - Class
  - Purpose
  - Use cases
* - `HedLabMetaData`
  - HED schema version and definitions
  - **Required** for all HED validation
* - `HedTags`
  - Row-specific HED annotations
  - Any DynamicTable
* - `HedValueVector`
  - Column-wide HED templates
  - Shared annotations with value placeholders (#)
```

### HedLabMetaData (required)

Every NWB file using HED must include a `HedLabMetaData` object specifying the HED schema version. This is added to the NWB file's lab metadata:

```python
from pynwb import NWBFile
from ndx_hed import HedLabMetaData
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
```

```{admonition} HED schema version
We recommend using the latest version of HED (currently 8.4.0). 
See [Understanding HED versions](./UnderstandingHedVersions.md) for details on versioning.
```

(basic-hed-annotation-anchor)=

```{index} single: HedTags; basic usage
pair: NWB; event annotation
```

## Basic HED annotation

The most common use case is adding HED annotations to an events or trials table. This requires:

1. Adding `HedLabMetaData` to the NWB file (shown above)
2. Creating a `HedTags` column in your table
3. Adding rows with HED annotations

### Adding HED to trials table

Here's a complete example of adding HED annotations to the trials table:

```python
from ndx_hed import HedTags

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
    HED="Sensory-event, Visual-presentation, (Experimental-stimulus, Target)"
)

nwbfile.add_trial(
    start_time=1.5,
    stop_time=2.5,
    HED="Agent-action, (Press, Mouse-button), Correct-action"
)
```

Each trial now has a HED annotation describing what happened during that time period. The annotations are validated when the trial is added.

(hed-tags-standalone-anchor)=

```{index} single: HedTags; standalone usage
```

### Creating standalone HedTags

You can also create `HedTags` objects independently before adding them to a table:

```python
from ndx_hed import HedTags

# Create a HedTags vector with 3 annotations
tags = HedTags(
    hed_version='8.4.0',
    data=[
        "Sensory-event, Visual-presentation",
        "Agent-action, Press, Correct-action",
        "Sensory-event, Auditory-presentation"
    ]
)

# Add another annotation
tags.add_row("Agent-action, Press, Incorrect-action")
```

This creates a validated `HedTags` object with 4 elements. Each element is a complete HED string.

(annotation-recipe-for-nwb-anchor)=

```{index} single: annotation; recipe for NWB
pair: event types; annotation
```

## Annotation recipe for NWB events

When annotating NWB events, follow the same principles as general HED annotation. Start by categorizing each event:

```{admonition} Standard event categories
---
class: tip
---
- **Sensory-event**: Stimulus presentation (visual, auditory, etc.)
- **Agent-action**: Participant or subject actions
- **Data-feature**: Computed features or annotations
- **Experiment-control**: Recording control events
- **Experiment-structure**: Block structure, conditions
- **Measurement-event**: Sensor readings, observations
```

See [HED annotation quickstart](HedAnnotationQuickstart.md) for detailed guidelines on selecting appropriate tags for each event type.

### Example: Visual experiment

Here's how you might annotate a simple visual discrimination experiment:

```python
# Add HED column
nwbfile.add_trial_column(
    name="HED",
    col_cls=HedTags,
    data=[],
    description="HED annotations for trial events"
)

# Trial with target stimulus
nwbfile.add_trial(
    start_time=0.0,
    stop_time=1.0,
    stimulus="face",
    response="correct",
    HED="Sensory-event, Visual-presentation, "
        "(Experimental-stimulus, Target, (Face, Image))"
)

# Trial with distractor
nwbfile.add_trial(
    start_time=2.0,
    stop_time=3.0,
    stimulus="house",
    response="correct_rejection",
    HED="Sensory-event, Visual-presentation, "
        "(Experimental-stimulus, Non-target, Distractor, (Building, Image))"
)
```

(integration-with-ndx-events-anchor)=

```{index} single: ndx-events; integration
pair: EventsTable; HED annotation
```

## Integration with ndx-events

The [ndx-events extension](https://github.com/rly/ndx-events) provides specialized data structures for representing event information. HED annotations can be added to any of its table classes:

```{list-table} ndx-events tables that support HED
---
header-rows: 1
name: ndx-events-hed-support
---
* - Table
  - Purpose
  - Analogy
* - `EventsTypesTable`
  - Event type definitions
  - Similar to BIDS events.json
* - `EventsTable`
  - Event instances
  - Similar to BIDS events.tsv
* - `TtlTypesTable`
  - TTL type definitions
  - Hardware trigger types
* - `TtlTable`
  - TTL instances
  - Hardware trigger events
```

### Example with EventsTable

```python
from ndx_events import EventsTable
from ndx_hed import HedTags

# Create events table with HED column
events_table = EventsTable(
    name="task_events",
    description="Task events with HED annotations"
)

# Add HED column
events_table.add_column(
    name="HED",
    col_cls=HedTags,
    description="HED annotations for events"
)

# Add events
events_table.add_row(
    timestamp=0.5,
    label="stimulus_onset",
    HED="Sensory-event, Visual-presentation"
)

events_table.add_row(
    timestamp=1.2,
    label="button_press",
    HED="Agent-action, Press, Correct-action"
)

# Add to NWB file
nwbfile.add_acquisition(events_table)
```

(hed-validation-in-nwb-anchor)=

```{index} single: validation; NWB
pair: HedNWBValidator; validation
```

## HED validation

HED annotations are validated when you create `HedTags` objects, but you can also validate an entire NWB file:

```python
from ndx_hed.utils.hed_nwb_validator import HedNWBValidator

# Create validator with schema version
validator = HedNWBValidator(hed_metadata)

# Validate entire file
issues = validator.validate_file(nwbfile)

if not issues:
    print("✓ All HED annotations are valid!")
else:
    print("Found issues:")
    for issue in issues:
        print(f"  - {issue}")
```

Validation ensures that:

- All HED tags are in the schema
- Tag structure is correct (parentheses, commas)
- Required tags are present
- Value placeholders are used correctly

(bids-to-nwb-conversion-anchor)=

```{index} single: BIDS; conversion to NWB
pair: BIDS events; NWB conversion
```

## Converting BIDS events to NWB

If you have BIDS-formatted event files with HED annotations, you can convert them to NWB format:

```python
from ndx_hed.utils.bids2nwb import extract_meanings, get_events_table
import pandas as pd
import json

# Load BIDS events and sidecar
events_df = pd.read_csv("sub-001_task-faces_events.tsv", sep="\t")
with open("task-faces_events.json") as f:
    sidecar_dict = json.load(f)

# Extract HED annotations
meanings = extract_meanings(sidecar_dict)

# Create NWB EventsTable
events_table = get_events_table(
    "task_events",
    "Face processing task events",
    events_df,
    meanings
)

# Add to NWB file
nwbfile.add_acquisition(events_table)
```

This preserves your HED annotations when migrating from BIDS to NWB format.

(saving-and-reading-anchor)=

```{index} single: NWB; saving files
pair: HED annotations; persistence
```

## Saving and reading NWB files

Once you've added HED annotations, save the NWB file normally:

```python
from pynwb import NWBHDF5IO

# Write file
with NWBHDF5IO("annotated_session.nwb", mode="w") as io:
    io.write(nwbfile)

# Read file back
with NWBHDF5IO("annotated_session.nwb", mode="r") as io:
    nwbfile_in = io.read()
    
    # Access HED annotations
    for trial in nwbfile_in.trials:
        print(f"Trial {trial.id}: {trial.HED}")
```

HED annotations are preserved through the save/load cycle and can be accessed like any other NWB data.

(advanced-usage-anchor)=

```{index} single: HedValueVector; usage
pair: custom definitions; HED
```

## Advanced usage

### Using HedValueVector for templates

For repeated annotations with varying values, use `HedValueVector`:

```python
from ndx_hed import HedValueVector

# Create template with placeholder
response_template = HedValueVector(
    hed_version='8.4.0',
    data=[
        "Agent-action, Press, (Reaction-time/#, Duration/#)",
        "Agent-action, Press, (Reaction-time/#, Duration/#)"
    ],
    description="Response events with reaction time"
)
```

The `#` placeholder gets replaced with actual values during analysis.

### Custom HED definitions

For lab-specific terms, you can add definitions to `HedLabMetaData`:

```python
hed_metadata = HedLabMetaData(
    hed_schema_version="8.4.0",
    hed_definition="(Definition/MyCondition, (Condition-variable/A, Condition-variable/B))"
)
nwbfile.add_lab_meta_data(hed_metadata)
```

Then reference the definition in your annotations:

```python
nwbfile.add_trial(
    start_time=0.0,
    stop_time=1.0,
    HED="Def/MyCondition"
)
```

(additional-resources-anchor)=

```{index} single: resources; NWB and HED
```

## Additional resources

- [HED Integration for NWB](https://www.hedtags.org/ndx-hed/) - Complete API reference and examples
- [HED annotation in NWB user guide](https://www.hedtags.org/hed-resources/HedAnnotationInNWB.html) - Detailed usage guide
- [ndx-hed GitHub repository](https://github.com/hed-standard/ndx-hed) - Source code and examples
- [ndx-events extension](https://github.com/rly/ndx-events) - Event data structures for NWB
- [NWB documentation](https://pynwb.readthedocs.io/) - General NWB usage
- [HED annotation quickstart](HedAnnotationQuickstart.md) - General HED annotation principles
- [BIDS annotation quickstart](BidsAnnotationQuickstart.md) - HED in BIDS format

(next-steps-anchor)=

```{index} single: next steps; NWB annotation
```

## Next steps

After completing this quickstart:

1. **Explore examples**: See the [ndx-hed examples directory](https://github.com/hed-standard/ndx-hed/tree/main/examples) for complete working examples
2. **Learn annotation principles**: Review [HED annotation quickstart](HedAnnotationQuickstart.md) for choosing appropriate tags
3. **Validate your data**: Use [HED validation tools](HedValidationGuide.md) to ensure correctness
4. **Search and analyze**: Learn about [HED search capabilities](HedSearchGuide.md) for finding events
5. **Generate summaries**: Use [HED summaries](HedSummaryGuide.md) to analyze your annotated data
