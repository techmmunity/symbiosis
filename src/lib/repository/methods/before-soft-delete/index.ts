import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindConditions } from "../../queries/types/find-conditions";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: CustomClass;
}

export interface BeforeSoftDeleteParams<Entity> {
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const beforeSoftDelete = <
	Entity,
	EntityExtraMetadata,
	ColumnExtraMetadata,
>(
	{
		entityManager,
		entity,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ where: rawWhere, options: rawOptions }: BeforeSoftDeleteParams<Entity>,
) => {
	const result = {} as BeforeSoftDeleteParams<DatabaseEntity>;

	result.where = entityManager.formatConditions({
		entity,
		conditions: rawWhere,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};