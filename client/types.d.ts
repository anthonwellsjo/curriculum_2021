interface PageContextData {
  slowMo: boolean,
  projects: ProjectPlus[],
  splashASprut: boolean
}

interface Project {
  __typename: string;
  _id: string;
  title: string;
  projectColor: string;
}

interface ProjectPlus {
  __typename: string;
  _id: string;
  title: string;
  projectColor: string;
  left: string;
  top: string;
}

interface AllProjectData {
  allProject: Project[];
}
