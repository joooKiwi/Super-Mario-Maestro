namespace src.util.builder {

	/**
	 * <p>
	 * A general interface to contain a single method to end the process of creation.
	 * </p>
	 *
	 * <p>
	 * It generally contain multiple methods that return the instance created (<i>this</i>)
	 * to  allow modification in cascade.
	 * </p>
	 *
	 * <p>
	 * Then, when the {@link build} is called, the generic type "<b>T</b>" is returned.
	 * It should <u>normally</u> return a new instance of the specified element.
	 * </p>
	 *
	 * @author JóôòKiwi
	 */
	export interface Builder<T> {

		/**
		 * A method to execute the process of creation made by this instance.
		 *
		 * @return a new object of type <b>T</b>
		 * @author JóôòKiwi
		 */
		build(): T;

	}

}