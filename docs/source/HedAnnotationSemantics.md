# HED annotation semantics

This tutorial explains how to create HED annotations that are semantically meaningful, unambiguous, and machine-actionable. Understanding HED annotation semantics is essential for creating annotations that accurately represent what happened during an experiment and can be correctly interpreted by both humans and computers.

## What are HED annotation semantics?

HED annotation semantics refers to the **meaning** conveyed by HED annotations. A HED annotation consists of tags selected from the HED vocabulary (schema), optionally grouped using parentheses, that together describe events, stimuli, actions, and other aspects of an experiment.

The semantic interpretation of a HED annotation depends on:

1. **Which tags are selected** - Each tag has a specific meaning in the HED vocabulary
1. **How tags are grouped** - Parentheses bind tags that describe the same entity or relationship
1. **Where tags are placed** - Top-level vs. nested grouping affects interpretation
1. **The context of use** - Whether the annotation appears in a timeline file vs. descriptor file

```{admonition} Key principle
---
class: tip
---
**A well-formed HED annotation can be translated back into a coherent English description.**

This reversibility principle serves as the fundamental validation test for HED semantics. If you cannot convert a HED string back into a meaningful English sentence, the annotation likely has structural problems.
```

## The reversibility principle

The reversibility principle provides a practical test for whether your HED annotation is semantically correct: Can you translate it back into coherent English?

````{admonition} **Example:** A reversible HED annotation

**HED String:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
((Green, Triangle, Target), (Center-of, Computer-screen))
```

**English Translation:**
"An experimental stimulus that is a sensory event consists of a visual presentation of a green triangle target that appears at the center of the computer screen."

**Why it works:**
- Each group describes a single entity or relationship
- The overall structure tells a coherent story
- `Sensory-event` indicates this is a sensory presentation
- `Experimental-stimulus` indicates the role in the task
- `Visual-presentation` specifies the modality
- `(Green, Triangle, Target)` - grouped properties describe ONE object
- `(Center-of, Computer-screen)` - spatial relationship
- The outer grouping connects the object to its location
````

````{admonition} **Example:** A non-reversible HED annotation

**HED String:**
```
Green, Triangle, Target, Center-of, Visual-presentation, Sensory-event, Computer-screen
```

**Attempted English Translation:**
"Something green, and something triangular, and a target, and a center position, and visual presentation, and a sensory event, and a computer screen."

**Why it fails:**
- Cannot tell if green describes the triangle
- Cannot tell if target refers to the triangle
- Spatial information is disconnected
- The annotation describes seven separate facts rather than one coherent event
- No clear relationship between the components

**Problems:**
- Tags are flat (no grouping), so relationships are lost
- No indication of what is being presented vs. where it is presented
- Missing both Event-type classification and Task-event-role
````

## Semantic grouping rules

Parentheses in HED annotations are not decorative—they carry semantic meaning. Tags within a group are semantically bound and work together to describe one thing. Tags outside the group describe different aspects or entities.
Since HED annotations are unordered, parentheses are key for this binding.

### Rule 1: Group object properties together

Tags describing properties of the same object MUST be grouped together.

````{admonition} **Example:** Object property grouping

**Grouped (correct):**
```
(Red, Circle)
```
**Meaning:** A single object that is both red AND circular.

**Not grouped (ambiguous):**
```
Red, Circle
```
**Possible meanings:**
1. A red circle (most likely interpretation)
2. Something red AND separately something circular (could be two different things)
3. Redness AND circularity as independent properties

**Problem:** Without grouping, we cannot be certain these describe the same object.
````

````{admonition} **Example:** Multiple object properties

**Correct:**
```
(Green, Triangle, Large)
```
**Meaning:** A single object that is green, triangular, and large.

**Incorrect:**
```
Green, Triangle, Large
```
**Problem:** Three properties that may or may not apply to the same object.
````

### Rule 2: Nest agent-action-object

Agent-action-object relationships require nested grouping to show who did what to what.

````{admonition} **Pattern:** Agent-action-object structure

**General Pattern:**
```
Agent-action, ((Agent-tags), (Action-tag, (Object-tags)))
```

**Interpretation:** "The agent performs the action on the object"

**Example:**
```
Agent-action, ((Human-agent, Experiment-participant), (Press, (Left, Mouse-button)))
```

**Translation:** "An action in which the experiment participant (who is human) presses the left mouse button"

**Structure Explanation:**
- `Agent-action` - Event-type classification (top level)
- Outer grouping: Connects agent to action
- Inner group 1: `(Human-agent, Experiment-participant)` - describes WHO
- Inner group 2: `(Press, (Left, Mouse-button))` - describes WHAT action on WHICH object
````

````{admonition} **Example:** Incorrect agent-action structure

**Wrong:**
```
Agent-action, Experiment-participant, Press, Mouse-button
```

**Translation:** "Agent action exists; an experiment participant exists; pressing exists; a mouse button exists"

**Problem:** No grouping indicates WHO did WHAT. The relationships are lost, making the annotation semantically incomplete.
````

### Rule 3: Use curly braces for assembly control

When multiple columns or sources contribute properties of the same entity, curly braces control how they are assembled.

````{admonition} **Example:** Assembly with curly braces

**Scenario:** Events file has color in one column, shape in another

**Incorrect assembly (flat concatenation):**

**Sidecar:**
```json
{
  "event_type": {
    "HED": {
      "visual": "Experimental-stimulus, Sensory-event, Visual-presentation"
    }
  },
  "color": {
    "HED": {
      "red": "Red"
    }
  },
  "shape": {
    "HED": {
      "circle": "Circle"
    }
  }
}
```

**Event Row:**
| event_type | color | shape  |
|------------|-------|--------|
| visual     | red   | circle |

**Assembled Result:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, Red, Circle
```

