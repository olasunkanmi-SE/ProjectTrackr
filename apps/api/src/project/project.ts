import { Result } from './../domain/result';
import { Audit } from './../audit/audit';
import { Entity } from './../domain/entity';
import { IProject } from './interfaces/project.interface';

export class Project extends Entity implements IProject {
  _name: string;
  _description: string;
  _code: string;
  _category: string;
  _audit: Audit;
  constructor(id: string, props: IProject) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._code = props.code;
    this._category = props.category;
    this._audit = props.audit;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get code(): string {
    return this._code;
  }

  set code(code: string) {
    this._code = code;
  }

  get category(): string {
    return this._category;
  }

  set category(category: string) {
    this._category = category;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IProject, id?: string): Result<Project> {
    return Result.ok<Project>(new Project(id, props));
  }
}
