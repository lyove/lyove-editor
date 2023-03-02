/**
 * Schema [/ˈskiːmə]
 *
 */
export default class Schema {
  constructor() {
    this.data = {
      blocks: [],
      inlines: [],
      marks: [],
      globals: {},
    };
  }
}

/**
 * data example
 */
/*
{
  blocks : [
    { h1: {} },
    { h2: {} },
    { h3: {} },
    {
      p: {
        style: {
          'text-align': ['left', 'right', 'center', 'justify'],
        },
      },
    },
  ],
  marks : [
    { strong: {} },
    { em: {} },
    { u: {} },
    {
      span, {
        style: {
          color: '@color',
          'background-color': '@color',
        },
      },
    }],
  ],
}
*/
