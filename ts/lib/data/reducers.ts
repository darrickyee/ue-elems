import DEFAULTS from './defaults';

export const ACTIONS = {
    UPDATE_TARGET: 'UPDATE_TARGET',
    UPDATE_LOCATION: 'UPDATE_LOCATION',
    UPDATE_DATETIME: 'UPDATE_DATETIME',
    UPDATE_DIALOGUE: 'UPDATE_DIALOGUE',
    ADD_ANNOUNCE: 'ADD_ANNOUNCE',
    REMOVE_ANNOUNCE: 'REMOVE_ANNOUNCE'
};

const location = (locData = DEFAULTS.location, { type, data }) =>
    type === ACTIONS.UPDATE_LOCATION && data instanceof Array ? data : locData;

const target = (targetData = DEFAULTS.target, { type, data }) =>
    type === ACTIONS.UPDATE_TARGET ? { ...DEFAULTS.target, ...data } : targetData;

const datetime = (datetimeData = DEFAULTS.datetime, { type, data }) =>
    type === ACTIONS.UPDATE_DATETIME ? data : datetimeData;

const dialogue = (dialogueData = DEFAULTS.dialogue, { type, data }) =>
    type === ACTIONS.UPDATE_DIALOGUE ? data : dialogueData;

const announce = (
    announceData = DEFAULTS.announce,
    { type, data }: { type: keyof typeof ACTIONS; data: string | string[] }
) => {
    switch (type) {
        case ACTIONS.ADD_ANNOUNCE:
            if (!(data instanceof Array)) data = [data];
            return [...announceData, ...data];
        case ACTIONS.REMOVE_ANNOUNCE:
            return announceData.slice(1);
        default:
            return announceData;
    }
};

export default { location, datetime, dialogue, target, announce };
