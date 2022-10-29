import React from 'react';
import defaultClasses from 'Components/Filters/filters.module.css';
import Filter from 'Components/Filters/filter';
import { useFilters } from 'Talons/Filters/useFilters';
import { mergeClasses } from 'Helper/classify';

const Filters = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        aggregations,
        filters,
        handleFilterChange,
        __
    } = useFilters(props);

    return (
        <div className={classes.root}>
            <h3>{__('Filters')}</h3>
            {aggregations.filter(filter => !filter.options || filter.options.length).map(filter => 
                <Filter key={filter.id} handleFilterChange={handleFilterChange} filter={filter} value={filters[filter.code] || []} />
            )}
        </div>
    );
};

export default Filters;
