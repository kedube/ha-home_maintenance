# Example dashboard

A ready-to-copy Lovelace dashboard for the Home Maintenance integration: the
bundled [todo card](../README.md#dashboard-card) in three configurations, a
templated "at a glance" summary, and plain entity rows — everything works with
standard Home Assistant cards plus the card that ships with this integration
(no HACS frontend extras required).

The same dashboard is loaded automatically in the development environment
(`scripts/develop`) as **Maintenance Example** in the sidebar, from
[`config/dashboards/maintenance-example.yaml`](../config/dashboards/maintenance-example.yaml).

> Replace the example entity IDs (`binary_sensor.change_hvac_filter`, …) and
> group names (`Kitchen`, `Outdoors`) with your own. Every task you create in
> the panel gets a `binary_sensor` named after its title.

## Quick start: one card

In any dashboard, choose **Edit dashboard → Add card** and search for
**Home Maintenance Todo**, or paste this into the manual card editor:

```yaml
type: custom:home-maintenance-todo-card
title: Home Maintenance
due_soon_days: 14
```

## Full view

Paste into a dashboard's **raw configuration editor** (⋮ → *Edit dashboard* →
⋮ → *Raw configuration editor*) as an entry under `views:`, or use it as-is in
a YAML-mode dashboard.

```yaml
title: Home Maintenance
path: maintenance
icon: mdi:hammer-wrench
type: sections
max_columns: 3
sections:
  # ── Everything, searchable ────────────────────────────────────────────
  - type: grid
    cards:
      - type: heading
        heading: All tasks
        icon: mdi:hammer-wrench
      - type: custom:home-maintenance-todo-card
        title: Home Maintenance
        due_soon_days: 14
        show_search: true

  # ── At a glance ───────────────────────────────────────────────────────
  - type: grid
    cards:
      - type: heading
        heading: At a glance
        icon: mdi:clipboard-check-outline
      - type: markdown
        content: >-
          {% set tasks = states.binary_sensor
             | selectattr('attributes.trigger_type', 'defined') | list %}
          {% set due = tasks | selectattr('state', 'eq', 'on') | list %}
          {% if due %}
          ⚠️ **{{ due | count }} of {{ tasks | count }} tasks due**

          {% for t in due %}
          - {{ t.name }}
          {% endfor %}
          {% else %}
          ✅ All {{ tasks | count }} tasks are up to date.
          {% endif %}
      - type: custom:home-maintenance-todo-card
        due_soon_days: 7
        max_items: 5
        show_search: false
      - type: entities
        title: Key tasks
        entities:
          - binary_sensor.change_hvac_filter
          - binary_sensor.clean_gutters
          - binary_sensor.test_smoke_alarms
          - binary_sensor.descale_coffee_machine

  # ── One card per group ────────────────────────────────────────────────
  - type: grid
    cards:
      - type: heading
        heading: By area
        icon: mdi:folder-home-outline
      - type: custom:home-maintenance-todo-card
        title: Kitchen
        group: Kitchen
        show_search: false
      - type: custom:home-maintenance-todo-card
        title: Outdoors
        group: Outdoors
        show_search: false
```

## What each piece does

- **All tasks** — the todo card with defaults: Overdue / Due soon / Upcoming
  buckets, a search box, and (when you have [task groups](../README.md#task-groups))
  a group dropdown. The card header's ↗ button opens the full panel.
- **Markdown summary** — counts every Home Maintenance task and lists the due
  ones. It identifies tasks by the `trigger_type` attribute this integration
  sets on its sensors, so new tasks are picked up automatically with no
  per-entity configuration.
- **Due soon** — a compact variant: headerless, capped at 5 items, tighter
  7-day window, no search bar. Good for a home view where space matters.
- **Key tasks** — a plain entities card, to show tasks are ordinary binary
  sensors that work with any core card (tile, glance, history-graph, …).
- **By area** — `group: Kitchen` pins a card to one group and hides the group
  dropdown, giving each room or system its own card.

## Card options

| Option | Default | Description |
| --- | --- | --- |
| `title` | `Home Maintenance` | Card header; omit the key for none. |
| `due_soon_days` | `14` | Days ahead that count as *Due soon*. |
| `max_items` | `0` | Cap the number of tasks shown (`0` = no limit). |
| `show_search` | `true` | Show the search box and group dropdown. |
| `group` | — | Show only this group's tasks and hide the group dropdown. |

## Notifications to match

Pair the dashboard with an automation so due tasks reach your phone — see
[Automation ideas](../README.md#automation-ideas) in the README.
