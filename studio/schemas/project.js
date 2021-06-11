export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoDesktop',
      title: 'Video Desktop',
      type: 'file',
    },
    {
      name: 'videoMobile',
      title: 'Video Mobile',
      type: 'file',
    },
    {
      name: 'githubRepositoryLink',
      title: 'Github Repository Link',
      type: 'url',
    },
    {
      name: 'projectColor',
      title: 'Project Color',
      type: 'colorPicker'
    },
    {
      name: 'tech',
      title: 'Tech',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tech'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'deployUrl',
      title: 'Deploy URL',
      type: 'url'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
