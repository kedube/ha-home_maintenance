import { EntityRegistryEntry, Tag, Task, IntegrationConfig, Label } from '../types';
import type { HomeAssistant } from "custom-card-helpers";

export const loadTags = (hass: HomeAssistant): Promise<Tag[]> =>
    hass.connection.sendMessagePromise<Tag[]>({
        type: 'tag/list',
    });

export const loadRegistryEntries = (hass: HomeAssistant): Promise<EntityRegistryEntry[]> =>
    hass.callWS({
        type: "config/entity_registry/list",
    });

export const loadLabelRegistry = (hass: HomeAssistant): Promise<Label[]> =>
    hass.callWS({
        type: "config/label_registry/list",
    });

export const loadTasks = (hass: HomeAssistant): Promise<Task[]> =>
    hass.callWS({
        type: 'home_maintenance/get_tasks',
    });

export const loadTask = (hass: HomeAssistant, id: string): Promise<Task> =>
    hass.callWS({
        type: 'home_maintenance/get_task',
        task_id: id,
    })

export const saveTask = (hass: HomeAssistant, payload: Record<string, any>): Promise<void> =>
    hass.callWS({
        type: 'home_maintenance/add_task',
        ...payload,
    })

export const removeTask = (hass: HomeAssistant, id: string): Promise<void> =>
    hass.callWS({
        type: 'home_maintenance/remove_task',
        task_id: id,
    });

export const completeTask = (hass: HomeAssistant, id: string): Promise<void> =>
    hass.callWS({
        type: 'home_maintenance/complete_task',
        task_id: id,
    })

export const updateTask = (hass: HomeAssistant, payload: Record<string, any>): Promise<void> =>
    hass.callWS({
        type: 'home_maintenance/update_task',
        ...payload,
    })

export const loadGroups = (hass: HomeAssistant): Promise<string[]> =>
    hass.callWS({
        type: 'home_maintenance/get_groups',
    })

export const createGroup = (hass: HomeAssistant, groupId: string): Promise<void> =>
    hass.callWS({
        type: 'home_maintenance/create_group',
        group_id: groupId,
    })

export const renameGroup = (hass: HomeAssistant, oldGroupId: string, newGroupId: string): Promise<void> =>
    hass.callWS({
        type: 'home_maintenance/rename_group',
        old_group_id: oldGroupId,
        new_group_id: newGroupId,
    })

export const deleteGroup = (hass: HomeAssistant, groupId: string): Promise<void> =>
    hass.callWS({
        type: 'home_maintenance/delete_group',
        group_id: groupId,
    })

export const getConfig = (hass: HomeAssistant): Promise<IntegrationConfig> =>
    hass.callWS({
        type: 'home_maintenance/get_config',
    })
export const subscribeUpdates = (
    hass: HomeAssistant,
    onChange: () => void,
): Promise<() => Promise<void>> =>
    (hass.connection as any).subscribeMessage(onChange, {
        type: 'home_maintenance/subscribe_updates',
    });