**Problem:** `Red` and `Circle` are separate top-level tags. Cannot definitively determine they describe the same object.

---

**Correct assembly (with grouping control):**

**Sidecar:**
```json
{
  "event_type": {
    "HED": {
      "visual": "Experimental-stimulus, Sensory-event, Visual-presentation, ({color}, {shape})"
    }
  },
  "color": {
    "HED": {
      "red": "Red"
    }
  },
  "shape": {
    "HED": {
      "circle": "Circle"
    }
  }
}
```

**Assembled Result:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```

**Why it works:** The curly braces `{color}` and `{shape}` are replaced by their annotations within the grouping parentheses, ensuring they are grouped as properties of the same object.
````

### Rule 4: Group Event and Task-event-role

Event classification tags (`Event` and `Task-event-role`) should typically be at the top level or grouped together.

````{admonition} **Pattern:** Placing Event and Task-event-role tags

**Pattern 1: Top-level placement**
```
Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle), (Green, Triangle)
```
**Meaning:** The event is both a sensory event and an experimental stimulus.

A single top-level `Event` tag is assumed to represent an event that
includes all of the rest of the tags in the annotation.
The `Task-event-role` (in this case `Experimental-stimulus`)
and the sensory-modality (in this case `Visual-presentation`) also
apply since there is only one `Event` tag in the annotation.
This is the most common method of annotating events.

---

**Pattern 2: Grouped together (when entire annotation forms one concept)**
```
(Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle))
```
**Meaning:** All aspects describe one unified event. If at the
top level, the outer parentheses are typically omitted as in Pattern 1.

---

**Pattern 3: Multiple events with different roles**
```
(Sensory-event, Cue, Auditory-presentation, Tone), 
(Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle))
```
**Meaning:** Two distinct events - an auditory cue and a visual experimental stimulus.

---


**Pattern 4: Single event with multiple modalities**
```
Sensory-event, Feedback, (Auditory-presentation, Buzz), (Visual-presentation, (Red, Circle))
```
**Meaning:** A single feedback event which consists of simultaneous
presentation of a red circle and a buzz.

````

### Rule 5: Sensory-events should have a sensory-modality.

If the event is a `Sensory-event`, a `Sensory-modality` tag (e.g., `Visual-presentation` or `Auditory-presentation`) SHOULD be be able to be associated unambiguously with what is being presented.

The examples in Rule 4 illustrate the different cases.
In Example 1 (top-level-placement), there is only one `Sensory-event` and
one `Visual-presentation`:

```
Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle), (Green, Triangle)
```

so the assumption is that the event, which is an experimental stimulus consists of a visual
presentation of a red circle and a green triangle.

In an event using multiple sensory modalities, what is being presented should be grouped
with its corresponding modality as in Rule 4 Example 4.

### Rule 6: Use directional pattern for relationships

Tags from the `Relation/` subtree express directional relationships and require specific nested grouping.

````{admonition} **Pattern:** Directional relationship structure

**General pattern:**
```
(A, (Relation-tag, C))
```

**Interpretation:** "A has the relationship (Relation-tag) to C" or "A → C"

**Key ideas:**
- **A** is the source/subject of the relationship
- **Relation-tag** is the directional relationship (from Relation/ subtree)
- **C** is the target/object of the relationship
- The relationship flows from **A** to **C** through the `Relation` tag

**Structure:**
1. Outer parentheses group the entire relationship
2. Inner parentheses group the relation with its target
3. The source appears first in the outer group
````

````{admonition} **Example:** Spatial relationship patterns

**Example 1: To-left-of**
```
((Red, Circle), (To-left-of, (Green, Square)))
```
**Interpretation:** "A red circle is to-left-of a green square"

**Structure:**
- A = `(Red, Circle)` - the source object
- Relation = `To-left-of` - the spatial relationship
- C = `(Green, Square)` - the target object
- Read as: Red circle → To-left-of → Green square

---

**Example 2: Center-of**
```
((White, Cross), (Center-of, Computer-screen))
```
**Interpretation:** "A white cross is at the center-of the computer screen"

**Structure:**
- A = `(White, Cross)` - the positioned object
- Relation = `Center-of` - the spatial relationship
- C = `Computer-screen` - the reference location

---

**Example 3: Complex spatial context in event**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
((Red, Circle), (To-right-of, (Blue, Square)))
```
**Full interpretation:** "An experimental stimulus sensory event with visual presentation where a red circle is to-right-of a blue square"
````

