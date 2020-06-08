namespace src.util.lang {


	/**
	 * A simple interface that can compare 2 different objects/classes via 1 method named {@link equals}.<br>
	 * This is typically used in Java programming, but,
	 * it could be useful when trying to compare a lot more proprieties inside a class.<br><br>
	 *
	 * Note that in the method {@link equals}, there should be more than 1 return to be fast
	 * when comparing the object received to this instance.
	 */
	export interface Comparable {


		/**
		 * A method definition that return false every time a null object
		 * is received via this instance.
		 *
		 * @param nullReference - the null object
		 * @return false the instance is never the same as a null or undefined value.
		 */
		equals(nullReference: null | undefined): false

		/**
		 * A method definition that will return a certain boolean based on
		 * the attribute pre-determined by the instance.
		 *
		 * @param comparable the object to compare
		 * @return boolean the instance is similar as the comparable class
		 */
		equals(comparable: Comparable): boolean

		/**
		 * A method definition that return false every time it is
		 * not of the type of this class.
		 *
		 * @param object the object that is not a {@link Comparable}
		 * @return false the instance could be the same as the attributes and the rest,
		 * but not in a concept of comparable class.
		 */
		equals(object: object): false

	}

}