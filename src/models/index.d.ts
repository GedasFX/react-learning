import { GetTaskQuery, GetPrivateNoteQuery } from '../API';

export declare interface Task
  extends Omit<Exclude<GetTaskQuery['getTask'], null>, '__typename'> {}

export declare interface PrivateNote
  extends Omit<
    Exclude<GetPrivateNoteQuery['getPrivateNote'], null>,
    '__typename'
  > {}
