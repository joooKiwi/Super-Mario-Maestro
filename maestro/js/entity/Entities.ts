namespace src.maestro {

	import Builder = src.util.builder.Builder;
	import Enum = src.util.lang.Enum;
	const KEY_C4 = window['KEY_C4'];
	const KEY_F3 = window['KEY_F3'];


	class EntityBuilder
		implements Builder<Entity> {

		public static readonly UNKNOWN_FILE = "no file";

		private _itemName: string;
		private _imageFile: string;
		private _audioFile: string;
		private readonly _instrument: Instruments;

		private _width: 1 | 2 | 3 | 4 = 1;
		private _height: 1 | 2 | 3 | 4 = 1;
		private _bounceHeight: 1 | 2 | 3 | 4 | 5 | 6 = 6;
		private _semiSolidBounceHeight: 1 | 2 | 3 | 4 | 5 | 6 = 6;

		private _baseNote: number = KEY_C4;
		private _hasLongSustain: boolean = false;
		private _volumeOffset: 0 | number = 0;

		private _entityType: EntityType = EntityType.default;
		private _isPercussion: boolean = false;
		private _isExcluded: boolean = false;

		private _canFreeFall: boolean = true;
		private _canAttachToWalls: boolean = false;

		private _isParachutable: boolean = false;
		private _isSolid: boolean = false;
		private _hasSameBehaviourOnSemiSolid: boolean = false;

		private _octave: -2 | -1 | 0 | 1 | 2 = 0;

		public constructor(itemName: string)
		public constructor(itemName: string, file: string)
		public constructor(itemName: string, file: string, instrumentName: Instruments)
		public constructor(itemName: string, file: string = EntityBuilder.UNKNOWN_FILE, instrumentName: Instruments = Instruments.UNKNOWN) {
			this.itemName(itemName);
			this.file(file);
			this._instrument = instrumentName;
		}


		public itemName(itemName: string): this {
			if (itemName != null)
				this._itemName = itemName;
			return this;
		}

		public file(allSimpleFiles: string): this
		public file(file: string, isDirectName: boolean): this
		public file(file: string, isDirectName: boolean = false): this {
			return file == null ? this : this.imageFile(file, isDirectName).audioFile(file, isDirectName);
		}

		public imageFile(imageFile: string, isDirectName: boolean = false): this {
			if (imageFile != null)
				this._imageFile = isDirectName ? imageFile : "./tiles/" + imageFile + ".png";
			return this;
		}

		public audioFile(audioFile: string, isDirectName: boolean = false): this {
			if (audioFile != null)
				this._audioFile = isDirectName ? audioFile : "./wav/" + audioFile + ".wav";
			return this;
		}


		public size(widthAndHeight: 1 | 2 | 3 | 4): this
		public size(width: 1 | 2 | 3 | 4, height: 1 | 2 | 3 | 4): this
		public size(arg1: 1 | 2 | 3 | 4, height?: 1 | 2 | 3 | 4): this {
			return this.width(arg1).height(height == null ? arg1 : height);
		}

		public width(width: 1 | 2 | 3 | 4): this {
			if (width != null)
				this._width = width;
			return this;
		}

		public height(height: 1 | 2 | 3 | 4): this {
			if (height != null)
				this._height = height;
			return this;
		}


		public bounceHeights(allBounceHeight: 1 | 2 | 3 | 4 | 5 | 6): this
		public bounceHeights(bounceHeight: 1 | 2 | 3 | 4 | 5 | 6, semiSolidBounceHeight: 1 | 2 | 3 | 4 | 5 | 6): this
		public bounceHeights(bounce1: 1 | 2 | 3 | 4 | 5 | 6, semiSolidBounceHeight?: 1 | 2 | 3 | 4 | 5 | 6): this {
			return this.bounceHeight(bounce1).semiSolidBounceHeight(semiSolidBounceHeight == null ? bounce1 : semiSolidBounceHeight);
		}

		public bounceHeight(bounceHeight: 1 | 2 | 3 | 4 | 5 | 6): this {
			if (bounceHeight != null)
				this._bounceHeight = bounceHeight;
			return this;
		}

		public semiSolidBounceHeight(semiSolidBounceHeight: 1 | 2 | 3 | 4 | 5 | 6): this {
			if (semiSolidBounceHeight != null)
				this._semiSolidBounceHeight = semiSolidBounceHeight;
			return this;
		}


		public baseNote(baseNote: number): this {
			if (baseNote != null)
				this._baseNote = baseNote;
			return this;
		}

		public baseNoteF3(): this {
			return this.baseNote(KEY_F3);
		}


		public withLongSustain(): this {
			return this.longSustain(true);
		}

		public withoutLongSustain(): this {
			return this.longSustain(false);
		}

		public longSustain(hasLongSustain: boolean): this {
			if (hasLongSustain != null)
				this._hasLongSustain = hasLongSustain;
			return this;
		}


		public volumeOffset(volumeOffset: number): this {
			if (volumeOffset != null)
				this._volumeOffset = volumeOffset;
			return this;
		}


		public entityType(entityType: EntityType): this {
			if (entityType != null)
				this._entityType = entityType;
			return this;
		}

		public percussion(isPercussion: boolean): this {
			if (isPercussion != null)
				this._isPercussion = isPercussion;
			return this;
		}

		public excluded(isExcluded: boolean): this {
			if (isExcluded != null)
				this._isExcluded = isExcluded;
			return this;
		}


		public freeFall(canFreeFall: boolean): this {
			if (canFreeFall != null)
				this._canFreeFall = canFreeFall;
			return this;
		}

		public attachToWalls(canAttachToWalls: boolean): this {
			if (canAttachToWalls != null)
				this._canAttachToWalls = canAttachToWalls;
			return this;
		}


		public parachutable(isParachutable: boolean): this {
			if (isParachutable != null)
				this._isParachutable = isParachutable;
			return this;
		}

		public solid(isSolid: boolean): this {
			if (isSolid != null)
				this._isSolid = isSolid;
			return this;
		}


		public sameBehaviourOnSemiSolid(hasSameBehaviourOnSemiSolid: boolean): this {
			if (hasSameBehaviourOnSemiSolid != null)
				this._hasSameBehaviourOnSemiSolid = hasSameBehaviourOnSemiSolid;
			return this;
		}


		public octave(octave: -2 | -1 | 0 | 1 | 2): this {
			if (octave != null)
				this._octave = octave;
			return this;

		}


		public build(): Entity {
			return new Entity(this._itemName, this._imageFile, this._audioFile, this._instrument,
				this._width, this._height, this._bounceHeight, this._semiSolidBounceHeight,
				this._baseNote, this._hasLongSustain, this._volumeOffset,
				this._entityType, this._isPercussion, this._isExcluded,
				this._canFreeFall, this._canAttachToWalls,
				this._isParachutable, this._isSolid, this._hasSameBehaviourOnSemiSolid,
				this._octave);
		}

	}

	class ExcludedEntityBuilder
		extends EntityBuilder {

		public constructor(itemName: string, file?: string, instrumentName?: Instruments) {
			super(itemName, file, instrumentName);
			super.excluded(true);
		}

	}

	class PowerUpBuilder extends EntityBuilder {

		public constructor(itemName: string, file?: string, instrumentName?: Instruments) {
			super(itemName, file, instrumentName);
			super.entityType(EntityType.POWER_UP);
		}

	}

	class PercussionBuilder extends EntityBuilder {

		public constructor(itemName: string, file?: string, instrumentName?: Instruments) {
			super(itemName, file, instrumentName);
			super.percussion(true);
		}

	}

	//https://supermariomaker2.fandom.com/wiki/Note_Block#Music_Block_-_Course_Part_Sounds
	//https://www.reddit.com/r/MarioMaker/comments/g6r5ib/smm2_a_guide_on_the_instruments/
	//https://www.midi.org/specifications-old/item/gm-level-1-sound-set
	/**
	 * <p>
	 * A class containing every entities as an individual {@link Entity}.
	 * This also a default value represented by this value {@link _getDefault}
	 * </p>
	 *
	 * <p>
	 * This class also contain some utilities method to avoid any null possibility
	 * when retrieving the entity and then calling its getter.
	 * Every utility method (excluding the ones from the Enum) are to retrieve the value from an entity
	 * <ul>
	 *     <li>{@link getName}: string</li>
	 *     <li>{@link getImageFile}: string</li>
	 *     <li>{@link getAudioFile}: string</li>
	 *     <li>{@link getInstrument}: {@link Instruments}</li>
	 *     <li>{@link getInstrumentName}: string</li>
	 *     <li>{@link getWidth}: 1 | 2 | 3 | 4</li>
	 *     <li>{@link getHeight}: 1 | 2 | 3 | 4</li>
	 *     <li>{@link getBounceHeight}: 1 | 2 | 3 | 4 | 5 | 6</li>
	 *     <li>{@link getSemiSolidBounceHeight}: 1 | 2 | 3 | 4 | 5 | 6</li>
	 *     <li>{@link getBaseNote} {@link KEY_C4}|{@link KEY_F3}</li>
	 *     <li>{@link getHasLongSustain}: boolean</li>
	 *     <li>{@link getVolumeOffset}: number</li>
	 *     <li>{@link getEntityType}: {@link EntityType</li>
	 *     <li>{@link getIsPowerUp}: boolean</li>
	 *     <li>{@link getIsPercussion}: boolean</li>
	 *     <li>{@link getIsExcluded}: boolean</li>
	 *     <li>{@link getCanFreeFall}: boolean</li>
	 *     <li>{@link getCanFallNextToWalls}: boolean</li>
	 *     <li>{@link getCanAttachToWalls}: boolean</li>
	 *     <li>{@link getIsParachutable}: boolean</li>
	 *     <li>{@link getIsSolid}: boolean</li>
	 *     <li>{@link getHasSameBehaviourOnSemiSolid}: boolean</li>
	 *     <li>{@link getOctave}: -2 | -1 | 0 | 1 | 2</li>
	 *     <li>{@link getCanBeBuiltAlone}: boolean</li>
	 *     <li>{@link getCanBeBuilt}: boolean</li>
	 * </ul>
	 * </p>
	 *
	 * @author JóôòKiwi
	 */
	export class Entities
		extends Enum {
		//TODO add instrument to (zappa mechakoopa, larry,iggy,roy and morton)

		public static readonly PLAYER = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Player (Mario / Luigi / Toad / Toadette / Link)', undefined, Instruments.STEEL_DRUM).entityType(EntityType.PLAYER).parachutable(false));
			}
		};
		public static readonly MARIO = Entities.PLAYER;
		public static readonly LUIGI = Entities.PLAYER;
		public static readonly TOAD = Entities.PLAYER;
		public static readonly TOADETTE = Entities.PLAYER;
		public static readonly LINK = Entities.PLAYER;
		public static readonly LINK_BOMBS = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Link\' bombs', undefined, Instruments.CHICKEN).entityType(EntityType.PLAYER).parachutable(false));
			}
		};

		//enemies instruments
		public static readonly GOOMBA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Goomba / Galoomba', 'goomba', Instruments.PIANO).octave(1));
			}
		};
		public static readonly GALOOMBA = Entities.GOOMBA;
		public static readonly GOOMBRAT = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Goombrat / Goombud', 'goombrat', Instruments.TACK_RAGTIME_PIANO).octave(1));
			}
		};
		public static readonly GOOMBUD = Entities.GOOMBRAT;

		public static readonly SHOE_GOOMBA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Shoe Goomba', 'goomba (shoe)', Instruments.ACCORDION_BASS).octave(-1));
			}
		};
		public static readonly STILETTO_GOOMBA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Stiletto Goomba', 'goomba (stiletto)', Instruments.ACCORDION_TREBLE));
			}
		};
		public static readonly SHOE = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Shoe / Stiletto', undefined, Instruments.WOOD_BLOCK));
			}
		};
		public static readonly STILETTO = Entities.SHOE;

		public static readonly GREEN_KOOPA_TROOPA = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Green Koopa Troopa / Green Koopa Shell', 'koopa troopa (green)', Instruments.XYLOPHONE).octave(1));
			}
		};
		public static readonly GREEN_KOOPA_SHELL = Entities.GREEN_KOOPA_TROOPA;
		public static readonly GREEN_BEACH_KOOPA_TROOPA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Green Beach Koopa Troopa', 'koopa troopa (beach green)', Instruments.CAT_MEOW).baseNoteF3().parachutable(false));
			}
		};
		public static readonly RED_KOOPA_TROOPA = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Red Koopa Troopa / Red Koopa Shell', 'koopa troopa (red)', Instruments.VIBRAPHONE).octave(1));
			}
		};
		public static readonly RED_KOOPA_SHELL = Entities.RED_KOOPA_TROOPA;
		public static readonly RED_BEACH_KOOPA_TROOPA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Red Beach Koopa Troopa', 'koopa troopa (breach red)', Instruments.DOG_BARK).baseNoteF3().parachutable(false));
			}
		};
		public static readonly DRY_BONES = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Dry Bones / Dry Bones Shell', 'dry bones', Instruments.FLUTE).octave(2).withLongSustain());
			}
		};
		public static readonly DRY_BONES_SHELL = Entities.DRY_BONES;

		public static readonly SPINY = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Spiny / Spiny Shell', 'spiny', Instruments.TRUMPET).octave(1));
			}
		};
		public static readonly SPINY_SHELL = Entities.SPINY;
		public static readonly BUZZY_BEETLE = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Buzzy Beetle / Buzzy Beetle Shell', 'buzzy beetle', Instruments.DETUNED_BELL).octave(1));
			}
		};
		public static readonly BUZZY_BEETLE_SHELL = Entities.SPINY;
		public static readonly SPIKETOP = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Spiketop / Fast Spiketop', 'spiketop', Instruments.HARPSICHORD).octave(1));
			}
		};
		public static readonly FAST_SPIKETOP = Entities.SPIKETOP;

		public static readonly HAMMER_BRO = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Hammer Bro', 'hammer bro', Instruments.ELECTRIC_GUITAR).octave(1).withLongSustain());
			}
		};
		public static readonly SLEDGE_BRO = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Sledge Bro', 'sledge bro', Instruments.BASS_GUITAR).octave(-2).size(2));
			}
		};

		public static readonly PIRANHA_PLANT = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Piranha Plant / Jumping Piranha Plant', 'piranha plant', Instruments.PIZZICATO_STRINGS).octave(1));
			}
		};
		public static readonly JUMPING_PIRANHA_PLANT = Entities.PIRANHA_PLANT;
		public static readonly FIRE_PIRANHA_PLANT = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Fire Piranha Plant', 'piranha plant (fire)', Instruments.LEGATO_STRINGS));
			}
		};
		public static readonly MUNCHER = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Muncher', 'muncher', Instruments.ELECTRIC_PIANO).parachutable(false).solid(true));
			}
		};

		public static readonly MONTY_MOLE = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Monty Mole', 'mole', Instruments.DULCIMER));
			}
		};
		public static readonly ROCKY_WRENCH = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Rocky Wrench', undefined, Instruments.ACOUSTIC_GUITAR));
			}
		};

		public static readonly BOB_OMB = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Bob-omb / Lit Bob-omb', 'bob-omb', Instruments.ORCHESTRA_HIT));
			}
		};
		public static readonly LIT_BOB_OMB = Entities.BOB_OMB;

		public static readonly WIGGLER = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Wiggler / Angry Wiggler', 'wiggler', Instruments.TUBULAR_BELLS_OR_CHIMES).octave(1));
			}
		};
		public static readonly ANGRY_WIGGLER = Entities.WIGGLER;

		public static readonly CHAIN_CHOMP = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Chained / Unchained Chomp', 'chain chomp', Instruments.ELECTRIC_PIANO_CHORUS));
			}
		};
		public static readonly UNCHAIN_CHOMP = Entities.CHAIN_CHOMP;
		public static readonly CHAIN_CHOMP_POST = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Chain Chomp Post', 'chain chomp (post)', Instruments.WOOD_BLOCK).solid(true));
			}
		};

		public static readonly SPIKE = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Spike', 'spike', Instruments.BASS_UKULELE).volumeOffset(3).octave(-2));
			}
		};
		public static readonly SPIKEBALL = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Spikeball', 'spikeball', Instruments.CASTANET));
			}
		};
		public static readonly SNOWBALL = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Snowball', 'snowball', Instruments.TABLA));
			}
		};

		public static readonly POKEY = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Pokey', 'pokey', Instruments.BANJO).height(2));
			}
		};
		public static readonly SNOW_POKEY = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Snow Pokey', 'pokey (snow)', Instruments.SITAR).octave(1).height(2));
			}
		};

		public static readonly MECHAKOOPA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Mechakoopa', 'mechakoopa', Instruments.SUPERSAW).withLongSustain());
			}
		};
		public static readonly BLASTA_MECHAKOOPA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Blasta Mechakoopa', 'mechakoopa (blasta)', Instruments.SAW_BASS).withLongSustain());
			}
		};
		public static readonly ZAPPA_MECHAKOOPA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Zappa Mechakoopa', 'mechakoopa (zappa)').withLongSustain());
			}
		};

		public static readonly MAGIKOOPA = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Magikoopa', 'magikoopa', Instruments.SYNTH_CHOIR_VOICE_AND_CHORUS));
			}
		};
		public static readonly THWOMP = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Thwomp', 'thwomp', Instruments.TAIKO_DRUM).size(2).solid(true).percussion(true));
			}
		};

		public static readonly KOOPA_CLOWN_CAR = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('(Fire) Koopa / Junior Clown Car', undefined, Instruments.SYNTH_CHORD).size(2).parachutable(false));
			}
		};
		public static readonly JUNIOR_CLOWN_CAR = Entities.KOOPA_CLOWN_CAR;
		public static readonly FIRE_KOOPA_CLOWN_CAR = Entities.KOOPA_CLOWN_CAR;
		public static readonly FIRE_JUNIOR_CLOWN_CAR = Entities.FIRE_KOOPA_CLOWN_CAR;


		//bosses instruments
		public static readonly BOWSER = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Bowser', undefined, Instruments.ELECTRIC_BASS_GUITAR).size(2));
			}
		};
		public static readonly FIRE_RAIN = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Fire Rain', undefined, Instruments.SHANAI).parachutable(false));
			}
		};
		public static readonly BOWSER_JR = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Bowser Jr.', undefined, Instruments.SAXOPHONE).size(2));
			}
		};
		public static readonly BOOM_BOOM = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Boom Boom', undefined, Instruments.TUBA).size(2));
			}
		};

		public static readonly LARRY = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Larry').height(2));
			}
		};
		public static readonly IGGY = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Iggy').height(2));
			}
		};
		public static readonly WENDY = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Wendy',undefined,Instruments.SCIENCE_FICTION).height(2));
			}
		};
		public static readonly LEMMY_LOWER = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Lemmy (lower screen)', undefined, Instruments.HELLO).height(2));
			}
		};
		public static readonly LEMMY_UPPER = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Lemmy (upper screen)', undefined, Instruments.OK).height(2));
			}
		};
		public static readonly LEMMY_BALL = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Lemmy\'s Ball', undefined, Instruments.YAY).entityType(EntityType.PROJECTILE).parachutable(false));
			}
		};
		public static readonly ROY = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Roy').size(2));
			}
		};
		public static readonly MORTON = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Morton').height(2));
			}
		};
		public static readonly LUDWIG = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Ludwig',undefined,Instruments.REVERSED_CYMBAL).height(2));
			}
		};


		//power-up instruments
		public static readonly ONE_UP_MUSHROOM = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('1-up Mushroom', '1-up mushroom', Instruments.ELECTRIC_ORGAN));
			}
		};
		public static readonly ROTTEN_MUSHROOM = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Rotten Mushroom', 'rotten mushroom', Instruments.SYNTH_SYNTH).octave(-2));
			}
		};
		public static readonly MUSHROOM = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Mushroom', 'mushroom', Instruments.SQUARE_WAVE).octave(1));
			}
		};
		public static readonly SMB2_MUSHROOM = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('SMB2 Mushroom', '3rd power-up', Instruments.STACCATO_STRINGS));
			}
		};
		public static readonly BIG_MUSHROOM = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Big Mushroom', 'big mushroom', Instruments.SHAMISEN).size(2));
			}
		};
		public static readonly FIRE_FLOWER = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Fire Flower', 'fire flower', Instruments.PICCOLO).octave(1));
			}
		};
		public static readonly SUPERBALL_FLOWER = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Superball Flower', 'superball flower', Instruments.PIPE_ORGAN).octave(1));
			}
		};
		public static readonly MASTER_SWORD = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Master Sword', 'master sword', Instruments.SYNTH_HORN));
			}
		};
		public static readonly FROG_SUIT = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Frog Suit', '3rd power-up', Instruments.STACCATO_STRINGS));
			}
		};
		public static readonly SUPER_ACORN = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Super Acorn', '3rd power-up', Instruments.STACCATO_STRINGS));
			}
		};
		public static readonly SUPER_STAR = new class extends Entities {
			constructor() {
				super(() => new PowerUpBuilder('Super Star', 'super star', Instruments.CELESTA).octave(1));
			}
		};

		public static readonly YOSHI_EGG = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Yoshi\'s Egg / Red Yoshi\' Egg', 'yoshi egg', Instruments.COWBELL));
			}
		};
		public static readonly RED_YOSHI_EGG = new class extends Entities {
			constructor() {
				super(() => new EntityBuilder('Red Yoshi\' Egg', 'yoshi egg', Instruments.COWBELL).size(2));
			}
		};
		public static readonly YOSHI = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Yoshi / Red Yoshi', 'yoshi', Instruments.OBOE).parachutable(false));
			}
		};
		public static readonly RED_YOSHI = Entities.YOSHI;

		//inanimate instruments
		public static readonly COIN = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Coin', 'coin', Instruments.SLEIGH_BELLS));
			}
		};
		public static readonly MULTIPLE_COINS = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('10 / 30 / 50 Coin', undefined, Instruments.WIND_CHIMES).size(2));
			}
		};
		public static readonly TEN_COIN = Entities.MULTIPLE_COINS;
		public static readonly THIRTY_COIN = Entities.TEN_COIN;
		public static readonly FIFTY_COIN = Entities.TEN_COIN;

		public static readonly P_SWITCH = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('P-Switch', 'p-switch', Instruments.SNARE_DRUM).solid(true));
			}
		};
		public static readonly POW_BLOCK = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('POW Block', 'pow block', Instruments.BASS_DRUM).solid(true));
			}
		};
		public static readonly TRAMPOLINE = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Trampoline', 'trampoline', Instruments.CRASH_CYMBAL).solid(true));
			}
		};
		public static readonly SIDEWAY_TRAMPOLINE = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Sideway Trampoline', 'trampoline (sideway)', Instruments.OPEN_HI_HAT).solid(true));
			}
		};

		public static readonly BILL_BLASTER = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Bill Blaster / Bull\'s-Eye Blaster', 'bill blaster', Instruments.KETTLE_DRUM).height(2).parachutable(false).solid(true));
			}
		};
		public static readonly BULL_EYE_BLASTER = Entities.BILL_BLASTER;
		public static readonly CANNON = new class extends Entities {
			constructor() {
				super(() => new PercussionBuilder('Cannon / Red Cannon', 'cannon', Instruments.TIMBALE_DRUM).parachutable(false).solid(true));
			}
		};
		public static readonly RED_CANNON = Entities.CANNON;

		public static readonly SKEWER = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Skewer', undefined, Instruments.GONG_OR_TAM_TAM).width(4).parachutable(false).solid(true));
			}
		};

		public static readonly ICICLE = new class extends Entities {
			constructor() {
				super(() => new ExcludedEntityBuilder('Icicle', undefined, Instruments.SYNTH_GLOCKENSPIEL).height(2).parachutable(false));
			}
		};


		protected static readonly _default = Entities.GOOMBA;


		private readonly _callbackToBuildEntity: () => Builder<Entity>;
		private _entity: Entity;

		private constructor(callbackToBuildInstrument: () => Builder<Entity>) {
			super();
			this._callbackToBuildEntity = callbackToBuildInstrument;
		}


		/**
		 * A method that return the entity.<br>
		 *
		 * @return the entity associated to this instance.
		 * @author JóôòKiwi
		 */
		public get entity(): Entity {
			if (this._entity == null)
				this._entity = this._callbackToBuildEntity().build();
			return this._entity;
		}


		public static getName(nullObject: null | undefined): null
		public static getName(entity: Entity): string
		public static getName(entities: Entities): string
		public static getName(object: object): null
		public static getName(object: object): null | string {
			return object == null ? null : object instanceof Entities ? object.entity.name : object instanceof Entity ? object.name : null;
		}

		public static getImageFile(nullObject: null | undefined): null
		public static getImageFile(entity: Entity): string
		public static getImageFile(entities: Entities): string
		public static getImageFile(object: object): null
		public static getImageFile(object: object): null | string {
			return object == null ? null : object instanceof Entities ? object.entity.imageFile : object instanceof Entity ? object.imageFile : null;
		}

		public static getAudioFile(nullObject: null | undefined): null
		public static getAudioFile(entity: Entity): string
		public static getAudioFile(entities: Entities): string
		public static getAudioFile(object: object): null
		public static getAudioFile(object: object): null | string {
			return object == null ? null : object instanceof Entities ? object.entity.audioFile : object instanceof Entity ? object.audioFile : null;
		}

		public static getInstrument(nullObject: null | undefined): null
		public static getInstrument(entity: Entity): Instruments
		public static getInstrument(entities: Entities): Instruments
		public static getInstrument(object: object): null
		public static getInstrument(object: object): null | Instruments {
			return object == null ? null : object instanceof Entities ? object.entity.instrument : object instanceof Entity ? object.instrument : null;
		}

		public static getInstrumentName(nullObject: null | undefined): null
		public static getInstrumentName(entity: Entity): string
		public static getInstrumentName(entities: Entities): string
		public static getInstrumentName(object: object): null
		public static getInstrumentName(object: object): null | string {
			return object == null ? null : object instanceof Entities ? object.entity.instrumentName : object instanceof Entity ? object.instrumentName : null;
		}

		public static getWidth(nullObject: null | undefined): null
		public static getWidth(entity: Entity): 1 | 2 | 3 | 4
		public static getWidth(entities: Entities): 1 | 2 | 3 | 4
		public static getWidth(object: object): number
		public static getWidth(object: object): null | 1 | 2 | 3 | 4 {
			return object == null ? null : object instanceof Entities ? object.entity.width : object instanceof Entity ? object.width : null;
		}

		public static getHeight(nullObject: null | undefined): null
		public static getHeight(entity: Entity): 1 | 2 | 3 | 4
		public static getHeight(entities: Entities): 1 | 2 | 3 | 4
		public static getHeight(object: object): number
		public static getHeight(object: object): null | 1 | 2 | 3 | 4 {
			return object == null ? null : object instanceof Entities ? object.entity.height : object instanceof Entity ? object.height : null;
		}

		public static getBounceHeight(nullObject: null | undefined): null
		public static getBounceHeight(entity: Entity): 1 | 2 | 3 | 4 | 5 | 6
		public static getBounceHeight(entities: Entities): 1 | 2 | 3 | 4 | 5 | 6
		public static getBounceHeight(object: object): number
		public static getBounceHeight(object: object): null | 1 | 2 | 3 | 4 | 5 | 6 {
			return object == null ? null : object instanceof Entities ? object.entity.bounceHeight : object instanceof Entity ? object.bounceHeight : null;
		}

		public static getSemiSolidBounceHeight(nullObject: null | undefined): null
		public static getSemiSolidBounceHeight(entity: Entity): 1 | 2 | 3 | 4 | 5 | 6
		public static getSemiSolidBounceHeight(entities: Entities): 1 | 2 | 3 | 4 | 5 | 6
		public static getSemiSolidBounceHeight(object: object): number
		public static getSemiSolidBounceHeight(object: object): null | 1 | 2 | 3 | 4 | 5 | 6 {
			return object == null ? null : object instanceof Entities ? object.entity.semiSolidBounceHeight : object instanceof Entity ? object.semiSolidBounceHeight : null;
		}

		public static getBaseNote(nullObject: null | undefined): null
		public static getBaseNote(entity: Entity): number
		public static getBaseNote(entities: Entities): number
		public static getBaseNote(object: object): number
		public static getBaseNote(object: object): null | number {
			return object == null ? null : object instanceof Entities ? object.entity.baseNote : object instanceof Entity ? object.baseNote : null;
		}

		public static getHasLongSustain(nullObject: null | undefined): null
		public static getHasLongSustain(entity: Entity): boolean
		public static getHasLongSustain(entities: Entities): boolean
		public static getHasLongSustain(object: object): null
		public static getHasLongSustain(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.hasLongSustain : object instanceof Entity ? object.hasLongSustain : null;
		}

		public static getVolumeOffset(nullObject: null | undefined): null
		public static getVolumeOffset(entity: Entity): number
		public static getVolumeOffset(entities: Entities): number
		public static getVolumeOffset(object: object): null
		public static getVolumeOffset(object: object): number | null {
			return object == null ? null : object instanceof Entities ? object.entity.volumeOffset : object instanceof Entity ? object.volumeOffset : null;
		}

		public static getEntityType(nullObject: null | undefined): null
		public static getEntityType(entity: Entity): EntityType
		public static getEntityType(entities: Entities): EntityType
		public static getEntityType(object: object): null
		public static getEntityType(object: object): null | EntityType {
			return object == null ? null : object instanceof Entities ? object.entity.entityType : object instanceof Entity ? object.entityType : null;
		}

		public static getIsPowerUp(nullObject: null | undefined): null
		public static getIsPowerUp(entity: Entity): boolean
		public static getIsPowerUp(entities: Entities): boolean
		public static getIsPowerUp(object: object): null
		public static getIsPowerUp(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.isPowerUp : object instanceof Entity ? object.isPowerUp : null;
		}

		public static getIsPercussion(nullObject: null | undefined): null
		public static getIsPercussion(entity: Entity): boolean
		public static getIsPercussion(entities: Entities): boolean
		public static getIsPercussion(object: object): null
		public static getIsPercussion(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.isPercussion : object instanceof Entity ? object.isPercussion : null;
		}

		public static getIsExcluded(nullObject: null | undefined): null
		public static getIsExcluded(entity: Entity): boolean
		public static getIsExcluded(entities: Entities): boolean
		public static getIsExcluded(object: object): null
		public static getIsExcluded(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.isExcluded : object instanceof Entity ? object.isExcluded : null;
		}

		public static getCanFreeFall(nullObject: null | undefined): null
		public static getCanFreeFall(entity: Entity): boolean
		public static getCanFreeFall(entities: Entities): boolean
		public static getCanFreeFall(object: object): null
		public static getCanFreeFall(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.canFreeFall : object instanceof Entity ? object.canFreeFall : null;
		}

		public static getCanFallNextToWalls(nullObject: null | undefined): null
		public static getCanFallNextToWalls(entity: Entity): boolean
		public static getCanFallNextToWalls(entities: Entities): boolean
		public static getCanFallNextToWalls(object: object): null
		public static getCanFallNextToWalls(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.canFallNextToWalls : object instanceof Entity ? object.canFallNextToWalls : null;
		}

		public static getCanAttachToWalls(nullObject: null | undefined): null
		public static getCanAttachToWalls(entity: Entity): boolean
		public static getCanAttachToWalls(entities: Entities): boolean
		public static getCanAttachToWalls(object: object): null
		public static getCanAttachToWalls(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.canAttachToWalls : object instanceof Entity ? object.canAttachToWalls : null;
		}

		public static getIsParachutable(nullObject: null | undefined): null
		public static getIsParachutable(entity: Entity): boolean
		public static getIsParachutable(entities: Entities): boolean
		public static getIsParachutable(object: object): null
		public static getIsParachutable(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.isParachutable : object instanceof Entity ? object.isParachutable : null;
		}

		public static getIsSolid(nullObject: null | undefined): null
		public static getIsSolid(entity: Entity): boolean
		public static getIsSolid(entities: Entities): boolean
		public static getIsSolid(object: object): null
		public static getIsSolid(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.isSolid : object instanceof Entity ? object.isSolid : null;
		}

		public static getHasSameBehaviourOnSemiSolid(nullObject: null | undefined): null
		public static getHasSameBehaviourOnSemiSolid(entity: Entity): boolean
		public static getHasSameBehaviourOnSemiSolid(entities: Entities): boolean
		public static getHasSameBehaviourOnSemiSolid(object: object): null
		public static getHasSameBehaviourOnSemiSolid(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.hasSameBehaviourOnSemiSolid : object instanceof Entity ? object.hasSameBehaviourOnSemiSolid : null;
		}

		public static getOctave(nullObject: null | undefined): null
		public static getOctave(entity: Entity): -2 | -1 | 0 | 1 | 2
		public static getOctave(entities: Entities): -2 | -1 | 0 | 1 | 2
		public static getOctave(object: object): null
		public static getOctave(object: object): null | -2 | -1 | 0 | 1 | 2 {
			return object == null ? null : object instanceof Entities ? object.entity.octave : object instanceof Entity ? object.octave : null;
		}

		public static getCanBeBuiltAlone(nullObject: null | undefined): null
		public static getCanBeBuiltAlone(entity: Entity): boolean
		public static getCanBeBuiltAlone(entities: Entities): boolean
		public static getCanBeBuiltAlone(object: object): null
		public static getCanBeBuiltAlone(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.canBeBuiltAlone() : object instanceof Entity ? object.canBeBuiltAlone() : null;
		}

		public static getCanBeBuilt(nullObject: null | undefined): null
		public static getCanBeBuilt(entity: Entity): boolean
		public static getCanBeBuilt(entities: Entities): boolean
		public static getCanBeBuilt(object: object): null
		public static getCanBeBuilt(object: object): null | boolean {
			return object == null ? null : object instanceof Entities ? object.entity.canBeBuilt() : object instanceof Entity ? object.canBeBuilt() : null;
		}


		//Enum static method to override.

		public static get size(): number {
			return Enum._getSize(Entities);
		}

		public static get values(): Entity[] {
			return Enum._values(Entities);
		}

		public static get default(): Entity {
			return Enum._getDefault(Entities);
		}

		public static getValue(nullObject: null | undefined): null
		public static getValue(name: string | String): Entity
		public static getValue(index: number | Number): Entity
		public static getValue(arg1: number | string | Number | String): null | Entity {
			return Enum._getValue(arg1, Entities);
		}


	}

}