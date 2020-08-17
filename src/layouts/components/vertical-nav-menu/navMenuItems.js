/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/dashboard',
    name: 'Dashboard',
    icon_url: 'icon1.png',
    i18n: 'Dashboard',
  },
  {
    url: '/document',
    name: 'Documents',
    icon_url: 'icon2.png',
    i18n: 'Documents',
  },
  {
    url: '/template',
    name: 'Templates',
    icon_url: 'icon3.png',
    i18n: 'Templates',
  },
  {
    url: '/flows',
    name: 'Flows',
    icon_url: 'icon4.png',
    i18n: 'Flows',
  },
  {
    url: '/identity',
    name: 'Identity',
    icon_url: 'icon5.png',
    i18n: 'Identity',
  },
  {
    url: '/notarizations',
    name: 'NotariZations',
    icon_url: 'icon6.png',
    i18n: 'NotariZations',
  },
  {
    url: '/extra',
    name: 'Extra',
    icon_url: 'icon7.png',
    i18n: 'Extra',
  },
  {
    url: '/setting',
    name: 'Setting',
    icon_url: 'setting.png',
    i18n: 'Setting',
  },
  {
    url: '/help',
    name: 'Help',
    icon_url: 'message.png',
    i18n: 'Help',
  },
  {
    name: 'Authenticated',
    icon_url: 'check.png',
    i18n: 'Authenticated',
  },
]
