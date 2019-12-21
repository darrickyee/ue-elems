declare module 'hybrids' {
    /* Main objects */
    export type Hybrid<H extends Properties = Properties> = {
        render?: RenderCallback<H>;
    } & H;

    type Getter<T> = (host?: HybridElement, lastValue?: T) => typeof lastValue;

    export type Properties = {
        [key: string]: BaseType | PropertyDescriptor<any> | Function | HybridElement<any>;
    };

    export type HybridElement<H extends Properties = Properties> = HTMLElement &
        {
            [K in keyof H]: H[K] extends PropertyDescriptor<infer T> ? T : H[K];
        };

    /* Function aliases */
    /**
     * Function to be passed as the first argument of render().
     *
     * @returns Function taking the `host` element and `target` DOM element as arguments.
     */
    export type RenderCallback<H extends Properties = Properties> = (
        host: HybridElement<H>,
        options?: { shadowRoot: boolean | ShadowRootInit }
    ) => (host: HybridElement<H>, target: Element) => void;

    export type Invalidator = () => void;

    export type Disconnector = () => void;

    export type Connector<T extends HybridElement = HybridElement> = (
        host?: T,
        key?: string,
        invalidate?: Invalidator
    ) => void | Disconnector;

    export type PropertyDescriptor<T = any, H extends Properties = Properties> = {
        get?: (host?: HybridElement<H>, lastValue?: T) => typeof lastValue;
        set?: (host?: HybridElement<H>, value?: T, lastValue?: typeof value) => typeof value;
        connect?: Connector<HybridElement<H>>;
        observe?: (host?: HybridElement<H>, value?: T, lastValue?: T) => void;
    };

    export type BaseType = boolean | number | string | Array<any>;

    export function define(tagName: string, descriptorsOrConstructor: any): HTMLElement;
    export function define(elementMap: {
        [tagName: string]: any;
    }): { [tagName: string]: HTMLElement };

    export function property<T>(
        defaultValue: T,
        connect?: Connector
    ): PropertyDescriptor<typeof defaultValue>;

    export function parent<T extends Hybrid = Hybrid>(
        hybridsOrFn: T | Function
    ): PropertyDescriptor<null | Element>;
    /* Rendering */

    export function html(
        template: TemplateStringsArray,
        ...values: unknown[]
    ): (host, target) => void;

    export function dispatch(
        host: HTMLElement,
        eventType: string,
        options?: CustomEventInit
    ): boolean;
}
