import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
 
  {
    id: 'seguridad',
    title: 'Seguridad',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'mi-perfil',
        title: 'Mi Perfil',
        type: 'item',
        url: '/seguridad/mi-perfil',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
     
    ]
  }
 
];

const NavigationItemsAnfitrion = [
 
  {
    id: 'seguridad',
    title: 'Seguridad',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'mi-perfil',
        title: 'Mi Perfil',
        type: 'item',
        url: '/seguridad/mi-perfil',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
     
    ]
  },
  {
    id: 'anfrition',
    title: 'Anfritión',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'propiedad',
        title: 'Propiedades',
        type: 'item',
        url: '/mantenimientos/propiedad',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'feed-anfitrion',
        title: 'Mi Feed Anfitrión',
        type: 'item',
        url: '/feed/feed-anfitrion/2',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
     
    ]
  },
 
];

const NavigationItemsCliente = [
 
  {
    id: 'seguridad',
    title: 'Seguridad',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'mi-perfil',
        title: 'Mi Perfil',
        type: 'item',
        url: '/seguridad/mi-perfil',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
     
    ]
  },
  {
    id: 'cliente',
    title: 'Cliente',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'feed-cliente',
        title: 'Feed Cliente',
        type: 'item',
        url: '/feed/feed-cliente',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'propiedades-favoritas',
        title: 'Propiedades Favoritas',
        type: 'item',
        url: '/reservacion/propiedades-favoritas',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }

  public getCliente() {
    return NavigationItemsCliente;
  }

  public getAnfitrion() {
    return NavigationItemsAnfitrion;
  }
}
