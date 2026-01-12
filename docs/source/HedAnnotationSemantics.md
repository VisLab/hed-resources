# HED annotation semantics

This tutorial explains how to create HED annotations that are semantically meaningful, unambiguous, and machine-actionable. Understanding HED annotation semantics is essential for creating annotations that accurately represent what happened during an experiment and can be correctly interpreted by both humans and computers.

## What are HED annotation semantics?

HED annotation semantics refers to the **meaning** conveyed by HED annotations. A HED annotation consists of tags selected from the HED vocabulary (schema), optionally grouped using parentheses, that together describe events, stimuli, actions, and other aspects of an experiment.

The semantic interpretation of a HED annotation depends on:

1. **Which tags are selected** - Each tag has a specific meaning in the HED vocabulary
2. **How tags are grouped** - Parentheses bind tags that describe the same entity or relationship
3. **Where tags are placed** - Top-level vs. nested grouping affects interpretation
4. **The context of use** - Whether the annotation appears in a timeline file vs. descriptor file

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
 Sensory-event, Experimental-stimulus, Visual-presentation, 
((Green, Triangle, Target), (Center-of, Computer-screen))
```

**English Translation:**
"A sensory event that is an experimental stimulus consists of a visual presentation of a green triangle target that appears at the center of the computer screen."

**Why it works:**
- Each group describes a single entity or relationship
- The overall structure tells a coherent story
- `Sensory-event` indicates this is a sensory presentation
- `Experimental-stimulus` indicates the role in the task
- `Visual-presentation` specifies the modality
- `(Green, Triangle, Target)` - grouped properties describe ONE object
- `(Center-of, Computer-screen)` - spatial relationship
- The outer grouping `((Green, Triangle, Target), (Center-of, Computer-screen))` connects the object to its location
````

**Note:** Unless otherwise indicated (by HED tags), a HED annotation reflects the perspective of the experiment participant. Thus the sensory event is as perceived by the subject of the experiment.

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
- Missing both `Event` classification and `Task-event-role`
````

## Semantic grouping rules

Parentheses in HED annotations are not decorative—they carry semantic meaning. Tags within a group are semantically bound and work together to describe one thing. Tags outside the group describe different aspects or entities. Since HED annotations are unordered, parentheses are key for this binding. Remember that HED vocabularies maintain a strict taxonomical or is-a relationship of child tags to parents. When we say `Event` tag, we mean `Event` or any tag that is a descendent of `Event` in the HED vocabulary hierarchy.

### Rule 1: Group object's properties together

Tags describing properties of the same object MUST be grouped together:

````{admonition} **Example:** Correct object grouping

```
(Red, Circle)
```
**Meaning:** A single object that is both red AND circular.
````

Without grouping the meaning can be ambiguous:

````{admonition} **Example:** Not grouped (ambiguous)
```
Red, Circle
```
**Possible meanings:**
1. A red circle (most likely interpretation)
2. Something red AND separately something circular (could be two different things)
3. Redness AND circularity as independent properties

````

If an item has multiple properties, they should all be grouped together:

````{admonition} **Example:** Grouping of multiple object properties

```
(Green, Triangle, Large)
```
**Meaning:** A single object that is green, triangular, and large.
````

Without grouping, these three properties that may or may not apply to the same object.

### Rule 2: Events must be defined

Event files are tabular files that associate annotations with points on the experimental time line. Each row in such a tabular file can represent one or more "events" (or markers in an ongoing event process).

```{admonition} Event tags are the anchors for event annotations.
---
class: tip
---
**Rules for annotating an event:**
  - All the tags in the annotation are assumed to describe that event. 
  - It should have exactly one tag from the `Event` tag hierarchy. 
  - Each event annotation should be in a separate group unless this is the only event at that time marker.
