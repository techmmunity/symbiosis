import { v4 } from "uuid";
import { PrimaryGeneratedColumn } from "../../lib/decorators/primary-generated-column";
import { SymbiosisError } from "../../lib/error";
import { SymbiosisErrorCodeEnum } from "../../lib/error/types/error-code.enum";
import { MetadataUtil } from "../../lib/utils/metadata-util";

describe("Decorators > PrimaryGeneratedColumn", () => {
	describe("Implicitly Type", () => {
		it("should add column metadata correctly (string)", () => {
			class Test {
				@PrimaryGeneratedColumn()
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					primary: true,
					isAutoGenerated: true,
					autoGenerationType: "ENTITY_TO_DATABASE",
					autoGenerate: v4,
					name: "foo",
					type: String,
				},
			]);
		});

		it("should add column metadata correctly (number)", () => {
			class Test {
				@PrimaryGeneratedColumn()
				public foo: number;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					primary: true,
					isAutoGenerated: true,
					autoGenerationType: "ENTITY_TO_DATABASE",
					autoGenerate: v4,
					name: "foo",
					type: Number,
				},
			]);
		});

		it("should add column metadata correctly (date)", () => {
			class Test {
				@PrimaryGeneratedColumn()
				public foo: Date;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					primary: true,
					isAutoGenerated: true,
					autoGenerationType: "ENTITY_TO_DATABASE",
					autoGenerate: v4,
					name: "foo",
					type: Date,
				},
			]);
		});
	});

	describe("Specified Strategy At Decorator Params", () => {
		it("should define strategy that is passed as param", () => {
			class Test {
				@PrimaryGeneratedColumn("uuid")
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isAutoGenerated: true,
					autoGenerationType: "ENTITY_TO_DATABASE",
					autoGenerate: v4,
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified Strategy At Decorator Options", () => {
		it("should define strategy that is passed at the options", () => {
			class Test {
				@PrimaryGeneratedColumn({
					strategy: "uuid",
				})
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isAutoGenerated: true,
					autoGenerationType: "ENTITY_TO_DATABASE",
					autoGenerate: v4,
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified DatabaseName At Decorator Options", () => {
		it("should define database name that is passed at the options", () => {
			class Test {
				@PrimaryGeneratedColumn({
					name: "bar",
				})
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "bar",
					isNameAlreadyFormatted: true,
					isAutoGenerated: true,
					autoGenerationType: "ENTITY_TO_DATABASE",
					autoGenerate: v4,
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified Extras At Decorator Options", () => {
		it("should define extras that is passed at the options", () => {
			class Test {
				@PrimaryGeneratedColumn({
					extras: {
						foo: "bar",
					},
				})
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					extras: {
						foo: "bar",
					},
					primary: true,
					isAutoGenerated: true,
					autoGenerationType: "ENTITY_TO_DATABASE",
					autoGenerate: v4,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("General Errors", () => {
		const ERROR_MESSAGE =
			"Primary columns can only have simple types, ARRAYS, OBJECTS and CLASSES aren't supported";
		const ERROR_DETAILS = ["Entity: Test", "Column: foo"];

		it("should throw an error if invalid type specified", () => {
			let result: any;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {
					@PrimaryGeneratedColumn()
					public foo: any;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if complex type specified (array)", () => {
			let result: any;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {
					@PrimaryGeneratedColumn()
					public foo: Array<string>;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if complex type specified (custom type)", () => {
			let result: any;

			try {
				class CustomType {}

				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {
					@PrimaryGeneratedColumn()
					public foo: CustomType;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if invalid strategy", () => {
			let result: any;

			try {
				class Test {
					@PrimaryGeneratedColumn("invalid_strategy" as any)
					public foo: string;
				}

				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				Test;
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe("Invalid Strate To Auto Generation");
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(["Entity: Test", "Column: foo"]);
		});
	});
});
