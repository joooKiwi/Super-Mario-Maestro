namespace src.util.referencer {

	/**
	 * <p>
	 * A property referencer containing various {@link Map} and {@link Array} on the value stored and the name associated.
	 * </p>
	 *
	 * <p>
	 * The attributes in this class all contain specifications, but are behave similarly.
	 * <table>
	 *     <tr><th style="text-align:center;">private Attribute</th><th style="text-align:center;">public Getter</th><th style="text-align:center;">Public Setter</th><tr>
	 *     <tr><td style="text-align:center;">{@link _size}</td><td style="text-align:center;">{@link size}</td><td style="text-align:center;">value added by 1 when calling {@link add}</td><tr>
	 *     <tr><td style="text-align:center;">{@link _default}</td><td style="text-align:center;">{@link default}</td><td style="text-align:center;">{@link default}</td><tr>
	 *     <tr><td style="text-align:center;">{@link _values}</td><td style="text-align:center;">a readonly reference from {@link values}</td><td style="text-align:center;">1st parameter added when calling {@link add}</td><tr>
	 *     <tr><td style="text-align:center;">{@link _allNames}</td><td style="text-align:center;">a readonly reference from {@link allNames}</td><td style="text-align:center;">2nd parameter added when calling {@link add}</td><tr>
	 *     <tr><td style="text-align:center;">{@link _mapFromValue}</td><td style="text-align:center;">a readonly reference from {@link mapFromValue}</td><td style="text-align:center;">values added from {@link add}</td><tr>
	 *     <tr><td style="text-align:center;">{@link _mapFromName}</td><td style="text-align:center;">a readonly reference from {@link mapFromName}</td><td style="text-align:center;">values added from {@link add}</td><tr>
	 * </table>
	 * </p>
	 *
	 * @author JóôòKiwi
	 */
	export class MapReference<T>
		extends SizeReference {

		private _default: T | null = null;
		protected readonly _values: T[] = [];
		protected readonly _allNames: string[] = [];
		protected readonly _mapFromValue: Map<T, string> = new Map();
		protected readonly _mapFromName: Map<string, T> = new Map();


		public constructor(referenceObject: any, clazz: Function, className?: string) {
			super(referenceObject, clazz, className);
			super._isAttributeFinalized = false;
		}


		public get default(): T | null {
			return this._default;
		}

		public set default(value: T | null) {
			this._default = value;
		}

		public get values(): readonly T[] {
			return this._values;
		}

		public get allNames(): readonly string[] {
			return this._allNames;
		}

		public get mapFromValue(): Readonly<Map<T, string>> {
			return this._mapFromValue;
		}

		public get mapFromName(): Readonly<Map<string, T>> {
			return this._mapFromName;
		}


		public add(value: T, name: string): this {
			this.addOne();
			this._allNames.push(name);
			this._values.push(value);
			this.mapFromName.set(name, value);
			this.mapFromValue.set(value, name);
			return this;
		}


		public newFinalizeReference(): Readonly<FinalizeMapReference<T>> {
			return Object.freeze(new FinalizeMapReference<T>(this));
		}

	}

	/**
	 * A finalize property referencer that is a copy of
	 * the {@link MapReference} received in parameter.
	 * The same apply to this instance when created.
	 *
	 * @see MapReference
	 * @author JóôòKiwi
	 */
	export class FinalizeMapReference<T>
		extends Reference {

		private readonly _size: number;
		private readonly _default: T | null;
		private readonly _values: readonly T[];
		private readonly _allNames: readonly string[];
		private readonly _mapFromValue: Map<T, string>;
		private readonly _mapFromName: Map<string, T>;

		public constructor(reference: MapReference<T>) {
			super(reference.referenceObject, reference.class, reference.className);
			this._size = Object.freeze(reference.size);
			this._default = Object.freeze(reference.default);
			this._values = Object.freeze(reference.values);
			this._allNames = Object.freeze(reference.allNames);
			this._mapFromValue = <Map<T, string>>Object.freeze(reference.mapFromValue);
			this._mapFromName = <Map<string, T>>Object.freeze(reference.mapFromName);
			Object.freeze(this);
		}


		public get size(): number {
			return this._size;
		}

		public get default(): T | null {
			return this._default;
		}

		public get values(): readonly T[] {
			return this._values;
		}

		public get allNames(): readonly string[] {
			return this._allNames;
		}

		public get mapFromValue(): Map<T, string> {
			return this._mapFromValue;
		}

		public get mapFromName(): Map<string, T> {
			return this._mapFromName;
		}

	}

}