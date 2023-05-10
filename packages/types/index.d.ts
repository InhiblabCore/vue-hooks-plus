import { ComputedRef } from 'vue';
import Cookies from 'js-cookie';
import { createApp } from 'vue';
import type { DebouncedFunc } from 'lodash';
import { DeepReadonly } from 'vue';
import { Ref } from 'vue';
import { UnwrapNestedRefs } from 'vue';
import { UnwrapRef } from 'vue';
import { VueElement } from 'vue';
import { WatchSource } from 'vue';

declare type BasicTarget<T extends TargetType = Element> = (() => TargetValue<T>) | TargetValue<T> | Ref<TargetValue<T>>;

declare interface CachedData<TData = any, TParams = any> {
    data: TData;
    params: TParams;
    time: number;
}

export declare const clearUseRequestCache: (key?: string | string[]) => void;

declare interface DebounceOptions {
    /**
     * The number of milliseconds to delay.
     */
    wait?: number;
    /**
     * Specify invoking on the leading edge of the timeout.
     */
    leading?: boolean;
    /**
     * Specify invoking on the trailing edge of the timeout.
     */
    trailing?: boolean;
    /**
     * The maximum time func is allowed to be delayed before it’s invoked.
     */
    maxWait?: number;
}

declare type DependencyList = WatchSource | any[] | any;

declare class EventEmitter<T> {
    private subscriptions;
    private emitEffectCache;
    constructor();
    /**
     * Subscribe to the event
     * @param event string
     * @param listener Subscription<T>
     */
    useSubscription: (event: string, listener?: Subscription<T>) => void;
    /**
     * Send an event notification
     * @param event string | number
     * @param args T extends any[] ? any[] : any
     */
    emit: (event: string | number, ...args: T extends any[] ? any[] : any) => void;
    emitEffect: (event: string | number) => void;
    removeListener: (event: string) => void;
    clear: () => void;
}

declare const eventEmitterOverall: EventEmitter<unknown>;

declare class Fetch<TData, TParams extends unknown[] = any> {
    serviceRef: Ref<UseRequestService<TData, TParams>>;
    options: UseRequestOptions<TData, TParams, any>;
    setUpdateData: (currentState: unknown, key?: keyof UseRequestFetchState<TData, TParams>) => void;
    initState: Partial<UseRequestFetchState<TData, TParams>>;
    pluginImpls: UseRequestPluginReturn<TData, TParams>[] | undefined;
    count: number;
    state: UseRequestFetchState<TData, TParams>;
    constructor(serviceRef: Ref<UseRequestService<TData, TParams>>, options: UseRequestOptions<TData, TParams, any>, setUpdateData: (currentState: unknown, key?: keyof UseRequestFetchState<TData, TParams>) => void, initState?: Partial<UseRequestFetchState<TData, TParams>>);
    setState(currentState?: Partial<UseRequestFetchState<TData, TParams>>): void;
    /**
     * should rename
     * @param data Result value `unknown`
     * @param key Result key `data`| `params` | `loading`| `error`
     */
    setData(data: unknown, key?: keyof UseRequestFetchState<TData, TParams> | (keyof UseRequestFetchState<TData, TParams>)[]): void;
    /**
     *
     * @param data Result value `unknown`
     * @param key Result key `data`| `params` | `loading`| `error`
     */
    setFetchState(data: unknown, key?: keyof UseRequestFetchState<TData, TParams> | (keyof UseRequestFetchState<TData, TParams>)[]): void;
    runPluginHandler(event: keyof UseRequestPluginReturn<TData, TParams>, ...rest: unknown[]): any;
    runAsync(...params: TParams): Promise<TData>;
    run(...params: TParams): void;
    cancel(): void;
    refresh(): void;
    refreshAsync(): Promise<TData>;
    mutate(data?: TData | ((oldData?: TData) => TData | undefined)): void;
}

declare interface IFuncUpdater<T> {
    (previousState?: T): T;
}

declare type InterruptibleRejectType = (error: any) => void;

declare type IProps = Record<string, any>;

declare type noop = (...args: any) => any;

declare type noop_2 = (...p: any) => void;

declare type noop_3 = (...args: any) => any;

declare interface Options<T> {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
}

declare interface OptionsWithDefaultValue<T> extends Options<T> {
    defaultValue: T | IFuncUpdater<T>;
}

declare type ParamsType<P> = P extends any[] ? any[] : any;

declare type Position = {
    left: number;
    top: number;
};

