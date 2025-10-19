# HED annotation semantics

This tutorial explains how to create HED annotations that are semantically meaningful, unambiguous, and machine-actionable. Understanding HED annotation semantics is essential for creating annotations that accurately represent what happened during an experiment and can be correctly interpreted by both humans and computers.

## What are HED annotation semantics?

HED annotation semantics refers to the **meaning** conveyed by HED annotations. A HED annotation consists of tags selected from the HED vocabulary (schema), optionally grouped using parentheses, that together describe events, stimuli, actions, and other aspects of an experiment.

The semantic interpretation of a HED annotation depends on:

1. **Which tags are selected** - Each tag has a specific meaning in the HED vocabulary
2. **How tags are grouped** - Parentheses bind tags that describe the same entity or relationship
3. **Where tags are placed** - Top-level vs. nested grouping affects interpretation
4. **The context of use** - Whether the annotation appears in a timeline file vs. descriptor file

````{admonition} Key principle
:class: tip

**A well-formed HED annotation can be translated back into a coherent English description.**

This reversibility principle serves as the fundamental validation test for HED semantics. If you cannot convert a HED string back into a meaningful English sentence, the annotation likely has structural problems.
````

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

### Rule 2: Use nested grouping for agent-action-object

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
  "color": {"HED": {"red": "Red"}},
  "shape": {"HED": {"circle": "Circle"}}
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

**Problem:** Red and Circle are separate top-level tags. Cannot definitively determine they describe the same object.

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
  "color": {"HED": {"red": "Red"}},
  "shape": {"HED": {"circle": "Circle"}}
}
```

**Assembled Result:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```

**Why it works:** The curly braces `{color}` and `{shape}` are replaced by their annotations within the grouping parentheses, ensuring they are grouped as properties of the same object.
````

### Rule 4: Group Event-type and Task-event-role appropriately

Event classification tags (Event-type and Task-event-role) should typically be at the top level or grouped together, but NOT grouped with stimulus properties.

````{admonition} **Pattern:** Placing Event-type and Task-event-role tags

**Pattern 1: Top-level placement (recommended)**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```
**Meaning:** Event is both a sensory event and an experimental stimulus.

---

**Pattern 2: Grouped together (when entire annotation forms one concept)**
```
(Experimental-stimulus, Sensory-event, (Visual-presentation, (Red, Circle)))
```
**Meaning:** All aspects describe one unified event.

---

**Pattern 3: Multiple events with different roles**
```
(Cue, Sensory-event, (Auditory-presentation, Tone)), 
(Experimental-stimulus, Sensory-event, (Visual-presentation, (Red, Circle)))
```
**Meaning:** Two distinct events - an auditory cue and a visual experimental stimulus.

---

**NOT RECOMMENDED:**
```
Sensory-event, Visual-presentation, (Red, Circle, Experimental-stimulus)
```
**Problem:** `Experimental-stimulus` is grouped with stimulus properties, suggesting it's a property of the circle rather than a classification of the event itself.
````

### Rule 5: Group sensory modality with presented content

If the event is a `Sensory-event`, the `Sensory-modality` tag (e.g., `Visual-presentation` or `Auditory-presentation`) SHOULD be associated with the content being presented.

````{admonition} **Example:** Sensory modality grouping

**Example 1: Modality grouped with content (preferred)**
```
Experimental-stimulus, Sensory-event, (Visual-presentation, (Red, Circle))
```
**Meaning:** "An experimental stimulus sensory event consisting of a visual presentation of a red circle"

---

**Example 2: Single modality at top level (acceptable)**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```
**Meaning:** "An experimental stimulus that is a visual sensory event presenting a red circle"

---

**Example 3: Multi-modal feedback**
```
Feedback, Sensory-event, 
(Visual-presentation, (Green, Cross)), 
(Auditory-presentation, (Tone, Frequency/1000 Hz))
```
**Meaning:** "Feedback sensory event with visual presentation of a green cross and auditory presentation of a 1000 Hz tone"

