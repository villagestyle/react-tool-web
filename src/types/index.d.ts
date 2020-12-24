type NumberBool = 0 | 1;
type State = 0 | 1 | 2;

export type SubmitAction = 0 | 1;
export interface Screen {
  rows: number;
  pageNum: number;
}
export interface LoginData {
  username: string;
  password: string;
  sysNo: string;
}

export interface RegisterData {
  username: string;
  cellphone: string;
  password: string;
  token: string;
  picCode: string;
  sysNo: string;
}

export interface User {
  cellphone: string;
  creTime: string;
  headImg: string;
  id: number;
  openId: string;
  operName: string;
  operUserId: string;
  password: string;
  role: Role;
  schoolId: number;
  state: 0 | 1;
  stateTime: string;
  username: string;
  studentFile: StudentFile;
  studentFileId: string;
  staffFileId: string;
  staffFile: any;
}

export interface StudentFile {
  cellphone: string;
  classId: string;
  className: string;
  creTime: string;
  departmentId: string;
  departmentName: string;
  educationId: string;
  educationName: string;
  entranceSchoolYearId: string;
  entranceSchoolYearName: string;
  headImg: string;
  id: string;
  idNo: string;
  isRegister: 0 | 1;
  mail: string;
  majorId: string;
  majorName: string;
  name: string;
  no: string;
  politicalStatus: 0 | 1 | 2 | 3 | 4;
  schoolId: string;
  schoolName: string;
  schoolYearId: string;
  schoolYearName: string;
  sex: 0 | 1;
  state: 0 | 1 | 2;
  stateTime: string;
  suitImg: string;
}

export interface StaffFile {
  /** 定职时间 */
  appointmentDay: string;
  birthday: string;
  cellphone: string;
  /** 所在单位 */
  departmentName: string;
  /** 最后学位 0：学士；1：硕士；2：博士 */
  finalDegree: 0 | 1 | 2;
  /** 最高学历 0：本科；1：硕士研究生；2：博士研究生 */
  highestEducation: 0 | 1 | 2;
  id: number;
  /** 是否专任教师 0 否 1 是 */
  isFullTimeTeacher: 0 | 1;
  name: string;
  no: string;
  /** 政治面貌 0：中共党员；1：群众；2：中共团员 */
  politicalStatus: 0 | 1 | 2;
  /** 职务 */
  positionName: string;
  schoolId: number;
  /** 性别 0 女 1 男 */
  sex: 0 | 1;
  /** 人员编制 0 外聘 1 在编 */
  staffEstablishing: 0 | 1;
  state: 0 | 1;
  stateTime: string;
  /** 职称  0：助教；1：讲师；2：副教授；3：教授 */
  title: 0 | 1 | 2 | 3;
  workDay: string;
}

export interface Role {
  creTime: string;
  id: number;
  isAdmin: 0 | 1;
  name: string;
  operName: string;
  operUserId: number;
  resources: Resource[];
  schoolId: number;
  statr: 0 | 1;
  stateTime: string;
}

export interface Resource {
  creTime: string;
  icon: string;
  id: number;
  link: string;
  name: string;
  permission: string;
  pid: number;
  /** 显示顺序 */
  priority: number;
  routerLink: string;
  state: 0 | 1;
  stateTime: string;
  /** 0 菜单 1 按钮 */
  type: 0 | 1;
}

/** 0：项目申报；1：其他；2：项目结题 */
type StageType = 0 | 1 | 2;
/** 阶段状态，0未开始1进行中2已结束 */
type StageState = 0 | 1 | 2;
/** 项目来源，0：教师科研项目子项目；1：学生自选项目 , */
type ProjectSource = 0 | 1;
/** 审批状态，0：未审批；1：通过；2：驳回；3：草稿 */
type AuthState = 0 | 1 | 2 | 3;
/** 当前审批环节类型，0：指导老师审批；1：院系级审核；2：校级审核 */
type AuthSegmentNo = 0 | 1 | 2;

export interface Stage {
  id: string;
  isDepartmentAuth: NumberBool;
  isDepartmentExpertAuth: NumberBool;
  isInstructorAuth: NumberBool;
  isNeedAttach: NumberBool;
  isSchoolAuth: NumberBool;
  isSchoolExpertAuth: NumberBool;
  /** 项目阶段需提交内容 */
  items: StageSubmitItem[];
  name: string;
  type: StageType;
  operFileId: string;
  operName: string;
  operUserId: string;
  state: State;
}

export interface StageSubmitItem {
  id: string;
  maxNum: number;
  minNum: number;
  name: string;
  projectPhaseId: string;
  state: State;
}

export interface Cycle {
  approvalProjectNum: number;
  beginDate: number;
  cycleYear: string;
  endDate: number;
  id: string;
  name: string;
  phaseRelas: CycleAndStageRelation[];
  projectCycleProjectPhaseRela: CycleAndStageRelation;
  projectNum: number;
  state: State;
}

/** 项目周期与项目阶段的关联 */
export interface CycleAndStageRelation {
  beginDate: string;
  endDate: string;
  id: string;
  phaseState: StageState;
  projectCycleId: string;
  projectPhaseId: string;
  projectPhaseName: string;
  state: State;
}

export interface ProjectTeam {
  code: string;
  creTime: string;
  departmentId: string;
  departmentName: string;
  departments: Department[];
  hasStudentNum: number;
  hasTeacherNum: number;
  id: string;
  introduce: string;
  isPublicRecruit: NumberBool;
  logo: string;
  majors: Major[];
  memberIntroduce: string;
  name: string;
  project: Project;
  state: State;
  stateTime: string;
  studentCellphone: string;
  studentName: string;
  studentFileId: string;
  studentNum: number;
  studentUserId: string;
  teacherNum: number;
}

export interface Department {
  creTime: string;
  id: string;
  /** 级别，1：院系级；2：校级 */
  level: 1 | 2;
  name: string;
  state: State;
}

export interface Major {
  creTime: string;
  id: string;
  department: Department;
  departmentId: string;
  departmentName: string;
  state: State;
}

export interface Project {
  beginDate: string;
  endDate: string;
  currProjectPhaseResult: ProjectPhaseResult;
  funds: number;
  id: string;
  introduce: string;
  name: string;
  projectAmount: number;
  projectCycle: Cycle;
  projectCycleId: string;
  /** 立项状态，0：未立项；1：已立项 , */
  projectStatus: NumberBool;
  source: ProjectSource;
  teamId: string;
  type: number;
  state: State;
}

export interface ProjectPhaseResult {
  attachmentLink: string;
  attachmentName: string;
  authSegmentResults: any[];
  authState: AuthState;
  authTime: string;
  currAuthSegmentNo: AuthSegmentNo;
  id: string;
  no: number;
  phaseResultItems: any[];
  projectId: string;
  projectPhase: Stage;
  projectPhaseId: string;
  teamId: string;
  state: State;
}
