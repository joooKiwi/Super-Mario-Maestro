namespace src.maestro {

	import Enum = src.util.lang.Enum;

	/**
	 * A global reference of every instruments associated to the entities.
	 *
	 * @author JóôòKiwi
	 */
	export class Instruments
		extends Enum {

		public static readonly UNKNOWN = new class extends Instruments {
			constructor() {
				super("unknown");
			}
		};

		public static readonly CHICKEN = new class extends Instruments {
			constructor() {
				super("Chicken");
			}
		};
		public static readonly CAT_MEOW = new class extends Instruments {
			constructor() {
				super("Cat Meow");
			}
		};
		public static readonly DOG_BARK = new class extends Instruments {
			constructor() {
				super("Dog Bark");
			}
		};
		public static readonly SCIENCE_FICTION = new class extends Instruments {
			constructor() {
				super("Science-fiction");
			}
		};

		public static readonly HELLO = new class extends Instruments {
			constructor() {
				super("Hello");
			}
		};
		public static readonly OK = new class extends Instruments {
			constructor() {
				super("Ok");
			}
		};
		public static readonly YAY = new class extends Instruments {
			constructor() {
				super("Yay");
			}
		};

		public static readonly PIANO = new class extends Instruments {
			constructor() {
				super("Piano");
			}
		};
		public static readonly TACK_RAGTIME_PIANO = new class extends Instruments {
			constructor() {
				super("Tack/Ragtime Piano");
			}
		};
		public static readonly ELECTRIC_PIANO = new class extends Instruments {
			constructor() {
				super("Electric Piano");
			}
		};
		public static readonly ELECTRIC_PIANO_CHORUS = new class extends Instruments {
			constructor() {
				super("Electric Piano (chorus)");
			}
		};


		public static readonly ACCORDION_BASS = new class extends Instruments {
			constructor() {
				super("Accordion (bass)");
			}
		};
		public static readonly ACCORDION_TREBLE = new class extends Instruments {
			constructor() {
				super("Accordion (treble)");
			}
		};

		public static readonly WOOD_BLOCK = new class extends Instruments {
			constructor() {
				super("Wood Block");
			}
		};
		public static readonly CASTANET = new class extends Instruments {
			constructor() {
				super("Castanet");
			}
		};
		public static readonly TABLA = new class extends Instruments {
			constructor() {
				super("Tabla");
			}
		};
		public static readonly COWBELL = new class extends Instruments {
			constructor() {
				super("Cowbell");
			}
		};
		public static readonly DETUNED_BELL = new class extends Instruments {
			constructor() {
				super("Detuned Bell");
			}
		};
		public static readonly SLEIGH_BELLS = new class extends Instruments {
			constructor() {
				super("Sleigh Bells");
			}
		};
		public static readonly GONG_OR_TAM_TAM = new class extends Instruments {
			constructor() {
				super("Gong / Tam-Tam");
			}
		};

		public static readonly XYLOPHONE = new class extends Instruments {
			constructor() {
				super("Xylophone");
			}
		};
		public static readonly VIBRAPHONE = new class extends Instruments {
			constructor() {
				super("Vibraphone");
			}
		};
		public static readonly SYNTH_GLOCKENSPIEL = new class extends Instruments {
			constructor() {
				super("Synth Glockenspiel");
			}
		};
		public static readonly TUBULAR_BELLS_OR_CHIMES = new class extends Instruments {
			constructor() {
				super("Tubular Bells / Chimes");
			}
		};
		public static readonly WIND_CHIMES = new class extends Instruments {
			constructor() {
				super("Wind Chimes");
			}
		};
		public static readonly PIPE_ORGAN = new class extends Instruments {
			constructor() {
				super("Pipe Organ");
			}
		};
		public static readonly ELECTRIC_ORGAN = new class extends Instruments {
			constructor() {
				super("Electric Organ");
			}
		};

		public static readonly SNARE_DRUM = new class extends Instruments {
			constructor() {
				super("Snare Drum");
			}
		};
		public static readonly BASS_DRUM = new class extends Instruments {
			constructor() {
				super("Bass Drum");
			}
		};
		public static readonly CRASH_CYMBAL = new class extends Instruments {
			constructor() {
				super("Crash Cymbal");
			}
		};
		public static readonly REVERSED_CYMBAL = new class extends Instruments {
			constructor() {
				super("Reversed Cymbal");
			}
		};
		public static readonly OPEN_HI_HAT = new class extends Instruments {
			constructor() {
				super("Open Hi-Hat");
			}
		};
		public static readonly KETTLE_DRUM = new class extends Instruments {
			constructor() {
				super("Kettle Drum");
			}
		};
		public static readonly TIMBALE_DRUM = new class extends Instruments {
			constructor() {
				super("Timbale Drum");
			}
		};
		public static readonly STEEL_DRUM = new class extends Instruments {
			constructor() {
				super("Steel Drum");
			}
		};
		public static readonly TAIKO_DRUM = new class extends Instruments {
			constructor() {
				super("Taiko Drum");
			}
		};


		public static readonly FLUTE = new class extends Instruments {
			constructor() {
				super("Flute");
			}
		};
		public static readonly TRUMPET = new class extends Instruments {
			constructor() {
				super("Trumpet");
			}
		};
		public static readonly HARPSICHORD = new class extends Instruments {
			constructor() {
				super("Harpsichord");
			}
		};
		public static readonly SAXOPHONE = new class extends Instruments {
			constructor() {
				super("Saxophone");
			}
		};
		public static readonly TUBA = new class extends Instruments {
			constructor() {
				super("Tuba");
			}
		};
		public static readonly PICCOLO = new class extends Instruments {
			constructor() {
				super("Piccolo");
			}
		};


		public static readonly ELECTRIC_GUITAR = new class extends Instruments {
			constructor() {
				super("Electric Guitar");
			}
		};
		public static readonly ACOUSTIC_GUITAR = new class extends Instruments {
			constructor() {
				super("Acoustic Guitar");
			}
		};
		public static readonly BASS_GUITAR = new class extends Instruments {
			constructor() {
				super("Bass Guitar");
			}
		};
		public static readonly ELECTRIC_BASS_GUITAR = new class extends Instruments {
			constructor() {
				super("Electric Bass Guitar");
			}
		};
		public static readonly BASS_UKULELE = new class extends Instruments {
			constructor() {
				super("Bass Ukulele");
			}
		};
		public static readonly BANJO = new class extends Instruments {
			constructor() {
				super("Banjo");
			}
		};
		public static readonly SITAR = new class extends Instruments {
			constructor() {
				super("Sitar");
			}
		};

		public static readonly SYNTH_CHOIR_VOICE_AND_CHORUS = new class extends Instruments {
			constructor() {
				super("Synth (Choir, Voice & Chorus)");
			}
		};
		public static readonly SYNTH_CHORD = new class extends Instruments {
			constructor() {
				super("Synth Chord");
			}
		};
		public static readonly SYNTH_SYNTH = new class extends Instruments {
			constructor() {
				super("Synth Synth");
			}
		};
		public static readonly SYNTH_HORN = new class extends Instruments {
			constructor() {
				super("Synth Horn");
			}
		};

		public static readonly PIZZICATO_STRINGS = new class extends Instruments {
			constructor() {
				super("Pizzicato Strings");
			}
		};
		public static readonly LEGATO_STRINGS = new class extends Instruments {
			constructor() {
				super("Legato Strings");
			}
		};
		public static readonly STACCATO_STRINGS = new class extends Instruments {
			constructor() {
				super("Staccato Strings");
			}
		};

		public static readonly DULCIMER = new class extends Instruments {
			constructor() {
				super("Dulcimer");
			}
		};
		public static readonly ORCHESTRA_HIT = new class extends Instruments {
			constructor() {
				super("Orchestra Hit");
			}
		};
		public static readonly SUPERSAW = new class extends Instruments {
			constructor() {
				super("Supersaw");
			}
		};
		public static readonly SAW_BASS = new class extends Instruments {
			constructor() {
				super("Saw Bass");
			}
		};
		public static readonly SHANAI = new class extends Instruments {
			constructor() {
				super("Shanai");
			}
		};
		public static readonly SQUARE_WAVE = new class extends Instruments {
			constructor() {
				super("Square Wave");
			}
		};
		public static readonly SHAMISEN = new class extends Instruments {
			constructor() {
				super("Shamisen");
			}
		};
		public static readonly CELESTA = new class extends Instruments {
			constructor() {
				super("Celesta");
			}
		};
		public static readonly OBOE = new class extends Instruments {
			constructor() {
				super("Oboe");
			}
		};


		protected static readonly _default = Instruments.UNKNOWN;


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
			return Enum._getSize(Instruments);
		}

		public static get values(): Instruments[] {
			return Enum._values(Instruments);
		}

		public static get default(): Instruments {
			return Enum._getDefault(Instruments);
		}

		public static getValue(nullObject: null | undefined): null
		public static getValue(name: string | String): Instruments
		public static getValue(index: number | Number): Instruments
		public static getValue(arg1: number | string | Number | String): null | Instruments {
			return Enum._getValue(arg1, Instruments);
		}

	}

}