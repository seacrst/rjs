import { cmp } from "./cmp";
import { err } from "./result";
import { exp } from "./expressions";
import { Option, none } from "./option";
import { match } from "./match";

export type NothingKind = {
  dirty: Option<undefined | null>
  empty: Option<0 | "" | {} | []>
  error: boolean
}

export class Nothing {
  static from(value: NothingKind): Nothing {
    const {dirty = none(), empty = none(), error = true} = value;

    const d = dirty.unwrap();
    const e = empty.unwrap();

    return !d && !(typeof d === "string" || typeof d === "number") || ((e !== undefined || e !== null) && (e === "" || e === 0 || cmp(e, {}) === 1 || cmp(e, []) === 1)) ?
    nothing() : exp(() => {

      if (error) {
        const output = err(match<Option<undefined | null> | Option<0 | "" | {} | []>, Nothing>(none<Option<undefined | null> | Option<0 | "" | {} | []>>(), () => [
          [dirty, () => e],
          [empty, () => d]
        ], () => `${d}, ${e}`)).expect("Value not dirty or empty");
    
        console.log(output);
      }

      return nothing();
    })
    
  }
}

export function nothing(): Nothing {
  return (function() {
    return "Nothing" as Nothing;
  })();
}