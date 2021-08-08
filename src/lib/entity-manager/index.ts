/* eslint-disable @typescript-eslint/no-explicit-any */

import { Connection } from "../connection";
import { CompassError } from "../error";
import { CompassErrorCodeEnum } from "../error/types/error-code.enum";
import { setEntitiesMetadata } from "./helpers/set-entities-metadata";
import { setSubEntitiesMetadata } from "./helpers/set-sub-entities-metadata";
import {
	convertEntityToDatabase,
	ConvertEntityToDatabaseParams,
} from "./methods/convert-entity-to-database";
import { EntityManagerEntities } from "./types/manager-metadata";

/**
 * Responsible of store and manage all entities metadata
 * for a specific connection.
 */
export class EntityManager<EntityExtraMetadata, ColumnExtraMetadata> {
	/**
	 * Saves the metadata of all the entities, columns, etc
	 *
	 * Format:
	 * ```
	 * 	{
	 * 		[Entity Class Name]: {
	 * 			...[Entity Metadata Here]
	 * 			column: [
	 * 				...[Array Of Columns Metadata]
	 * 			]
	 * 		}
	 * 	}
	 * ```
	 */
	private readonly entities: EntityManagerEntities<
		EntityExtraMetadata,
		ColumnExtraMetadata
	> = {};

	/**
	 * ---------------------------------------------------
	 *
	 * Constructor
	 *
	 * ---------------------------------------------------
	 */

	public constructor(
		connection: Connection<EntityExtraMetadata, ColumnExtraMetadata>,
	) {
		setEntitiesMetadata<EntityExtraMetadata, ColumnExtraMetadata>({
			entities: this.entities,
			logger: connection.logger,
			rawEntities: connection.options.entities,
			connectionOptions: connection.options,
		});

		const allEntitiesColumns = Object.values(this.entities)
			.map(entity => entity.columns)
			.flat();

		setSubEntitiesMetadata<EntityExtraMetadata, ColumnExtraMetadata>({
			allEntitiesColumns,
			entities: this.entities,
			logger: connection.logger,
			connectionOptions: connection.options,
		});
	}

	/**
	 * ---------------------------------------------------
	 *
	 * Getters
	 *
	 * ---------------------------------------------------
	 */

	public getAllEntitiesMetadata() {
		return this.entities;
	}

	/**
	 * Returns ONLY the entities that AREN'T SubEntities
	 */
	public getAllTablesMetadata() {
		return Object.values(this.entities).filter(
			entityMetadata => !entityMetadata.isSubEntity,
		);
	}

	public getAllEntitiesDatabaseNames() {
		return Object.values(this.entities).map(entity => entity.databaseName);
	}

	public getEntityMetadata(entity: any) {
		const entityMetadata = this.entities[entity.name];

		if (!entityMetadata) {
			throw new CompassError({
				message: "Entity not Registered!",
				code: CompassErrorCodeEnum.ENTITY_ERROR,
				origin: "COMPASS",
				details: ["Entity: ", entity],
			});
		}

		return entityMetadata;
	}

	public getColumnMetadata(entity: any, columnName: string) {
		const columnMetadata = this.entities[entity.name]?.columns.find(
			metadata => metadata.name === columnName,
		);

		if (!columnMetadata) {
			throw new CompassError({
				message: "Entity not Registered!",
				code: CompassErrorCodeEnum.COLUMN_ERROR,
				origin: "COMPASS",
				details: ["Entity: ", entity, "Column: ", columnName],
			});
		}

		return columnMetadata;
	}

	public getEntityPrimaryColumns(entity: any) {
		return this.entities[entity.name]?.columns.filter(
			columnMetadata => columnMetadata.primary,
		);
	}

	/**
	 * **[INTERNAL USE]**
	 *
	 * Converts an entity data to database data
	 */
	public convertEntityToDatabase(
		params: ConvertEntityToDatabaseParams,
	): Record<string, any> {
		return convertEntityToDatabase({ metadataManager: this }, params);
	}
}