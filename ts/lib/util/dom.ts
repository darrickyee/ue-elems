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
export const listen = (
    target: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
) => {
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
};

export const select = (selector: string, context: ParentNode = document) =>
    context ? context.querySelector(selector) : null;

export const selectAll = (selector: string, context: ParentNode = document) =>
    context ? [...context.querySelectorAll(selector)] : [];

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
function eventPromise(eventType: string, target: Element | Document = document, reject = false) {
    return new Promise((res, rej) => {
        target.addEventListener(eventType, reject ? rej : res, { once: true });
    });
}

export async function repeatUntil(callback, eventType, delay = 500) {
    const cancel = eventPromise(eventType, document, true);
    await Promise.race([timeout(delay), cancel]).catch(() => {
        return;
    });

    let isHeld = true;
    while (isHeld) {
        await Promise.race([nextframe(), cancel])
            .then(callback)
            .catch(() => {
                isHeld = false;
            });
    }
}

/**
 * Returns a promise that resolves if `<context>.querySelector.(<selector>)` is found before `timeout` milliseconds and rejects otherwise.
 *
 * @param selector Selector string.
 * @param context Context for `selector`.  Defaults to `document`.
 * @param expire Expiration time (milliseconds).  Defaults to 1000.
 */
export const findElement = (selector: string, context: ParentNode = document, timeout = 1000) => {
    return new Promise((resolve, reject) => {
        let expired;

        const t = setTimeout(() => {
            expired = true;
        }, timeout);

        function _find() {
            if (expired) return reject();

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
