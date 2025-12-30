# HED-LSP

HED-LSP is a VsCode extension that provides intelligent editing support for [HED (Hierarchical Event Descriptors)](https://www.hedtags.org) annotations in JSON sidecar files. It offers:

- **Validation** - Real-time error detection for invalid HED strings
- **Autocomplete** - Schema-aware tag suggestions with semantic search
- **Hover** - Tag descriptions and documentation on hover
- **Diagnostics** - Inline error messages with HED error codes

## Documentation index

| Document                                                                                     | Description                                             |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Architecture](https://github.com/hed-standard/hed-lsp/blob/main/docs/architecture.md)       | Overall system design and component interaction         |
| [Completion system](https://github.com/hed-standard/hed-lsp/blob/main/docs/completion.md)    | How autocomplete works, including trigger logic         |
| [Semantic search](https://github.com/hed-standard/hed-lsp/blob/main/docs/semantic-search.md) | Dual-embedding architecture for intelligent suggestions |
| [Extending](https://github.com/hed-standard/hed-lsp/blob/main/docs/extending.md)             | How to add new keywords and customize behavior          |
