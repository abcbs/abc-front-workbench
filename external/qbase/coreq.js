var object_create = Object.create || function (prototype) {
        function Type() { }
        Type.prototype = prototype;
        return new Type();
    };

function Q(value) {
    if (value instanceof Promise) {
        return value;
    }
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
         "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {

    };

    promise.inspect = inspect;

    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }
        promise.valueOf = function () {
            return inspected.value;
        };
    }

    return promise;
}