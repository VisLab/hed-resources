(hed-getting-started-anchor)=
# Getting started with HED

HED (Hierarchical Event Descriptors) helps you express what happened during an experiment in clear, structured terms that tools can validate, search, and analyze. This page gives a simple, practical roadmap for your first hour with HED—without overwhelming detail or visual clutter.

## What you’ll get from HED

- Self-documenting event annotations that outlast cryptic codes
- Consistent vocabulary across datasets and labs
- One-click validation in the browser; APIs for Python/MATLAB/JS
- Turn events into design matrices and searchable features
- Built-in support in BIDS and NWB

## Pick your starting point

- I’m new to HED → Read the 15‑minute orientation and do a tiny hands-on task
- I have BIDS data → Add HED via a sidecar template and validate
- I want to analyze data → Summarize events, extract conditions, and search
- I’m building tools → Use the APIs and schema resources directly

Jump to the section that fits, or skim the quick orientation below.

## A 15‑minute orientation

1) What a HED annotation looks like

- Traditional marker: `stimulus_type: 3`
- HED annotation: `Sensory-event, Experimental-stimulus, Visual-presentation, (Image, Face)`

This reads as: “An experimental stimulus sensory event was a visual presentation of a face image.”

2) The reversibility check

If you can translate the HED string back to coherent English, it’s probably semantically well-formed. If not, add grouping parentheses to bind related tags.

3) Two tag families you’ll use most

- Event-type (from `Event/`): What kind of thing happened? e.g., `Sensory-event`, `Agent-action`
- Task-event-role (from `Task-event-role/`): What was its role from the participant’s perspective? e.g., `Experimental-stimulus`, `Participant-response`, `Feedback`

Most events should include one from each family.

## Quick win: validate a HED string online (5 minutes)

- Open the HED online tools: https://hedtools.org/hed/
- Paste a simple HED string, for example:
  - `Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle)`
- Click Validate. Fix any issues the validator reports.

Next: Try one of the guided pathways below.

---

## Pathway 1 — New to HED

Goal: Learn just enough to write and validate simple annotations.

- Read: HedAnnotationSemantics.md (core concepts and grouping) 15 min
- Try: HedAnnotationQuickstart.md (step-by-step) 30 min
- Explore: HED Schema Browser (browse the vocabulary)
- Validate: HedOnlineTools.md (check your strings)

When this feels comfortable, pick Pathway 2 or 3.

## Pathway 2 — I have BIDS data

Goal: Add HED using a JSON sidecar and validate as you go.

- Follow: BidsAnnotationQuickstart.md (template → fill-in → validate)
- Integrate: HedOnlineTools.md#hed-annotation-tool (sidecar authoring)
- Validate early: HedValidationGuide.md (catch issues before full BIDS validation)
- Remember: Specify your HED schema version in `dataset_description.json` (see BIDS appendix on HED)

Common first tasks:
- Map event codes to meaningful levels in the sidecar
- Add top-level Event and Task-event-role tags
- Group stimulus properties: `(Red, Circle)` instead of `Red, Circle`

## Pathway 3 — I want to analyze data

Goal: Understand the data, then extract conditions and features.

- Summarize columns: HedSummaryGuide.md#column-value-summary
- Summarize tags: HedSummaryGuide.md#hed-tag-summary
- Summarize design: HedSummaryGuide.md#experimental-design-summary
- Learn the remodeling tools: HedRemodelingQuickstart.md → HedRemodelingTools.md
- Interpret conditions: HedConditionsAndDesignMatrices.md

Tip: Start with one subject/session. If tag summaries look odd, revisit the sidecar.

## Pathway 4 — I’m building tools

Goal: Work directly with HED schemas and APIs.

- Choose an API: HedPythonTools.md, HedMatlabTools.md, HedJavascriptTools.md
- Understand schemas: HedSchemas.md, HedSchemaDevelopersGuide.md
- Implement validation: HedValidationGuide.md (examples and rules)

---

## Minimal examples you can adapt

- Target stimulus in oddball
  - `Sensory-event, Experimental-stimulus, Auditory-presentation, (Tone, Frequency/1000 Hz, Target)`

- Participant button press
  - `Agent-action, Participant-response, (Experiment-participant, (Press, (Left, Mouse-button)))`

- Feedback after response
  - `Sensory-event, Feedback, Visual-presentation, (Text, Label/Correct)`

- Spatial relation in a visual display
  - `Sensory-event, Experimental-stimulus, Visual-presentation, ((Red, Circle), (To-right-of, (Blue, Square)))`

Use parentheses to bind what belongs together, and include both Event-type and Task-event-role when applicable.

## Common mistakes to avoid

- Flat lists without grouping: `Red, Circle` (ambiguous). Prefer `(Red, Circle)`.
- Missing role: `Sensory-event, Visual-presentation, (Image, Face)` → add `Experimental-stimulus` or another appropriate role.
- Mixing unrelated concepts in a group: `(Red, Press)` combines color and action.
- Under-specified modality: If it’s a `Sensory-event`, pair it with a clear modality like `Visual-presentation` or `Auditory-presentation`.

## Where to get help

- HED online tools: HedOnlineTools.md (validator, schema browser, sidecar tools)
- Community Q&A: https://github.com/hed-standard/hed-python/discussions
- Specification details: https://www.hedtags.org/hed-specification/

This page intentionally avoids heavy styling and custom colors so links remain readable in dark mode. Use it as your launchpad, then jump into the role playbooks for focused workflows.