import { assert, getModules } from '/src/utils/tools'
import { pick, assign, isEmpty } from "lodash-es";

class MakeConst {
  constructor(options) {
    this.const = {};
    let { config, isUpperCase = true } = options;

    config.forEach((e) => {
      this._constSingleBuilder({
        namespace: e.__fileName__,
        isUpperCase,
        config: e,
      });
    });
    return this.const;
  }

  _constSingleBuilder({ namespace, config = {}, isUpperCase = true }) {
    if (!this.const[namespace]) {
      this.const[namespace] = {};
    }

    let { name, value } = config;
    Object.defineProperty(
      this.const[namespace],
      isUpperCase ? name.toUpperCase() : name,
      {
        value,
      }
    );
  }
}

const modules = getModules(
  import.meta.globEager("../service/const/**/*.js"),
  true
);

export default new MakeConst({
  config: modules,
});

