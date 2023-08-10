import { Result } from './../domain/result';
import { Audit } from './../audit/audit';
import { Entity } from './../domain/entity';
import { Project } from './../project/project';
import { IIssue } from './interfaces/issue.interface';

export class Issue extends Entity implements IIssue {
  _title: string;
  _description: string;
  _status: string;
  _priority: string;
  _assignee?: string;
  _reporter?: string;
  _projectId: string;
  _project?: Project;
  _audit: Audit;

  constructor(id: string, props: IIssue) {
    super(id);
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;
    this._priority = props.priority;
    this._assignee = props.assignee;
    this._reporter = props.reporter;
    this._projectId = props.projectId;
    this._project = props.project;
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
  }

  get priority(): string {
    return this._priority;
  }

  set priority(priority: string) {
    this._priority = priority;
  }

  get assignee(): string | undefined {
    return this._assignee;
  }

  set assignee(assignee: string) {
    this._assignee = assignee;
  }

  get reporter(): string | undefined {
    return this._reporter;
  }

  set reporter(reporter: string) {
    this._reporter = reporter;
  }

  get projectId(): string {
    return this._projectId;
  }

  set projectId(projectId: string) {
    this._projectId = projectId;
  }

  get project(): Project | undefined {
    return this._project;
  }

  set project(project: Project) {
    this._project = project;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IIssue, id?: string): Result<Issue> {
    return Result.ok<Issue>(new Issue(id, props));
  }
}
