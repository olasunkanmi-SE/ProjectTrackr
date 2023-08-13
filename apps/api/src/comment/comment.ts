import { Entity } from 'src/domain/entity';
import { IComment } from './interfaces/comment.interface';
import { Audit } from 'src/audit/audit';
import { Issue } from 'src/issue/issue';
import { Result } from 'src/domain/result';

export class Comment extends Entity implements IComment {
  _content: string;
  _issueId: string;
  _issue: Issue;
  _user: string;
  _audit: Audit;

  constructor(id: string, props: IComment) {
    super(id);
    this._content = props.content;
    this._issue = props.issue;
    this._issueId = props.issueId;
    this._user = props.user;
    this._audit = props.audit;
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

  get issueId(): string {
    return this._issueId;
  }

  set issueId(issueId: string) {
    this._issueId = issueId;
  }

  get issue(): Issue {
    return this._issue;
  }

  set issue(issue: Issue) {
    this._issue = issue;
  }

  get user(): string {
    return this._user;
  }

  set user(user: string) {
    this._user = user;
  }

  get audit(): Audit {
    return this._audit;
  }

  set audit(audit: Audit) {
    this._audit = audit;
  }

  static create(props: IComment, id?: string): Comment {
    return Result.ok<Comment>(new Comment(id, props)).getValue();
  }
}