```

The `Event` tags are:

- `Sensory-event`
- `Agent-action`
- `Data-feature`
- `Experiment-control`
- `Experiment-procedure` ` `Experiment-structure\`
- `Measurement-event`

````{admonition} **Example: A row annotation with a unique time marker represents a single "event"**

```
Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle), (Green, Square)
```
**Meaning:** The event is a sensory event (from the perspective of the experiment participant) which is an experimental stimulus consisting of the simultaneous presentation of a red circle and a green square.
````

A single top-level `Event` tag is assumed to represent an event that includes all of the rest of the tags in the annotation. The sensory event in the example is an experimental stimulus (something that the participant will need to act on has part of the experiment's task). This is the most common method of annotating events.

If a single row annotation contains multiple events, the tags relevant to each event must be separately grouped in parentheses.

````{admonition} **Example:** A row annotation represents multiple sensory "events".

Consider the following row in an events table:

| onset | duration | visual_type   | auditory-type |
| ----- | -------- | ------------- | ------------- |
| 104.5 |  'n/a'   |  show_circle  | sound_green   |

The annotations for each element are concatenated to form the following annotation:

```
(Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle)), 
(Sensory-event, Experimental-stimulus, Auditory-presentation, (Word, Label/Green))
```
**Meaning:** The annotation  (from the perspective of the experiment participant) consists of two simultaneous sensory events -- a red circle (usually assumed to be displayed on the computer screen if no other information is present) and a spoken word "Green". This type of annotation often occurs in congruence experiments or attention shifting experiments.

````

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

Consider the following row in an events table:

| onset | duration | stimulus | responseTime |
| ----- | -------- | -------- | ------------ |
| 104.5 |  'n/a'   |  circle  |   0.250      |

At time 104.5 seconds into the experiment a circle is presented on the computer screen, and the particiant takes 0.250 seconds to push a button in response to the presentation. This situation could be annotated as:

```
(Sensory-event, Experimental-stimulus, Visual-presentation, Circle),
(Delay/0.250 s, (Agent-action, Participant-response, (Experiment-participant, (Push, Push-button))))
```

**Meaning:** 
This annotation represents two separate events:
- An experimental stimulus that is the visual presentation of a circle (assumed to be on the screen) at time 104.5 seconds from the start of the experiment.
- A participant response consisting of the experiment participant pushing the button at 104.750 seconds from the start of the experiment

````

### Rule 3: Events should be further classified

While the `Event` tags form the anchor for event-related annotations, it is crucial to include the additional event modifiers in the annotation.

#### Rule 3a: Use Task-event-role if there is a task

If an experiment involves a task, each event should be associated with a `Task-event-role`. These event classification tags should typically be in the same group as the event.

````{admonition} **Example:** Top-level placement of Event and Task-event-role tags

```
Sensory-event, Experimental-stimulus, Visual-presentation, (Red, Circle), (Green, Triangle)
```
**Meaning:** The event is a sensory event that is an experimental stimulus.
````

An experiment may participant experience many sensory events during the course of the experiment including task stimuli, cues, and extraneous sounds. If a particular sensory event is not related to the task, its role is usually `Incidental`.

Similarly, a participant response may not conform to the parameters of the task. Use the `Mishap` tag or the `Incidental` tag to annotate.

#### Rule 3b: Experimental-stimulus needs Task-stimulus-role

Tags from the `Task-stimulus-role` hierarchy provide important information about the task. For example, tags such as `Penalty` or `Reward` are often used to modify the `Feedback` role. If the annotation contains an `Experimenal-stimulus` tag, always see whether any tags from `Task-stimulus-role` are appropriate.

#### Rule 3b: Participant-response needs Task-action-type

Tags from the `Participant-response` hierarchy provide important information about the nature of the participant's response. The most common modifiers are `Correct-action` and `Incorrect-action`, but there are many other descriptors in the `Task-action-type` hierarchy. If the annotation contains a `Participant-response` tag, always see whether any tags from the `Task-action-type` are appropriate.

### Rule 4: Sensory-event should have Sensory-modality

If the event is a `Sensory-event`, a `Sensory-modality` tag (e.g., `Visual-presentation` or `Auditory-presentation`) SHOULD be be able to be associated unambiguously with what is being presented.

Events involving multiple sensory modalities may or may not be treated as separate events, depending on the underlying intent. The examples under Rule 2 illustrate different cases.

### Rule 5: Nest agent-action-object

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

### Rule 6: Use curly braces for assembly control

```{admonition} **Use curly braces to achieve proper grouping**
---
class: tip
---
When multiple columns or sources contribute properties of the same entity, curly braces control how the annotations are assembled by allowing you to specify a template.
```

Without curly braces annotations for each column in a row of a tabular file are concatenated to form an assembled annotation for the row. We assume that the annotations go in a JSON sidecar for BIDS (or a `Meanings` table) for NWB. The following examples annotate an events file of which the following is an excerpt:

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

The alternative to using sidecars for annotations is to create a HED column in the tabular file. However this requires an individual annotation for each row, while the sidecar

### Rule 7: Use directional pattern for relationships

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
Sensory-event, Experiment-stimulus, Visual-presentation, ((Cross, White, Size), (Greater-than, (Circle, Red, Size)))
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

### Rule 8: Keep independent concepts separate

Tags that describe independent aspects or unrelated concepts should NOT be grouped together. Don't group tags with no semantic relationship.

```{admonition} Examples of incorrect grouping

