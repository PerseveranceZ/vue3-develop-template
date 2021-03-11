import { assert, getModules } from '/src/utils/tools'
import { pick, assign, isEmpty } from "lodash-es";

class MakeConst {
    constructor(options) {
        this.const = {}
        let { sep, config } = options;

        config.forEach((e) => {
          this._constSingleBuilder({
            namespace: e.__fileName__,
            sep,
            config: e,
          });
        });
        return this.const
    }

    _constSingleBuilder({
    	namespace, 
    	sep = '_',
    	config = {}
    }) {
        let { name, value } = config;
        // 变量强制全部大写
        let constName = `${namespace.toUpperCase()}${sep}${name.toUpperCase()}`;
        Object.defineProperty(this.const, constName, { value })            
        
    }
}

const modules = getModules(
  import.meta.globEager("../service/const/**/*.js"),
  true
);

export default new MakeConst({
  config: modules,
});

