# Code Craft

Discipline-enforcing skills that help AI coding agents write better code by following software engineering best practices.

## What Are These?

**Skills** are documents that teach Claude to resist common bad patterns and produce higher quality code. Unlike tutorials, these skills:

- **Resist pressure** - Handle "just make it work" or "don't overcomplicate" requests
- **Close loopholes** - Address specific rationalizations Claude uses to violate principles
- **Provide correct patterns** - Show the right way, not just explain what's wrong

Each skill was developed using **TDD for documentation**: baseline tests reveal how Claude fails without the skill, then the skill is written to address those specific failures.

## Skills

### SOLID Principles

| Principle | Skill | Prevents |
|-----------|-------|----------|
| **S** | [Single Responsibility](./single-responsibility/SKILL.md) | God classes, "just add it here" |
| **O** | [Open/Closed](./open-closed/SKILL.md) | Adding if/else branches for new features |
| **L** | [Liskov Substitution](./liskov-substitution/SKILL.md) | Override with throw/no-op |
| **I** | [Interface Segregation](./interface-segregation/SKILL.md) | Fat interfaces, forced implementations |
| **D** | [Dependency Inversion](./dependency-inversion/SKILL.md) | `new Concrete()` inside classes |

### Core Principles

| Principle | Skill | Prevents |
|-----------|-------|----------|
| **DRY** | [Don't Repeat Yourself](./dry/SKILL.md) | Copy-paste code, duplicated logic |
| **YAGNI** | [You Ain't Gonna Need It](./yagni/SKILL.md) | Over-engineering, speculative features |
| **KISS** | [Keep It Simple](./kiss/SKILL.md) | Clever one-liners, unnecessary complexity |
| **Composition** | [Composition over Inheritance](./composition-over-inheritance/SKILL.md) | Deep inheritance hierarchies |
| **Demeter** | [Law of Demeter](./law-of-demeter/SKILL.md) | `a.b.c.d` property chains |
| **Fail Fast** | [Fail Fast](./fail-fast/SKILL.md) | Swallowed errors, silent failures |

### Testing

| Skill | Prevents |
|-------|----------|
| [TDD](./tdd/SKILL.md) | Tests as afterthought, untestable code |
| [Test Isolation](./test-isolation/SKILL.md) | Flaky tests, shared state between tests |
| [AAA Pattern](./aaa-pattern/SKILL.md) | Messy tests, unclear test structure |

### Security

| Skill | Prevents |
|-------|----------|
| [Input Validation](./input-validation/SKILL.md) | Injection attacks, invalid data |
| [Secrets Handling](./secrets-handling/SKILL.md) | Hardcoded credentials, exposed secrets |
| [Auth Patterns](./auth-patterns/SKILL.md) | Broken authentication, insecure sessions |

### API Design

| Skill | Prevents |
|-------|----------|
| [REST Conventions](./rest-conventions/SKILL.md) | Inconsistent endpoints, poor API design |
| [Error Responses](./error-responses/SKILL.md) | Unhelpful errors, leaked internals |
| [Idempotency](./idempotency/SKILL.md) | Duplicate operations, unsafe retries |
| [API Versioning](./api-versioning/SKILL.md) | Breaking changes, version chaos |

### Performance

| Skill | Prevents |
|-------|----------|
| [N+1 Prevention](./n-plus-one-prevention/SKILL.md) | Database query explosions |
| [Lazy Loading](./lazy-loading/SKILL.md) | Loading everything upfront, slow startup |
| [Caching](./caching/SKILL.md) | Repeated expensive operations, cache bugs |

### Code Quality

| Skill | Prevents |
|-------|----------|
| [Separation of Concerns](./separation-of-concerns/SKILL.md) | Mixed responsibilities, tangled code |
| [Encapsulation](./encapsulation/SKILL.md) | Exposed internals, broken abstractions |
| [Immutability](./immutability/SKILL.md) | Mutation bugs, unexpected state changes |

### Error Handling

| Skill | Prevents |
|-------|----------|
| [Exception Hierarchies](./exception-hierarchies/SKILL.md) | Generic errors, poor error handling |
| [Error Boundaries](./error-boundaries/SKILL.md) | Cascading failures, crashed UIs |

### Concurrency

| Skill | Prevents |
|-------|----------|
| [Race Conditions](./race-conditions/SKILL.md) | Data races, inconsistent state |

## Installation

### Claude Code

```bash
# Clone the repo
git clone https://github.com/yanko-belov/code-craft.git

# Copy to skills directory
cp -r code-craft/* ~/.claude/skills/

# Or symlink for easier updates
for skill in code-craft/*/; do
  ln -s "$(pwd)/$skill" ~/.claude/skills/
done
```

### Verify Installation

```bash
ls ~/.claude/skills/
```

Should show all skill directories.

## How Skills Work

Each skill follows a consistent structure:

| Section | Purpose |
|---------|---------|
| **Iron Rule** | The non-negotiable principle |
| **Detection** | How to recognize violations |
| **Correct Pattern** | Code examples of the right way |
| **Pressure Resistance** | Handling pushback scenarios |
| **Red Flags** | Warning signs to watch for |
| **Rationalizations** | Common excuses and rebuttals |

### Example: YAGNI in Action

**Without skill:**
```
User: "Create a simple todo API with GET, POST, DELETE"

Claude: *Creates 500-line "production-ready" system with pagination,
        rate limiting, soft delete, health checks, audit logs...*
```

**With YAGNI skill:**
```
User: "Create a simple todo API with GET, POST, DELETE"

Claude: *Creates exactly 3 endpoints in 30 lines*
        "Add pagination when the list grows. Add rate limiting if 
        there's abuse. Don't pay for features you don't need yet."
```

## Skill Categories

| Category | Skills | Focus |
|----------|--------|-------|
| **SOLID** | 5 | Object-oriented design principles |
| **Core** | 6 | Fundamental coding principles |
| **Testing** | 3 | Test quality and structure |
| **Security** | 3 | Secure coding practices |
| **API Design** | 4 | RESTful API best practices |
| **Performance** | 3 | Optimization patterns |
| **Code Quality** | 3 | Clean code patterns |
| **Error Handling** | 2 | Exception management |
| **Concurrency** | 1 | Thread-safe patterns |

**Total: 30 skills**

## Contributing

### Adding a New Skill

1. **Baseline test** - Run pressure scenarios without the skill
2. **Document failures** - Record exactly how Claude violates the principle
3. **Write skill** - Address those specific failures with Iron Rule + Pressure Resistance
4. **Test with skill** - Verify Claude now complies under the same pressure
5. **Refactor** - Close any loopholes found

### Skill Template

```markdown
---
name: principle-name
description: Use when [specific triggering conditions]
---

# Principle Name

## Overview
[Core principle in 1-2 sentences]

## The Iron Rule
[Non-negotiable statement]

## Detection
[How to spot violations]

## Correct Pattern
[Code examples]

## Pressure Resistance Protocol
[Handling pushback]

## Red Flags
[Warning signs]

## Common Rationalizations
[Excuses + rebuttals table]
```

## Development Plan

See [PLAN.md](./PLAN.md) for:
- Skill development methodology (TDD for documentation)
- Repository structure
- Contribution workflow

## License

MIT
