namespace src.maestro {

	import Enum = src.util.lang.Enum;

	/**
	 * A global reference to the type of entity.<br>
	 * It only contain the name as it stands, but later on ,if we add other language,
	 * the name could be dynamic based on the language used.
	 *
	 * @author JóôòKiwi
	 */
	export class EntityType
		extends Enum {

		public static POWER_UP = new class extends EntityType {
			constructor() {
				super("Power-up");
			}
		};
		public static GENERAL = new class extends EntityType {
			constructor() {
				super("General");
			}
		};
		public static PLAYER = new class extends EntityType {
			constructor() {
				super("Player");
			}
		};
		public static PROJECTILE = new class extends EntityType {
			constructor() {
				super("Projectile");
			}
		};

		public static _default = EntityType.GENERAL;


		private readonly _name: string;

		private constructor(name: string) {
			super();
			this._name = name;
		}


		public get name(): string {
			return this._name;
		}


		//Enum static method to override.

		public static get size(): number {
			return Enum._getSize(EntityType);
		}

		public static get values(): EntityType[] {
			return Enum._values(EntityType);
		}

		public static get default(): EntityType {
			return Enum._getDefault(EntityType);
		}

		public static getValue(nullObject: null | undefined): null
		public static getValue(name: string | String): EntityType
		public static getValue(index: number | Number): EntityType
		public static getValue(arg1: number | string | Number | String): null | EntityType {
			return Enum._getValue(arg1, EntityType);
		}


	}


}