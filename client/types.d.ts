interface PageContextData {
  slowMo: boolean,
  projects: ProjectPlus[],
  splashASprut: {
    letsDoIt: boolean,
    position: { left: string, top: string }
  },
  somethingHovering: boolean,
  showProjects: boolean,
  currentProject: Project | null,
  showBalls: boolean
}

interface BlockTextChild {
  _key: string;
  _type: string;
  marks: any[];
  text: string;
}

interface BlockText {
  _key: string;
  _type: string;
  children: BlockTextChild[];
  markDefs: any[];
  style: string;
}

interface Slug {
  __typename: string;
  current: string;
}

interface Project {
  __typename: string;
  title: string;
  projectColor: string;
  _id: string;
  descriptionRaw: BlockText[];
  slug: Slug;
  deployUrl?: any;
}

interface ProjectPlus {
  __typename: string;
  title: string;
  projectColor: string;
  _id: string;
  descriptionRaw: BlockText[];
  slug: Slug;
  deployUrl?: any;
  left: string;
  top: string;
}

interface AllProjectData {
  allProject: Project[];
}
