import { TEXT_CHANGE } from '../constants';

export function changeText(text) {
    return {
        type: TEXT_CHANGE,
        payload: text
    }
}