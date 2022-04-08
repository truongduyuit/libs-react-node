import { Observer, Subcriber } from "./index";

export const run = () => {
  const observer = new Observer<Subcriber, number>([], 0);

  const subcriber1 = new Subcriber("subcriber1");
  const subcriber2 = new Subcriber("subcriber2");
  const subcriber3 = new Subcriber("subcriber3");

  observer.subscribe(subcriber1);
  observer.subscribe(subcriber2);
  observer.subscribe(subcriber3);
  observer.update(50);

  observer.unsubscribe(subcriber1);
  observer.update(100);
};
