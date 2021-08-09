import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > hasEntityMetadata", () => {
	const entity = class CustomClass {};

	beforeAll(() => {
		MetadataUtil.defineAllEntityMetadata({
			entity,
			metadata: {
				name: "entity",
				databaseName: "entity",
				columns: [],
			},
		});
	});

	describe("Valid metadata", () => {
		it("should return true with 'name' metadata", () => {
			const result = MetadataUtil.hasEntityMetadata({
				entity,
				metadataKey: "name",
			});

			expect(result).toBeTruthy();
		});

		it("should return true with 'databaseName' metadata", () => {
			const result = MetadataUtil.hasEntityMetadata({
				entity,
				metadataKey: "databaseName",
			});

			expect(result).toBeTruthy();
		});

		it("should return true with 'columns' metadata", () => {
			const result = MetadataUtil.hasEntityMetadata({
				entity,
				metadataKey: "columns",
			});

			expect(result).toBeTruthy();
		});
	});

	describe("Invalid metadata", () => {
		it("should return true with 'isSubEntity' metadata", () => {
			const result = MetadataUtil.hasEntityMetadata({
				entity,
				metadataKey: "isSubEntity",
			});

			expect(result).toBeFalsy();
		});

		it("should return true with 'random' metadata", () => {
			const result = MetadataUtil.hasEntityMetadata({
				entity,
				metadataKey: "random",
			});

			expect(result).toBeFalsy();
		});

		it("should return true with 'xyz' metadata", () => {
			const result = MetadataUtil.hasEntityMetadata({
				entity,
				metadataKey: "xyz",
			});

			expect(result).toBeFalsy();
		});
	});
});
