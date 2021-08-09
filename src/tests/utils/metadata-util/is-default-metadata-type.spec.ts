import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > isDefaultMetadataType", () => {
	describe("Valid types", () => {
		it("should return true with Number", () => {
			const result = MetadataUtil.isDefaultMetadataType(Number);

			expect(result).toBeTruthy();
		});

		it("should return true with String", () => {
			const result = MetadataUtil.isDefaultMetadataType(String);

			expect(result).toBeTruthy();
		});

		it("should return true with Date", () => {
			const result = MetadataUtil.isDefaultMetadataType(Date);

			expect(result).toBeTruthy();
		});
	});

	describe("Invalid types", () => {
		it("should return false with number", () => {
			const result = MetadataUtil.isDefaultMetadataType(123);

			expect(result).toBeFalsy();
		});

		it("should return false with string", () => {
			const result = MetadataUtil.isDefaultMetadataType("123");

			expect(result).toBeFalsy();
		});

		it("should return false with instance of date", () => {
			const result = MetadataUtil.isDefaultMetadataType(new Date());

			expect(result).toBeFalsy();
		});

		it("should return false with custom class", () => {
			class CustomClass {}

			const result = MetadataUtil.isDefaultMetadataType(CustomClass);

			expect(result).toBeFalsy();
		});

		it("should return false with instance of custom class", () => {
			class CustomClass {}

			const result = MetadataUtil.isDefaultMetadataType(new CustomClass());

			expect(result).toBeFalsy();
		});
	});
});
