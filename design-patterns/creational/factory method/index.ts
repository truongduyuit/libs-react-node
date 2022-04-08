class Factory {
  create = (key: string) => {
    let factory: any;
    switch (key) {
      case "A": {
        factory = new FactoryA();
        break;
      }
      case "B": {
        factory = new FactoryB();
        break;
      }
      case "C": {
        factory = new FactoryC();
        break;
      }
    }
    return factory;
  };
}

class FactoryA {
  private name: string = "A";
  hello = () => {
    console.log(`hello i am factory${this.name}`);
  };
}

class FactoryB {
  private name: string = "B";
  hello = () => {
    console.log(`hello i am factory${this.name}`);
  };
}

class FactoryC {
  private name: string = "C";
  hello = () => {
    console.log(`hello i am factory${this.name}`);
  };
}

export const run = () => {
  const factory = new Factory();
  const factories = [
    factory.create("A"),
    factory.create("B"),
    factory.create("C"),
  ];

  factories.forEach((f) => f.hello());
};
