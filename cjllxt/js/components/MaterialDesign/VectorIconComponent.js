import MaterialIcons from './style/MaterialIcons';

let _iconComponent = MaterialIcons;

export default {
  set(component) {
    _iconComponent = component;
  },

  get() {
    return _iconComponent;
  }
}
