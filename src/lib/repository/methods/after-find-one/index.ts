import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOneOptions } from "../../types/find-options";
import { BaseQueryOptions } from "../../types/query-options";
import { basicFormatDataArray } from "../@helpers/basic-format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterFindOneParams<Entity> {
	dataToReturn?: DatabaseEntity;
	conditions: FindOneOptions<Entity>;
	options?: BaseQueryOptions;
}

export const afterFindOne = <Entity>(
	{ entity, entityManager }: Injectables,
	{ dataToReturn }: AfterFindOneParams<Entity>,
) => {
	if (!dataToReturn) return;

	const dataHandled = basicFormatDataArray<Entity>({
		data: [dataToReturn],
		entity,
		entityManager,
	});

	return dataHandled.shift()!;
};