declare enum ReadyState_2 {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3
}

declare type Resolve = (value: any) => void;

declare type Size = {
    width: Readonly<Ref<number>>;
    height: Readonly<Ref<number>>;
};

declare type StorageStateResultHasDefaultValue<T> = [
Ref<T> | Ref<undefined>,
(value?: T | IFuncUpdater<T> | undefined) => void
];

declare type Subscription<T> = ({ params, event }: SubscriptionParams<T>) => void;

declare type SubscriptionParams<T = any> = {
    params: T;
    event: string | number;
};

declare type TargetType = HTMLElement | Element | Window | Document;

declare type TargetValue<T> = T | undefined | null;

declare interface UrlState {
    [key: string]: any;
}

export declare function useAsyncOrder({ task, option }: UseAsyncOrderType): void;

declare type UseAsyncOrderType = {
    task: ((resolve?: Resolve, reject?: InterruptibleRejectType, index?: number) => void)[];
    option?: {
        /**
         *  Delay execution
         */
        delay?: number;
        /**
         * Preparation phase callback
         * @returns void
         */
        onReady?: () => void;
        /**
         * Successful callback
         * @param result any
         * @returns void
         */
        onSuccess?: (result: unknown) => void;
        /**
         * Error callback
         * @param err unknown
         * @returns void
         */
        onError?: (err: unknown) => void;
    };
};

export declare function useBoolean(defaultValue?: boolean): UseBooleanResult;

declare interface UseBooleanActions {
    /**
     *  Set state to `true`
     * @returns void
     */
    setTrue: () => void;
    /**
     *  Set state to `false`
     * @returns void
     */
    setFalse: () => void;
    /**
     * Set state
     * @param value boolean
     * @returns void
     */
    set: (value: boolean) => void;
    /**
     * Toggle state
     * @returns void
     */
    toggle: () => void;
}

declare type UseBooleanResult = [Readonly<Ref<boolean>>, UseBooleanActions];

export declare function useCookieState(cookieKey: string, options?: UseCookieStateOptions): readonly [Readonly<Ref<UseCookieStateType | (() => UseCookieStateType)>>, (newValue: UseCookieStateType | ((prevState: UseCookieStateType) => UseCookieStateType), newOptions?: Cookies.CookieAttributes) => void];

declare interface UseCookieStateOptions extends Cookies.CookieAttributes {
    defaultValue?: UseCookieStateType | (() => UseCookieStateType);
}

declare type UseCookieStateType = string | undefined;

export declare function useCounter(initialValue?: number, options?: UseCounterOptions): [Ref<number>, UseCounterActions];

declare interface UseCounterActions {
    /**
     * Increment, default delta is 1
     * @param delta number
     * @returns void
     */
    inc: (delta?: number) => void;
    /**
     * Decrement, default delta is 1
     * @param delta number
     * @returns void
     */
    dec: (delta?: number) => void;
    /**
     * Set current value
     * @param value number | ((c: number) => number)
     * @returns void
     */
    set: (value: number | ((c: number) => number)) => void;
    /**
     * Reset current value to initial value
     * @returns void
     */
    reset: () => void;
}

declare interface UseCounterOptions {
    /**
     *  Min count
     */
    min?: number;
    /**
     *  Max count
     */
    max?: number;
}

export declare function useDarkMode(): [ComputedRef<boolean>, (value?: unknown) => void];

export declare function useDebounce<T>(value: Ref<T>, options?: DebounceOptions): Ref<T>;

export declare function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions): {
    /**
     * Invode and pass parameters to fn.
     * `(...args: any[]) => any`
     */
    run: DebouncedFunc<T>;
    /**
     * Cancel the invocation of currently debounced function.
     *  `() => void`
     */
    cancel: () => void;
    /**
     * Immediately invoke currently debounced function.
     *  `() => void`
     */
    flush: () => ReturnType<T> | undefined;
};

export declare const useDrag: <T>(data: T, target: BasicTarget, options?: UseDragOptions) => void;

declare interface UseDragOptions {
    draggable?: boolean;
    /**
     *  On drag start callback
     * @param event DragEvent
     * @returns void
     */
    onDragStart?: (event: DragEvent) => void;
    /**
     *  On drag end callback
     * @param event DragEvent
     * @returns void
     */
    onDragEnd?: (event: DragEvent) => void;
}

export declare const useDrop: (target: BasicTarget, options?: UseDropOptions) => void;

