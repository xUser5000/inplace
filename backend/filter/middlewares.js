const {
	testResultOption,
	addPagingToQueryOptions,
	addSortingToQueryOptions,
	addFilteringToQueryOptions
} = require("./utils");

const buildQueryOptionsBasedOnQueryParams = (result_options) => {
	testResultOption(result_options);

	return (req, res, next) => {
		const { enablePaging, enableSorting, enableFiltering, attributes } =
			result_options;
		const queryOptions = {};

		if (enablePaging) addPagingToQueryOptions(req, queryOptions);

		if (enableSorting)
			addSortingToQueryOptions(req, queryOptions, [attributes.sort]);

		if (enableFiltering)
			addFilteringToQueryOptions(req, queryOptions, [
				attributes.singleValue,
				attributes.multiValue,
				attributes.search
			]);

		req.queryOptions = queryOptions;
		next();
	};
};

module.exports = { buildQueryOptionsBasedOnQueryParams };
