import sanityClient from "@sanity/client";

export const mySanityClient = sanityClient({
  projectId: "2nwawwcw",
  dataset: "production",
  useCdn: true
});