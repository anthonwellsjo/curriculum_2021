interface PageContextData {
  slowMo: boolean,
  projects: ProjectPlus[],
  splashASprut: {
    letsDoIt: boolean,
    position: { left: string, top: string }
  },
  somethingHovering: boolean,
}

interface Project {
  __typename: string;
  _id: string;
  title: string;
  projectColor: string;
  mainImage: {
    asset: {
      url: string
    }
  }
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
