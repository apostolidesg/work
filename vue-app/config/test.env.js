'use strict';
const { merge } = require('webpack-merge');
const prodDevEnv = require('./prod.dev.env');
const { createLocalVue, mount, shallowMount } = require('@vue/test-utils');

const Vuex = require('vuex');
const VueRouter = require('vue-router');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

global.mount = mount;
global.shallowMount = shallowMount;
global.localVue = localVue;

module.exports = merge(prodDevEnv, {
  NODE_ENV: JSON.stringify('"testing"'),
  DRAW_API_HOST: '"apigatewayjh.ilot.dc.opap/api/v3.0/draws"',
});