```{admonition} Common Relation tags requiring this structure

**Spatial relations:**
- `To-left-of`, `To-right-of` - horizontal positioning
- `Above`, `Below` - vertical positioning
- `Center-of`, `Edge-of`, `Corner-of` - reference positioning
- `Near`, `Far-from` - distance relations

**Temporal relations:**
- `Before`, `After` - sequential ordering
- `During` - containment in time
- `Synchronous-with` - simultaneous occurrence

**Hierarchical relations:**
- `Part-of` - component relationship
- `Member-of` - membership relationship
- `Contained-in` - inclusion relationship

**Important:** The order matters! `(A, (To-left-of, B))` means "A is to the left of B", which is different from `(B, (To-left-of, A))` which means "B is to the left of A".
```

### Rule 7: Keep independent concepts separate

Tags that describe independent aspects or unrelated concepts should NOT be grouped together.
Don't group tags with no semantic relationship.

```{admonition} Examples of incorrect grouping

- `(Red, Press)` - Color and action are unrelated
- `(Triangle, Mouse-button)` - Stimulus shape and response device are unrelated
- `(Green, Response-time)` - Color and temporal measure are unrelated
```

### Rule 8: Reserved tags have special syntax

The reserved tags have special grouping rules and usage patterns as shown in the following table:

```{list-table}
---
header-rows: 1
widths: 20 40 40
---
* - Tag
  - Example
  - Rules
* - `Definition`
  - `(Definition/Red-triangle, (Sensory-event, Visual-presentation, (Red, Triangle)))`
  - * Allows users to name frequently used strings
    * Can only be defined in sidecars or externally
    * Defining tags are in inner group
* - `Def`
  - `Def/Red-triangle`
  - * Must correspond to definition
    * Used to anchor `Onset`, `Inset`, `Offset`
    * Cannot appear in definitions
* - `Def-expand`
  - `(Def-expand/Red-triangle, (Red, Triangle))`
  - * Must correspond to definition
    * Used to anchor `Onset`, `Inset`, `Offset`
    * Cannot appear in definitions
    * DO NOT USE -- Tools use during processing
* - `Onset`
  - `(Def/Red-triangle, Onset)
  - * Marks the start of an unfolding event
    * Must have a definition anchor
    * Can include an internal tag group
    * Must be in a top-level tag group
    * Event ends when an `Offset` or `Onset` with same definition name is encountered
* - `Offset`
  - `(Def/Red-triangle, Offset)
  - * Marks the end of an unfolding event
    * Must have a definition anchor
    * Must be in a top-level tag group
    * An earlier `Onset` group of same name must have occurred
* - `Inset`
  - `(Def/Red-triangle, (Luminance-contrast/0.5), Inset)
  - * Marks an interesting point during the unfolding of an event process.
    * Must have a definition anchor
    * Can include an internal tag group
    * Must be in a top-level tag group
    * Must be between an `Onset` and the ending time of that event process
* - `Duration`
  - `(Duration/2 s, (Sensory-event, Auditory-presentation, Feedback Buzz))`
  -  * Must be in a top-level tag group
     * Inner tag group defines the event process that starts at that point
     * If used with `Delay`, the event process start is delayed by indicated amount
* - `Delay`
  - `(Delay/0.5 ms, (Sensory-event, Auditory-presentation, Feedback Buzz))`
  - * Must be a top-level tag group
    * Delays the start of the event by the indicated amount
* - `Event-context`
  - `(Event-context, (...), (...))`
  - * Should only be created by tools
    * Must be a top-level tag group
    * Keeps track of ungoing events at intermediate time points
```

## Event classification: Event and Task-event-role

Every event annotation should include BOTH an `Event` tag (what kind of event) and a `Task-event-role` tag (the event's role in the task from the participant's perspective).
The distinction between these two classification systems is fundamental:

- **Event tags** (from `Event/`): Classify the NATURE of what happened

  - `Sensory-event` - Something presented to senses
  - `Agent-action` - An agent performs an action
  - `Data-feature` - Computed or observed feature
  - `Experiment-control` - Structural/control change
  - `Experiment-structure` - Experiment organization marker
  - `Experiment-procedure` - Questionnaire or other measurement
  - `Measurement-event` - Measurement taken

- **Task-event-role tags** (from `Task-event-role/`): Classify the event's ROLE in the experimental task

  - `Experimental-stimulus` - Primary stimulus to respond to
  - `Cue` - Signal about what to expect or do
  - `Participant-response` - Action by participant
  - `Feedback` - Performance information
  - `Instructional` - Task instructions
  - `Warning` - Alert signal
  - `Incidental` - Present but not task-relevant
  - `Task-activity` - Ongoing activity marker
  - `Mishap` - Unplanned occurrence

### Why both are needed

````{admonition} **Example:** Event alone is insufficient

**Annotation with only Event:**
```
Sensory-event, Auditory-presentation, (Tone, Frequency/440 Hz)
```

**Problems:**
- Is this the stimulus to respond to?
- Is it a warning signal?
- Is it feedback about performance?
- Is it just background sound?

We know WHAT happened (auditory sensory event) but not its ROLE in the task.

---

**Complete annotation with Task-event-role:**
```
Sensory-event, Experimental-stimulus, Auditory-presentation, (Tone, Frequency/440 Hz)
```
**Now clear:** "An auditory tone that is the experimental stimulus the participant should respond to"

---

**Alternative role (same event, different meaning):**
```
Sensory-event, Warning, Auditory-presentation, (Tone, Frequency/440 Hz)
```
**Now clear:** "An auditory tone that serves as a warning signal"
````

### Selecting the right Event tag

```{admonition} **Decision guide:** Choosing Event tags