- `(Red, Press)` - Color and action are unrelated
- `(Triangle, Mouse-button)` - Stimulus shape and response device are unrelated
- `(Green, Response-time)` - Color and temporal measure are unrelated
```

### Rule 9: Reserved tags have special syntax

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
  - `(Event-context, (...), (...))`
  - * Should only be created by tools
    * Must be a top-level tag group
    * Keeps track of ungoing events at intermediate time points
```

### Rule 10: Extend tags carefully

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
Here we added the `Paramter-value` tag to accommodate an actual substitute placeholder.
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

## Selecting the right Event tag

```{admonition} **Decision guide:** Choosing Event tags
---
class: tip
---
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

### Selecting the right Task-event-role

```{admonition} **Decision guide:** Choosing Task-event-role tags
---
class: tip
---
**Question: What is the event's role from the participant's perspective?**

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

### Complete event annotation examples

````{admonition} Example:Target stimulus in oddball task

```
Sensory-event, Experimental-stimulus, Auditory-presentation, Target, (Tone, Frequency/1000 Hz)
```
````

````{admonition} Example: Standard (non-target) stimulus
```
Sensory-event, Experimental-stimulus, Auditory-presentation, Non-target, (Tone, Frequency/500 Hz)
```
````

````{admonition} Example: Participant button press
```
Agent-action, Participant-response, Correct-action, (Experiment-participant, (Press, (Left, Mouse-button)))
```
````

````{admonition} Example: Feedback on correct response
```
Sensory-event,  Visual-presentation, (Feedback, Positive), (Green, Circle)
```
````

````{admonition} Example: Fixation cue
```
Sensory-event, Visual-presentation, (Cue, Label/Fixation-point), (White, Cross)
```
````

````{admonition} Example: Task instructions
```
Sensory-event, Visual-presentation, Instructional, (Textblock, Label/Press-left-for-red)
```
````

````{admonition} Example: Environmental noise
```
Sensory-event, Auditory-presentation, Mishap, (Environmental-sound, Label/Construction-noise)
```
````

````{admonition} Example: Computed artifact
```
Data-feature, Incidental, (Eye-blink, Def/AutoDetected)
```
````

These examples show a single event and the items may or may not be grouped with additional task role tags as long as the interpretation is unambiguous. If they appeared in annotation that included other information, there should be a set of outer parentheses around each of them.

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
- ✓ Different experimental roles (different `Task-event-role`)
- ✓ Analysis requires modality separation
- ✓ Could occur independently

**Either approach acceptable when:**
- ≈ Different modalities but coordinated content (e.g., feedback with sound + image)
- ≈ Same semantic content in different forms (e.g., hear + see word)
- ≈ Functionally related but separable components
- ≈ Both interpretations are scientifically valid

**Consistency Principle:** Whatever approach you choose, use it consistently throughout your dataset. Document your decision in your data.
```

## File type semantics

The semantic requirements for HED annotations depend on whether they appear in timeline files (e.g., `events.tsv`) or descriptor files (e.g., `participants.tsv`).

### Timeline files require Event tags

Timeline files have timestamps indicating when things happen. (In BIDS format this is a `.tsv` file with an `onset` column, while in NWB format it is a `DynamicTable` type with a time-stamp of some sort.) Every annotation in a timeline file MUST include an `Event` type tag.

````{admonition} **Example:** Correct timeline file annotation (BIDS)

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
- Includes Task-event-role (`Experimental-stimulus`)
- Includes `Event` tag (`Sensory-event`)
- Specifies modality (`Visual-presentation`)
- Properly groups stimulus properties
````

### No Event tags in descriptor files

Descriptor files (e.g., `participants.tsv`, `samples.tsv`) describe properties or characteristics, not events. `Event` tags should not appear in descriptor files.

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
- No temporal tags (`Onset`/`Offset`)
- Semantically appropriate for descriptor context
````

### Temporal scope tags

Temporal scope tags (`Onset`, `Offset`, `Inset`, and `Delay`) are ONLY for timeline files and indicate the time course of events. `Duration` can be used in either type of file but cannot be used with `Onset`, `Offset`, and `Inset`, which are associated with explicit time point markers in the event files, while `Duration` represents something starting at the current time and extending for a specified amount of time from that point.

`````{admonition} **Example:** Encoding ongoing events using Duration

