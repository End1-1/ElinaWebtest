import { useCallback, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getSearchParam } from './useSearchParam';

/**
 * Sets a query parameter in history. Attempt to use React Router if provided
 * otherwise fallback to builtins.
 *
 * @private
 */
const setQueryParam = ({ history, location, parameter, replace, value }) => {
    const { search } = location;
    const queryParams = new URLSearchParams(search);

    queryParams.set(parameter, value);
    const destination = { search: queryParams.toString() };

    if (replace) {
        history.replace(destination);
    } else {
        history.push(destination);
    }
};

const defaultInitialPage = 1;

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that provides
 * pagination logic.
 *
 * Use this hook to implement components that need to navigate through paged
 * data.
 *
 * @kind function
 *
 * @param {Object} config An object containing configuration values
 *
 * @param {String} config.namespace='' The namespace to append to config.parameter in the query. For example: ?namespace_parameter=value
 * @param {String} config.parameter='page' The name of the query parameter to use for page
 * @param {Number} config.initialPage The initial current page value
 * @param {Number} config.intialTotalPages=1 The total pages expected to be usable by this hook
 *
 * @return {Object[]} An array with two entries containing the following content: [ {@link PaginationState}, {@link API} ]
 */
export const usePagination = (props = {}) => {
    const { namespace = '', parameter = 'page', initialTotalPages = 1 } = props;
    const searchParam = namespace ? `${namespace}_${parameter}` : parameter;
    const history = useHistory();
    const location = useLocation();

    // Fetch the initial page value from location to avoid initializing twice.
    const initialPage =
        props.initialPage ||
        parseInt(getSearchParam(searchParam, location) || defaultInitialPage);

    const initialPerPage = parseInt(getSearchParam('perPage', location) || props.initialPerPage);

    const initialSort = getSearchParam('sort', location) || props.initialSort;

    const initialDir = getSearchParam('dir', location) || props.initialDir || 'asc';

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [currentPerPage, setCurrentPerPage] = useState(initialPerPage);
    const [currentSort, setCurrentSort] = useState(initialSort);
    const [currentDir, setCurrentDir] = useState(initialDir);
    const [totalPages, setTotalPages] = useState(initialTotalPages);

    const setPage = useCallback(
        page => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: searchParam,
                value: page
            });

            // Update the state object.
            setCurrentPage(page);
        },
        [location, searchParam]
    );

    const setPerPage = useCallback(
        perPage => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: 'perPage',
                value: perPage
            });

            // Update the state object.
            setCurrentPerPage(perPage);
        },
        [location, searchParam]
    );

    const setSort = useCallback(
        sort => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: 'sort',
                value: sort
            });

            // Update the state object.
            setCurrentSort(sort);
        },
        [location, searchParam]
    );

    const setDir = useCallback(
        dir => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: 'dir',
                value: dir
            });

            // Update the state object.
            setCurrentDir(dir);
        },
        [location, searchParam]
    );

    /**
     * The current pagination state
     *
     * @typedef PaginationState
     *
     * @kind Object
     *
     * @property {Number} currentPage The current page number
     * @property {Number} totalPages The total number of pages
     */
    const paginationState = { currentPage, totalPages, currentPerPage, currentSort, currentDir };

    /**
     * The API object used for modifying the PaginationState.
     *
     * @typedef API
     *
     * @kind Object
     */
    /**
     * Set the current page
     *
     * @function API.setCurrentPage
     *
     * @param {Number} page The number to assign to the current page
     */
    /**
     * Set the total number of pages
     *
     * @function API.setTotalPages
     *
     * @param {Number} total The number to set the amount of pages available
     */
    const api = useMemo(
        () => ({
            setCurrentPage: setPage,
            setTotalPages,
            setPerPage,
            setSort,
            setDir
        }),
        [setPage, setTotalPages]
    );

    return [paginationState, api];
};