declare interface UseDropOptions {
    /**
     * The callback when file is dropped or pasted
     * @param files File[]
     * @param event DragEvent
     * @returns void
     */
    onFiles?: (files: File[], event?: DragEvent) => void;
    /**
     * The callback when uri is dropped or pasted
     * @param url string
     * @param event DragEvent
     * @returns void
     */
    onUri?: (url: string, event?: DragEvent) => void;
    /**
     * The callback when DOM is dropped or pasted
     * @param content any
     * @param event DragEvent
     * @returns void
     */
    onDom?: (content: any, event?: DragEvent) => void;
    /**
     * The callback when text is dropped or pasted
     * @param text `string`
     * @param event `ClipboardEvent`
     * @returns `void`
     */
    onText?: (text: string, event?: ClipboardEvent) => void;
    /**
     *  On drag enter callback
     * @param event `DragEvent`
     * @returns `void`
     */
    onDragEnter?: (event?: DragEvent) => void;
    /**
     * On drag over callback
     * @param event `DragEvent``
     * @returns `void`
     */
    onDragOver?: (event?: DragEvent) => void;
    /**
     * On drag leave callback
     * @param event `DragEvent`
     * @returns `void`
     */
    onDragLeave?: (event?: DragEvent) => void;
    /**
     * The callback when any is dropped
     * @param event DragEvent
     * @returns void
     */
    onDrop?: (event?: DragEvent) => void;
    /**
     * The callback when any is pasted
     * @param event ClipboardEvent
     * @returns void
     */
    onPaste?: (event?: ClipboardEvent) => void;
}

export declare function useEventEmitter<T = void>(options?: {
    /**
     * Is it global
     */
    global?: boolean;
}): UseEventEmitterType<T>;

declare type UseEventEmitterType<T = void> = EventEmitter<T> | typeof eventEmitterOverall;

export declare function useEventListener<K extends keyof HTMLElementEventMap>(eventName: K, handler: (ev: HTMLElementEventMap[K]) => void, options?: UseEventListenerOptions<HTMLElement>): void;

export declare function useEventListener<K extends keyof ElementEventMap>(eventName: K, handler: (ev: ElementEventMap[K]) => void, options?: UseEventListenerOptions<Element>): void;

export declare function useEventListener<K extends keyof DocumentEventMap>(eventName: K, handler: (ev: DocumentEventMap[K]) => void, options?: UseEventListenerOptions<Document>): void;

export declare function useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: (ev: WindowEventMap[K]) => void, options?: UseEventListenerOptions<Window>): void;

export declare function useEventListener(eventName: string, handler: noop_2, options: UseEventListenerOptions): void;

declare type UseEventListenerOptions<T extends UseEventListenerTarget = UseEventListenerTarget> = {
    /**
     * DOM element or ref
     */
    target?: T;
    /**
     * Optional, a Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     */
    capture?: boolean;
    /**
     * Optional, A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.
     */
    once?: boolean;
    /**
     * Optional, A Boolean which, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning.
     */
    passive?: boolean;
};

declare type UseEventListenerTarget = BasicTarget<HTMLElement | Element | Window | Document>;

export declare function useExternal(path?: string | Ref<string>, options?: UseExternalOptions): Readonly<Ref<UseExternalStatus>>;

declare interface UseExternalOptions {
    /**
     * The type of extarnal resources which need to load, support `js`/`css`, if no type, it will deduced according to path
     */
    type?: 'js' | 'css';
    /**
     * Attributes supported by `script`
     */
    js?: Partial<HTMLScriptElement>;
    /**
     * Attributes supported by `link`
     */
    css?: Partial<HTMLStyleElement>;
}

declare type UseExternalStatus = 'unset' | 'loading' | 'ready' | 'error';

export declare function useFavicon(href?: string | Ref<string | undefined>): void;

export declare function useFetchs<TData, TParams>(service: UseRequestService<TData, ParamsType<TParams>>, options: UseRequestOptions<TData, ParamsType<TParams>, any> & {
    manual: true;
}, self: {
    fetchKey?: (...args: ParamsType<TParams>) => string;
}): {
    fetchs: Readonly<Ref<{
        readonly [x: string]: {
            readonly data: DeepReadonly<TData> | undefined;
            readonly params: DeepReadonly<TParams>;
            readonly loading: boolean;
            readonly key: string | number;
        };
        readonly [x: number]: {
            readonly data: DeepReadonly<TData> | undefined;
            readonly params: DeepReadonly<TParams>;
            readonly loading: boolean;
            readonly key: string | number;
        };
    }>>;
    fetchRun: (...args: TParams extends any[] ? any[] : any) => void;
};

