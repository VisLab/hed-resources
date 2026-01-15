(making-hed-meaningful-anchor)=

# Making HED meaningful

This tutorial explains how to create HED annotations that are meaningful, unambiguous, and machine-actionable. Understanding HED annotation semantics is essential for creating annotations that accurately represent what happened during an experiment and can be correctly interpreted by both humans and computers.

## What do HED annotations mean?

A HED annotation consists of tags selected from the HED vocabulary (schema), optionally grouped using parentheses, that together describe events, stimuli, actions, and other aspects of an experiment.

The semantic interpretation of a HED annotation depends on:

1. **Which tags are selected** - Each tag has a specific meaning in the HED vocabulary
2. **How tags are grouped** - Parentheses bind tags that describe the same entity or relationship
3. **Where tags are placed** - Top-level (not inside any parentheses) vs. nested (inside parentheses) grouping affects interpretation
4. **The context of use** - Whether the annotation appears in a timeline file vs. a descriptor file

(tag-placement-anchor)=

```{admonition} Understanding tag placement
---
class: tip
---
**Top-level tags:** appear outside all parentheses. Example: In `Sensory-event, (Red, Circle)`, the tag `Sensory-event` is top-level.

**Nested tags:** appear inside parentheses. Example: In `Sensory-event, (Red, Circle)`, the tags `Red` and `Circle` are nested within a group.
```

Tag placement determines scope and relationships - top-level tags typically classify the entire annotation, while nested tags describe specific entities or relationships.


## The reversibility principle

```{admonition} Key principle
---
class: tip
---
**A well-formed HED annotation can be translated back into a coherent English description.**

```

The reversibility principle provides a practical test for whether your HED annotation is semantically correct: Can you translate it back into coherent English?

````{admonition} **Example:** A reversible HED annotation

**HED String:**
```
 Sensory-event, Experimental-stimulus, Target, Visual-presentation, 
((Green, Triangle), (Center-of, Computer-screen))
```

**English Translation:**
"A sensory event that is a target experimental stimulus consists of a visual presentation of a green triangle that appears at the center of the computer screen."
````

**Why it works:**

