namespace src.util.lang {


	/**
	 * <p>
	 * A general interface to return a new instance with every attributes from this instance.
	 * </p>
	 *
	 * <p>
	 * It could be a deep copy/clone or a shallow copy/clone.
	 * But, it is up to the class to decide on it.
	 * </p>
	 *
	 * @author JóôòKiwi
	 */
	export interface Cloneable {

		/**
		 * Return a new instance with every attributes as a shallow or
		 * deep copy depending on the class need.
		 *
		 * @return this a new instance
		 * @author JóôòKiwi
		 */
		clone(): this;

	}


}