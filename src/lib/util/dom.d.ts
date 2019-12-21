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
export declare const listen: (target: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => () => void;
export declare const select: (selector: string, context?: ParentNode) => Element;
export declare const selectAll: (selector: string, context?: ParentNode) => Element[];
export declare function repeatUntil(callback: any, eventType: any, delay?: number): Promise<void>;
/**
 * Returns a promise that resolves if `<context>.querySelector.(<selector>)` is found before `expire` milliseconds and rejects otherwise.
 *
 * @param selector Selector string.
 * @param context Context for `selector`.  Defaults to `document`.
 * @param expire Expiration time (milliseconds).  Defaults to 1000.
 */
export declare function getElement(selector: string, context?: ParentNode, expire?: number): Promise<Element | null>;
