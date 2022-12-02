export default function () {
  return [
    {
      title: 'User Profile',
      permission: null,
      htmlBefore: '<i class="bx bx-user"></i>',
      to: {
        name: 'userprofile',
      },
    },
    {
      title: 'Folders',
      // permission: 'createClass',
      permission: null,
      htmlBefore: '<i class="bx bxs-folder" style="font-size: 1.2rem"></i>',
      to: {
        name: 'folder',
      },
    },
    {
      title: 'Favorites',
      // permission: 'createClass',
      permission: null,
      htmlBefore: '<i class="bx bxs-star" style="font-size: 1.2rem"></i>',
      to: {
        name: 'favourites',
      },
    },
    {
      title: 'Public Files',
      permission: null,
      htmlBefore: '<i class="bx bx-user"></i>',
      to: {
        name: 'shareddocs',
      },
    },

    {
      title: 'Search Online',
      permission: 'CreateUser',
      htmlBefore: '<i class="bx bx-search" style="font-size: 1.2rem"></i>',
      to: {
        name: 'onlinesearch',
      },
    },
  ]
}