**Structure:**
- `Feedback` - Task-event-role (top level)
- `Sensory-event` - Event-type (top level)
- `(Visual-presentation, (Green, Cross))` - First modality grouped with its content
- `(Auditory-presentation, (Tone, Frequency/1000 Hz))` - Second modality grouped with its content

**Why this structure:** Each modality is explicitly paired with what is presented in that modality, making the annotation unambiguous.
````

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
- A = (Red, Circle) - the source object
- Relation = To-left-of - the spatial relationship
- C = (Green, Square) - the target object
- Read as: Red Circle → To-left-of → Green Square

---

**Example 2: Center-of**
```
((White, Cross), (Center-of, Computer-screen))
```
**Interpretation:** "A white cross is at the center-of the computer screen"

**Structure:**
- A = (White, Cross) - the positioned object
- Relation = Center-of - the spatial relationship
- C = Computer-screen - the reference location

---

**Example 3: Complex spatial context in event**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
((Red, Circle), (To-right-of, (Blue, Square)))
```
**Full interpretation:** "An experimental stimulus sensory event with visual presentation where a red circle is to-right-of a blue square"
````

````{admonition} Common Relation tags requiring this structure

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
````

### Rule 7: Keep independent concepts separate

Tags that describe independent aspects or unrelated concepts should NOT be grouped together.

````{admonition} Separating independent concepts

**Keep separate: Event classifications**

Event-type, Task-event-role, and Sensory-modality tags are high-level classifications that should NOT be grouped at the same level with stimulus properties.

**Incorrect:**
```
(Experimental-stimulus, Sensory-event, Visual-presentation, Red, Circle)
```

**Correct:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```

---

**Keep separate: Unrelated concepts**

Never group tags with no semantic relationship.

**Examples of incorrect grouping:**
- `(Red, Press)` - Color and action are unrelated
- `(Triangle, Mouse-button)` - Stimulus shape and response device are unrelated
- `(Green, Response-time)` - Color and temporal measure are unrelated
````

## Event classification: Event-type and Task-event-role

Every event annotation should include BOTH an Event-type tag (what kind of event) and a Task-event-role tag (the event's role in the task from the participant's perspective).

### Understanding Event-type vs. Task-event-role

The distinction between these two classification systems is fundamental:

- **Event-type tags** (from `Event/`): Classify the NATURE of what happened
  - `Sensory-event` - Something presented to senses
  - `Agent-action` - An agent performs an action
  - `Data-feature` - Computed or observed feature
  - `Experiment-control` - Structural/control change
  - `Experiment-structure` - Experiment organization marker
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

````{admonition} **Example:** Event-type alone is insufficient

**Annotation with only Event-type:**
```
Sensory-event, Auditory-presentation, (Tone, 440 Hz)
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
Experimental-stimulus, Sensory-event, Auditory-presentation, (Tone, 440 Hz)
```
**Now clear:** "An auditory tone that is the experimental stimulus the participant should respond to"

---

**Alternative role (same event, different meaning):**
```
Warning, Sensory-event, Auditory-presentation, (Tone, 440 Hz)
```
**Now clear:** "An auditory tone that serves as a warning signal"
````

### Selecting the right Event-type

````{admonition} **Decision guide:** Choosing Event-type tags

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

**Use `Experiment-structure` when:**
- Organizational boundary or marker
- Trial, block, or condition markers
- Examples: "Trial 5 begins", "Block 2", "Condition A start"

**Use `Measurement-event` when:**
- A measurement is taken
- Instrument reading recorded
- Examples: "Temperature measured", "Pupil size recorded"
````

### Selecting the right Task-event-role

````{admonition} **Decision guide:** Choosing Task-event-role tags

**Question: What is the event's role from the participant's perspective?**

**Use `Experimental-stimulus` when:**
- Primary stimulus participant must detect, identify, or respond to
- The "target" of attention in the experimental paradigm
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
- Example: "Too slow!" message, error tone

