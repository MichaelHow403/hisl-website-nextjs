(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/edge-wrapper_d187b01e.js",
"[project]/edge-wrapper.js { MODULE => \"[project]/node_modules/next/dist/esm/build/templates/edge-app-route.js { INNER_ROUTE_ENTRY => \\\"[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \\\\\\\"[project]/src/app/api/integai/route.ts [app-edge-route] (ecmascript)\\\\\\\" } [app-edge-route] (ecmascript)\\\" } [app-edge-route] (ecmascript)\" } [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i('[project]/node_modules/next/dist/esm/build/templates/edge-app-route.js { INNER_ROUTE_ENTRY => "[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \\"[project]/src/app/api/integai/route.ts [app-edge-route] (ecmascript)\\" } [app-edge-route] (ecmascript)" } [app-edge-route] (ecmascript)'));
modProm.catch(()=>{});
self._ENTRIES["middleware_app/api/integai/route"] = new Proxy(modProm, {
    get (modProm, name) {
        if (name === "then") {
            return (res, rej)=>modProm.then(res, rej);
        }
        let result = (...args)=>modProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>modProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}),
]);

//# sourceMappingURL=edge-wrapper_d187b01e.js.map