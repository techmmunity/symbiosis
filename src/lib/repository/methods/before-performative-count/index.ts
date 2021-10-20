import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindConditions } from "../../queries/types/find-conditions";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: CustomClass;
}

export interface BeforePerformativeCountParams<Entity> {
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const beforePerformativeCount = <Entity>(
	{ entityManager, entity }: Injectables,
	{
		where: rawWhere,
		options: rawOptions,
	}: BeforePerformativeCountParams<Entity>,
) => {
	const result = {} as BeforePerformativeCountParams<DatabaseEntity>;

	result.where = entityManager.formatConditions({
		entity,
		conditions: rawWhere,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
