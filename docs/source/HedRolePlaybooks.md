(hed-role-playbooks-anchor)=
# HED role playbooks

Use these short, practical playbooks to get work done quickly with HED—without duplicate explanations. Each role lists outcomes, a 3-step workflow, checks, and key resources.

## Experimenter

Outcomes
- Clear logging plan so events are analyzable and reusable
- Pilot-verified event list and timing markers
- Logs that map cleanly to BIDS events files

3-step workflow
1) Decide what to log
   - Stimuli and cues presented to senses
   - Participant actions (responses, eye movements, speech)
   - Control structure (trial/block boundaries, condition changes)
   - Incidental but relevant events (interruptions, calibration)
2) Encode and test
   - Create a concise event code scheme and a mapping table
   - Run a short pilot; verify expected sequences (e.g., stimulus → response → feedback)
3) Prepare for BIDS/HED
   - Export logs to tabular form (future `_events.tsv`)
   - Sketch a HED sidecar template with meaningful levels

Checks
- Do the logs alone tell the story of a trial? If not, add missing markers
- Can you detect “bad trials” from the logs? Add explicit flags if helpful

Resources
- HedRemodelingTools.md (transform logs to event files)
- HedRemodelingQuickstart.md (summaries for debugging logs)
- HedConditionsAndDesignMatrices.md (encode design explicitly)

## Data annotator

Outcomes
- HED-annotated BIDS events with a sidecar that documents meaning
- Early, iterative validation to avoid late surprises

3-step workflow
1) Standardize
   - Organize as BIDS if possible
   - Create a JSON sidecar with human-readable level names
2) Annotate incrementally
   - Start with Event-type and Task-event-role
   - Group stimulus properties: `(Color, Shape, Other-properties)`
   - Add definitions as needed for reusable concepts
3) Validate and summarize
   - Validate sidecar and events early and often (online or API)
   - Run column value, tag, and design summaries to check consistency

Checks
- Each `Sensory-event` has an unambiguous modality
- Grouping expresses relationships (agent–action–object, spatial relations)
- HED schema version declared in `dataset_description.json`

Resources
- BidsAnnotationQuickstart.md
- HedValidationGuide.md
- HedSummaryGuide.md
- HedOnlineTools.md

## Data analyst

Outcomes
- Trustworthy understanding of what’s in the data
- Reproducible extraction of condition vectors and features

3-step workflow
1) Inspect
   - Run column value and tag summaries on a single subject/session
   - Read the sidecar to understand condition variables and definitions
2) Prepare
   - Use remodeling to clean, derive columns, or reorder events
   - Extract condition vectors for modeling (design matrices)
3) Analyze
   - Search events, segment data, build models in your analysis stack

Checks
- Do design summaries match the study description?
- Are responses aligned with the intended stimuli and instructions?
- Are mishaps or excluded trials explicitly marked?

Resources
- HedSummaryGuide.md
- HedRemodelingQuickstart.md, HedRemodelingTools.md
- HedSearchGuide.md
- HedConditionsAndDesignMatrices.md

## Tool developer

Outcomes
- Applications that read, validate, and leverage HED consistently

3-step workflow
1) Choose an API and validator
   - Python, MATLAB, or JavaScript
2) Implement core flows
   - Load schema(s), expand short→long form as needed
   - Validate annotations and sidecars
   - Provide search/selection over tags and groups
3) Add value for your users
   - Helpful error messages grounded in spec rules
   - Visualizations and summaries that surface structure

Checks
- Stable handling of schema versions (standard + library schemas)
- Clear boundaries between “event type” and “task role” semantics

Resources
- HedPythonTools.md, HedMatlabTools.md, HedJavascriptTools.md
- HedSchemas.md, HedSchemaDevelopersGuide.md
- HedValidationGuide.md

## Schema builder

Outcomes
- Domain-specific vocabulary that extends the standard without overlap

3-step workflow
1) Identify the domain gaps
   - Confirm the concept isn’t already in the standard or a library schema
2) Draft your library schema
   - Maintain orthogonality and clear hierarchies
   - Provide definitions and examples
3) Coordinate and validate
   - Community review; follow publishing and versioning conventions

Checks
- New terms fit naturally into the hierarchy
- Names are unambiguous and orthogonal to existing tags

Resources
- HedSchemaDevelopersGuide.md
- HedSchemas.md

---

## How these playbooks fit together

- Experimenters produce logs that make annotation easy
- Data annotators encode meaning with HED and validate early
- Analysts rely on these annotations for robust, reusable results
- Tool developers and schema builders strengthen the ecosystem

Tip: If you’re just starting, read HedGettingStarted.md first, then return here for the focused workflow you need.