export declare function useFocusWithin(
/**
 * DOM element or ref
 */
target: BasicTarget, options?: UseFocusWithinOptions): Readonly<Ref<boolean>>;

declare interface UseFocusWithinOptions {
    /**
     * Callback to be executed on focus
     * @param e FocusEvent
     * @returns void
     */
    onFocus?: (e: FocusEvent) => void;
    /**
     * Callback to be executed on blur
     * @param e FocusEvent
     * @returns void
     */
    onBlur?: (e: FocusEvent) => void;
    /**
     * Callback to be executed on focus change
     * @param isFocusWithin boolean
     * @returns void
     */
    onChange?: (isFocusWithin: boolean) => void;
}

export declare function useFormatResult<TData, FData>(data: TData | Ref<TData>, formatResultCallback: (data: TData) => FData): ComputedRef<FData>;

export declare const useFullscreen: (target: BasicTarget, options?: UseFullscreenOptions) => readonly [Readonly<Ref<boolean>>, {
    readonly enterFullscreen: () => void;
    readonly exitFullscreen: () => void;
    readonly toggleFullscreen: () => void;
    readonly isEnabled: true;
}];

declare interface UseFullscreenOptions {
    /**
     * Exit full screen trigger
     * @returns void
     */
    onExit?: () => void;
    /**
     * Enter full screen trigger
     * @returns void
     */
    onEnter?: () => void;
}

export declare function useHover(target: BasicTarget, options?: UseHoverOptions): Ref<boolean>;

declare interface UseHoverOptions {
    /**
     * Callback to be executed on mouse hover
     * @returns void
     */
    onEnter?: () => void;
    /**
     *  Callback to be executed on mouse leave
     * @returns void
     */
    onLeave?: () => void;
    /**
     * Callback to be executed on hover change
     * @param isHovering boolean
     * @returns void
     */
    onChange?: (isHovering: boolean) => void;
}

declare type UseInfiniteData = {
    list: any[];
    [key: string]: any;
};

export declare const useInfiniteScroll: <TData extends UseInfiniteData>(service: UseInfiniteService<TData>, options?: UseInfiniteScrollOptions<TData>) => {
    data: Readonly<Ref<TData | undefined>>;
    loading: Readonly<Ref<boolean>>;
    loadingMore: Readonly<Ref<boolean>>;
    noMore: ComputedRef<boolean>;
    loadMore: () => void;
    loadMoreAsync: () => Promise<TData> | undefined;
    reload: () => void;
    reloadAsync: () => Promise<TData>;
    mutate: (mutateData: any) => void;
    scrollMethod: () => void;
    cancel: () => void;
};

declare interface UseInfiniteScrollOptions<TData extends UseInfiniteData> {
    /**
     * specifies the parent element. If it exists, it will trigger the `loadMore` when scrolling to the bottom. Needs to work with `isNoMore` to know when there is no more data to load
     */
    target?: BasicTarget<Element | Document>;
    /**
     * determines if there is no more data, the input parameter is the latest merged `data`
     * @param data TData
     * @returns boolean
     */
    isNoMore?: (data?: TData) => boolean;
    /**
     * The pixel threshold to the bottom for the scrolling to load
     */
    threshold?: number;
    /**
     * - The default is `false`. That is, the service is automatically executed during initialization.
     * - If set to `true`, you need to manually call `run` or `runAsync` to trigger execution.
     */
    manual?: boolean;
    /**
     * When the content of the array changes, `reload` will be triggered
     */
    reloadDeps?: DependencyList;
    /**
     * Triggered before service execution
     * @returns void
     */
    onBefore?: () => void;
    /**
     * Triggered when service resolve
     * @param data TData
     * @returns void
     */
    onSuccess?: (data: TData) => void;
    /**
     * Triggered when service reject
     * @param e Error
     * @returns void
     */
    onError?: (e: Error) => void;
    /**
     * Triggered when service execution is complete
     * @param data TData
     * @param e Error
     * @returns void
     */
    onFinally?: (data?: TData, e?: Error) => void;
}

declare type UseInfiniteService<TData extends UseInfiniteData> = (currentData?: TData) => Promise<TData>;

