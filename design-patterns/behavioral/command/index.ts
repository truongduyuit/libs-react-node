export class Command {
  execute = (args?: any) => {};
  undo = () => {};
}

export class Invoker<T> {
  private _currentCommand: number = -1;
  private _listCommands: Command[] = [];

  request(command: Command, args?: any) {
    command.execute(args);
    this._currentCommand++;

    if (this._currentCommand < this._listCommands.length) {
      this._listCommands = this._listCommands.splice(0, this._currentCommand);
    }

    this._listCommands.push(command);
  }

  undo() {
    if (this._currentCommand < 0) {
      console.error("Nothing to undo");
      return;
    }

    console.log("undo");
    this._listCommands[this._currentCommand].undo?.();
    this._currentCommand--;
  }

  redo() {
    this._currentCommand++;
    if (this._currentCommand >= this._listCommands.length) {
      console.error("Nothing to redo");
      return;
    }

    this._listCommands[this._currentCommand].execute();
    console.log("redo");
  }
}

export class Receiver<T> {
  private value: T;

  constructor(t: T) {
    this.value = t;
  }

  execute({ func, value }: { func: string; value?: T }) {
    /** examples */
    switch (func) {
      case "deposit": {
        if (!value) return;

        const cvtThisValue = JSON.parse(JSON.stringify(this.value));
        const cvtValue = JSON.parse(JSON.stringify(value));

        Object.keys(value).map((key: any) => {
          cvtThisValue[key] += cvtValue[key];
        });

        this.value = cvtThisValue as T;
        console.log("deposit: ", value, "current: ", this.value);
        return this.value;
      }
      case "withdraw": {
        if (!value) return;

        const cvtThisValue = JSON.parse(JSON.stringify(this.value));
        const cvtValue = JSON.parse(JSON.stringify(value));

        Object.keys(value).map((key: any) => {
          cvtThisValue[key] -= cvtValue[key];

          if (cvtThisValue[key] < 0) {
            console.log("moeny < withdraw");
            return;
          }
        });

        this.value = cvtThisValue as T;
        console.log("withdraw: ", value, "current: ", this.value);
        return this.value;
      }
    }
  }
}
