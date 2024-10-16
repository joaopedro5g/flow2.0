export abstract class IRepository<T> {
  abstract create(input: unknown): Promise<void | T>;
  abstract findOne(input: unknown): Promise<void | T | T[]>;
  // abstract update(input: unknown): Promise<void | T>;
  // abstract delete(input: unknown): Promise<void | T>;
}