export declare function useInterval(
/**
 * The function to be executed every `delay` milliseconds.
 */
fn: () => void, 
/**
 * The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if delay is set to `undefined`.
 */
delay: Ref<number | undefined> | number | undefined, options?: {
    /**
     * Whether the function should be executed immediately on first execution.
     */
    immediate?: boolean;
}): void;

export declare function useInViewport(target: BasicTarget, options?: UseInViewportOptions): readonly [Readonly<Ref<boolean | undefined>>, Readonly<Ref<number | undefined>>];

declare interface UseInViewportOptions {
    /**
     * Margin around the root
     */
    rootMargin?: string;
    /**
     * Either a single number or an array of numbers which indicate at what percentage of the target's visibility the ratio should be executed
     */
    threshold?: number | number[];
    /**
     * The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
     */
    root?: BasicTarget<Element>;
}

export declare function useKeyPress(keyFilter: UseKeyPressKeyFilter, eventHandler: UseKeyPressEventHandler, option?: UseKeyPressOptions): void;

declare type UseKeyPressEventHandler = (event: KeyboardEvent) => void;

declare type UseKeyPressKeyEvent = 'keydown' | 'keyup';

declare type UseKeyPressKeyFilter = UseKeyPressKeyType | UseKeyPressKeyType[] | ((event: KeyboardEvent) => boolean);

declare type UseKeyPressKeyType = number | string;

declare type UseKeyPressOptions = {
    /**
     * Trigger Events
     */
    events?: UseKeyPressKeyEvent[];
    /**
     * DOM element or ref
     */
    target?: UseKeyPressTarget;
    /**
     * Exact match. If set true, the event will only be trigger when the keys match exactly. For example, pressing [shif + c] will not trigger [c]
     */
    exactMatch?: boolean;
};

declare type UseKeyPressTarget = BasicTarget<HTMLElement | Document | Window>;

export declare const useLocalStorageState: <T>(key: string | Ref<string>, options?: OptionsWithDefaultValue<T> | undefined) => StorageStateResultHasDefaultValue<T>;

export declare function useLockFn<P extends any[], V>(fn: (...args: P) => Promise<V>): (...args: P) => Promise<V | undefined>;

export declare function useMap<K, T>(initialValue?: UseMapValue<K, T>): [Readonly<Ref<Map<K, T>>>, UseMapActions<K, T>];

declare type UseMapActions<K, T> = {
    /**
     * Add item
     * @param key K
     * @param value T
     * @returns void
     */
    set: (key: K, value: T) => void;
    /**
     * Get item
     * @param key K
     * @param value T
     * @returns undefined
     */
    get: (key: K) => T | undefined;
    /**
     *  Remove key
     * @param key K
     * @returns void
     */
    remove: (key: K) => void;
    /**
     * Add item
     * @param key K
     * @returns boolean
     */
    has: (key: K) => boolean;
    /**
     * clear
     * @returns void
     */
    clear: () => void;
    /**
     *  Set a new Map
     * @param newMap UseMapValue<K, T>
     * @returns void
     */
    setAll: (newMap: UseMapValue<K, T>) => void;
    /**
     * Reset to default
     * @returns void
     */
    reset: () => void;
};

declare type UseMapValue<K, T> = Iterable<readonly [K, T]>;

export declare function useMedia(
/**
 * Media to query for an array of objects
 */
queries: any[], 
/**
 * The default value for each media query object
 */
values: {
    [x: string]: any;
}, 
/**
 * DefaultValue
 */
defaultValue: any): any;

export declare function useMouse(target?: BasicTarget): Readonly<Ref<{
    readonly screenX: number;
    readonly screenY: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly elementX: number;
    readonly elementY: number;
    readonly elementH: number;
    readonly elementW: number;
    readonly elementPosX: number;
    readonly elementPosY: number;
}>>;

export declare function useNetwork(): Readonly<Ref<UseNetworkState>>;

declare interface UseNetworkState {
    since?: Date;
    online?: boolean;
    rtt?: number;
    type?: string;
    downlink?: number;
    saveData?: boolean;
    downlinkMax?: number;
    effectiveType?: string;
}

export declare function usePreview(md: Parameters<typeof createApp> | Ref<string> | string | VueElement): {
    container: Ref<Element | undefined>;
};

export declare function usePrevious<T>(state: Ref<T> | ComputedRef<T>, shouldUpdate?: UsePreviousShouldUpdateFunc<T>): Readonly<Ref<DeepReadonly<T> | undefined>>;

declare type UsePreviousShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean;

