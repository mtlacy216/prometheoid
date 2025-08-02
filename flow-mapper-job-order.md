# Stackable & Chained E.O. Flows System

**Client:** Emergent Ontology Platform  
**Project Module:** Flow Process Mapper — E.O. Stackable Flows & Chained Operators  
**Authorizing Lead:** E.O. Miranda  
**Priority:** High  
**Start:** Immediate  
**Delivery Phases:** Modular (see Milestones)

## Objective

Extend the existing Flow Mapper tool to support:

1. **Stackable flows** using triadic role logic (INS, P, REC)
2. **Operator chaining** with visible sequencing and transitions
3. **Pattern promotion** from inline operator to reusable flow node
4. **Recursive use of resolved flows as role-fillers (holons)**

## Background

The platform currently models single SPO flows with operator-based connections. However, full E.O. mapping requires:

- Triadic closure across *multiple* flows (stacking)
- Sequential operator logic across flows (chaining)
- Internalization of patterns as flows when they stabilize (promotion)
- Recursion, re-entry, and structural emergence (holons → roles)

This order implements those capacities while preserving UI clarity, system coherence, and semantic traceability.

## Features to Implement

### 1. Flow-as-Role (Recursive Reference System)

- Add ability to embed one resolved flow (ID) as a **role filler** in another flow
- Each role slot (INS / P / REC) accepts:

  ```json
  { "type": "inline", "value": "Manager" }
  { "type": "flow", "reference": "flow-42" }
  ```
- Render referenced flow’s label/phasepost inline; expandable on hover

### 2. Triadic Stacking Logic

- Add **stack ports** (top/bottom) to each flow
- Enable user to drag and stack flows vertically
- Prompt user to select which role (Subject, Pattern, Object)
- Auto-detect when a valid SPO triad is formed
- Visually mark:
  - ✅ Complete Triad (glowing triangle badge)
  - ⚠️ Incomplete Stack (ghost triangle + tooltip)

### 3. Operator Cascade Paths

- Allow users to link flows with **multi-operator chains**:
  - Render arrows with embedded operator glyphs (⊡ ⟳ ∨ etc.)
  - Animate sequential transitions on user toggle
- Support notation: `Flow A ⊡ Flow B ⟳ Flow C ∨ Flow D`

### 4. Promote Operator to Pattern Flow

- Right-click on operator connection → “Promote to Flow”
- Convert connection into new flow node with:
  - Type: Pattern
  - Editable SPO substructure
- Maintain original connections as links to new flow

### 5. Holon Detection & Phasepost Scoring

- Compute `[I, S, T]` phasepost for each flow
- If `[μ, √2, τ]`, tag flow as “Holon”
- Show small badge with phasepost
- Filter view: “Show only holons,” “Show unstable flows”

### 6. Collapse Triad into Composite Flow

- Allow user to **select 3 flows** forming a valid SPO triad
- Collapse into single holon-node
- Maintain expand/collapse toggle
- Support recursion as new role-filler

## UI/UX Requirements

- Visually distinct icons/ports for subject, object, pattern roles
- Hover interactions for embedded flow previews
- Ghost graphics for incomplete stacks (e.g. faded triangle, dashed outlines)
- Mini-phasepost badges on each flow card
- Drag-and-drop guidance for role assignments
- Tidy auto-layout toggle for stacked flows
- Flow filters by operator, role, phasepost status

## Logic & System Requirements

- Triadic validation engine: Ensure stacking resolves full SPO
- Operator validator: Check if operator matches connection semantics
- Recursive loop detection: Prevent infinite nesting unless intended
- Role dependency map: Trace which flows are used as inputs elsewhere
- Optional: Save stack-chains as reusable templates

## Milestones & Phases

### Phase 1 — Role Embedding & Stacking Logic

- [ ] Flow-as-role references
- [ ] Stack ports + triad detection
- [ ] Ghost markers for incomplete triads

### Phase 2 — Operator Chaining & Promotion

- [ ] Operator cascade path visualization
- [ ] Promote operator → pattern flow
- [ ] Inline operator to flow conversion UI

### Phase 3 — Holon Tagging & Phasepost View

- [ ] Phasepost scoring system
- [ ] Holon tagging logic
- [ ] Phasepost filters and overlays

### Phase 4 — Collapsible Triads & Final Polish

- [ ] Triad-to-holon collapse system
- [ ] Expandable flow previews
- [ ] Performance tuning for large graphs

## QA & Testing

- Each operator path tested for visual + semantic correctness
- Phasepost values verified with sample patterns
- Recursion and collapse tested for depth ≤ 3
- UI feedback tuned for first-time modelers and advanced users

## Acceptance Criteria

- All flows can be stacked, chained, or promoted per E.O. rules
- Holons can be reused as roles in other flows
- Operators and patterns are interchangeable where appropriate
- Visuals clearly communicate state: resolved, protogon, emanon
- UI affordances feel natural, minimal, powerful

## Deliverables

- Updated HTML/CSS/JS codebase
- Pattern recognition and triadic inference engine
- User guide for stacking, chaining, and promotion
- Optional: Sample E.O. cascade (e.g. Crystallization pattern flow)