**Use `Incidental` when:**
- Present in environment but not task-relevant
- Distractor or irrelevant stimulus
- Example: Standard stimulus in oddball (not target), background noise

**Use `Task-activity` when:**
- Marker of ongoing task activity period
- Indicates participant is engaged in continuous task
- Example: Start of free viewing period, beginning of imagery period

**Use `Mishap` when:**
- Unplanned occurrence affecting experiment
- Equipment failure, environmental disruption
- Example: Stimulus failed to display, unexpected loud noise
````

### Complete event annotation examples

````{admonition} **Examples:** Combining Event-type and Task-event-role

**Example 1: Target stimulus in oddball task**
```
Experimental-stimulus, Sensory-event, Auditory-presentation, 
(Tone, 1000 Hz), (Intended-effect, Target)
```

---

**Example 2: Standard (non-target) stimulus**
```
Incidental, Sensory-event, Auditory-presentation, 
(Tone, 500 Hz), (Intended-effect, Standard)
```

---

**Example 3: Participant button press**
```
Participant-response, Agent-action, 
((Experiment-participant), (Press, (Index-finger, Mouse-button))), 
Response-time/350 ms
```

---

**Example 4: Feedback on correct response**
```
Feedback, Sensory-event, Visual-presentation, 
(Green, Checkmark), (Intended-effect, Positive)
```

---

**Example 5: Fixation cue**
```
Cue, Sensory-event, Visual-presentation, 
(White, Cross), (Intended-effect, Fixation-point)
```

---

**Example 6: Task instructions**
```
Instructional, Sensory-event, Visual-presentation, 
(Text, Label/Press-left-for-red)
```

---

**Example 7: Environmental noise**
```
Mishap, Sensory-event, Auditory-presentation, 
(Environmental-sound, Label/Construction-noise)
```

---

**Example 8: Computed artifact**
```
Incidental, Data-feature, (Eye-blink, Def/AutoDetected)
```
````

## Simultaneous events and presentations

When multiple stimuli or events occur at the same time, the choice of whether to annotate them as a single event or multiple separate events depends on their relationship and functional roles.

### Single sensory event: Same modality, same location

When multiple stimuli appear simultaneously within the same modality and presented at the same location, they are typically annotated as a single sensory event with multiple stimulus descriptions.

````{admonition} **Example:** Multiple objects in same visual presentation

**Scenario:** A red square (target) and a green triangle (distractor) both appear on screen at the same time.

**Annotation (Single Sensory Event):**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
((Red, Square), (Intended-effect, Target)), 
((Green, Triangle), (Intended-effect, Distractor))
```

**Interpretation:** "An experimental stimulus sensory event with visual presentation of two objects: a red square intended as a target and a green triangle intended as a distractor"

**Why Single Event:**
- Same modality (visual)
- Same presentation mechanism (screen display)
- Perceived as a unified visual scene
- Natural to consider as one presentation
- Both have the same Task-event-role (Experimental-stimulus)
````

### Ambiguous case: Different modalities, related content

When stimuli occur simultaneously across different modalities but convey related information, either a single event or separate events may be appropriate.

````{admonition} **Example:** Cross-modal feedback (thumbs down + buzz)

**Scenario:** Participant receives feedback consisting of a thumbs-down image on screen simultaneously with an auditory buzz.

**Option A: Single Multi-Modal Sensory Event**
```
Feedback, Sensory-event, 
(Visual-presentation, (Label/Thumbs-down, Image)), 
(Auditory-presentation, Buzz), 
(Intended-effect, Negative)
```

**Interpretation:** "A single feedback sensory event consisting of both visual (thumbs-down image) and auditory (buzz) components, intended as negative feedback"

**Rationale:**
- Functionally a single feedback event
- Components are coordinated (same purpose)
- Occur at exactly the same time by design
- Perceived as unified feedback

---

**Option B: Two Separate Sensory Events**

Event 1:
```
Feedback, Sensory-event, Visual-presentation, 
(Thumbs-down, Image), (Intended-effect, Negative)
```

Event 2:
```
Feedback, Sensory-event, Auditory-presentation, 
Buzz, (Intended-effect, Negative)
```

**Interpretation:** "Two simultaneous sensory events: one visual (thumbs-down) and one auditory (buzz), both providing negative feedback"

**Rationale:**
- Different modalities can be considered separate events
- Each component could occur independently
- Clearer for analysis focusing on single modalities
- More explicit about dual presentation

---

**Both are correct!** Choose based on your analysis needs:
- Use single event if treating feedback as unified
- Use separate events if analyzing modalities independently
````

### Separate events: Different sources or independent stimuli

When stimuli occur simultaneously but originate from different sources or are clearly independent, they should be annotated as separate events.

````{admonition} **Example:** Independent simultaneous events

**Scenario:** During an experiment, at the exact same moment:
- The experimental stimulus (a blue circle) appears on screen
- The air conditioning system makes a noise
- A notification appears on the recording computer

**Annotation (three separate events):**

Event 1 (Experimental):
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Blue, Circle)
```

