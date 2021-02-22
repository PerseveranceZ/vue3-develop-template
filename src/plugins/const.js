import { assert, getModules } from '/src/utils/tools'
import { pick, assign, isEmpty } from "lodash-es";
import { CONST_DEFAULT_CONFIG } from "/src/config/index";

class MakeConst {
    constructor(options) {
        this.const = {}
        this.constBuilder(options)
    }


    constBuilder({
    	sep = '/',
    	config = []
    }) {
    	Object.keys(config).map(namespace => {
    		this._constSingleBuilder({namespace, sep, config: config[namespace]})
    	})
    }

    _constSingleBuilder({
    	namespace, 
    	sep = '/',
    	config = {}
    }) {
        config.forEach( cst => {
            let {name, value} = cst
            let constName = `${namespace.toUpperCase()}${sep}${name}`
            Object.defineProperty(this.const, constName, { value })            
        })
        
    }
}

const modules = getModules(import.meta.globEager("../service/const/**/*.js"));

export default new MakeConst({
  config: [ modules ],
  ...CONST_DEFAULT_CONFIG,
});

