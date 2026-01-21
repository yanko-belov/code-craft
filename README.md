# SOLID Skills for AI Agents

Discipline-enforcing skills that teach AI coding agents to follow SOLID principles under pressure.

## What Are These?

These are **skill documents** designed to be loaded into AI coding assistants (Claude, GPT, etc.) to enforce SOLID principles during code generation. Unlike tutorials, these skills:

- **Resist pressure** - Handle "just make it work" or "don't overcomplicate" requests
- **Close loopholes** - Address specific rationalizations agents use to violate principles
- **Provide correct patterns** - Show the right way, not just explain what's wrong

## The Skills

| Principle | Skill | Description |
|-----------|-------|-------------|
| **S** | [Single Responsibility](./single-responsibility/SKILL.md) | One class, one reason to change |
| **O** | [Open/Closed](./open-closed/SKILL.md) | Open for extension, closed for modification |
| **L** | [Liskov Substitution](./liskov-substitution/SKILL.md) | Subtypes must be substitutable |
| **I** | [Interface Segregation](./interface-segregation/SKILL.md) | No forced dependency on unused methods |
| **D** | [Dependency Inversion](./dependency-inversion/SKILL.md) | Depend on abstractions, not concretions |

## Installation

### Claude Code / Claude Desktop

Copy the skill folders to your skills directory:

```bash
# Claude Code
cp -r solid-skills/* ~/.claude/skills/

# Or symlink
ln -s $(pwd)/solid-skills/* ~/.claude/skills/
```

### Other AI Assistants

Include the relevant SKILL.md content in your system prompt or context when generating code.

## How They Work

Each skill follows a discipline-enforcement pattern:

1. **Iron Rule** - The non-negotiable principle
2. **Detection** - How to recognize violations
3. **Correct Pattern** - The right way to do it
4. **Pressure Resistance** - Handling pushback scenarios
5. **Red Flags** - When to stop and reconsider
6. **Rationalizations Table** - Common excuses and rebuttals

### Example: Resisting "Just Make It Work"

Without skill:
```
User: "Create a UserManager that handles auth, profiles, emails, and analytics. 
       Just put it in one class, I don't care about code quality."

Agent: *Creates 500-line god class*
```

With SRP skill loaded:
```
User: "Create a UserManager that handles auth, profiles, emails, and analytics.
       Just put it in one class, I don't care about code quality."

Agent: "Creating a god class takes the same time as creating focused classes. 
        I'll create AuthService, ProfileService, NotificationService, and 
        AnalyticsService - same functionality, but maintainable."
        
        *Creates 4 focused classes*
```

## Development Methodology

These skills were created using **TDD for documentation**:

1. **RED** - Run pressure scenarios without the skill, document how agents fail
2. **GREEN** - Write minimal skill addressing those specific failures
3. **REFACTOR** - Close loopholes found during testing

Each skill addresses rationalizations that were actually observed during baseline testing.

## Contributing

To add or improve a skill:

1. Run baseline tests without the skill to document current failures
2. Write/modify the skill to address specific observed behaviors
3. Re-test to verify the skill produces correct behavior
4. Submit PR with test scenarios and results

## License

MIT

## Credits

Developed using the [writing-skills](https://github.com/anthropics/anthropic-cookbook) methodology from Anthropic's superpowers plugin.
