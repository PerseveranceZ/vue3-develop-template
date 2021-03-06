// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}

export function assert(condition, msg) {
    if (!condition) throw new Error(`[Apior] ${msg}`)
}

export function getModules(origin, withFileName = false) { 
    
    let modules = []
    for (const path in origin) {
        let ms = origin[path].default;
        if (withFileName) {
          let fileName = path.replace(/(.*\/)*([^.]+).*/gi, "$2");
          ms.map((e) => (e.__fileName__ = fileName));
        }
      modules = modules.concat(ms);
    }
    return modules
}

export function firstUpperCase(str) {
    return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}