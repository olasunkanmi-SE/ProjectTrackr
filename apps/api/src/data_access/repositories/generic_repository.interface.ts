import { FindOneOptions } from 'typeorm';

export interface IRepository<TEntity, TModel> {
  save(T: TEntity): Promise<TEntity>;
  find(findOneOptions: FindOneOptions<TModel>): Promise<TEntity[]>;
  findOneOrFail(): Promise<TEntity>;
  findOne(findOptions: FindOneOptions): Promise<TEntity | undefined>;
  findAll(): Promise<TEntity[]>;
}
