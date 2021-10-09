import { DatabaseEntity } from "../../../../types/database-entity";
import { ColumnMetadata } from "../../../types/column-metadata";
import { IncrementedEntitiesMetadata } from "../../../types/manager-metadata";

interface GetSubEntityValueParams {
	data: DatabaseEntity;
	subEntityMetadata: IncrementedEntitiesMetadata<any, any>;
	columnMetadata: ColumnMetadata<any>;
}

export const getSubEntityValue = ({
	data,
	subEntityMetadata,
	columnMetadata,
}: GetSubEntityValueParams) => {
	const originalValue = data[columnMetadata.name];

	if (originalValue) return originalValue;

	const hasAutoGeneratedColumns = subEntityMetadata.columns.some(
		columnMtdata => columnMtdata.isAutoGenerated,
	);

	if (hasAutoGeneratedColumns) return {};
};