export declare function useRequest<TData, TParams extends unknown[] = unknown[], PluginsOptions extends UseRequestPlugin<TData, TParams>[] = UseRequestPlugin<TData, TParams>[]>(service: UseRequestService<TData, TParams>, options?: UseRequestOptions<TData, TParams, PluginsOptions extends (infer P)[] ? P extends UseRequestPlugin<TData, TParams, infer R> ? R : never : never>, plugins?: PluginsOptions): useRequestResult<TData, TParams>;

declare interface UseRequestBasicOptions<TData, TParams extends unknown[]> {
    /**
     * Init data.
     */
    initialData?: TData;
    /**
     * - The default is `false.` That is, the service is automatically executed during initialization.
     * - f set to `true`, you need to manually call `run` or r`unAsync` to trigger execution.
     */
    manual?: boolean;
    /**
     * 	The parameters passed to the service at the first default execution
     */
    defaultParams?: TParams;
    /**
     * Triggered before service execution
     * @param params TParams
     * @returns void
     */
    onBefore?: (params: TParams) => void;
    /**
     * Triggered when service resolve.
     * @param data TData
     * @param params TParams
     * @returns void
     */
    onSuccess?: (data: TData, params: TParams) => void;
    /**
     * Triggered when service reject.
     * @param e Error
     * @param params TParams
     * @returns void
     */
    onError?: (e: Error, params: TParams) => void;
    /**
     * Triggered when service execution is complete.
     * @param params TParams
     * @param data TData
     * @param e Error
     * @returns void
     */
    onFinally?: (params: TParams, data?: TData, e?: Error) => void;
    /**
     * Is the current request ready
     */
    ready?: Ref<boolean> | boolean;
    /**
     * Dependent on responsive objects, and the `watch` incoming listener object usage for `vue`.
     */
    refreshDeps?: WatchSource[] | boolean;
    refreshDepsAction?: () => void;
    /**
     * Set the delay time for `loading` to become `true`.
     *
     */
    loadingDelay?: number | Ref<number>;
    /**
     * Format the request results, which recommend to use `useFormatResult`
     * @param data TData
     * @returns unknown need cover TData
     */
    formatResult?: (data?: TData) => unknown;
    /**
     * Polling interval, in milliseconds. If the value is greater than 0, the polling mode is activated.
     */
    pollingInterval?: Ref<number> | number;
    /**
     * Whether to continue polling when the page is hidden. If set to false, polling will be temporarily paused when the page is hidden, and resume when the page is visible again.
     */
    pollingWhenHidden?: boolean;
    /**
     * Number of polling error retries. If set to -1, `an infinite number of times`.
     */
    pollingErrorRetryCount?: number;
    /**
     * Whether to re-initiate the request when the screen refocus or revisible.
     */
    refreshOnWindowFocus?: Ref<boolean> | boolean;
    /**
     * Re-request interval, in milliseconds.
     */
    focusTimespan?: Ref<number> | number;
    /**
     * Debounce delay time, in milliseconds. After setting, enter the debounce mode.
     */
    debounceWait?: Ref<number> | number;
    /**
     * Execute the request before the delay starts.
     */
    debounceLeading?: Ref<boolean> | boolean;
    /**
     * Execute the request after the delay ends.
     */
    debounceTrailing?: Ref<boolean> | boolean;
    /**
     * The maximum time request is allowed to be delayed before it’s executed.
     */
    debounceMaxWait?: Ref<number> | number;
    /**
     * Throttle wait time, in milliseconds. After setting, enter the throttle mode.
     */
    throttleWait?: Ref<number> | number;
    /**
     * Execute the request before throttling starts.
     */
    throttleLeading?: Ref<boolean> | boolean;
    /**
     * Execute the request after throttling ends.
     */
    throttleTrailing?: Ref<boolean> | boolean;
    /**
     * A unique ID of the request. If `cacheKey` is set, we will enable the caching mechanism. The data of the same `cacheKey` is globally synchronized.
     */
    cacheKey?: string;
    /**
     * - Set the cache time. By default, the cached data will be cleared after 5 minutes.
     * - If set to `-1`, the cached data will never expire.
     */
    cacheTime?: number;
    /**
     * - Time to consider the cached data is fresh. Within this time interval, the request will not be re-initiated.
     * - If set to `-1`, it means that the data is always fresh
     */
    staleTime?: number;
    /**
     * - Custom set cache.
     * - `setCache` and `getCache` need to be used together.
     * - In the custom cache mode, `cacheTime` and `clearCache` are useless, please implement it yourself according to the actual situation.
     * @param data CachedData
     * @returns void
     */
    setCache?: (data: CachedData<TData, TParams>) => void;
    /**
     *  Custom get cache
     * @param params TParams
     * @returns CachedData
     */
    getCache?: (params: TParams) => CachedData<TData, TParams> | undefined;
    /**
     * The number of retries. If set to `-1`, it will try again indefinitely.
     */
    retryCount?: number;
    /**
     * - Retry interval in milliseconds.
     * If not set, the simple exponential backoff algorithm will be used by default, taking `1000 * 2 ** retryCount`, that is, waiting for 2s for the first retry, and 4s for the second retry. By analogy, if it is greater than 30s, take 30s.
     */
    retryInterval?: number;
}

