import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Generic shape returned by a paginated/sorted data source
 * (e.g. a Spring Data "Page" response).
 */
export interface PagingAndSortingResult<T> {
    content: T[];
    size: number;
    first: boolean;
    last: boolean;
    totalElements?: number;
    totalPages?: number;
    number?: number;
}

/**
 * Signature for the function that fetches a page of results
 * given the current search query and page number.
 */
export type ItemsQueryFn<T> = (
    query: string,
    pageNumber: number
) => Promise<PagingAndSortingResult<T>>;

export interface UsePagingAndSortingOptions<T> {
    /** Called whenever (query, pageNumber) changes; must resolve with a page of results. */
    onItemsQuery: ItemsQueryFn<T>;
    /** Optional callback fired whenever the selection changes. */
    onSelectedItemsChange?: (selectedItems: T[]) => void;
    /** Delay (ms) before hiding the spinner after data arrives. Defaults to 500. */
    spinnerHideDelay?: number;
    /** Initial search query. Defaults to ''. */
    initialQuery?: string;
    /** Initial page number. Defaults to 0. */
    initialPageNumber?: number;
    materialIcon?: string;
    maxSelection?: number;
    allowHorizontalView?: boolean;
    allowVerticalInlineDisplay?: boolean;
}

export interface UsePagingAndSortingReturn<T> {
    // data
    result: PagingAndSortingResult<T>;
    showSpinner: boolean;

    // paging
    pageNumber: number;
    setPageNumber: (page: number) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    goToNextPage: () => void;
    goToPreviousPage: () => void;

    // query / search
    query: string;
    setQuery: (query: string) => void;

    // selection
    selectedItem: T[];
    setSelectedItem: (selectedItems: T[]) => void;
    isElementSelected: (item: T) => boolean;
    unselectItem: (idx: number) => void;
    toggleItemSelection: (item: T) => void;
    clearSelection: () => void;

    allowHorizontalView: boolean;
    maxSelection: number;
    setMaxSelection: (num: number) => void;
    materialIcon: string;
    setMaterialIcon: (icon: string) => void;
    isHorizontalView: boolean;
    setIsHorizontalView: (flag: boolean) => void;
}

/**
 * Deep-equality check via JSON serialization.
 * NOTE: relies on stable key ordering; fine for plain data objects,
 * not safe for objects containing functions, dates that must compare
 * by value semantics, or circular references.
 */
const deepCompare = (a: unknown, b: unknown): boolean =>
    JSON.stringify(a) === JSON.stringify(b);

/**
 * Encapsulates paging, querying, loading state, and multi-selection
 * for a list/table backed by a paginated data source.
 *
 * Usage:
 *   const {
 *     result, showSpinner, pageNumber, setPageNumber,
 *     hasNext, hasPrevious, query, setQuery,
 *     selectedItem, setSelectedItem, isElementSelected, unselectItem
 *   } = usePagingAndSorting<MyItemType>({
 *     onItemsQuery: (query, pageNumber) => api.fetchItems(query, pageNumber),
 *     onSelectedItemsChange: (items) => console.log('selected:', items),
 *   });
 */
export function usePagingAndSorting<T = any>({
    onItemsQuery,
    onSelectedItemsChange,
    spinnerHideDelay = 500,
    initialQuery = '',
    initialPageNumber = 0,
    materialIcon = null,
    maxSelection = 0,
    allowHorizontalView = false,
    allowVerticalInlineDisplay = false,
}: UsePagingAndSortingOptions<T>): UsePagingAndSortingReturn<T> {
    const [result, setResult] = useState<PagingAndSortingResult<T>>({
        content: [],
        size: 0,
        first: true,
        last: true,
    });

    const [pageNumber, setPageNumber] = useState<number>(initialPageNumber);
    const [query, setQuery] = useState<string>(initialQuery);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [_allowHorizontalView, _setAllowHorizontalView] = useState<boolean>(allowHorizontalView);
    const [_maxSelection, setMaxSelection] = useState<number>(maxSelection);
    const [_materialIcon, setMaterialIcon] = useState<string>(materialIcon);
    const [isHorizontalView, setIsHorizontalView] = useState<boolean>(true);
    const [selectedItem, _setSelectedItem] = useState<T[]>([]);

    const setSelectedItem = useCallback(
        (selectedItems: T[]) => {
            _setSelectedItem(selectedItems);
            if (onSelectedItemsChange) {
                onSelectedItemsChange(selectedItems);
            }
        },
        [onSelectedItemsChange]
    );

    const hasNext = !result.last;
    const hasPrevious = !result.first;

    const isElementSelected = useCallback(
        (item: T) => selectedItem.some((existing) => deepCompare(item, existing)),
        [selectedItem]
    );

    const unselectItem = useCallback(
        (idx: number) => {
            const next = [...selectedItem];
            next.splice(idx, 1);
            setSelectedItem(next);
        },
        [selectedItem, setSelectedItem]
    );

    const toggleItemSelection = useCallback(
        (item: T) => {
            const existingIdx = selectedItem.findIndex((existing) =>
                deepCompare(item, existing)
            );
            if (existingIdx >= 0) {
                unselectItem(existingIdx);
            } else {
                setSelectedItem([...selectedItem, item]);
            }
        },
        [selectedItem, setSelectedItem, unselectItem]
    );

    const clearSelection = useCallback(() => {
        setSelectedItem([]);
    }, [setSelectedItem]);

    const goToNextPage = useCallback(() => {
        if (hasNext) {
            setPageNumber((prev) => prev + 1);
        }
    }, [hasNext]);

    const goToPreviousPage = useCallback(() => {
        if (hasPrevious) {
            setPageNumber((prev) => Math.max(0, prev - 1));
        }
    }, [hasPrevious]);

    useEffect(() => {
        let cancelled = false;
        setShowSpinner(true);

        onItemsQuery(query, pageNumber).then((_result: PagingAndSortingResult<T>) => {
            if (cancelled) return;
            setResult(_result);
            setTimeout(() => {
                if (!cancelled) setShowSpinner(false);
            }, spinnerHideDelay);
        });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, query]);

    return useMemo(
        () => ({
            result,
            showSpinner,
            pageNumber,
            setPageNumber,
            hasNext,
            hasPrevious,
            goToNextPage,
            goToPreviousPage,
            query,
            setQuery,
            selectedItem,
            setSelectedItem,
            isElementSelected,
            unselectItem,
            toggleItemSelection,
            clearSelection,
            setMaxSelection,
            setMaterialIcon,
            allowHorizontalView: _allowHorizontalView,
            maxSelection: _maxSelection,
            materialIcon: _materialIcon,
            isHorizontalView,
            setIsHorizontalView,
            allowVerticalInlineDisplay,
        }),
        [
            result,
            showSpinner,
            pageNumber,
            hasNext,
            hasPrevious,
            goToNextPage,
            goToPreviousPage,
            query,
            selectedItem,
            setSelectedItem,
            isElementSelected,
            unselectItem,
            toggleItemSelection,
            clearSelection,
            _allowHorizontalView,
            _maxSelection,
            _materialIcon,
            isHorizontalView,
            setIsHorizontalView,
            allowVerticalInlineDisplay,
        ]
    );
}

export default usePagingAndSorting;