Event 2 (Environmental):
```
Mishap, Sensory-event, Auditory-presentation, 
(Environmental-sound, Label/HVAC-noise)
```

Event 3 (Recording system):
```
Experiment-control, Label/Status-update
```

**Why Separate:**
- Different sources (experiment, environment, recording system)
- Independent causation (not coordinated)
- Different functional roles (stimulus vs. noise vs. recording event)
- Would never be considered a unified presentation

**Key Principle:** If events would occur independently and are not functionally related, annotate separately even if temporally coincident.
````

### Decision guidelines for simultaneous events

````{admonition} **Guidelines:** When to use single vs. multiple events

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
````

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
  "color": {"HED": {"red": "Red"}},
  "shape": {"HED": {"circle": "Circle"}}
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
  "age": {"HED": "Age/# years"},
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
      "fixation": "Cue, Sensory-event, Visual-presentation, (Onset, (Cross, White), (Intended-effect, Fixation-point))"
    }
  }
}
```

**Event:**
| onset | duration | event_type |
|-------|----------|------------|
| 0.5   | 1.5      | fixation   |

**Assembled Result:**
```
Cue, Sensory-event, Visual-presentation, 
(Onset, (Cross, White), (Intended-effect, Fixation-point))
```

**Why use Onset:**
- Event has duration (duration column = 1.5)
- The grouped content under Onset continues for the duration
- Temporal scope is explicit
- Everything within the Onset group persists for 1.5 seconds
````

## Common mistakes and how to avoid them

Understanding common mistakes helps you avoid them in your own annotations.

### Mistake 1: Ungrouped stimulus properties

````{admonition} **Mistake:** Properties not grouped
:class: error

**Wrong:**
```
Sensory-event, Visual-presentation, Red, Circle
```

**Why it's wrong:**
- Red and Circle are separate top-level tags
- Ambiguous: could mean "something red AND something circular" (two things)

**Correct:**
```
Sensory-event, Visual-presentation, (Red, Circle)
```

**Why it's correct:**
- Red and Circle grouped = single object
- Unambiguous: describes one red circular object
````

### Mistake 2: Over-grouping unrelated concepts

````{admonition} **Mistake:** Grouping event classifications with properties
:class: error

**Wrong:**
```
(Experimental-stimulus, Sensory-event, Visual-presentation, Red, Circle)
```

**Why it's wrong:**
- Event classifications grouped with stimulus properties
- Suggests Experimental-stimulus is a property of the circle

**Correct:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```

**Why it's correct:**
- Event classifications at top level
- Stimulus properties grouped separately
- Clear semantic structure
````

### Mistake 3: Missing Event-type in timeline files

````{admonition} **Mistake:** No Event-type tag in events.tsv
:class: error

**Wrong:**

**Sidecar:**
```json
{
  "color": {"HED": {"red": "Red"}},
  "shape": {"HED": {"circle": "Circle"}}
}
```

**Result:**
```
Red, Circle
```

