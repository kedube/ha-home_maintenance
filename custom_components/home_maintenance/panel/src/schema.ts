import { localize } from '../localize/localize';
import { INTERVAL_TYPES, getIntervalTypeLabels, Task, TaskFormData, EntityRegistryEntry, Label } from './types';

export const emptyTaskFormData = (): TaskFormData => ({
    title: "",
    trigger_type: "time",
    interval_value: "",
    interval_type: "days",
    last_performed: "",
    icon: "",
    label: [],
    tag: "",
    count_entity_id: "",
    count_threshold: "",
    runtime_entity_id: "",
    runtime_threshold: "",
    area: "",
    description: "",
    group_id: "",
});

export const taskToFormData = (
    task: Task,
    entity: EntityRegistryEntry | undefined,
    labels: Label[],
): TaskFormData => ({
    title: task.title,
    trigger_type: task.trigger_type ?? "time",
    interval_value: task.interval_value,
    interval_type: task.interval_type,
    last_performed: task.last_performed ?? "",
    icon: task.icon ?? "",
    label: labels.map((l) => l.label_id),
    tag: task.tag_id ?? "",
    count_entity_id: task.count_entity_id ?? "",
    count_threshold: task.count_threshold ?? "",
    runtime_entity_id: task.runtime_entity_id ?? "",
    runtime_threshold: task.runtime_threshold ?? "",
    area: entity?.area_id ?? "",
    description: task.description ?? "",
    group_id: task.group_id ?? "",
});

const triggerTypeSelector = (lang: string) => ({
    name: "trigger_type",
    required: true,
    selector: {
        select: {
            options: [
                { value: "time", label: localize("trigger_types.time", lang) },
                { value: "count", label: localize("trigger_types.count", lang) },
                { value: "runtime", label: localize("trigger_types.runtime", lang) },
            ],
            mode: "dropdown",
        },
    },
});

const triggerFields = (formData: TaskFormData, lang: string): any[] => {
    if (formData.trigger_type === "count") {
        return [
            { name: "count_entity_id", required: true, selector: { entity: {} }, },
            { name: "count_threshold", required: true, selector: { number: { min: 1, mode: "box" } }, },
        ];
    }
    if (formData.trigger_type === "runtime") {
        return [
            { name: "runtime_entity_id", required: true, selector: { entity: { filter: { domain: "sensor" } } }, },
            { name: "runtime_threshold", required: true, selector: { number: { min: 0.1, step: 0.1, mode: "box" } }, },
        ];
    }
    return [
        { name: "interval_value", required: true, selector: { number: { min: 1, mode: "box" } }, },
        {
            name: "interval_type",
            required: true,
            selector: {
                select: {
                    options: INTERVAL_TYPES.map((type) => ({
                        value: type,
                        label: getIntervalTypeLabels(lang)[type],
                    })),
                    mode: "dropdown",
                },
            },
        },
    ];
};

/** Group dropdown that also accepts a typed-in (new) group name. */
export const groupSelector = (groups: string[], lang: string) => ({
    name: "group_id",
    selector: {
        select: {
            options: [
                { value: "", label: localize("common.ungrouped", lang) },
                ...groups.map((group) => ({ value: group, label: group })),
            ],
            mode: "dropdown",
            custom_value: true,
        },
    },
});

/**
 * Main task fields, rendered on one line in the add form (wraps on narrow
 * screens): title | trigger type | the trigger's two fields | last performed.
 */
export const basicFields = (formData: TaskFormData, lang: string): any[] => [
    { name: "title", required: true, selector: { text: {} }, },
    triggerTypeSelector(lang),
    ...triggerFields(formData, lang),
    { name: "last_performed", selector: { date: {} }, },
];

/** Optional fields, rendered left-to-right on the expansion panel's line. */
export const optionalFieldList = (groups: string[], lang: string): any[] => [
    groupSelector(groups, lang),
    { name: "icon", selector: { icon: {} }, },
    { name: "tag", selector: { entity: { filter: { domain: "tag" } } }, },
    { name: "area", selector: { area: {} }, },
    { name: "label", selector: { label: { multiple: true } }, },
];

export const descriptionField = (multiline: boolean) => (
    { name: "description", selector: { text: multiline ? { multiline: true } : {} } }
);

/** Validate required fields per trigger type. Returns true when valid. */
export const validateTaskForm = (data: TaskFormData): boolean => {
    if (!data.title?.trim()) return false;
    if (data.trigger_type === "count") {
        return Boolean(data.count_entity_id?.trim() && data.count_threshold);
    }
    if (data.trigger_type === "runtime") {
        return Boolean(data.runtime_entity_id?.trim() && data.runtime_threshold);
    }
    return Boolean(data.interval_value && data.interval_type);
};

/** Midnight-floored ISO date from a form date string; null when invalid. */
export const computeISODate = (dateStr: string): string | null => {
    if (!dateStr) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toISOString();
    }
    // Only take the YYYY-MM-DD part to avoid time zone issues
    const [yearStr, monthStr, dayStr] = dateStr.split("T")[0].split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    const parsedDate = new Date(year, month - 1, day);
    parsedDate.setHours(0, 0, 0, 0);
    return parsedDate.toISOString();
};

const triggerPayloadFields = (data: TaskFormData): Record<string, any> => {
    const isCount = data.trigger_type === "count";
    const isRuntime = data.trigger_type === "runtime";
    return {
        trigger_type: data.trigger_type || "time",
        interval_value: (isCount || isRuntime) ? 1 : Number(data.interval_value),
        interval_type: (isCount || isRuntime) ? "days" : data.interval_type,
        count_entity_id: isCount ? (data.count_entity_id?.trim() || null) : null,
        count_threshold: isCount ? Number(data.count_threshold) : 0,
        runtime_entity_id: isRuntime ? (data.runtime_entity_id?.trim() || null) : null,
        runtime_threshold: isRuntime ? Number(data.runtime_threshold) : 0,
    };
};

export const taskFormToAddPayload = (data: TaskFormData, lastPerformedISO: string): Record<string, any> => {
    const trigger = triggerPayloadFields(data);
    return {
        title: data.title.trim(),
        interval_value: trigger.interval_value,
        interval_type: trigger.interval_type,
        trigger_type: trigger.trigger_type,
        last_performed: lastPerformedISO,
        tag_id: data.tag?.trim() || undefined,
        icon: data.icon?.trim() || "mdi:calendar-check",
        labels: data.label ?? [],
        area_id: data.area?.trim() || undefined,
        description: data.description || undefined,
        group_id: data.group_id?.trim() || undefined,
        ...(trigger.count_entity_id ? { count_entity_id: trigger.count_entity_id, count_threshold: trigger.count_threshold } : {}),
        ...(trigger.runtime_entity_id ? { runtime_entity_id: trigger.runtime_entity_id, runtime_threshold: trigger.runtime_threshold } : {}),
    };
};

export const taskFormToUpdates = (data: TaskFormData, lastPerformedISO: string): Record<string, any> => ({
    title: data.title.trim(),
    ...triggerPayloadFields(data),
    last_performed: lastPerformedISO,
    icon: data.icon?.trim() || "mdi:calendar-check",
    labels: data.label,
    tag_id: data.tag?.trim() || null,
    area_id: data.area?.trim() || null,
    description: data.description ?? "",
    group_id: data.group_id?.trim() || null,
});
