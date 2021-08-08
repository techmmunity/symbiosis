import { FindOperatorType } from "./find-operators-type";

interface ConstructorParams<T> {
	type: FindOperatorType;
	values: Array<T>;
	not?: boolean;
}

/**
 * Find Operator used in Find Conditions.
 */
export class FindOperator<T = any> {
	/**
	 * Operator type.
	 */
	public readonly type: FindOperatorType;

	/**
	 * Parameter values.
	 */
	public readonly values: Array<T>;

	/**
	 * Determines if should reverse the query.
	 *
	 * Used for the `Not` operator, who accepts receive
	 * another FindOperator as param.
	 *
	 * Ex: `Not(Between(foo, bar))`
	 */
	public readonly not?: boolean;

	public constructor({ type, values, not }: ConstructorParams<T>) {
		this.type = type;
		this.values = values;
		this.not = not;
	}
}