**Why it's wrong:**
- Timeline file requires Event-type tag
- Missing Task-event-role
- Doesn't indicate what KIND of event occurred

**Correct:**

**Sidecar:**
```json
{
  "event_type": {
    "HED": {
      "visual": "Experimental-stimulus, Sensory-event, Visual-presentation, ({color}, {shape})"
    }
  },
  "color": {"HED": {"red": "Red"}},
  "shape": {"HED": {"circle": "Circle"}}
}
```

**Result:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, (Red, Circle)
```
````

### Mistake 4: Flat agent-action structure

````{admonition} **Mistake:** Not grouping agent-action-object
:class: error

**Wrong:**
```
Agent-action, Experiment-participant, Press, Keyboard-key
```

**Why it's wrong:**
- No grouping indicates WHO did WHAT
- Ambiguous relationships

**Correct:**
```
Agent-action, ((Experiment-participant), (Press, Keyboard-key))
```

**Why it's correct:**
- Nested grouping shows agent-action-object relationship
- Clear who (participant) did what (press key)
````

### Mistake 5: Inconsistent grouping across trials

````{admonition} **Mistake:** Different grouping for same concept
:class: error

**Wrong:**

Trial 1: `Sensory-event, Visual-presentation, (Red, Circle)`

Trial 2: `Sensory-event, Visual-presentation, Red, Square`

Trial 3: `Sensory-event, (Visual-presentation, Green), Triangle`

**Why it's wrong:**
- Inconsistent structure makes analysis difficult
- Trial 2: properties not grouped
- Trial 3: modality incorrectly grouped with color

**Correct:**

All trials:
- `Sensory-event, Visual-presentation, (Red, Circle)`
- `Sensory-event, Visual-presentation, (Red, Square)`
- `Sensory-event, Visual-presentation, (Green, Triangle)`

**Why it's correct:**
- Consistent structure across all trials
- Predictable pattern for analysis
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
Experimental-stimulus, Sensory-event, Visual-presentation, 
(Red, Circle), (Intended-effect, Target)
```

**Components:**
- Task-event-role: `Experimental-stimulus`
- Event type: `Sensory-event`
- Modality: `Visual-presentation`
- Stimulus: `(Red, Circle)`
- Task context: `(Intended-effect, Target)`

**English:** "An experimental stimulus sensory event presenting a red circle intended as a target"
````

### Level 3: With spatial information

````{admonition} **Example 3:** Adding location

**Scenario:** A red circle target appears on the left

**Annotation:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
(Red, Circle), (Intended-effect, Target), Left-side-of
```

**Components:**
- Task-event-role: `Experimental-stimulus`
- Event type: `Sensory-event`
- Modality: `Visual-presentation`
- Stimulus: `(Red, Circle)`
- Task context: `(Intended-effect, Target)`
- Location: `Left-side-of`

**English:** "An experimental stimulus sensory event presenting a red circle target on the left"
````

### Level 4: With duration

````{admonition} **Example 4:** Event with duration

**Scenario:** A red circle target appears on the left and stays visible for 2 seconds

**Annotation:**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
(Onset, (Red, Circle), (Intended-effect, Target), Left-side-of)
```

**Components:**
- Task-event-role: `Experimental-stimulus`
- Event type: `Sensory-event`
- Modality: `Visual-presentation`
- Temporal scope: `Onset` (has duration)
- Content: Red circle target on left (persists for duration)

**English:** "An experimental stimulus sensory event begins, presenting a red circle target on the left, which continues for the event duration"
````

### Level 5: With response

````{admonition} **Example 5:** Adding participant response

**Scenario:** Participant presses spacebar in response to the target

