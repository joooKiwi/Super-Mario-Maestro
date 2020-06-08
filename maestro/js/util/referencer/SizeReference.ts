namespace src.util.referencer {


	/**
	 * A class to return a size based on an object.
	 *
	 * The call of {@link addOne} is there to increment the size stored by
	 * this instance by one and then return itself to retrieve the attributes.
	 *
	 * @author JóôòKiwi
	 */
	export class SizeReference
		extends Reference {
		private _size: number = 0;

		public get size(): number {
			return this._size;
		}


		public addOne(): this {
			this._size++;
			return this;
		}

	}


}