namespace src.maestro {

	import Comparable = src.util.lang.Comparable;
	const KEY_C4 = window['KEY_C4'];
	const KEY_F3 = window['KEY_F3'];

	/**
	 * A entity reference that contain every attributes of a usable entity on this web page.
	 *
	 * <p>
	 * This class contain multiple attributes as a getter.
	 * <table>
	 *     <tr><th>possible values</th><th>method name</th></tr>
	 *     <tr><td>string</td><td>{@link name}</td></tr>
	 *     <tr><td>string</td><td>{@link audioFile}</td></tr>
	 *     <tr><td>{@link Instruments}</td><td>{@link instrument}</td></tr>
	 *     <tr><td>string</td><td>{@link instrumentName}</td></tr>
	 *     <tr><td>1, 2, 3 or 4</td><td>{@link width}</td></tr>
	 *     <tr><td>1, 2, 3 or 4</td><td>{@link height}</td></tr>
	 *     <tr><td>1, 2, 3, 4, 5 or 6</td><td>{@link bounceHeight}</td></tr>
	 *     <tr><td>1, 2, 3, 4, 5 or 6</td><td>{@link semiSolidBounceHeight}</td></tr>
	 *     <tr><td>{@link KEY_C4} or {@link KEY_F3}</td><td>{@link baseNote}</td></tr>
	 *     <tr><td>boolean</td><td>{@link hasLongSustain}</td></tr>
	 *     <tr><td>number</td><td>{@link volumeOffset}</td></tr>
	 *     <tr><td>{@link EntityType}</td><td>{@link entityType}</td></tr>
	 *     <tr><td>boolean</td><td>{@link isPowerUp}</td></tr>
	 *     <tr><td>boolean</td><td>{@link isPercussion}</td></tr>
	 *     <tr><td>boolean</td><td>{@link isExcluded}</td></tr>
	 *     <tr><td>boolean</td><td>{@link canFreeFall}</td></tr>
	 *     <tr><td>boolean</td><td>{@link canFallNextToWalls}</td></tr>
	 *     <tr><td>boolean</td><td>{@link canAttachToWalls}</td></tr>
	 *     <tr><td>boolean</td><td>{@link isParachutable}</td></tr>
	 *     <tr><td>boolean</td><td>{@link isSolid}</td></tr>
	 *     <tr><td>boolean</td><td>{@link hasSameBehaviourOnSemiSolid}</td></tr>
	 *     <tr><td>-2, -1, 0, 1 or 2</td><td>{@link octave}</td></tr>
	 * </table>
	 * </p>
	 *
	 * <p>
	 * This is basically a class with those every property of a entity
	 * in <i>Super Mario Maker 2</i> as a signature.<br>
	 * Also, the constructor should not be called since they are used in the enum {@link Entities} via its {@link Builder} class.
	 * </p>
	 *
	 * @author JóôòKiwi
	 */
	export class Entity
		implements Comparable {

		public static CAN_BUILD_EVERYTHING: boolean = false;

		private readonly _name: string;
		private readonly _imageFile: string;
		private readonly _audioFile: string;
		private readonly _instrument: Instruments;

		private readonly _width: 1 | 2 | 3 | 4;
		private readonly _height: 1 | 2 | 3 | 4;
		private readonly _bounceHeight: 1 | 2 | 3 | 4 | 5 | 6;
		private readonly _semiSolidBounceHeight: 1 | 2 | 3 | 4 | 5 | 6;

		private readonly _baseNote: number;
		private readonly _hasLongSustain: boolean;
		private readonly _volumeOffset: number;

		private readonly _entityType: EntityType;
		private readonly _isPercussion: boolean;
		private readonly _isExcluded: boolean;

		private readonly _canFreeFall: boolean;
		private readonly _canAttachToWalls: boolean;

		private readonly _isParachutable: boolean;
		private readonly _isSolid: boolean;

		private readonly _hasSameBehaviourOnSemiSolid: boolean;

		private readonly _octave: -2 | -1 | 0 | 1 | 2;


		constructor(name: string, imageFile: string, audioFile: string, instrument: Instruments,
		            width: 1 | 2 | 3 | 4, height: 1 | 2 | 3 | 4, bounceHeight: 1 | 2 | 3 | 4 | 5 | 6, semiSolidBounceHeight: 1 | 2 | 3 | 4 | 5 | 6,
		            baseNote: number, hasLongSustain: boolean, volumeOffset: number,
		            entityType: EntityType, isPercussion: boolean, isExcluded: boolean,
		            canFreeFall: boolean, canAttachToWalls: boolean,
		            isParachutable: boolean, isSolid: boolean, hasSameBehaviourOnSemiSolid: boolean,
		            octave: -2 | -1 | 0 | 1 | 2) {
			this._name = name;
			this._imageFile = imageFile;
			this._audioFile = audioFile;
			this._instrument = instrument;

			this._width = width;
			this._height = height;
			this._bounceHeight = bounceHeight;
			this._semiSolidBounceHeight = semiSolidBounceHeight;

			this._baseNote = baseNote;
			this._hasLongSustain = hasLongSustain;
			this._volumeOffset = volumeOffset;

			this._entityType = entityType;
			this._isPercussion = isPercussion;
			this._isExcluded = isExcluded;

			this._canFreeFall = canFreeFall;
			this._canAttachToWalls = canAttachToWalls;

			this._isParachutable = isParachutable;
			this._isSolid = isSolid;
			this._hasSameBehaviourOnSemiSolid = hasSameBehaviourOnSemiSolid;

			this._octave = octave;
		}


		/**
		 * Return the name of the enemy associated to the entity
		 */
		public get name(): string {
			return this._name;
		}

		/**
		 * Return the absolute path of the image file.
		 */
		public get imageFile(): string {
			return this._imageFile;
		}

		/**
		 * Return the absolute path of the audio file.
		 */
		public get audioFile(): string {
			return this._audioFile;
		}

		/**
		 * Return the entity's name.
		 */
		public get instrument(): Instruments {
			return this._instrument;
		}

		/**
		 * Return the entity's name.
		 */
		public get instrumentName(): string {
			return this.instrument.name;
		}

		/**
		 * Return the width of the entity.<br>
		 * The possible height is only from <u>1</u> to <u>4</u>.
		 */
		public get width(): 1 | 2 | 3 | 4 {
			return this._width;
		}

		/**
		 * Return the height of the entity.<br>
		 * The possible height is only from <u>1</u> to <u>4</u>.
		 */
		public get height(): 1 | 2 | 3 | 4 {
			return this._height;
		}

		/**
		 * Return the bounce height of the entity<br>
		 * The possible height is only from <u>1</u> to <u>6</u>.
		 */
		public get bounceHeight(): 1 | 2 | 3 | 4 | 5 | 6 {
			return this._bounceHeight;
		}

		/**
		 * Return the bounce height on a semi-solid of the entity<br>
		 * The possible height is only from <u>1</u> to <u>6</u>.
		 */
		public get semiSolidBounceHeight(): 1 | 2 | 3 | 4 | 5 | 6 {
			return this._semiSolidBounceHeight;
		}

		/**
		 * Return the base note as a number
		 */
		public get baseNote(): number {
			return this._baseNote;
		}

		/**
		 * Return whenever this entity has a long sound or not.
		 */
		public get hasLongSustain(): boolean {
			return this._hasLongSustain;
		}

		/**
		 * Return the offset associated to this entity.
		 */
		public get volumeOffset(): number {
			return this._volumeOffset;
		}

		/**
		 * Return the {@link EntityType} of the entity.
		 *
		 * @see EntityType
		 */
		public get entityType(): EntityType {
			return this._entityType;
		}

		/**
		 * Return whenever this entity is a power-up or not.
		 */
		public get isPowerUp(): boolean {
			return this.entityType == EntityType.POWER_UP;
		}

		/**
		 * Return whenever this entity is a percussion or not.
		 */
		public get isPercussion(): boolean {
			return this._isPercussion;
		}

		/**
		 * Return whenever this entity is excluded or not from
		 * the interpretation on the main view.
		 */
		public get isExcluded(): boolean {
			return this._isExcluded;
		}

		/**
		 * Return whenever the entity can free fall or is standing still in the air.
		 */
		public get canFreeFall(): boolean {
			return this._canFreeFall;
		}

		/**
		 * Return whenever the entity can fall when near a wall.
		 *
		 * @see canAttachToWalls
		 */
		public get canFallNextToWalls(): boolean {
			return !this.canAttachToWalls;
		}

		/**
		 * Return whenever the entity can be attached to a wall.
		 */
		public get canAttachToWalls(): boolean {
			return this._canAttachToWalls;
		}

		/**
		 * Return whenever this entity can or can't be placed in a parachute.
		 */
		public get isParachutable(): boolean {
			return this._isParachutable;
		}

		/**
		 * Return whenever this entity is solid or not
		 */
		public get isSolid(): boolean {
			return this._isSolid;
		}

		/**
		 * Return whenever the entity has an identical behaviour on a semi-solid.
		 */
		public get hasSameBehaviourOnSemiSolid(): boolean {
			return this._hasSameBehaviourOnSemiSolid;
		}

		/**
		 * Return the octave associated to this entity.<br>
		 * The possible values are from <u>-2</u> to <u>2</u>.
		 */
		public get octave(): -2 | -1 | 0 | 1 | 2 {
			return this._octave;
		}


		/**
		 * A method that return whenever this entity can be built alone without the {@link CAN_BUILD_EVERYTHING} influence.<br><br>
		 *
		 * It has 3 different requirement :
		 * <ol>
		 *     <li>It can't be a player entity</li>
		 *     <li>It can't be a projectile entity</li>
		 *     <li>It can't be excluded</li>
		 * </ol>
		 */
		public canBeBuiltAlone(): boolean {
			return this.entityType != EntityType.PLAYER && this.entityType != EntityType.PROJECTILE && !this.isExcluded;
		}

		/**
		 * A method that return whenever this entity can e built.<br>
		 * It has the definition of {@link canBeBuiltAlone},
		 * but if the static attribute {@link CAN_BUILD_EVERYTHING} is <b>true</b>,
		 * it will have the priority and return true.
		 */
		public canBeBuilt(): boolean {
			return Entity.CAN_BUILD_EVERYTHING || this.canBeBuiltAlone();
		}


		public equals(nullReference: null): false
		public equals(instrument: Entity): boolean
		public equals(instrument: object): false
		public equals(object: object): boolean {
			if (object == null)
				return false;
			if (this == object)
				return true;
			if (!(object instanceof Entity))
				return false;
			let instrument: Entity = object;

			return this.name == instrument.name &&
				this.audioFile == instrument.audioFile &&
				this.instrument == instrument.instrument &&
				this.width == instrument.width &&
				this.height == instrument.width &&
				this.bounceHeight == instrument.bounceHeight &&
				this.semiSolidBounceHeight == instrument.semiSolidBounceHeight &&
				this.baseNote == instrument.baseNote &&
				this.hasLongSustain == instrument.hasLongSustain &&
				this.volumeOffset == instrument.volumeOffset &&
				this.entityType == instrument.entityType &&
				this.isPercussion == instrument.isPercussion &&
				this.isExcluded == instrument.isExcluded &&
				this.canFreeFall == instrument.canFreeFall &&
				this.canAttachToWalls == instrument.canAttachToWalls &&
				this.isParachutable == instrument.isParachutable &&
				this.isSolid == instrument.isSolid &&
				this.hasSameBehaviourOnSemiSolid == instrument.hasSameBehaviourOnSemiSolid &&
				this.octave == instrument.octave;
		}

	}

}