module.exports = {
	images: {
		domains: ['https://2nwawwcw.api.sanity.io/v1/graphql/production/default']
	},
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
};