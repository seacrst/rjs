
export interface Option<T> {
  value: T
  unwrap(): T
  unwrapOr(value: any): T
  unwrapOrElse(exp: () => any): any
};

export class None<T> implements Option<any> {
  constructor(readonly value: T | any = {
    __NULL__: null
  }) {}

  unwrap() {
    return this.value;
  }

  unwrapOr<V>(value: V): V {
    return value;
  }

  unwrapOrElse(exp: () => any) {
    return exp();
  }
  
};

export class Some<T> implements Option<T> {
  constructor(readonly value: T) {}

  unwrap() {
    return this.value;
  }

  unwrapOr(): T {
    return this.value;
  }

  unwrapOrElse() {
      return this.unwrap();
  }
};


export function some<T>(value: T): Option<T> {
  return new Some<T>(value);
}

export function none<T>(): Option<T> {
  return new None<T>();
}