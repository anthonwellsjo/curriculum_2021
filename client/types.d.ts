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
  showBalls: boolean,
  currentPage: "bio" | "main" | "work",
  showHeaderButtons: boolean,
  renderHeaderButtons: boolean,
  audio: boolean,
  bounceBalls: boolean
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
  gifLinkDesktop: string;
  gifLinkMobile: string;
  tech: Tech[];
  videoDesktop: {
    asset: {
      url: string;
    }
  }
  videoMobile: {
    asset: {
      url: string;
    }
  }
  mainImage: {
    asset: {
      url: string;
    }
  }
}

interface ProjectPlus {
  __typename: string;
  title: string;
  projectColor: string;
  _id: string;
  descriptionRaw: BlockText[];
  slug: Slug;
  deployUrl?: any;
  gifLinkDesktop: string;
  gifLinkMobile: string;
  tech: Tech[];
  videoDesktop: {
    asset: {
      url: string;
    }
  }
  videoMobile: {
    asset: {
      url: string;
    }
  }
  mainImage: {
    asset: {
      url: string;
    }
  }
  left: string;
  top: string;
}

interface AllProjectData {
  allProject: Project[];
}




interface TechLogoAsset {
  __typename: string;
  url: string;
}

interface Techlogo {
  __typename: string;
  asset: TechLogoAsset;
}

interface tech {
  __typename: string;
  title: string;
  description: string;
  techlogo: Techlogo;
}

interface allTechData {
  allTech: tech[];
}

