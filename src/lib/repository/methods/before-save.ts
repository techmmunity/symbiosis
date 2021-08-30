import { EntityManager } from "../../entity-manager";
import { BaseQueryOptions } from "../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface BeforeSaveParams<Entity> {
	data: Array<Partial<Entity>> | Partial<Entity>;
	options?: BaseQueryOptions;
}

export const beforeSave = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data, options }: BeforeSaveParams<Entity>,
) => {
	const dataWithAutoGeneratedFields = Array.isArray(data)
		? data.map(d =>
				entityManager.autoGenerateEntityToDatabase({
					events: ["save"],
					entity,
					data: d,
				}),
		  )
		: entityManager.autoGenerateEntityToDatabase({
				events: ["save"],
				entity,
				data,
		  });

	const dataInDatabaseFormat = Array.isArray(dataWithAutoGeneratedFields)
		? dataWithAutoGeneratedFields.map(d =>
				entityManager.convertEntityToDatabase({
					data: d,
					entity,
				}),
		  )
		: entityManager.convertEntityToDatabase({
				data: dataWithAutoGeneratedFields,
				entity,
		  });

	return {
		data: dataInDatabaseFormat,
		options,
	};
};