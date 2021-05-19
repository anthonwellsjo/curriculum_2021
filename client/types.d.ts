interface PageContextData {
  slowMo: boolean,
  projects: ProjectPlus[],
  splashASprut: {
    letsDoIt: boolean,
    position: { left: string, top: string }
  },
  somethingHovering: boolean,
  showProjects: boolean, 
  currentProject: Project | null
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