**Question: What is the primary nature of what happened?**

**Use `Sensory-event` when:**
- A stimulus/sensory presentation occurs
- Something becomes available to participant's senses
- Examples: "Image appears", "Tone plays", "Vibration delivered"

**Use `Agent-action` when:**
- An agent performs an action
- Someone or something DOES something
- Examples: "Button pressed", "Eye movement", "Speech utterance"

**Use `Data-feature` when:**
- A computed or observed feature is marked
- Marker added by computation or observation
- Examples: "Blink detected", "Heart rate calculated", "Expert notes distraction"

**Use `Experiment-control` when:**
- Experiment structure or parameters change
- Control system takes action
- Examples: "Block starts", "Difficulty increases", "Recording begins"

**Use `Experiment-procedure` when:**
- Experiment paused to administer something
- Involves the participant, recording may or may not continue
- Examples: "Questionnaire administered", "Mouth swab taken"

**Use `Experiment-structure` when:**
- Organizational boundary or marker
- Trial, block, or condition markers
- Examples: "Trial 5 begins", "Block 2", "Condition A start"

**Use `Measurement-event` when:**
- A measurement is taken
- Instrument reading recorded
- Examples: "Temperature measured", "Pupil size recorded"
```

### Selecting the right Task-event-role

```{admonition} **Decision guide:** Choosing Task-event-role tags

**Question: What is the event's role from the participant's perspective?**

**Use `Experimental-stimulus` when:**
- Primary stimulus participant must detect, identify, or respond to
- The "target" or non-target in an attention experiment
- Example: Oddball target, image in recognition task

**Use `Cue` when:**
- Signal indicates what to expect or do next
- Prepares participant for upcoming event
- Example: Fixation cross before trial, arrow indicating response hand

**Use `Participant-response` when:**
- Event marks an action by the participant
- Usually paired with `Agent-action` event-type
- Example: Button press, eye movement, verbal response

**Use `Feedback` when:**
- Information about participant's performance
- Indicates correct/incorrect, fast/slow, etc.
- Example: "Correct!" message, green checkmark, point total

**Use `Instructional` when:**
- Task instructions or information presented to participant
- Educational or informative content
- Example: "Press left for red, right for green", block instructions

**Use `Warning` when:**
- Alert or warning signal
- Indicates error condition or important alert
- Example: "Too slow!" message when participant is expected to maintain a response rate

**Use `Incidental` when:**
- Present in environment but not task-relevant
- Air
- Example: Standard stimulus in oddball (not target), background noise

**Use `Task-activity` when:**
- Marker of ongoing task activity period
- Indicates participant is engaged in continuous task
- Example: Start of free viewing period, beginning of imagery period

