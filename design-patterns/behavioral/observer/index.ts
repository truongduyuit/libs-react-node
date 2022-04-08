class Observer<T, U> {
  private _value: U;
  private _listSubscribers: T[];

  constructor(subcribers: T[], value: U) {
    this._listSubscribers = subcribers ?? [];
    this._value = value;
  }

  subscribe = (subcriber: T) => {
    this._listSubscribers.push(subcriber);
  };

  unsubscribe = (subcriber: T) => {
    this._listSubscribers = this._listSubscribers.filter(
      (s) => s !== subcriber
    );
  };

  notify = () => {
    Promise.all(
      this._listSubscribers.map((subscriber: any) => {
        subscriber.receiveNotify(this._value);
      })
    );
  };

  update = (value: U) => {
    this._value = value;
    this.notify();
  };
}

class Subcriber {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  receiveNotify = (value: any) => {
    console.log(`Subcriber name ${this._name} receive value: ${value}`);
  };
}

export { Observer, Subcriber };
