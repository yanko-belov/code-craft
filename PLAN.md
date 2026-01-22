# Code Craft - Development Plan

## Summary

A collection of discipline-enforcing skills that help AI coding agents write better code by following software engineering best practices.

## Completed Skills (32 total) ✅

### SOLID Principles (5) ✅
- [x] Single Responsibility Principle
- [x] Open/Closed Principle
- [x] Liskov Substitution Principle
- [x] Interface Segregation Principle
- [x] Dependency Inversion Principle

### Core Principles (6) ✅
- [x] DRY (Don't Repeat Yourself)
- [x] YAGNI (You Ain't Gonna Need It)
- [x] KISS (Keep It Simple)
- [x] Composition over Inheritance
- [x] Law of Demeter
- [x] Fail Fast

### Testing (3) ✅
- [x] TDD (Test-Driven Development)
- [x] Test Isolation
- [x] AAA Pattern (Arrange-Act-Assert)

### Security (3) ✅
- [x] Input Validation
- [x] Secrets Handling
- [x] Auth Patterns

### API Design (4) ✅
- [x] REST Conventions
- [x] Error Responses
- [x] Idempotency
- [x] API Versioning

### Performance (3) ✅
- [x] N+1 Prevention
- [x] Lazy Loading
- [x] Caching

### Code Quality (3) ✅
- [x] Separation of Concerns
- [x] Encapsulation
- [x] Immutability

### Error Handling (2) ✅
- [x] Exception Hierarchies
- [x] Error Boundaries

### Concurrency (2) ✅
- [x] Race Conditions
- [x] Deadlock Prevention

### Meta (1) ✅
- [x] Skill Awareness (usage tracking across sessions)

## All Skills Complete

All planned skills have been implemented. The repository now contains 32 discipline-enforcing skills covering:

| Category | Count | Focus |
|----------|-------|-------|
| SOLID | 5 | Object-oriented design principles |
| Core | 6 | Fundamental coding principles |
| Testing | 3 | Test quality and structure |
| Security | 3 | Secure coding practices |
| API Design | 4 | RESTful API best practices |
| Performance | 3 | Optimization patterns |
| Code Quality | 3 | Clean code patterns |
| Error Handling | 2 | Exception management |
| Concurrency | 2 | Thread-safe patterns |
| Meta | 1 | Skill usage tracking |

## Skill Structure (Template)

Each skill follows this structure:
```
---
name: skill-name
description: Use when [triggers]
---

# Skill Name

## Overview
Core principle in 1-2 sentences

## The Iron Rule
Non-negotiable statement

## Detection
How to spot violations

## Correct Pattern
Code examples

## Pressure Resistance Protocol
Handling pushback scenarios

## Red Flags
Warning signs

## Common Rationalizations
Excuses + rebuttals table

## The Bottom Line
Summary statement
```

## Repository Structure

```
code-craft/
├── README.md
├── LICENSE
├── PLAN.md (this file)
│
└── skills/
    ├── single-responsibility/SKILL.md
    ├── open-closed/SKILL.md
    ├── liskov-substitution/SKILL.md
    ├── interface-segregation/SKILL.md
    ├── dependency-inversion/SKILL.md
    │
    ├── dry/SKILL.md
    ├── yagni/SKILL.md
    ├── kiss/SKILL.md
    ├── composition-over-inheritance/SKILL.md
    ├── law-of-demeter/SKILL.md
    ├── fail-fast/SKILL.md
    │
    ├── tdd/SKILL.md
    ├── test-isolation/SKILL.md
    ├── aaa-pattern/SKILL.md
    │
    ├── input-validation/SKILL.md
    ├── secrets-handling/SKILL.md
    ├── auth-patterns/SKILL.md
    │
    ├── rest-conventions/SKILL.md
    ├── error-responses/SKILL.md
    ├── idempotency/SKILL.md
    ├── api-versioning/SKILL.md
    │
    ├── n-plus-one-prevention/SKILL.md
    ├── lazy-loading/SKILL.md
    ├── caching/SKILL.md
    │
    ├── separation-of-concerns/SKILL.md
    ├── encapsulation/SKILL.md
    ├── immutability/SKILL.md
    │
    ├── exception-hierarchies/SKILL.md
    ├── error-boundaries/SKILL.md
    │
    ├── race-conditions/SKILL.md
    ├── deadlock-prevention/SKILL.md
    │
    └── skill-awareness/SKILL.md
```

## Methodology

Each skill is developed using TDD for documentation:

1. **RED** - Run pressure scenarios without skill, document failures
2. **GREEN** - Write skill addressing specific failures
3. **REFACTOR** - Close loopholes found in testing

## Future Considerations

Potential additional skill categories to explore:

- **Database** - Transaction isolation, indexing strategy, migration patterns
- **Observability** - Logging, metrics, tracing patterns
- **Architecture** - Clean architecture, hexagonal architecture, event sourcing
- **DevOps** - CI/CD patterns, infrastructure as code, deployment strategies
- **Frontend** - Component composition, state management, accessibility

## Installation

```bash
# Recommended: use add-skill CLI
npx add-skill yanko-belov/code-craft

# Or install specific skills
npx add-skill yanko-belov/code-craft -s single-responsibility yagni fail-fast

# Manual: clone and symlink
git clone https://github.com/yanko-belov/code-craft.git
cd code-craft
for skill in skills/*/; do
  ln -sf "$(pwd)/$skill" ~/.claude/skills/
done
```