**Use `Mishap` when:**
- Unplanned occurrence affecting experiment
- Equipment failure, environmental disruption
- Example: Stimulus failed to display, unexpected loud noise
```

### Task-action-type and task-stimulus-role

For participant responses, the event should be further modified
by tags from the `Task-action-type/` subtree. These tags
indicate properties such as correctness of the response with respect to a task

Sensory-events that are experimental stimuli should be further modified by tags
from the `Task-stimulus-role/` subtree (e.g., `Distractor`, `Novel`, etc.).
These tags are often related to the psychological effect being elicited by
the stimulus.

### Complete event annotation examples

````{admonition} **Examples:** Combining Event-type and Task-event-role

**Example 1: Target stimulus in oddball task**
```
Sensory-event, Experimental-stimulus, Auditory-presentation, (Tone, Frequency/1000 Hz, Target)
```

---

**Example 2: Standard (non-target) stimulus**
```
Sensory-event, Experimental-stimulus, Auditory-presentation, (Tone, Frequency/500 Hz, Non-target)
```

---

**Example 3: Participant button press**
```
Agent-action, Participant-response, Correct-action, (Experiment-participant, (Press, (Left, Mouse-button)))
```

---

**Example 4: Feedback on correct response**
```
Sensory-event,  Visual-presentation, (Feedback, Positive, (Green, Circle))
```

---

**Example 5: Fixation cue**
```
Sensory-event, Visual-presentation, (Cue, Label/Fixation-point, (White, Cross))
```

---

**Example 6: Task instructions**
```
Sensory-event, Visual-presentation, (Instructional, (Text, Label/Press-left-for-red))
```

---

**Example 7: Environmental noise**
```
Sensory-event, Auditory-presentation, (Mishap, (Environmental-sound, Label/Construction-noise))
```

---

**Example 8: Computed artifact**
```
Data-feature, (Incidental, (Eye-blink, Def/AutoDetected))
```
````

These examples show a single event and the items may or may not be grouped with additional
task role tags as long as the interpretation is unambiguous.

## Decision guidelines for simultaneous events

```{admonition} **Guidelines:** When to use single vs. multiple events

**Use SINGLE sensory event when:**
- ✓ Same modality (e.g., multiple visual objects)
- ✓ Same presentation mechanism (e.g., both on screen)
- ✓ Functionally unified (designed to be perceived together)
- ✓ Semantically related content (e.g., same word in different forms)
- ✓ Analysis treats as single presentation

**Use SEPARATE sensory events when:**
- ✓ Clearly independent sources
- ✓ Not functionally coordinated
- ✓ Different experimental roles (different Task-event-roles)
- ✓ Analysis requires modality separation
- ✓ Could occur independently

**Either approach acceptable when:**
- ≈ Different modalities but coordinated content (e.g., feedback with sound + image)
- ≈ Same semantic content in different forms (e.g., hear + see word)
- ≈ Functionally related but separable components
- ≈ Both interpretations are scientifically valid

**Consistency Principle:** Whatever approach you choose, use it consistently throughout your dataset. Document your decision in the dataset description.
```

## File type semantics

The semantic requirements for HED annotations depend on whether they appear in timeline files (e.g., `events.tsv`) or descriptor files (e.g., `participants.tsv`).

### Timeline files require Event-type tags

Timeline files have timestamps (`onset` column) indicating when things happen. Every annotation in a timeline file MUST include an Event-type tag.

````{admonition} **Example:** Correct timeline file annotation

**File:** `events.tsv`

**Sidecar:**
```json
{
  "event_type": {
    "HED": {
      "visual": "Experimental-stimulus, Sensory-event, Visual-presentation, ({color}, {shape})"
    }
  },
  "color": {
    "HED": {
      "red": "Red"
    }
  },
  "shape": {
    "HED": {
      "circle": "Circle"
    }
  }
}
```

**Event:**
| onset | event_type | color | shape  |
|-------|------------|-------|--------|
| 2.5   | visual     | red   | circle |

**Assembled Result:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```

**Why it's correct:**
- Includes Task-event-role (Experimental-stimulus)
- Includes Event-type (Sensory-event)
- Specifies modality (Visual-presentation)
- Properly groups stimulus properties
````

### Descriptor files prohibit Event-type tags

Descriptor files (e.g., `participants.tsv`, `samples.tsv`) describe properties or characteristics, not events. Event-type tags should NEVER appear in descriptor files.

````{admonition} **Example:** Correct descriptor file annotation

**File:** `participants.tsv`

**Sidecar:**
```json
{
  "age": {
    "HED": "Age/# years"
  },
  "hand": {
    "HED": {
      "right": "Right-handed",
      "left": "Left-handed"
    }
  }
}
```

**Row:**
| participant_id | age | hand  |
|----------------|-----|-------|
| sub-001        | 25  | right |

