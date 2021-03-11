import axios from './axios'
import { assert, getModules, firstUpperCase } from "/src/utils/tools";
import { pick, assign, isEmpty } from 'lodash-es'

class MakeApi {
    constructor(options) {
        this.api = {}
        let { sep, config, debug} = options;
        config.forEach((e) => {
            this._apiSingleBuilder({
                namespace: e.__fileName__,
                sep,
                debug,
                config: e,
            });
        });
        return this.api
    }

    _apiSingleBuilder({
    	namespace, 
    	sep = '',
    	config = {},
    	debug = false,
    }) {
        const {name, desc, params, method, mockEnable, path, mockPath } = config

        if (debug) {
            assert(
                name,
                `${path} :接口name属性不能为空`
            )
            assert(
                path.indexOf("/") === 0,
                `${path} :接口路径path，首字符应为/`
            )
        }
        // 默认 sep 没有就驼峰
        const apiName = sep ? 
        `${namespace}${sep}${name}` :
        namespace + firstUpperCase(name)
        
        Object.defineProperty(this.api, apiName, {
          value(outerParams, outerOptions) {
            const _data = isEmpty(outerParams)
              ? params
              : pick(assign({}, params, outerParams), Object.keys(params));
            const _options = {
              url: path,
              desc,
              method,
            };
            return axios(_normoalize(assign(_options, outerOptions), _data));
          },
        });      
    }       
}

function _normoalize(options, data) {
    if (options.method === 'POST') {
        options.data = data
    } else if (options.method === 'GET') {
        options.params = data
    }
    return options
} 


const modules = getModules(
    import.meta.globEager("../service/api/**/*.js"),
    true
)

export default new MakeApi({
  config: modules
});
