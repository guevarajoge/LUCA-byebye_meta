---
name: brief
description: Interview the user to build a 7-part brief for a bigger or unclear task, then propose a plan before writing any code.
disable-model-invocation: true
---

# Brief

Use this when the user types `/brief`, optionally followed by a rough goal. Do not edit files until the user approves the plan.

## Steps

1. Read the rough goal and anything already known from CLAUDE.md, handover.md and PLAN.md. Do not ask about things those files already answer. Fill those parts in yourself and mark them "from PLAN.md" or "from CLAUDE.md".
2. Ask short questions for the parts still missing, at most 3 or 4 at a time:
   1. **What and why:** the goal and the real numbers or context behind it (survey counts, audience, deadline).
   2. **Quality bar:** what excellent looks like. Ask for a reference or example if it helps.
   3. **Tools and permission:** which files to touch and what may be explored for more context.
   4. **Freedom to adjust:** whether Claude may change the approach if it finds a better one, or must check in first.
   5. **The check:** concrete pass/fail criteria. Each one should be answerable with yes or no plus evidence.
   6. **Destination:** where the result lives. For Leaving Together this is usually the local files plus the `docs/` copy.
   7. **One-sentence goal:** a crisp restatement.
3. Write the brief back as a numbered list of the seven parts so the user can correct it.
4. Propose a plan in small steps. Name the files each step touches and the version bump it leads to (`vX.Y.Z`).
5. Wait for the user's approval, then work through the plan and finish with the agreed pass/fail check.

## Done when

- All seven parts are filled in and confirmed by the user.
- The user has approved the plan.
- The check criteria are written as yes/no lines that can be verified in the browser or from the files.
