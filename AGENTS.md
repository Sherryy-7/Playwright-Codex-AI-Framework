# Agent rules

## Roles

1. Codex extracts business rules from a ticket.
2. The planner agent writes test plans.
3. The QA lead approves medium-risk merges and releases.
4. The QA lead and business owner approve high-risk merges and releases.

## Who edits what

5. The user writes tickets and acceptance criteria, business rules with IDs, specs and test plans, prompts for Codex and the agents, and policies for risk tiers, gate rules, and approvals.
6. Codex writes test, framework, and app code.
7. Agents run tests and collect evidence.

## Protected assertions

8. Agents must not change an assertion that carries a business rule ID.

## The healer

9. Every heal is approved by the user as a pull request.

## Gate rules

10. Merges and releases are approved by risk tier: low risk by policy check, medium risk by the QA lead, and high risk by the QA lead and business owner.
11. The user does not approve a change without seeing its evidence.

## Secrets

12. Agents must not put an API key in a prompt, a file, or on screen.
