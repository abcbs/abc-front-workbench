import React from 'react';

import Anchor from './Anchor';
import NavMain from './NavMain'

// order matters
/* eslint-disable indent */
const sections = {
  buttons: '#buttons',
    btnGroups: '#btn-groups',
    dropdowns: '#btn-dropdowns',
    menuitems: '#menu-items',
  overlays: '#overlays',
    modals: '#modals',
    tooltips: '#tooltips',
    popovers: '#popovers',
    customOverlays: '#custom-overlays',
  navigation: '#navigation',
    navs: '#navs',
    navbars: '#navbars',
    crumbs: '#breadcrumbs',
    tabs: '#tabs',
    pagination: '#pagination',
    pager: '#pager',
  layout: '#page-layout',
    grid: '#grid',
    jumbotron: '#jumbotron',
    pageHeader: '#page-header',
    listGroup: '#listgroup',
    tables: '#tables',
    panels: '#panels',
    wells: '#wells',
  form: '#forms',
    formControls: '#forms-controls',
    formLayout: '#forms-layout',
    formInputGroup: '#forms-input-groups',
    formValidation: '#forms-validation',
  media: '#media-content',
    images: '#images',
    thumbnails: '#thumbnail',
    embed: '#responsive-embed',
    carousels: '#carousels',
    mediaObjects: '#media-objects',
  misc: '#misc',
    icons: '#glyphicons',
    labels: '#labels',
    badges: '#badges',
    alerts: '#alerts',
    progress: '#progress',
  utilities: '#utilities',
    transitions: '#transitions',
    customStyles: '#custom-styles',
  missing: '#missing',
    affix: '#affix',

};

const ComponentsPage = React.createClass({
  getInitialState() {
    return {
      activeNavItemHref: null
    };
  },

  getMain() {
    return this.refs.main;
  },

  handleNavItemSelect(key, e) {
    window.location = e.target.href;
  },

  componentDidMount() {
    this.afterSections = {};
    Object.keys(sections).forEach(
      key => this.afterSections[sections[key]] = false
    );

    const { hash } = window.location;
    if (this.afterSections[hash] !== undefined) {
      for (const href of Object.keys(this.afterSections)) {
        this.afterSections[href] = true;

        if (href === hash) {
          this.setActiveNavItem();
          break;
        }
      }
    }
  },

  setActiveNavItem() {
    let activeNavItemHref = null;

    for (const href of Object.keys(this.afterSections)) {
      if (!this.afterSections[href]) {
        break;
      }

      activeNavItemHref = href;
    }

    this.setState({ activeNavItemHref });
  },


  onBefore(href) {
    this.afterSections[href] = false;
    this.updateActiveHref();
  },

  onAfter(href) {
    this.afterSections[href] = true;
    this.updateActiveHref();
  },

  updateActiveHref() {
    if (this.updateActiveHrefHandle != null) {
      return;
    }

    this.updateActiveHrefHandle = setTimeout(() => {
      this.updateActiveHrefHandle = null;
      this.setActiveNavItem();
    });
  },

  render() {
    return (
      <div>
       test
      </div>
    );
  }
});

export default ComponentsPage;
