const { Op } = require("sequelize");
const {
	ValidationError,
	MissingResultOptionsError,
	AttributesNotFoundError
} = require("./errors");
const sequelize = require("./db");

const Operations = {
	SORT: "sort",
	FILTER: "filter"
};

const testResultOption = (result_options) => {
	if (!result_options) {
		throw new MissingResultOptionsError("result_options is required");
	}
	const rawAttributes =
		sequelize.models[result_options.model].getAttributes();
	for (let operation in result_options.attributes) {
		for (let attribute of result_options.attributes[operation]) {
			if (!(attribute in rawAttributes)) {
				throw new AttributesNotFoundError(
					`${attribute} attribute not found in ${result_options.model} model`
				);
			}
		}
	}
	result_options.attributes.sort = result_options.attributes.sort || [];
	result_options.attributes.singleValue =
		result_options.attributes.singleValue || [];
	result_options.attributes.multiValue =
		result_options.attributes.multiValue || [];
	result_options.attributes.search = result_options.attributes.search || [];
};

const addPagingToQueryOptions = (req, queryOptions) => {
	const { page } = req.query;
	if (!page) {
		return;
	}
	if (!Number.isInteger(+page.size) || !Number.isInteger(+page.number)) {
		throw new ValidationError("paging paramters not valid");
	}
	queryOptions.limit = +page.size;
	queryOptions.offset = page.number * queryOptions.limit - queryOptions.limit;
};

const addSortingToQueryOptions = (req, queryOptions, attributes) => {
	let { sort } = req.query;
	const addedAttributes = [];
	queryOptions.order = [];
	if (!sort) return;
	sort = Array.isArray(sort) ? sort : [sort];
	const validOpertors = ["asc", "desc"];
	for (let value of sort) {
		const { attribute, operator } = validateValueAndReforamtIt(
			value,
			attributes,
			validOpertors,
			Operations.SORT
		);
		if (addedAttributes.includes(attribute))
			throw new ValidationError("duplicated attripute in sort paramters");
		queryOptions.order = [
			...queryOptions.order,
			[attribute, operator.toUpperCase()]
		];
		addedAttributes.push(attribute);
	}
};

const addFilteringToQueryOptions = (req, queryOptions, attributes) => {
	let { filter } = req.query;
	queryOptions.where = {};
	if (!filter) return;
	filter = Array.isArray(filter) ? filter : [filter];
	const validOpertors = [
		"lt",
		"lte",
		"gt",
		"gte",
		"eq",
		"between",
		"in",
		"srh"
	];
	for (let value of filter) {
		let { attribute, operator, operands } = validateValueAndReforamtIt(
			value,
			attributes,
			validOpertors,
			Operations.FILTER
		);
		operands = operands.length === 1 ? operands[0] : operands;
		if (operator.toLowerCase() !== "srh") {
			queryOptions.where = {
				...queryOptions.where,
				[attribute]: {
					...queryOptions.where[attribute],
					[Op[operator.toLowerCase()]]: operands
				}
			};
		} else {
			queryOptions.where = {
				...queryOptions.where,
				[Op.and]: operands.split("_").map((value) => {
					return { [attribute]: { [Op.iLike]: `%${value}%` } };
				})
			};
		}
	}
};

const validateValueAndReforamtIt = (
	value,
	attributeList,
	opertorsList,
	operation
) => {
	const [attribute, operator, ...operands] = value.split("__");
	validateOperators(value, operator, opertorsList);
	validateAttributes(value, attribute, operator, attributeList);
	validateOperands(value, operands, operator, operation);
	return { attribute, operator, operands };
};

const validateAttributes = (value, attribute, operator, attributeList) => {
	if (
		!["in", "srh"].includes(operator.toLowerCase()) &&
		!attributeList[0].includes(attribute)
	) {
		throw new ValidationError(
			`${value}: ${attribute} attribute is not valid`
		);
	}
	if (
		"in" === operator.toLowerCase() &&
		!attributeList[1].includes(attribute)
	) {
		throw new ValidationError(
			`${value}: ${attribute} attribute is not valid`
		);
	}
	if (
		"srh" === operator.toLowerCase() &&
		!attributeList[2].includes(attribute)
	) {
		throw new ValidationError(
			`${value}: ${attribute} attribute is not valid`
		);
	}
};

const validateOperators = (value, operator, opertorsList) => {
	if (!operator) {
		throw new ValidationError(`${value}: operator is required`);
	}
	if (!opertorsList.includes(operator.toLowerCase())) {
		throw new ValidationError(
			`${value}: ${operator} operator is not valid`
		);
	}
};

const validateOperands = (value, operands, operator, operation) => {
	if (operands.length !== 0 && operation === Operations.SORT) {
		throw new ValidationError(
			`${value}: ${operation} do not take operands`
		);
	}
	if (
		operation === Operations.FILTER &&
		operands.length !== 2 &&
		"between" === operator.toLowerCase()
	) {
		throw new ValidationError(`${value}: number of operands is not valid`);
	} else if (
		operation === Operations.FILTER &&
		operands.length !== 1 &&
		!["in", "between"].includes(operator.toLowerCase())
	) {
		throw new ValidationError(`${value}: number of operands is not valid`);
	}
};

module.exports = {
	testResultOption,
	addPagingToQueryOptions,
	addSortingToQueryOptions,
	addFilteringToQueryOptions
};
