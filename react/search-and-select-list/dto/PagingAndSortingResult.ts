type PagingAndSortingResult<T> = {
    content: T[],
    empty?: Boolean,
    first: Boolean,
    last: Boolean,
    number?: Number,
    numberOfElements?: Number,
    size: Number,
    totalElements?: Number,
    totalPages?: Number
}

export default PagingAndSortingResult;