namespace src.util.referencer {

	/**
	 * <p>
	 * A general reference on a single object based on it prototype/class.
	 * </p>
	 *
	 * This reference can received multiple parameters when trying to create it.<br>
	 * If there is only 2 arguments,
	 * then the 2nd argument will determine the class name by calling {@link Function#name}.<br>
	 * But, it the 3rd argument is specified, then, the {@link className} will be the one received.
	 *
	 * @author JóôòKiwi
	 */
	export class Reference {

		protected _isAttributeFinalized: boolean = true;

		private readonly _referenceObject: any;
		private readonly _class: Function;
		private readonly _className: string;

		public constructor(referenceObject: any, clazz: Function)
		public constructor(referenceObject: any, clazz: Function, className: string)
		public constructor(referenceObject: any, clazz: Function, className?: string) {
			this._referenceObject = Object.freeze(referenceObject);
			this._class = Object.freeze(clazz);
			this._className = Object.freeze(className == null ? clazz.name : className);
		}


		public get isAttributeFinalized(): boolean {
			return this._isAttributeFinalized;
		}

		public get referenceObject(): any {
			return this._referenceObject;
		}

		public get class(): Function {
			return this._class;
		}

		public get className(): string {
			return this._className;
		}

	}

}