**Assembled Result:**
```
Age/25 years, Right-handed
```

**Why it's correct:**
- Describes participant properties
- No event classification
- No temporal tags (Onset/Offset)
- Semantically appropriate for descriptor context
````

### Temporal scope tags

Temporal scope tags (`Onset`, `Offset`, `Inset`) are ONLY for timeline files and indicate duration or temporal containment.

````{admonition} **Example:** Using Onset for duration events

**Scenario:** A fixation cross appears and stays on screen for 1.5 seconds

**Sidecar:**
```json
{
  "event_type": {
    "HED": {
      "fixation": "Sensory-event, Visual-presentation, Cue, (Def/Fixation-point, ({Cross-size}), Onset)"
    }
  },
  "cross_size": {
    "HED": "Size/# cm"
  }
}
```

**Event:**
| onset | duration | event_type | cross_size |
|-------|----------|------------| ---------- |
| 0.5   | 1.5      | fixation   | 3          |

**Assembled Result:**
```
Sensory-event, Visual-presentation, Cue, (Def/Fixation-point, (Size/3 cm) Onset)
```
This indicates that a fixation cross was displayed starting at 0
**Why use `Onset`:**
- Event has duration (duration column = 1.5)
- The grouped content under Onset continues for the duration
- Temporal scope is explicit
- Everything within the Onset group persists for 1.5 seconds
- The inner group containing the `({cross_size})` allows each occurrence of the Fixation-point to be specialized.

````

## Progressive complexity examples

To help you build correct annotations, here are progressive examples from simple to complex:

### Level 1: Simple sensory event

````{admonition} **Example 1:** Basic stimulus

**Scenario:** A red circle appears

**Annotation:**
```
Sensory-event, Visual-presentation, (Red, Circle)
```

**Components:**
- Event type: `Sensory-event`
- Modality: `Visual-presentation`
- Stimulus: `(Red, Circle)` - one grouped object

**English:** "A visual sensory event presenting a red circle"
````

### Level 2: With task role

````{admonition} **Example 2:** Adding task context

**Scenario:** A red circle target appears

**Annotation:**
```
Sensory-event, Experimental-stimulus, Visual-presentation, 
(Red, Circle, Target)
```

**Components:**
- Task-event-role: `Experimental-stimulus`
- Event type: `Sensory-event`
- Modality: `Visual-presentation`
- Stimulus: `(Red, Circle)`
- Task context: `Target`

**English:** "An experimental stimulus sensory event presenting a red circle intended as a target"
````

### Level 3: With spatial information

````{admonition} **Example 3:** Adding location

**Scenario:** A red circle target appears on the left of the computer screen

**Annotation:**
```
Sensory-event, Experimental-stimulus, Visual-presentation, 
((Red, Circle, Target), (Left-side-of, Computer-screen))
```

**Components:**
- Task-event-role: `Experimental-stimulus`
- Event type: `Sensory-event`
- Modality: `Visual-presentation`
- Stimulus: `(Red, Circle)`
- Task context: `Target`
- Location: `(Left-side-of, Computer-screen)`

**English:** "An experimental stimulus sensory event presenting a red circle target on the left side of the computer screen"
````

### Level 4: With duration

````{admonition} **Example 4:** Event with duration

**Scenario:** A red circle target appears on the left and stays visible for 2 seconds

**Annotation:**
```
(Duration/2 s, (Experimental-stimulus, Sensory-event, Visual-presentation, 
((Red, Circle, Target), (Left-side-of, Computer-screen))))
```

**Components:**
- Task-event-role: `Experimental-stimulus`
- Event type: `Sensory-event`
- Modality: `Visual-presentation`
- Temporal scope: `Duration/2 s` (has duration)
- Content: Red circle target on left of computer screen (persists for duration)

**English:** "An experimental stimulus sensory event consisting of the presentation of a red circle target on the left
of the computer screen is displayed for 2 secondsw"
````

## Best practices checklist