declare interface UseRequestFetchState<TData, TParams extends unknown[]> {
    loading: boolean;
    params?: TParams;
    data?: TData;
    error?: Error | unknown;
}

declare type UseRequestOptions<TData, TParams extends unknown[], TPlugin> = {
    [K in keyof UseRequestBasicOptions<TData, TParams>]: UseRequestBasicOptions<TData, TParams>[K];
} & {
    [K in keyof TPlugin]: TPlugin[K];
};

declare interface UseRequestPlugin<TData, TParams extends unknown[] = unknown[], TPlugin = any> {
    (fetchInstance: Fetch<TData, TParams>, options: UseRequestOptions<TData, TParams, TPlugin>): UseRequestPluginReturn<TData, TParams>;
    onInit?: (options: UseRequestOptions<TData, TParams, TPlugin>) => Partial<UseRequestFetchState<TData, TParams>>;
}

declare interface UseRequestPluginReturn<TData, TParams extends unknown[]> {
    onBefore?: (params: TParams) => ({
        stopNow?: boolean;
        returnNow?: boolean;
    } & Partial<UseRequestFetchState<TData, TParams>>) | void;
    onRequest?: (service: UseRequestService<TData, TParams>, params: TParams) => {
        servicePromise?: Promise<TData>;
    };
    onSuccess?: (data: TData, params: TParams) => void;
    onError?: (e: Error, params: TParams) => void;
    onFinally?: (params: TParams, data?: TData, e?: Error) => void;
    onCancel?: () => void;
    onMutate?: (data: TData) => void;
}

export declare function useRequestProvider(config: UseRequestOptions<unknown, any, any>): void;

declare interface useRequestResult<TData, TParams extends unknown[]> {
    /**
     * Is the service being executed.
     */
    loading: Readonly<Ref<boolean>>;
    /**
     * Data returned by service.
     */
    data: Readonly<Ref<TData | undefined>>;
    /**
     * 	Exception thrown by service.
     */
    error: Readonly<Ref<Error | undefined>>;
    /**
     * params	An array of parameters for the service being executed. For example, you triggered `run(1, 2, 3)`, then params is equal to `[1, 2, 3]`.
     */
    params: Readonly<Ref<TParams | []>>;
    /**
     * Ignore the current promise response.
     */
    cancel: Fetch<TData, TParams>['cancel'];
    /**
     * Use the last params, call `run` again.
     */
    refresh: Fetch<TData, TParams>['refresh'];
    /**
     * Use the last params, call `runAsync` again.
     */
    refreshAsync: Fetch<TData, TParams>['refreshAsync'];
    /**
     * Manually trigger the execution of the service, and the parameters will be passed to the service.
     */
    run: Fetch<TData, TParams>['run'];
    /**
     * Automatic handling of exceptions, feedback through `onError`
     */
    runAsync: Fetch<TData, TParams>['runAsync'];
    /**
     * Mutate `data` directly
     */
    mutate: Fetch<TData, TParams>['mutate'];
}

declare type UseRequestService<TData, TParams extends unknown[]> = (...args: TParams) => Promise<TData>;

export declare function useScroll(target?: UseScrollTarget, shouldUpdate?: UseScrollListenController): Readonly<Ref<Position | undefined>>;

declare type UseScrollListenController = (val: Position) => boolean;

declare type UseScrollTarget = BasicTarget<Element | Document>;

export declare const useSessionStorageState: <T>(key: string | Ref<string>, options?: OptionsWithDefaultValue<T> | undefined) => StorageStateResultHasDefaultValue<T>;

export declare function useSet<T = any>(initialValue?: T[]): [Readonly<Ref<Set<T>>>, UseSetActions<T>];

