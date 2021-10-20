import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOneOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterUpdateParams<Entity> {
	conditions: FindOneOptions<Entity>["where"];
	data: Partial<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const afterUpdate = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data }: AfterUpdateParams<Entity>,
) => {
	const dataHandled = formatData<Entity>({
		data,
		entity,
		entityManager,
	});

	return dataHandled as Entity;
};