**Stimulus Annotation (onset=1.0, duration=2.0):**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
(Onset, (Red, Circle), (Intended-effect, Target), Left-side-of)
```

**Response Annotation (onset=1.35):**
```
Participant-response, Agent-action, 
((Experiment-participant), (Press, Keyboard-key)), 
Response-time/350 ms
```

**Components of response:**
- Task-event-role: `Participant-response`
- Event type: `Agent-action`
- Actor: `Experiment-participant`
- Action-object: Press keyboard-key
- Measurement: `Response-time/350 ms` (1.35 - 1.0 = 0.35 seconds)

**English:** "The experiment participant presses a keyboard key; response time is 350 ms"
````

### Level 6: Complete trial with definitions

````{admonition} **Example 6:** Full trial using definitions

**Definitions (defined earlier in dataset):**
```
(Definition/FixationCross, (Cross, White), (Intended-effect, Fixation-point))
(Definition/TargetStimulus, (Red, Circle), (Intended-effect, Target))
(Definition/KeypressResponse, (Press, Keyboard-key))
(Definition/CorrectFeedback, (Green, Checkmark), (Intended-effect, Positive))
```

**Trial Start (onset=0.0):**
```
Experiment-structure, Task-trial, Label/Trial17
```

**Fixation (onset=0.5, duration=1.0):**
```
Cue, Sensory-event, Visual-presentation, (Onset, Def/FixationCross)
```

**Target Stimulus (onset=1.5, duration=2.0):**
```
Experimental-stimulus, Sensory-event, Visual-presentation, 
(Onset, Def/TargetStimulus), Left-side-of
```

**Response (onset=1.85):**
```
Participant-response, Agent-action, 
((Experiment-participant), Def/KeypressResponse), 
Response-time/350 ms
```

**Feedback (onset=3.5, duration=0.5):**
```
Feedback, Sensory-event, Visual-presentation, (Onset, Def/CorrectFeedback)
```

**English narrative:** "Trial 17 begins. At 0.5s, a white fixation cross appears for 1 second. At 1.5s, a red circle target appears on the left for 2 seconds. At 1.85s (350ms after target onset), the participant presses a keyboard key. At 3.5s, green checkmark feedback appears for 0.5s."

**Benefits:**
- Definitions reduce redundancy
- Consistent stimulus descriptions across trials
- Easy to modify definitions in one place
- Clear temporal sequence
- Complete trial annotation
````

## Best practices checklist

Use this checklist before finalizing your annotations:

````{admonition} **Checklist:** Creating semantically correct HED annotations
:class: tip

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
- [ ] `#` placeholder for numeric values
- [ ] No redundant parentheses around curly braces
- [ ] Column references match actual column names

**✓ Relationships**
- [ ] Directional relations use `(A, (Relation, C))` pattern
- [ ] Spatial relationships clearly indicate source and target
- [ ] Agent-action-object relationships properly nested

**✓ Definitions**
- [ ] Repeated patterns defined once with Definition/DefName
- [ ] Each Definition name is unique
- [ ] Def/DefName used to reference definitions
- [ ] Definitions defined before first use

**✓ Validation**
- [ ] All tags exist in HED schema
- [ ] No intermediate nodes without children
- [ ] Required children specified
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
````

## Summary

Creating semantically correct HED annotations requires understanding:

1. **The reversibility principle** - Your annotations should translate back to coherent English
2. **Semantic grouping rules** - Parentheses bind tags that describe the same entity
3. **Event classification** - Every event needs both Event-type and Task-event-role
4. **File type semantics** - Timeline vs. descriptor files have different requirements
5. **Relationship patterns** - Agent-action-object and directional relationships need specific structures
6. **Assembly control** - Use curly braces to control how multi-column annotations are assembled
7. **Consistency** - Use the same patterns for similar events throughout your dataset

By following these principles and patterns, you create annotations that are not only syntactically valid but also semantically meaningful and machine-actionable, enabling powerful downstream analysis and cross-study comparisons.

For additional information, see:
- [**HED Annotation Quickstart**](./HedAnnotationQuickstart.md) - Practical annotation guide
- [**BIDS Annotation Quickstart**](./BidsAnnotationQuickstart.md) - BIDS integration
- [**HED Schemas**](./HedSchemas.md) - Understanding the HED vocabulary
- [**HED Validation Guide**](./HedValidationGuide.md) - Validating your annotations
