const strategies = {
    required: function(val, errMsg ) {
        if (val === '') {
            return errMsg;
        }
    },
    isLongThan: function(val, len, errMsg) {
        if (val == len) {
            return errMsg
        }
    },
    isRepeat :function(val,  len, errMsg){
        let isRepeat = val.some((item) => {
                if (item === len) {
                    return true;
                }
        });
        if(isRepeat){
            return errMsg
        }
    },
    isMobile: function(val, errMsg) {
        // let isMobile = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[0-9])[0-9]{8}$/g;
        let isMobile = /(^1[3|4|5|7|8][0-9]{9}$)/;
        if(!isMobile.test(val)){
            return errMsg;
        }
    },
    isLineNumber: function(val, errMsg) {
        let isMobile = /^\s*\d+-?\d+\s*$/;
        if(!isMobile.test(val)){
            return errMsg;
        }
    },
    limitTitle: function(val, errMsg) {//富文本编辑器验证title
        if(val.length < 5 || val.length > 30){
            return errMsg
        }
    },
    limitContent: function(val, errMsg) {//富文本编辑器验证content
        if(val.replace(/<h2[^>]*>.*<\/h2>/i, '').replace(/<\/?[^>]*>/g, '').length < 10){
            return errMsg
        }
    },
    isNumber: function(val, errMsg) {
        if(!Math.trunc(val) && Math.trunc(val)!==0){
            return errMsg
        }
    }
};

/**
 * simple-validator 接受验证的数组
    [{
        value: this.modalData.datas.keywordInput,
        rules: [{
            rule: 'required',
            msg: '关键词不能为空'
        }]
    }]
 */
let validate = function(arr) {
    let obj = {
        status: true
    };
    for (let i = 0, l1 = arr.length; i < l1; i++) {
        let item = arr[i];
        let stop = false;
        for (let k = 0, l2 = item.rules.length; k < l2; k++) {

            let r = item.rules[k];
            let arg = r.rule.split(':');
            let rule = arg.shift();
            if (r.type) {
                arg.unshift(r.type);
            }
            arg.unshift(item.value);
            arg.push(r.msg);
            //debugger
            let status = strategies[rule].apply(null, arg);
            if (status) {
                obj = {
                    value: item.value,
                    status: false,
                    msg: status
                };
                stop = true;
                break;
            }
        }
        if (stop) break;
    }
    return obj;
};

export default validate;
