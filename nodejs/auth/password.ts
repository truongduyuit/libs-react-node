import bcrypt from "bcrypt";

const hash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const compare = async (password: string, hash: string) =>
  await bcrypt.compare(hash, password);

export { hash, compare };
