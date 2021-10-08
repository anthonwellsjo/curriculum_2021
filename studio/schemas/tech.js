export default {
  name: 'tech',
  title: 'Tech',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'techlogo',
      title: 'Tech Logo',
      type: 'image',
    },
    {
      name: 'techType',
      title: 'Tech Type',
      type: 'array',
      of: [{ type: 'reference', to:[{type: 'techType'}] }]
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
  ],
}
