var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Adds an event listener to `target` and returns the associated `removeEventListener` function.
 *
 * @example
 *
 * // Add listener to document
 * const unlisten = listen(document, 'click', () => console.log('clicked'))
 *
 * // Remove listener
 * unlisten();
 *
 * @param target EventTarget to which the listener will be added.
 * @param type Passed to `addEventListener`.
 * @param listener Passed to `addEventListener`.
 * @param options Passed to `addEventListener`.
 *
 * @returns Function that removes the listener when called.
 */
export const listen = (target, type, listener, options) => {
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
};
export const select = (selector, context = document) => context ? context.querySelector(selector) : null;
export const selectAll = (selector, context = document) => context ? [...context.querySelectorAll(selector)] : [];
function nextframe() {
    return new Promise(r => {
        requestAnimationFrame(r);
    });
}
/**
 * Returns a promise that resolves after `duration` milliseconds.  If `reject` is true, rejects the promise instead.
 *
 * @param duration
 * @param reject
 */
function timeout(duration = 1000, reject = false) {
    return new Promise((res, rej) => {
        setTimeout(reject ? rej : res, duration);
    });
}
/**
 * Returns a promise that resolves when an `eventType` event is dispatched on `target`.  If `reject` is true, rejects the promise instead.
 *
 * @param duration
 * @param reject
 */
function eventPromise(eventType, target = document, reject = false) {
    return new Promise((res, rej) => {
        target.addEventListener(eventType, reject ? rej : res, { once: true });
    });
}
export function repeatUntil(callback, eventType, delay = 500) {
    return __awaiter(this, void 0, void 0, function* () {
        const cancel = eventPromise(eventType, document, true);
        yield Promise.race([timeout(delay), cancel]).catch(() => {
            return;
        });
        let isHeld = true;
        while (isHeld) {
            yield Promise.race([nextframe(), cancel])
                .then(callback)
                .catch(() => {
                isHeld = false;
            });
        }
    });
}
/**
 * Returns a promise that resolves if `<context>.querySelector.(<selector>)` is found before `timeout` milliseconds and rejects otherwise.
 *
 * @param selector Selector string.
 * @param context Context for `selector`.  Defaults to `document`.
 * @param expire Expiration time (milliseconds).  Defaults to 1000.
 */
export const findElement = (selector, context = document, timeout = 1000) => {
    return new Promise((resolve, reject) => {
        let expired;
        const t = setTimeout(() => {
            expired = true;
        }, timeout);
        function _find() {
            console.log(`Looking for element ${selector}...`);
            if (expired)
                return reject();
            let el = context.querySelector(selector);
            if (el) {
                clearTimeout(t);
                return resolve(el);
            }
            requestAnimationFrame(_find);
        }
        _find();
    });
};
//# sourceMappingURL=dom.js.map