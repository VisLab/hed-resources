# Brief history of HED

Hierarchical Event Descriptors (HED) has evolved through three major generations since its inception in 2010, each representing significant advances in annotation capability and user experience.

## HED generation 1 (2010-2016)

**Versions: \< 4.0.0**

The first version of HED was proposed and developed by Nima Bigdely-Shamlo in 2010 as part of his PhD thesis under the supervision of Scott Makeig and Kenneth Kreutz-delgado at the Swartz Center for Computational Neuroscience (SCCN), UCSD. The system was created to support event annotation in HeadIT, an early public repository for EEG data (Bigdely-Shamlo et al. 2013).

HED Generation 1 was organized around a single event hierarchy with root *Time-Locked Event* and immediate children *Stimulus* and *Response*. This initial design provided a foundation for structured event annotation but was limited in scope and flexibility.

## HED generation 2 (2016-2021)

**Versions: 4.0.0 to 7.x.x**

In 2010, the Army Research Laboratory began funding a multi-institution neuroergonomics project focused on instrumenting the brain and body at work (ARL W911NF-10-2-0022). This project included development of the [**https://cancta.net**](https://cancta.net) repository for data collected using the standardized [**EEG Study Schema (ESS)**](https://www.nitrc.org/projects/ess/) format to enable data sharing and cross-study analysis.

Recognizing the need for greater vocabulary flexibility, a working group led by Kay Robbins of the University of Texas San Antonio redesigned HED to accommodate annotation of more diverse datasets. The key innovation was reorganizing HED as an orthogonal sub-tag system rather than a single hierarchy. HED Generation 2 was first released in 2016 and iteratively improved over several years, with validators and online tools developed to support adoption.

A major milestone occurred in 2019 when the [BIDS (Brain Imaging Data Structure)](https://bids.neuroimaging.io/) standards group incorporated HED as an annotation mechanism, significantly expanding its reach in the neuroimaging community.

## HED generation 3 (2021-present)

**Versions: 8.0.0+**

Work began in 2019 on a fundamental rethinking of HED vocabulary design, culminating in the release of HED Generation 3 in August 2021. This generation represents a dramatic increase in annotation capacity and significant simplification of the user experience.

```{admonition} **Key innovations in HED Generation 3**
---
class: tip
---
1. **Improved vocabulary structure** - More intuitive organization and expanded coverage
2. **Short-form annotation** - Simplified syntax for common use cases
3. **Library schema** - Domain-specific extensions to the core vocabulary
4. **Definitions** - Reusable annotation patterns with placeholders
5. **Temporal scope** - Enhanced representation of time-based relationships
6. **Encoding of experimental design** - Better support for complex experimental structures

```

HED Generation 3 is currently maintained and developed by the HED Working Group led by Kay Robbins, Scott Makeig, and Yahya Shirazi with key contributors including Dung Truong, Monique Denissen, Dora Hermes Miller, and Arnaud Delorme.

## Funding and support

HED development has been supported by multiple funding sources across its evolution:

- **Generation 1**: The Swartz Foundation and NIH grants R01-MH084819 (Makeig, Grethe PIs) and R01-NS047293 (Makeig PI)
- **Generation 2**: The Cognition and Neuroergonomics Collaborative Technology Alliance (CaN CTA) program of U.S Army Research Laboratory (ARL) under Cooperative Agreement W911NF-10-2-0022
- **Generation 3**: NIH grant [**RF1-MH126700**](https://reporter.nih.gov/project-details/10480619).

## Community and participation

HED is an open research community effort. Researchers and developers interested in contributing are invited to participate.
Visit the [**HED project homepage**](https:/www.hedtags.org)for links to the latest developments.

For questions, email: hed.maintainers@gmail.com or post an issue at [**hed-issues**](https://hed-standard/hed-schemas/issues).
