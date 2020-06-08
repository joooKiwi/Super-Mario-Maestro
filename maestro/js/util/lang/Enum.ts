namespace src.util.lang {

	import FinalizeMapReference = src.util.referencer.FinalizeMapReference;
	import MapReference = src.util.referencer.MapReference;
	import SizeReference = src.util.referencer.SizeReference;

	/**
	 * A Global reference of every enum classes to their own values associated.<br>
	 * This referencer will have as a key the static class received the static method of {@link Enum}
	 *
	 * @author JóôòKiwi
	 */
	const finalizeMapReferences = new Map<Function, Readonly<FinalizeMapReference<any>>>();

	/**
	 * A Global reference of every enum sizes.<br>
	 * But, not from the static call, but from the instance itself.
	 *
	 * @author JóôòKiwi
	 */
	const sizeMapReferences = new Map<string, SizeReference>();

	/**
	 * A private class non-accessible onside of this scope.
	 * It basically return a {@link FinalizeMapReference} when an object is received.<br>
	 * But, if nothing was received or the object received is invalid, then, {@link EMPTY_ENUM_REFERENCE} is returned.<br><br>
	 *
	 * This class only access the class when needed at runtime.<br>
	 * Meaning that the map is populated only when needed from a child {@link Enum} classes.
	 *
	 * @author JóôòKiwi
	 */
	class EnumReferenceGetter {

		/**
		 * <p>
		 * A method that return a {@link Readonly}  {@link FinalizeMapReference}.
		 * If the current reference has not been referenced yet, then, it will be created.
		 * During the process of creating it, a {@link MapReference} is hold to edit every values.
		 * Otherwise, it will simply be returned.
		 * </p>
		 *
		 * <p>
		 * In every cases, a {@link Readonly} {@link FinalizeMapReference} will be returned.
		 * </p>
		 *
		 * @param clazz the class reference
		 * @param className (Optional) the class name different from {@link Function#name}
		 * @private
		 * @return a {@link Readonly} {@link FinalizeMapReference} containing all the information of this instance.
		 * @author JóôòKiwi
		 */
		private static __getOrFinalizeReference(clazz: Function, className?: string): Readonly<FinalizeMapReference<Function>> {
			if (!finalizeMapReferences.has(clazz)) {

				let allNames: string[] = Object.keys(clazz)
					.filter(attribute => !attribute.startsWith('_'))
					.filter(attribute => !attribute.startsWith('get'))
					.filter(attribute => !attribute.startsWith('set'))
					.filter(attribute => Reflect.getOwnPropertyDescriptor(clazz, attribute).value != null);

				let reference = new MapReference(clazz, clazz, className);

				let callbackToRetrieveDefault: (referenceObject?: any) => boolean;
				if (Reflect.has(clazz, '_default')) {
					let defaultObject = Reflect.get(clazz, '_default');
					callbackToRetrieveDefault = referenceObject => reference.default == null && referenceObject == defaultObject;
				} else
					callbackToRetrieveDefault = () => false;

				allNames.forEach(name => {
					let referenceObject = Reflect.get(clazz, name);
					if (callbackToRetrieveDefault(referenceObject))
						reference.default = referenceObject;
					if (!reference.mapFromValue.has(referenceObject))
						reference.add(referenceObject, name);
				});

				finalizeMapReferences.set(clazz, reference.newFinalizeReference());
			}
			return finalizeMapReferences.get(clazz);
		}

		public static getReference(clazz: object): Readonly<FinalizeMapReference<Function>>
		public static getReference(clazz: object, className: string): Readonly<FinalizeMapReference<Function>>
		/**
		 * <p>
		 * A method that return the {@link FinalizeMapReference}
		 * associated from the object received in parameter.
		 * </p>
		 *
		 * <p>
		 * The value {@link EMPTY_ENUM_REFERENCE} will be returned when one
		 * of this condition is met:
		 * <ol>
		 *     <li>the object received is null</li>
		 *     <li>the object received is not a {@link Function}</li>
		 *     <li>the object prototype (parent) is null</li>
		 *     <li>the object prototype (parent) is not a {@link Enum}</li>
		 * </ol>
		 * Otherwise, the method {@link __getOrFinalizeReference} will be called.
		 * </p>
		 *
		 * @param clazz the class to retrieve the reference object
		 * @param className (Optional) the className different from the default {@link Function#name}
		 * @return the reference object associated.
		 * @author JóôòKiwi
		 */
		public static getReference(clazz: object, className?: string): Readonly<FinalizeMapReference<Function>> {
			return (clazz == null || !(clazz instanceof Function) || clazz.prototype == null || !(clazz.prototype instanceof Enum)) ? EMPTY_ENUM_REFERENCE : EnumReferenceGetter.__getOrFinalizeReference(clazz, className);
		}

		public static getReferenceByName(className: string): Readonly<FinalizeMapReference<Function>> {
			for (let [key, value] of finalizeMapReferences)
				if (key.name == className)
					return value;
			return EMPTY_ENUM_REFERENCE;
		}

		public static updateSizeByOne(className: string, clazz: Function): number {
			let sizeMap: SizeReference;
			if (sizeMapReferences.has(className))
				sizeMap = sizeMapReferences.get(className).addOne();
			else {
				sizeMap = new SizeReference(className, clazz, className);
				sizeMapReferences.set(className, sizeMap);
			}
			return sizeMap.size;
		}

	}

	/**
	 * <p>
	 * This class is there to emulate the behaviour of an enum but with some benefit.<br>
	 * It will have some behaviour to add manually to the child class before.
	 * </p>
	 * <p>
	 * The main static methods to add will be :
	 * <ol>
	 *     <li><i>public static get</i> values(): <b>T</b>[] { return {@link Enum#_values}(<b>T</b>); }</li>
	 *     <li><i>public static get</i> size(): number { return {@link Enum#_getSize}(<b>T</b>); }</li>
	 *     <li>(Optional) <i>public get</i> default(): <b>T</b> { return {@link Enum#_getDefault}(<b>T</b>)}; }</li>
	 *     <li><ol>
	 *         <li><i>public static</i> getValue(name:string|String): <b>T</b></li>
	 *         <li><i>public static</i> getValue(index:number|Number): <b>T</b></li>
	 *         <li><i>public static</i> getValue(arg1:number|string|Number|String): <b>T</b> { return {@link Enum#_getValue}(arg1, <b>T</b>); }</li>
	 *     </ol></li>
	 * </ol>
	 * And the main static attributes to add will be :
	 * <ol>
	 *     <li>(Optional) <i>protected static readonly</i> _getDefault: <b>U</b>></li>
	 *     <li>(Optional) <i>protected static readonly</i> _convertValueOnFinalization: callback:(<b>U</b>)=><b>T</b></li>
	 * </ol>
	 * Of course, the value "<b>T</b>" is replaced by the child class.<br>
	 * But the value "<b>U</b>" is representing all the possible values in this instance.
	 * </p>
	 * <p>
	 * In the java language, it is automatically added, <br>
	 * but to have some coherence to this, the same method will need to be there.
	 * </p>
	 * <p>
	 *  Another thing to mention, the constructor of the enum should always be private in case of enum inheritance.
	 * </p>
	 *
	 * <p>
	 * <b>(Warning)</b> This "Enum" class use reflection to determine its map.
	 * The method {@link className} should not be overridden.
	 * Another name should do the job to identify the child attribute.
	 * </p>
	 *
	 *  @author JóôòKiwi
	 */
	export abstract class Enum {

		/**
		 * A reference to this class name in case that the method
		 * {@link Function#name} is overridden.
		 */
		public readonly className = this.constructor.name;
		/**
		 * An attribute assign to this specific instance to identify it by a numeric value.
		 */
		public readonly ordinal: number = EnumReferenceGetter.updateSizeByOne(this.className, this.constructor.prototype);
		private _enumName: string;

		protected constructor() {
			Object.freeze(this.className);
			Object.freeze(this.ordinal);
		}

		/**
		 * A method that return the enum name or the reference enum name.
		 *
		 * @return the variable name or reference variable name
		 */
		public get enumName(): string {
			if (this._enumName == null) {
				Reflect.get(this.constructor, 'values');//Load all values to search in them later from the child static method "values".
				this._enumName = EnumReferenceGetter.getReferenceByName(this.className).allNames[this.ordinal];
				Object.freeze(this._enumName);
			}
			return this._enumName;
		}

		//protected methods to be called by the child.

		protected static _getSize(clazz: null): 0
		protected static _getSize(clazz: Function): number | 0
		protected static _getSize(clazz: object): number | 0
		/**
		 * A method that return the size of the {@link finalizeMapReferences}
		 * from the object received in parameter.
		 *
		 * @param  clazz - the class to retrieve the reference object
		 * @protected
		 * @return the size of the reference object associated.
		 * @author JóôòKiwi
		 */
		protected static _getSize(clazz: object): number | 0 {
			return EnumReferenceGetter.getReference(clazz).values.length;
		}

		/**
		 * A method that return the values of the {@link finalizeMapReferences}
		 * to the object received in parameter.
		 *
		 * @param  clazz the class to retrieve the reference object
		 * @protected
		 * @return the reference object associated.
		 * @author JóôòKiwi
		 */
		protected static _values<T>(clazz: Function): T[] {
			return <T[]><unknown>EnumReferenceGetter.getReference(clazz).values;
		}


		// --------------------utility methods--------------------

		protected static _getDefault(clazz: null): null
		protected static _getDefault<T>(clazz: Function): T | null
		protected static _getDefault(clazz: object): null
		/**
		 * A method that return the default value (if present in the enum class).<br>
		 * It will detect if a variable named <u>_getDefault</u> is present
		 * and then return the default value.<br>
		 * Otherwise, it will be a null returned.
		 *
		 * @param clazz the class to retrieve the reference object
		 * @protected
		 * @return the default value or null
		 * @author JóôòKiwi
		 */
		protected static _getDefault<T>(clazz: object): T | null {
			return <T><unknown>EnumReferenceGetter.getReference(clazz).default;
		}


		private static __getValueFromNumber(index: number | Number, clazz: null): null
		private static __getValueFromNumber<T>(index: number | Number, clazz: Function): T | null
		private static __getValueFromNumber(index: number | Number, clazz: object): null
		private static __getValueFromNumber<T>(index: number | Number, clazz: object): T | null {
			let references = EnumReferenceGetter.getReference(clazz).values;
			return index < references.length ? <T><unknown>references[index instanceof Number ? index.valueOf() : index] : Enum._getDefault(clazz);
		}

		private static __getValueFromString(index: string | String, clazz: null): null
		private static __getValueFromString<T>(index: string | String, clazz: Function): T | null
		private static __getValueFromString(index: string | String, clazz: object): null
		private static __getValueFromString<T>(index: string | String, clazz: object): T | null {
			let references = EnumReferenceGetter.getReference(clazz).mapFromName;
			return references.has(index.toString()) ? <T><unknown>references.get(index.toString()) : Enum._getDefault(clazz);
		}

		protected static _getValue(nullValue: null, clazz: any): null
		protected static _getValue(index: number | Number, clazz: null): null
		protected static _getValue(name: string | String, clazz: null): null
		protected static _getValue<T>(index: number | Number, clazz: Function): T | null
		protected static _getValue<T>(name: string | String, clazz: Function): T | null
		protected static _getValue(index: number | Number, clazz: Function): null
		protected static _getValue(name: string | String, clazz: object): null
		protected static _getValue<T>(arg1: number | string | Number | String, clazz: null): null
		protected static _getValue<T>(arg1: number | string | Number | String, clazz: Function): T | null
		protected static _getValue<T>(arg1: number | string | Number | String, clazz: object): null
		/**
		 * <p>
		 *     A method that return the value based on the index or the name.
		 * </p>
		 *
		 * <p>
		 * If the 1st argument received is a primitive {@link string} or an object {@link String},
		 * then, the private method {@link __getValueFromString()} will be called.
		 * </p>
		 *
		 * <p>
		 * Otherwise, if it is a primitive {@link number} or an object {@link Number},
		 * the private method {@link __getValueFromNumber()} will be called.
		 * </p>
		 *
		 * <p>
		 * If none of the criteria is correct, a null object will be send.
		 * </p>
		 *
		 *
		 * @param arg1 the 1st argument (number or string)
		 * @param clazz the class used as a reference (most likely, the child class)
		 * @protected
		 * @return the value or null
		 * @author JóôòKiwi
		 */
		protected static _getValue<T>(arg1: number | string | Number | String, clazz: object): T | null {
			return arg1 == null ? null : typeof arg1 == "string" || arg1 instanceof String ? Enum.__getValueFromString(arg1, clazz) : typeof arg1 == "number" || arg1 instanceof Number ? Enum.__getValueFromNumber(arg1, clazz) : null;
		}

		public toString() {
			return this.enumName;
		}

	}

	/**
	 * A global reference for any non {@link Enum} object or just any null reference.
	 */
	export const EMPTY_ENUM_REFERENCE: Readonly<FinalizeMapReference<Function>> = new MapReference<any>(null, Enum).newFinalizeReference();

}