- Each group describes a single entity or relationship
- The overall structure tells a coherent story
- `Sensory-event` indicates this is a sensory presentation
- `Experimental-stimulus` indicates this is a task stimulus
- `Target` indicates the task stimulus role
- `Visual-presentation` specifies the sensory modality
- `(Green, Triangle)` - grouped properties describe ONE object
- `(Center-of, Computer-screen)` - spatial relationship (see [Rule 6](#rule-6-use-directional-pattern-for-relationships) for relationship patterns)
- The outer grouping `((Green, Triangle), (Center-of, Computer-screen))` connects the object to its location



````{admonition} **Example:** A non-reversible HED annotation

**HED String:**
```
Green, Red, Square, Triangle, Center-of, Visual-presentation, Sensory-event, Computer-screen
```

**Attempted English Translation:**
"Something green, and something Red, and a square, and something triangular, and a center position, and visual presentation, and a sensory event, and a computer screen."
````

**Why it fails:**

- Cannot tell if green and red describe the triangle or the square or something else
- Spatial information is disconnected
- The annotation describes eight separate facts rather than one coherent event
- No clear relationship between the components

**Problems:**

- Tags are flat (no grouping), so relationships are lost
- No indication of what is being presented vs. where it is presented
- Missing a `Task-event-role` which is important for assessing cognitive impact in the experiment


## File type semantics

The semantic requirements for HED annotations depend on whether they appear in timeline files (e.g., `events.tsv`) or descriptor files (e.g., `participants.tsv`). Understanding this distinction is essential for understanding the annotation rules.

### Timeline files require Event tags

Timeline files have timestamps indicating when things happen. (In [BIDS](https://bids.neuroimaging.io/index.html) format this is a `.tsv` file with an `onset` column. In [NWB](https://nwb.org/) it is a `DynamicTable` type with a time-stamp of some sort.) Every assembled annotation in a timeline file MUST include an `Event` type tag.

````{admonition} **Example:** Correct timeline file annotation (BIDS)

**File excerpt from:** `events.tsv`
| onset | event_type | 
|-------|------------|
| 2.5   | square     |

**Sidecar:**
```json
{
  "event_type": {
    "HED": {
      "square": "Sensory-event, Experimental-stimulus, Non-target, Visual-presentation, (Red, Square)"
    }
  }
}
```

**Assembled result:**
```
Sensory-event, Experimental-stimulus, Non-target, Visual-presentation, (Red, Square)
```
````

**Why it's correct:**
- Includes `Event` tag (`Sensory-event`)
- Includes `Task-event-role` (`Experimental-stimulus`)
- It is an experimental stimulus specifying the task stimulus role (`Non-target`)
- It is a sensory event specifying the modality (`Visual-presentation`)
- Properly groups stimulus properties


### Descriptor files have no Event tags

Descriptor files (e.g., `participants.tsv`, `samples.tsv`) describe properties or characteristics, not events. `Event` tags should not appear in descriptor files.

````{admonition} **Example:** Correct descriptor file annotation

**File excerpt from:** `participants.tsv`

| participant_id | age | hand  |
|----------------|-----|-------|
| sub-001        | 25  | right |

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

**Assembled Result:**
```
Age/25 years, Right-handed
```
````

**Why it's correct:**
- Describes participant properties
- No event classification
- No temporal tags (`Onset`/`Offset`)
- Semantically appropriate for descriptor context


### Temporal scope tags

Temporal scope tags (`Onset`, `Offset`, `Inset`, and `Delay`) are ONLY for timeline files and indicate the time course of events. `Duration` can be used in either type of file but cannot be used with `Onset`, `Offset`, and `Inset`, which are associated with explicit time point markers in the event files. In timeline files `Duration` represents something starting at the current time and extending for a specified amount of time from that point. In descriptor files `Duration` represents a property of something.

See [Temporal annotation strategies](#temporal-annotation-strategies) for detailed guidance on when to use `Duration` versus `Onset`/`Offset` patterns.

## The perspective principle
(participant-perspective-anchor)=

```{admonition} Key principle
---
class: tip
---
**By default, HED annotations for timeline files reflect the perspective of the experiment participant, not the experimenter or the equipment.**

```

The perspective principle is applicable to sensory events and agent actions.

### Implicit versus explicit perspective

The perspective is usually determined by the `Agent` and `Agent-task-role` tags. If an event annotation does not include an `Agent` tag and an `Agent-task-role` tag, the annotation has an **implicit perspective** that is assumed to be from the viewpoint of a single human experiment participant. This is fundamental because experiments are most commonly designed to measure the participant's response to stimuli and events. 

````{admonition} **Example:** Participant perspective annotation (implicit)

**Scenario:** A participant sees a red circle on screen meant to be a cue to get ready

**HED annotation (correct):**
```
Sensory-event, Cue, Visual-presentation, (Red, Circle)
```

**English interpretation:**
"A sensory event that is an experimental stimulus consists of a visual presentation of a red circle (as perceived by the human participant)."
````

**Why it works:**
Usually sensory events do not have `Agent` and `Agent-task-role`, and the annotation is assumed to describe the experiment from the viewpoint of a single human participant. More complicated scenarios (e.g., multiple participants, agents that are not human, or agents that are not the experiment participant) are also possible to annotate unambigously, but in these cases the `Agent` and/or `Agent-task-role` are required for unambiguous annotation. See examples:....

## Semantic rules

```{admonition} Important context for the following rules
---
class: tip
---
The rules in this section primarily apply to **timeline files** (events with timestamps). For descriptor files, event-related rules do not apply. See [File type semantics](#file-type-semantics) above for the distinction.
```

```{admonition} HED annotations are unordered
---
class: important
---
**The order of tags in a HED annotation does not affect its meaning.** 

The annotations `Red, Circle` and `Circle, Red` are semantically equivalent—-both are just a list of two independent tags. **Parentheses are essential for conveying relationships and ordering**: they explicitly bind tags together to show which tags describe the same entity or relationship.
```

**The problem:**
- Without parentheses: `Red, Circle` is ambiguous (could be two separate things)  
- With parentheses: `(Red, Circle)` is unambiguous (one red circle)

Parentheses in HED annotations are not decorative -- they carry semantic meaning. Tags within a group are semantically bound and work together to describe one thing. Tags outside the group describe different aspects or entities. Remember that HED vocabularies maintain a strict taxonomical or is-a relationship of child tags to parents. When we say `Event` tag, we mean `Event` or any tag that is a descendent of `Event` in the HED vocabulary hierarchy.

### Rule 1: Group tags for meaning

#### Group an object's properties together
Tags describing properties of the same object MUST be grouped together:

````{admonition} **Example:** Correct object grouping

```
(Red, Circle)
```
**Meaning:** A single object that is both red AND circular.
````

Without grouping the meaning can be ambiguous and could mean two different items, one that is circular and one that is red.

If an item has multiple properties, they should all be grouped together:

````{admonition} **Example:** Grouping of multiple object properties

```
(Green, Triangle, Large)
```
**Meaning:** A single object that is green, triangular, and large.
````

Without grouping, these three properties that may or may not apply to the same object.

#### Keep independent concepts separate

Tags that describe independent aspects or unrelated concepts should NOT be grouped together. Don't group tags with no semantic relationship.

```{admonition} Examples of incorrect grouping

- `(Red, Press)` - Color and action are unrelated
- `(Triangle, Mouse-button)` - Stimulus shape and response device are unrelated
- `(Green, Response-time)` - Color and temporal measure are unrelated
```

### Rule 2: Events must be classified

Event files and other timeline files are tabular files that associate annotations with points on the experimental timeline. Each row in such a tabular file can represent one or more "events" (or markers in an ongoing event process).

```{admonition} Event tags are the anchors for event annotations
---
class: tip
---
**Core requirements for annotating an event:**
  - Every event MUST have exactly one tag from the `Event` hierarchy
  - If there is a task, events SHOULD have a `Task-event-role` tag
  - If a sensory event, it SHOULD have a `Sensory-modality` tag
  - Each event annotation should be in a separate group if multiple events occur at the same time
```

#### Event classification tags

The `Event` tags provide the primary classification:

- `Sensory-event` - A sensory presentation occurs
- `Agent-action` - An agent performs an action (if no explicit agent is given, a single experiment participant is assumed)
- `Data-feature` - A computed or observed feature is marked
- `Experiment-control` - Experiment structure or parameters change
- `Experiment-procedure` - Experiment paused to administer something (like a quiz or saliva test)
- `Experiment-structure` - Organizational boundary or marker (like start of a trial or block)
- `Measurement-event` - A measurement is taken (which may be recorded elsewhere)

```{admonition} Need help choosing the right Event tag?
---
class: tip
---
See the comprehensive [decision guide for Event tags](#selecting-the-right-event-tag) later in this document for detailed guidance, examples, and decision criteria.
```

````{admonition} **Example: Single sensory event with proper classification**

```
Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle), (Green, Square)
```
**Meaning:** The event is a sensory event (from the perspective of the experiment participant) which is an experimental stimulus consisting of the simultaneous presentation of a red circle and a green square.

**Classification breakdown:**
- `Sensory-event` - Event type (from Event hierarchy)
- `Experimental-stimulus` - Task role (from Task-event-role hierarchy)
- `Visual-presentation` - Sensory modality
- `(Red, Circle), (Green, Square)` - Describes what is presented to the senses
````

A single top-level `Event` tag is assumed to represent an event that includes all of the rest of the tags in the annotation. The sensory event in the example is an experimental stimulus (something that the participant will need to act on as part of the experiment's task). This is the most common method of annotating events.

#### Agent specification for actions

For `Agent-action` events, the actor performing the action can be specified with varying levels of detail:

```{admonition} Understanding agent specification
---
class: tip
---
**Agent TYPE vs. Agent ROLE:**
- **Agent type** (from `Agent` hierarchy): `Human-agent`, `Animal-agent`, `Avatar-agent`, `Robot-agent`, `Software-agent`
- **Agent role** (from `Agent-task-role` hierarchy): `Experiment-participant`, `Experimenter`, `Research-assistant`
```

**When agent specification is implicit:**
For human experiments, if only `Agent-action` appears without explicit agent tags, a single human experiment participant is assumed by default.

````{admonition} **Example: (implicit - human participant assumed)**
```
Agent-action, Participant-response, (Press, Mouse-button)
```
**Meaning:** A human experiment participant presses the mouse button.
````
**When to specify agent ROLE explicitly:**
Use `Experiment-participant`, `Experimenter`, or other `Agent-task-role` tags when:
- Multiple people with different roles are involved
- Clarity about who did what is important
- You want to be explicit for consistency

````{admonition} **Example (explicit agent role)**
```
Agent-action, Participant-response, (Experiment-participant, (Press, Mouse-button))
```
````

**When to specify agent TYPE explicitly:**
Use `Animal-agent`, `Robot-agent`, or other `Agent` tags when the agent is NOT a human:

````{admonition} **Example (non-human agent type)**
```
Agent-action, Participant-response, ((Animal-agent, Animal/Mouse), (Press, Lever))
```

Meaning: A mouse, the subject of the experiment, presses a lever. 
````

Note that because `Mouse` is not a tag in the schema, it must be modified by its closest potential parent in the schema: `Animal/Mouse`. (See [Rule 8](#rule-8-extend-tags-carefully) for guidance on extending tags.)

The `Experiment-participant` is implicit in this annotation, but could be made explicit by using `(Animal-agent, Experiment-participant, Animal/Mouse)` in the example.

````{admonition} **Example (avatar in a virtual reality experiment)**
```
Agent-action, ((Avatar-agent, ID/34A7), (Collide-with, Building))

```
````

**Best practices:** 
- In human experiments: `Human-agent` can be omitted (it's implicit)
- In animal/robot experiments: Usually specify the agent type (`Animal-agent`, `Robotic-agent`)
- Be consistent throughout your dataset


See [Rule 4](#rule-4-nest-agent-action-object) for the complete agent-action-object structural pattern.

#### Task-event-role tags

If an experiment involves a task, each event should be associated with a `Task-event-role`:

- `Experimental-stimulus` - Primary stimulus participant must detect, identify, or respond to
- `Cue` - Signal indicating what to expect or do next
- `Participant-response` - Action by the participant
- `Feedback` - Information about participant's performance
- `Instructional` - Task instructions or information
- `Warning` - Alert or warning signal
- `Incidental` - Present but not task-relevant
- `Task-activity` - Marker of ongoing task activity period
- `Mishap` - Unplanned occurrence affecting experiment

```{admonition} **Need help choosing the right Task-event-role?**
---
class: tip
---
See the comprehensive [decision guide for `Task-event-role` tags](#selecting-the-right-task-event-role) later in this document for detailed guidance, examples, and decision criteria.
```

#### Sensory-modality for sensory events

If the event is a `Sensory-event`, a `Sensory-modality` tag (e.g., `Visual-presentation` or `Auditory-presentation`) SHOULD be included to specify what senses are affected by the presentation. This is essential for search and query functionality.

#### Handling multiple events

If a single row annotation contains multiple events, the tags relevant to each event must be separately grouped in parentheses.

````{admonition} **Example: A row annotation represents multiple sensory events** 

**File excerpt from:** `events.tsv`

| onset | duration | visual_type   | auditory-type |
| ----- | -------- | ------------- | ------------- |
| 104.5 |  'n/a'   |  show_circle  | sound_green   |

**Asssembled annotation:**
```
(Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle)), (Sensory-event, Experimental-stimulus, Auditory-presentation, (Word, Label/Green))
```
**Meaning:** The annotation  (from the perspective of the experiment participant) consists of two simultaneous sensory events -- a red circle (usually assumed to be displayed on the computer screen if no other information is present) and a spoken word "Green". This type of annotation often occurs in congruence experiments or attention shifting experiments.
````
It is also possible to annotate this as a single sensory event that is an experimental stimulus with two modalities of presentation. The choice should be made consistently, but if the two presentation have different task roles, they should always be annotated separately as in the example.


This could also have been annotated as one sensory event with separate presentations if the multiple sensory modes were intended to reinforce a single focus. However in this case, it is annotated as separate events (from the perspective of the participant) to reinforce the understanding that these are generating a split focus.

````{admonition} **Example:** Multiple rows have the same time.

Consider the following row in an events table:

| onset | duration | event_type      |
| ----- | -------- | --------------- |
| 104.5 |  'n/a'   |  show_circle    | 
| 104.5 |  'n/a'   |  sound_green    |

The annotations for rows with the same times (regardless of where the rows appear in the file) are concatenated to form a single annotation:

```
(Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle)), 
(Sensory-event, Experimental-stimulus, Auditory-presentation, (Word, Label/Green))
```
**Meaning:** The meaning is the same as in the previous example where the annotations are in one row. They are distinct sensory events and their respective tags must be grouped separately regardless of where they appear.

````

**Note:** The assembled annotation cannot have duplicates (either tags or groups) regardless of whether the duplicates were are different rows, if the markers have the same time.

Another common situation is data in which the response time to an event is in the same row as the stimulus presentation. Use the `Delay` tag to convey the timing as illustrated in the following example:

````{admonition} **Example:** An annotation for row with a stimulus and response time.

Consider the following excerpt from an events table:

| onset | duration | stimulus | responseTime |
| ----- | -------- | -------- | ------------ |
| 104.5 |  'n/a'   |  circle  |   0.250      |

At time 104.5 seconds into the experiment a circle is presented on the computer screen, and the participant takes 0.250 seconds to push a button in response to the presentation. This situation could be annotated as:

```
(Sensory-event, Experimental-stimulus, Visual-presentation, Circle),
(Delay/0.250 s, (Agent-action, Participant-response, (Experiment-participant, (Push, Push-button))))
```

**Meaning:** 
This annotation represents two separate events:
- An experimental stimulus that is the visual presentation of a circle (assumed to be on the screen) at time 104.5 seconds from the start of the experiment.
- A participant response consisting of the experiment participant pushing the button at 104.750 seconds from the start of the experiment

````

### Rule 3: Further qualify event roles

After selecting the appropriate `Event` and `Task-event-role` tags, consider adding more specific qualifiers:

#### Task-stimulus-role qualifiers

Tags from the `Task-stimulus-role` hierarchy provide important information about the task stimulus. For example, tags such as `Penalty` or `Reward` are often used to modify the `Feedback` role. Common qualifiers:

- `Target` - The thing the participant should focus on or respond to
- `Non-target` - Something to ignore or not respond to
- `Expected` - Stimulus matches what was cued
- `Unexpected` - Stimulus differs from what was cued
- `Penalty` - Negative consequence for performance
- `Reward` - Positive consequence for performance

If the annotation contains an `Experimental-stimulus` tag, consider whether any tags from `Task-stimulus-role` are appropriate.

````{admonition} **Example:** Stimulus with task role qualifier

```
Sensory-event, Experimental-stimulus, Target, Visual-presentation, (Red, Circle)
```
**Meaning:** A visual experimental stimulus target - a red circle that the participant should respond to.
````

#### Task-action-type qualifiers

Tags from the `Task-action-type` hierarchy provide important information about the nature of the participant's response. Common qualifiers:

- `Correct-action` - Response matches task requirements
- `Incorrect-action` - Response does not match task requirements
- `Appropriate-action` - Action is suitable in context
- `Inappropriate-action` - Action is unsuitable in context
- `Switch-attention` - Participant shifts focus
- `Near-miss` - Almost correct response

If the annotation contains a `Participant-response` tag, consider whether any tags from `Task-action-type` are appropriate.

````{admonition} **Example:** Response with action qualifier

```
Agent-action, Participant-response, Correct-action, (Experiment-participant, (Press, Mouse-button))
```
**Meaning:** The experiment participant pressed the mouse button, and this was a correct response to the task.
````

### Rule 4: Nest agent-action-object

Agent-action-object relationships require nested grouping to show who did what to what.

````{admonition} **Pattern:** Agent-action-object structure
---
class: tip
---
```
Agent-action, ((Agent-tags), (Action-tag, (Object-tags)))
```

**Interpretation:** "The agent performs the action on the object."
````

The grouping is is meant to convey normal sentence structure: subject predicate direct-object.

````{admonition} **Example:** An agent action.
```
Agent-action, Participant-response, Correct-action, (Experiment-participant, (Press, (Left, Mouse-button)))
```

**Meaning:** "An action in which the experiment participant presses the left mouse button giving a correct response for the task.
````

This example shows minimal grouping -- there could be additional grouping for clarity, but this minimal grouping should be unambiguous.

**Structure Explanation:**

- `Agent-action` - `Event` top-level classification
- `Participant-response` - `Task-event-role` modifier
- `Correct-action` - `Task-action-type` modifier
- Outer action group: `(Experiment-participant, (Press, (Left, Mouse-button)))` connects agent to action
- Inner Tag (or group): `Experiment-participant` - describes WHO does the action
- Inner group with an `Action` tag: `(Press, (Left, Mouse-button))` - describes WHAT action on WHICH object

If a tag from the `Action` hierarchy is ungrouped, it cannot be determined syntactically who is the actor (`Experiment-participant` or `Mouse-button`).

````{admonition} **Example:** Incorrect agent-action structure

```
Agent-action, Experiment-participant, Press, Mouse-button
```

**Meaning:** Agent action exists; an experiment participant exists; pressing exists; a mouse button. Did the mouse-button press the participant or vice versa?
````

Without grouping indicates WHO did WHAT. The relationships are lost, making the annotation semantically incomplete.

### Rule 5: Use directional pattern for relationships

Tags from the `Relation` tag hierarchy express directional relationships and require specific nested grouping.

````{admonition} Relation tags represent binary, directional relationships
---
class: tip
---
"A has the relationship (Relation-tag) to C" or "A → C" is annotated as:

```
(A, (Relation-tag, C))
```
````

In interpreting relation groups:

- **A** is the source/subject of the relationship
- **Relation-tag** is the binary directional relationship (from Relation/ subtree)
- **C** is the target/object of the relationship
- The relationship flows from **A** to **C** through the `Relation` tag

The example has the following structure:

- Outer parentheses group the entire relationship
- Inner parentheses group the relation with its target
- The source appears in the outer group

Each `Relation` should have should be in its own grouping.

````{admonition} **Example:** Spatial relationship pattern

```
((Red, Circle), (To-left-of, (Green, Square)))
```
**Meaning:** "A red circle is to-left-of a green square"
````

````{admonition} **Example:** A size comparison

```
Sensory-event, Experimental-stimulus, Visual-presentation, ((Cross, White, Size), (Greater-than, (Circle, Red, Size)))
```
**Meaning:** An experimental stimulus consists of a white cross and a red circle. The white cross is bigger than the red circle.

````

```{admonition} Common Relation tags requiring this structure
---
class: tip
---
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

### Rule 6: Use curly braces for assembly control

```{admonition} When to use curly braces
---
class: tip
---
**Use curly braces when:**
- Multiple columns contribute properties of the SAME entity (e.g., color + shape = one object)
- You need to control grouping across columns in sidecars
- Flat concatenation would create ambiguous relationships

**Don't use curly braces when:**
- Each column describes independent aspects (naturally separate)
- Annotating directly in a HED column (not a sidecar)
- All tags naturally group correctly without templates

**How they work:** Curly braces `{column_name}` in a sidecar act as placeholders that get replaced with that column's annotation during assembly, allowing you to specify a grouping template.
```

Without curly braces, annotations for each column in a row of a tabular file are simply concatenated (joined with commas) to form an assembled annotation for the row. This works for independent information but fails when multiple columns describe parts of the same entity. We assume that the annotations go in a JSON sidecar for BIDS (or a `Meanings` table for NWB). The following examples annotate an events file of which the following is an excerpt:

| onset | duration | event_type | color | shape  |
| ----- | -------- | ---------- | ----- | ------ |
| 4.8   | n/a      | visual     | red   | circle |

The row represents a visual presentation of a red circle at 4.8 seconds.

````{admonition} **Example:** Ambiguous annotation with flat concatenation

The sidecar is:
```json
{
  "event_type": {
    "HED": {
      "visual": "Sensory-event, Experimental-stimulus, Visual-presentation"
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
Sensory-event, Experimental-stimulus, Visual-presentation, Red, Circle
```

**Problem:** `Red` and `Circle` are separate top-level tags. Cannot definitively determine they describe the same object.
````

````{admonition} **Example:** Using a curly brace template to disambiguate

**Sidecar (BIDS):**
```json
{
  "event_type": {
    "HED": {
      "visual": "Sensory-event, Experimental-stimulus, Visual-presentation, ({color}, {shape})"
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
Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle)
```

**Why it works:** The curly braces `{color}` and `{shape}` are replaced by their annotations within the grouping parentheses, ensuring they are grouped as properties of the same object.
````

**Note:** NWB (Neurodata Without Borders) is an alternative data format standard to BIDS (Brain Imaging Data Structure). NWB does not use sidecars, but has an equivalent representation and the HED annotation rules apply.

The alternative to using sidecars for annotations is to create a HED column in the tabular file. However this requires an individual annotation for each row, while the sidecar approach allows reuse of annotations across many rows.

### Rule 7: Special syntax and restrictions

#### Reserved tags

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
    * Definition group cannot contain any other reserved tags.
* - `Def`
  - `Def/Red-triangle`
  - * Must correspond to a `Definition`
    * Used to anchor `Onset`, `Inset`, `Offset`
    * Cannot appear in definitions
* - `Def-expand`
  - `(Def-expand/Red-triangle, (Red, Triangle))`
  - * Must correspond to `Definition`
    * Used to anchor `Onset`, `Inset`, `Offset`
    * Cannot appear in definitions
    * DO NOT USE -- Tools use during processing
* - `Onset`
  - `(Def/Red-triangle, Onset)`
  - * Marks the start of an unfolding event
    * Must have a `Def` anchor corresponding to a `Definition`.
    * Can include an internal tag group
    * Must be in a top-level tag group
    * Event ends when an `Offset` or `Onset` with same `Def` name is encountered
* - `Offset`
  - `(Def/Red-triangle, Offset)`
  - * Marks the end of an unfolding event
    * Must have a `Def` tag anchor
    * Must be in a top-level tag group
    * Must correspond to an ongoing `Onset` group of same name
* - `Inset`
  - `(Def/Red-triangle, (Luminance-contrast/0.5), Inset)`
  - * Marks an interesting point during the unfolding of an event process.
    * Must have a `Def` tag anchor
    * Can include an internal tag group
    * Must be in a top-level tag group
    * Must be between an `Onset` and the ending time of that event process
* - `Duration`
  - `(Duration/2 s, (Sensory-event, Auditory-presentation, Feedback Buzz))`
  -  * Must be in a top-level tag group
     * Cannot be used in same group with `Onset`, `Inset`, or `Offset`.
     * May be used in both timeline and description files.
     * Inner tag group defines the event process that starts at that point
     * If used with `Delay`, the event process start is delayed by indicated amount
* - `Delay`
  - `(Delay/0.5 ms, (Sensory-event, Auditory-presentation, Feedback Buzz))`
  - * Must be a top-level tag group
    * Delays the start of the event by the indicated amount
* - `Event-context`
  - `(Event-context, (Def/Task-a, (Blue, Square)), (Def/Task-b, (Red, Triangle)))`
  - * Should only be created by tools
    * Must be a top-level tag group
    * Keeps track of ongoing events at intermediate time points
    * Represents concurrent active event processes
```

#### Value classes and unit classes

````{admonition} **Understanding Label/, ID/, and Parameter-name/**
---
class: tip
---
The `Label/` tag provides an identifying name or label for something. The `#` placeholder in `Label/#` gets replaced with your specific label text (e.g., `Label/Green`, `Label/Fixation-point`). The `ID` and `Parameter-name` have similar purposes, but have fewer restrictions on the type of values.
````

Use `Label/` when:
- Naming a specific stimulus or condition (e.g., `Label/Fixation-point`)
- Identifying specific content (e.g., `Label/Green` for the word "Green")
- Creating definitions (see [Rule 8](#rule-8-reserved-tags-have-special-syntax) for `Definition`)

Labels must use hyphens or underscores instead of spaces (e.g., `Label/Press-left-for-red`). They have the name class attribute, meaning that their values must be alphanumeric. For identifiers that contain any printing UTF-8 character, use `ID/` or the `Parameter-name/` tags. These have the text class attribute and an take very general values.


### Rule 8: Extend tags carefully

The HED schema vocabulary hierarchy can be extended to accommodate more specialized annotations. HED library schemas are formal extensions of HED for specialized vocabularies. Users can also extend the hierarchy by appending new tag to an existing tag that allows extension. Tags that can be extended have (or have inherited) the `extensionAllowed` attribute. Tags that can be extended include all tags EXCEPT those in the `Event` or `Agent` subtrees or that have a `#` child (value-taking nodes). You should ONLY consider extending the hierarchy if it is necessary to correctly capture the meaning in the context of the annotation.

When you need to use a tag that doesn't exist in the schema, EXTEND FROM THE MOST SPECIFIC applicable parent tag while preserving the is-a (taxonomic) relationship.

````{admonition} Extend from the deepest applicable parent
---
class: tip
---
```
Parent-tag/Extension-tag
```

The `Parent-tag` must be a tag in the schema.
````

**Guidelines:**

- **Extend from the closest applicable parent** - Follow the schema hierarchy as deep as possible
- **Preserve the is-a relationship** - Your extension should be a specific type of its parent
- **Don't extend from overly general terms** - Go deeper into the hierarchy when possible
- **Check for extension restrictions** - Some tags cannot be extended (`Event` subtree, `Agent` subtree, or # value nodes)

````{admonition} Example: Extending Item hierarchy
Suppose you want to annotate a house, but house is not a tag in the schema.

**Wrong:**
```
Item/House
```
**Problem:** Too general. `Item` has many levels of hierarchy that better classify "house."

**Correct:**
```
Item/Object/Man-made-object/Building/House
```
````

Follow the schema hierarchy to the most specific applicable parent (`Building`). It isclear that a house is a type of building. The actual tag in the annotation is `Building/House`.

````{admonition} Extending Action hierarchy

Suppose you want to annotate a "squeeze" action.

**Wrong:**
```
Action/Squeeze
```
**Problem:** `Action` has subcategories that better classify squeezing.

**Correct:**
```
Move-fingers/Squeeze
```
````

In the above example squeezing is a specific type of finger movement, so extending from `Move-fingers` preserves the proper taxonomic relationship. The full path in the hierarchy is: `Action/Move/Move-body-part/Move-fingers/Squeeze`, but always use the shortest path possible: `Move-fingers/Squeeze`.

````{admonition} Example: Trying to extend Event

Suppose you want to add a custom event type.

**Wrong:**
```
Event/My-custom-event
```

**Problem:** The `Event` subtree does not allow extensions.


If you really feel that you have a type of event that is not covered, you can use:

```
(Event, Label/My-custom-event)
```

but this is not recommended.
````

You should choose from the predefined event types that best match your situation. The reason is that the tags from the `Event` subtree are a primary strategy for classifying Use existing event types.

Value-taking tags (have `#` children in the schema) cannot be extended. These tags reside in the `Property` hierarchy in the standard schema.

````{admonition} Example: Creating a custom acceleration type

Suppose you want to specify a non standard acceleration. The schema has `Property/Data-property/Data-value/Spatiotemporal-value/Rate-of-change/Acceleration/#`.

**Wrong:**
```
Acceleration/#/Custom-acceleration-unit
```
**Problem:** The `#` child indicates a placeholder for a value, not a category. You cannot extend after `#`.

**Correct:**
```
(Rate-of-change/Custom-acceleration-type, Parameter-value/#)
```
Here we added the `Parameter-value` tag to accommodate an actual substitute placeholder.
````

```{admonition} **When to extend:**
---
class: tip
---
**Extend when:**
- You REALLY need a tag that doesn't exist in the schema
- You need domain-specific terminology
- The extension preserves clear taxonomic relationships
- The parent tag allows extensions

**Don't extend when:**
- An existing tag already captures your meaning
- You're in the `Event` or `Agent` subtree
- You're trying to extend a value-taking node (has `#` child)
- The extension would create ambiguous taxonomy
```

## Choosing annotation detail level

The HED schema supports annotations at varying levels of detail. The appropriate level depends on your experimental design, analysis goals, and the complexity of your stimuli and tasks. More detail enables more sophisticated analyses but requires more annotation effort. Too little detail limits your analysis options. Too much detail wastes time and creates noise without adding analytical value. However, try to think beyond the immediate analysis that you plan and think of your data's potential.

### Annotation detail levels

#### Minimal annotation

**Purpose:** Basic event classification only\
**When to use:** Exploratory studies, simple designs, when fine-grained analysis isn't planned\
**Characteristics:**

- Event type classification (`Sensory-event`, `Agent-action`)
- Task role if applicable (`Experimental-stimulus`, `Participant-response`)
- No detailed stimulus properties

````{admonition} **Example:** Minimal annotation for a visual stimulus

```
Sensory-event, Experimental-stimulus, Visual-presentation, Circle
```

**What it captures:** A circle was presented as an experimental stimulus.

**What it doesn't capture:** Color, size, location, timing details.

**Sufficient when:** You only need to know when shapes appeared, not their specific properties.
````

#### Standard annotation

**Purpose:** Capture properties relevant to experimental manipulations\
**When to use:** Most experimental studies with specific hypotheses\
**Characteristics:**

- Event classification
- Task-relevant stimulus properties
- Agent-action-object structure for responses
- Properties that vary within your design

````{admonition} **Example:** Standard annotation for the same visual stimulus

```
Sensory-event, Experimental-stimulus, Target, Visual-presentation, (Red, Circle)
```

**What it captures:** A red circle target was presented.

**What it doesn't capture:** Size, exact location, luminance.

**Sufficient when:** Color and shape are manipulated variables, but size and location are constant or irrelevant to your hypotheses.
````

#### Detailed annotation

**Purpose:** Comprehensive description including context and precise properties\
**When to use:** Complex designs, data sharing, reanalysis potential\
**Characteristics:**

- Full event classification with qualifiers
- Complete stimulus properties (including constants)
- Spatial relationships
- Quantitative properties (size, timing, intensity)
- Contextual information

````{admonition} **Example:** Detailed annotation for the same visual stimulus

```
Sensory-event, Experimental-stimulus, Target, Expected, Visual-presentation,
((Red, Circle, Size/5 cm, Luminance/50 cd-m^2), (Center-of, Computer-screen))
```

**What it captures:** A red circle target of 5cm diameter with 50 cd/m² luminance appeared at screen center, and this was an expected stimulus.

**Sufficient when:** Precise properties matter for analysis, data will be shared, or you anticipate reanalysis questions you can't predict now.
````

### Decision guidelines for detail level

```{admonition} 🎯 Choose your detail level
---
class: tip
---
**Use MINIMAL annotation when:**
- Conducting exploratory or pilot studies
- Event timing is the primary variable of interest
- Stimulus properties are constant within each condition
- Quick annotation is a priority
- Example: "Did a shape appear?" is sufficient

**Use STANDARD annotation when:**
- Specific stimulus properties are experimental variables
- Task-relevant properties need to be distinguished
- Typical hypothesis-driven research
- Analyzing effects of manipulated variables only
- Example: "Which color and which shape appeared?"

**Use DETAILED annotation when:**
- Planning data sharing or publication to repositories
- Complex multi-factorial designs
- Anticipating exploratory reanalysis
- Quantitative properties affect neural responses
- Creating reference datasets
- Post-hoc questions about unmanipulated variables are likely
- Example: "Exactly what were all the physical properties?"

**Progressive annotation strategy:**
Start with STANDARD annotation during data collection. Add detail later if needed for specific analyses or data sharing. HED allows you to augment existing annotations without rebuilding from scratch.
```

### Consistency is crucial

```{admonition} Warning: Be consistent within your dataset
---
class: warning
---
All events of the same type in your dataset should the same annotation strategy and ideally, the same detail level. Inconsistent detail levels make data analysis unreliable and searches incomplete.
```

## Selecting the right Event tag

```{admonition} 🎯 Decision guide: Choosing Event tags
---
class: important
---
**KEY QUESTION: What is the primary nature of what happened?**

Every timeline event MUST have exactly one Event tag. Use this guide to select the correct one:

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
- Examples: "Task changes", "Difficulty increases", "Recording begins"

**Use `Experiment-procedure` when:**
- Experiment paused to administer something
- Involves the participant, recording may or may not continue
- Examples: "Questionnaire administered", "Mouth swab taken"

**Use `Experiment-structure` when:**
- Organizational boundary or marker
- Trial, block, or condition markers
- Examples: "Trial 5 begins", "Block 2", "Condition A starts"

**Use `Measurement-event` when:**
- A measurement is taken
- Instrument reading recorded
- Examples: "Temperature measured", "Pupil size recorded"
```

````{admonition} **Complete examples:** Event classification in context

**Target stimulus in oddball task:**
```
Sensory-event, Experimental-stimulus, Target, Auditory-presentation, (Tone, Frequency/1000 Hz)
```

**Standard (non-target) stimulus:**
```
Sensory-event, Experimental-stimulus, Non-target, Auditory-presentation, (Tone, Frequency/500 Hz)
```

**Participant button press:**
```
Agent-action, Participant-response, Correct-action, (Experiment-participant, (Press, (Left, Mouse-button)))
```

**Computed artifact:**
```
Data-feature, Incidental, (Eye-blink, Def/AutoDetected)
```

**Environmental noise:**
```
Sensory-event, Auditory-presentation, Mishap, (Environmental-sound, Label/Construction-noise)
```
````

### Selecting the right Task-event-role

```{admonition} 🎯 Decision guide: Choosing Task-event-role tags
---
class: important
---
**KEY QUESTION: What is the event's role from the participant's perspective?**

If your experiment has a task, each event SHOULD have a Task-event-role. Use this guide to select the correct one:

**Use `Experimental-stimulus` when:**
- Primary stimulus participant must detect, identify, or respond to
- The "target" or "non-target" in an attention experiment
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
- Might be unexpected.
- Example: The air-conditioner kicks on/off

**Use `Task-activity` when:**
- Marker of ongoing task activity period
- Indicates participant is engaged in continuous task
- Example: Start of free viewing period, beginning of imagery period

**Use `Mishap` when:**
- Unplanned occurrence affecting experiment
- Equipment failure, environmental disruption
- Example: Stimulus failed to display
```

````{admonition} **Complete examples:** Task-event-role in context

**Fixation cue:**
```
Sensory-event, Visual-presentation, (Cue, Label/Fixation-point), (White, Cross)
```

**Feedback on correct response:**
```
Sensory-event, Visual-presentation, (Feedback, Positive), (Green, Circle)
```

**Task instructions:**
```
Sensory-event, Visual-presentation, Instructional, (Textblock, Label/Press-left-for-red)
```
````

These examples show properly classified events. If they appear in annotations that include other information, there should be an outer set of parentheses around each event.

## Temporal annotation strategies

When events have duration or unfold over time, you can choose between two annotation strategies: using `Duration` for simple cases or using `Onset`/`Offset` for more complex temporal patterns. Both approaches are valid; choose based on your data structure and analysis needs.

### Strategy 1: Using Duration for ongoing events

Use `Duration` when you know the event's duration and want to capture it in a single annotation.

`````{admonition} **Example:** Encoding ongoing events using Duration

**Scenario:** A fixation cross appears and stays on screen for 1.5 seconds starting at 0.5 s from the start of the recording.

The events file is:

| onset | duration | event_type | cross_size |
|-------|----------|------------| ---------- |
| 0.5   | 1.5      | fixation   | 3          |

The HED annotation is:

```
(Duration/1.5 s, (Sensory-event, Visual-presentation, Cue, (Cross, Size/3 cm)))
```

One approach is to use the `HED` Column in the events file to code the annotation. An alternative is to use curly braces and use the sidecar templates. Usually the `duration column provides the anchor for the template when `Duration` is used to express ongoing events. The sidecar template is:

```json
{ 
  "duration": {
    "HED": "(Duration/# s", ({eventType}, {cross-size}))
  },
  "event_type": {
    "HED": {
      "fixation": "Sensory-event, Visual-presentation, Cue"
    }
  },
  "cross-size": {
    "HED": "(Cross, Size/# cm)"
  }
}
```

**Event:**
| onset | duration | event_type | cross_size |
|-------|----------|------------| ---------- |
| 0.5   | 1.5      | fixation   | 3          |


**Why use `Duration`:**
- Captures the information of an ongoing event in a single annotation.
- `Duration` is often of direct interest.
- Don't need any `Definition` anchors.
- Simpler when the event has a known duration at the start of the event.

### Strategy 2: Using Onset/Offset for ongoing events

Use `Onset` and `Offset` when events may interleave, have variable durations, or when you need to mark intermediate time points.

````{admonition} **Example:** Encoding ongoing events using `Onset` and `Offset`

**Scenario:** A fixation cross appears at 0.5 seconds. The duration is not necessarily known at initiation, but at 2.0 seconds, another marker is written that indicates the end of the display. This design is often used when items are presented for random amounts of time.

The events file is:

| onset | duration | event_type     | cross_size |
|-------|----------|----------------| ---------- |
| 0.5   | 'n/a'    | fixation_start | 3          |
| 2.0   | 'n/a'    | fixation_end   | 'n/a'      |


A JSON sidecar for this is:

```json
{
  "event_type": {
    "HED": {
      "fixation_start": "(Def/Fixation-point, (Sensory-event, Visual-presentation, Cue, {cross_size}), Onset)",
      "fixation_end": "(Def/Fixation-point, Offset)"
    }
  },
  "cross_size": {
    "HED": "Size/# cm"
  },
  "definitions": {
    "HED": {
      "fix_def":  "(Definition/Fixation-point)"
	}
  }
}
```

The annotation for the row with onset 0.5 s is:

```
(Def/Fixation-point, (Sensory-event, Visual-presentation, Cue, (Cross, Size/3 cm)), Onset)
```

indicating that a fixation cross was displayed starting at 0.5 seconds from the start of the recording. The annotation for the row with onset 2.0 is simply:

```
(Def/Fixation-point, Offset)
```

indicating that the fixation cross that started being shown at 0.5 s stops being
displayed at 2.0 s into the recording. The grouped content under `Onset` continues for the duration of the event.

**Why use `Onset`/`Offset`:**
- Temporal scope is explicit (the end of the event is an event marker)
- Can explicitly express complicated interleaving of events.
- Can use the anchor definitions content to shorten annotations.
- Can use the `Inset` mechanism to mark intermediate time points and features associated with that event.
- Better for events with variable or unpredictable durations.

Notice that the `Fixation-point` definition doesn't have any content in this example. We didn't put the `Sensory-event` and related tags in the definition itself in this case because we wanted to get the correct grouping with parentheses.

`````

```{admonition} Choosing between Duration and Onset/Offset
---
class: tip
---
**Use `Duration` when:**
- Event has a known, fixed duration at the time of annotation
- Duration is recorded in your data file
- Simplicity is preferred

**Use `Onset`/`Offset` when:**
- Duration is not known at the time the event begins
- You need to mark intermediate points with `Inset`
- You need to have an explicit marker in the file for the ending time
- Event timing is more complex
```

### Using Delay for response timing

The `Delay` tag is used to indicate that the event starts at a specified delay from the time of the event marker in which the annotation appears. This mechanism is often used when the information about an entire trial (i.e., both stimulus and response) are associated with a single time marker. In this case the annotation may contain multiple events -- some of which are delayed from the event marker time.

## Progressive complexity examples: Putting it all together

These examples show how to build increasingly complex annotations by progressively applying the rules you've learned. Each level references the specific rules being applied, demonstrating how they work together to create complete, semantically correct annotations.

```{admonition} How to use these examples
---
class: tip
---
These examples build on each other, showing the same stimulus with progressively more information:
- Level 1: Basic grouping and event classification ([Rule 1](#rule-1-group-objects-properties-together), [Rule 2](#rule-2-events-must-be-classified))
- Level 2: Adding task role ([Rule 2](#rule-2-events-must-be-classified) with Task-event-role)
- Level 3: Adding spatial, comparative and other relationships ([Rule 6](#rule-6-use-directional-pattern-for-relationships))
- Level 4: Adding temporal scope ([File type semantics](#temporal-scope-tags))

Each level is a valid annotation - choose the level of detail appropriate for your analysis needs.
```

### Level 1: Simple sensory event

````{admonition} **Example 1:** Basic stimulus (applies [Rule 1](#rule-1-group-objects-properties-together), [Rule 2](#rule-2-events-must-be-classified))

**Scenario:** A red circle appears

**Annotation:**
```
Sensory-event, Visual-presentation, (Red, Circle)
```

**Components:**
- Event type: `Sensory-event` (required by [Rule 2](#rule-2-events-must-be-classified))
- Modality: `Visual-presentation` (recommended in [Rule 2](#rule-2-events-must-be-classified))
- Stimulus: `(Red, Circle)` - properties grouped per [Rule 1](#rule-1-group-objects-properties-together)

**English:** "A visual sensory event presenting a red circle"
````

### Level 2: With task role

````{admonition} **Example 2:** Adding task context (adds Task-event-role from [Rule 2](#rule-2-events-must-be-classified), qualifier from [Rule 3](#rule-3-further-qualify-event-roles))

**Scenario:** A red circle target appears in a task

**Annotation:**
```
Sensory-event, Experimental-stimulus, Target, Visual-presentation, (Red, Circle)
```

**Components:**
- Event type: `Sensory-event` (required by [Rule 2](#rule-2-events-must-be-classified))
- Task-event-role: `Experimental-stimulus` (recommended in [Rule 2](#rule-2-events-must-be-classified))
- Task-stimulus-role: `Target`
- Modality: `Visual-presentation`
- Stimulus: `(Red, Circle)` - object properties grouped with task qualifier from [Rule 3](#rule-3-further-qualify-event-roles)

**English:** "A sensory event that is an experimental target stimulus consisting of the display of a red circle"
````

### Level 3: With spatial information

````{admonition} **Example 3:** Adding location

**Scenario:** A red circle target appears on the left of the computer screen

**Annotation:**
```
Sensory-event, Experimental-stimulus, Target, Visual-presentation, 
((Red, Circle), (Left-side-of, Computer-screen))
```

**Components:**
- Event type: `Sensory-event`
- Task-event-role: `Experimental-stimulus`
- Task-stimulus-role: `Target`
- Modality: `Visual-presentation`
- Stimulus: `(Red, Circle)` - one grouped object with properties
- Location: `(Left-side-of, Computer-screen)` - spatial relationship (uses [Rule 6](#rule-6-use-directional-pattern-for-relationships) pattern)

**English:** "An experimental stimulus sensory event presenting a red circle target on the left side of the computer screen"
````

### Level 4: With duration

````{admonition} **Example 4:** Event with duration (adds temporal scope from [Rule 8](#rule-8-reserved-tags-have-special-syntax))

**Scenario:** A red circle target appears on the left and stays visible for 2 seconds

**Annotation:**
```
(Duration/2 s, (Sensory-event, Experimental-stimulus, Target, Visual-presentation,
((Red, Circle), (Left-side-of, Computer-screen))))
```

**Components:**
- Temporal scope: `Duration/2 s` - reserved tag from [Rule 8](#rule-8-reserved-tags-have-special-syntax)
- Event type: `Sensory-event` (required by [Rule 2](#rule-2-events-must-be-classified))
- Task-event-role: `Experimental-stimulus`
- Modality: `Visual-presentation`
- Content: `((Red, Circle), (Left-side-of, Computer-screen))` - combines grouping ([Rule 1](#rule-1-group-objects-properties-together)) and relationships ([Rule 6](#rule-6-use-directional-pattern-for-relationships))

**English:** "An experimental stimulus sensory event consisting of the presentation of a red circle target on the left of the computer screen is displayed for 2 seconds."
````

## Common annotation mistakes

Before finalizing your annotations, review these common mistakes and how to fix them:

````{admonition} **Mistake 1:** Forgetting to group object properties
---
class: warning
---
**Wrong:**
```
Sensory-event, Visual-presentation, Red, Circle
```

**Problem:** Cannot definitively determine that red and circle describe the same object. Violates **Rule 1**.

**Correct:**
```
Sensory-event, Visual-presentation, (Red, Circle)
```
````

````{admonition} **Mistake 2:** Missing Event classification
---
class: warning
---
**Wrong:**
```
Visual-presentation, (Red, Circle)
```

**Problem:** No Event tag. Every timeline event must have an Event type. Violates **Rule 2**.

**Correct:**
```
Sensory-event, Visual-presentation, (Red, Circle)
```
````

````{admonition} **Mistake 3:** Missing Task-event-role for task events
---
class: warning
---
**Wrong:**
```
Sensory-event, Visual-presentation, (Red, Circle)
```

**Problem:** If this is a task stimulus, it needs a task role. Violates **Rule 2**.

**Correct:**
```
Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle)
```
````

````{admonition} **Mistake 4:** Incorrect agent-action structure
---
class: warning
---
**Wrong:**
```
Agent-action, Experiment-participant, Press, Mouse-button
```

**Problem:** Cannot determine who did what. Did the participant press or did the mouse-button press? Violates **Rule 4**.

**Correct:**
```
Agent-action, (Experiment-participant, (Press, Mouse-button))
```
````

````{admonition} **Mistake 5:** Incorrect relationship structure
---
class: warning
---
**Wrong:**
```
(Red, Circle, To-left-of, Green, Square)
```

**Problem:** The relationship direction is ambiguous. Violates **Rule 6**.

**Correct:**
```
((Red, Circle), (To-left-of, (Green, Square)))
```
**Meaning:** Red circle is to-left-of green square.
````

````{admonition} **Mistake 6:** Grouping unrelated concepts
---
class: warning
---
**Wrong:**
```
(Red, Press, Circle)
```

**Problem:** Red and Circle may be related, but Press is an action, not a visual property. Violates **Rule 7**.

**Correct:**
```
(Sensory-event, Visual-presentation, (Red, Circle)), 
(Agent-action, Participant-response, (Experiment-participant, Press))
```
````

````{admonition} **Mistake 7:** Using Event tags in descriptor files
---
class: warning
---
**Wrong (in participants.tsv):**
```
Sensory-event, Age/25 years
```

**Problem:** Descriptor files describe properties, not events. See **File type semantics**.

**Correct:**
```
Age/25 years
```
````

````{admonition} **Mistake 8:** Over-extending from general tags
---
class: warning
---
**Wrong:**
```
Item/House
```

**Problem:** Too general. House has more specific parents in the schema. Violates **Rule 9**.

**Correct:**
```
Building/House
```
Extend from the most specific applicable parent.
````

````{admonition} **Mistake 9:** Forgetting curly braces for multi-column assembly
---
class: warning
---
**Wrong sidecar:**
```json
{
  "event_type": {
    "HED": {"visual": "Sensory-event, Visual-presentation"}
  },
  "color": {"HED": {"red": "Red"}},
  "shape": {"HED": {"circle": "Circle"}}
}
```

**Assembled result:**
```
Sensory-event, Visual-presentation, Red, Circle
```

**Problem:** Red and Circle aren't grouped. Violates **Rule 5**.

**Correct sidecar:**
```json
{
  "event_type": {
    "HED": {"visual": "Sensory-event, Visual-presentation, ({color}, {shape})"}
  },
  "color": {"HED": {"red": "Red"}},
  "shape": {"HED": {"circle": "Circle"}}
}
```

**Assembled result:**
```
Sensory-event, Visual-presentation, (Red, Circle)
```
````

## Best practices checklist

Use this checklist before finalizing your annotations:

```{admonition} **Checklist:** Creating semantically correct HED annotations
---
class: tip
---
**✓ Grouping**
- [ ] Stimulus properties grouped: `(Red, Circle)` not `Red, Circle`
- [ ] `Agent-action` uses nested structure: `((agent), (action, object))`
- [ ] `Event` tag NOT inside property groups (keep at top level)
- [ ] Unrelated concepts NOT grouped together

**✓ Event Classification**
- [ ] Every timeline event has `Event` tag
- [ ] Every timeline event has `Task-event-role` tag (when applicable)
- [ ] Proper tag order: Event, Task-event-role, Task-stimulus-role, Sensory-modality, details
- [ ] `Sensory-event` includes `Sensory-modality` tag

**✓ File Type**
- [ ] Timeline files: `Event` tag present
- [ ] Descriptor files: NO `Event` tags
- [ ] Timeline files only: `Onset`/`Offset`/Inset if needed
- [ ] Descriptor files: NO temporal tags (`Duration` is allowed but interpreted as a description)

**✓ Assembly**
- [ ] Curly braces used for complex grouping (in sidecar)
- [ ] `#` placeholder for numeric values -- units allowed if `#` tag has a `unitClass`
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
- [ ] Units provided where needed and allowed

**✓ Semantics**
- [ ] Annotation translates to coherent English (reversibility test)
- [ ] No ambiguity in interpretation
- [ ] Makes sense in context
- [ ] Consistent structure across similar events

**✓ Style**
- [ ] Multi-word tags use hyphen to separate
- [ ] Consistent capitalization throughout (leading word capitalized)
- [ ] Standard spacing (space after comma)
- [ ] No extra spaces inside parentheses
```

## Summary

Creating semantically correct HED annotations requires understanding:

1. **The reversibility principle** - Your annotations should translate back to coherent English
2. **Semantic grouping rules** - Parentheses bind tags that describe the same entity
3. **Event classification** - Every event should have both `Event` and `Task-event-role` tags
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

Available tools:

- [**HED online tools**](https://hedtools.org/hed) - Fairly complete set of tools for a single tsv and json files.
- [**HED browser-based validation**](https://www.hedtags.org/hed-javascript) - validate an entire BIDS dataset -- all local, no installation
- [**HED extension for NWB**](https://github.com/hed-standard/ndx-hed) - incorporates HED into Neurodata Without Borders datasets.
- [**HED python tools**](https://github.com/hed-standard/hed-python) - comprehensive set of tools for HED in Python.
- [**HED matlab tools**](https://github.com/hed-standard/hed-matlab) - HED interface in MATLAB