**Scenario:** A fixation cross appears and stays on screen for 1.5 seconds

**Sidecar:**
```json
{ 
  "duration": {
    "HED": "Duration/# s"
  },
  "event_type": {
    "HED": {
      "fixation": "({duration}, (Sensory-event, Visual-presentation, Cue, (Cross, {cross-size})))"

    }
  },
  "cross-size": {
    "HED": "Size/# cm"
  }
}
```

**Event:**
| onset | duration | event_type | cross_size |
|-------|----------|------------| ---------- |
| 0.5   | 1.5      | fixation   | 3          |

**Assembled result:**
```
"(Duration/1.5 s, (Sensory-event, Visual-presentation, Cue, (Cross, Size/3 cm)))"
```
This indicates that a fixation cross was displayed starting at 0.5 seconds from the start of the recording (as indicated by the value in the `onset` column). The display continues for 1.5 seconds as indicated by the `duration` column.  All of the information is encoded in a single annotation.

**Why use `Duration`:**
- Captures the information of an ongoing event in a single annotation.
- Duration is often of direct interest.
- Don't need any `Definition` anchors.

````{admonition} **Example:** Encoding ongoing events using `Onset` and `Offset`

**Scenario:** A fixation cross appears and stays on screen for 1.5 seconds

**Sidecar:**
```json
{
  "event_type": {
    "HED": {
      "fixation_start": "(Def/Fixation-point, (Sensory-event, Visual-presentation, Cue, (Cross,{cross_size})), Onset)",
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

**Event:**
| onset | duration | event_type     | cross_size |
|-------|----------|----------------| ---------- |
| 0.5   | 'n/a'    | fixation_start | 3          |
| 2.0   | 'n/a'    | fixation_end   | 'n/a'       |

**Assembled results:**
```
(Def/Fixation-point, (Sensory-event, Visual-presentation, Cue, (Cross, Size/3 cm)), Onset)
```
This indicates that a fixation cross was displayed starting at 0.5 seconds from the start of the recording at time 0.5.

```
(Def/Fixation-point, Offset)
```
This indicates that the fixation cross that started being shown at 0.5 s stops being
displayed at 2.0 s into the recording. The grouped content under `Onset` continues for the duration of the event.

**Why use `Onset`:**
- Temporal scope is explicit (the end of the event is an event marker)
- Can explicitly express complicated interleaving of events.
- Can use the anchor definition content to shorten annotations.
- Can use the `Inset` mechanism to mark intermediate time points and features.

Notice that the `Fixation-point` definition doesn't have any content in this example. We didn't put the `Sensory-event` and related tags in the definition itself in this case because we wanted to get the correct grouping with parentheses.

`````

The `Delay` tag is used to indicate that the event starts at a specified delay from the time of the event marker in which the annotation appears. This mechanism is often used when the information about an entire trial (i.e., both stimulus and response) are associated with a single time marker. In this case the annotation may contain multiple events -- some of which are delayed from the event marker time.

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
(Duration/2 s, (Experimental-stimulus, Sensory-event, Visual-presentation, Target,
((Red, Circle), (Left-side-of, Computer-screen))))
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
- [ ] `Agent-action` uses nested structure: `((agent), (action, object))`
- [ ] `Event` tag NOT inside property groups (keep at top level)
- [ ] Unrelated concepts NOT grouped together

**✓ Event Classification**
- [ ] Every timeline event has `Event` tag
- [ ] Every timeline event has `Task-event-role` tag (when applicable)
- [ ] `Event` and `Task-event-role` tags at top level or grouped together
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
- [ ] Units provided where needed andallowed

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
