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
      title: 'Favorites',
      // permission: 'createClass',
      permission: null,
      htmlBefore:
        '<i class="bx bxs-book-content" style="font-size: 1.2rem"></i>',
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
      htmlBefore:
        '<i class="bx bx-message-square-detail" style="font-size: 1.2rem"></i>',
      to: {
        name: 'users',
      },
    },
  ]
}