declare interface UseSetActions<T> {
    add: (value: T) => void;
    remove: (value: T) => void;
    has: (value: T) => boolean;
    clear: () => void;
    reset: () => void;
}

export declare function useSetState<S extends Record<string, any>>(initialState: UseSetStateType<S>): [
DeepReadonly<UnwrapNestedRefs<[S] extends [Ref<any>] ? S : Ref<UnwrapRef<S>>>>,
(patch: Record<string, any>, cover?: boolean) => void
];

declare type UseSetStateType<S> = S | (() => S) | Ref<S> | (() => Ref<S>);

/**
 *
 * @param {dom id节点或者 ref句柄} target
     */
 export declare function useSize(target: BasicTarget): Size;

 export declare function useThrottle<T>(value: Ref<T>, options?: UseThrottleOptions): Ref<any>;

 export declare function useThrottleFn<T extends noop_3>(fn: T, options?: UseThrottleOptions): {
     run: ComputedRef<DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>>>;
     cancel: () => void;
     flush: () => ReturnType<T> | undefined;
 };

 declare interface UseThrottleOptions {
     wait?: number;
     leading?: boolean;
     trailing?: boolean;
 }

 export declare function useTimeout(fn: () => void, delay: Ref<number | undefined> | number | undefined, options?: {
     immediate?: boolean;
 }): void;

 export declare function useTitle(title: Ref<string> | string, options?: UseTitleOptions): void;

 declare interface UseTitleOptions {
     restoreOnUnmount?: boolean;
 }

 export declare function useToggle<T = boolean>(): [Ref<T>, UseToggleActions<T>];

 export declare function useToggle<T = boolean>(defaultValue: T): [Ref<T>, UseToggleActions<T>];

 export declare function useToggle<T, U>(defaultValue: T, reverseValue: U): [Ref<T | U>, UseToggleActions<T | U>];

 declare interface UseToggleActions<T> {
     setLeft: () => void;
     setRight: () => void;
     set: (value: T) => void;
     toggle: () => void;
 }

 declare type UseTrackedEffect = (changes?: number[], previousDeps?: Ref[], currentDeps?: Ref[]) => void | (() => void);

 export declare const useTrackedEffect: (effect: UseTrackedEffect, deps?: Ref[]) => void;

 export declare function useUpdate(): {
     update: Readonly<Ref<{}>>;
     setUpdate: () => void;
 };

 export declare function useUrlState<S extends UrlState = Partial<UrlState>>(initialState?: S | (() => S), options?: UseUrlStateOptions): Ref<S>;

 declare interface UseUrlStateOptions {
     localStorageKey?: string;
     detectNumber?: boolean;
     routerPush?: (url: string) => void;
 }

 export declare const useVirtualList: <T = any>(list: Ref<T[]>, options: UseVirtualListOptions<T>) => readonly [Ref<{
     index: number;
     data: T;
 }[]>, {
     ref: (ele: any) => void;
     onScroll: (e: any) => void;
 }, (index: number) => void];

 declare interface UseVirtualListOptions<T> {
     wrapperTarget: Ref<UseVirtualListTargetValue<HTMLElement>>;
     itemHeight: number | ((index: number, data: T) => number);
     overscan?: number;
 }

 declare type UseVirtualListTargetValue<T> = T | undefined | null;

 /**
  * @param socketUrl socketUrl地址
  * @param options 配置
  * @return  readyState(Connecting = 0,Open = 1,Closing = 2,Closed = 3)
  */
 export declare function useWebSocket(socketUrl: Ref<string> | string, options?: UseWebSocketOptions): UseWebSocketResult;

 declare interface UseWebSocketOptions {
     reconnectLimit?: number;
     reconnectInterval?: number;
     manual?: Ref<boolean> | boolean;
     onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
     onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
     onMessage?: (message: WebSocketEventMap['message'], instance: WebSocket) => void;
     onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;
     protocols?: string | string[];
 }

 declare interface UseWebSocketResult {
     latestMessage: Readonly<Ref<WebSocketEventMap['message'] | undefined>>;
     sendMessage?: WebSocket['send'];
     disconnect?: () => void;
     connect?: () => void;
     readyState: Readonly<Ref<ReadyState_2>>;
     webSocketIns?: WebSocket;
 }

 export declare function useWhyDidYouUpdate(componentName: string, props: IProps): void;

 export declare function useWinResize(Action?: () => void): null;

 export { }
