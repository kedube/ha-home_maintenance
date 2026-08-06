import { localize } from '../localize/localize'

export type IntervalType = "days" | "weeks" | "months";

export const INTERVAL_TYPES: IntervalType[] = ["days", "weeks", "months"];

export function getIntervalTypeLabels(lang: string): Record<IntervalType, string> {
    return {
        days: localize("intervals.days", lang),
        weeks: localize("intervals.weeks", lang),
        months: localize("intervals.months", lang),
    };
}

export interface IntegrationConfig {
    data: Record<string, any>;
    options: Record<string, any>;
    version?: string;
}

export interface Label {
    label_id: string;
    name: string;
    color?: string;
    icon?: string;
}

export interface Tag {
    id: string;
    name?: string;
}

export interface EntityRegistryEntry {
    entity_id: string;
    unique_id: string;
    platform: string;
    device_id?: string;
    disabled_by?: string | null;
    area_id?: string | null;
    original_name?: string;
    icon?: string;
    labels: string[];
}

export type TriggerType = "time" | "count" | "runtime";

export interface Task {
    id: string;
    title: string;
    interval_value: number;
    interval_type: IntervalType;
    last_performed: string;
    tag_id?: string;
    icon?: string;
    trigger_type?: TriggerType;
    count_entity_id?: string;
    count_threshold?: number;
    current_count?: number;
    runtime_entity_id?: string;
    runtime_threshold?: number;
    runtime_baseline?: number;
    area_id?: string | null;
    description?: string | null;
    // Computed by the backend (store.serialize) so the panel renders trigger
    // state without reimplementing trigger semantics.
    due?: boolean;
    next_due?: string | null;
    progress_current?: number | null;
    progress_target?: number | null;
}

export interface TaskFormData {
    title: string;
    trigger_type: TriggerType;
    interval_value: number | "";
    interval_type: string;
    last_performed: string;
    icon: string;
    label: string[];
    tag: string;
    count_entity_id: string;
    count_threshold: number | "";
    runtime_entity_id: string;
    runtime_threshold: number | "";
    area: string;
    description: string;
}
