import { Command, Invoker, Receiver } from ".";

// create receiver
interface IWallet {
  money: number;
}

// declare command actions
class DepositCommand extends Command {
  private receiver: Receiver<IWallet>;
  private depositWallet: IWallet;

  constructor(wallet: Receiver<IWallet>) {
    super();
    this.receiver = wallet;
    this.depositWallet = { money: 0 };
  }

  execute = (wallet: IWallet) => {
    this.receiver.execute({
      func: "deposit",
      value: wallet,
    });
    this.depositWallet = wallet;
  };

  undo = () => {
    this.receiver.execute({
      func: "withdraw",
      value: this.depositWallet,
    });
  };
}

class WithdrawCommand extends Command {
  private receiver: Receiver<IWallet>;
  private wallet: IWallet;

  constructor(wallet: Receiver<IWallet>) {
    super();
    this.receiver = wallet;
    this.wallet = { money: 0 };
  }

  execute = (wallet: IWallet) => {
    this.receiver.execute({
      func: "withdraw",
      value: wallet,
    });
    this.wallet = wallet;
  };

  undo = () => {
    this.receiver.execute({
      func: "deposit",
      value: this.wallet,
    });
  };
}

export const run = () => {
  // create invoker
  const user = new Invoker();

  const wallet = new Receiver<IWallet>({ money: 0 });

  // run
  user.request(new DepositCommand(wallet), {
    money: 100,
  });
  user.request(new WithdrawCommand(wallet), {
    money: 10,
  });
  user.request(new DepositCommand(wallet), {
    money: 100,
  });
  user.undo();
  user.redo();
  user.request(new WithdrawCommand(wallet), {
    money: 10,
  });
  user.undo();
};