Use this checklist before finalizing your annotations:

```{admonition} **Checklist:** Creating semantically correct HED annotations
---
class: tip
---
**✓ Grouping**
- [ ] Stimulus properties grouped: `(Red, Circle)` not `Red, Circle`
- [ ] Task context grouped with evidence: `(Intended-effect, Target)`
- [ ] Agent-action uses nested structure: `((agent), (action, object))`
- [ ] Event-type NOT inside property groups (keep at top level)
- [ ] Unrelated concepts NOT grouped together

**✓ Event Classification**
- [ ] Every timeline event has Event-type tag
- [ ] Every timeline event has Task-event-role tag (when applicable)
- [ ] Event-type and Task-event-role at top level or grouped together
- [ ] Sensory-event includes Sensory-modality tag

**✓ File Type**
- [ ] Timeline files: Event-type tag present
- [ ] Descriptor files: NO Event-type tags
- [ ] Timeline files only: Onset/Offset/Inset if needed
- [ ] Descriptor files: NO temporal tags

**✓ Assembly**
- [ ] Curly braces used for complex grouping
- [ ] `#` placeholder for numeric values -- units allowed
- [ ] Column references match actual column names

**✓ Relationships**
- [ ] Directional relations use `(A, (Relation, C))` pattern
- [ ] Spatial relationships clearly indicate source and target
- [ ] Agent-action-object relationships properly nested

**✓ Definitions**
- [ ] Repeated patterns defined once with Definition/DefName
- [ ] Each Definition name is unique
- [ ] Def/DefName used to reference definitions
- [ ] Definitions defined in sidecars or externally

**✓ Validation**
- [ ] All tags exist in HED schema
- [ ] Required children specified
- [ ] Extensions have parent tag in the HED schema
- [ ] Units provided where needed

**✓ Semantics**
- [ ] Annotation translates to coherent English (reversibility test)
- [ ] No ambiguity in interpretation
- [ ] Makes sense in context
- [ ] Consistent structure across similar events

**✓ Style**
- [ ] Consistent capitalization throughout
- [ ] Standard spacing (space after comma)
- [ ] No extra spaces inside parentheses
```

## Summary

Creating semantically correct HED annotations requires understanding:

1. **The reversibility principle** - Your annotations should translate back to coherent English
1. **Semantic grouping rules** - Parentheses bind tags that describe the same entity
1. **Event classification** - Every event should have both Event-type and Task-event-role
1. **File type semantics** - Timeline vs. descriptor files have different requirements
1. **Relationship patterns** - Agent-action-object and directional relationships need specific structures
1. **Assembly control** - Use curly braces to control how multi-column annotations are assembled
1. **Consistency** - Use the same patterns for similar events throughout your dataset

By following these principles and patterns, you create annotations that are not only syntactically valid but also semantically meaningful and machine-actionable, enabling powerful downstream analysis and cross-study comparisons.

For additional information, see:

- [**HED Annotation Quickstart**](./HedAnnotationQuickstart.md) - Practical annotation guide
- [**BIDS Annotation Quickstart**](./BidsAnnotationQuickstart.md) - BIDS integration
- [**HED Schemas**](./HedSchemas.md) - Understanding the HED vocabulary
- [**HED Validation Guide**](./HedValidationGuide.md) - Validating your annotations

Available tools:

- [**HED online tools**](https://hedtools.org/hed) - Fairly complete set of tools for a single tsv and json file.
- [**HED browser-based validation**](https://www.hedtags.org/hed-javascript) - validate an entire BIDS dataset -- all local, no installation
- [**HED extension for NWB**](https://github.com/hed-standard/ndx-hed) - incorporates HED into Neurodata Without Borders datasets.
- [**HED python tools**](https://github.com/hed-standard/hed-python) - comprehensive set of tools for HED in Python.
- [**HED matlab tools**](https://github.com/hed-standard/hed-matlab) - HED interface in MATLAB
