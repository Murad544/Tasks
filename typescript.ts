type User = {
  name: string;
  age: number;
  banned: boolean;
  status: 'online' | 'invisible' | 'away' | 'offline' | 'dnd';
};

type Example = {
  creation_date: string; //datestring
  id: `${string}-${string}-${string}-${string}`; //uuid
  like_count: number;
  author: User;
};

/**
 * The following function has been implemented naively, with the widest types
 * The input params don't have any intellisense/autocomplete, and the function allows invalid imputs
 * Improve the function's type signature. Points are awarded for:
 * - autocompletion
 * - narrowness of types
 * - correctness of types and hence how good the build-time guarantees are
 * - readability
 * - extendability of relevant types
 */
function setValue(key: string, value: any): void {
  console.log(`Set ${key} to ${value}`); //imagine this writes to something like LocalStorage or URLSearchParams
}

setValue('nonexistent', 1231);
setValue('like_count', 'morbillion');

// First of all we need to make sure that the key is a valid key of Example
// Then we need to make sure that the value is of the same type as the key
// We can use the generic type T to represent the key, and then use the keyof operator to get the type of the key
// Then we can use the indexed access operator to get the type of the value

function setValueImproved<T extends keyof Example>(
  key: T,
  value: Example[T],
): void {
  console.log(`Set ${key} to ${value}`); //imagine this writes to something like LocalStorage or URLSearchParams
}

setValueImproved('like_count', 1231); // This works
setValueImproved('like_count', 'morbillion'); // This doesn't work

/**
 * The following function should receive a list of allowed states and the initial state
 * Yet the current implementation doesn't check if the initial state is one of the allowed states
 *
 * This is a bonus question, and you don't need to successfully complete it, but points will be made
 * for your approach to solving this problem, even if you don't succeed. While it is possible, solving it is not trivial
 * in current versions of Typescript, but TS has added a utility type that trivially solves it on the day of making this excercize
 */
function bonus<T extends string>(allowed_states: Array<T>, initial: T) {
  console.log(allowed_states, initial);
}

bonus(['foo', 'bar'], 'invalid');

function bonusImporved<T extends string>(
  allowed_states: Array<T>,
  initial: NoInfer<T>,
) {
  console.log(allowed_states, initial);
}

// We can use the NoInfer utility type to make sure that the type of the initial state is not inferred
// This will return an error as it is not available in the current version of Typescript
