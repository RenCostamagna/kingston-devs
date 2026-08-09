import { fileURLToPath as __eveFileURLToPath } from "node:url";
import { dirname as __eveDirname } from "node:path";
import { createRequire as __eveCreateRequire } from "node:module";
const __filename = __eveFileURLToPath(import.meta.url);
__eveDirname(__filename);
__eveCreateRequire(import.meta.url);
import { defineAgent } from "eve";
import { eveChannel } from "eve/channels/eve";
import { none } from "eve/channels/auth";
import { defineTool } from "eve/tools";
import { always } from "eve/tools/approval";
import * as crypto$1 from "crypto";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { EventEmitter } from "events";
import * as http_ from "http";
import * as https_ from "https";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res, err) => () => {
	if (err) throw err[0];
	try {
		return fn && (res = fn(fn = 0)), res;
	} catch (e) {
		throw err = [e], e;
	}
};
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var agent_exports = __exportAll({ default: () => agent_default });
var agent_default = defineAgent({ model: "anthropic/claude-sonnet-5" });
var eve_exports = __exportAll({ default: () => eve_default });
var eve_default = eveChannel({ auth: [none()] });
var _a$1;
function $constructor(name, initializer, params) {
	function init(inst, def) {
		if (!inst._zod) Object.defineProperty(inst, "_zod", {
			value: {
				def,
				constr: _,
				traits: new Set()
			},
			enumerable: false
		});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
const globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached$1(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
	} };
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
const EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
	let value = void 0;
	Object.defineProperty(object, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject$1(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached$1(() => {
	if (globalConfig.jitless) return false;
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject$1(o) {
	if (isObject$1(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject$1(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject$1(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	if (o instanceof Map) return new Map(o);
	if (o instanceof Set) return new Set(o);
	return o;
}
const propertyKeyTypes = new Set([
	"string",
	"number",
	"symbol"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, -Number.MAX_VALUE, Number.MAX_VALUE;
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = {};
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				newShape[key] = currDef.shape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = { ...schema._zod.def.shape };
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				delete newShape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject$1(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = schema._zod.def.shape;
		for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function safeExtend(schema, shape) {
	if (!isPlainObject$1(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function merge(a, b) {
	if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return clone(a, mergeDefs(a._zod.def, {
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: b._zod.def.checks ?? []
	}));
}
function partial(Class, schema, mask) {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const oldShape = schema._zod.def.shape;
			const shape = { ...oldShape };
			if (mask) for (const key in mask) {
				if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				shape[key] = Class ? new Class({
					type: "optional",
					innerType: oldShape[key]
				}) : oldShape[key];
			}
			else for (const key in oldShape) shape[key] = Class ? new Class({
				type: "optional",
				innerType: oldShape[key]
			}) : oldShape[key];
			assignProp(this, "shape", shape);
			return shape;
		},
		checks: []
	}));
}
function required(Class, schema, mask) {
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const oldShape = schema._zod.def.shape;
		const shape = { ...oldShape };
		if (mask) for (const key in mask) {
			if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
			if (!mask[key]) continue;
			shape[key] = new Class({
				type: "nonoptional",
				innerType: oldShape[key]
			});
		}
		else for (const key in oldShape) shape[key] = new Class({
			type: "nonoptional",
			innerType: oldShape[key]
		});
		assignProp(this, "shape", shape);
		return shape;
	} }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function explicitlyAborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
	rest.path ?? (rest.path = []);
	rest.message = message;
	if (ctx?.reportInput) rest.input = _input;
	return rest;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
const initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error, path = []) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else {
			const fullpath = [...path, ...issue.path];
			if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < fullpath.length) {
					const el = fullpath[i];
					if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
					else {
						curr[el] = curr[el] || { _errors: [] };
						curr[el]._errors.push(mapper(issue));
					}
					curr = curr[el];
					i++;
				}
			}
		}
	};
	processError(error);
	return fieldErrors;
}
const _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
const _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? {
		success: false,
		error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParse$1 = _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? {
		success: false,
		error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParseAsync$1 = _safeParseAsync($ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _parse(_Err)(schema, value, ctx);
};
const _decode = (_Err) => (schema, value, _ctx) => {
	return _parse(_Err)(schema, value, _ctx);
};
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
const _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
const _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
const cuid = /^[cC][0-9a-z]{6,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const uuid = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
const httpProtocol = /^https?$/;
const e164 = /^\+[1-9]\d{6,14}$/;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$1 = new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const timeRegex = `${time}(?:${opts.join("|")})`;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return new RegExp(`^${regex}$`);
};
const boolean$1 = /^(?:true|false)$/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
const $ZodCheck = $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
const $ZodCheckMaxLength = $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMinLength = $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLengthEquals = $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.minimum = def.length;
		bag.maximum = def.length;
		bag.length = def.length;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStringFormat = $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = new Set());
			bag.patterns.add(def.pattern);
		}
	});
	if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
const $ZodCheckRegex = $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLowerCase = $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStartsWith = $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckEndsWith = $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckOverwrite = $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
var Doc = class {
	constructor(args = []) {
		this.content = [];
		this.indent = 0;
		if (this) this.args = args;
	}
	indented(fn) {
		this.indent += 1;
		fn(this);
		this.indent -= 1;
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
const version$1 = {
	major: 4,
	minor: 4,
	patch: 3
};
const $ZodType = $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version$1;
	const checks = [...inst._zod.def.checks ?? []];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.def.when) {
					if (explicitlyAborted(payload)) continue;
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse({
					value: payload.value,
					issues: []
				}, {
					...ctx,
					skipChecks: true
				});
				if (canary instanceof Promise) return canary.then((canary) => {
					return handleCanaryResult(canary, payload, ctx);
				});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	defineLazy(inst, "~standard", () => ({
		validate: (value) => {
			try {
				const r = safeParse$1(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
});
const $ZodString = $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
const $ZodStringFormat = $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
const $ZodGUID = $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
const $ZodUUID = $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
const $ZodEmail = $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
const $ZodURL = $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			if (!def.normalize && def.protocol?.source === httpProtocol.source) {
				if (!/^https?:\/\//i.test(trimmed)) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: payload.value,
						inst,
						continue: !def.abort
					});
					return;
				}
			}
			const url = new URL(trimmed);
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: def.hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.normalize) payload.value = url.href;
			else payload.value = trimmed;
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodEmoji = $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
const $ZodNanoID = $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID = $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
const $ZodULID = $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
const $ZodXID = $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
const $ZodKSUID = $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODate = $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodISOTime = $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODuration = $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv4`;
});
const $ZodIPv6 = $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv6`;
	inst._zod.check = (payload) => {
		try {
			new URL(`http://[${payload.value}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodCIDRv4 = $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const parts = payload.value.split("/");
		try {
			if (parts.length !== 2) throw new Error();
			const [address, prefix] = parts;
			if (!prefix) throw new Error();
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) throw new Error();
			if (prefixNum < 0 || prefixNum > 128) throw new Error();
			new URL(`http://[${address}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (/\s/.test(data)) return false;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
const $ZodBase64 = $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64";
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
const $ZodBase64URL = $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64url";
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodE164 = $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
const $ZodJWT = $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodBoolean = $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Boolean(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodUnknown = $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
const $ZodNever = $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
const $ZodArray = $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = Array(input.length);
		const proms = [];
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
	const isPresent = key in input;
	if (result.issues.length) {
		if (isOptionalIn && isOptionalOut && !isPresent) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (!isPresent && !isOptionalIn) {
		if (!result.issues.length) final.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [key]
		});
		return;
	}
	if (result.value === void 0) {
		if (isPresent) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		keys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const isOptionalIn = _catchall.optin === "optional";
	const isOptionalOut = _catchall.optout === "optional";
	for (const key in input) {
		if (key === "__proto__") continue;
		if (keySet.has(key)) continue;
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
		else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
const $ZodObject = $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
		const sh = def.shape;
		Object.defineProperty(def, "shape", { get: () => {
			const newSh = { ...sh };
			Object.defineProperty(def, "shape", { value: newSh });
			return newSh;
		} });
	}
	const _normalized = cached$1(() => normalizeDef(def));
	defineLazy(inst._zod, "propValues", () => {
		const shape = def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				propValues[key] ?? (propValues[key] = new Set());
				for (const v of field.values) propValues[key].add(v);
			}
		}
		return propValues;
	});
	const isObject = isObject$1;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = {};
		const proms = [];
		const shape = value.shape;
		for (const key of value.keys) {
			const el = shape[key];
			const isOptionalIn = el._zod.optin === "optional";
			const isOptionalOut = el._zod.optout === "optional";
			const r = el._zod.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
			else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
	};
});
const $ZodObjectJIT = $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached$1(() => normalizeDef(def));
	const generateFastpass = (shape) => {
		const doc = new Doc([
			"shape",
			"payload",
			"ctx"
		]);
		const normalized = _normalized.value;
		const parseStr = (key) => {
			const k = esc(key);
			return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		};
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.keys) ids[key] = `key_${counter++}`;
		doc.write(`const newResult = {};`);
		for (const key of normalized.keys) {
			const id = ids[key];
			const k = esc(key);
			const schema = shape[key];
			const isOptionalIn = schema?._zod?.optin === "optional";
			const isOptionalOut = schema?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(key)};`);
			if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
			else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject = isObject$1;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
const $ZodUnion = $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
const $ZodIntersection = $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
			return handleIntersectionResults(payload, left, right);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject$1(a) && isPlainObject$1(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = new Map();
	let unrecIssue;
	for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
		unrecIssue ?? (unrecIssue = iss);
		for (const k of iss.keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k).l = true;
		}
	} else result.issues.push(iss);
	for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
		if (!unrecKeys.has(k)) unrecKeys.set(k, {});
		unrecKeys.get(k).r = true;
	}
	else result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length && unrecIssue) result.issues.push({
		...unrecIssue,
		keys: bothKeys
	});
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
const $ZodEnum = $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodTransform = $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			payload.fallback = true;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		payload.fallback = true;
		return payload;
	};
});
function handleOptionalResult(result, input) {
	if (input === void 0 && (result.issues.length || result.fallback)) return {
		issues: [],
		value: void 0
	};
	return result;
}
const $ZodOptional = $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (def.innerType._zod.optin === "optional") {
			const input = payload.value;
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
			return handleOptionalResult(result, input);
		}
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodExactOptional = $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNullable = $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodDefault = $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
const $ZodPrefault = $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNonOptional = $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
const $ZodCatch = $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => {
			payload.value = result.value;
			if (result.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
					input: payload.value
				});
				payload.issues = [];
				payload.fallback = true;
			}
			return payload;
		});
		payload.value = result.value;
		if (result.issues.length) {
			payload.value = def.catchValue({
				...payload,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			payload.issues = [];
			payload.fallback = true;
		}
		return payload;
	};
});
const $ZodPipe = $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues,
		fallback: left.fallback
	}, ctx);
}
const $ZodReadonly = $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
	defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
const $ZodCustom = $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
var _a;
var $ZodRegistry = class {
	constructor() {
		this._map = new WeakMap();
		this._idmap = new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
		return this;
	}
	clear() {
		this._map = new WeakMap();
		this._idmap = new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema)
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
const globalRegistry = globalThis.__zod_globalRegistry;
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params)
	});
}
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
function _normalize(form) {
	return _overwrite((input) => input.normalize(form));
}
function _trim() {
	return _overwrite((input) => input.trim());
}
function _toLowerCase() {
	return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
	return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
	return _overwrite((input) => slugify(input));
}
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
function _superRefine(fn, params) {
	const ch = _check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	}, params);
	return ch;
}
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: new Map(),
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		external: params?.external ?? void 0
	};
}
function process$1(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			process$1(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) Object.assign(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const idToSchema = new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
			};
		}
		if (entry[1] === root) return { ref: "#" };
		const defUriPrefix = `#/${defsSegment}/`;
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + defId
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") {
				extractToDef(entry);
				continue;
			}
		}
	}
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else Object.assign(schema, refSchema);
			Object.assign(schema, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? []
		});
	};
	for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	Object.assign(result, root.def ?? root.schema);
	const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
	if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
	const defs = ctx.external?.defs ?? {};
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) {
			if (seen.def.id === seen.defId) delete seen.def.id;
			defs[seen.defId] = seen.def;
		}
	}
	if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
	else result.definitions = defs;
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") {
		if (_schema._zod.traits.has("$ZodCodec")) return true;
		return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	}
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
const formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
const stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time") delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const regexes = [...patterns];
		if (regexes.length === 1) json.pattern = regexes[0].source;
		else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: regex.source
		}))];
	}
};
const booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
const neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
const enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
const customProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
const transformProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
const arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = process$1(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
const objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	json.properties = {};
	const shape = def.shape;
	for (const key in shape) json.properties[key] = process$1(shape[key], ctx, {
		...params,
		path: [
			...params.path,
			"properties",
			key
		]
	});
	const allKeys = new Set(Object.keys(shape));
	const requiredKeys = new Set([...allKeys].filter((key) => {
		const v = def.shape[key]._zod;
		if (ctx.io === "input") return v.optin === void 0;
		else return v.optout === void 0;
	}));
	if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall) json.additionalProperties = process$1(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
const unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => process$1(x, ctx, {
		...params,
		path: [
			...params.path,
			isExclusive ? "oneOf" : "anyOf",
			i
		]
	}));
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
const intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = process$1(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = process$1(def.right, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			1
		]
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
};
const nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
const prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
const catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		throw new Error("Dynamic catch values are not supported in JSON Schema");
	}
	json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const inIsTransform = def.in._zod.traits.has("$ZodTransform");
	const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
	process$1(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
const optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const ZodISODateTime = $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date(params) {
	return _isoDate(ZodISODate, params);
}
const ZodISOTime = $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return _isoTime(ZodISOTime, params);
}
const ZodISODuration = $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return _isoDuration(ZodISODuration, params);
}
const initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: { value: (issue) => {
			inst.issues.push(issue);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		addIssues: { value: (issues) => {
			inst.issues.push(...issues);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		isEmpty: { get() {
			return inst.issues.length === 0;
		} }
	});
};
const ZodRealError = $constructor("ZodError", initializer, { Parent: Error });
const parse = _parse(ZodRealError);
const parseAsync = _parseAsync(ZodRealError);
const safeParse = _safeParse(ZodRealError);
const safeParseAsync = _safeParseAsync(ZodRealError);
const encode = _encode(ZodRealError);
const decode = _decode(ZodRealError);
const encodeAsync = _encodeAsync(ZodRealError);
const decodeAsync = _decodeAsync(ZodRealError);
const safeEncode = _safeEncode(ZodRealError);
const safeDecode = _safeDecode(ZodRealError);
const safeEncodeAsync = _safeEncodeAsync(ZodRealError);
const safeDecodeAsync = _safeDecodeAsync(ZodRealError);
const _installedGroups = new WeakMap();
function _installLazyMethods(inst, group, methods) {
	const proto = Object.getPrototypeOf(inst);
	let installed = _installedGroups.get(proto);
	if (!installed) {
		installed = new Set();
		_installedGroups.set(proto, installed);
	}
	if (installed.has(group)) return;
	installed.add(group);
	for (const key in methods) {
		const fn = methods[key];
		Object.defineProperty(proto, key, {
			configurable: true,
			enumerable: false,
			get() {
				const bound = fn.bind(this);
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: bound
				});
				return bound;
			},
			set(v) {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: v
				});
			}
		});
	}
}
const ZodType = $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	Object.assign(inst["~standard"], { jsonSchema: {
		input: createStandardJSONSchemaMethod(inst, "input"),
		output: createStandardJSONSchemaMethod(inst, "output")
	} });
	inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
	inst.def = def;
	inst.type = def.type;
	Object.defineProperty(inst, "_def", { value: def });
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.encode = (data, params) => encode(inst, data, params);
	inst.decode = (data, params) => decode(inst, data, params);
	inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
	inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
	inst.safeEncode = (data, params) => safeEncode(inst, data, params);
	inst.safeDecode = (data, params) => safeDecode(inst, data, params);
	inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
	inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
	_installLazyMethods(inst, "ZodType", {
		check(...chks) {
			const def = this.def;
			return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)] }), { parent: true });
		},
		with(...chks) {
			return this.check(...chks);
		},
		clone(def, params) {
			return clone(this, def, params);
		},
		brand() {
			return this;
		},
		register(reg, meta) {
			reg.add(this, meta);
			return this;
		},
		refine(check, params) {
			return this.check(refine(check, params));
		},
		superRefine(refinement, params) {
			return this.check(superRefine(refinement, params));
		},
		overwrite(fn) {
			return this.check(_overwrite(fn));
		},
		optional() {
			return optional(this);
		},
		exactOptional() {
			return exactOptional(this);
		},
		nullable() {
			return nullable(this);
		},
		nullish() {
			return optional(nullable(this));
		},
		nonoptional(params) {
			return nonoptional(this, params);
		},
		array() {
			return array(this);
		},
		or(arg) {
			return union([this, arg]);
		},
		and(arg) {
			return intersection(this, arg);
		},
		transform(tx) {
			return pipe(this, transform(tx));
		},
		default(d) {
			return _default(this, d);
		},
		prefault(d) {
			return prefault(this, d);
		},
		catch(params) {
			return _catch(this, params);
		},
		pipe(target) {
			return pipe(this, target);
		},
		readonly() {
			return readonly(this);
		},
		describe(description) {
			const cl = this.clone();
			globalRegistry.add(cl, { description });
			return cl;
		},
		meta(...args) {
			if (args.length === 0) return globalRegistry.get(this);
			const cl = this.clone();
			globalRegistry.add(cl, args[0]);
			return cl;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(fn) {
			return fn(this);
		}
	});
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true
	});
	return inst;
});
const _ZodString = $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	_installLazyMethods(inst, "_ZodString", {
		regex(...args) {
			return this.check(_regex(...args));
		},
		includes(...args) {
			return this.check(_includes(...args));
		},
		startsWith(...args) {
			return this.check(_startsWith(...args));
		},
		endsWith(...args) {
			return this.check(_endsWith(...args));
		},
		min(...args) {
			return this.check(_minLength(...args));
		},
		max(...args) {
			return this.check(_maxLength(...args));
		},
		length(...args) {
			return this.check(_length(...args));
		},
		nonempty(...args) {
			return this.check(_minLength(1, ...args));
		},
		lowercase(params) {
			return this.check(_lowercase(params));
		},
		uppercase(params) {
			return this.check(_uppercase(params));
		},
		trim() {
			return this.check(_trim());
		},
		normalize(...args) {
			return this.check(_normalize(...args));
		},
		toLowerCase() {
			return this.check(_toLowerCase());
		},
		toUpperCase() {
			return this.check(_toUpperCase());
		},
		slugify() {
			return this.check(_slugify());
		}
	});
});
const ZodString = $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(_email(ZodEmail, params));
	inst.url = (params) => inst.check(_url(ZodURL, params));
	inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(_emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(_xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(_e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return _string(ZodString, params);
}
const ZodStringFormat = $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
const ZodEmail = $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodGUID = $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodUUID = $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodURL = $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodEmoji = $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodNanoID = $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCUID = $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCUID2 = $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodULID = $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodXID = $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodKSUID = $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv4 = $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv6 = $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv4 = $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv6 = $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64 = $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64URL = $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodE164 = $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodJWT = $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBoolean = $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return _boolean(ZodBoolean, params);
}
const ZodUnknown = $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function unknown() {
	return _unknown(ZodUnknown);
}
const ZodNever = $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return _never(ZodNever, params);
}
const ZodArray = $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
	_installLazyMethods(inst, "ZodArray", {
		min(n, params) {
			return this.check(_minLength(n, params));
		},
		nonempty(params) {
			return this.check(_minLength(1, params));
		},
		max(n, params) {
			return this.check(_maxLength(n, params));
		},
		length(n, params) {
			return this.check(_length(n, params));
		},
		unwrap() {
			return this.element;
		}
	});
});
function array(element, params) {
	return _array(ZodArray, element, params);
}
const ZodObject = $constructor("ZodObject", (inst, def) => {
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	defineLazy(inst, "shape", () => {
		return def.shape;
	});
	_installLazyMethods(inst, "ZodObject", {
		keyof() {
			return _enum(Object.keys(this._zod.def.shape));
		},
		catchall(catchall) {
			return this.clone({
				...this._zod.def,
				catchall
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: never()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(incoming) {
			return extend(this, incoming);
		},
		safeExtend(incoming) {
			return safeExtend(this, incoming);
		},
		merge(other) {
			return merge(this, other);
		},
		pick(mask) {
			return pick(this, mask);
		},
		omit(mask) {
			return omit(this, mask);
		},
		partial(...args) {
			return partial(ZodOptional, this, args[0]);
		},
		required(...args) {
			return required(ZodNonOptional, this, args[0]);
		}
	});
});
function object(shape, params) {
	const def = {
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	};
	return new ZodObject(def);
}
const ZodUnion = $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
const ZodIntersection = $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
const ZodEnum = $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new ZodEnum({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
const ZodTransform = $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			payload.fallback = true;
			return payload;
		});
		payload.value = output;
		payload.fallback = true;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
const ZodOptional = $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
const ZodExactOptional = $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
const ZodNullable = $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
const ZodDefault = $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodPrefault = $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodNonOptional = $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
const ZodCatch = $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
const ZodPipe = $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
const ZodReadonly = $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
const ZodCustom = $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function refine(fn, _params = {}) {
	return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return _superRefine(fn, params);
}
var tslib_es6_exports = __exportAll({
	__addDisposableResource: () => __addDisposableResource,
	__assign: () => __assign,
	__asyncDelegator: () => __asyncDelegator,
	__asyncGenerator: () => __asyncGenerator,
	__asyncValues: () => __asyncValues,
	__await: () => __await,
	__awaiter: () => __awaiter$1,
	__classPrivateFieldGet: () => __classPrivateFieldGet,
	__classPrivateFieldIn: () => __classPrivateFieldIn,
	__classPrivateFieldSet: () => __classPrivateFieldSet,
	__createBinding: () => __createBinding,
	__decorate: () => __decorate,
	__disposeResources: () => __disposeResources,
	__esDecorate: () => __esDecorate,
	__exportStar: () => __exportStar,
	__extends: () => __extends,
	__generator: () => __generator,
	__importDefault: () => __importDefault,
	__importStar: () => __importStar,
	__makeTemplateObject: () => __makeTemplateObject,
	__metadata: () => __metadata,
	__param: () => __param,
	__propKey: () => __propKey,
	__read: () => __read,
	__rest: () => __rest,
	__rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
	__runInitializers: () => __runInitializers,
	__setFunctionName: () => __setFunctionName,
	__spread: () => __spread,
	__spreadArray: () => __spreadArray,
	__spreadArrays: () => __spreadArrays,
	__values: () => __values,
	default: () => tslib_es6_default
});
function __extends(d, b) {
	if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	extendStatics(d, b);
	function __() {
		this.constructor = d;
	}
	d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
	return function(target, key) {
		decorator(target, key, paramIndex);
	};
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
}
function __runInitializers(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
}
function __propKey(x) {
	return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
	if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
	return Object.defineProperty(f, "name", {
		configurable: true,
		value: prefix ? "".concat(prefix, " ", name) : name
	});
}
function __metadata(metadataKey, metadataValue) {
	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter$1(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}
function __generator(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
	return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
}
function __exportStar(m, o) {
	for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
}
function __spread() {
	for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
	return ar;
}
function __spreadArrays() {
	for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
	return r;
}
function __spreadArray(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
	return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var g = generator.apply(thisArg, _arguments || []), i, q = [];
	return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function awaitReturn(f) {
		return function(v) {
			return Promise.resolve(v).then(f, reject);
		};
	}
	function verb(n, f) {
		if (g[n]) {
			i[n] = function(v) {
				return new Promise(function(a, b) {
					q.push([
						n,
						v,
						a,
						b
					]) > 1 || resume(n, v);
				});
			};
			if (f) i[n] = f(i[n]);
		}
	}
	function resume(n, v) {
		try {
			step(g[n](v));
		} catch (e) {
			settle(q[0][3], e);
		}
	}
	function step(r) {
		r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
	}
	function fulfill(value) {
		resume("next", value);
	}
	function reject(value) {
		resume("throw", value);
	}
	function settle(f, v) {
		if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
	}
}
function __asyncDelegator(o) {
	var i, p;
	return i = {}, verb("next"), verb("throw", function(e) {
		throw e;
	}), verb("return"), i[Symbol.iterator] = function() {
		return this;
	}, i;
	function verb(n, f) {
		i[n] = o[n] ? function(v) {
			return (p = !p) ? {
				value: __await(o[n](v)),
				done: false
			} : f ? f(v) : v;
		} : f;
	}
}
function __asyncValues(o) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var m = o[Symbol.asyncIterator], i;
	return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
		return this;
	}, i);
	function verb(n) {
		i[n] = o[n] && function(v) {
			return new Promise(function(resolve, reject) {
				v = o[n](v), settle(resolve, reject, v.done, v.value);
			});
		};
	}
	function settle(resolve, reject, d, v) {
		Promise.resolve(v).then(function(v) {
			resolve({
				value: v,
				done: d
			});
		}, reject);
	}
}
function __makeTemplateObject(cooked, raw) {
	if (Object.defineProperty) Object.defineProperty(cooked, "raw", { value: raw });
	else cooked.raw = raw;
	return cooked;
}
function __importStar(mod) {
	if (mod && mod.__esModule) return mod;
	var result = {};
	if (mod != null) {
		for (var k = ownKeys$3(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
	}
	__setModuleDefault(result, mod);
	return result;
}
function __importDefault(mod) {
	return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
	if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
	return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
}
function __disposeResources(env) {
	function fail(e) {
		env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
		env.hasError = true;
	}
	var r, s = 0;
	function next() {
		while (r = env.stack.pop()) try {
			if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
			if (r.dispose) {
				var result = r.dispose.call(r.value);
				if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
					fail(e);
					return next();
				});
			} else s |= 1;
		} catch (e) {
			fail(e);
		}
		if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
		if (env.hasError) throw env.error;
	}
	return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
	if (typeof path === "string" && /^\.\.?\//.test(path)) return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
		return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
	});
	return path;
}
var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys$3, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esmMin((() => {
	extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	__assign = function() {
		__assign = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	__createBinding = Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	});
	__setModuleDefault = Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	};
	ownKeys$3 = function(o) {
		ownKeys$3 = Object.getOwnPropertyNames || function(o) {
			var ar = [];
			for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
			return ar;
		};
		return ownKeys$3(o);
	};
	_SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
		var e = new Error(message);
		return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
	};
	tslib_es6_default = {
		__extends,
		__assign,
		__rest,
		__decorate,
		__param,
		__esDecorate,
		__runInitializers,
		__propKey,
		__setFunctionName,
		__metadata,
		__awaiter: __awaiter$1,
		__generator,
		__createBinding,
		__exportStar,
		__values,
		__read,
		__spread,
		__spreadArrays,
		__spreadArray,
		__await,
		__asyncGenerator,
		__asyncDelegator,
		__asyncValues,
		__makeTemplateObject,
		__importStar,
		__importDefault,
		__classPrivateFieldGet,
		__classPrivateFieldSet,
		__classPrivateFieldIn,
		__addDisposableResource,
		__disposeResources,
		__rewriteRelativeImportExtension
	};
}));
var require_helper = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveFetch = void 0;
	const resolveFetch = (customFetch) => {
		if (customFetch) return (...args) => customFetch(...args);
		return (...args) => fetch(...args);
	};
	exports.resolveFetch = resolveFetch;
}));
var require_types$1 = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FunctionRegion = exports.FunctionsHttpError = exports.FunctionsRelayError = exports.FunctionsFetchError = exports.FunctionsError = void 0;
	var FunctionsError = class extends Error {
		constructor(message, name = "FunctionsError", context) {
			super(message);
			this.name = name;
			this.context = context;
		}
		toJSON() {
			return {
				name: this.name,
				message: this.message,
				context: this.context
			};
		}
	};
	exports.FunctionsError = FunctionsError;
	var FunctionsFetchError = class extends FunctionsError {
		constructor(context) {
			super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
		}
	};
	exports.FunctionsFetchError = FunctionsFetchError;
	var FunctionsRelayError = class extends FunctionsError {
		constructor(context) {
			super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
		}
	};
	exports.FunctionsRelayError = FunctionsRelayError;
	var FunctionsHttpError = class extends FunctionsError {
		constructor(context) {
			super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
		}
	};
	exports.FunctionsHttpError = FunctionsHttpError;
	var FunctionRegion;
	(function(FunctionRegion) {
		FunctionRegion["Any"] = "any";
		FunctionRegion["ApNortheast1"] = "ap-northeast-1";
		FunctionRegion["ApNortheast2"] = "ap-northeast-2";
		FunctionRegion["ApSouth1"] = "ap-south-1";
		FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
		FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
		FunctionRegion["CaCentral1"] = "ca-central-1";
		FunctionRegion["EuCentral1"] = "eu-central-1";
		FunctionRegion["EuWest1"] = "eu-west-1";
		FunctionRegion["EuWest2"] = "eu-west-2";
		FunctionRegion["EuWest3"] = "eu-west-3";
		FunctionRegion["SaEast1"] = "sa-east-1";
		FunctionRegion["UsEast1"] = "us-east-1";
		FunctionRegion["UsWest1"] = "us-west-1";
		FunctionRegion["UsWest2"] = "us-west-2";
	})(FunctionRegion || (exports.FunctionRegion = FunctionRegion = {}));
}));
var require_FunctionsClient = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FunctionsClient = void 0;
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	const helper_1 = require_helper();
	const types_1 = require_types$1();
	var FunctionsClient = class {
		constructor(url, { headers = {}, customFetch, region = types_1.FunctionRegion.Any } = {}) {
			this.url = url;
			this.headers = headers;
			this.region = region;
			this.fetch = (0, helper_1.resolveFetch)(customFetch);
		}
		setAuth(token) {
			this.headers.Authorization = `Bearer ${token}`;
		}
		invoke(functionName_1) {
			return tslib_1.__awaiter(this, arguments, void 0, function* (functionName, options = {}) {
				var _a, _b;
				let timeoutId;
				let timeoutController;
				let onAbort;
				try {
					const { headers, method, body: functionArgs, signal, timeout } = options;
					let _headers = {};
					let { region } = options;
					if (!region) region = this.region;
					const url = new URL(`${this.url}/${functionName}`);
					if (region && region !== "any") {
						_headers["x-region"] = region;
						url.searchParams.set("forceFunctionRegion", region);
					}
					let body;
					const hasContentTypeHeader = !!headers && Object.keys(headers).some((key) => key.toLowerCase() === "content-type");
					if (functionArgs && !hasContentTypeHeader) if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
						_headers["Content-Type"] = "application/octet-stream";
						body = functionArgs;
					} else if (typeof functionArgs === "string") {
						_headers["Content-Type"] = "text/plain";
						body = functionArgs;
					} else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) body = functionArgs;
					else {
						_headers["Content-Type"] = "application/json";
						body = JSON.stringify(functionArgs);
					}
					else if (functionArgs && typeof functionArgs !== "string" && !(typeof Blob !== "undefined" && functionArgs instanceof Blob) && !(functionArgs instanceof ArrayBuffer) && !(typeof FormData !== "undefined" && functionArgs instanceof FormData)) body = JSON.stringify(functionArgs);
					else body = functionArgs;
					let effectiveSignal = signal;
					if (timeout) {
						timeoutController = new AbortController();
						timeoutId = setTimeout(() => timeoutController.abort(), timeout);
						if (signal) {
							effectiveSignal = timeoutController.signal;
							onAbort = () => timeoutController.abort();
							signal.addEventListener("abort", onAbort);
						} else effectiveSignal = timeoutController.signal;
					}
					const response = yield this.fetch(url.toString(), {
						method: method || "POST",
						headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
						body,
						signal: effectiveSignal
					}).catch((fetchError) => {
						throw new types_1.FunctionsFetchError(fetchError);
					});
					const isRelayError = response.headers.get("x-relay-error");
					if (isRelayError && isRelayError === "true") throw new types_1.FunctionsRelayError(response);
					if (!response.ok) throw new types_1.FunctionsHttpError(response);
					let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim().toLowerCase();
					let data;
					if (responseType === "application/json") data = yield response.json();
					else if (responseType === "application/octet-stream" || responseType === "application/pdf") data = yield response.blob();
					else if (responseType === "text/event-stream") data = response;
					else if (responseType === "multipart/form-data") data = yield response.formData();
					else data = yield response.text();
					return {
						data,
						error: null,
						response
					};
				} catch (error) {
					return {
						data: null,
						error,
						response: error instanceof types_1.FunctionsHttpError || error instanceof types_1.FunctionsRelayError ? error.context : void 0
					};
				} finally {
					if (timeoutId) clearTimeout(timeoutId);
					if (onAbort) (_b = options.signal) === null || _b === void 0 || _b.removeEventListener("abort", onAbort);
				}
			});
		}
	};
	exports.FunctionsClient = FunctionsClient;
}));
var import_main = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FunctionRegion = exports.FunctionsRelayError = exports.FunctionsHttpError = exports.FunctionsFetchError = exports.FunctionsError = exports.FunctionsClient = void 0;
	var FunctionsClient_1 = require_FunctionsClient();
	Object.defineProperty(exports, "FunctionsClient", {
		enumerable: true,
		get: function() {
			return FunctionsClient_1.FunctionsClient;
		}
	});
	var types_1 = require_types$1();
	Object.defineProperty(exports, "FunctionsError", {
		enumerable: true,
		get: function() {
			return types_1.FunctionsError;
		}
	});
	Object.defineProperty(exports, "FunctionsFetchError", {
		enumerable: true,
		get: function() {
			return types_1.FunctionsFetchError;
		}
	});
	Object.defineProperty(exports, "FunctionsHttpError", {
		enumerable: true,
		get: function() {
			return types_1.FunctionsHttpError;
		}
	});
	Object.defineProperty(exports, "FunctionsRelayError", {
		enumerable: true,
		get: function() {
			return types_1.FunctionsRelayError;
		}
	});
	Object.defineProperty(exports, "FunctionRegion", {
		enumerable: true,
		get: function() {
			return types_1.FunctionRegion;
		}
	});
}))();
const DEFAULT_MAX_RETRIES = 3;
const getRetryDelay = (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4);
const RETRYABLE_STATUS_CODES = [520, 503];
const RETRYABLE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
var PostgrestError = class extends Error {
	constructor(context) {
		super(context.message);
		this.name = "PostgrestError";
		this.details = context.details;
		this.hint = context.hint;
		this.code = context.code;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			details: this.details,
			hint: this.hint,
			code: this.code
		};
	}
};
function sleep(ms, signal) {
	return new Promise((resolve) => {
		if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
			resolve();
			return;
		}
		const id = setTimeout(() => {
			signal === null || signal === void 0 || signal.removeEventListener("abort", onAbort);
			resolve();
		}, ms);
		function onAbort() {
			clearTimeout(id);
			resolve();
		}
		signal === null || signal === void 0 || signal.addEventListener("abort", onAbort);
	});
}
function shouldRetry(method, status, attemptCount, retryEnabled) {
	if (!retryEnabled || attemptCount >= DEFAULT_MAX_RETRIES) return false;
	if (!RETRYABLE_METHODS.includes(method)) return false;
	if (!RETRYABLE_STATUS_CODES.includes(status)) return false;
	return true;
}
var PostgrestBuilder = class {
	constructor(builder) {
		var _builder$shouldThrowO, _builder$isMaybeSingl, _builder$shouldStripN, _builder$urlLengthLim, _builder$retry;
		this.shouldThrowOnError = false;
		this.retryEnabled = true;
		this.method = builder.method;
		this.url = builder.url;
		this.headers = new Headers(builder.headers);
		this.schema = builder.schema;
		this.body = builder.body;
		this.shouldThrowOnError = (_builder$shouldThrowO = builder.shouldThrowOnError) !== null && _builder$shouldThrowO !== void 0 ? _builder$shouldThrowO : false;
		this.signal = builder.signal;
		this.isMaybeSingle = (_builder$isMaybeSingl = builder.isMaybeSingle) !== null && _builder$isMaybeSingl !== void 0 ? _builder$isMaybeSingl : false;
		this.shouldStripNulls = (_builder$shouldStripN = builder.shouldStripNulls) !== null && _builder$shouldStripN !== void 0 ? _builder$shouldStripN : false;
		this.urlLengthLimit = (_builder$urlLengthLim = builder.urlLengthLimit) !== null && _builder$urlLengthLim !== void 0 ? _builder$urlLengthLim : 8e3;
		this.retryEnabled = (_builder$retry = builder.retry) !== null && _builder$retry !== void 0 ? _builder$retry : true;
		if (builder.fetch) this.fetch = builder.fetch;
		else this.fetch = fetch;
	}
	throwOnError() {
		this.shouldThrowOnError = true;
		return this;
	}
	stripNulls() {
		if (this.headers.get("Accept") === "text/csv") throw new Error("stripNulls() cannot be used with csv()");
		this.shouldStripNulls = true;
		return this;
	}
	setHeader(name, value) {
		this.headers = new Headers(this.headers);
		this.headers.set(name, value);
		return this;
	}
	retry(enabled) {
		this.retryEnabled = enabled;
		return this;
	}
	then(onfulfilled, onrejected) {
		var _this = this;
		if (this.schema === void 0) {} else if (["GET", "HEAD"].includes(this.method)) this.headers.set("Accept-Profile", this.schema);
		else this.headers.set("Content-Profile", this.schema);
		if (this.method !== "GET" && this.method !== "HEAD") this.headers.set("Content-Type", "application/json");
		if (this.shouldStripNulls) {
			const currentAccept = this.headers.get("Accept");
			if (currentAccept === "application/vnd.pgrst.object+json") this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped");
			else if (!currentAccept || currentAccept === "application/json") this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
		}
		const _fetch = this.fetch;
		const executeWithRetry = async () => {
			let attemptCount = 0;
			while (true) {
				const headers = {};
				_this.headers.forEach((value, key) => {
					headers[key] = value;
				});
				if (attemptCount > 0) headers["X-Retry-Count"] = String(attemptCount);
				let res$1;
				try {
					res$1 = await _fetch(_this.url.toString(), {
						method: _this.method,
						headers,
						body: JSON.stringify(_this.body, (_, value) => typeof value === "bigint" ? value.toString() : value),
						signal: _this.signal
					});
				} catch (fetchError) {
					if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") throw fetchError;
					if (!RETRYABLE_METHODS.includes(_this.method)) throw fetchError;
					if (_this.retryEnabled && attemptCount < DEFAULT_MAX_RETRIES) {
						const delay = getRetryDelay(attemptCount);
						attemptCount++;
						await sleep(delay, _this.signal);
						continue;
					}
					throw fetchError;
				}
				if (shouldRetry(_this.method, res$1.status, attemptCount, _this.retryEnabled)) {
					var _res$headers$get, _res$headers;
					const retryAfterHeader = (_res$headers$get = (_res$headers = res$1.headers) === null || _res$headers === void 0 ? void 0 : _res$headers.get("Retry-After")) !== null && _res$headers$get !== void 0 ? _res$headers$get : null;
					const delay = retryAfterHeader !== null ? Math.max(0, parseInt(retryAfterHeader, 10) || 0) * 1e3 : getRetryDelay(attemptCount);
					await res$1.text();
					attemptCount++;
					await sleep(delay, _this.signal);
					continue;
				}
				return await _this.processResponse(res$1);
			}
		};
		let res = executeWithRetry();
		if (!this.shouldThrowOnError) res = res.catch((fetchError) => {
			var _fetchError$name2;
			let errorDetails = "";
			let hint = "";
			let code = "";
			const cause = fetchError === null || fetchError === void 0 ? void 0 : fetchError.cause;
			if (cause) {
				var _cause$message, _cause$code, _fetchError$name, _cause$name;
				const causeMessage = (_cause$message = cause === null || cause === void 0 ? void 0 : cause.message) !== null && _cause$message !== void 0 ? _cause$message : "";
				const causeCode = (_cause$code = cause === null || cause === void 0 ? void 0 : cause.code) !== null && _cause$code !== void 0 ? _cause$code : "";
				errorDetails = `${(_fetchError$name = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name !== void 0 ? _fetchError$name : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`;
				errorDetails += `\n\nCaused by: ${(_cause$name = cause === null || cause === void 0 ? void 0 : cause.name) !== null && _cause$name !== void 0 ? _cause$name : "Error"}: ${causeMessage}`;
				if (causeCode) errorDetails += ` (${causeCode})`;
				if (cause === null || cause === void 0 ? void 0 : cause.stack) errorDetails += `\n${cause.stack}`;
			} else {
				var _fetchError$stack;
				errorDetails = (_fetchError$stack = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _fetchError$stack !== void 0 ? _fetchError$stack : "";
			}
			const urlLength = this.url.toString().length;
			if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") {
				code = "";
				hint = "Request was aborted (timeout or manual cancellation)";
				if (urlLength > this.urlLengthLimit) hint += `. Note: Your request URL is ${urlLength} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`;
			} else if ((cause === null || cause === void 0 ? void 0 : cause.name) === "HeadersOverflowError" || (cause === null || cause === void 0 ? void 0 : cause.code) === "UND_ERR_HEADERS_OVERFLOW") {
				code = "";
				hint = "HTTP headers exceeded server limits (typically 16KB)";
				if (urlLength > this.urlLengthLimit) hint += `. Your request URL is ${urlLength} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`;
			}
			return {
				success: false,
				error: {
					message: `${(_fetchError$name2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name2 !== void 0 ? _fetchError$name2 : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
					details: errorDetails,
					hint,
					code
				},
				data: null,
				count: null,
				status: 0,
				statusText: ""
			};
		});
		return res.then(onfulfilled, onrejected);
	}
	async processResponse(res) {
		var _this2 = this;
		let error = null;
		let data = null;
		let count = null;
		let status = res.status;
		let statusText = res.statusText;
		if (res.ok) {
			var _this$headers$get2, _res$headers$get2;
			if (_this2.method !== "HEAD") {
				var _this$headers$get;
				const body = await res.text();
				if (body === "") {} else if (_this2.headers.get("Accept") === "text/csv") data = body;
				else if (_this2.headers.get("Accept") && ((_this$headers$get = _this2.headers.get("Accept")) === null || _this$headers$get === void 0 ? void 0 : _this$headers$get.includes("application/vnd.pgrst.plan+text"))) data = body;
				else try {
					data = JSON.parse(body);
				} catch (_unused) {
					error = { message: body };
					data = null;
					if (_this2.shouldThrowOnError) throw new PostgrestError({
						message: body,
						details: "",
						hint: "",
						code: ""
					});
				}
			}
			const countHeader = (_this$headers$get2 = _this2.headers.get("Prefer")) === null || _this$headers$get2 === void 0 ? void 0 : _this$headers$get2.match(/count=(exact|planned|estimated)/);
			const contentRange = (_res$headers$get2 = res.headers.get("content-range")) === null || _res$headers$get2 === void 0 ? void 0 : _res$headers$get2.split("/");
			if (countHeader && contentRange && contentRange.length > 1) count = parseInt(contentRange[1]);
			if (_this2.isMaybeSingle && Array.isArray(data)) if (data.length > 1) {
				error = {
					code: "PGRST116",
					details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
					hint: null,
					message: "JSON object requested, multiple (or no) rows returned"
				};
				data = null;
				count = null;
				status = 406;
				statusText = "Not Acceptable";
			} else if (data.length === 1) data = data[0];
			else data = null;
		} else {
			const body = await res.text();
			try {
				error = JSON.parse(body);
				if (Array.isArray(error) && res.status === 404) {
					data = [];
					error = null;
					status = 200;
					statusText = "OK";
				}
			} catch (_unused2) {
				if (res.status === 404 && body === "") {
					status = 204;
					statusText = "No Content";
				} else error = { message: body };
			}
			if (error && _this2.shouldThrowOnError) throw new PostgrestError(error);
		}
		return {
			success: error === null,
			error,
			data,
			count,
			status,
			statusText
		};
	}
	returns() {
		return this;
	}
	overrideTypes() {
		return this;
	}
};
var PostgrestTransformBuilder = class extends PostgrestBuilder {
	throwOnError() {
		return super.throwOnError();
	}
	select(columns) {
		let quoted = false;
		const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
			if (/\s/.test(c) && !quoted) return "";
			if (c === "\"") quoted = !quoted;
			return c;
		}).join("");
		this.url.searchParams.set("select", cleanedColumns);
		this.headers.append("Prefer", "return=representation");
		return this;
	}
	order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
		const key = referencedTable ? `${referencedTable}.order` : "order";
		const existingOrder = this.url.searchParams.get(key);
		this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
		return this;
	}
	limit(rows, { foreignTable, referencedTable = foreignTable } = {}) {
		const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
		this.url.searchParams.set(key, `${rows}`);
		return this;
	}
	range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
		const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
		const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
		this.url.searchParams.set(keyOffset, `${from}`);
		this.url.searchParams.set(keyLimit, `${to - from + 1}`);
		return this;
	}
	abortSignal(signal) {
		this.signal = signal;
		return this;
	}
	single() {
		this.headers.set("Accept", "application/vnd.pgrst.object+json");
		return this;
	}
	maybeSingle() {
		this.isMaybeSingle = true;
		return this;
	}
	csv() {
		this.headers.set("Accept", "text/csv");
		return this;
	}
	geojson() {
		this.headers.set("Accept", "application/geo+json");
		return this;
	}
	explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
		var _this$headers$get;
		const options = [
			analyze ? "analyze" : null,
			verbose ? "verbose" : null,
			settings ? "settings" : null,
			buffers ? "buffers" : null,
			wal ? "wal" : null
		].filter(Boolean).join("|");
		const forMediatype = (_this$headers$get = this.headers.get("Accept")) !== null && _this$headers$get !== void 0 ? _this$headers$get : "application/json";
		this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
		if (format === "json") return this;
		else return this;
	}
	rollback() {
		this.headers.append("Prefer", "tx=rollback");
		return this;
	}
	returns() {
		return this;
	}
	maxAffected(rows) {
		this.headers.append("Prefer", "handling=strict");
		this.headers.append("Prefer", `max-affected=${rows}`);
		return this;
	}
};
const PostgrestReservedCharsRegexp = new RegExp("[,()]");
var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
	throwOnError() {
		return super.throwOnError();
	}
	eq(column, value) {
		this.url.searchParams.append(column, `eq.${value}`);
		return this;
	}
	neq(column, value) {
		this.url.searchParams.append(column, `neq.${value}`);
		return this;
	}
	gt(column, value) {
		this.url.searchParams.append(column, `gt.${value}`);
		return this;
	}
	gte(column, value) {
		this.url.searchParams.append(column, `gte.${value}`);
		return this;
	}
	lt(column, value) {
		this.url.searchParams.append(column, `lt.${value}`);
		return this;
	}
	lte(column, value) {
		this.url.searchParams.append(column, `lte.${value}`);
		return this;
	}
	like(column, pattern) {
		this.url.searchParams.append(column, `like.${pattern}`);
		return this;
	}
	likeAllOf(column, patterns) {
		this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
		return this;
	}
	likeAnyOf(column, patterns) {
		this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
		return this;
	}
	ilike(column, pattern) {
		this.url.searchParams.append(column, `ilike.${pattern}`);
		return this;
	}
	ilikeAllOf(column, patterns) {
		this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
		return this;
	}
	ilikeAnyOf(column, patterns) {
		this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
		return this;
	}
	regexMatch(column, pattern) {
		this.url.searchParams.append(column, `match.${pattern}`);
		return this;
	}
	regexIMatch(column, pattern) {
		this.url.searchParams.append(column, `imatch.${pattern}`);
		return this;
	}
	is(column, value) {
		this.url.searchParams.append(column, `is.${value}`);
		return this;
	}
	isDistinct(column, value) {
		this.url.searchParams.append(column, `isdistinct.${value}`);
		return this;
	}
	in(column, values) {
		const cleanedValues = Array.from(new Set(values)).map((s) => {
			if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return `"${s}"`;
			else return `${s}`;
		}).join(",");
		this.url.searchParams.append(column, `in.(${cleanedValues})`);
		return this;
	}
	notIn(column, values) {
		const cleanedValues = Array.from(new Set(values)).map((s) => {
			if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return `"${s}"`;
			else return `${s}`;
		}).join(",");
		this.url.searchParams.append(column, `not.in.(${cleanedValues})`);
		return this;
	}
	contains(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `cs.${value}`);
		else if (Array.isArray(value)) this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
		else this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
		return this;
	}
	containedBy(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `cd.${value}`);
		else if (Array.isArray(value)) this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
		else this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
		return this;
	}
	rangeGt(column, range) {
		this.url.searchParams.append(column, `sr.${range}`);
		return this;
	}
	rangeGte(column, range) {
		this.url.searchParams.append(column, `nxl.${range}`);
		return this;
	}
	rangeLt(column, range) {
		this.url.searchParams.append(column, `sl.${range}`);
		return this;
	}
	rangeLte(column, range) {
		this.url.searchParams.append(column, `nxr.${range}`);
		return this;
	}
	rangeAdjacent(column, range) {
		this.url.searchParams.append(column, `adj.${range}`);
		return this;
	}
	overlaps(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `ov.${value}`);
		else this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
		return this;
	}
	textSearch(column, query, { config, type } = {}) {
		let typePart = "";
		if (type === "plain") typePart = "pl";
		else if (type === "phrase") typePart = "ph";
		else if (type === "websearch") typePart = "w";
		const configPart = config === void 0 ? "" : `(${config})`;
		this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
		return this;
	}
	match(query) {
		Object.entries(query).filter(([_, value]) => value !== void 0).forEach(([column, value]) => {
			this.url.searchParams.append(column, `eq.${value}`);
		});
		return this;
	}
	not(column, operator, value) {
		this.url.searchParams.append(column, `not.${operator}.${value}`);
		return this;
	}
	or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
		const key = referencedTable ? `${referencedTable}.or` : "or";
		this.url.searchParams.append(key, `(${filters})`);
		return this;
	}
	filter(column, operator, value) {
		this.url.searchParams.append(column, `${operator}.${value}`);
		return this;
	}
};
var PostgrestQueryBuilder = class {
	constructor(url, { headers = {}, schema, fetch: fetch$1, urlLengthLimit = 8e3, retry }) {
		this.url = url;
		this.headers = new Headers(headers);
		this.schema = schema;
		this.fetch = fetch$1;
		this.urlLengthLimit = urlLengthLimit;
		this.retry = retry;
	}
	cloneRequestState() {
		return {
			url: new URL(this.url.toString()),
			headers: new Headers(this.headers)
		};
	}
	select(columns, options) {
		const { head = false, count } = options !== null && options !== void 0 ? options : {};
		const method = head ? "HEAD" : "GET";
		let quoted = false;
		const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
			if (/\s/.test(c) && !quoted) return "";
			if (c === "\"") quoted = !quoted;
			return c;
		}).join("");
		const { url, headers } = this.cloneRequestState();
		url.searchParams.set("select", cleanedColumns);
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	insert(values, { count, defaultToNull = true } = {}) {
		var _this$fetch;
		const method = "POST";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		if (!defaultToNull) headers.append("Prefer", `missing=default`);
		if (Array.isArray(values)) {
			const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
			if (columns.length > 0) {
				const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
				url.searchParams.set("columns", uniqueColumns.join(","));
			}
		}
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
		var _this$fetch2;
		const method = "POST";
		const { url, headers } = this.cloneRequestState();
		headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
		if (onConflict !== void 0) url.searchParams.set("on_conflict", onConflict);
		if (count) headers.append("Prefer", `count=${count}`);
		if (!defaultToNull) headers.append("Prefer", "missing=default");
		if (Array.isArray(values)) {
			const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
			if (columns.length > 0) {
				const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
				url.searchParams.set("columns", uniqueColumns.join(","));
			}
		}
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch2 = this.fetch) !== null && _this$fetch2 !== void 0 ? _this$fetch2 : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	update(values, { count } = {}) {
		var _this$fetch3;
		const method = "PATCH";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch3 = this.fetch) !== null && _this$fetch3 !== void 0 ? _this$fetch3 : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	delete({ count } = {}) {
		var _this$fetch4;
		const method = "DELETE";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			fetch: (_this$fetch4 = this.fetch) !== null && _this$fetch4 !== void 0 ? _this$fetch4 : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
};
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$2(o);
}
function toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey$2(t) {
	var i = toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _defineProperty$2(e, r, t) {
	return (r = toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r$1) {
			_defineProperty$2(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
var PostgrestClient = class PostgrestClient {
	constructor(url, { headers = {}, schema, fetch: fetch$1, timeout, urlLengthLimit = 8e3, retry } = {}) {
		this.url = url;
		this.headers = new Headers(headers);
		this.schemaName = schema;
		this.urlLengthLimit = urlLengthLimit;
		const originalFetch = fetch$1 !== null && fetch$1 !== void 0 ? fetch$1 : globalThis.fetch;
		if (timeout !== void 0 && timeout > 0) this.fetch = (input, init) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);
			const existingSignal = init === null || init === void 0 ? void 0 : init.signal;
			if (existingSignal) {
				if (existingSignal.aborted) {
					clearTimeout(timeoutId);
					return originalFetch(input, init);
				}
				const abortHandler = () => {
					clearTimeout(timeoutId);
					controller.abort();
				};
				existingSignal.addEventListener("abort", abortHandler, { once: true });
				return originalFetch(input, _objectSpread2$2(_objectSpread2$2({}, init), {}, { signal: controller.signal })).finally(() => {
					clearTimeout(timeoutId);
					existingSignal.removeEventListener("abort", abortHandler);
				});
			}
			return originalFetch(input, _objectSpread2$2(_objectSpread2$2({}, init), {}, { signal: controller.signal })).finally(() => clearTimeout(timeoutId));
		};
		else this.fetch = originalFetch;
		this.retry = retry;
	}
	from(relation) {
		if (!relation || typeof relation !== "string" || relation.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
		return new PostgrestQueryBuilder(new URL(`${this.url}/${relation}`), {
			headers: new Headers(this.headers),
			schema: this.schemaName,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	schema(schema) {
		return new PostgrestClient(this.url, {
			headers: this.headers,
			schema,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	rpc(fn, args = {}, { head = false, get = false, count } = {}) {
		var _this$fetch;
		let method;
		const url = new URL(`${this.url}/rpc/${fn}`);
		let body;
		const _isObject = (v) => v !== null && typeof v === "object" && (!Array.isArray(v) || v.some(_isObject));
		const _hasObjectArg = head && Object.values(args).some(_isObject);
		if (_hasObjectArg) {
			method = "POST";
			body = args;
		} else if (head || get) {
			method = head ? "HEAD" : "GET";
			Object.entries(args).filter(([_, value]) => value !== void 0).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
				url.searchParams.append(name, value);
			});
		} else {
			method = "POST";
			body = args;
		}
		const headers = new Headers(this.headers);
		if (_hasObjectArg) headers.set("Prefer", count ? `count=${count},return=minimal` : "return=minimal");
		else if (count) headers.set("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schemaName,
			body,
			fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
};
var require_websocket_factory = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebSocketFactory = void 0;
	var WebSocketFactory = class {
		constructor() {}
		static detectEnvironment() {
			var _a;
			if (typeof WebSocket !== "undefined") return {
				type: "native",
				wsConstructor: WebSocket
			};
			const gt = globalThis;
			if (typeof globalThis !== "undefined" && typeof gt.WebSocket !== "undefined") return {
				type: "native",
				wsConstructor: gt.WebSocket
			};
			const gl = typeof global !== "undefined" ? global : void 0;
			if (gl && typeof gl.WebSocket !== "undefined") return {
				type: "native",
				wsConstructor: gl.WebSocket
			};
			if (typeof globalThis !== "undefined" && typeof gt.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") return {
				type: "cloudflare",
				error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
				workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
			};
			if (typeof globalThis !== "undefined" && gt.EdgeRuntime || typeof navigator !== "undefined" && ((_a = navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes("Vercel-Edge"))) return {
				type: "unsupported",
				error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
				workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
			};
			const _process = globalThis["process"];
			if (_process) {
				const processVersions = _process["versions"];
				if (processVersions && processVersions["node"]) return {
					type: "unsupported",
					error: "Node.js detected but native WebSocket not found.",
					workaround: "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."
				};
			}
			return {
				type: "unsupported",
				error: "Unknown JavaScript runtime without WebSocket support.",
				workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
			};
		}
		static getWebSocketConstructor() {
			const env = this.detectEnvironment();
			if (env.wsConstructor) return env.wsConstructor;
			let errorMessage = env.error || "WebSocket not supported in this environment.";
			if (env.workaround) errorMessage += `\n\nSuggested solution: ${env.workaround}`;
			throw new Error(errorMessage);
		}
		static isWebSocketSupported() {
			try {
				return this.detectEnvironment().type === "native";
			} catch (_a) {
				return false;
			}
		}
	};
	exports.WebSocketFactory = WebSocketFactory;
	exports.default = WebSocketFactory;
}));
var require_version$1 = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.version = void 0;
	exports.version = "2.111.0";
}));
var require_constants$1 = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CONNECTION_STATE = exports.TRANSPORTS = exports.CHANNEL_EVENTS = exports.CHANNEL_STATES = exports.SOCKET_STATES = exports.MAX_PUSH_BUFFER_SIZE = exports.WS_CLOSE_NORMAL = exports.DEFAULT_TIMEOUT = exports.VERSION = exports.DEFAULT_VSN = exports.VSN_2_0_0 = exports.VSN_1_0_0 = exports.DEFAULT_VERSION = void 0;
	const version_1 = require_version$1();
	exports.DEFAULT_VERSION = `realtime-js/${version_1.version}`;
	exports.VSN_1_0_0 = "1.0.0";
	exports.VSN_2_0_0 = "2.0.0";
	exports.DEFAULT_VSN = exports.VSN_2_0_0;
	exports.VERSION = version_1.version;
	exports.DEFAULT_TIMEOUT = 1e4;
	exports.WS_CLOSE_NORMAL = 1e3;
	exports.MAX_PUSH_BUFFER_SIZE = 100;
	exports.SOCKET_STATES = {
		connecting: 0,
		open: 1,
		closing: 2,
		closed: 3
	};
	exports.CHANNEL_STATES = {
		closed: "closed",
		errored: "errored",
		joined: "joined",
		joining: "joining",
		leaving: "leaving"
	};
	exports.CHANNEL_EVENTS = {
		close: "phx_close",
		error: "phx_error",
		join: "phx_join",
		reply: "phx_reply",
		leave: "phx_leave",
		access_token: "access_token"
	};
	exports.TRANSPORTS = { websocket: "websocket" };
	exports.CONNECTION_STATE = {
		connecting: "connecting",
		open: "open",
		closing: "closing",
		closed: "closed"
	};
}));
var require_serializer = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Serializer = class {
		constructor(allowedMetadataKeys) {
			this.HEADER_LENGTH = 1;
			this.USER_BROADCAST_PUSH_META_LENGTH = 6;
			this.KINDS = {
				userBroadcastPush: 3,
				userBroadcast: 4
			};
			this.BINARY_ENCODING = 0;
			this.JSON_ENCODING = 1;
			this.BROADCAST_EVENT = "broadcast";
			this.allowedMetadataKeys = [];
			this.allowedMetadataKeys = allowedMetadataKeys !== null && allowedMetadataKeys !== void 0 ? allowedMetadataKeys : [];
		}
		encode(msg, callback) {
			if (msg.event === this.BROADCAST_EVENT && !(msg.payload instanceof ArrayBuffer) && typeof msg.payload.event === "string") return callback(this._binaryEncodeUserBroadcastPush(msg));
			let payload = [
				msg.join_ref,
				msg.ref,
				msg.topic,
				msg.event,
				msg.payload
			];
			return callback(JSON.stringify(payload));
		}
		_binaryEncodeUserBroadcastPush(message) {
			var _a;
			if (this._isArrayBuffer((_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload)) return this._encodeBinaryUserBroadcastPush(message);
			else return this._encodeJsonUserBroadcastPush(message);
		}
		_encodeBinaryUserBroadcastPush(message) {
			var _a, _b;
			const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : new ArrayBuffer(0);
			return this._encodeUserBroadcastPush(message, this.BINARY_ENCODING, userPayload);
		}
		_encodeJsonUserBroadcastPush(message) {
			var _a, _b;
			const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : {};
			const encodedUserPayload = new TextEncoder().encode(JSON.stringify(userPayload)).buffer;
			return this._encodeUserBroadcastPush(message, this.JSON_ENCODING, encodedUserPayload);
		}
		_encodeUserBroadcastPush(message, encodingType, encodedPayload) {
			var _a, _b;
			const encoder = new TextEncoder();
			const topic = encoder.encode(message.topic);
			const ref = encoder.encode((_a = message.ref) !== null && _a !== void 0 ? _a : "");
			const joinRef = encoder.encode((_b = message.join_ref) !== null && _b !== void 0 ? _b : "");
			const userEvent = encoder.encode(message.payload.event);
			const rest = this.allowedMetadataKeys ? this._pick(message.payload, this.allowedMetadataKeys) : {};
			const metadata = encoder.encode(Object.keys(rest).length === 0 ? "" : JSON.stringify(rest));
			if (joinRef.length > 255) throw new Error(`joinRef length ${joinRef.length} exceeds maximum of 255`);
			if (ref.length > 255) throw new Error(`ref length ${ref.length} exceeds maximum of 255`);
			if (topic.length > 255) throw new Error(`topic length ${topic.length} exceeds maximum of 255`);
			if (userEvent.length > 255) throw new Error(`userEvent length ${userEvent.length} exceeds maximum of 255`);
			if (metadata.length > 255) throw new Error(`metadata length ${metadata.length} exceeds maximum of 255`);
			const metaLength = this.USER_BROADCAST_PUSH_META_LENGTH + joinRef.length + ref.length + topic.length + userEvent.length + metadata.length;
			const header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
			const view = new DataView(header);
			const bytes = new Uint8Array(header);
			let offset = 0;
			view.setUint8(offset++, this.KINDS.userBroadcastPush);
			view.setUint8(offset++, joinRef.length);
			view.setUint8(offset++, ref.length);
			view.setUint8(offset++, topic.length);
			view.setUint8(offset++, userEvent.length);
			view.setUint8(offset++, metadata.length);
			view.setUint8(offset++, encodingType);
			bytes.set(joinRef, offset);
			offset += joinRef.length;
			bytes.set(ref, offset);
			offset += ref.length;
			bytes.set(topic, offset);
			offset += topic.length;
			bytes.set(userEvent, offset);
			offset += userEvent.length;
			bytes.set(metadata, offset);
			offset += metadata.length;
			var combined = new Uint8Array(header.byteLength + encodedPayload.byteLength);
			combined.set(new Uint8Array(header), 0);
			combined.set(new Uint8Array(encodedPayload), header.byteLength);
			return combined.buffer;
		}
		decode(rawPayload, callback) {
			if (this._isArrayBuffer(rawPayload)) return callback(this._binaryDecode(rawPayload));
			if (typeof rawPayload === "string") {
				const [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
				return callback({
					join_ref,
					ref,
					topic,
					event,
					payload
				});
			}
			return callback({});
		}
		_binaryDecode(buffer) {
			const view = new DataView(buffer);
			const kind = view.getUint8(0);
			const decoder = new TextDecoder();
			switch (kind) {
				case this.KINDS.userBroadcast: return this._decodeUserBroadcast(buffer, view, decoder);
			}
		}
		_decodeUserBroadcast(buffer, view, decoder) {
			const topicSize = view.getUint8(1);
			const userEventSize = view.getUint8(2);
			const metadataSize = view.getUint8(3);
			const payloadEncoding = view.getUint8(4);
			let offset = this.HEADER_LENGTH + 4;
			const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
			offset = offset + topicSize;
			const userEvent = decoder.decode(buffer.slice(offset, offset + userEventSize));
			offset = offset + userEventSize;
			const metadata = decoder.decode(buffer.slice(offset, offset + metadataSize));
			offset = offset + metadataSize;
			const payload = buffer.slice(offset, buffer.byteLength);
			const parsedPayload = payloadEncoding === this.JSON_ENCODING ? JSON.parse(decoder.decode(payload)) : payload;
			const data = {
				type: this.BROADCAST_EVENT,
				event: userEvent,
				payload: parsedPayload
			};
			if (metadataSize > 0) data["meta"] = JSON.parse(metadata);
			return {
				join_ref: null,
				ref: null,
				topic,
				event: this.BROADCAST_EVENT,
				payload: data
			};
		}
		_isArrayBuffer(buffer) {
			var _a;
			return buffer instanceof ArrayBuffer || ((_a = buffer === null || buffer === void 0 ? void 0 : buffer.constructor) === null || _a === void 0 ? void 0 : _a.name) === "ArrayBuffer";
		}
		_pick(obj, keys) {
			if (!obj || typeof obj !== "object") return {};
			return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
		}
	};
	exports.default = Serializer;
}));
var require_transformers = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.httpEndpointURL = exports.toTimestampString = exports.toArray = exports.toJson = exports.toNumber = exports.toBoolean = exports.convertCell = exports.convertColumn = exports.convertChangeData = exports.PostgresTypes = void 0;
	var PostgresTypes;
	(function(PostgresTypes) {
		PostgresTypes["abstime"] = "abstime";
		PostgresTypes["bool"] = "bool";
		PostgresTypes["date"] = "date";
		PostgresTypes["daterange"] = "daterange";
		PostgresTypes["float4"] = "float4";
		PostgresTypes["float8"] = "float8";
		PostgresTypes["int2"] = "int2";
		PostgresTypes["int4"] = "int4";
		PostgresTypes["int4range"] = "int4range";
		PostgresTypes["int8"] = "int8";
		PostgresTypes["int8range"] = "int8range";
		PostgresTypes["json"] = "json";
		PostgresTypes["jsonb"] = "jsonb";
		PostgresTypes["money"] = "money";
		PostgresTypes["numeric"] = "numeric";
		PostgresTypes["oid"] = "oid";
		PostgresTypes["reltime"] = "reltime";
		PostgresTypes["text"] = "text";
		PostgresTypes["time"] = "time";
		PostgresTypes["timestamp"] = "timestamp";
		PostgresTypes["timestamptz"] = "timestamptz";
		PostgresTypes["timetz"] = "timetz";
		PostgresTypes["tsrange"] = "tsrange";
		PostgresTypes["tstzrange"] = "tstzrange";
	})(PostgresTypes || (exports.PostgresTypes = PostgresTypes = {}));
	const convertChangeData = (columns, record, options = {}) => {
		var _a;
		const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
		if (!record) return {};
		return Object.keys(record).reduce((acc, rec_key) => {
			acc[rec_key] = (0, exports.convertColumn)(rec_key, columns, record, skipTypes);
			return acc;
		}, {});
	};
	exports.convertChangeData = convertChangeData;
	const convertColumn = (columnName, columns, record, skipTypes) => {
		const column = columns.find((x) => x.name === columnName);
		const colType = column === null || column === void 0 ? void 0 : column.type;
		const value = record[columnName];
		if (colType && !skipTypes.includes(colType)) return (0, exports.convertCell)(colType, value);
		return noop(value);
	};
	exports.convertColumn = convertColumn;
	const convertCell = (type, value) => {
		if (type.charAt(0) === "_") {
			const dataType = type.slice(1, type.length);
			return (0, exports.toArray)(value, dataType);
		}
		switch (type) {
			case PostgresTypes.bool: return (0, exports.toBoolean)(value);
			case PostgresTypes.float4:
			case PostgresTypes.float8:
			case PostgresTypes.int2:
			case PostgresTypes.int4:
			case PostgresTypes.int8:
			case PostgresTypes.numeric:
			case PostgresTypes.oid: return (0, exports.toNumber)(value);
			case PostgresTypes.json:
			case PostgresTypes.jsonb: return (0, exports.toJson)(value);
			case PostgresTypes.timestamp: return (0, exports.toTimestampString)(value);
			case PostgresTypes.abstime:
			case PostgresTypes.date:
			case PostgresTypes.daterange:
			case PostgresTypes.int4range:
			case PostgresTypes.int8range:
			case PostgresTypes.money:
			case PostgresTypes.reltime:
			case PostgresTypes.text:
			case PostgresTypes.time:
			case PostgresTypes.timestamptz:
			case PostgresTypes.timetz:
			case PostgresTypes.tsrange:
			case PostgresTypes.tstzrange: return noop(value);
			default: return noop(value);
		}
	};
	exports.convertCell = convertCell;
	const noop = (value) => {
		return value;
	};
	const toBoolean = (value) => {
		switch (value) {
			case "t": return true;
			case "f": return false;
			default: return value;
		}
	};
	exports.toBoolean = toBoolean;
	const toNumber = (value) => {
		if (typeof value === "string") {
			const parsedValue = parseFloat(value);
			if (!Number.isNaN(parsedValue)) return parsedValue;
		}
		return value;
	};
	exports.toNumber = toNumber;
	const toJson = (value) => {
		if (typeof value === "string") try {
			return JSON.parse(value);
		} catch (_a) {
			return value;
		}
		return value;
	};
	exports.toJson = toJson;
	const toArray = (value, type) => {
		if (typeof value !== "string") return value;
		const lastIdx = value.length - 1;
		const closeBrace = value[lastIdx];
		if (value[0] === "{" && closeBrace === "}") {
			let arr;
			const valTrim = value.slice(1, lastIdx);
			try {
				arr = JSON.parse("[" + valTrim + "]");
			} catch (_) {
				arr = valTrim ? valTrim.split(",") : [];
			}
			return arr.map((val) => (0, exports.convertCell)(type, val));
		}
		return value;
	};
	exports.toArray = toArray;
	const toTimestampString = (value) => {
		if (typeof value === "string") return value.replace(" ", "T");
		return value;
	};
	exports.toTimestampString = toTimestampString;
	const httpEndpointURL = (socketUrl) => {
		const wsUrl = new URL(socketUrl);
		wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, "http");
		wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, "");
		if (wsUrl.pathname === "" || wsUrl.pathname === "/") wsUrl.pathname = "/api/broadcast";
		else wsUrl.pathname = wsUrl.pathname + "/api/broadcast";
		return wsUrl.href;
	};
	exports.httpEndpointURL = httpEndpointURL;
}));
var require_phoenix_cjs = __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var phoenix_exports = {};
	__export(phoenix_exports, {
		Channel: () => Channel,
		LongPoll: () => LongPoll,
		Presence: () => Presence,
		Push: () => Push,
		Serializer: () => serializer_default,
		Socket: () => Socket,
		Timer: () => Timer
	});
	module.exports = __toCommonJS(phoenix_exports);
	var closure = (value) => {
		if (typeof value === "function") return value;
		else {
			let closure2 = function() {
				return value;
			};
			return closure2;
		}
	};
	var globalSelf = typeof self !== "undefined" ? self : null;
	var phxWindow = typeof window !== "undefined" ? window : null;
	var global = globalSelf || phxWindow || globalThis;
	var DEFAULT_VSN = "2.0.0";
	var DEFAULT_TIMEOUT = 1e4;
	var WS_CLOSE_NORMAL = 1e3;
	var MAX_LONGPOLL_BATCH_SIZE = 100;
	var SOCKET_STATES = {
		connecting: 0,
		open: 1,
		closing: 2,
		closed: 3
	};
	var CHANNEL_STATES = {
		closed: "closed",
		errored: "errored",
		joined: "joined",
		joining: "joining",
		leaving: "leaving"
	};
	var CHANNEL_EVENTS = {
		close: "phx_close",
		error: "phx_error",
		join: "phx_join",
		reply: "phx_reply",
		leave: "phx_leave"
	};
	var TRANSPORTS = {
		longpoll: "longpoll",
		websocket: "websocket"
	};
	var XHR_STATES = { complete: 4 };
	var AUTH_TOKEN_PREFIX = "base64url.bearer.phx.";
	var Push = class {
		constructor(channel, event, payload, timeout) {
			this.channel = channel;
			this.event = event;
			this.payload = payload || function() {
				return {};
			};
			this.receivedResp = null;
			this.timeout = timeout;
			this.timeoutTimer = null;
			this.recHooks = [];
			this.sent = false;
			this.ref = void 0;
		}
		resend(timeout) {
			this.timeout = timeout;
			this.reset();
			this.send();
		}
		send() {
			if (this.hasReceived("timeout")) return;
			this.startTimeout();
			this.sent = true;
			this.channel.socket.push({
				topic: this.channel.topic,
				event: this.event,
				payload: this.payload(),
				ref: this.ref,
				join_ref: this.channel.joinRef()
			});
		}
		receive(status, callback) {
			if (this.hasReceived(status)) callback(this.receivedResp.response);
			this.recHooks.push({
				status,
				callback
			});
			return this;
		}
		reset() {
			this.cancelRefEvent();
			this.ref = null;
			this.refEvent = null;
			this.receivedResp = null;
			this.sent = false;
		}
		destroy() {
			this.cancelRefEvent();
			this.cancelTimeout();
		}
		matchReceive({ status, response, _ref }) {
			this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
		}
		cancelRefEvent() {
			if (!this.refEvent) return;
			this.channel.off(this.refEvent);
		}
		cancelTimeout() {
			clearTimeout(this.timeoutTimer);
			this.timeoutTimer = null;
		}
		startTimeout() {
			if (this.timeoutTimer) this.cancelTimeout();
			this.ref = this.channel.socket.makeRef();
			this.refEvent = this.channel.replyEventName(this.ref);
			this.channel.on(this.refEvent, (payload) => {
				this.cancelRefEvent();
				this.cancelTimeout();
				this.receivedResp = payload;
				this.matchReceive(payload);
			});
			this.timeoutTimer = setTimeout(() => {
				this.trigger("timeout", {});
			}, this.timeout);
		}
		hasReceived(status) {
			return this.receivedResp && this.receivedResp.status === status;
		}
		trigger(status, response) {
			this.channel.trigger(this.refEvent, {
				status,
				response
			});
		}
	};
	var Timer = class {
		constructor(callback, timerCalc) {
			this.callback = callback;
			this.timerCalc = timerCalc;
			this.timer = void 0;
			this.tries = 0;
		}
		reset() {
			this.tries = 0;
			clearTimeout(this.timer);
		}
		scheduleTimeout() {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.tries = this.tries + 1;
				this.callback();
			}, this.timerCalc(this.tries + 1));
		}
	};
	var Channel = class {
		constructor(topic, params, socket) {
			this.state = CHANNEL_STATES.closed;
			this.topic = topic;
			this.params = closure(params || {});
			this.socket = socket;
			this.bindings = [];
			this.bindingRef = 0;
			this.timeout = this.socket.timeout;
			this.joinedOnce = false;
			this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
			this.pushBuffer = [];
			this.stateChangeRefs = [];
			this.rejoinTimer = new Timer(() => {
				if (this.socket.isConnected()) this.rejoin();
			}, this.socket.rejoinAfterMs);
			this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
			this.stateChangeRefs.push(this.socket.onOpen(() => {
				this.rejoinTimer.reset();
				if (this.isErrored()) this.rejoin();
			}));
			this.joinPush.receive("ok", () => {
				this.state = CHANNEL_STATES.joined;
				this.rejoinTimer.reset();
				this.pushBuffer.forEach((pushEvent) => pushEvent.send());
				this.pushBuffer = [];
			});
			this.joinPush.receive("error", (reason) => {
				this.state = CHANNEL_STATES.errored;
				if (this.socket.hasLogger()) this.socket.log("channel", `error ${this.topic}`, reason);
				if (this.socket.isConnected()) this.rejoinTimer.scheduleTimeout();
			});
			this.onClose(() => {
				this.rejoinTimer.reset();
				if (this.socket.hasLogger()) this.socket.log("channel", `close ${this.topic}`);
				this.state = CHANNEL_STATES.closed;
				this.socket.remove(this);
			});
			this.onError((reason) => {
				if (this.socket.hasLogger()) this.socket.log("channel", `error ${this.topic}`, reason);
				if (this.isJoining()) this.joinPush.reset();
				this.state = CHANNEL_STATES.errored;
				if (this.socket.isConnected()) this.rejoinTimer.scheduleTimeout();
			});
			this.joinPush.receive("timeout", () => {
				if (this.socket.hasLogger()) this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
				new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout).send();
				this.state = CHANNEL_STATES.errored;
				this.joinPush.reset();
				if (this.socket.isConnected()) this.rejoinTimer.scheduleTimeout();
			});
			this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
				this.trigger(this.replyEventName(ref), payload);
			});
		}
		join(timeout = this.timeout) {
			if (this.joinedOnce) throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
			else {
				this.timeout = timeout;
				this.joinedOnce = true;
				this.rejoin();
				return this.joinPush;
			}
		}
		teardown() {
			this.pushBuffer.forEach((push) => push.destroy());
			this.pushBuffer = [];
			this.rejoinTimer.reset();
			this.joinPush.destroy();
			this.state = CHANNEL_STATES.closed;
			this.bindings = [];
		}
		onClose(callback) {
			this.on(CHANNEL_EVENTS.close, callback);
		}
		onError(callback) {
			return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
		}
		on(event, callback) {
			let ref = this.bindingRef++;
			this.bindings.push({
				event,
				ref,
				callback
			});
			return ref;
		}
		off(event, ref) {
			this.bindings = this.bindings.filter((bind) => {
				return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
			});
		}
		canPush() {
			return this.socket.isConnected() && this.isJoined();
		}
		push(event, payload, timeout = this.timeout) {
			payload = payload || {};
			if (!this.joinedOnce) throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
			let pushEvent = new Push(this, event, function() {
				return payload;
			}, timeout);
			if (this.canPush()) pushEvent.send();
			else {
				pushEvent.startTimeout();
				this.pushBuffer.push(pushEvent);
			}
			return pushEvent;
		}
		leave(timeout = this.timeout) {
			this.rejoinTimer.reset();
			this.joinPush.cancelTimeout();
			this.state = CHANNEL_STATES.leaving;
			let onClose = () => {
				if (this.socket.hasLogger()) this.socket.log("channel", `leave ${this.topic}`);
				this.trigger(CHANNEL_EVENTS.close, "leave");
			};
			let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
			leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
			leavePush.send();
			if (!this.canPush()) leavePush.trigger("ok", {});
			return leavePush;
		}
		onMessage(_event, payload, _ref) {
			return payload;
		}
		filterBindings(_binding, _payload, _ref) {
			return true;
		}
		isMember(topic, event, payload, joinRef) {
			if (this.topic !== topic) return false;
			if (joinRef && joinRef !== this.joinRef()) {
				if (this.socket.hasLogger()) this.socket.log("channel", "dropping outdated message", {
					topic,
					event,
					payload,
					joinRef
				});
				return false;
			} else return true;
		}
		joinRef() {
			return this.joinPush.ref;
		}
		rejoin(timeout = this.timeout) {
			if (this.isLeaving()) return;
			this.socket.leaveOpenTopic(this.topic);
			this.state = CHANNEL_STATES.joining;
			this.joinPush.resend(timeout);
		}
		trigger(event, payload, ref, joinRef) {
			let handledPayload = this.onMessage(event, payload, ref, joinRef);
			if (payload && !handledPayload) throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
			let eventBindings = this.bindings.filter((bind) => bind.event === event && this.filterBindings(bind, payload, ref));
			for (let i = 0; i < eventBindings.length; i++) eventBindings[i].callback(handledPayload, ref, joinRef || this.joinRef());
		}
		replyEventName(ref) {
			return `chan_reply_${ref}`;
		}
		isClosed() {
			return this.state === CHANNEL_STATES.closed;
		}
		isErrored() {
			return this.state === CHANNEL_STATES.errored;
		}
		isJoined() {
			return this.state === CHANNEL_STATES.joined;
		}
		isJoining() {
			return this.state === CHANNEL_STATES.joining;
		}
		isLeaving() {
			return this.state === CHANNEL_STATES.leaving;
		}
	};
	var Ajax = class {
		static request(method, endPoint, headers, body, timeout, ontimeout, callback) {
			if (global.XDomainRequest) {
				let req = new global.XDomainRequest();
				return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
			} else if (global.XMLHttpRequest) {
				let req = new global.XMLHttpRequest();
				return this.xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback);
			} else if (global.fetch && global.AbortController) return this.fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback);
			else throw new Error("No suitable XMLHttpRequest implementation found");
		}
		static fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback) {
			let options = {
				method,
				headers,
				body
			};
			let controller = null;
			if (timeout) {
				controller = new AbortController();
				setTimeout(() => controller.abort(), timeout);
				options.signal = controller.signal;
			}
			global.fetch(endPoint, options).then((response) => response.text()).then((data) => this.parseJSON(data)).then((data) => callback && callback(data)).catch((err) => {
				if (err.name === "AbortError" && ontimeout) ontimeout();
				else callback && callback(null);
			});
			return controller;
		}
		static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
			req.timeout = timeout;
			req.open(method, endPoint);
			req.onload = () => {
				let response = this.parseJSON(req.responseText);
				callback && callback(response);
			};
			if (ontimeout) req.ontimeout = ontimeout;
			req.onprogress = () => {};
			req.send(body);
			return req;
		}
		static xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback) {
			req.open(method, endPoint, true);
			req.timeout = timeout;
			for (let [key, value] of Object.entries(headers)) req.setRequestHeader(key, value);
			req.onerror = () => callback && callback(null);
			req.onreadystatechange = () => {
				if (req.readyState === XHR_STATES.complete && callback) callback(this.parseJSON(req.responseText));
			};
			if (ontimeout) req.ontimeout = ontimeout;
			req.send(body);
			return req;
		}
		static parseJSON(resp) {
			if (!resp || resp === "") return null;
			try {
				return JSON.parse(resp);
			} catch {
				console && console.log("failed to parse JSON response", resp);
				return null;
			}
		}
		static serialize(obj, parentKey) {
			let queryStr = [];
			for (var key in obj) {
				if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
				let paramKey = parentKey ? `${parentKey}[${key}]` : key;
				let paramVal = obj[key];
				if (typeof paramVal === "object") queryStr.push(this.serialize(paramVal, paramKey));
				else queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
			}
			return queryStr.join("&");
		}
		static appendParams(url, params) {
			if (Object.keys(params).length === 0) return url;
			return `${url}${url.match(/\?/) ? "&" : "?"}${this.serialize(params)}`;
		}
	};
	var arrayBufferToBase64 = (buffer) => {
		let binary = "";
		let bytes = new Uint8Array(buffer);
		let len = bytes.byteLength;
		for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
		return btoa(binary);
	};
	var LongPoll = class {
		constructor(endPoint, protocols) {
			if (protocols && protocols.length === 2 && protocols[1].startsWith(AUTH_TOKEN_PREFIX)) this.authToken = atob(protocols[1].slice(AUTH_TOKEN_PREFIX.length));
			this.endPoint = null;
			this.token = null;
			this.skipHeartbeat = true;
			this.reqs = new Set();
			this.awaitingBatchAck = false;
			this.currentBatch = null;
			this.currentBatchTimer = null;
			this.batchBuffer = [];
			this.onopen = function() {};
			this.onerror = function() {};
			this.onmessage = function() {};
			this.onclose = function() {};
			this.pollEndpoint = this.normalizeEndpoint(endPoint);
			this.readyState = SOCKET_STATES.connecting;
			setTimeout(() => this.poll(), 0);
		}
		normalizeEndpoint(endPoint) {
			return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
		}
		endpointURL() {
			return Ajax.appendParams(this.pollEndpoint, { token: this.token });
		}
		closeAndRetry(code, reason, wasClean) {
			this.close(code, reason, wasClean);
			this.readyState = SOCKET_STATES.connecting;
		}
		ontimeout() {
			this.onerror("timeout");
			this.closeAndRetry(1005, "timeout", false);
		}
		isActive() {
			return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
		}
		poll() {
			const headers = { "Accept": "application/json" };
			if (this.authToken) headers["X-Phoenix-AuthToken"] = this.authToken;
			this.ajax("GET", headers, null, () => this.ontimeout(), (resp) => {
				if (resp) {
					var { status, token, messages } = resp;
					if (status === 410 && this.token !== null) {
						this.onerror(410);
						this.closeAndRetry(3410, "session_gone", false);
						return;
					}
					this.token = token;
				} else status = 0;
				switch (status) {
					case 200:
						messages.forEach((msg) => {
							setTimeout(() => this.onmessage({ data: msg }), 0);
						});
						this.poll();
						break;
					case 204:
						this.poll();
						break;
					case 410:
						this.readyState = SOCKET_STATES.open;
						this.onopen({});
						this.poll();
						break;
					case 403:
						this.onerror(403);
						this.close(1008, "forbidden", false);
						break;
					case 0:
					case 500:
						this.onerror(500);
						this.closeAndRetry(1011, "internal server error", 500);
						break;
					default: throw new Error(`unhandled poll status ${status}`);
				}
			});
		}
		send(body) {
			if (typeof body !== "string") body = arrayBufferToBase64(body);
			if (this.currentBatch) this.currentBatch.push(body);
			else if (this.awaitingBatchAck) this.batchBuffer.push(body);
			else {
				this.currentBatch = [body];
				this.currentBatchTimer = setTimeout(() => {
					this.batchSend(this.currentBatch);
					this.currentBatch = null;
				}, 0);
			}
		}
		batchSend(messages, offset = 0) {
			this.awaitingBatchAck = true;
			const next = offset + MAX_LONGPOLL_BATCH_SIZE;
			const batch = messages.slice(offset, next);
			this.ajax("POST", { "Content-Type": "application/x-ndjson" }, batch.join("\n"), () => this.onerror("timeout"), (resp) => {
				if (!resp || resp.status !== 200) {
					this.awaitingBatchAck = false;
					this.onerror(resp && resp.status);
					this.closeAndRetry(1011, "internal server error", false);
				} else if (next < messages.length) this.batchSend(messages, next);
				else if (this.batchBuffer.length > 0) {
					this.batchSend(this.batchBuffer);
					this.batchBuffer = [];
				} else this.awaitingBatchAck = false;
			});
		}
		close(code, reason, wasClean) {
			for (let req of this.reqs) req.abort();
			this.readyState = SOCKET_STATES.closed;
			let opts = Object.assign({
				code: 1e3,
				reason: void 0,
				wasClean: true
			}, {
				code,
				reason,
				wasClean
			});
			this.batchBuffer = [];
			clearTimeout(this.currentBatchTimer);
			this.currentBatchTimer = null;
			if (typeof CloseEvent !== "undefined") this.onclose(new CloseEvent("close", opts));
			else this.onclose(opts);
		}
		ajax(method, headers, body, onCallerTimeout, callback) {
			let req;
			let ontimeout = () => {
				this.reqs.delete(req);
				onCallerTimeout();
			};
			req = Ajax.request(method, this.endpointURL(), headers, body, this.timeout, ontimeout, (resp) => {
				this.reqs.delete(req);
				if (this.isActive()) callback(resp);
			});
			this.reqs.add(req);
		}
	};
	var Presence = class _Presence {
		constructor(channel, opts = {}) {
			let events = opts.events || {
				state: "presence_state",
				diff: "presence_diff"
			};
			this.state = Object.create(null);
			this.pendingDiffs = [];
			this.channel = channel;
			this.joinRef = null;
			this.caller = {
				onJoin: function() {},
				onLeave: function() {},
				onSync: function() {}
			};
			this.channel.on(events.state, (newState) => {
				let { onJoin, onLeave, onSync } = this.caller;
				this.joinRef = this.channel.joinRef();
				this.state = _Presence.syncState(this.state, newState, onJoin, onLeave);
				this.pendingDiffs.forEach((diff) => {
					this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
				});
				this.pendingDiffs = [];
				onSync();
			});
			this.channel.on(events.diff, (diff) => {
				let { onJoin, onLeave, onSync } = this.caller;
				if (this.inPendingSyncState()) this.pendingDiffs.push(diff);
				else {
					this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
					onSync();
				}
			});
		}
		onJoin(callback) {
			this.caller.onJoin = callback;
		}
		onLeave(callback) {
			this.caller.onLeave = callback;
		}
		onSync(callback) {
			this.caller.onSync = callback;
		}
		list(by) {
			return _Presence.list(this.state, by);
		}
		inPendingSyncState() {
			return !this.joinRef || this.joinRef !== this.channel.joinRef();
		}
		static syncState(currentState, newState, onJoin, onLeave) {
			let state = this.toNullProtoObj(this.clone(currentState));
			newState = this.toNullProtoObj(newState);
			let joins = Object.create(null);
			let leaves = Object.create(null);
			this.map(state, (key, presence) => {
				if (!newState[key]) leaves[key] = presence;
			});
			this.map(newState, (key, newPresence) => {
				let currentPresence = state[key];
				if (currentPresence) {
					let newRefs = newPresence.metas.map((m) => m.phx_ref);
					let curRefs = currentPresence.metas.map((m) => m.phx_ref);
					let joinedMetas = newPresence.metas.filter((m) => curRefs.indexOf(m.phx_ref) < 0);
					let leftMetas = currentPresence.metas.filter((m) => newRefs.indexOf(m.phx_ref) < 0);
					if (joinedMetas.length > 0) {
						joins[key] = newPresence;
						joins[key].metas = joinedMetas;
					}
					if (leftMetas.length > 0) {
						leaves[key] = this.clone(currentPresence);
						leaves[key].metas = leftMetas;
					}
				} else joins[key] = newPresence;
			});
			return this.syncDiff(state, {
				joins,
				leaves
			}, onJoin, onLeave);
		}
		static syncDiff(state, diff, onJoin, onLeave) {
			state = this.toNullProtoObj(state);
			let { joins, leaves } = this.clone(diff);
			if (!onJoin) onJoin = function() {};
			if (!onLeave) onLeave = function() {};
			this.map(joins, (key, newPresence) => {
				let currentPresence = state[key];
				state[key] = this.clone(newPresence);
				if (currentPresence) {
					let joinedRefs = state[key].metas.map((m) => m.phx_ref);
					let curMetas = currentPresence.metas.filter((m) => joinedRefs.indexOf(m.phx_ref) < 0);
					state[key].metas.unshift(...curMetas);
				}
				onJoin(key, currentPresence, newPresence);
			});
			this.map(leaves, (key, leftPresence) => {
				let currentPresence = state[key];
				if (!currentPresence) return;
				let refsToRemove = leftPresence.metas.map((m) => m.phx_ref);
				currentPresence.metas = currentPresence.metas.filter((p) => {
					return refsToRemove.indexOf(p.phx_ref) < 0;
				});
				onLeave(key, currentPresence, leftPresence);
				if (currentPresence.metas.length === 0) delete state[key];
			});
			return state;
		}
		static list(presences, chooser) {
			if (!chooser) chooser = function(key, pres) {
				return pres;
			};
			return this.map(presences, (key, presence) => {
				return chooser(key, presence);
			});
		}
		static map(obj, func) {
			return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
		}
		static toNullProtoObj(obj) {
			if (Object.getPrototypeOf(obj) === null) return obj;
			let cleaned = Object.create(null);
			Object.getOwnPropertyNames(obj).forEach((key) => {
				cleaned[key] = obj[key];
			});
			return cleaned;
		}
		static clone(obj) {
			return JSON.parse(JSON.stringify(obj));
		}
	};
	var serializer_default = {
		HEADER_LENGTH: 1,
		META_LENGTH: 4,
		KINDS: {
			push: 0,
			reply: 1,
			broadcast: 2
		},
		encode(msg, callback) {
			if (msg.payload.constructor === ArrayBuffer) return callback(this.binaryEncode(msg));
			else {
				let payload = [
					msg.join_ref,
					msg.ref,
					msg.topic,
					msg.event,
					msg.payload
				];
				return callback(JSON.stringify(payload));
			}
		},
		decode(rawPayload, callback) {
			if (rawPayload.constructor === ArrayBuffer) return callback(this.binaryDecode(rawPayload));
			else {
				let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
				return callback({
					join_ref,
					ref,
					topic,
					event,
					payload
				});
			}
		},
		binaryEncode(message) {
			let { join_ref, ref, event, topic, payload } = message;
			let encoder = new TextEncoder();
			let joinRefBytes = encoder.encode(join_ref);
			let refBytes = encoder.encode(ref);
			let topicBytes = encoder.encode(topic);
			let eventBytes = encoder.encode(event);
			this.assertFieldSize(joinRefBytes.byteLength, "join_ref");
			this.assertFieldSize(refBytes.byteLength, "ref");
			this.assertFieldSize(topicBytes.byteLength, "topic");
			this.assertFieldSize(eventBytes.byteLength, "event");
			let metaLength = this.META_LENGTH + joinRefBytes.byteLength + refBytes.byteLength + topicBytes.byteLength + eventBytes.byteLength;
			let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
			let headerBytes = new Uint8Array(header);
			let view = new DataView(header);
			let offset = 0;
			view.setUint8(offset++, this.KINDS.push);
			view.setUint8(offset++, joinRefBytes.byteLength);
			view.setUint8(offset++, refBytes.byteLength);
			view.setUint8(offset++, topicBytes.byteLength);
			view.setUint8(offset++, eventBytes.byteLength);
			headerBytes.set(joinRefBytes, offset);
			offset += joinRefBytes.byteLength;
			headerBytes.set(refBytes, offset);
			offset += refBytes.byteLength;
			headerBytes.set(topicBytes, offset);
			offset += topicBytes.byteLength;
			headerBytes.set(eventBytes, offset);
			offset += eventBytes.byteLength;
			var combined = new Uint8Array(header.byteLength + payload.byteLength);
			combined.set(headerBytes, 0);
			combined.set(new Uint8Array(payload), header.byteLength);
			return combined.buffer;
		},
		assertFieldSize(size, name) {
			if (size > 255) throw new Error(`unable to convert ${name} to binary: must be less than or equal to 255 bytes, but is ${size} bytes`);
		},
		binaryDecode(buffer) {
			let view = new DataView(buffer);
			let kind = view.getUint8(0);
			let decoder = new TextDecoder();
			switch (kind) {
				case this.KINDS.push: return this.decodePush(buffer, view, decoder);
				case this.KINDS.reply: return this.decodeReply(buffer, view, decoder);
				case this.KINDS.broadcast: return this.decodeBroadcast(buffer, view, decoder);
			}
		},
		decodePush(buffer, view, decoder) {
			let joinRefSize = view.getUint8(1);
			let topicSize = view.getUint8(2);
			let eventSize = view.getUint8(3);
			let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
			let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
			offset = offset + joinRefSize;
			let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
			offset = offset + topicSize;
			let event = decoder.decode(buffer.slice(offset, offset + eventSize));
			offset = offset + eventSize;
			return {
				join_ref: joinRef,
				ref: null,
				topic,
				event,
				payload: buffer.slice(offset, buffer.byteLength)
			};
		},
		decodeReply(buffer, view, decoder) {
			let joinRefSize = view.getUint8(1);
			let refSize = view.getUint8(2);
			let topicSize = view.getUint8(3);
			let eventSize = view.getUint8(4);
			let offset = this.HEADER_LENGTH + this.META_LENGTH;
			let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
			offset = offset + joinRefSize;
			let ref = decoder.decode(buffer.slice(offset, offset + refSize));
			offset = offset + refSize;
			let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
			offset = offset + topicSize;
			let event = decoder.decode(buffer.slice(offset, offset + eventSize));
			offset = offset + eventSize;
			let payload = {
				status: event,
				response: buffer.slice(offset, buffer.byteLength)
			};
			return {
				join_ref: joinRef,
				ref,
				topic,
				event: CHANNEL_EVENTS.reply,
				payload
			};
		},
		decodeBroadcast(buffer, view, decoder) {
			let topicSize = view.getUint8(1);
			let eventSize = view.getUint8(2);
			let offset = this.HEADER_LENGTH + 2;
			let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
			offset = offset + topicSize;
			let event = decoder.decode(buffer.slice(offset, offset + eventSize));
			offset = offset + eventSize;
			return {
				join_ref: null,
				ref: null,
				topic,
				event,
				payload: buffer.slice(offset, buffer.byteLength)
			};
		}
	};
	var Socket = class {
		constructor(endPoint, opts = {}) {
			this.stateChangeCallbacks = {
				open: [],
				close: [],
				error: [],
				message: []
			};
			this.channels = [];
			this.sendBuffer = [];
			this.ref = 0;
			this.fallbackRef = null;
			this.timeout = opts.timeout || DEFAULT_TIMEOUT;
			this.transport = opts.transport || global.WebSocket || LongPoll;
			this.conn = void 0;
			this.primaryPassedHealthCheck = false;
			this.longPollFallbackMs = opts.longPollFallbackMs;
			this.fallbackTimer = null;
			let envSessionStorage = null;
			try {
				envSessionStorage = global && global.sessionStorage;
			} catch {}
			this.sessionStore = opts.sessionStorage || envSessionStorage;
			this.establishedConnections = 0;
			this.defaultEncoder = serializer_default.encode.bind(serializer_default);
			this.defaultDecoder = serializer_default.decode.bind(serializer_default);
			this.closeWasClean = true;
			this.disconnecting = false;
			this.binaryType = opts.binaryType || "arraybuffer";
			this.connectClock = 1;
			this.pageHidden = false;
			this.encode = void 0;
			this.decode = void 0;
			if (this.transport !== LongPoll) {
				this.encode = opts.encode || this.defaultEncoder;
				this.decode = opts.decode || this.defaultDecoder;
			} else {
				this.encode = this.defaultEncoder;
				this.decode = this.defaultDecoder;
			}
			let awaitingConnectionOnPageShow = null;
			if (phxWindow && phxWindow.addEventListener) {
				phxWindow.addEventListener("pagehide", (_e) => {
					if (this.conn) {
						this.disconnect();
						awaitingConnectionOnPageShow = this.connectClock;
					}
				});
				phxWindow.addEventListener("pageshow", (_e) => {
					if (awaitingConnectionOnPageShow === this.connectClock) {
						awaitingConnectionOnPageShow = null;
						this.connect();
					}
				});
				phxWindow.addEventListener("visibilitychange", () => {
					if (document.visibilityState === "hidden") this.pageHidden = true;
					else {
						this.pageHidden = false;
						if (!this.isConnected() && !this.closeWasClean) this.teardown(() => this.connect());
					}
				});
			}
			this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
			this.autoSendHeartbeat = opts.autoSendHeartbeat ?? true;
			this.heartbeatCallback = opts.heartbeatCallback ?? (() => {});
			this.rejoinAfterMs = (tries) => {
				if (opts.rejoinAfterMs) return opts.rejoinAfterMs(tries);
				else return [
					1e3,
					2e3,
					5e3
				][tries - 1] || 1e4;
			};
			this.reconnectAfterMs = (tries) => {
				if (opts.reconnectAfterMs) return opts.reconnectAfterMs(tries);
				else return [
					10,
					50,
					100,
					150,
					200,
					250,
					500,
					1e3,
					2e3
				][tries - 1] || 5e3;
			};
			this.logger = opts.logger || null;
			if (!this.logger && opts.debug) this.logger = (kind, msg, data) => {
				console.log(`${kind}: ${msg}`, data);
			};
			this.longpollerTimeout = opts.longpollerTimeout || 2e4;
			this.params = closure(opts.params || {});
			this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
			this.vsn = opts.vsn || DEFAULT_VSN;
			this.heartbeatTimeoutTimer = null;
			this.heartbeatTimer = null;
			this.heartbeatSentAt = null;
			this.pendingHeartbeatRef = null;
			this.reconnectTimer = new Timer(() => {
				if (this.pageHidden) {
					this.log("Not reconnecting as page is hidden!");
					this.teardown();
					return;
				}
				this.teardown(async () => {
					if (opts.beforeReconnect) await opts.beforeReconnect();
					this.connect();
				});
			}, this.reconnectAfterMs);
			this.authToken = opts.authToken && closure(opts.authToken);
		}
		getLongPollTransport() {
			return LongPoll;
		}
		replaceTransport(newTransport) {
			this.connectClock++;
			this.closeWasClean = true;
			clearTimeout(this.fallbackTimer);
			this.reconnectTimer.reset();
			if (this.conn) {
				this.conn.close();
				this.conn = null;
			}
			this.transport = newTransport;
		}
		protocol() {
			return location.protocol.match(/^https/) ? "wss" : "ws";
		}
		endPointURL() {
			let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
			if (uri.charAt(0) !== "/") return uri;
			if (uri.charAt(1) === "/") return `${this.protocol()}:${uri}`;
			return `${this.protocol()}://${location.host}${uri}`;
		}
		disconnect(callback, code, reason) {
			this.connectClock++;
			this.disconnecting = true;
			this.closeWasClean = true;
			clearTimeout(this.fallbackTimer);
			this.reconnectTimer.reset();
			this.teardown(() => {
				this.disconnecting = false;
				callback && callback();
			}, code, reason);
		}
		connect(params) {
			if (params) {
				console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
				this.params = closure(params);
			}
			if (this.conn && !this.disconnecting) return;
			if (this.longPollFallbackMs && this.transport !== LongPoll) this.connectWithFallback(LongPoll, this.longPollFallbackMs);
			else this.transportConnect();
		}
		log(kind, msg, data) {
			this.logger && this.logger(kind, msg, data);
		}
		hasLogger() {
			return this.logger !== null;
		}
		onOpen(callback) {
			let ref = this.makeRef();
			this.stateChangeCallbacks.open.push([ref, callback]);
			return ref;
		}
		onClose(callback) {
			let ref = this.makeRef();
			this.stateChangeCallbacks.close.push([ref, callback]);
			return ref;
		}
		onError(callback) {
			let ref = this.makeRef();
			this.stateChangeCallbacks.error.push([ref, callback]);
			return ref;
		}
		onMessage(callback) {
			let ref = this.makeRef();
			this.stateChangeCallbacks.message.push([ref, callback]);
			return ref;
		}
		onHeartbeat(callback) {
			this.heartbeatCallback = callback;
		}
		ping(callback) {
			if (!this.isConnected()) return false;
			let ref = this.makeRef();
			let startTime = Date.now();
			this.push({
				topic: "phoenix",
				event: "heartbeat",
				payload: {},
				ref
			});
			let onMsgRef = this.onMessage((msg) => {
				if (msg.ref === ref) {
					this.off([onMsgRef]);
					callback(Date.now() - startTime);
				}
			});
			return true;
		}
		transportName(transport) {
			switch (transport) {
				case LongPoll: return "LongPoll";
				default: return transport.name;
			}
		}
		transportConnect() {
			this.connectClock++;
			this.closeWasClean = false;
			let protocols = void 0;
			if (this.authToken) protocols = ["phoenix", `${AUTH_TOKEN_PREFIX}${btoa(this.authToken()).replace(/=/g, "")}`];
			this.conn = new this.transport(this.endPointURL(), protocols);
			this.conn.binaryType = this.binaryType;
			this.conn.timeout = this.longpollerTimeout;
			this.conn.onopen = () => this.onConnOpen();
			this.conn.onerror = (error) => this.onConnError(error);
			this.conn.onmessage = (event) => this.onConnMessage(event);
			this.conn.onclose = (event) => this.onConnClose(event);
		}
		getSession(key) {
			return this.sessionStore && this.sessionStore.getItem(key);
		}
		storeSession(key, val) {
			this.sessionStore && this.sessionStore.setItem(key, val);
		}
		connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
			clearTimeout(this.fallbackTimer);
			let established = false;
			let primaryTransport = true;
			let openRef, errorRef;
			let fallbackTransportName = this.transportName(fallbackTransport);
			let fallback = (reason) => {
				this.log("transport", `falling back to ${fallbackTransportName}...`, reason);
				this.off([openRef, errorRef]);
				primaryTransport = false;
				this.replaceTransport(fallbackTransport);
				this.transportConnect();
			};
			if (this.getSession(`phx:fallback:${fallbackTransportName}`)) return fallback("memorized");
			this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
			errorRef = this.onError((reason) => {
				this.log("transport", "error", reason);
				if (primaryTransport && !established) {
					clearTimeout(this.fallbackTimer);
					fallback(reason);
				}
			});
			if (this.fallbackRef) this.off([this.fallbackRef]);
			this.fallbackRef = this.onOpen(() => {
				established = true;
				if (!primaryTransport) {
					let fallbackTransportName2 = this.transportName(fallbackTransport);
					if (!this.primaryPassedHealthCheck) this.storeSession(`phx:fallback:${fallbackTransportName2}`, "true");
					return this.log("transport", `established ${fallbackTransportName2} fallback`);
				}
				clearTimeout(this.fallbackTimer);
				this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
				this.ping((rtt) => {
					this.log("transport", "connected to primary after", rtt);
					this.primaryPassedHealthCheck = true;
					clearTimeout(this.fallbackTimer);
				});
			});
			this.transportConnect();
		}
		clearHeartbeats() {
			clearTimeout(this.heartbeatTimer);
			clearTimeout(this.heartbeatTimeoutTimer);
		}
		onConnOpen() {
			if (this.hasLogger()) this.log("transport", `connected to ${this.endPointURL()}`);
			this.closeWasClean = false;
			this.disconnecting = false;
			this.establishedConnections++;
			this.flushSendBuffer();
			this.reconnectTimer.reset();
			if (this.autoSendHeartbeat) this.resetHeartbeat();
			this.triggerStateCallbacks("open");
		}
		heartbeatTimeout() {
			if (this.pendingHeartbeatRef) {
				this.pendingHeartbeatRef = null;
				this.heartbeatSentAt = null;
				if (this.hasLogger()) this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
				try {
					this.heartbeatCallback("timeout");
				} catch (e) {
					this.log("error", "error in heartbeat callback", e);
				}
				this.triggerChanError(new Error("heartbeat timeout"));
				this.closeWasClean = false;
				this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
			}
		}
		resetHeartbeat() {
			if (this.conn && this.conn.skipHeartbeat) return;
			this.pendingHeartbeatRef = null;
			this.clearHeartbeats();
			this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
		}
		teardown(callback, code, reason) {
			if (!this.conn) return callback && callback();
			const connToClose = this.conn;
			this.waitForBufferDone(connToClose, () => {
				if (code) connToClose.close(code, reason || "");
				else connToClose.close();
				this.waitForSocketClosed(connToClose, () => {
					if (this.conn === connToClose) {
						this.conn.onopen = function() {};
						this.conn.onerror = function() {};
						this.conn.onmessage = function() {};
						this.conn.onclose = function() {};
						this.conn = null;
					}
					callback && callback();
				});
			});
		}
		waitForBufferDone(conn, callback, tries = 1) {
			if (tries === 5 || !conn.bufferedAmount) {
				callback();
				return;
			}
			setTimeout(() => {
				this.waitForBufferDone(conn, callback, tries + 1);
			}, 150 * tries);
		}
		waitForSocketClosed(conn, callback, tries = 1) {
			if (tries === 5 || conn.readyState === SOCKET_STATES.closed) {
				callback();
				return;
			}
			setTimeout(() => {
				this.waitForSocketClosed(conn, callback, tries + 1);
			}, 150 * tries);
		}
		onConnClose(event) {
			if (this.conn) this.conn.onclose = () => {};
			if (this.hasLogger()) this.log("transport", "close", event);
			this.triggerChanError(event);
			this.clearHeartbeats();
			if (!this.closeWasClean) this.reconnectTimer.scheduleTimeout();
			this.triggerStateCallbacks("close", event);
		}
		onConnError(error) {
			if (this.hasLogger()) this.log("transport", "error", error);
			let transportBefore = this.transport;
			let establishedBefore = this.establishedConnections;
			this.triggerStateCallbacks("error", error, transportBefore, establishedBefore);
			if (transportBefore === this.transport || establishedBefore > 0) this.triggerChanError(error);
		}
		triggerChanError(reason) {
			this.channels.forEach((channel) => {
				if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) channel.trigger(CHANNEL_EVENTS.error, reason);
			});
		}
		connectionState() {
			switch (this.conn && this.conn.readyState) {
				case SOCKET_STATES.connecting: return "connecting";
				case SOCKET_STATES.open: return "open";
				case SOCKET_STATES.closing: return "closing";
				default: return "closed";
			}
		}
		isConnected() {
			return this.connectionState() === "open";
		}
		remove(channel) {
			this.off(channel.stateChangeRefs);
			this.channels = this.channels.filter((c) => c !== channel);
		}
		off(refs) {
			for (let key in this.stateChangeCallbacks) this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
				return refs.indexOf(ref) === -1;
			});
		}
		channel(topic, chanParams = {}) {
			let chan = new Channel(topic, chanParams, this);
			this.channels.push(chan);
			return chan;
		}
		push(data) {
			if (this.hasLogger()) {
				let { topic, event, payload, ref, join_ref } = data;
				this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
			}
			if (this.isConnected()) this.encode(data, (result) => this.conn.send(result));
			else this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
		}
		makeRef() {
			let newRef = this.ref + 1;
			if (newRef === this.ref) this.ref = 0;
			else this.ref = newRef;
			return this.ref.toString();
		}
		sendHeartbeat() {
			if (!this.isConnected()) {
				try {
					this.heartbeatCallback("disconnected");
				} catch (e) {
					this.log("error", "error in heartbeat callback", e);
				}
				return;
			}
			if (this.pendingHeartbeatRef) {
				this.heartbeatTimeout();
				return;
			}
			this.pendingHeartbeatRef = this.makeRef();
			this.heartbeatSentAt = Date.now();
			this.push({
				topic: "phoenix",
				event: "heartbeat",
				payload: {},
				ref: this.pendingHeartbeatRef
			});
			try {
				this.heartbeatCallback("sent");
			} catch (e) {
				this.log("error", "error in heartbeat callback", e);
			}
			this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
		}
		flushSendBuffer() {
			if (this.isConnected() && this.sendBuffer.length > 0) {
				this.sendBuffer.forEach((callback) => callback());
				this.sendBuffer = [];
			}
		}
		onConnMessage(rawMessage) {
			this.decode(rawMessage.data, (msg) => {
				let { topic, event, payload, ref, join_ref } = msg;
				if (ref && ref === this.pendingHeartbeatRef) {
					const latency = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
					this.clearHeartbeats();
					try {
						this.heartbeatCallback(payload.status === "ok" ? "ok" : "error", latency);
					} catch (e) {
						this.log("error", "error in heartbeat callback", e);
					}
					this.pendingHeartbeatRef = null;
					this.heartbeatSentAt = null;
					if (this.autoSendHeartbeat) this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
				}
				if (this.hasLogger()) this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`.trim(), payload);
				for (let i = 0; i < this.channels.length; i++) {
					const channel = this.channels[i];
					if (!channel.isMember(topic, event, payload, join_ref)) continue;
					channel.trigger(event, payload, ref, join_ref);
				}
				this.triggerStateCallbacks("message", msg);
			});
		}
		triggerStateCallbacks(event, ...args) {
			try {
				this.stateChangeCallbacks[event].forEach(([_, callback]) => {
					try {
						callback(...args);
					} catch (e) {
						this.log("error", `error in ${event} callback`, e);
					}
				});
			} catch (e) {
				this.log("error", `error triggering ${event} callbacks`, e);
			}
		}
		leaveOpenTopic(topic) {
			let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
			if (dupChannel) {
				if (this.hasLogger()) this.log("transport", `leaving duplicate topic "${topic}"`);
				dupChannel.leave();
			}
		}
	};
}));
var require_presenceAdapter = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const phoenix_1 = require_phoenix_cjs();
	exports.default = class PresenceAdapter {
		constructor(channel, opts) {
			const phoenixOptions = phoenixPresenceOptions(opts);
			this.presence = new phoenix_1.Presence(channel.getChannel(), phoenixOptions);
			this.presence.onJoin((key, currentPresence, newPresence) => {
				const onJoinPayload = PresenceAdapter.onJoinPayload(key, currentPresence, newPresence);
				channel.getChannel().trigger("presence", onJoinPayload);
			});
			this.presence.onLeave((key, currentPresence, leftPresence) => {
				const onLeavePayload = PresenceAdapter.onLeavePayload(key, currentPresence, leftPresence);
				channel.getChannel().trigger("presence", onLeavePayload);
			});
			this.presence.onSync(() => {
				channel.getChannel().trigger("presence", { event: "sync" });
			});
		}
		get state() {
			return PresenceAdapter.transformState(this.presence.state);
		}
		static transformState(state) {
			state = cloneState(state);
			return Object.getOwnPropertyNames(state).reduce((newState, key) => {
				const presences = state[key];
				newState[key] = transformState(presences);
				return newState;
			}, {});
		}
		static onJoinPayload(key, currentPresence, newPresence) {
			return {
				event: "join",
				key,
				currentPresences: parseCurrentPresences(currentPresence),
				newPresences: transformState(newPresence)
			};
		}
		static onLeavePayload(key, currentPresence, leftPresence) {
			return {
				event: "leave",
				key,
				currentPresences: parseCurrentPresences(currentPresence),
				leftPresences: transformState(leftPresence)
			};
		}
	};
	function transformState(presences) {
		return presences.metas.map((presence) => {
			const descriptors = Object.getOwnPropertyDescriptors(presence);
			const transformedPresence = Object.defineProperties({}, descriptors);
			transformedPresence["presence_ref"] = transformedPresence["phx_ref"];
			delete transformedPresence["phx_ref"];
			delete transformedPresence["phx_ref_prev"];
			return transformedPresence;
		});
	}
	function cloneState(state) {
		return JSON.parse(JSON.stringify(state));
	}
	function phoenixPresenceOptions(opts) {
		return (opts === null || opts === void 0 ? void 0 : opts.events) && { events: opts.events };
	}
	function parseCurrentPresences(currentPresences) {
		return (currentPresences === null || currentPresences === void 0 ? void 0 : currentPresences.metas) ? transformState(currentPresences) : [];
	}
}));
var require_RealtimePresence = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.REALTIME_PRESENCE_LISTEN_EVENTS = void 0;
	const presenceAdapter_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_presenceAdapter());
	var REALTIME_PRESENCE_LISTEN_EVENTS;
	(function(REALTIME_PRESENCE_LISTEN_EVENTS) {
		REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
		REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
		REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
	})(REALTIME_PRESENCE_LISTEN_EVENTS || (exports.REALTIME_PRESENCE_LISTEN_EVENTS = REALTIME_PRESENCE_LISTEN_EVENTS = {}));
	var RealtimePresence = class {
		get state() {
			return this.presenceAdapter.state;
		}
		constructor(channel, opts) {
			this.channel = channel;
			this.presenceAdapter = new presenceAdapter_1.default(this.channel.channelAdapter, opts);
		}
	};
	exports.default = RealtimePresence;
}));
var require_normalizeChannelError = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.normalizeChannelError = normalizeChannelError;
	function normalizeChannelError(reason) {
		if (reason instanceof Error) return reason;
		if (typeof reason === "string") return new Error(reason);
		if (reason && typeof reason === "object") {
			const obj = reason;
			if (typeof obj.code === "number") {
				const detail = typeof obj.reason === "string" && obj.reason ? ` (${obj.reason})` : "";
				return new Error(`socket closed: ${obj.code}${detail}`, { cause: reason });
			}
			return new Error("channel error: transport failure", { cause: reason });
		}
		return new Error("channel error: connection lost");
	}
}));
var require_channelAdapter = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const constants_1 = require_constants$1();
	var ChannelAdapter = class {
		constructor(socket, topic, params) {
			const phoenixParams = phoenixChannelParams(params);
			this.channel = socket.getSocket().channel(topic, phoenixParams);
			this.socket = socket;
		}
		get state() {
			return this.channel.state;
		}
		set state(state) {
			this.channel.state = state;
		}
		get joinedOnce() {
			return this.channel.joinedOnce;
		}
		get joinPush() {
			return this.channel.joinPush;
		}
		get rejoinTimer() {
			return this.channel.rejoinTimer;
		}
		on(event, callback) {
			return this.channel.on(event, callback);
		}
		off(event, refNumber) {
			this.channel.off(event, refNumber);
		}
		subscribe(timeout) {
			return this.channel.join(timeout);
		}
		unsubscribe(timeout) {
			return this.channel.leave(timeout);
		}
		teardown() {
			this.channel.teardown();
		}
		onClose(callback) {
			this.channel.onClose(callback);
		}
		onError(callback) {
			return this.channel.onError(callback);
		}
		push(event, payload, timeout) {
			let push;
			try {
				push = this.channel.push(event, payload, timeout);
			} catch (error) {
				throw new Error(`tried to push '${event}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
			}
			if (this.channel.pushBuffer.length > constants_1.MAX_PUSH_BUFFER_SIZE) {
				const removedPush = this.channel.pushBuffer.shift();
				removedPush.cancelTimeout();
				this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload());
			}
			return push;
		}
		updateJoinPayload(payload) {
			const oldPayload = this.channel.joinPush.payload();
			this.channel.joinPush.payload = () => Object.assign(Object.assign({}, oldPayload), payload);
		}
		canPush() {
			return this.socket.isConnected() && this.state === constants_1.CHANNEL_STATES.joined;
		}
		isJoined() {
			return this.state === constants_1.CHANNEL_STATES.joined;
		}
		isJoining() {
			return this.state === constants_1.CHANNEL_STATES.joining;
		}
		isClosed() {
			return this.state === constants_1.CHANNEL_STATES.closed;
		}
		isLeaving() {
			return this.state === constants_1.CHANNEL_STATES.leaving;
		}
		updateFilterBindings(filterBindings) {
			this.channel.filterBindings = filterBindings;
		}
		updatePayloadTransform(callback) {
			this.channel.onMessage = callback;
		}
		getChannel() {
			return this.channel;
		}
	};
	exports.default = ChannelAdapter;
	function phoenixChannelParams(options) {
		return { config: Object.assign({
			broadcast: {
				ack: false,
				self: false
			},
			presence: {
				key: "",
				enabled: false
			},
			private: false
		}, options.config) };
	}
}));
var require_RealtimePostgresFilterBuilder = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.postgresChangesFilter = exports.RealtimePostgresFilterBuilder = void 0;
	const PostgrestReservedCharsRegexp = /[,()"\\]/;
	const needsQuoting = (value) => PostgrestReservedCharsRegexp.test(value) || value !== value.trim();
	const quote = (value) => `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
	const serializeScalar = (value) => {
		const serialized = value === null ? "null" : String(value);
		return needsQuoting(serialized) ? quote(serialized) : serialized;
	};
	const serializeIsValue = (value) => value === null ? "null" : String(value);
	const serialize = (operator, value) => {
		if (operator === "in") {
			const values = Array.isArray(value) ? value : [value];
			if (values.length === 0) throw new Error("Realtime `in` filter requires at least one value.");
			return `in.(${Array.from(new Set(values)).map((v) => serializeScalar(v)).join(",")})`;
		}
		if (operator === "is") return `is.${serializeIsValue(value)}`;
		return `${operator}.${serializeScalar(value)}`;
	};
	var RealtimePostgresFilterBuilder = class {
		constructor() {
			this.filters = [];
		}
		add(column, operator, value, negate = false) {
			const prefix = negate ? "not." : "";
			this.filters.push(`${column}=${prefix}${serialize(operator, value)}`);
			return this;
		}
		eq(column, value) {
			return this.add(column, "eq", value);
		}
		neq(column, value) {
			return this.add(column, "neq", value);
		}
		gt(column, value) {
			return this.add(column, "gt", value);
		}
		gte(column, value) {
			return this.add(column, "gte", value);
		}
		lt(column, value) {
			return this.add(column, "lt", value);
		}
		lte(column, value) {
			return this.add(column, "lte", value);
		}
		in(column, values) {
			return this.add(column, "in", values);
		}
		like(column, pattern) {
			return this.add(column, "like", pattern);
		}
		ilike(column, pattern) {
			return this.add(column, "ilike", pattern);
		}
		match(column, pattern) {
			return this.add(column, "match", pattern);
		}
		imatch(column, pattern) {
			return this.add(column, "imatch", pattern);
		}
		is(column, value) {
			return this.add(column, "is", value);
		}
		isDistinct(column, value) {
			return this.add(column, "isdistinct", value);
		}
		not(column, operator, value) {
			return this.add(column, operator, value, true);
		}
		build() {
			return this.filters.join(",");
		}
		toString() {
			return this.build();
		}
	};
	exports.RealtimePostgresFilterBuilder = RealtimePostgresFilterBuilder;
	const postgresChangesFilter = () => new RealtimePostgresFilterBuilder();
	exports.postgresChangesFilter = postgresChangesFilter;
}));
var require_RealtimeChannel = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.REALTIME_CHANNEL_STATES = exports.REALTIME_SUBSCRIBE_STATES = exports.REALTIME_LISTEN_TYPES = exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = exports.postgresChangesFilter = exports.RealtimePostgresFilterBuilder = void 0;
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	const constants_1 = require_constants$1();
	const RealtimePresence_1 = tslib_1.__importDefault(require_RealtimePresence());
	const Transformers = tslib_1.__importStar(require_transformers());
	const transformers_1 = require_transformers();
	const normalizeChannelError_1 = require_normalizeChannelError();
	const channelAdapter_1 = tslib_1.__importDefault(require_channelAdapter());
	const RealtimePostgresFilterBuilder_1 = require_RealtimePostgresFilterBuilder();
	var RealtimePostgresFilterBuilder_2 = require_RealtimePostgresFilterBuilder();
	Object.defineProperty(exports, "RealtimePostgresFilterBuilder", {
		enumerable: true,
		get: function() {
			return RealtimePostgresFilterBuilder_2.RealtimePostgresFilterBuilder;
		}
	});
	Object.defineProperty(exports, "postgresChangesFilter", {
		enumerable: true,
		get: function() {
			return RealtimePostgresFilterBuilder_2.postgresChangesFilter;
		}
	});
	var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
	(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
		REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
		REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
		REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
		REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
	})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
	var REALTIME_LISTEN_TYPES;
	(function(REALTIME_LISTEN_TYPES) {
		REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
		REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
		REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
		REALTIME_LISTEN_TYPES["SYSTEM"] = "system";
	})(REALTIME_LISTEN_TYPES || (exports.REALTIME_LISTEN_TYPES = REALTIME_LISTEN_TYPES = {}));
	var REALTIME_SUBSCRIBE_STATES;
	(function(REALTIME_SUBSCRIBE_STATES) {
		REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
		REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
		REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
		REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
	})(REALTIME_SUBSCRIBE_STATES || (exports.REALTIME_SUBSCRIBE_STATES = REALTIME_SUBSCRIBE_STATES = {}));
	exports.REALTIME_CHANNEL_STATES = constants_1.CHANNEL_STATES;
	exports.default = class RealtimeChannel {
		get state() {
			return this.channelAdapter.state;
		}
		set state(state) {
			this.channelAdapter.state = state;
		}
		get joinedOnce() {
			return this.channelAdapter.joinedOnce;
		}
		get timeout() {
			return this.socket.timeout;
		}
		get joinPush() {
			return this.channelAdapter.joinPush;
		}
		get rejoinTimer() {
			return this.channelAdapter.rejoinTimer;
		}
		constructor(topic, params = { config: {} }, socket) {
			var _a, _b;
			this.topic = topic;
			this.params = params;
			this.socket = socket;
			this.bindings = {};
			this.subTopic = topic.replace(/^realtime:/i, "");
			this.params.config = Object.assign({
				broadcast: {
					ack: false,
					self: false
				},
				presence: {
					key: "",
					enabled: false
				},
				private: false
			}, params.config);
			this.channelAdapter = new channelAdapter_1.default(this.socket.socketAdapter, topic, this.params);
			this.presence = new RealtimePresence_1.default(this);
			this._onClose(() => {
				this.socket._remove(this);
			});
			this._updateFilterTransform();
			this.broadcastEndpointURL = (0, transformers_1.httpEndpointURL)(this.socket.socketAdapter.endPointURL());
			this.private = this.params.config.private || false;
			if (!this.private && ((_b = (_a = this.params.config) === null || _a === void 0 ? void 0 : _a.broadcast) === null || _b === void 0 ? void 0 : _b.replay)) throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
		}
		subscribe(callback, timeout = this.timeout) {
			var _a, _b, _c;
			if (!this.socket.isConnected()) this.socket.connect();
			if (this.channelAdapter.isClosed()) {
				const { config: { broadcast, presence, private: isPrivate } } = this.params;
				const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
				const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
				const accessTokenPayload = {};
				const config = {
					broadcast,
					presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
					postgres_changes,
					private: isPrivate
				};
				if (this.socket.accessTokenValue) accessTokenPayload.access_token = this.socket.accessTokenValue;
				this._onError((reason) => {
					callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, (0, normalizeChannelError_1.normalizeChannelError)(reason));
				});
				this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
				this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
				this._updateFilterMessage();
				this.channelAdapter.subscribe(timeout).receive("ok", async ({ postgres_changes }) => {
					if (!this.socket._isManualToken()) this.socket.setAuth();
					if (postgres_changes === void 0) {
						callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
						return;
					}
					this._updatePostgresBindings(postgres_changes, callback);
				}).receive("error", (error) => {
					this.state = constants_1.CHANNEL_STATES.errored;
					const message = Object.values(error).join(", ") || "error";
					callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(message, { cause: error }));
				}).receive("timeout", () => {
					callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
				});
			}
			return this;
		}
		_updatePostgresBindings(postgres_changes, callback) {
			var _a;
			const clientPostgresBindings = this.bindings.postgres_changes;
			const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
			const newPostgresBindings = [];
			for (let i = 0; i < bindingsLen; i++) {
				const clientPostgresBinding = clientPostgresBindings[i];
				const { filter: { event, schema, table, filter } } = clientPostgresBinding;
				const serverPostgresFilter = postgres_changes && postgres_changes[i];
				if (serverPostgresFilter && serverPostgresFilter.event === event && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.schema, schema) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.table, table) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.filter, filter)) newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
				else {
					this.unsubscribe();
					this.state = constants_1.CHANNEL_STATES.errored;
					callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
					return;
				}
			}
			this.bindings.postgres_changes = newPostgresBindings;
			if (this.state != constants_1.CHANNEL_STATES.errored && callback) callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
		}
		presenceState() {
			return this.presence.state;
		}
		async track(payload, opts = {}) {
			return await this.send({
				type: "presence",
				event: "track",
				payload
			}, opts);
		}
		async untrack(opts = {}) {
			return await this.send({
				type: "presence",
				event: "untrack"
			}, opts);
		}
		on(type, filter, callback) {
			const stateCheck = this.channelAdapter.isJoined() || this.channelAdapter.isJoining();
			const typeCheck = type === REALTIME_LISTEN_TYPES.PRESENCE || type === REALTIME_LISTEN_TYPES.POSTGRES_CHANGES;
			if (stateCheck && typeCheck) {
				this.socket.log("channel", `cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
				throw new Error(`cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
			}
			return this._on(type, filter, callback);
		}
		async httpSend(event, payload, opts = {}) {
			var _a;
			if (payload === void 0 || payload === null) return Promise.reject(new Error("Payload is required for httpSend()"));
			const isBinary = payload instanceof ArrayBuffer || ArrayBuffer.isView(payload);
			const headers = {
				apikey: this.socket.apiKey ? this.socket.apiKey : "",
				"Content-Type": isBinary ? "application/octet-stream" : "application/json"
			};
			if (this.socket.accessTokenValue) headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
			const url = new URL(this.broadcastEndpointURL);
			url.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(event)}`;
			if (this.private) url.searchParams.set("private", "true");
			const options = {
				method: "POST",
				headers,
				body: isBinary ? payload : JSON.stringify(payload)
			};
			const response = await this._fetchWithTimeout(url.toString(), options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
			if (response.status === 202) return { success: true };
			if (response.status === 404) return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
			let errorMessage = response.statusText;
			try {
				const errorBody = await response.json();
				errorMessage = errorBody.error || errorBody.message || errorMessage;
			} catch (_b) {}
			return Promise.reject(new Error(errorMessage));
		}
		async send(args, opts = {}) {
			var _a, _b;
			if (!this.channelAdapter.canPush() && args.type === "broadcast") {
				console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
				const { event, payload: endpoint_payload } = args;
				const headers = {
					apikey: this.socket.apiKey ? this.socket.apiKey : "",
					"Content-Type": "application/json"
				};
				if (this.socket.accessTokenValue) headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
				const options = {
					method: "POST",
					headers,
					body: JSON.stringify({ messages: [{
						topic: this.subTopic,
						event,
						payload: endpoint_payload,
						private: this.private
					}] })
				};
				try {
					const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
					await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
					return response.ok ? "ok" : "error";
				} catch (error) {
					if (error instanceof Error && error.name === "AbortError") return "timed out";
					else return "error";
				}
			} else return new Promise((resolve) => {
				var _a, _b, _c;
				const push = this.channelAdapter.push(args.type, args, opts.timeout || this.timeout);
				if (args.type === "broadcast" && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) resolve("ok");
				push.receive("ok", () => resolve("ok"));
				push.receive("error", () => resolve("error"));
				push.receive("timeout", () => resolve("timed out"));
			});
		}
		updateJoinPayload(payload) {
			this.channelAdapter.updateJoinPayload(payload);
		}
		async unsubscribe(timeout = this.timeout) {
			return new Promise((resolve) => {
				this.channelAdapter.unsubscribe(timeout).receive("ok", () => resolve("ok")).receive("timeout", () => resolve("timed out")).receive("error", () => resolve("error"));
			});
		}
		teardown() {
			this.channelAdapter.teardown();
		}
		async _fetchWithTimeout(url, options, timeout) {
			const controller = new AbortController();
			const id = setTimeout(() => controller.abort(), timeout);
			const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
			clearTimeout(id);
			return response;
		}
		_on(type, filter, callback) {
			const typeLower = type.toLocaleLowerCase();
			const filterValue = filter === null || filter === void 0 ? void 0 : filter.filter;
			if (filterValue instanceof RealtimePostgresFilterBuilder_1.RealtimePostgresFilterBuilder || typeof filterValue === "object" && filterValue !== null && typeof filterValue.build === "function") filter = Object.assign(Object.assign({}, filter), { filter: filterValue.build() });
			const ref = this.channelAdapter.on(type, callback);
			const binding = {
				type: typeLower,
				filter,
				callback,
				ref
			};
			if (this.bindings[typeLower]) this.bindings[typeLower].push(binding);
			else this.bindings[typeLower] = [binding];
			this._updateFilterMessage();
			return this;
		}
		_onClose(callback) {
			this.channelAdapter.onClose(callback);
		}
		_onError(callback) {
			this.channelAdapter.onError(callback);
		}
		_updateFilterMessage() {
			this.channelAdapter.updateFilterBindings((binding, payload, ref) => {
				var _a, _b, _c, _d, _e, _f, _g;
				const typeLower = binding.event.toLocaleLowerCase();
				if (this._notThisChannelEvent(typeLower, ref)) return false;
				const bind = (_a = this.bindings[typeLower]) === null || _a === void 0 ? void 0 : _a.find((bind) => bind.ref === binding.ref);
				if (!bind) return true;
				if ([
					"broadcast",
					"presence",
					"postgres_changes"
				].includes(typeLower)) if ("id" in bind) {
					const bindId = bind.id;
					const bindEvent = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event;
					return bindId && ((_c = payload.ids) === null || _c === void 0 ? void 0 : _c.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_d = payload.data) === null || _d === void 0 ? void 0 : _d.type.toLocaleLowerCase()));
				} else {
					const bindEvent = (_f = (_e = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _e === void 0 ? void 0 : _e.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase();
					return bindEvent === "*" || bindEvent === ((_g = payload === null || payload === void 0 ? void 0 : payload.event) === null || _g === void 0 ? void 0 : _g.toLocaleLowerCase());
				}
				else return bind.type.toLocaleLowerCase() === typeLower;
			});
		}
		_notThisChannelEvent(event, ref) {
			const { close, error, leave, join } = constants_1.CHANNEL_EVENTS;
			return ref && [
				close,
				error,
				leave,
				join
			].includes(event) && ref !== this.joinPush.ref;
		}
		_updateFilterTransform() {
			this.channelAdapter.updatePayloadTransform((event, payload, ref) => {
				if (typeof payload === "object" && "ids" in payload) {
					const postgresChanges = payload.data;
					const { schema, table, commit_timestamp, type, errors } = postgresChanges;
					return Object.assign(Object.assign({}, {
						schema,
						table,
						commit_timestamp,
						eventType: type,
						new: {},
						old: {},
						errors
					}), this._getPayloadRecords(postgresChanges));
				}
				return payload;
			});
		}
		copyBindings(other) {
			if (this.joinedOnce) throw new Error("cannot copy bindings into joined channel");
			for (const kind in other.bindings) for (const binding of other.bindings[kind]) this._on(binding.type, binding.filter, binding.callback);
		}
		static isFilterValueEqual(serverValue, clientValue) {
			return (serverValue !== null && serverValue !== void 0 ? serverValue : void 0) === (clientValue !== null && clientValue !== void 0 ? clientValue : void 0);
		}
		_getPayloadRecords(payload) {
			const records = {
				new: {},
				old: {}
			};
			if (payload.type === "INSERT" || payload.type === "UPDATE") records.new = Transformers.convertChangeData(payload.columns, payload.record);
			if (payload.type === "UPDATE" || payload.type === "DELETE") records.old = Transformers.convertChangeData(payload.columns, payload.old_record);
			return records;
		}
	};
}));
var require_socketAdapter = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const phoenix_1 = require_phoenix_cjs();
	const constants_1 = require_constants$1();
	var SocketAdapter = class {
		constructor(endPoint, options) {
			this.socket = new phoenix_1.Socket(endPoint, options);
		}
		get timeout() {
			return this.socket.timeout;
		}
		get endPoint() {
			return this.socket.endPoint;
		}
		get transport() {
			return this.socket.transport;
		}
		get heartbeatIntervalMs() {
			return this.socket.heartbeatIntervalMs;
		}
		get heartbeatCallback() {
			return this.socket.heartbeatCallback;
		}
		set heartbeatCallback(callback) {
			this.socket.heartbeatCallback = callback;
		}
		get heartbeatTimer() {
			return this.socket.heartbeatTimer;
		}
		get pendingHeartbeatRef() {
			return this.socket.pendingHeartbeatRef;
		}
		get reconnectTimer() {
			return this.socket.reconnectTimer;
		}
		get vsn() {
			return this.socket.vsn;
		}
		get encode() {
			return this.socket.encode;
		}
		get decode() {
			return this.socket.decode;
		}
		get reconnectAfterMs() {
			return this.socket.reconnectAfterMs;
		}
		get sendBuffer() {
			return this.socket.sendBuffer;
		}
		get stateChangeCallbacks() {
			return this.socket.stateChangeCallbacks;
		}
		connect() {
			this.socket.connect();
		}
		disconnect(callback, code, reason, timeout = 1e4) {
			return new Promise((resolve) => {
				setTimeout(() => resolve("timeout"), timeout);
				this.socket.disconnect(() => {
					callback();
					resolve("ok");
				}, code, reason);
			});
		}
		push(data) {
			this.socket.push(data);
		}
		log(kind, msg, data) {
			this.socket.log(kind, msg, data);
		}
		makeRef() {
			return this.socket.makeRef();
		}
		onOpen(callback) {
			this.socket.onOpen(callback);
		}
		onClose(callback) {
			this.socket.onClose(callback);
		}
		onError(callback) {
			this.socket.onError(callback);
		}
		onMessage(callback) {
			this.socket.onMessage(callback);
		}
		isConnected() {
			return this.socket.isConnected();
		}
		isConnecting() {
			return this.socket.connectionState() == constants_1.CONNECTION_STATE.connecting;
		}
		isDisconnecting() {
			return this.socket.connectionState() == constants_1.CONNECTION_STATE.closing;
		}
		connectionState() {
			return this.socket.connectionState();
		}
		endPointURL() {
			return this.socket.endPointURL();
		}
		sendHeartbeat() {
			this.socket.sendHeartbeat();
		}
		getSocket() {
			return this.socket;
		}
	};
	exports.default = SocketAdapter;
}));
var require_RealtimeClient = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	const websocket_factory_1 = tslib_1.__importDefault(require_websocket_factory());
	const constants_1 = require_constants$1();
	const serializer_1 = tslib_1.__importDefault(require_serializer());
	const transformers_1 = require_transformers();
	const RealtimeChannel_1 = tslib_1.__importDefault(require_RealtimeChannel());
	const socketAdapter_1 = tslib_1.__importDefault(require_socketAdapter());
	const CONNECTION_TIMEOUTS = {
		HEARTBEAT_INTERVAL: 25e3,
		RECONNECT_DELAY: 10,
		HEARTBEAT_TIMEOUT_FALLBACK: 100
	};
	const RECONNECT_INTERVALS = [
		1e3,
		2e3,
		5e3,
		1e4
	];
	const DEFAULT_RECONNECT_FALLBACK = 1e4;
	function createMemorySessionStorage() {
		const store = new Map();
		return {
			get length() {
				return store.size;
			},
			clear() {
				store.clear();
			},
			getItem(key) {
				return store.has(key) ? store.get(key) : null;
			},
			key(index) {
				var _a;
				return (_a = Array.from(store.keys())[index]) !== null && _a !== void 0 ? _a : null;
			},
			removeItem(key) {
				store.delete(key);
			},
			setItem(key, value) {
				store.set(key, String(value));
			}
		};
	}
	function resolveSessionStorage() {
		try {
			if (typeof globalThis !== "undefined" && globalThis.sessionStorage) return globalThis.sessionStorage;
		} catch (_a) {}
		return createMemorySessionStorage();
	}
	const WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
	var RealtimeClient = class {
		get endPoint() {
			return this.socketAdapter.endPoint;
		}
		get timeout() {
			return this.socketAdapter.timeout;
		}
		get transport() {
			return this.socketAdapter.transport;
		}
		get heartbeatCallback() {
			return this.socketAdapter.heartbeatCallback;
		}
		get heartbeatIntervalMs() {
			return this.socketAdapter.heartbeatIntervalMs;
		}
		get heartbeatTimer() {
			if (this.worker) return this._workerHeartbeatTimer;
			return this.socketAdapter.heartbeatTimer;
		}
		get pendingHeartbeatRef() {
			if (this.worker) return this._pendingWorkerHeartbeatRef;
			return this.socketAdapter.pendingHeartbeatRef;
		}
		get reconnectTimer() {
			return this.socketAdapter.reconnectTimer;
		}
		get vsn() {
			return this.socketAdapter.vsn;
		}
		get encode() {
			return this.socketAdapter.encode;
		}
		get decode() {
			return this.socketAdapter.decode;
		}
		get reconnectAfterMs() {
			return this.socketAdapter.reconnectAfterMs;
		}
		get sendBuffer() {
			return this.socketAdapter.sendBuffer;
		}
		get stateChangeCallbacks() {
			return this.socketAdapter.stateChangeCallbacks;
		}
		constructor(endPoint, options) {
			var _a;
			this.channels = new Array();
			this.accessTokenValue = null;
			this.accessToken = null;
			this.apiKey = null;
			this.httpEndpoint = "";
			this.headers = {};
			this.params = {};
			this.ref = 0;
			this.serializer = new serializer_1.default();
			this._manuallySetToken = false;
			this._authPromise = null;
			this._workerHeartbeatTimer = void 0;
			this._pendingWorkerHeartbeatRef = null;
			this._pendingDisconnectTimer = null;
			this._disconnectOnEmptyChannelsAfterMs = 0;
			this._resolveFetch = (customFetch) => {
				if (customFetch) return (...args) => customFetch(...args);
				return (...args) => fetch(...args);
			};
			if (!((_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey)) throw new Error("API key is required to connect to Realtime");
			this.apiKey = options.params.apikey;
			const socketAdapterOptions = this._initializeOptions(options);
			this.socketAdapter = new socketAdapter_1.default(endPoint, socketAdapterOptions);
			this.httpEndpoint = (0, transformers_1.httpEndpointURL)(endPoint);
			this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
		}
		connect() {
			if (this.isConnecting() || this.isDisconnecting() || this.isConnected()) return;
			if (this.accessToken && !this._authPromise) this._setAuthSafely("connect");
			this._setupConnectionHandlers();
			try {
				this.socketAdapter.connect();
			} catch (error) {
				const errorMessage = error.message;
				throw new Error(`WebSocket not available: ${errorMessage}`);
			}
			this._handleNodeJsRaceCondition();
		}
		endpointURL() {
			return this.socketAdapter.endPointURL();
		}
		async disconnect(code, reason) {
			this._cancelPendingDisconnect();
			if (this.isDisconnecting()) return "ok";
			return await this.socketAdapter.disconnect(() => {
				clearInterval(this._workerHeartbeatTimer);
				this._terminateWorker();
			}, code, reason);
		}
		getChannels() {
			return this.channels;
		}
		async removeChannel(channel) {
			const status = await channel.unsubscribe();
			if (status === "ok") channel.teardown();
			return status;
		}
		async removeAllChannels() {
			const promises = this.channels.map(async (channel) => {
				const result = await channel.unsubscribe();
				channel.teardown();
				return result;
			});
			const result = await Promise.all(promises);
			await this.disconnect();
			return result;
		}
		log(kind, msg, data) {
			this.socketAdapter.log(kind, msg, data);
		}
		connectionState() {
			return this.socketAdapter.connectionState() || constants_1.CONNECTION_STATE.closed;
		}
		isConnected() {
			return this.socketAdapter.isConnected();
		}
		isConnecting() {
			return this.socketAdapter.isConnecting();
		}
		isDisconnecting() {
			return this.socketAdapter.isDisconnecting();
		}
		channel(topic, params = { config: {} }) {
			const realtimeTopic = `realtime:${topic}`;
			const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
			if (!exists) {
				const chan = new RealtimeChannel_1.default(`realtime:${topic}`, params, this);
				this._cancelPendingDisconnect();
				this.channels.push(chan);
				return chan;
			} else return exists;
		}
		push(data) {
			this.socketAdapter.push(data);
		}
		async setAuth(token = null) {
			this._authPromise = this._performAuth(token);
			try {
				await this._authPromise;
			} finally {
				this._authPromise = null;
			}
		}
		_isManualToken() {
			return this._manuallySetToken;
		}
		async sendHeartbeat() {
			this.socketAdapter.sendHeartbeat();
		}
		onHeartbeat(callback) {
			this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(callback);
		}
		_makeRef() {
			return this.socketAdapter.makeRef();
		}
		_remove(channel) {
			this.channels = this.channels.filter((c) => c.topic !== channel.topic);
			if (this.channels.length === 0) {
				this.log("transport", "no channels remaining, scheduling disconnect");
				this._schedulePendingDisconnect();
			}
		}
		_schedulePendingDisconnect() {
			this._cancelPendingDisconnect();
			if (this._disconnectOnEmptyChannelsAfterMs === 0) {
				this.log("transport", "disconnecting immediately - no channels");
				this.disconnect();
				return;
			}
			this._pendingDisconnectTimer = setTimeout(() => {
				this._pendingDisconnectTimer = null;
				if (this.channels.length === 0) {
					this.log("transport", "deferred disconnect fired - no channels, disconnecting");
					this.disconnect();
				}
			}, this._disconnectOnEmptyChannelsAfterMs);
			this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
		}
		_cancelPendingDisconnect() {
			if (this._pendingDisconnectTimer !== null) {
				this.log("transport", "pending disconnect cancelled - channel activity detected");
				clearTimeout(this._pendingDisconnectTimer);
				this._pendingDisconnectTimer = null;
			}
		}
		async _performAuth(token = null) {
			let tokenToSend;
			let isManualToken = false;
			if (token) {
				tokenToSend = token;
				isManualToken = true;
			} else if (this.accessToken) try {
				tokenToSend = await this.accessToken();
			} catch (e) {
				this.log("error", "Error fetching access token from callback", e);
				tokenToSend = this.accessTokenValue;
			}
			else tokenToSend = this.accessTokenValue;
			if (isManualToken) this._manuallySetToken = true;
			else if (this.accessToken) this._manuallySetToken = false;
			if (this.accessTokenValue != tokenToSend) {
				this.accessTokenValue = tokenToSend;
				this.channels.forEach((channel) => {
					const payload = {
						access_token: tokenToSend,
						version: constants_1.DEFAULT_VERSION
					};
					tokenToSend && channel.updateJoinPayload(payload);
					if (channel.joinedOnce && channel.channelAdapter.isJoined()) channel.channelAdapter.push(constants_1.CHANNEL_EVENTS.access_token, { access_token: tokenToSend });
				});
			}
		}
		async _waitForAuthIfNeeded() {
			if (this._authPromise) await this._authPromise;
		}
		_setAuthSafely(context = "general") {
			if (!this._isManualToken()) this.setAuth().catch((e) => {
				this.log("error", `Error setting auth in ${context}`, e);
			});
		}
		_setupConnectionHandlers() {
			this.socketAdapter.onOpen(() => {
				(this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch((e) => {
					this.log("error", "error waiting for auth on connect", e);
				});
				if (this.worker && !this.workerRef) this._startWorkerHeartbeat();
			});
			this.socketAdapter.onClose(() => {
				if (this.worker && this.workerRef) this._terminateWorker();
			});
			this.socketAdapter.onMessage((message) => {
				if (message.ref && message.ref === this._pendingWorkerHeartbeatRef) this._pendingWorkerHeartbeatRef = null;
			});
		}
		_handleNodeJsRaceCondition() {
			if (this.socketAdapter.isConnected()) this.socketAdapter.getSocket().onConnOpen();
		}
		_wrapHeartbeatCallback(heartbeatCallback) {
			return (status, latency) => {
				if (status === "disconnected") return;
				if (status == "sent") this._setAuthSafely();
				if (heartbeatCallback) heartbeatCallback(status, latency);
			};
		}
		_startWorkerHeartbeat() {
			if (this.workerUrl) this.log("worker", `starting worker for from ${this.workerUrl}`);
			else this.log("worker", `starting default worker`);
			const objectUrl = this._workerObjectUrl(this.workerUrl);
			this.workerRef = new Worker(objectUrl);
			this.workerRef.onerror = (error) => {
				this.log("worker", "worker error", error.message);
				this._terminateWorker();
				this.disconnect();
			};
			this.workerRef.onmessage = (event) => {
				if (event.data.event === "keepAlive") this.sendHeartbeat();
			};
			this.workerRef.postMessage({
				event: "start",
				interval: this.heartbeatIntervalMs
			});
		}
		_terminateWorker() {
			if (this.workerRef) {
				this.log("worker", "terminating worker");
				this.workerRef.terminate();
				this.workerRef = void 0;
			}
		}
		_workerObjectUrl(url) {
			let result_url;
			if (url) result_url = url;
			else {
				const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
				result_url = URL.createObjectURL(blob);
			}
			return result_url;
		}
		_initializeOptions(options) {
			var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
			this.worker = (_a = options === null || options === void 0 ? void 0 : options.worker) !== null && _a !== void 0 ? _a : false;
			this.accessToken = (_b = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _b !== void 0 ? _b : null;
			const result = {};
			result.timeout = (_c = options === null || options === void 0 ? void 0 : options.timeout) !== null && _c !== void 0 ? _c : constants_1.DEFAULT_TIMEOUT;
			result.heartbeatIntervalMs = (_d = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _d !== void 0 ? _d : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
			this._disconnectOnEmptyChannelsAfterMs = (_e = options === null || options === void 0 ? void 0 : options.disconnectOnEmptyChannelsAfterMs) !== null && _e !== void 0 ? _e : 2 * ((_f = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _f !== void 0 ? _f : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL);
			result.transport = (_g = options === null || options === void 0 ? void 0 : options.transport) !== null && _g !== void 0 ? _g : websocket_factory_1.default.getWebSocketConstructor();
			result.params = options === null || options === void 0 ? void 0 : options.params;
			result.logger = options === null || options === void 0 ? void 0 : options.logger;
			result.heartbeatCallback = this._wrapHeartbeatCallback(options === null || options === void 0 ? void 0 : options.heartbeatCallback);
			result.sessionStorage = (_h = options === null || options === void 0 ? void 0 : options.sessionStorage) !== null && _h !== void 0 ? _h : resolveSessionStorage();
			result.reconnectAfterMs = (_j = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _j !== void 0 ? _j : ((tries) => {
				return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
			});
			let defaultEncode;
			let defaultDecode;
			const vsn = (_k = options === null || options === void 0 ? void 0 : options.vsn) !== null && _k !== void 0 ? _k : constants_1.DEFAULT_VSN;
			switch (vsn) {
				case constants_1.VSN_1_0_0:
					defaultEncode = (payload, callback) => {
						return callback(JSON.stringify(payload));
					};
					defaultDecode = (payload, callback) => {
						return callback(JSON.parse(payload));
					};
					break;
				case constants_1.VSN_2_0_0:
					defaultEncode = this.serializer.encode.bind(this.serializer);
					defaultDecode = this.serializer.decode.bind(this.serializer);
					break;
				default: throw new Error(`Unsupported serializer version: ${result.vsn}`);
			}
			result.vsn = vsn;
			result.encode = (_l = options === null || options === void 0 ? void 0 : options.encode) !== null && _l !== void 0 ? _l : defaultEncode;
			result.decode = (_m = options === null || options === void 0 ? void 0 : options.decode) !== null && _m !== void 0 ? _m : defaultDecode;
			result.beforeReconnect = this._reconnectAuth.bind(this);
			if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
				this.logLevel = options.logLevel || options.log_level;
				result.params = Object.assign(Object.assign({}, result.params), { log_level: this.logLevel });
			}
			if (this.worker) {
				if (typeof window !== "undefined" && !window.Worker) throw new Error("Web Worker is not supported");
				this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
				result.autoSendHeartbeat = !this.worker;
			}
			return result;
		}
		async _reconnectAuth() {
			await this._waitForAuthIfNeeded();
			if (!this.isConnected()) this.connect();
		}
	};
	exports.default = RealtimeClient;
}));
var import_main$1 = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebSocketFactory = exports.REALTIME_CHANNEL_STATES = exports.REALTIME_SUBSCRIBE_STATES = exports.REALTIME_PRESENCE_LISTEN_EVENTS = exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = exports.REALTIME_LISTEN_TYPES = exports.postgresChangesFilter = exports.RealtimePostgresFilterBuilder = exports.RealtimeClient = exports.RealtimeChannel = exports.RealtimePresence = void 0;
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	exports.RealtimeClient = tslib_1.__importDefault(require_RealtimeClient()).default;
	const RealtimeChannel_1 = tslib_1.__importStar(require_RealtimeChannel());
	exports.RealtimeChannel = RealtimeChannel_1.default;
	Object.defineProperty(exports, "RealtimePostgresFilterBuilder", {
		enumerable: true,
		get: function() {
			return RealtimeChannel_1.RealtimePostgresFilterBuilder;
		}
	});
	Object.defineProperty(exports, "postgresChangesFilter", {
		enumerable: true,
		get: function() {
			return RealtimeChannel_1.postgresChangesFilter;
		}
	});
	Object.defineProperty(exports, "REALTIME_LISTEN_TYPES", {
		enumerable: true,
		get: function() {
			return RealtimeChannel_1.REALTIME_LISTEN_TYPES;
		}
	});
	Object.defineProperty(exports, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", {
		enumerable: true,
		get: function() {
			return RealtimeChannel_1.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
		}
	});
	Object.defineProperty(exports, "REALTIME_SUBSCRIBE_STATES", {
		enumerable: true,
		get: function() {
			return RealtimeChannel_1.REALTIME_SUBSCRIBE_STATES;
		}
	});
	Object.defineProperty(exports, "REALTIME_CHANNEL_STATES", {
		enumerable: true,
		get: function() {
			return RealtimeChannel_1.REALTIME_CHANNEL_STATES;
		}
	});
	const RealtimePresence_1 = tslib_1.__importStar(require_RealtimePresence());
	exports.RealtimePresence = RealtimePresence_1.default;
	Object.defineProperty(exports, "REALTIME_PRESENCE_LISTEN_EVENTS", {
		enumerable: true,
		get: function() {
			return RealtimePresence_1.REALTIME_PRESENCE_LISTEN_EVENTS;
		}
	});
	exports.WebSocketFactory = tslib_1.__importDefault(require_websocket_factory()).default;
}))();
var IcebergError = class extends Error {
	constructor(message, opts) {
		super(message);
		this.name = "IcebergError";
		this.status = opts.status;
		this.icebergType = opts.icebergType;
		this.icebergCode = opts.icebergCode;
		this.details = opts.details;
		this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [
			500,
			502,
			504
		].includes(opts.status) && opts.icebergType?.includes("CommitState") === true;
	}
	isNotFound() {
		return this.status === 404;
	}
	isConflict() {
		return this.status === 409;
	}
	isAuthenticationTimeout() {
		return this.status === 419;
	}
};
function buildUrl(baseUrl, path, query) {
	const url = new URL(path, baseUrl);
	if (query) {
		for (const [key, value] of Object.entries(query)) if (value !== void 0) url.searchParams.set(key, value);
	}
	return url.toString();
}
async function buildAuthHeaders(auth) {
	if (!auth || auth.type === "none") return {};
	if (auth.type === "bearer") return { Authorization: `Bearer ${auth.token}` };
	if (auth.type === "header") return { [auth.name]: auth.value };
	if (auth.type === "custom") return await auth.getHeaders();
	return {};
}
function createFetchClient(options) {
	const fetchFn = options.fetchImpl ?? globalThis.fetch;
	return { async request({ method, path, query, body, headers }) {
		const url = buildUrl(options.baseUrl, path, query);
		const authHeaders = await buildAuthHeaders(options.auth);
		const res = await fetchFn(url, {
			method,
			headers: {
				...body ? { "Content-Type": "application/json" } : {},
				...authHeaders,
				...headers
			},
			body: body ? JSON.stringify(body) : void 0
		});
		const text = await res.text();
		const isJson = (res.headers.get("content-type") || "").includes("application/json");
		const data = isJson && text ? JSON.parse(text) : text;
		if (!res.ok) {
			const errBody = isJson ? data : void 0;
			const errorDetail = errBody?.error;
			throw new IcebergError(errorDetail?.message ?? `Request failed with status ${res.status}`, {
				status: res.status,
				icebergType: errorDetail?.type,
				icebergCode: errorDetail?.code,
				details: errBody
			});
		}
		return {
			status: res.status,
			headers: res.headers,
			data
		};
	} };
}
function namespaceToPath(namespace) {
	return namespace.join("");
}
var NamespaceOperations = class {
	constructor(client, prefix = "") {
		this.client = client;
		this.prefix = prefix;
	}
	async listNamespaces(parent) {
		const query = parent ? { parent: namespaceToPath(parent.namespace) } : void 0;
		return (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces`,
			query
		})).data.namespaces.map((ns) => ({ namespace: ns }));
	}
	async createNamespace(id, metadata) {
		const request = {
			namespace: id.namespace,
			properties: metadata?.properties
		};
		return (await this.client.request({
			method: "POST",
			path: `${this.prefix}/namespaces`,
			body: request
		})).data;
	}
	async dropNamespace(id) {
		await this.client.request({
			method: "DELETE",
			path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
		});
	}
	async loadNamespaceMetadata(id) {
		return { properties: (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
		})).data.properties };
	}
	async namespaceExists(id) {
		try {
			await this.client.request({
				method: "HEAD",
				path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
			});
			return true;
		} catch (error) {
			if (error instanceof IcebergError && error.status === 404) return false;
			throw error;
		}
	}
	async createNamespaceIfNotExists(id, metadata) {
		try {
			return await this.createNamespace(id, metadata);
		} catch (error) {
			if (error instanceof IcebergError && error.status === 409) return;
			throw error;
		}
	}
};
function namespaceToPath2(namespace) {
	return namespace.join("");
}
var TableOperations = class {
	constructor(client, prefix = "", accessDelegation) {
		this.client = client;
		this.prefix = prefix;
		this.accessDelegation = accessDelegation;
	}
	async listTables(namespace) {
		return (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`
		})).data.identifiers;
	}
	async createTable(namespace, request) {
		const headers = {};
		if (this.accessDelegation) headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
		return (await this.client.request({
			method: "POST",
			path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`,
			body: request,
			headers
		})).data.metadata;
	}
	async updateTable(id, request) {
		const response = await this.client.request({
			method: "POST",
			path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
			body: request
		});
		return {
			"metadata-location": response.data["metadata-location"],
			metadata: response.data.metadata
		};
	}
	async dropTable(id, options) {
		await this.client.request({
			method: "DELETE",
			path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
			query: { purgeRequested: String(options?.purge ?? false) }
		});
	}
	async loadTable(id) {
		const headers = {};
		if (this.accessDelegation) headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
		return (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
			headers
		})).data.metadata;
	}
	async tableExists(id) {
		const headers = {};
		if (this.accessDelegation) headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
		try {
			await this.client.request({
				method: "HEAD",
				path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
				headers
			});
			return true;
		} catch (error) {
			if (error instanceof IcebergError && error.status === 404) return false;
			throw error;
		}
	}
	async createTableIfNotExists(namespace, request) {
		try {
			return await this.createTable(namespace, request);
		} catch (error) {
			if (error instanceof IcebergError && error.status === 409) return await this.loadTable({
				namespace: namespace.namespace,
				name: request.name
			});
			throw error;
		}
	}
};
var IcebergRestCatalog = class {
	constructor(options) {
		let prefix = "v1";
		if (options.catalogName) prefix += `/${options.catalogName}`;
		const baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl : `${options.baseUrl}/`;
		this.client = createFetchClient({
			baseUrl,
			auth: options.auth,
			fetchImpl: options.fetch
		});
		this.accessDelegation = options.accessDelegation?.join(",");
		this.namespaceOps = new NamespaceOperations(this.client, prefix);
		this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
	}
	async listNamespaces(parent) {
		return this.namespaceOps.listNamespaces(parent);
	}
	async createNamespace(id, metadata) {
		return this.namespaceOps.createNamespace(id, metadata);
	}
	async dropNamespace(id) {
		await this.namespaceOps.dropNamespace(id);
	}
	async loadNamespaceMetadata(id) {
		return this.namespaceOps.loadNamespaceMetadata(id);
	}
	async listTables(namespace) {
		return this.tableOps.listTables(namespace);
	}
	async createTable(namespace, request) {
		return this.tableOps.createTable(namespace, request);
	}
	async updateTable(id, request) {
		return this.tableOps.updateTable(id, request);
	}
	async dropTable(id, options) {
		await this.tableOps.dropTable(id, options);
	}
	async loadTable(id) {
		return this.tableOps.loadTable(id);
	}
	async namespaceExists(id) {
		return this.namespaceOps.namespaceExists(id);
	}
	async tableExists(id) {
		return this.tableOps.tableExists(id);
	}
	async createNamespaceIfNotExists(id, metadata) {
		return this.namespaceOps.createNamespaceIfNotExists(id, metadata);
	}
	async createTableIfNotExists(namespace, request) {
		return this.tableOps.createTableIfNotExists(namespace, request);
	}
};
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$1(o);
}
function toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey$1(t) {
	var i = toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _defineProperty$1(e, r, t) {
	return (r = toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
var StorageError = class extends Error {
	constructor(message, namespace = "storage", status, statusCode) {
		super(message);
		this.__isStorageError = true;
		this.namespace = namespace;
		this.name = namespace === "vectors" ? "StorageVectorsError" : "StorageError";
		this.status = status;
		this.statusCode = statusCode;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			statusCode: this.statusCode
		};
	}
};
function isStorageError(error) {
	return typeof error === "object" && error !== null && "__isStorageError" in error;
}
var StorageApiError = class extends StorageError {
	constructor(message, status, statusCode, namespace = "storage") {
		super(message, namespace, status, statusCode);
		this.name = namespace === "vectors" ? "StorageVectorsApiError" : "StorageApiError";
		this.status = status;
		this.statusCode = statusCode;
	}
	toJSON() {
		return _objectSpread2$1({}, super.toJSON());
	}
};
var StorageUnknownError = class extends StorageError {
	constructor(message, originalError, namespace = "storage") {
		super(message, namespace);
		this.name = namespace === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError";
		this.originalError = originalError;
	}
};
function setHeader(headers, name, value) {
	const result = _objectSpread2$1({}, headers);
	const nameLower = name.toLowerCase();
	for (const key of Object.keys(result)) if (key.toLowerCase() === nameLower) delete result[key];
	result[nameLower] = value;
	return result;
}
function normalizeHeaders$1(headers) {
	const result = {};
	for (const [key, value] of Object.entries(headers)) result[key.toLowerCase()] = value;
	return result;
}
const resolveFetch$1 = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
const isPlainObject = (value) => {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
const recursiveToCamel = (item) => {
	if (Array.isArray(item)) return item.map((el) => recursiveToCamel(el));
	else if (typeof item === "function" || item !== Object(item)) return item;
	const result = {};
	Object.entries(item).forEach(([key, value]) => {
		const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
		result[newKey] = recursiveToCamel(value);
	});
	return result;
};
const isValidBucketName = (bucketName) => {
	if (!bucketName || typeof bucketName !== "string") return false;
	if (bucketName.length === 0 || bucketName.length > 100) return false;
	if (bucketName.trim() !== bucketName) return false;
	if (bucketName.includes("/") || bucketName.includes("\\")) return false;
	return /^[\w!.\*'() &$@=;:+,?-]+$/.test(bucketName);
};
const encodeStoragePath = (path) => path.split("/").map(encodeURIComponent).join("/");
const _getErrorMessage = (err) => {
	if (typeof err === "object" && err !== null) {
		const e = err;
		if (typeof e.msg === "string") return e.msg;
		if (typeof e.message === "string") return e.message;
		if (typeof e.error_description === "string") return e.error_description;
		if (typeof e.error === "string") return e.error;
		if (typeof e.error === "object" && e.error !== null) {
			const nested = e.error;
			if (typeof nested.message === "string") return nested.message;
		}
	}
	return JSON.stringify(err);
};
const handleError = async (error, reject, options, namespace) => {
	if (error !== null && typeof error === "object" && "json" in error && typeof error.json === "function") {
		const responseError = error;
		let status = parseInt(String(responseError.status), 10);
		if (!Number.isFinite(status)) status = 500;
		responseError.json().then((err) => {
			const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.code) || status + "";
			reject(new StorageApiError(_getErrorMessage(err), status, statusCode, namespace));
		}).catch(() => {
			const statusCode = status + "";
			reject(new StorageApiError(responseError.statusText || `HTTP ${status} error`, status, statusCode, namespace));
		});
	} else reject(new StorageUnknownError(_getErrorMessage(error), error, namespace));
};
const _getRequestParams = (method, options, parameters, body) => {
	const params = {
		method,
		headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
	};
	if (method === "GET" || method === "HEAD" || !body) return _objectSpread2$1(_objectSpread2$1({}, params), parameters);
	if (isPlainObject(body)) {
		var _contentType;
		const headers = (options === null || options === void 0 ? void 0 : options.headers) || {};
		let contentType;
		for (const [key, value] of Object.entries(headers)) if (key.toLowerCase() === "content-type") contentType = value;
		params.headers = setHeader(headers, "Content-Type", (_contentType = contentType) !== null && _contentType !== void 0 ? _contentType : "application/json");
		params.body = JSON.stringify(body);
	} else params.body = body;
	if (options === null || options === void 0 ? void 0 : options.duplex) params.duplex = options.duplex;
	return _objectSpread2$1(_objectSpread2$1({}, params), parameters);
};
async function _handleRequest(fetcher, method, url, options, parameters, body, namespace) {
	return new Promise((resolve, reject) => {
		fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
			if (!result.ok) throw result;
			if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
			if (namespace === "vectors") {
				const contentType = result.headers.get("content-type");
				if (result.headers.get("content-length") === "0" || result.status === 204) return {};
				if (!contentType || !contentType.includes("application/json")) return {};
			}
			return result.json();
		}).then((data) => resolve(data)).catch((error) => handleError(error, reject, options, namespace));
	});
}
function createFetchApi(namespace = "storage") {
	return {
		get: async (fetcher, url, options, parameters) => {
			return _handleRequest(fetcher, "GET", url, options, parameters, void 0, namespace);
		},
		post: async (fetcher, url, body, options, parameters) => {
			return _handleRequest(fetcher, "POST", url, options, parameters, body, namespace);
		},
		put: async (fetcher, url, body, options, parameters) => {
			return _handleRequest(fetcher, "PUT", url, options, parameters, body, namespace);
		},
		head: async (fetcher, url, options, parameters) => {
			return _handleRequest(fetcher, "HEAD", url, _objectSpread2$1(_objectSpread2$1({}, options), {}, { noResolveJson: true }), parameters, void 0, namespace);
		},
		remove: async (fetcher, url, body, options, parameters) => {
			return _handleRequest(fetcher, "DELETE", url, options, parameters, body, namespace);
		}
	};
}
const { get, post, put, head, remove } = createFetchApi("storage");
const vectorsApi = createFetchApi("vectors");
var BaseApiClient = class {
	constructor(url, headers = {}, fetch$1, namespace = "storage") {
		this.shouldThrowOnError = false;
		this.url = url;
		this.headers = normalizeHeaders$1(headers);
		this.fetch = resolveFetch$1(fetch$1);
		this.namespace = namespace;
	}
	throwOnError() {
		this.shouldThrowOnError = true;
		return this;
	}
	setHeader(name, value) {
		this.headers = setHeader(this.headers, name, value);
		return this;
	}
	async handleOperation(operation) {
		var _this = this;
		try {
			return {
				data: await operation(),
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
let _Symbol$toStringTag$1;
_Symbol$toStringTag$1 = Symbol.toStringTag;
var StreamDownloadBuilder = class {
	constructor(downloadFn, shouldThrowOnError) {
		this.downloadFn = downloadFn;
		this.shouldThrowOnError = shouldThrowOnError;
		this[_Symbol$toStringTag$1] = "StreamDownloadBuilder";
		this.promise = null;
	}
	then(onfulfilled, onrejected) {
		return this.getPromise().then(onfulfilled, onrejected);
	}
	catch(onrejected) {
		return this.getPromise().catch(onrejected);
	}
	finally(onfinally) {
		return this.getPromise().finally(onfinally);
	}
	getPromise() {
		if (!this.promise) this.promise = this.execute();
		return this.promise;
	}
	async execute() {
		var _this = this;
		try {
			return {
				data: (await _this.downloadFn()).body,
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
let _Symbol$toStringTag;
_Symbol$toStringTag = Symbol.toStringTag;
var BlobDownloadBuilder = class {
	constructor(downloadFn, shouldThrowOnError) {
		this.downloadFn = downloadFn;
		this.shouldThrowOnError = shouldThrowOnError;
		this[_Symbol$toStringTag] = "BlobDownloadBuilder";
		this.promise = null;
	}
	asStream() {
		return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
	}
	then(onfulfilled, onrejected) {
		return this.getPromise().then(onfulfilled, onrejected);
	}
	catch(onrejected) {
		return this.getPromise().catch(onrejected);
	}
	finally(onfinally) {
		return this.getPromise().finally(onfinally);
	}
	getPromise() {
		if (!this.promise) this.promise = this.execute();
		return this.promise;
	}
	async execute() {
		var _this = this;
		try {
			return {
				data: await (await _this.downloadFn()).blob(),
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
const DEFAULT_SEARCH_OPTIONS = {
	limit: 100,
	offset: 0,
	sortBy: {
		column: "name",
		order: "asc"
	}
};
const DEFAULT_FILE_OPTIONS = {
	cacheControl: "3600",
	contentType: "text/plain;charset=UTF-8",
	upsert: false
};
var StorageFileApi = class extends BaseApiClient {
	constructor(url, headers = {}, bucketId, fetch$1) {
		super(url, headers, fetch$1, "storage");
		this.bucketId = bucketId;
	}
	async uploadOrUpdate(method, path, fileBody, fileOptions) {
		var _this = this;
		return _this.handleOperation(async () => {
			let body;
			const options = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_FILE_OPTIONS), fileOptions);
			let headers = _objectSpread2$1(_objectSpread2$1({}, _this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
			const metadata = options.metadata;
			if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
				body = new FormData();
				body.append("cacheControl", options.cacheControl);
				if (metadata) body.append("metadata", _this.encodeMetadata(metadata));
				body.append("", fileBody);
			} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
				body = fileBody;
				if (!body.has("cacheControl")) body.append("cacheControl", options.cacheControl);
				if (metadata && !body.has("metadata")) body.append("metadata", _this.encodeMetadata(metadata));
			} else {
				body = fileBody;
				headers["cache-control"] = `max-age=${options.cacheControl}`;
				headers["content-type"] = options.contentType;
				if (metadata) headers["x-metadata"] = _this.toBase64(_this.encodeMetadata(metadata));
				if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") && !options.duplex) options.duplex = "half";
			}
			if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) for (const [key, value] of Object.entries(fileOptions.headers)) headers = setHeader(headers, key, value);
			const cleanPath = _this._removeEmptyFolders(path);
			const _path = _this._getFinalPath(cleanPath);
			const data = await (method == "PUT" ? put : post)(_this.fetch, `${_this.url}/object/${_path}`, body, _objectSpread2$1({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}));
			return {
				path: cleanPath,
				id: data.Id,
				fullPath: data.Key
			};
		});
	}
	async upload(path, fileBody, fileOptions) {
		return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
	}
	async uploadToSignedUrl(path, token, fileBody, fileOptions) {
		var _this3 = this;
		const cleanPath = _this3._removeEmptyFolders(path);
		const _path = _this3._getFinalPath(cleanPath);
		const url = new URL(_this3.url + `/object/upload/sign/${_path}`);
		url.searchParams.set("token", token);
		return _this3.handleOperation(async () => {
			let body;
			const options = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_FILE_OPTIONS), fileOptions);
			let headers = _objectSpread2$1(_objectSpread2$1({}, _this3.headers), { "x-upsert": String(options.upsert) });
			const metadata = options.metadata;
			if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
				body = new FormData();
				body.append("cacheControl", options.cacheControl);
				if (metadata) body.append("metadata", _this3.encodeMetadata(metadata));
				body.append("", fileBody);
			} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
				body = fileBody;
				if (!body.has("cacheControl")) body.append("cacheControl", options.cacheControl);
				if (metadata && !body.has("metadata")) body.append("metadata", _this3.encodeMetadata(metadata));
			} else {
				body = fileBody;
				headers["cache-control"] = `max-age=${options.cacheControl}`;
				headers["content-type"] = options.contentType;
				if (metadata) headers["x-metadata"] = _this3.toBase64(_this3.encodeMetadata(metadata));
				if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") && !options.duplex) options.duplex = "half";
			}
			if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) for (const [key, value] of Object.entries(fileOptions.headers)) headers = setHeader(headers, key, value);
			return {
				path: cleanPath,
				fullPath: (await put(_this3.fetch, url.toString(), body, _objectSpread2$1({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}))).Key
			};
		});
	}
	async createSignedUploadUrl(path, options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			let _path = _this4._getFinalPath(path);
			const headers = _objectSpread2$1({}, _this4.headers);
			if (options === null || options === void 0 ? void 0 : options.upsert) headers["x-upsert"] = "true";
			const data = await post(_this4.fetch, `${_this4.url}/object/upload/sign/${_path}`, {}, { headers });
			const url = new URL(_this4.url + data.url);
			const token = url.searchParams.get("token");
			if (!token) throw new StorageError("No token returned by API");
			return {
				signedUrl: url.toString(),
				path,
				token
			};
		});
	}
	async update(path, fileBody, fileOptions) {
		return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
	}
	async move(fromPath, toPath, options) {
		var _this6 = this;
		return _this6.handleOperation(async () => {
			return await post(_this6.fetch, `${_this6.url}/object/move`, {
				bucketId: _this6.bucketId,
				sourceKey: fromPath,
				destinationKey: toPath,
				destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
			}, { headers: _this6.headers });
		});
	}
	async copy(fromPath, toPath, options) {
		var _this7 = this;
		return _this7.handleOperation(async () => {
			return { path: (await post(_this7.fetch, `${_this7.url}/object/copy`, {
				bucketId: _this7.bucketId,
				sourceKey: fromPath,
				destinationKey: toPath,
				destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
			}, { headers: _this7.headers })).Key };
		});
	}
	async createSignedUrl(path, expiresIn, options) {
		var _this8 = this;
		return _this8.handleOperation(async () => {
			let _path = _this8._getFinalPath(path);
			const hasTransform = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0;
			let data = await post(_this8.fetch, `${_this8.url}/object/sign/${_path}`, _objectSpread2$1({ expiresIn }, hasTransform ? { transform: options.transform } : {}), { headers: _this8.headers });
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
			if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
			const queryString = query.toString();
			return { signedUrl: encodeURI(`${_this8.url}${data.signedURL}${queryString ? `&${queryString}` : ""}`) };
		});
	}
	async createSignedUrls(paths, expiresIn, options) {
		var _this9 = this;
		return _this9.handleOperation(async () => {
			const data = await post(_this9.fetch, `${_this9.url}/object/sign/${_this9.bucketId}`, {
				expiresIn,
				paths
			}, { headers: _this9.headers });
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
			if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
			const queryString = query.toString();
			return data.map((datum) => _objectSpread2$1(_objectSpread2$1({}, datum), {}, { signedUrl: datum.signedURL ? encodeURI(`${_this9.url}${datum.signedURL}${queryString ? `&${queryString}` : ""}`) : null }));
		});
	}
	download(path, options, parameters) {
		const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image/authenticated" : "object";
		const query = new URLSearchParams();
		if (options === null || options === void 0 ? void 0 : options.transform) this.applyTransformOptsToQuery(query, options.transform);
		if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
		const queryString = query.toString();
		const _path = this._getFinalPath(path);
		const downloadFn = () => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString ? `?${queryString}` : ""}`, {
			headers: this.headers,
			noResolveJson: true
		}, parameters);
		return new BlobDownloadBuilder(downloadFn, this.shouldThrowOnError);
	}
	async info(path) {
		var _this10 = this;
		const _path = _this10._getFinalPath(path);
		return _this10.handleOperation(async () => {
			return recursiveToCamel(await get(_this10.fetch, `${_this10.url}/object/info/${_path}`, { headers: _this10.headers }));
		});
	}
	async exists(path) {
		var _this11 = this;
		const _path = _this11._getFinalPath(path);
		try {
			await head(_this11.fetch, `${_this11.url}/object/${_path}`, { headers: _this11.headers });
			return {
				data: true,
				error: null
			};
		} catch (error) {
			if (_this11.shouldThrowOnError) throw error;
			if (isStorageError(error)) {
				var _error$originalError;
				const status = error instanceof StorageApiError ? error.status : error instanceof StorageUnknownError ? (_error$originalError = error.originalError) === null || _error$originalError === void 0 ? void 0 : _error$originalError.status : void 0;
				if (status !== void 0 && [400, 404].includes(status)) return {
					data: false,
					error
				};
			}
			throw error;
		}
	}
	getPublicUrl(path, options) {
		const _path = this._getFinalPath(path);
		const query = new URLSearchParams();
		if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
		if (options === null || options === void 0 ? void 0 : options.transform) this.applyTransformOptsToQuery(query, options.transform);
		if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
		const queryString = query.toString();
		const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image" : "object";
		return { data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}`) + (queryString ? `?${queryString}` : "") } };
	}
	async remove(paths) {
		var _this12 = this;
		return _this12.handleOperation(async () => {
			return await remove(_this12.fetch, `${_this12.url}/object/${_this12.bucketId}`, { prefixes: paths }, { headers: _this12.headers });
		});
	}
	async purgeCache(path, options, parameters) {
		var _this13 = this;
		return _this13.handleOperation(async () => {
			const _path = encodeStoragePath(_this13._getFinalPath(path));
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.transformations) query.set("transformations", "true");
			const queryString = query.toString();
			return await remove(_this13.fetch, `${_this13.url}/cdn/${_path}${queryString ? `?${queryString}` : ""}`, {}, { headers: _this13.headers }, parameters);
		});
	}
	async list(path, options, parameters) {
		var _this14 = this;
		return _this14.handleOperation(async () => {
			const sortBy = (options === null || options === void 0 ? void 0 : options.sortBy) ? _objectSpread2$1(_objectSpread2$1({}, DEFAULT_SEARCH_OPTIONS.sortBy), options.sortBy) : DEFAULT_SEARCH_OPTIONS.sortBy;
			const body = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, DEFAULT_SEARCH_OPTIONS), options), {}, {
				sortBy,
				prefix: path || ""
			});
			return await post(_this14.fetch, `${_this14.url}/object/list/${_this14.bucketId}`, body, { headers: _this14.headers }, parameters);
		});
	}
	async listV2(options, parameters) {
		var _this15 = this;
		return _this15.handleOperation(async () => {
			const body = _objectSpread2$1({}, options);
			return await post(_this15.fetch, `${_this15.url}/object/list-v2/${_this15.bucketId}`, body, { headers: _this15.headers }, parameters);
		});
	}
	encodeMetadata(metadata) {
		return JSON.stringify(metadata);
	}
	toBase64(data) {
		if (typeof Buffer !== "undefined") return Buffer.from(data).toString("base64");
		return btoa(data);
	}
	_getFinalPath(path) {
		return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
	}
	_removeEmptyFolders(path) {
		return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
	}
	applyTransformOptsToQuery(query, transform) {
		if (transform.width) query.set("width", transform.width.toString());
		if (transform.height) query.set("height", transform.height.toString());
		if (transform.resize) query.set("resize", transform.resize);
		if (transform.format) query.set("format", transform.format);
		if (transform.quality) query.set("quality", transform.quality.toString());
		return query;
	}
};
const DEFAULT_HEADERS = { "X-Client-Info": `storage-js/2.111.0` };
var StorageBucketApi = class extends BaseApiClient {
	constructor(url, headers = {}, fetch$1, opts) {
		const baseUrl = new URL(url);
		if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
			if (/supabase\.(co|in|red)$/.test(baseUrl.hostname) && !baseUrl.hostname.includes("storage.supabase.")) baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
		}
		const finalUrl = baseUrl.href.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), headers);
		super(finalUrl, finalHeaders, fetch$1, "storage");
	}
	async listBuckets(options) {
		var _this = this;
		return _this.handleOperation(async () => {
			const queryString = _this.listBucketOptionsToQueryString(options);
			return await get(_this.fetch, `${_this.url}/bucket${queryString}`, { headers: _this.headers });
		});
	}
	async getBucket(id) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await get(_this2.fetch, `${_this2.url}/bucket/${id}`, { headers: _this2.headers });
		});
	}
	async createBucket(id, options = { public: false }) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await post(_this3.fetch, `${_this3.url}/bucket`, {
				id,
				name: id,
				type: options.type,
				public: options.public,
				file_size_limit: options.fileSizeLimit,
				allowed_mime_types: options.allowedMimeTypes
			}, { headers: _this3.headers });
		});
	}
	async updateBucket(id, options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await put(_this4.fetch, `${_this4.url}/bucket/${id}`, {
				id,
				name: id,
				public: options.public,
				file_size_limit: options.fileSizeLimit,
				allowed_mime_types: options.allowedMimeTypes
			}, { headers: _this4.headers });
		});
	}
	async emptyBucket(id) {
		var _this5 = this;
		return _this5.handleOperation(async () => {
			return await post(_this5.fetch, `${_this5.url}/bucket/${id}/empty`, {}, { headers: _this5.headers });
		});
	}
	async deleteBucket(id) {
		var _this6 = this;
		return _this6.handleOperation(async () => {
			return await remove(_this6.fetch, `${_this6.url}/bucket/${id}`, {}, { headers: _this6.headers });
		});
	}
	async purgeBucketCache(id, options, parameters) {
		var _this7 = this;
		return _this7.handleOperation(async () => {
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.transformations) query.set("transformations", "true");
			const queryString = query.toString();
			return await remove(_this7.fetch, `${_this7.url}/cdn/${encodeStoragePath(id)}${queryString ? `?${queryString}` : ""}`, {}, { headers: _this7.headers }, parameters);
		});
	}
	listBucketOptionsToQueryString(options) {
		const params = {};
		if (options) {
			if ("limit" in options) params.limit = String(options.limit);
			if ("offset" in options) params.offset = String(options.offset);
			if (options.search) params.search = options.search;
			if (options.sortColumn) params.sortColumn = options.sortColumn;
			if (options.sortOrder) params.sortOrder = options.sortOrder;
		}
		return Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
	}
};
var StorageAnalyticsClient = class extends BaseApiClient {
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), headers);
		super(finalUrl, finalHeaders, fetch$1, "storage");
	}
	async createBucket(name) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await post(_this.fetch, `${_this.url}/bucket`, { name }, { headers: _this.headers });
		});
	}
	async listBuckets(options) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			const queryParams = new URLSearchParams();
			if ((options === null || options === void 0 ? void 0 : options.limit) !== void 0) queryParams.set("limit", options.limit.toString());
			if ((options === null || options === void 0 ? void 0 : options.offset) !== void 0) queryParams.set("offset", options.offset.toString());
			if (options === null || options === void 0 ? void 0 : options.sortColumn) queryParams.set("sortColumn", options.sortColumn);
			if (options === null || options === void 0 ? void 0 : options.sortOrder) queryParams.set("sortOrder", options.sortOrder);
			if (options === null || options === void 0 ? void 0 : options.search) queryParams.set("search", options.search);
			const queryString = queryParams.toString();
			const url = queryString ? `${_this2.url}/bucket?${queryString}` : `${_this2.url}/bucket`;
			return await get(_this2.fetch, url, { headers: _this2.headers });
		});
	}
	async deleteBucket(bucketName) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await remove(_this3.fetch, `${_this3.url}/bucket/${bucketName}`, {}, { headers: _this3.headers });
		});
	}
	from(bucketName) {
		var _this4 = this;
		if (!isValidBucketName(bucketName)) throw new StorageError("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
		const catalog = new IcebergRestCatalog({
			baseUrl: this.url,
			catalogName: bucketName,
			auth: {
				type: "custom",
				getHeaders: async () => _this4.headers
			},
			fetch: this.fetch
		});
		const shouldThrowOnError = this.shouldThrowOnError;
		return new Proxy(catalog, { get(target, prop) {
			const value = target[prop];
			if (typeof value !== "function") return value;
			return async (...args) => {
				try {
					return {
						data: await value.apply(target, args),
						error: null
					};
				} catch (error) {
					if (shouldThrowOnError) throw error;
					return {
						data: null,
						error
					};
				}
			};
		} });
	}
};
var VectorIndexApi = class extends BaseApiClient {
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	async createIndex(options) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/CreateIndex`, options, { headers: _this.headers }) || {};
		});
	}
	async getIndex(vectorBucketName, indexName) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetIndex`, {
				vectorBucketName,
				indexName
			}, { headers: _this2.headers });
		});
	}
	async listIndexes(options) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListIndexes`, options, { headers: _this3.headers });
		});
	}
	async deleteIndex(vectorBucketName, indexName) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteIndex`, {
				vectorBucketName,
				indexName
			}, { headers: _this4.headers }) || {};
		});
	}
};
var VectorDataApi = class extends BaseApiClient {
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	async putVectors(options) {
		var _this = this;
		if (options.vectors.length < 1 || options.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/PutVectors`, options, { headers: _this.headers }) || {};
		});
	}
	async getVectors(options) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectors`, options, { headers: _this2.headers });
		});
	}
	async listVectors(options) {
		var _this3 = this;
		if (options.segmentCount !== void 0) {
			if (options.segmentCount < 1 || options.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
			if (options.segmentIndex !== void 0) {
				if (options.segmentIndex < 0 || options.segmentIndex >= options.segmentCount) throw new Error(`segmentIndex must be between 0 and ${options.segmentCount - 1}`);
			}
		}
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectors`, options, { headers: _this3.headers });
		});
	}
	async queryVectors(options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/QueryVectors`, options, { headers: _this4.headers });
		});
	}
	async deleteVectors(options) {
		var _this5 = this;
		if (options.keys.length < 1 || options.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
		return _this5.handleOperation(async () => {
			return await vectorsApi.post(_this5.fetch, `${_this5.url}/DeleteVectors`, options, { headers: _this5.headers }) || {};
		});
	}
};
var VectorBucketApi = class extends BaseApiClient {
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	async createBucket(vectorBucketName) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/CreateVectorBucket`, { vectorBucketName }, { headers: _this.headers }) || {};
		});
	}
	async getBucket(vectorBucketName) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectorBucket`, { vectorBucketName }, { headers: _this2.headers });
		});
	}
	async listBuckets(options = {}) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectorBuckets`, options, { headers: _this3.headers });
		});
	}
	async deleteBucket(vectorBucketName) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteVectorBucket`, { vectorBucketName }, { headers: _this4.headers }) || {};
		});
	}
};
var StorageVectorsClient = class extends VectorBucketApi {
	constructor(url, options = {}) {
		super(url, options.headers || {}, options.fetch);
	}
	from(vectorBucketName) {
		return new VectorBucketScope(this.url, this.headers, vectorBucketName, this.fetch);
	}
	async createBucket(vectorBucketName) {
		var _superprop_getCreateBucket = () => super.createBucket, _this = this;
		return _superprop_getCreateBucket().call(_this, vectorBucketName);
	}
	async getBucket(vectorBucketName) {
		var _superprop_getGetBucket = () => super.getBucket, _this2 = this;
		return _superprop_getGetBucket().call(_this2, vectorBucketName);
	}
	async listBuckets(options = {}) {
		var _superprop_getListBuckets = () => super.listBuckets, _this3 = this;
		return _superprop_getListBuckets().call(_this3, options);
	}
	async deleteBucket(vectorBucketName) {
		var _superprop_getDeleteBucket = () => super.deleteBucket, _this4 = this;
		return _superprop_getDeleteBucket().call(_this4, vectorBucketName);
	}
};
var VectorBucketScope = class extends VectorIndexApi {
	constructor(url, headers, vectorBucketName, fetch$1) {
		super(url, headers, fetch$1);
		this.vectorBucketName = vectorBucketName;
	}
	async createIndex(options) {
		var _superprop_getCreateIndex = () => super.createIndex, _this5 = this;
		return _superprop_getCreateIndex().call(_this5, _objectSpread2$1(_objectSpread2$1({}, options), {}, { vectorBucketName: _this5.vectorBucketName }));
	}
	async listIndexes(options = {}) {
		var _superprop_getListIndexes = () => super.listIndexes, _this6 = this;
		return _superprop_getListIndexes().call(_this6, _objectSpread2$1(_objectSpread2$1({}, options), {}, { vectorBucketName: _this6.vectorBucketName }));
	}
	async getIndex(indexName) {
		var _superprop_getGetIndex = () => super.getIndex, _this7 = this;
		return _superprop_getGetIndex().call(_this7, _this7.vectorBucketName, indexName);
	}
	async deleteIndex(indexName) {
		var _superprop_getDeleteIndex = () => super.deleteIndex, _this8 = this;
		return _superprop_getDeleteIndex().call(_this8, _this8.vectorBucketName, indexName);
	}
	index(indexName) {
		return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, indexName, this.fetch);
	}
};
var VectorIndexScope = class extends VectorDataApi {
	constructor(url, headers, vectorBucketName, indexName, fetch$1) {
		super(url, headers, fetch$1);
		this.vectorBucketName = vectorBucketName;
		this.indexName = indexName;
	}
	async putVectors(options) {
		var _superprop_getPutVectors = () => super.putVectors, _this9 = this;
		return _superprop_getPutVectors().call(_this9, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this9.vectorBucketName,
			indexName: _this9.indexName
		}));
	}
	async getVectors(options) {
		var _superprop_getGetVectors = () => super.getVectors, _this10 = this;
		return _superprop_getGetVectors().call(_this10, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this10.vectorBucketName,
			indexName: _this10.indexName
		}));
	}
	async listVectors(options = {}) {
		var _superprop_getListVectors = () => super.listVectors, _this11 = this;
		return _superprop_getListVectors().call(_this11, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this11.vectorBucketName,
			indexName: _this11.indexName
		}));
	}
	async queryVectors(options) {
		var _superprop_getQueryVectors = () => super.queryVectors, _this12 = this;
		return _superprop_getQueryVectors().call(_this12, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this12.vectorBucketName,
			indexName: _this12.indexName
		}));
	}
	async deleteVectors(options) {
		var _superprop_getDeleteVectors = () => super.deleteVectors, _this13 = this;
		return _superprop_getDeleteVectors().call(_this13, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this13.vectorBucketName,
			indexName: _this13.indexName
		}));
	}
};
var StorageClient = class extends StorageBucketApi {
	constructor(url, headers = {}, fetch$1, opts) {
		super(url, headers, fetch$1, opts);
	}
	from(id) {
		return new StorageFileApi(this.url, this.headers, id, this.fetch);
	}
	get vectors() {
		return new StorageVectorsClient(this.url + "/vector", {
			headers: this.headers,
			fetch: this.fetch
		});
	}
	get analytics() {
		return new StorageAnalyticsClient(this.url + "/iceberg", this.headers, this.fetch);
	}
};
var require_version = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.version = void 0;
	exports.version = "2.111.0";
}));
var require_constants = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JWKS_TTL = exports.PKCE_MAX_CONCURRENT_FLOWS = exports.PKCE_FLOW_ID_PARAM = exports.BASE64URL_REGEX = exports.API_VERSIONS = exports.API_VERSION_HEADER_NAME = exports.NETWORK_FAILURE = exports.DEFAULT_HEADERS = exports.AUDIENCE = exports.STORAGE_KEY = exports.GOTRUE_URL = exports.REFRESH_FAILURE_COOLDOWN_MS = exports.EXPIRY_MARGIN_MS = exports.AUTO_REFRESH_TICK_THRESHOLD = exports.AUTO_REFRESH_TICK_DURATION_MS = void 0;
	const version_1 = require_version();
	exports.AUTO_REFRESH_TICK_DURATION_MS = 3e4;
	exports.AUTO_REFRESH_TICK_THRESHOLD = 3;
	exports.EXPIRY_MARGIN_MS = exports.AUTO_REFRESH_TICK_THRESHOLD * exports.AUTO_REFRESH_TICK_DURATION_MS;
	exports.REFRESH_FAILURE_COOLDOWN_MS = 2 * exports.AUTO_REFRESH_TICK_DURATION_MS;
	exports.GOTRUE_URL = "http://localhost:9999";
	exports.STORAGE_KEY = "supabase.auth.token";
	exports.AUDIENCE = "";
	exports.DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${version_1.version}` };
	exports.NETWORK_FAILURE = {
		MAX_RETRIES: 10,
		RETRY_INTERVAL: 2
	};
	exports.API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
	exports.API_VERSIONS = { "2024-01-01": {
		timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
		name: "2024-01-01"
	} };
	exports.BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
	exports.PKCE_FLOW_ID_PARAM = "sb_flow_id";
	exports.PKCE_MAX_CONCURRENT_FLOWS = 5;
	exports.JWKS_TTL = 6e5;
}));
var require_errors = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AuthInvalidJwtError = exports.AuthWeakPasswordError = exports.AuthRefreshDiscardedError = exports.AuthRetryableFetchError = exports.AuthPKCECodeVerifierMissingError = exports.AuthPKCEGrantCodeExchangeError = exports.AuthImplicitGrantRedirectError = exports.AuthInvalidCredentialsError = exports.AuthInvalidTokenResponseError = exports.AuthSessionMissingError = exports.CustomAuthError = exports.AuthUnknownError = exports.AuthApiError = exports.AuthError = void 0;
	exports.isAuthError = isAuthError;
	exports.isAuthApiError = isAuthApiError;
	exports.isAuthSessionMissingError = isAuthSessionMissingError;
	exports.isAuthImplicitGrantRedirectError = isAuthImplicitGrantRedirectError;
	exports.isAuthPKCECodeVerifierMissingError = isAuthPKCECodeVerifierMissingError;
	exports.isAuthRetryableFetchError = isAuthRetryableFetchError;
	exports.isAuthRefreshDiscardedError = isAuthRefreshDiscardedError;
	exports.isAuthWeakPasswordError = isAuthWeakPasswordError;
	var AuthError = class extends Error {
		constructor(message, status, code) {
			super(message);
			this.__isAuthError = true;
			this.name = "AuthError";
			this.status = status;
			this.code = code;
		}
		toJSON() {
			return {
				name: this.name,
				message: this.message,
				status: this.status,
				code: this.code
			};
		}
	};
	exports.AuthError = AuthError;
	function isAuthError(error) {
		return typeof error === "object" && error !== null && "__isAuthError" in error;
	}
	var AuthApiError = class extends AuthError {
		constructor(message, status, code) {
			super(message, status, code);
			this.name = "AuthApiError";
			this.status = status;
			this.code = code;
		}
	};
	exports.AuthApiError = AuthApiError;
	function isAuthApiError(error) {
		return isAuthError(error) && error.name === "AuthApiError";
	}
	var AuthUnknownError = class extends AuthError {
		constructor(message, originalError) {
			super(message);
			this.name = "AuthUnknownError";
			this.originalError = originalError;
		}
	};
	exports.AuthUnknownError = AuthUnknownError;
	var CustomAuthError = class extends AuthError {
		constructor(message, name, status, code) {
			super(message, status, code);
			this.name = name;
			this.status = status;
		}
	};
	exports.CustomAuthError = CustomAuthError;
	var AuthSessionMissingError = class extends CustomAuthError {
		constructor() {
			super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
		}
	};
	exports.AuthSessionMissingError = AuthSessionMissingError;
	function isAuthSessionMissingError(error) {
		return isAuthError(error) && error.name === "AuthSessionMissingError";
	}
	var AuthInvalidTokenResponseError = class extends CustomAuthError {
		constructor() {
			super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
		}
	};
	exports.AuthInvalidTokenResponseError = AuthInvalidTokenResponseError;
	var AuthInvalidCredentialsError = class extends CustomAuthError {
		constructor(message) {
			super(message, "AuthInvalidCredentialsError", 400, void 0);
		}
	};
	exports.AuthInvalidCredentialsError = AuthInvalidCredentialsError;
	var AuthImplicitGrantRedirectError = class extends CustomAuthError {
		constructor(message, details = null) {
			super(message, "AuthImplicitGrantRedirectError", 500, void 0);
			this.details = null;
			this.details = details;
		}
		toJSON() {
			return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
		}
	};
	exports.AuthImplicitGrantRedirectError = AuthImplicitGrantRedirectError;
	function isAuthImplicitGrantRedirectError(error) {
		return isAuthError(error) && error.name === "AuthImplicitGrantRedirectError";
	}
	var AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
		constructor(message, details = null) {
			super(message, "AuthPKCEGrantCodeExchangeError", 500, void 0);
			this.details = null;
			this.details = details;
		}
		toJSON() {
			return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
		}
	};
	exports.AuthPKCEGrantCodeExchangeError = AuthPKCEGrantCodeExchangeError;
	var AuthPKCECodeVerifierMissingError = class extends CustomAuthError {
		constructor() {
			super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
		}
	};
	exports.AuthPKCECodeVerifierMissingError = AuthPKCECodeVerifierMissingError;
	function isAuthPKCECodeVerifierMissingError(error) {
		return isAuthError(error) && error.name === "AuthPKCECodeVerifierMissingError";
	}
	var AuthRetryableFetchError = class extends CustomAuthError {
		constructor(message, status) {
			super(message, "AuthRetryableFetchError", status, void 0);
		}
	};
	exports.AuthRetryableFetchError = AuthRetryableFetchError;
	function isAuthRetryableFetchError(error) {
		return isAuthError(error) && error.name === "AuthRetryableFetchError";
	}
	var AuthRefreshDiscardedError = class extends CustomAuthError {
		constructor(message = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
			super(message, "AuthRefreshDiscardedError", 409, void 0);
		}
	};
	exports.AuthRefreshDiscardedError = AuthRefreshDiscardedError;
	function isAuthRefreshDiscardedError(error) {
		return isAuthError(error) && error.name === "AuthRefreshDiscardedError";
	}
	var AuthWeakPasswordError = class extends CustomAuthError {
		constructor(message, status, reasons) {
			super(message, "AuthWeakPasswordError", status, "weak_password");
			this.reasons = reasons;
		}
		toJSON() {
			return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
		}
	};
	exports.AuthWeakPasswordError = AuthWeakPasswordError;
	function isAuthWeakPasswordError(error) {
		return isAuthError(error) && error.name === "AuthWeakPasswordError";
	}
	var AuthInvalidJwtError = class extends CustomAuthError {
		constructor(message) {
			super(message, "AuthInvalidJwtError", 400, "invalid_jwt");
		}
	};
	exports.AuthInvalidJwtError = AuthInvalidJwtError;
}));
var require_base64url = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.byteToBase64URL = byteToBase64URL;
	exports.byteFromBase64URL = byteFromBase64URL;
	exports.stringToBase64URL = stringToBase64URL;
	exports.stringFromBase64URL = stringFromBase64URL;
	exports.codepointToUTF8 = codepointToUTF8;
	exports.stringToUTF8 = stringToUTF8;
	exports.stringFromUTF8 = stringFromUTF8;
	exports.base64UrlToUint8Array = base64UrlToUint8Array;
	exports.stringToUint8Array = stringToUint8Array;
	exports.bytesToBase64URL = bytesToBase64URL;
	const TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
	const IGNORE_BASE64URL = " 	\n\r=".split("");
	const FROM_BASE64URL = (() => {
		const charMap = new Array(128);
		for (let i = 0; i < charMap.length; i += 1) charMap[i] = -1;
		for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
		for (let i = 0; i < TO_BASE64URL.length; i += 1) charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
		return charMap;
	})();
	function byteToBase64URL(byte, state, emit) {
		if (byte !== null) {
			state.queue = state.queue << 8 | byte;
			state.queuedBits += 8;
			while (state.queuedBits >= 6) {
				const pos = state.queue >> state.queuedBits - 6 & 63;
				emit(TO_BASE64URL[pos]);
				state.queuedBits -= 6;
			}
		} else if (state.queuedBits > 0) {
			state.queue = state.queue << 6 - state.queuedBits;
			state.queuedBits = 6;
			while (state.queuedBits >= 6) {
				const pos = state.queue >> state.queuedBits - 6 & 63;
				emit(TO_BASE64URL[pos]);
				state.queuedBits -= 6;
			}
		}
	}
	function byteFromBase64URL(charCode, state, emit) {
		const bits = FROM_BASE64URL[charCode];
		if (bits > -1) {
			state.queue = state.queue << 6 | bits;
			state.queuedBits += 6;
			while (state.queuedBits >= 8) {
				emit(state.queue >> state.queuedBits - 8 & 255);
				state.queuedBits -= 8;
			}
		} else if (bits === -2) return;
		else throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
	}
	function stringToBase64URL(str) {
		const base64 = [];
		const emitter = (char) => {
			base64.push(char);
		};
		const state = {
			queue: 0,
			queuedBits: 0
		};
		stringToUTF8(str, (byte) => {
			byteToBase64URL(byte, state, emitter);
		});
		byteToBase64URL(null, state, emitter);
		return base64.join("");
	}
	function stringFromBase64URL(str) {
		const conv = [];
		const utf8Emit = (codepoint) => {
			conv.push(String.fromCodePoint(codepoint));
		};
		const utf8State = {
			utf8seq: 0,
			codepoint: 0
		};
		const b64State = {
			queue: 0,
			queuedBits: 0
		};
		const byteEmit = (byte) => {
			stringFromUTF8(byte, utf8State, utf8Emit);
		};
		for (let i = 0; i < str.length; i += 1) byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
		return conv.join("");
	}
	function codepointToUTF8(codepoint, emit) {
		if (codepoint <= 127) {
			emit(codepoint);
			return;
		} else if (codepoint <= 2047) {
			emit(192 | codepoint >> 6);
			emit(128 | codepoint & 63);
			return;
		} else if (codepoint <= 65535) {
			emit(224 | codepoint >> 12);
			emit(128 | codepoint >> 6 & 63);
			emit(128 | codepoint & 63);
			return;
		} else if (codepoint <= 1114111) {
			emit(240 | codepoint >> 18);
			emit(128 | codepoint >> 12 & 63);
			emit(128 | codepoint >> 6 & 63);
			emit(128 | codepoint & 63);
			return;
		}
		throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
	}
	function stringToUTF8(str, emit) {
		for (let i = 0; i < str.length; i += 1) {
			let codepoint = str.charCodeAt(i);
			if (codepoint > 55295 && codepoint <= 56319) {
				const highSurrogate = (codepoint - 55296) * 1024 & 65535;
				codepoint = (str.charCodeAt(i + 1) - 56320 & 65535 | highSurrogate) + 65536;
				i += 1;
			}
			codepointToUTF8(codepoint, emit);
		}
	}
	function stringFromUTF8(byte, state, emit) {
		if (state.utf8seq === 0) {
			if (byte <= 127) {
				emit(byte);
				return;
			}
			for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) if ((byte >> 7 - leadingBit & 1) === 0) {
				state.utf8seq = leadingBit;
				break;
			}
			if (state.utf8seq === 2) state.codepoint = byte & 31;
			else if (state.utf8seq === 3) state.codepoint = byte & 15;
			else if (state.utf8seq === 4) state.codepoint = byte & 7;
			else throw new Error("Invalid UTF-8 sequence");
			state.utf8seq -= 1;
		} else if (state.utf8seq > 0) {
			if (byte <= 127) throw new Error("Invalid UTF-8 sequence");
			state.codepoint = state.codepoint << 6 | byte & 63;
			state.utf8seq -= 1;
			if (state.utf8seq === 0) emit(state.codepoint);
		}
	}
	function base64UrlToUint8Array(str) {
		const result = [];
		const state = {
			queue: 0,
			queuedBits: 0
		};
		const onByte = (byte) => {
			result.push(byte);
		};
		for (let i = 0; i < str.length; i += 1) byteFromBase64URL(str.charCodeAt(i), state, onByte);
		return new Uint8Array(result);
	}
	function stringToUint8Array(str) {
		const result = [];
		stringToUTF8(str, (byte) => result.push(byte));
		return new Uint8Array(result);
	}
	function bytesToBase64URL(bytes) {
		const result = [];
		const state = {
			queue: 0,
			queuedBits: 0
		};
		const onChar = (char) => {
			result.push(char);
		};
		bytes.forEach((byte) => byteToBase64URL(byte, state, onChar));
		byteToBase64URL(null, state, onChar);
		return result.join("");
	}
}));
var require_helpers = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.pkceVerifierSlotKey = exports.Deferred = exports.removeItemAsync = exports.getItemAsync = exports.setItemAsync = exports.looksLikeFetchResponse = exports.resolveFetch = exports.supportsLocalStorage = exports.isBrowser = void 0;
	exports.expiresAt = expiresAt;
	exports.generateCallbackId = generateCallbackId;
	exports.parseParametersFromURL = parseParametersFromURL;
	exports.decodeJWT = decodeJWT;
	exports.sleep = sleep;
	exports.retryable = retryable;
	exports.generatePKCEVerifier = generatePKCEVerifier;
	exports.generatePKCEChallenge = generatePKCEChallenge;
	exports.validatePKCEFlowId = validatePKCEFlowId;
	exports.generatePKCEFlowId = generatePKCEFlowId;
	exports.storePKCEVerifier = storePKCEVerifier;
	exports.retrievePKCEVerifier = retrievePKCEVerifier;
	exports.removePKCEVerifier = removePKCEVerifier;
	exports.removeAllPKCEVerifiers = removeAllPKCEVerifiers;
	exports.appendFlowIdToRedirectTo = appendFlowIdToRedirectTo;
	exports.getCodeChallengeAndMethod = getCodeChallengeAndMethod;
	exports.parseResponseAPIVersion = parseResponseAPIVersion;
	exports.validateExp = validateExp;
	exports.getAlgorithm = getAlgorithm;
	exports.validateUUID = validateUUID;
	exports.assertPasskeyExperimentalEnabled = assertPasskeyExperimentalEnabled;
	exports.userNotAvailableProxy = userNotAvailableProxy;
	exports.insecureUserWarningProxy = insecureUserWarningProxy;
	exports.deepClone = deepClone;
	const constants_1 = require_constants();
	const errors_1 = require_errors();
	const base64url_1 = require_base64url();
	function expiresAt(expiresIn) {
		return Math.round(Date.now() / 1e3) + expiresIn;
	}
	function generateCallbackId() {
		return Symbol("auth-callback");
	}
	const isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";
	exports.isBrowser = isBrowser;
	const localStorageWriteTests = {
		tested: false,
		writable: false
	};
	const supportsLocalStorage = () => {
		if (!(0, exports.isBrowser)()) return false;
		try {
			if (typeof globalThis.localStorage !== "object") return false;
		} catch (e) {
			return false;
		}
		if (localStorageWriteTests.tested) return localStorageWriteTests.writable;
		const randomKey = `lswt-${Math.random()}${Math.random()}`;
		try {
			globalThis.localStorage.setItem(randomKey, randomKey);
			globalThis.localStorage.removeItem(randomKey);
			localStorageWriteTests.tested = true;
			localStorageWriteTests.writable = true;
		} catch (e) {
			localStorageWriteTests.tested = true;
			localStorageWriteTests.writable = false;
		}
		return localStorageWriteTests.writable;
	};
	exports.supportsLocalStorage = supportsLocalStorage;
	function parseParametersFromURL(href) {
		const result = {};
		const url = new URL(href);
		if (url.hash && url.hash[0] === "#") try {
			new URLSearchParams(url.hash.substring(1)).forEach((value, key) => {
				result[key] = value;
			});
		} catch (_e) {}
		url.searchParams.forEach((value, key) => {
			result[key] = value;
		});
		return result;
	}
	const resolveFetch = (customFetch) => {
		if (customFetch) return (...args) => customFetch(...args);
		return (...args) => fetch(...args);
	};
	exports.resolveFetch = resolveFetch;
	const looksLikeFetchResponse = (maybeResponse) => {
		return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
	};
	exports.looksLikeFetchResponse = looksLikeFetchResponse;
	const setItemAsync = async (storage, key, data) => {
		await storage.setItem(key, JSON.stringify(data));
	};
	exports.setItemAsync = setItemAsync;
	const getItemAsync = async (storage, key) => {
		const value = await storage.getItem(key);
		if (!value) return null;
		try {
			return JSON.parse(value);
		} catch (_a) {
			return null;
		}
	};
	exports.getItemAsync = getItemAsync;
	const removeItemAsync = async (storage, key) => {
		await storage.removeItem(key);
	};
	exports.removeItemAsync = removeItemAsync;
	var Deferred = class Deferred {
		constructor() {
			this.promise = new Deferred.promiseConstructor((res, rej) => {
				this.resolve = res;
				this.reject = rej;
			});
		}
	};
	exports.Deferred = Deferred;
	Deferred.promiseConstructor = Promise;
	function decodeJWT(token) {
		const parts = token.split(".");
		if (parts.length !== 3) throw new errors_1.AuthInvalidJwtError("Invalid JWT structure");
		for (let i = 0; i < parts.length; i++) if (!constants_1.BASE64URL_REGEX.test(parts[i])) throw new errors_1.AuthInvalidJwtError("JWT not in base64url format");
		return {
			header: JSON.parse((0, base64url_1.stringFromBase64URL)(parts[0])),
			payload: JSON.parse((0, base64url_1.stringFromBase64URL)(parts[1])),
			signature: (0, base64url_1.base64UrlToUint8Array)(parts[2]),
			raw: {
				header: parts[0],
				payload: parts[1]
			}
		};
	}
	async function sleep(time) {
		return await new Promise((accept) => {
			setTimeout(() => accept(null), time);
		});
	}
	function retryable(fn, isRetryable) {
		return new Promise((accept, reject) => {
			(async () => {
				for (let attempt = 0; attempt < Infinity; attempt++) try {
					const result = await fn(attempt);
					if (!isRetryable(attempt, null, result)) {
						accept(result);
						return;
					}
				} catch (e) {
					if (!isRetryable(attempt, e)) {
						reject(e);
						return;
					}
				}
			})();
		});
	}
	function dec2hex(dec) {
		return ("0" + dec.toString(16)).substr(-2);
	}
	function generatePKCEVerifier() {
		const verifierLength = 56;
		const array = new Uint32Array(verifierLength);
		if (typeof crypto === "undefined") {
			const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
			const charSetLen = 66;
			let verifier = "";
			for (let i = 0; i < verifierLength; i++) verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
			return verifier;
		}
		crypto.getRandomValues(array);
		return Array.from(array, dec2hex).join("");
	}
	async function sha256(randomString) {
		const encodedData = new TextEncoder().encode(randomString);
		const hash = await crypto.subtle.digest("SHA-256", encodedData);
		const bytes = new Uint8Array(hash);
		return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
	}
	async function generatePKCEChallenge(verifier) {
		if (!(typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined")) {
			console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
			return verifier;
		}
		const hashed = await sha256(verifier);
		return btoa(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	}
	const PKCE_FLOW_ID_PATTERN = /^[a-zA-Z0-9_-]{8,64}$/;
	function validatePKCEFlowId(flowId) {
		return typeof flowId === "string" && PKCE_FLOW_ID_PATTERN.test(flowId) ? flowId : null;
	}
	function generatePKCEFlowId() {
		if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
			const bytes = new Uint8Array(16);
			crypto.getRandomValues(bytes);
			return Array.from(bytes, dec2hex).join("");
		}
		let flowId = "";
		for (let i = 0; i < 32; i++) flowId += Math.floor(Math.random() * 16).toString(16);
		return flowId;
	}
	const pkceVerifierSlotKey = (storageKey, flowId) => `${storageKey}-flow-${flowId}-code-verifier`;
	exports.pkceVerifierSlotKey = pkceVerifierSlotKey;
	const pkceFlowIndexKey = (storageKey) => `${storageKey}-flows-code-verifier`;
	async function getPKCEFlowIndex(storage, storageKey) {
		const index = await (0, exports.getItemAsync)(storage, pkceFlowIndexKey(storageKey));
		return Array.isArray(index) ? index.filter((id) => validatePKCEFlowId(id) !== null) : [];
	}
	async function storePKCEVerifier(storage, storageKey, flowId, verifier, onEvictFlow) {
		await (0, exports.setItemAsync)(storage, (0, exports.pkceVerifierSlotKey)(storageKey, flowId), verifier);
		const index = (await getPKCEFlowIndex(storage, storageKey)).filter((id) => id !== flowId);
		index.push(flowId);
		while (index.length > constants_1.PKCE_MAX_CONCURRENT_FLOWS) {
			const evicted = index.shift();
			await (0, exports.removeItemAsync)(storage, (0, exports.pkceVerifierSlotKey)(storageKey, evicted));
			onEvictFlow === null || onEvictFlow === void 0 || onEvictFlow(evicted);
		}
		await (0, exports.setItemAsync)(storage, pkceFlowIndexKey(storageKey), index);
		await (0, exports.setItemAsync)(storage, `${storageKey}-code-verifier`, verifier);
	}
	async function retrievePKCEVerifier(storage, storageKey, flowId) {
		if (flowId) {
			const verifier = await (0, exports.getItemAsync)(storage, (0, exports.pkceVerifierSlotKey)(storageKey, flowId));
			return {
				verifier: typeof verifier === "string" ? verifier : null,
				flowId
			};
		}
		const verifier = await (0, exports.getItemAsync)(storage, `${storageKey}-code-verifier`);
		return {
			verifier: typeof verifier === "string" ? verifier : null,
			flowId: null
		};
	}
	async function removePKCEVerifier(storage, storageKey, flowId) {
		const legacyKey = `${storageKey}-code-verifier`;
		if (!flowId) {
			await (0, exports.removeItemAsync)(storage, legacyKey);
			return;
		}
		const slotKey = (0, exports.pkceVerifierSlotKey)(storageKey, flowId);
		const slotValue = await (0, exports.getItemAsync)(storage, slotKey);
		await (0, exports.removeItemAsync)(storage, slotKey);
		const index = await getPKCEFlowIndex(storage, storageKey);
		const remaining = index.filter((id) => id !== flowId);
		if (remaining.length !== index.length) if (remaining.length > 0) await (0, exports.setItemAsync)(storage, pkceFlowIndexKey(storageKey), remaining);
		else await (0, exports.removeItemAsync)(storage, pkceFlowIndexKey(storageKey));
		if (slotValue != null && slotValue === await (0, exports.getItemAsync)(storage, legacyKey)) await (0, exports.removeItemAsync)(storage, legacyKey);
	}
	async function removeAllPKCEVerifiers(storage, storageKey) {
		const index = await getPKCEFlowIndex(storage, storageKey);
		for (const flowId of index) await (0, exports.removeItemAsync)(storage, (0, exports.pkceVerifierSlotKey)(storageKey, flowId));
		await (0, exports.removeItemAsync)(storage, pkceFlowIndexKey(storageKey));
		await (0, exports.removeItemAsync)(storage, `${storageKey}-code-verifier`);
	}
	function appendFlowIdToRedirectTo(redirectTo, flowId) {
		const hashIndex = redirectTo.indexOf("#");
		let base = hashIndex === -1 ? redirectTo : redirectTo.slice(0, hashIndex);
		const fragment = hashIndex === -1 ? "" : redirectTo.slice(hashIndex);
		const queryIndex = base.indexOf("?");
		if (queryIndex !== -1) {
			const path = base.slice(0, queryIndex);
			const remaining = base.slice(queryIndex + 1).split("&").filter((pair) => pair !== "" && pair !== constants_1.PKCE_FLOW_ID_PARAM && !pair.startsWith(`${constants_1.PKCE_FLOW_ID_PARAM}=`));
			base = remaining.length > 0 ? `${path}?${remaining.join("&")}` : path;
		}
		const separator = base.includes("?") ? "&" : "?";
		return `${base}${separator}${constants_1.PKCE_FLOW_ID_PARAM}=${encodeURIComponent(flowId)}${fragment}`;
	}
	async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false, onEvictFlow) {
		const codeVerifier = generatePKCEVerifier();
		let storedCodeVerifier = codeVerifier;
		if (isPasswordRecovery) storedCodeVerifier += "/recovery";
		const flowId = generatePKCEFlowId();
		await storePKCEVerifier(storage, storageKey, flowId, storedCodeVerifier, onEvictFlow);
		const codeChallenge = await generatePKCEChallenge(codeVerifier);
		return [
			codeChallenge,
			codeVerifier === codeChallenge ? "plain" : "s256",
			flowId
		];
	}
	const API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
	function parseResponseAPIVersion(response) {
		const apiVersion = response.headers.get(constants_1.API_VERSION_HEADER_NAME);
		if (!apiVersion) return null;
		if (!apiVersion.match(API_VERSION_REGEX)) return null;
		try {
			return new Date(`${apiVersion}T00:00:00.0Z`);
		} catch (_e) {
			return null;
		}
	}
	function validateExp(exp) {
		if (!exp) throw new Error("Missing exp claim");
		if (exp <= Math.floor(Date.now() / 1e3)) throw new Error("JWT has expired");
	}
	function getAlgorithm(alg) {
		switch (alg) {
			case "RS256": return {
				name: "RSASSA-PKCS1-v1_5",
				hash: { name: "SHA-256" }
			};
			case "ES256": return {
				name: "ECDSA",
				namedCurve: "P-256",
				hash: { name: "SHA-256" }
			};
			default: throw new Error("Invalid alg claim");
		}
	}
	const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
	function validateUUID(str) {
		if (!UUID_REGEX.test(str)) throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
	}
	function assertPasskeyExperimentalEnabled(experimental) {
		if (!experimental.passkey) throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).");
	}
	function userNotAvailableProxy() {
		return new Proxy({}, {
			get: (target, prop) => {
				if (prop === "__isUserNotAvailableProxy") return true;
				if (typeof prop === "symbol") {
					const sProp = prop.toString();
					if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)") return;
				}
				throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${prop}" property of the session object is not supported. Please use getUser() instead.`);
			},
			set: (_target, prop) => {
				throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
			},
			deleteProperty: (_target, prop) => {
				throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
			}
		});
	}
	function insecureUserWarningProxy(user, suppressWarningRef) {
		return new Proxy(user, { get: (target, prop, receiver) => {
			if (prop === "__isInsecureUserWarningProxy") return true;
			if (typeof prop === "symbol") {
				const sProp = prop.toString();
				if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)" || sProp === "Symbol(nodejs.util.inspect.custom)") return Reflect.get(target, prop, receiver);
			}
			if (!suppressWarningRef.value && typeof prop === "string") {
				console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.");
				suppressWarningRef.value = true;
			}
			return Reflect.get(target, prop, receiver);
		} });
	}
	function deepClone(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
}));
var require_fetch = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.handleError = handleError;
	exports._request = _request;
	exports._sessionResponse = _sessionResponse;
	exports._sessionResponsePassword = _sessionResponsePassword;
	exports._userResponse = _userResponse;
	exports._ssoResponse = _ssoResponse;
	exports._generateLinkResponse = _generateLinkResponse;
	exports._noResolveJsonResponse = _noResolveJsonResponse;
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	const constants_1 = require_constants();
	const helpers_1 = require_helpers();
	const errors_1 = require_errors();
	const _getErrorMessage = (err) => {
		if (typeof err === "object" && err !== null) {
			const e = err;
			if (typeof e.msg === "string") return e.msg;
			if (typeof e.message === "string") return e.message;
			if (typeof e.error_description === "string") return e.error_description;
			if (typeof e.error === "string") return e.error;
		}
		return JSON.stringify(err);
	};
	const NETWORK_ERROR_CODES = [
		500,
		501,
		502,
		503,
		504,
		520,
		521,
		522,
		523,
		524,
		525,
		526,
		527,
		528,
		529,
		530
	];
	async function handleError(error) {
		var _a;
		if (!(0, helpers_1.looksLikeFetchResponse)(error)) throw new errors_1.AuthRetryableFetchError(_getErrorMessage(error), 0);
		if (NETWORK_ERROR_CODES.includes(error.status)) throw new errors_1.AuthRetryableFetchError(_getErrorMessage(error), error.status);
		let data;
		try {
			data = await error.json();
		} catch (e) {
			throw new errors_1.AuthUnknownError(_getErrorMessage(e), e);
		}
		let errorCode = void 0;
		const responseAPIVersion = (0, helpers_1.parseResponseAPIVersion)(error);
		if (responseAPIVersion && responseAPIVersion.getTime() >= constants_1.API_VERSIONS["2024-01-01"].timestamp && typeof data === "object" && data && typeof data.code === "string") errorCode = data.code;
		else if (typeof data === "object" && data && typeof data.error_code === "string") errorCode = data.error_code;
		if (!errorCode) {
			if (typeof data === "object" && data && typeof data.weak_password === "object" && data.weak_password && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) throw new errors_1.AuthWeakPasswordError(_getErrorMessage(data), error.status, data.weak_password.reasons);
		} else if (errorCode === "weak_password") throw new errors_1.AuthWeakPasswordError(_getErrorMessage(data), error.status, ((_a = data.weak_password) === null || _a === void 0 ? void 0 : _a.reasons) || []);
		else if (errorCode === "session_not_found") throw new errors_1.AuthSessionMissingError();
		throw new errors_1.AuthApiError(_getErrorMessage(data), error.status || 500, errorCode);
	}
	const _getRequestParams = (method, options, parameters, body) => {
		const params = {
			method,
			headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
		};
		if (method === "GET") return params;
		params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
		params.body = JSON.stringify(body);
		return Object.assign(Object.assign({}, params), parameters);
	};
	async function _request(fetcher, method, url, options) {
		var _a;
		const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
		if (!headers[constants_1.API_VERSION_HEADER_NAME]) headers[constants_1.API_VERSION_HEADER_NAME] = constants_1.API_VERSIONS["2024-01-01"].name;
		if (options === null || options === void 0 ? void 0 : options.jwt) headers["Authorization"] = `Bearer ${options.jwt}`;
		const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
		if (options === null || options === void 0 ? void 0 : options.redirectTo) qs["redirect_to"] = options.redirectTo;
		const data = await _handleRequest(fetcher, method, url + (Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : ""), {
			headers,
			noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
		}, {}, options === null || options === void 0 ? void 0 : options.body);
		return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : {
			data: Object.assign({}, data),
			error: null
		};
	}
	async function _handleRequest(fetcher, method, url, options, parameters, body) {
		const requestParams = _getRequestParams(method, options, parameters, body);
		let result;
		try {
			result = await fetcher(url, Object.assign({}, requestParams));
		} catch (e) {
			throw new errors_1.AuthRetryableFetchError(_getErrorMessage(e), 0);
		}
		if (!result.ok) await handleError(result);
		if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
		try {
			return await result.json();
		} catch (e) {
			await handleError(e);
		}
	}
	function _sessionResponse(data) {
		var _a;
		let session = null;
		if (hasSession(data)) {
			session = Object.assign({}, data);
			if (!data.expires_at) session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
		}
		const user = (_a = data.user) !== null && _a !== void 0 ? _a : typeof (data === null || data === void 0 ? void 0 : data.id) === "string" ? data : null;
		return {
			data: {
				session,
				user
			},
			error: null
		};
	}
	function _sessionResponsePassword(data) {
		const response = _sessionResponse(data);
		if (!response.error && data.weak_password && typeof data.weak_password === "object" && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.message && typeof data.weak_password.message === "string" && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) response.data.weak_password = data.weak_password;
		return response;
	}
	function _userResponse(data) {
		var _a;
		return {
			data: { user: (_a = data.user) !== null && _a !== void 0 ? _a : data },
			error: null
		};
	}
	function _ssoResponse(data) {
		return {
			data,
			error: null
		};
	}
	function _generateLinkResponse(data) {
		const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = tslib_1.__rest(data, [
			"action_link",
			"email_otp",
			"hashed_token",
			"redirect_to",
			"verification_type"
		]);
		return {
			data: {
				properties: {
					action_link,
					email_otp,
					hashed_token,
					redirect_to,
					verification_type
				},
				user: Object.assign({}, rest)
			},
			error: null
		};
	}
	function _noResolveJsonResponse(data) {
		return data;
	}
	function hasSession(data) {
		return !!data.access_token && !!data.refresh_token && !!data.expires_in;
	}
}));
var require_types = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SIGN_OUT_SCOPES = void 0;
	exports.SIGN_OUT_SCOPES = [
		"global",
		"local",
		"others"
	];
}));
var require_GoTrueAdminApi = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	const fetch_1 = require_fetch();
	const helpers_1 = require_helpers();
	const types_1 = require_types();
	const errors_1 = require_errors();
	var GoTrueAdminApi = class {
		constructor({ url = "", headers = {}, fetch, experimental }) {
			this.url = url;
			this.headers = headers;
			this.fetch = (0, helpers_1.resolveFetch)(fetch);
			this.experimental = experimental !== null && experimental !== void 0 ? experimental : {};
			this.mfa = {
				listFactors: this._listFactors.bind(this),
				deleteFactor: this._deleteFactor.bind(this)
			};
			this.oauth = {
				listClients: this._listOAuthClients.bind(this),
				createClient: this._createOAuthClient.bind(this),
				getClient: this._getOAuthClient.bind(this),
				updateClient: this._updateOAuthClient.bind(this),
				deleteClient: this._deleteOAuthClient.bind(this),
				regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
			};
			this.customProviders = {
				listProviders: this._listCustomProviders.bind(this),
				createProvider: this._createCustomProvider.bind(this),
				getProvider: this._getCustomProvider.bind(this),
				updateProvider: this._updateCustomProvider.bind(this),
				deleteProvider: this._deleteCustomProvider.bind(this)
			};
			this.passkey = {
				listPasskeys: this._adminListPasskeys.bind(this),
				deletePasskey: this._adminDeletePasskey.bind(this)
			};
		}
		async signOut(jwt, scope = types_1.SIGN_OUT_SCOPES[0]) {
			if (types_1.SIGN_OUT_SCOPES.indexOf(scope) < 0) throw new Error(`@supabase/auth-js: Parameter scope must be one of ${types_1.SIGN_OUT_SCOPES.join(", ")}`);
			try {
				await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
					headers: this.headers,
					jwt,
					noResolveJson: true
				});
				return {
					data: null,
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async inviteUserByEmail(email, options = {}) {
			try {
				return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/invite`, {
					body: {
						email,
						data: options.data
					},
					headers: this.headers,
					redirectTo: options.redirectTo,
					xform: fetch_1._userResponse
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { user: null },
					error
				};
				throw error;
			}
		}
		async generateLink(params) {
			try {
				const { options } = params, rest = tslib_1.__rest(params, ["options"]);
				const body = Object.assign(Object.assign({}, rest), options);
				if ("newEmail" in rest) {
					body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
					delete body["newEmail"];
				}
				return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/admin/generate_link`, {
					body,
					headers: this.headers,
					xform: fetch_1._generateLinkResponse,
					redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: {
						properties: null,
						user: null
					},
					error
				};
				throw error;
			}
		}
		async createUser(attributes) {
			try {
				return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/admin/users`, {
					body: attributes,
					headers: this.headers,
					xform: fetch_1._userResponse
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { user: null },
					error
				};
				throw error;
			}
		}
		async listUsers(params) {
			var _a, _b, _c, _d, _e, _f, _g;
			try {
				const pagination = {
					nextPage: null,
					lastPage: 0,
					total: 0
				};
				const response = await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/users`, {
					headers: this.headers,
					noResolveJson: true,
					query: {
						page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
						per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
					},
					xform: fetch_1._noResolveJsonResponse
				});
				if (response.error) throw response.error;
				const users = await response.json();
				const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
				const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
				if (links.length > 0) {
					links.forEach((link) => {
						const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
						const rel = JSON.parse(link.split(";")[1].split("=")[1]);
						pagination[`${rel}Page`] = page;
					});
					pagination.total = parseInt(total);
				}
				return {
					data: Object.assign(Object.assign({}, users), pagination),
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { users: [] },
					error
				};
				throw error;
			}
		}
		async getUserById(uid) {
			(0, helpers_1.validateUUID)(uid);
			try {
				return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
					headers: this.headers,
					xform: fetch_1._userResponse
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { user: null },
					error
				};
				throw error;
			}
		}
		async updateUserById(uid, attributes) {
			(0, helpers_1.validateUUID)(uid);
			try {
				return await (0, fetch_1._request)(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
					body: attributes,
					headers: this.headers,
					xform: fetch_1._userResponse
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { user: null },
					error
				};
				throw error;
			}
		}
		async deleteUser(id, shouldSoftDelete = false) {
			(0, helpers_1.validateUUID)(id);
			try {
				return await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
					headers: this.headers,
					body: { should_soft_delete: shouldSoftDelete },
					xform: fetch_1._userResponse
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { user: null },
					error
				};
				throw error;
			}
		}
		async _listFactors(params) {
			(0, helpers_1.validateUUID)(params.userId);
			try {
				const { data, error } = await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
					headers: this.headers,
					xform: (factors) => {
						return {
							data: { factors },
							error: null
						};
					}
				});
				return {
					data,
					error
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _deleteFactor(params) {
			(0, helpers_1.validateUUID)(params.userId);
			(0, helpers_1.validateUUID)(params.id);
			try {
				return {
					data: await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, { headers: this.headers }),
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _listOAuthClients(params) {
			var _a, _b, _c, _d, _e, _f, _g;
			try {
				const pagination = {
					nextPage: null,
					lastPage: 0,
					total: 0
				};
				const response = await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
					headers: this.headers,
					noResolveJson: true,
					query: {
						page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
						per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
					},
					xform: fetch_1._noResolveJsonResponse
				});
				if (response.error) throw response.error;
				const clients = await response.json();
				const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
				const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
				if (links.length > 0) {
					links.forEach((link) => {
						const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
						const rel = JSON.parse(link.split(";")[1].split("=")[1]);
						pagination[`${rel}Page`] = page;
					});
					pagination.total = parseInt(total);
				}
				return {
					data: Object.assign(Object.assign({}, clients), pagination),
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { clients: [] },
					error
				};
				throw error;
			}
		}
		async _createOAuthClient(params) {
			try {
				return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
					body: params,
					headers: this.headers,
					xform: (client) => {
						return {
							data: client,
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _getOAuthClient(clientId) {
			try {
				return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/oauth/clients/${clientId}`, {
					headers: this.headers,
					xform: (client) => {
						return {
							data: client,
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _updateOAuthClient(clientId, params) {
			try {
				return await (0, fetch_1._request)(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${clientId}`, {
					body: params,
					headers: this.headers,
					xform: (client) => {
						return {
							data: client,
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _deleteOAuthClient(clientId) {
			try {
				await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${clientId}`, {
					headers: this.headers,
					noResolveJson: true
				});
				return {
					data: null,
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _regenerateOAuthClientSecret(clientId) {
			try {
				return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/admin/oauth/clients/${clientId}/regenerate_secret`, {
					headers: this.headers,
					xform: (client) => {
						return {
							data: client,
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _listCustomProviders(params) {
			try {
				const query = {};
				if (params === null || params === void 0 ? void 0 : params.type) query.type = params.type;
				return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/custom-providers`, {
					headers: this.headers,
					query,
					xform: (data) => {
						var _a;
						return {
							data: { providers: (_a = data === null || data === void 0 ? void 0 : data.providers) !== null && _a !== void 0 ? _a : [] },
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: { providers: [] },
					error
				};
				throw error;
			}
		}
		async _createCustomProvider(params) {
			try {
				return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/admin/custom-providers`, {
					body: params,
					headers: this.headers,
					xform: (provider) => {
						return {
							data: provider,
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _getCustomProvider(identifier) {
			try {
				return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/custom-providers/${identifier}`, {
					headers: this.headers,
					xform: (provider) => {
						return {
							data: provider,
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _updateCustomProvider(identifier, params) {
			try {
				return await (0, fetch_1._request)(this.fetch, "PUT", `${this.url}/admin/custom-providers/${identifier}`, {
					body: params,
					headers: this.headers,
					xform: (provider) => {
						return {
							data: provider,
							error: null
						};
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _deleteCustomProvider(identifier) {
			try {
				await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${identifier}`, {
					headers: this.headers,
					noResolveJson: true
				});
				return {
					data: null,
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _adminListPasskeys(params) {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			(0, helpers_1.validateUUID)(params.userId);
			try {
				return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/passkeys`, {
					headers: this.headers,
					xform: (data) => ({
						data,
						error: null
					})
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
		async _adminDeletePasskey(params) {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			(0, helpers_1.validateUUID)(params.userId);
			(0, helpers_1.validateUUID)(params.passkeyId);
			try {
				await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/passkeys/${params.passkeyId}`, {
					headers: this.headers,
					noResolveJson: true
				});
				return {
					data: null,
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				throw error;
			}
		}
	};
	exports.default = GoTrueAdminApi;
}));
var require_local_storage = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.memoryLocalStorageAdapter = memoryLocalStorageAdapter;
	function memoryLocalStorageAdapter(store = {}) {
		return {
			getItem: (key) => {
				return store[key] || null;
			},
			setItem: (key, value) => {
				store[key] = value;
			},
			removeItem: (key) => {
				delete store[key];
			}
		};
	}
}));
var require_locks = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProcessLockAcquireTimeoutError = exports.NavigatorLockAcquireTimeoutError = exports.LockAcquireTimeoutError = exports.internals = void 0;
	exports.navigatorLock = navigatorLock;
	exports.processLock = processLock;
	const helpers_1 = require_helpers();
	exports.internals = { debug: !!(globalThis && (0, helpers_1.supportsLocalStorage)() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true") };
	var LockAcquireTimeoutError = class extends Error {
		constructor(message) {
			super(message);
			this.isAcquireTimeout = true;
		}
	};
	exports.LockAcquireTimeoutError = LockAcquireTimeoutError;
	var NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {};
	exports.NavigatorLockAcquireTimeoutError = NavigatorLockAcquireTimeoutError;
	var ProcessLockAcquireTimeoutError = class extends LockAcquireTimeoutError {};
	exports.ProcessLockAcquireTimeoutError = ProcessLockAcquireTimeoutError;
	async function navigatorLock(name, acquireTimeout, fn) {
		if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
		const abortController = new globalThis.AbortController();
		let acquireTimeoutTimer;
		if (acquireTimeout > 0) acquireTimeoutTimer = setTimeout(() => {
			abortController.abort();
			if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
		}, acquireTimeout);
		await Promise.resolve();
		try {
			return await globalThis.navigator.locks.request(name, acquireTimeout === 0 ? {
				mode: "exclusive",
				ifAvailable: true
			} : {
				mode: "exclusive",
				signal: abortController.signal
			}, async (lock) => {
				if (lock) {
					clearTimeout(acquireTimeoutTimer);
					if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: acquired", name, lock.name);
					try {
						return await fn();
					} finally {
						if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: released", name, lock.name);
					}
				} else if (acquireTimeout === 0) {
					if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name);
					throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
				} else {
					if (exports.internals.debug) try {
						const result = await globalThis.navigator.locks.query();
						console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
					} catch (e) {
						console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
					}
					console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
					clearTimeout(acquireTimeoutTimer);
					return await fn();
				}
			});
		} catch (e) {
			if (acquireTimeout > 0) clearTimeout(acquireTimeoutTimer);
			if (e !== null && typeof e === "object" && "name" in e && e.name === "AbortError" && acquireTimeout > 0) if (abortController.signal.aborted) {
				if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock", name);
				console.warn(`@supabase/gotrue-js: Lock "${name}" was not released within ${acquireTimeout}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`);
				return await Promise.resolve().then(() => globalThis.navigator.locks.request(name, {
					mode: "exclusive",
					steal: true
				}, async (lock) => {
					if (lock) {
						if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)", name, lock.name);
						try {
							return await fn();
						} finally {
							if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: released (stolen)", name, lock.name);
						}
					} else {
						console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true");
						return await fn();
					}
				}));
			} else {
				if (exports.internals.debug) console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request", name);
				throw new NavigatorLockAcquireTimeoutError(`Lock "${name}" was released because another request stole it`);
			}
			throw e;
		}
	}
	const PROCESS_LOCKS = {};
	async function processLock(name, acquireTimeout, fn) {
		var _a;
		const previousOperation = (_a = PROCESS_LOCKS[name]) !== null && _a !== void 0 ? _a : Promise.resolve();
		const previousOperationHandled = (async () => {
			try {
				await previousOperation;
				return null;
			} catch (e) {
				return null;
			}
		})();
		const currentOperation = (async () => {
			let timeoutId = null;
			try {
				const timeoutPromise = acquireTimeout >= 0 ? new Promise((_, reject) => {
					timeoutId = setTimeout(() => {
						console.warn(`@supabase/gotrue-js: Lock "${name}" acquisition timed out after ${acquireTimeout}ms. This may be caused by another operation holding the lock. Consider increasing lockAcquireTimeout or checking for stuck operations.`);
						reject(new ProcessLockAcquireTimeoutError(`Acquiring process lock with name "${name}" timed out`));
					}, acquireTimeout);
				}) : null;
				await Promise.race([previousOperationHandled, timeoutPromise].filter((x) => x));
				if (timeoutId !== null) clearTimeout(timeoutId);
			} catch (e) {
				if (timeoutId !== null) clearTimeout(timeoutId);
				if (e instanceof LockAcquireTimeoutError) throw e;
			}
			return await fn();
		})();
		PROCESS_LOCKS[name] = (async () => {
			try {
				return await currentOperation;
			} catch (e) {
				if (e instanceof LockAcquireTimeoutError) {
					try {
						await previousOperation;
					} catch (prevError) {}
					return null;
				}
				throw e;
			}
		})();
		return await currentOperation;
	}
}));
var require_polyfills = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.polyfillGlobalThis = polyfillGlobalThis;
	function polyfillGlobalThis() {
		if (typeof globalThis === "object") return;
		try {
			Object.defineProperty(Object.prototype, "__magic__", {
				get: function() {
					return this;
				},
				configurable: true
			});
			__magic__.globalThis = __magic__;
			delete Object.prototype.__magic__;
		} catch (e) {
			if (typeof self !== "undefined") self.globalThis = self;
		}
	}
}));
var require_ethereum = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAddress = getAddress;
	exports.fromHex = fromHex;
	exports.toHex = toHex;
	exports.createSiweMessage = createSiweMessage;
	function getAddress(address) {
		if (!/^0x[a-fA-F0-9]{40}$/.test(address)) throw new Error(`@supabase/auth-js: Address "${address}" is invalid.`);
		return address.toLowerCase();
	}
	function fromHex(hex) {
		return parseInt(hex, 16);
	}
	function toHex(value) {
		const bytes = new TextEncoder().encode(value);
		return "0x" + Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
	}
	function createSiweMessage(parameters) {
		var _a;
		const { chainId, domain, expirationTime, issuedAt = new Date(), nonce, notBefore, requestId, resources, scheme, uri, version } = parameters;
		if (!Number.isInteger(chainId)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${chainId}`);
		if (!domain) throw new Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);
		if (nonce && nonce.length < 8) throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${nonce}`);
		if (!uri) throw new Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);
		if (version !== "1") throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${version}`);
		if ((_a = parameters.statement) === null || _a === void 0 ? void 0 : _a.includes("\n")) throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${parameters.statement}`);
		const address = getAddress(parameters.address);
		const prefix = `${scheme ? `${scheme}://${domain}` : domain} wants you to sign in with your Ethereum account:\n${address}\n\n${parameters.statement ? `${parameters.statement}\n` : ""}`;
		let suffix = `URI: ${uri}\nVersion: ${version}\nChain ID: ${chainId}${nonce ? `\nNonce: ${nonce}` : ""}\nIssued At: ${issuedAt.toISOString()}`;
		if (expirationTime) suffix += `\nExpiration Time: ${expirationTime.toISOString()}`;
		if (notBefore) suffix += `\nNot Before: ${notBefore.toISOString()}`;
		if (requestId) suffix += `\nRequest ID: ${requestId}`;
		if (resources) {
			let content = "\nResources:";
			for (const resource of resources) {
				if (!resource || typeof resource !== "string") throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${resource}`);
				content += `\n- ${resource}`;
			}
			suffix += content;
		}
		return `${prefix}\n${suffix}`;
	}
}));
var require_webauthn_errors = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebAuthnUnknownError = exports.WebAuthnError = void 0;
	exports.isWebAuthnError = isWebAuthnError;
	exports.identifyRegistrationError = identifyRegistrationError;
	exports.identifyAuthenticationError = identifyAuthenticationError;
	const webauthn_1 = require_webauthn();
	var WebAuthnError = class extends Error {
		constructor({ message, code, cause, name }) {
			var _a;
			super(message, { cause });
			this.__isWebAuthnError = true;
			this.name = (_a = name !== null && name !== void 0 ? name : cause instanceof Error ? cause.name : void 0) !== null && _a !== void 0 ? _a : "Unknown Error";
			this.code = code;
		}
		toJSON() {
			return {
				name: this.name,
				message: this.message,
				code: this.code
			};
		}
	};
	exports.WebAuthnError = WebAuthnError;
	var WebAuthnUnknownError = class extends WebAuthnError {
		constructor(message, originalError) {
			super({
				code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
				cause: originalError,
				message
			});
			this.name = "WebAuthnUnknownError";
			this.originalError = originalError;
		}
	};
	exports.WebAuthnUnknownError = WebAuthnUnknownError;
	function isWebAuthnError(error) {
		return typeof error === "object" && error !== null && "__isWebAuthnError" in error;
	}
	function identifyRegistrationError({ error, options }) {
		var _a, _b, _c;
		const { publicKey } = options;
		if (!publicKey) throw Error("options was missing required publicKey property");
		if (error.name === "AbortError") {
			if (options.signal instanceof AbortSignal) return new WebAuthnError({
				message: "Registration ceremony was sent an abort signal",
				code: "ERROR_CEREMONY_ABORTED",
				cause: error
			});
		} else if (error.name === "ConstraintError") {
			if (((_a = publicKey.authenticatorSelection) === null || _a === void 0 ? void 0 : _a.requireResidentKey) === true) return new WebAuthnError({
				message: "Discoverable credentials were required but no available authenticator supported it",
				code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
				cause: error
			});
			else if (options.mediation === "conditional" && ((_b = publicKey.authenticatorSelection) === null || _b === void 0 ? void 0 : _b.userVerification) === "required") return new WebAuthnError({
				message: "User verification was required during automatic registration but it could not be performed",
				code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
				cause: error
			});
			else if (((_c = publicKey.authenticatorSelection) === null || _c === void 0 ? void 0 : _c.userVerification) === "required") return new WebAuthnError({
				message: "User verification was required but no available authenticator supported it",
				code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
				cause: error
			});
		} else if (error.name === "InvalidStateError") return new WebAuthnError({
			message: "The authenticator was previously registered",
			code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
			cause: error
		});
		else if (error.name === "NotAllowedError") return new WebAuthnError({
			message: error.message,
			code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
			cause: error
		});
		else if (error.name === "NotSupportedError") {
			if (publicKey.pubKeyCredParams.filter((param) => param.type === "public-key").length === 0) return new WebAuthnError({
				message: "No entry in pubKeyCredParams was of type \"public-key\"",
				code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
				cause: error
			});
			return new WebAuthnError({
				message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
				code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
				cause: error
			});
		} else if (error.name === "SecurityError") {
			const effectiveDomain = window.location.hostname;
			if (!(0, webauthn_1.isValidDomain)(effectiveDomain)) return new WebAuthnError({
				message: `${window.location.hostname} is an invalid domain`,
				code: "ERROR_INVALID_DOMAIN",
				cause: error
			});
			else if (publicKey.rp.id !== effectiveDomain) return new WebAuthnError({
				message: `The RP ID "${publicKey.rp.id}" is invalid for this domain`,
				code: "ERROR_INVALID_RP_ID",
				cause: error
			});
		} else if (error.name === "TypeError") {
			if (publicKey.user.id.byteLength < 1 || publicKey.user.id.byteLength > 64) return new WebAuthnError({
				message: "User ID was not between 1 and 64 characters",
				code: "ERROR_INVALID_USER_ID_LENGTH",
				cause: error
			});
		} else if (error.name === "UnknownError") return new WebAuthnError({
			message: "The authenticator was unable to process the specified options, or could not create a new credential",
			code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
			cause: error
		});
		return new WebAuthnError({
			message: "a Non-Webauthn related error has occurred",
			code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
			cause: error
		});
	}
	function identifyAuthenticationError({ error, options }) {
		const { publicKey } = options;
		if (!publicKey) throw Error("options was missing required publicKey property");
		if (error.name === "AbortError") {
			if (options.signal instanceof AbortSignal) return new WebAuthnError({
				message: "Authentication ceremony was sent an abort signal",
				code: "ERROR_CEREMONY_ABORTED",
				cause: error
			});
		} else if (error.name === "NotAllowedError") return new WebAuthnError({
			message: error.message,
			code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
			cause: error
		});
		else if (error.name === "SecurityError") {
			const effectiveDomain = window.location.hostname;
			if (!(0, webauthn_1.isValidDomain)(effectiveDomain)) return new WebAuthnError({
				message: `${window.location.hostname} is an invalid domain`,
				code: "ERROR_INVALID_DOMAIN",
				cause: error
			});
			else if (publicKey.rpId !== effectiveDomain) return new WebAuthnError({
				message: `The RP ID "${publicKey.rpId}" is invalid for this domain`,
				code: "ERROR_INVALID_RP_ID",
				cause: error
			});
		} else if (error.name === "UnknownError") return new WebAuthnError({
			message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
			code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
			cause: error
		});
		return new WebAuthnError({
			message: "a Non-Webauthn related error has occurred",
			code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
			cause: error
		});
	}
}));
var require_webauthn = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebAuthnApi = exports.DEFAULT_REQUEST_OPTIONS = exports.DEFAULT_CREATION_OPTIONS = exports.webAuthnAbortService = exports.WebAuthnAbortService = exports.identifyAuthenticationError = exports.identifyRegistrationError = exports.isWebAuthnError = exports.WebAuthnError = void 0;
	exports.deserializeCredentialCreationOptions = deserializeCredentialCreationOptions;
	exports.deserializeCredentialRequestOptions = deserializeCredentialRequestOptions;
	exports.serializeCredentialCreationResponse = serializeCredentialCreationResponse;
	exports.serializeCredentialRequestResponse = serializeCredentialRequestResponse;
	exports.isValidDomain = isValidDomain;
	exports.browserSupportsWebAuthn = browserSupportsWebAuthn;
	exports.createCredential = createCredential;
	exports.getCredential = getCredential;
	exports.mergeCredentialCreationOptions = mergeCredentialCreationOptions;
	exports.mergeCredentialRequestOptions = mergeCredentialRequestOptions;
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	const base64url_1 = require_base64url();
	const errors_1 = require_errors();
	const helpers_1 = require_helpers();
	const webauthn_errors_1 = require_webauthn_errors();
	Object.defineProperty(exports, "identifyAuthenticationError", {
		enumerable: true,
		get: function() {
			return webauthn_errors_1.identifyAuthenticationError;
		}
	});
	Object.defineProperty(exports, "identifyRegistrationError", {
		enumerable: true,
		get: function() {
			return webauthn_errors_1.identifyRegistrationError;
		}
	});
	Object.defineProperty(exports, "isWebAuthnError", {
		enumerable: true,
		get: function() {
			return webauthn_errors_1.isWebAuthnError;
		}
	});
	Object.defineProperty(exports, "WebAuthnError", {
		enumerable: true,
		get: function() {
			return webauthn_errors_1.WebAuthnError;
		}
	});
	var WebAuthnAbortService = class {
		createNewAbortSignal() {
			if (this.controller) {
				const abortError = new Error("Cancelling existing WebAuthn API call for new one");
				abortError.name = "AbortError";
				this.controller.abort(abortError);
			}
			const newController = new AbortController();
			this.controller = newController;
			return newController.signal;
		}
		cancelCeremony() {
			if (this.controller) {
				const abortError = new Error("Manually cancelling existing WebAuthn API call");
				abortError.name = "AbortError";
				this.controller.abort(abortError);
				this.controller = void 0;
			}
		}
	};
	exports.WebAuthnAbortService = WebAuthnAbortService;
	exports.webAuthnAbortService = new WebAuthnAbortService();
	function deserializeCredentialCreationOptions(options) {
		if (!options) throw new Error("Credential creation options are required");
		if (typeof PublicKeyCredential !== "undefined" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON === "function") return PublicKeyCredential.parseCreationOptionsFromJSON(options);
		const { challenge: challengeStr, user: userOpts, excludeCredentials } = options, restOptions = tslib_1.__rest(options, [
			"challenge",
			"user",
			"excludeCredentials"
		]);
		const challenge = (0, base64url_1.base64UrlToUint8Array)(challengeStr).buffer;
		const user = Object.assign(Object.assign({}, userOpts), { id: (0, base64url_1.base64UrlToUint8Array)(userOpts.id).buffer });
		const result = Object.assign(Object.assign({}, restOptions), {
			challenge,
			user
		});
		if (excludeCredentials && excludeCredentials.length > 0) {
			result.excludeCredentials = new Array(excludeCredentials.length);
			for (let i = 0; i < excludeCredentials.length; i++) {
				const cred = excludeCredentials[i];
				result.excludeCredentials[i] = Object.assign(Object.assign({}, cred), {
					id: (0, base64url_1.base64UrlToUint8Array)(cred.id).buffer,
					type: cred.type || "public-key",
					transports: cred.transports
				});
			}
		}
		return result;
	}
	function deserializeCredentialRequestOptions(options) {
		if (!options) throw new Error("Credential request options are required");
		if (typeof PublicKeyCredential !== "undefined" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON === "function") return PublicKeyCredential.parseRequestOptionsFromJSON(options);
		const { challenge: challengeStr, allowCredentials } = options, restOptions = tslib_1.__rest(options, ["challenge", "allowCredentials"]);
		const challenge = (0, base64url_1.base64UrlToUint8Array)(challengeStr).buffer;
		const result = Object.assign(Object.assign({}, restOptions), { challenge });
		if (allowCredentials && allowCredentials.length > 0) {
			result.allowCredentials = new Array(allowCredentials.length);
			for (let i = 0; i < allowCredentials.length; i++) {
				const cred = allowCredentials[i];
				result.allowCredentials[i] = Object.assign(Object.assign({}, cred), {
					id: (0, base64url_1.base64UrlToUint8Array)(cred.id).buffer,
					type: cred.type || "public-key",
					transports: cred.transports
				});
			}
		}
		return result;
	}
	function serializeCredentialCreationResponse(credential) {
		var _a;
		if ("toJSON" in credential && typeof credential.toJSON === "function") return credential.toJSON();
		const credentialWithAttachment = credential;
		return {
			id: credential.id,
			rawId: credential.id,
			response: {
				attestationObject: (0, base64url_1.bytesToBase64URL)(new Uint8Array(credential.response.attestationObject)),
				clientDataJSON: (0, base64url_1.bytesToBase64URL)(new Uint8Array(credential.response.clientDataJSON))
			},
			type: "public-key",
			clientExtensionResults: credential.getClientExtensionResults(),
			authenticatorAttachment: (_a = credentialWithAttachment.authenticatorAttachment) !== null && _a !== void 0 ? _a : void 0
		};
	}
	function serializeCredentialRequestResponse(credential) {
		var _a;
		if ("toJSON" in credential && typeof credential.toJSON === "function") return credential.toJSON();
		const credentialWithAttachment = credential;
		const clientExtensionResults = credential.getClientExtensionResults();
		const assertionResponse = credential.response;
		return {
			id: credential.id,
			rawId: credential.id,
			response: {
				authenticatorData: (0, base64url_1.bytesToBase64URL)(new Uint8Array(assertionResponse.authenticatorData)),
				clientDataJSON: (0, base64url_1.bytesToBase64URL)(new Uint8Array(assertionResponse.clientDataJSON)),
				signature: (0, base64url_1.bytesToBase64URL)(new Uint8Array(assertionResponse.signature)),
				userHandle: assertionResponse.userHandle ? (0, base64url_1.bytesToBase64URL)(new Uint8Array(assertionResponse.userHandle)) : void 0
			},
			type: "public-key",
			clientExtensionResults,
			authenticatorAttachment: (_a = credentialWithAttachment.authenticatorAttachment) !== null && _a !== void 0 ? _a : void 0
		};
	}
	function isValidDomain(hostname) {
		return hostname === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(hostname);
	}
	function browserSupportsWebAuthn() {
		var _a, _b;
		return !!((0, helpers_1.isBrowser)() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _a === void 0 ? void 0 : _a.create) === "function" && typeof ((_b = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _b === void 0 ? void 0 : _b.get) === "function");
	}
	async function createCredential(options) {
		try {
			const response = await navigator.credentials.create(options);
			if (!response) return {
				data: null,
				error: new webauthn_errors_1.WebAuthnUnknownError("Empty credential response", response)
			};
			if (!(response instanceof PublicKeyCredential)) return {
				data: null,
				error: new webauthn_errors_1.WebAuthnUnknownError("Browser returned unexpected credential type", response)
			};
			return {
				data: response,
				error: null
			};
		} catch (err) {
			return {
				data: null,
				error: (0, webauthn_errors_1.identifyRegistrationError)({
					error: err,
					options
				})
			};
		}
	}
	async function getCredential(options) {
		try {
			const response = await navigator.credentials.get(options);
			if (!response) return {
				data: null,
				error: new webauthn_errors_1.WebAuthnUnknownError("Empty credential response", response)
			};
			if (!(response instanceof PublicKeyCredential)) return {
				data: null,
				error: new webauthn_errors_1.WebAuthnUnknownError("Browser returned unexpected credential type", response)
			};
			return {
				data: response,
				error: null
			};
		} catch (err) {
			return {
				data: null,
				error: (0, webauthn_errors_1.identifyAuthenticationError)({
					error: err,
					options
				})
			};
		}
	}
	exports.DEFAULT_CREATION_OPTIONS = {
		hints: ["security-key"],
		authenticatorSelection: {
			authenticatorAttachment: "cross-platform",
			requireResidentKey: false,
			userVerification: "preferred",
			residentKey: "discouraged"
		},
		attestation: "direct"
	};
	exports.DEFAULT_REQUEST_OPTIONS = {
		userVerification: "preferred",
		hints: ["security-key"],
		attestation: "direct"
	};
	function deepMerge(...sources) {
		const isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
		const isArrayBufferLike = (val) => val instanceof ArrayBuffer || ArrayBuffer.isView(val);
		const result = {};
		for (const source of sources) {
			if (!source) continue;
			for (const key in source) {
				const value = source[key];
				if (value === void 0) continue;
				if (Array.isArray(value)) result[key] = value;
				else if (isArrayBufferLike(value)) result[key] = value;
				else if (isObject(value)) {
					const existing = result[key];
					if (isObject(existing)) result[key] = deepMerge(existing, value);
					else result[key] = deepMerge(value);
				} else result[key] = value;
			}
		}
		return result;
	}
	function mergeCredentialCreationOptions(baseOptions, overrides) {
		return deepMerge(exports.DEFAULT_CREATION_OPTIONS, baseOptions, overrides || {});
	}
	function mergeCredentialRequestOptions(baseOptions, overrides) {
		return deepMerge(exports.DEFAULT_REQUEST_OPTIONS, baseOptions, overrides || {});
	}
	var WebAuthnApi = class {
		constructor(client) {
			this.client = client;
			this.enroll = this._enroll.bind(this);
			this.challenge = this._challenge.bind(this);
			this.verify = this._verify.bind(this);
			this.authenticate = this._authenticate.bind(this);
			this.register = this._register.bind(this);
		}
		async _enroll(params) {
			return this.client.mfa.enroll(Object.assign(Object.assign({}, params), { factorType: "webauthn" }));
		}
		async _challenge({ factorId, webauthn, friendlyName, signal }, overrides) {
			var _a;
			try {
				const { data: challengeResponse, error: challengeError } = await this.client.mfa.challenge({
					factorId,
					webauthn
				});
				if (!challengeResponse) return {
					data: null,
					error: challengeError
				};
				const abortSignal = signal !== null && signal !== void 0 ? signal : exports.webAuthnAbortService.createNewAbortSignal();
				if (challengeResponse.webauthn.type === "create") {
					const { user } = challengeResponse.webauthn.credential_options.publicKey;
					if (!user.name) {
						const nameToUse = friendlyName;
						if (!nameToUse) {
							const userData = (await this.client.getUser()).data.user;
							const fallbackName = ((_a = userData === null || userData === void 0 ? void 0 : userData.user_metadata) === null || _a === void 0 ? void 0 : _a.name) || (userData === null || userData === void 0 ? void 0 : userData.email) || (userData === null || userData === void 0 ? void 0 : userData.id) || "User";
							user.name = `${user.id}:${fallbackName}`;
						} else user.name = `${user.id}:${nameToUse}`;
					}
					if (!user.displayName) user.displayName = user.name;
				}
				switch (challengeResponse.webauthn.type) {
					case "create": {
						const { data, error } = await createCredential({
							publicKey: mergeCredentialCreationOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.create),
							signal: abortSignal
						});
						if (data) return {
							data: {
								factorId,
								challengeId: challengeResponse.id,
								webauthn: {
									type: challengeResponse.webauthn.type,
									credential_response: data
								}
							},
							error: null
						};
						return {
							data: null,
							error
						};
					}
					case "request": {
						const options = mergeCredentialRequestOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.request);
						const { data, error } = await getCredential(Object.assign(Object.assign({}, challengeResponse.webauthn.credential_options), {
							publicKey: options,
							signal: abortSignal
						}));
						if (data) return {
							data: {
								factorId,
								challengeId: challengeResponse.id,
								webauthn: {
									type: challengeResponse.webauthn.type,
									credential_response: data
								}
							},
							error: null
						};
						return {
							data: null,
							error
						};
					}
				}
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				return {
					data: null,
					error: new errors_1.AuthUnknownError("Unexpected error in challenge", error)
				};
			}
		}
		async _verify({ challengeId, factorId, webauthn }) {
			return this.client.mfa.verify({
				factorId,
				challengeId,
				webauthn
			});
		}
		async _authenticate({ factorId, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal } = {} }, overrides) {
			if (!rpId) return {
				data: null,
				error: new errors_1.AuthError("rpId is required for WebAuthn authentication")
			};
			try {
				if (!browserSupportsWebAuthn()) return {
					data: null,
					error: new errors_1.AuthUnknownError("Browser does not support WebAuthn", null)
				};
				const { data: challengeResponse, error: challengeError } = await this.challenge({
					factorId,
					webauthn: {
						rpId,
						rpOrigins
					},
					signal
				}, { request: overrides });
				if (!challengeResponse) return {
					data: null,
					error: challengeError
				};
				const { webauthn } = challengeResponse;
				return this._verify({
					factorId,
					challengeId: challengeResponse.challengeId,
					webauthn: {
						type: webauthn.type,
						rpId,
						rpOrigins,
						credential_response: webauthn.credential_response
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				return {
					data: null,
					error: new errors_1.AuthUnknownError("Unexpected error in authenticate", error)
				};
			}
		}
		async _register({ friendlyName, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal } = {} }, overrides) {
			if (!rpId) return {
				data: null,
				error: new errors_1.AuthError("rpId is required for WebAuthn registration")
			};
			try {
				if (!browserSupportsWebAuthn()) return {
					data: null,
					error: new errors_1.AuthUnknownError("Browser does not support WebAuthn", null)
				};
				const { data: factor, error: enrollError } = await this._enroll({ friendlyName });
				if (!factor) {
					await this.client.mfa.listFactors().then((factors) => {
						var _a;
						return (_a = factors.data) === null || _a === void 0 ? void 0 : _a.all.find((v) => v.factor_type === "webauthn" && v.friendly_name === friendlyName && v.status !== "unverified");
					}).then((factor) => factor ? this.client.mfa.unenroll({ factorId: factor === null || factor === void 0 ? void 0 : factor.id }) : void 0);
					return {
						data: null,
						error: enrollError
					};
				}
				const { data: challengeResponse, error: challengeError } = await this._challenge({
					factorId: factor.id,
					friendlyName: factor.friendly_name,
					webauthn: {
						rpId,
						rpOrigins
					},
					signal
				}, { create: overrides });
				if (!challengeResponse) return {
					data: null,
					error: challengeError
				};
				return this._verify({
					factorId: factor.id,
					challengeId: challengeResponse.challengeId,
					webauthn: {
						rpId,
						rpOrigins,
						type: challengeResponse.webauthn.type,
						credential_response: challengeResponse.webauthn.credential_response
					}
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return {
					data: null,
					error
				};
				return {
					data: null,
					error: new errors_1.AuthUnknownError("Unexpected error in register", error)
				};
			}
		}
	};
	exports.WebAuthnApi = WebAuthnApi;
}));
var require_GoTrueClient = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const GoTrueAdminApi_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_GoTrueAdminApi());
	const constants_1 = require_constants();
	const errors_1 = require_errors();
	const fetch_1 = require_fetch();
	const helpers_1 = require_helpers();
	const local_storage_1 = require_local_storage();
	const locks_1 = require_locks();
	const polyfills_1 = require_polyfills();
	const version_1 = require_version();
	const base64url_1 = require_base64url();
	const ethereum_1 = require_ethereum();
	const webauthn_1 = require_webauthn();
	(0, polyfills_1.polyfillGlobalThis)();
	const DEFAULT_OPTIONS = {
		url: constants_1.GOTRUE_URL,
		storageKey: constants_1.STORAGE_KEY,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
		headers: constants_1.DEFAULT_HEADERS,
		flowType: "implicit",
		debug: false,
		hasCustomAuthorizationHeader: false,
		throwOnError: false,
		lockAcquireTimeout: 5e3,
		skipAutoInitialize: false,
		experimental: {}
	};
	const GLOBAL_JWKS = {};
	var GoTrueClient = class GoTrueClient {
		get jwks() {
			var _a, _b;
			return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.jwks) !== null && _b !== void 0 ? _b : { keys: [] };
		}
		set jwks(value) {
			GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: value });
		}
		get jwks_cached_at() {
			var _a, _b;
			return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.cachedAt) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
		}
		set jwks_cached_at(value) {
			GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: value });
		}
		constructor(options) {
			var _a, _b, _c;
			this.userStorage = null;
			this.memoryStorage = null;
			this.stateChangeEmitters = new Map();
			this.autoRefreshTicker = null;
			this.autoRefreshTickTimeout = null;
			this.visibilityChangedCallback = null;
			this.refreshingDeferred = null;
			this.lastRefreshFailure = null;
			this._sessionRemovalEpoch = 0;
			this.initializePromise = null;
			this._pendingInitNotifications = null;
			this.detectSessionInUrl = true;
			this.hasCustomAuthorizationHeader = false;
			this.suppressGetSessionWarning = false;
			this.lock = null;
			this.lockAcquired = false;
			this.pendingInLock = [];
			this.broadcastChannel = null;
			this.logger = console.log;
			const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
			this.storageKey = settings.storageKey;
			this.instanceID = (_a = GoTrueClient.nextInstanceID[this.storageKey]) !== null && _a !== void 0 ? _a : 0;
			GoTrueClient.nextInstanceID[this.storageKey] = this.instanceID + 1;
			this.logDebugMessages = !!settings.debug;
			if (typeof settings.debug === "function") this.logger = settings.debug;
			if (this.instanceID > 0 && (0, helpers_1.isBrowser)()) {
				const message = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
				console.warn(message);
				if (this.logDebugMessages) console.trace(message);
			}
			this.persistSession = settings.persistSession;
			this.autoRefreshToken = settings.autoRefreshToken;
			this.experimental = (_b = settings.experimental) !== null && _b !== void 0 ? _b : {};
			this.admin = new GoTrueAdminApi_1.default({
				url: settings.url,
				headers: settings.headers,
				fetch: settings.fetch,
				experimental: this.experimental
			});
			this.url = settings.url;
			this.headers = settings.headers;
			this.fetch = (0, helpers_1.resolveFetch)(settings.fetch);
			this.detectSessionInUrl = settings.detectSessionInUrl;
			this.flowType = settings.flowType;
			this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
			this.throwOnError = settings.throwOnError;
			this.lockAcquireTimeout = settings.lockAcquireTimeout;
			if (settings.lock != null) this.lock = settings.lock;
			if (!this.jwks) {
				this.jwks = { keys: [] };
				this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
			}
			this.mfa = {
				verify: this._verify.bind(this),
				enroll: this._enroll.bind(this),
				unenroll: this._unenroll.bind(this),
				challenge: this._challenge.bind(this),
				listFactors: this._listFactors.bind(this),
				challengeAndVerify: this._challengeAndVerify.bind(this),
				getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
				webauthn: new webauthn_1.WebAuthnApi(this)
			};
			this.oauth = {
				getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
				approveAuthorization: this._approveAuthorization.bind(this),
				denyAuthorization: this._denyAuthorization.bind(this),
				listGrants: this._listOAuthGrants.bind(this),
				revokeGrant: this._revokeOAuthGrant.bind(this)
			};
			this.passkey = {
				startRegistration: this._startPasskeyRegistration.bind(this),
				verifyRegistration: this._verifyPasskeyRegistration.bind(this),
				startAuthentication: this._startPasskeyAuthentication.bind(this),
				verifyAuthentication: this._verifyPasskeyAuthentication.bind(this),
				list: this._listPasskeys.bind(this),
				update: this._updatePasskey.bind(this),
				delete: this._deletePasskey.bind(this)
			};
			if (this.persistSession) {
				if (settings.storage) this.storage = settings.storage;
				else if ((0, helpers_1.supportsLocalStorage)()) this.storage = globalThis.localStorage;
				else {
					this.memoryStorage = {};
					this.storage = (0, local_storage_1.memoryLocalStorageAdapter)(this.memoryStorage);
				}
				if (settings.userStorage) this.userStorage = settings.userStorage;
			} else {
				this.memoryStorage = {};
				this.storage = (0, local_storage_1.memoryLocalStorageAdapter)(this.memoryStorage);
			}
			if ((0, helpers_1.isBrowser)() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
				try {
					this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
				} catch (e) {
					console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
				}
				(_c = this.broadcastChannel) === null || _c === void 0 || _c.addEventListener("message", async (event) => {
					this._debug("received broadcast notification from other tab or client", event);
					if (event.data.event === "TOKEN_REFRESHED" || event.data.event === "SIGNED_IN") this.lastRefreshFailure = null;
					try {
						await this._notifyAllSubscribers(event.data.event, event.data.session, false);
					} catch (error) {
						this._debug("#broadcastChannel", "error", error);
					}
				});
			}
			if (!settings.skipAutoInitialize) this.initialize().catch((error) => {
				this._debug("#initialize()", "error", error);
			});
		}
		isThrowOnErrorEnabled() {
			return this.throwOnError;
		}
		_returnResult(result) {
			if (this.throwOnError && result && result.error) throw result.error;
			return result;
		}
		_logPrefix() {
			return `GoTrueClient@${this.storageKey}:${this.instanceID} (${version_1.version}) ${new Date().toISOString()}`;
		}
		_debug(...args) {
			if (this.logDebugMessages) this.logger(this._logPrefix(), ...args);
			return this;
		}
		async initialize() {
			var _a;
			if (this.initializePromise) return await this.initializePromise;
			this._pendingInitNotifications = [];
			this.initializePromise = (async () => {
				if (this.lock != null) return await this._acquireLock(this.lockAcquireTimeout, async () => {
					return await this._initialize();
				});
				return await this._initialize();
			})();
			const result = await this.initializePromise;
			const queue = (_a = this._pendingInitNotifications) !== null && _a !== void 0 ? _a : [];
			this._pendingInitNotifications = null;
			for (const n of queue) await this._notifyAllSubscribers(n.event, n.session, n.broadcast);
			return result;
		}
		async _initialize() {
			var _a;
			try {
				let params = {};
				let callbackUrlType = "none";
				if ((0, helpers_1.isBrowser)()) {
					params = (0, helpers_1.parseParametersFromURL)(window.location.href);
					if (this._isImplicitGrantCallback(params)) callbackUrlType = "implicit";
					else if (await this._isPKCECallback(params)) callbackUrlType = "pkce";
				}
				if ((0, helpers_1.isBrowser)() && this.detectSessionInUrl && callbackUrlType !== "none") {
					const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
					if (error) {
						this._debug("#_initialize()", "error detecting session from URL", error);
						if ((0, errors_1.isAuthImplicitGrantRedirectError)(error)) {
							const errorCode = (_a = error.details) === null || _a === void 0 ? void 0 : _a.code;
							if (errorCode === "identity_already_exists" || errorCode === "identity_not_found" || errorCode === "single_identity_not_deletable") return { error };
						}
						return { error };
					}
					const { session, redirectType } = data;
					this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
					await this._saveSession(session);
					setTimeout(async () => {
						if (redirectType === "recovery") await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
						else await this._notifyAllSubscribers("SIGNED_IN", session);
					}, 0);
					return { error: null };
				}
				await this._recoverAndRefresh();
				return { error: null };
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({ error });
				return this._returnResult({ error: new errors_1.AuthUnknownError("Unexpected error during initialization", error) });
			} finally {
				await this._handleVisibilityChange();
				this._debug("#_initialize()", "end");
			}
		}
		async signInAnonymously(credentials) {
			var _a, _b, _c;
			try {
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/signup`, {
					headers: this.headers,
					body: {
						data: (_b = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {},
						gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken }
					},
					xform: fetch_1._sessionResponse
				});
				if (error || !data) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				const session = data.session;
				const user = data.user;
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("SIGNED_IN", session);
				}
				return this._returnResult({
					data: {
						user,
						session
					},
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async signUp(credentials) {
			var _a, _b, _c;
			let flowId = null;
			try {
				let res;
				if ("email" in credentials) {
					const { email, password, options } = credentials;
					let codeChallenge = null;
					let codeChallengeMethod = null;
					if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod, flowId] = await this._getCodeChallengeAndMethod();
					res = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/signup`, {
						headers: this.headers,
						redirectTo: this._maybeAppendFlowIdToRedirect(options === null || options === void 0 ? void 0 : options.emailRedirectTo, flowId),
						body: {
							email,
							password,
							data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
							code_challenge: codeChallenge,
							code_challenge_method: codeChallengeMethod
						},
						xform: fetch_1._sessionResponse
					});
				} else if ("phone" in credentials) {
					const { phone, password, options } = credentials;
					res = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/signup`, {
						headers: this.headers,
						body: {
							phone,
							password,
							data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
							channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
						},
						xform: fetch_1._sessionResponse
					});
				} else throw new errors_1.AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
				const { data, error } = res;
				if (error || !data) {
					await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
				}
				const session = data.session;
				const user = data.user;
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("SIGNED_IN", session);
				}
				return this._returnResult({
					data: {
						user,
						session
					},
					error: null
				});
			} catch (error) {
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async signInWithPassword(credentials) {
			try {
				let res;
				if ("email" in credentials) {
					const { email, password, options } = credentials;
					res = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
						headers: this.headers,
						body: {
							email,
							password,
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
						},
						xform: fetch_1._sessionResponsePassword
					});
				} else if ("phone" in credentials) {
					const { phone, password, options } = credentials;
					res = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
						headers: this.headers,
						body: {
							phone,
							password,
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
						},
						xform: fetch_1._sessionResponsePassword
					});
				} else throw new errors_1.AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
				const { data, error } = res;
				if (error) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				else if (!data || !data.session || !data.user) {
					const invalidTokenError = new errors_1.AuthInvalidTokenResponseError();
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error: invalidTokenError
					});
				}
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("SIGNED_IN", data.session);
				}
				return this._returnResult({
					data: Object.assign({
						user: data.user,
						session: data.session
					}, data.weak_password ? { weakPassword: data.weak_password } : null),
					error
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async signInWithOAuth(credentials) {
			var _a, _b, _c, _d;
			return await this._handleProviderSignIn(credentials.provider, {
				redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
				scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
				queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
				skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
			});
		}
		async exchangeCodeForSession(authCode, options) {
			await this.initializePromise;
			if (this.lock != null) return this._acquireLock(this.lockAcquireTimeout, async () => {
				return this._exchangeCodeForSession(authCode, options);
			});
			return this._exchangeCodeForSession(authCode, options);
		}
		async signInWithWeb3(credentials) {
			const { chain } = credentials;
			switch (chain) {
				case "ethereum": return await this.signInWithEthereum(credentials);
				case "solana": return await this.signInWithSolana(credentials);
				default: throw new Error(`@supabase/auth-js: Unsupported chain "${chain}"`);
			}
		}
		async signInWithEthereum(credentials) {
			var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m;
			let message;
			let signature;
			if ("message" in credentials) {
				message = credentials.message;
				signature = credentials.signature;
			} else {
				const { chain, wallet, statement, options } = credentials;
				let resolvedWallet;
				if (!(0, helpers_1.isBrowser)()) {
					if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
					resolvedWallet = wallet;
				} else if (typeof wallet === "object") resolvedWallet = wallet;
				else {
					const windowAny = window;
					if ("ethereum" in windowAny && typeof windowAny.ethereum === "object" && "request" in windowAny.ethereum && typeof windowAny.ethereum.request === "function") resolvedWallet = windowAny.ethereum;
					else throw new Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`);
				}
				const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
				const accounts = await resolvedWallet.request({ method: "eth_requestAccounts" }).then((accs) => accs).catch(() => {
					throw new Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`);
				});
				if (!accounts || accounts.length === 0) throw new Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);
				const address = (0, ethereum_1.getAddress)(accounts[0]);
				let chainId = (_b = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _b === void 0 ? void 0 : _b.chainId;
				if (!chainId) {
					const chainIdHex = await resolvedWallet.request({ method: "eth_chainId" });
					chainId = (0, ethereum_1.fromHex)(chainIdHex);
				}
				const siweMessage = {
					domain: url.host,
					address,
					statement,
					uri: url.href,
					version: "1",
					chainId,
					nonce: (_c = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _c === void 0 ? void 0 : _c.nonce,
					issuedAt: (_f = (_d = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _d === void 0 ? void 0 : _d.issuedAt) !== null && _f !== void 0 ? _f : new Date(),
					expirationTime: (_g = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _g === void 0 ? void 0 : _g.expirationTime,
					notBefore: (_h = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _h === void 0 ? void 0 : _h.notBefore,
					requestId: (_j = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _j === void 0 ? void 0 : _j.requestId,
					resources: (_k = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _k === void 0 ? void 0 : _k.resources
				};
				message = (0, ethereum_1.createSiweMessage)(siweMessage);
				signature = await resolvedWallet.request({
					method: "personal_sign",
					params: [(0, ethereum_1.toHex)(message), address]
				});
			}
			try {
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
					headers: this.headers,
					body: Object.assign({
						chain: "ethereum",
						message,
						signature
					}, ((_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken) ? { gotrue_meta_security: { captcha_token: (_m = credentials.options) === null || _m === void 0 ? void 0 : _m.captchaToken } } : null),
					xform: fetch_1._sessionResponse
				});
				if (error) throw error;
				if (!data || !data.session || !data.user) {
					const invalidTokenError = new errors_1.AuthInvalidTokenResponseError();
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error: invalidTokenError
					});
				}
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("SIGNED_IN", data.session);
				}
				return this._returnResult({
					data: Object.assign({}, data),
					error
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async signInWithSolana(credentials) {
			var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o;
			let message;
			let signature;
			if ("message" in credentials) {
				message = credentials.message;
				signature = credentials.signature;
			} else {
				const { chain, wallet, statement, options } = credentials;
				let resolvedWallet;
				if (!(0, helpers_1.isBrowser)()) {
					if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
					resolvedWallet = wallet;
				} else if (typeof wallet === "object") resolvedWallet = wallet;
				else {
					const windowAny = window;
					if ("solana" in windowAny && typeof windowAny.solana === "object" && ("signIn" in windowAny.solana && typeof windowAny.solana.signIn === "function" || "signMessage" in windowAny.solana && typeof windowAny.solana.signMessage === "function")) resolvedWallet = windowAny.solana;
					else throw new Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`);
				}
				const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
				if ("signIn" in resolvedWallet && resolvedWallet.signIn) {
					const output = await resolvedWallet.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: new Date().toISOString() }, options === null || options === void 0 ? void 0 : options.signInWithSolana), {
						version: "1",
						domain: url.host,
						uri: url.href
					}), statement ? { statement } : null));
					let outputToProcess;
					if (Array.isArray(output) && output[0] && typeof output[0] === "object") outputToProcess = output[0];
					else if (output && typeof output === "object" && "signedMessage" in output && "signature" in output) outputToProcess = output;
					else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
					if ("signedMessage" in outputToProcess && "signature" in outputToProcess && (typeof outputToProcess.signedMessage === "string" || outputToProcess.signedMessage instanceof Uint8Array) && outputToProcess.signature instanceof Uint8Array) {
						message = typeof outputToProcess.signedMessage === "string" ? outputToProcess.signedMessage : new TextDecoder().decode(outputToProcess.signedMessage);
						signature = outputToProcess.signature;
					} else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
				} else {
					if (!("signMessage" in resolvedWallet) || typeof resolvedWallet.signMessage !== "function" || !("publicKey" in resolvedWallet) || typeof resolvedWallet !== "object" || !resolvedWallet.publicKey || !("toBase58" in resolvedWallet.publicKey) || typeof resolvedWallet.publicKey.toBase58 !== "function") throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
					message = [
						`${url.host} wants you to sign in with your Solana account:`,
						resolvedWallet.publicKey.toBase58(),
						...statement ? [
							"",
							statement,
							""
						] : [""],
						"Version: 1",
						`URI: ${url.href}`,
						`Issued At: ${(_c = (_b = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _b === void 0 ? void 0 : _b.issuedAt) !== null && _c !== void 0 ? _c : new Date().toISOString()}`,
						...((_d = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _d === void 0 ? void 0 : _d.notBefore) ? [`Not Before: ${options.signInWithSolana.notBefore}`] : [],
						...((_f = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _f === void 0 ? void 0 : _f.expirationTime) ? [`Expiration Time: ${options.signInWithSolana.expirationTime}`] : [],
						...((_g = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _g === void 0 ? void 0 : _g.chainId) ? [`Chain ID: ${options.signInWithSolana.chainId}`] : [],
						...((_h = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _h === void 0 ? void 0 : _h.nonce) ? [`Nonce: ${options.signInWithSolana.nonce}`] : [],
						...((_j = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _j === void 0 ? void 0 : _j.requestId) ? [`Request ID: ${options.signInWithSolana.requestId}`] : [],
						...((_l = (_k = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _k === void 0 ? void 0 : _k.resources) === null || _l === void 0 ? void 0 : _l.length) ? ["Resources", ...options.signInWithSolana.resources.map((resource) => `- ${resource}`)] : []
					].join("\n");
					const maybeSignature = await resolvedWallet.signMessage(new TextEncoder().encode(message), "utf8");
					if (!maybeSignature || !(maybeSignature instanceof Uint8Array)) throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
					signature = maybeSignature;
				}
			}
			try {
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
					headers: this.headers,
					body: Object.assign({
						chain: "solana",
						message,
						signature: (0, base64url_1.bytesToBase64URL)(signature)
					}, ((_m = credentials.options) === null || _m === void 0 ? void 0 : _m.captchaToken) ? { gotrue_meta_security: { captcha_token: (_o = credentials.options) === null || _o === void 0 ? void 0 : _o.captchaToken } } : null),
					xform: fetch_1._sessionResponse
				});
				if (error) throw error;
				if (!data || !data.session || !data.user) {
					const invalidTokenError = new errors_1.AuthInvalidTokenResponseError();
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error: invalidTokenError
					});
				}
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("SIGNED_IN", data.session);
				}
				return this._returnResult({
					data: Object.assign({}, data),
					error
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async _exchangeCodeForSession(authCode, options) {
			const hasExplicitFlowId = (options === null || options === void 0 ? void 0 : options.flowId) != null;
			const requestedFlowId = hasExplicitFlowId ? (0, helpers_1.validatePKCEFlowId)(options === null || options === void 0 ? void 0 : options.flowId) : (0, helpers_1.isBrowser)() ? (0, helpers_1.validatePKCEFlowId)((0, helpers_1.parseParametersFromURL)(window.location.href)[constants_1.PKCE_FLOW_ID_PARAM]) : null;
			if (hasExplicitFlowId && !requestedFlowId) this._debug("#_exchangeCodeForSession()", "provided flowId is not a valid flow id", options === null || options === void 0 ? void 0 : options.flowId);
			const { verifier: storageItem, flowId } = hasExplicitFlowId && !requestedFlowId ? {
				verifier: null,
				flowId: null
			} : await (0, helpers_1.retrievePKCEVerifier)(this.storage, this.storageKey, requestedFlowId);
			const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
			try {
				if (!codeVerifier && this.flowType === "pkce") throw new errors_1.AuthPKCECodeVerifierMissingError();
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
					headers: this.headers,
					body: {
						auth_code: authCode,
						code_verifier: codeVerifier
					},
					xform: fetch_1._sessionResponse
				});
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if (error) throw error;
				if (!data || !data.session || !data.user) {
					const invalidTokenError = new errors_1.AuthInvalidTokenResponseError();
					return this._returnResult({
						data: {
							user: null,
							session: null,
							redirectType: null
						},
						error: invalidTokenError
					});
				}
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers(redirectType === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", data.session);
				}
				return this._returnResult({
					data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }),
					error
				});
			} catch (error) {
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null,
						redirectType: null
					},
					error
				});
				throw error;
			}
		}
		async signInWithIdToken(credentials) {
			try {
				const { options, provider, token, access_token, nonce } = credentials;
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
					headers: this.headers,
					body: {
						provider,
						id_token: token,
						access_token,
						nonce,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
					},
					xform: fetch_1._sessionResponse
				});
				if (error) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				else if (!data || !data.session || !data.user) {
					const invalidTokenError = new errors_1.AuthInvalidTokenResponseError();
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error: invalidTokenError
					});
				}
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("SIGNED_IN", data.session);
				}
				return this._returnResult({
					data,
					error
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async signInWithOtp(credentials) {
			var _a, _b, _c, _d, _f;
			let flowId = null;
			try {
				if ("email" in credentials) {
					const { email, options } = credentials;
					let codeChallenge = null;
					let codeChallengeMethod = null;
					if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod, flowId] = await this._getCodeChallengeAndMethod();
					const { error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/otp`, {
						headers: this.headers,
						body: {
							email,
							data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
							create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
							code_challenge: codeChallenge,
							code_challenge_method: codeChallengeMethod
						},
						redirectTo: this._maybeAppendFlowIdToRedirect(options === null || options === void 0 ? void 0 : options.emailRedirectTo, flowId)
					});
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
				}
				if ("phone" in credentials) {
					const { phone, options } = credentials;
					const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/otp`, {
						headers: this.headers,
						body: {
							phone,
							data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
							create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
							channel: (_f = options === null || options === void 0 ? void 0 : options.channel) !== null && _f !== void 0 ? _f : "sms"
						}
					});
					return this._returnResult({
						data: {
							user: null,
							session: null,
							messageId: data === null || data === void 0 ? void 0 : data.message_id
						},
						error
					});
				}
				throw new errors_1.AuthInvalidCredentialsError("You must provide either an email or phone number.");
			} catch (error) {
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async verifyOtp(params) {
			var _a, _b;
			try {
				let redirectTo = void 0;
				let captchaToken = void 0;
				if ("options" in params) {
					redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
					captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
				}
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/verify`, {
					headers: this.headers,
					body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
					redirectTo,
					xform: fetch_1._sessionResponse
				});
				if (error) throw error;
				if (!data) throw new Error("An error occurred on token verification.");
				const session = data.session;
				const user = data.user;
				if (session === null || session === void 0 ? void 0 : session.access_token) {
					await this._saveSession(session);
					await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
				}
				return this._returnResult({
					data: {
						user,
						session
					},
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async signInWithSSO(params) {
			var _a, _b, _c, _d;
			let flowId = null;
			try {
				let codeChallenge = null;
				let codeChallengeMethod = null;
				if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod, flowId] = await this._getCodeChallengeAndMethod();
				const result = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/sso`, {
					body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: this._maybeAppendFlowIdToRedirect((_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo, flowId) }), ((_b = params === null || params === void 0 ? void 0 : params.options) === null || _b === void 0 ? void 0 : _b.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), {
						skip_http_redirect: true,
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod
					}),
					headers: this.headers,
					xform: fetch_1._ssoResponse
				});
				if (((_c = result.data) === null || _c === void 0 ? void 0 : _c.url) && (0, helpers_1.isBrowser)() && !((_d = params.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect)) window.location.assign(result.data.url);
				return this._returnResult(result);
			} catch (error) {
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async reauthenticate() {
			await this.initializePromise;
			if (this.lock != null) return await this._acquireLock(this.lockAcquireTimeout, async () => {
				return await this._reauthenticate();
			});
			return await this._reauthenticate();
		}
		async _reauthenticate() {
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) throw sessionError;
					if (!session) throw new errors_1.AuthSessionMissingError();
					const { error } = await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/reauthenticate`, {
						headers: this.headers,
						jwt: session.access_token
					});
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async resend(credentials) {
			let flowId = null;
			try {
				const endpoint = `${this.url}/resend`;
				if ("email" in credentials) {
					const { email, type, options } = credentials;
					let codeChallenge = null;
					let codeChallengeMethod = null;
					if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod, flowId] = await this._getCodeChallengeAndMethod();
					const { error } = await (0, fetch_1._request)(this.fetch, "POST", endpoint, {
						headers: this.headers,
						body: {
							email,
							type,
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
							code_challenge: codeChallenge,
							code_challenge_method: codeChallengeMethod
						},
						redirectTo: this._maybeAppendFlowIdToRedirect(options === null || options === void 0 ? void 0 : options.emailRedirectTo, flowId)
					});
					if (error) await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
					return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
				} else if ("phone" in credentials) {
					const { phone, type, options } = credentials;
					const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", endpoint, {
						headers: this.headers,
						body: {
							phone,
							type,
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
						}
					});
					return this._returnResult({
						data: {
							user: null,
							session: null,
							messageId: data === null || data === void 0 ? void 0 : data.message_id
						},
						error
					});
				}
				throw new errors_1.AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
			} catch (error) {
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async getSession() {
			await this.initializePromise;
			if (this.lock != null) return await this._acquireLock(this.lockAcquireTimeout, async () => {
				return this._useSession(async (result) => {
					return result;
				});
			});
			return await this._useSession(async (result) => {
				return result;
			});
		}
		async _acquireLock(acquireTimeout, fn) {
			this._debug("#_acquireLock", "begin", acquireTimeout);
			try {
				if (this.lockAcquired) {
					const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
					const result = (async () => {
						await last;
						return await fn();
					})();
					this.pendingInLock.push((async () => {
						try {
							await result;
						} catch (_e) {}
					})());
					return result;
				}
				return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
					this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
					try {
						this.lockAcquired = true;
						const result = fn();
						this.pendingInLock.push((async () => {
							try {
								await result;
							} catch (e) {}
						})());
						await result;
						while (this.pendingInLock.length) {
							const waitOn = [...this.pendingInLock];
							await Promise.all(waitOn);
							this.pendingInLock.splice(0, waitOn.length);
						}
						return await result;
					} finally {
						this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
						this.lockAcquired = false;
					}
				});
			} finally {
				this._debug("#_acquireLock", "end");
			}
		}
		async _useSession(fn) {
			this._debug("#_useSession", "begin");
			try {
				return await fn(await this.__loadSession());
			} finally {
				this._debug("#_useSession", "end");
			}
		}
		async __loadSession() {
			this._debug("#__loadSession()", "begin");
			if (this.lock != null && !this.lockAcquired) this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
			try {
				let currentSession = null;
				const maybeSession = await (0, helpers_1.getItemAsync)(this.storage, this.storageKey);
				this._debug("#getSession()", "session from storage", maybeSession);
				if (maybeSession !== null) if (this._isValidSession(maybeSession)) currentSession = maybeSession;
				else {
					this._debug("#getSession()", "session from storage is not valid");
					await this._removeSession();
				}
				if (!currentSession) return {
					data: { session: null },
					error: null
				};
				const hasExpired = currentSession.expires_at ? currentSession.expires_at * 1e3 - Date.now() < constants_1.EXPIRY_MARGIN_MS : false;
				this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
				if (!hasExpired) {
					if (this.userStorage) {
						const maybeUser = await (0, helpers_1.getItemAsync)(this.userStorage, this.storageKey + "-user");
						if (maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) currentSession.user = maybeUser.user;
						else currentSession.user = (0, helpers_1.userNotAvailableProxy)();
					}
					if (this.storage.isServer && currentSession.user && !currentSession.user.__isUserNotAvailableProxy) {
						const suppressWarningRef = { value: this.suppressGetSessionWarning };
						currentSession.user = (0, helpers_1.insecureUserWarningProxy)(currentSession.user, suppressWarningRef);
						if (suppressWarningRef.value) this.suppressGetSessionWarning = true;
					}
					return {
						data: { session: currentSession },
						error: null
					};
				}
				const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
				if (error) {
					if (!!(currentSession.expires_at && currentSession.expires_at * 1e3 > Date.now())) {
						const stillStored = await (0, helpers_1.getItemAsync)(this.storage, this.storageKey);
						if (stillStored && stillStored.refresh_token === currentSession.refresh_token) return this._returnResult({
							data: { session: currentSession },
							error: null
						});
					}
					return this._returnResult({
						data: { session: null },
						error
					});
				}
				return this._returnResult({
					data: { session },
					error: null
				});
			} finally {
				this._debug("#__loadSession()", "end");
			}
		}
		async getUser(jwt) {
			if (jwt) return await this._getUser(jwt);
			await this.initializePromise;
			let result;
			if (this.lock != null) result = await this._acquireLock(this.lockAcquireTimeout, async () => {
				return await this._getUser();
			});
			else result = await this._getUser();
			if (result.data.user) this.suppressGetSessionWarning = true;
			return result;
		}
		async _getUser(jwt) {
			try {
				if (jwt) return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/user`, {
					headers: this.headers,
					jwt,
					xform: fetch_1._userResponse
				});
				return await this._useSession(async (result) => {
					var _a, _b, _c;
					const { data, error } = result;
					if (error) throw error;
					if (!((_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) && !this.hasCustomAuthorizationHeader) return {
						data: { user: null },
						error: new errors_1.AuthSessionMissingError()
					};
					return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/user`, {
						headers: this.headers,
						jwt: (_c = (_b = data.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : void 0,
						xform: fetch_1._userResponse
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) {
					if ((0, errors_1.isAuthSessionMissingError)(error)) await this._removeSession();
					return this._returnResult({
						data: { user: null },
						error
					});
				}
				throw error;
			}
		}
		async updateUser(attributes, options = {}) {
			await this.initializePromise;
			if (this.lock != null) return await this._acquireLock(this.lockAcquireTimeout, async () => {
				return await this._updateUser(attributes, options);
			});
			return await this._updateUser(attributes, options);
		}
		async _updateUser(attributes, options = {}) {
			let flowId = null;
			try {
				return await this._useSession(async (result) => {
					const { data: sessionData, error: sessionError } = result;
					if (sessionError) throw sessionError;
					if (!sessionData.session) throw new errors_1.AuthSessionMissingError();
					const session = sessionData.session;
					let codeChallenge = null;
					let codeChallengeMethod = null;
					if (this.flowType === "pkce" && attributes.email != null) [codeChallenge, codeChallengeMethod, flowId] = await this._getCodeChallengeAndMethod();
					const { data, error: userError } = await (0, fetch_1._request)(this.fetch, "PUT", `${this.url}/user`, {
						headers: this.headers,
						redirectTo: this._maybeAppendFlowIdToRedirect(options === null || options === void 0 ? void 0 : options.emailRedirectTo, flowId),
						body: Object.assign(Object.assign({}, attributes), {
							code_challenge: codeChallenge,
							code_challenge_method: codeChallengeMethod
						}),
						jwt: session.access_token,
						xform: fetch_1._userResponse
					});
					if (userError) throw userError;
					session.user = data.user;
					await this._saveSession(session);
					await this._notifyAllSubscribers("USER_UPDATED", session);
					return this._returnResult({
						data: { user: session.user },
						error: null
					});
				});
			} catch (error) {
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: { user: null },
					error
				});
				throw error;
			}
		}
		async setSession(currentSession) {
			await this.initializePromise;
			if (this.lock != null) return await this._acquireLock(this.lockAcquireTimeout, async () => {
				return await this._setSession(currentSession);
			});
			return await this._setSession(currentSession);
		}
		async _setSession(currentSession) {
			try {
				if (!currentSession.access_token || !currentSession.refresh_token) throw new errors_1.AuthSessionMissingError();
				const timeNow = Date.now() / 1e3;
				let expiresAt = timeNow;
				let hasExpired = true;
				let session = null;
				const { payload } = (0, helpers_1.decodeJWT)(currentSession.access_token);
				if (payload.exp) {
					expiresAt = payload.exp;
					hasExpired = expiresAt <= timeNow;
				}
				if (hasExpired) {
					const { data: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
					if (error) return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
					if (!refreshedSession) return {
						data: {
							user: null,
							session: null
						},
						error: null
					};
					session = refreshedSession;
				} else {
					const { data, error } = await this._getUser(currentSession.access_token);
					if (error) return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
					session = {
						access_token: currentSession.access_token,
						refresh_token: currentSession.refresh_token,
						user: data.user,
						token_type: "bearer",
						expires_in: expiresAt - timeNow,
						expires_at: expiresAt
					};
					await this._saveSession(session);
					await this._notifyAllSubscribers("SIGNED_IN", session);
				}
				return this._returnResult({
					data: {
						user: session.user,
						session
					},
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						session: null,
						user: null
					},
					error
				});
				throw error;
			}
		}
		async refreshSession(currentSession) {
			await this.initializePromise;
			if (this.lock != null) return await this._acquireLock(this.lockAcquireTimeout, async () => {
				return await this._refreshSession(currentSession);
			});
			return await this._refreshSession(currentSession);
		}
		async _refreshSession(currentSession) {
			try {
				return await this._useSession(async (result) => {
					var _a;
					if (!currentSession) {
						const { data, error } = result;
						if (error) throw error;
						currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : void 0;
					}
					if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) throw new errors_1.AuthSessionMissingError();
					const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
					if (error) return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
					if (!session) return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error: null
					});
					return this._returnResult({
						data: {
							user: session.user,
							session
						},
						error: null
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		}
		async _getSessionFromURL(params, callbackUrlType) {
			var _a;
			try {
				if (!(0, helpers_1.isBrowser)()) throw new errors_1.AuthImplicitGrantRedirectError("No browser detected.");
				if (params.error || params.error_description || params.error_code) throw new errors_1.AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
					error: params.error || "unspecified_error",
					code: params.error_code || "unspecified_code"
				});
				switch (callbackUrlType) {
					case "implicit":
						if (this.flowType === "pkce") throw new errors_1.AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
						break;
					case "pkce": if (this.flowType === "implicit") throw new errors_1.AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
				}
				if (callbackUrlType === "pkce") {
					this._debug("#_initialize()", "begin", "is PKCE flow", true);
					if (!params.code) throw new errors_1.AuthPKCEGrantCodeExchangeError("No code detected.");
					const { data, error } = await this._exchangeCodeForSession(params.code, { flowId: params[constants_1.PKCE_FLOW_ID_PARAM] });
					if (error) throw error;
					const url = new URL(window.location.href);
					url.searchParams.delete("code");
					url.searchParams.delete(constants_1.PKCE_FLOW_ID_PARAM);
					window.history.replaceState(window.history.state, "", url.toString());
					return {
						data: {
							session: data.session,
							redirectType: (_a = data.redirectType) !== null && _a !== void 0 ? _a : null
						},
						error: null
					};
				}
				const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
				if (!access_token || !expires_in || !refresh_token || !token_type) throw new errors_1.AuthImplicitGrantRedirectError("No session defined in URL");
				const timeNow = Math.round(Date.now() / 1e3);
				const expiresIn = parseInt(expires_in);
				let expiresAt = timeNow + expiresIn;
				if (expires_at) expiresAt = parseInt(expires_at);
				const actuallyExpiresIn = expiresAt - timeNow;
				if (actuallyExpiresIn * 1e3 <= constants_1.AUTO_REFRESH_TICK_DURATION_MS) console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
				const issuedAt = expiresAt - expiresIn;
				if (timeNow - issuedAt >= 120) console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt, timeNow);
				else if (timeNow - issuedAt < 0) console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", issuedAt, expiresAt, timeNow);
				const { data, error } = await this._getUser(access_token);
				if (error) throw error;
				const session = {
					provider_token,
					provider_refresh_token,
					access_token,
					expires_in: expiresIn,
					expires_at: expiresAt,
					refresh_token,
					token_type,
					user: data.user
				};
				window.location.hash = "";
				this._debug("#_getSessionFromURL()", "clearing window.location.hash");
				return this._returnResult({
					data: {
						session,
						redirectType: params.type
					},
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						session: null,
						redirectType: null
					},
					error
				});
				throw error;
			}
		}
		_isImplicitGrantCallback(params) {
			if (typeof this.detectSessionInUrl === "function") return this.detectSessionInUrl(new URL(window.location.href), params);
			return Boolean(params.access_token || params.error || params.error_description || params.error_code);
		}
		async _isPKCECallback(params) {
			if (!params.code) return false;
			const flowId = (0, helpers_1.validatePKCEFlowId)(params[constants_1.PKCE_FLOW_ID_PARAM]);
			if (flowId && await (0, helpers_1.getItemAsync)(this.storage, (0, helpers_1.pkceVerifierSlotKey)(this.storageKey, flowId))) return true;
			return !!await (0, helpers_1.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
		}
		async signOut(options = { scope: "global" }) {
			await this.initializePromise;
			if (this.lock != null) return await this._acquireLock(this.lockAcquireTimeout, async () => {
				return await this._signOut(options);
			});
			return await this._signOut(options);
		}
		async _signOut({ scope } = { scope: "global" }) {
			return await this._useSession(async (result) => {
				var _a;
				const removeCurrentSession = async () => {
					await this._removeSession();
				};
				const { data, error: sessionError } = result;
				if (sessionError && !(0, errors_1.isAuthSessionMissingError)(sessionError)) return this._returnResult({ error: sessionError });
				const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
				if (accessToken) {
					const { error } = await this.admin.signOut(accessToken, scope);
					if (error) {
						if (!((0, errors_1.isAuthApiError)(error) && (error.status === 404 || error.status === 401 || error.status === 403) || (0, errors_1.isAuthSessionMissingError)(error))) {
							if (scope !== "others") await removeCurrentSession();
							return this._returnResult({ error });
						}
					}
				}
				if (scope !== "others") await removeCurrentSession();
				return this._returnResult({ error: null });
			});
		}
		onAuthStateChange(callback) {
			const id = (0, helpers_1.generateCallbackId)();
			const subscription = {
				id,
				callback,
				unsubscribe: () => {
					this._debug("#unsubscribe()", "state change callback with id removed", id);
					this.stateChangeEmitters.delete(id);
				}
			};
			this._debug("#onAuthStateChange()", "registered callback with id", id);
			this.stateChangeEmitters.set(id, subscription);
			(async () => {
				await this.initializePromise;
				if (this.lock != null) await this._acquireLock(this.lockAcquireTimeout, async () => {
					this._emitInitialSession(id);
				});
				else await this._emitInitialSession(id);
			})();
			return { data: { subscription } };
		}
		async _emitInitialSession(id) {
			return await this._useSession(async (result) => {
				var _a, _b;
				try {
					const { data: { session }, error } = result;
					if (error) throw error;
					await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session));
					this._debug("INITIAL_SESSION", "callback id", id, "session", session);
				} catch (err) {
					await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
					this._debug("INITIAL_SESSION", "callback id", id, "error", err);
					if ((0, errors_1.isAuthSessionMissingError)(err) || (0, errors_1.isAuthRetryableFetchError)(err) || (0, errors_1.isAuthApiError)(err) && (err.code === "refresh_token_not_found" || err.code === "refresh_token_already_used" || err.code === "session_expired")) console.warn(err);
					else console.error(err);
				}
			});
		}
		async resetPasswordForEmail(email, options = {}) {
			let codeChallenge = null;
			let codeChallengeMethod = null;
			let flowId = null;
			if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod, flowId] = await this._getCodeChallengeAndMethod(true);
			try {
				return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/recover`, {
					body: {
						email,
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod,
						gotrue_meta_security: { captcha_token: options.captchaToken }
					},
					headers: this.headers,
					redirectTo: this._maybeAppendFlowIdToRedirect(options.redirectTo, flowId)
				});
			} catch (error) {
				await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, flowId);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async getUserIdentities() {
			var _a;
			try {
				const { data, error } = await this.getUser();
				if (error) throw error;
				return this._returnResult({
					data: { identities: (_a = data.user.identities) !== null && _a !== void 0 ? _a : [] },
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async linkIdentity(credentials) {
			if ("token" in credentials) return this.linkIdentityIdToken(credentials);
			return this.linkIdentityOAuth(credentials);
		}
		async linkIdentityOAuth(credentials) {
			var _a;
			let flowId = null;
			try {
				const { data, error } = await this._useSession(async (result) => {
					var _a, _b, _c, _d, _f;
					const { data, error } = result;
					if (error) throw error;
					const { url, flowId: urlFlowId } = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
						redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
						scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
						queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
						skipBrowserRedirect: true
					});
					flowId = urlFlowId;
					return await (0, fetch_1._request)(this.fetch, "GET", url, {
						headers: this.headers,
						jwt: (_f = (_d = data.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _f !== void 0 ? _f : void 0
					});
				});
				if (error) throw error;
				if ((0, helpers_1.isBrowser)() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) window.location.assign(data === null || data === void 0 ? void 0 : data.url);
				return this._returnResult({
					data: {
						provider: credentials.provider,
						url: data === null || data === void 0 ? void 0 : data.url,
						flowId
					},
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						provider: credentials.provider,
						url: null,
						flowId
					},
					error
				});
				throw error;
			}
		}
		async linkIdentityIdToken(credentials) {
			return await this._useSession(async (result) => {
				var _a;
				try {
					const { error: sessionError, data: { session } } = result;
					if (sessionError) throw sessionError;
					const { options, provider, token, access_token, nonce } = credentials;
					const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
						headers: this.headers,
						jwt: (_a = session === null || session === void 0 ? void 0 : session.access_token) !== null && _a !== void 0 ? _a : void 0,
						body: {
							provider,
							id_token: token,
							access_token,
							nonce,
							link_identity: true,
							gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
						},
						xform: fetch_1._sessionResponse
					});
					if (error) return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
					else if (!data || !data.session || !data.user) return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error: new errors_1.AuthInvalidTokenResponseError()
					});
					if (data.session) {
						await this._saveSession(data.session);
						await this._notifyAllSubscribers("USER_UPDATED", data.session);
					}
					return this._returnResult({
						data,
						error
					});
				} catch (error) {
					await (0, helpers_1.removePKCEVerifier)(this.storage, this.storageKey, null);
					if ((0, errors_1.isAuthError)(error)) return this._returnResult({
						data: {
							user: null,
							session: null
						},
						error
					});
					throw error;
				}
			});
		}
		async unlinkIdentity(identity) {
			try {
				return await this._useSession(async (result) => {
					var _a, _b;
					const { data, error } = result;
					if (error) throw error;
					return await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
						headers: this.headers,
						jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _refreshAccessToken(refreshToken) {
			const debugName = `#_refreshAccessToken()`;
			this._debug(debugName, "begin");
			try {
				const startedAt = Date.now();
				return await (0, helpers_1.retryable)(async (attempt) => {
					if (attempt > 0) await (0, helpers_1.sleep)(200 * Math.pow(2, attempt - 1));
					this._debug(debugName, "refreshing attempt", attempt);
					return await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
						body: { refresh_token: refreshToken },
						headers: this.headers,
						xform: fetch_1._sessionResponse
					});
				}, (attempt, error) => {
					const nextBackOffInterval = 200 * Math.pow(2, attempt);
					return error && (0, errors_1.isAuthRetryableFetchError)(error) && Date.now() + nextBackOffInterval - startedAt < constants_1.AUTO_REFRESH_TICK_DURATION_MS;
				});
			} catch (error) {
				this._debug(debugName, "error", error);
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: {
						session: null,
						user: null
					},
					error
				});
				throw error;
			} finally {
				this._debug(debugName, "end");
			}
		}
		_isValidSession(maybeSession) {
			return typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
		}
		async _handleProviderSignIn(provider, options) {
			const { url, flowId } = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
				redirectTo: options.redirectTo,
				scopes: options.scopes,
				queryParams: options.queryParams
			});
			this._debug("#_handleProviderSignIn()", "provider", provider, "options", options, "url", url);
			if ((0, helpers_1.isBrowser)() && !options.skipBrowserRedirect) window.location.assign(url);
			return {
				data: {
					provider,
					url,
					flowId
				},
				error: null
			};
		}
		async _recoverAndRefresh() {
			var _a, _b;
			const debugName = "#_recoverAndRefresh()";
			this._debug(debugName, "begin");
			try {
				const currentSession = await (0, helpers_1.getItemAsync)(this.storage, this.storageKey);
				if (currentSession && this.userStorage) {
					let maybeUser = await (0, helpers_1.getItemAsync)(this.userStorage, this.storageKey + "-user");
					if (!this.storage.isServer && Object.is(this.storage, this.userStorage) && !maybeUser) {
						maybeUser = { user: currentSession.user };
						await (0, helpers_1.setItemAsync)(this.userStorage, this.storageKey + "-user", maybeUser);
					}
					currentSession.user = (_a = maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) !== null && _a !== void 0 ? _a : (0, helpers_1.userNotAvailableProxy)();
				} else if (currentSession && !currentSession.user) {
					if (!currentSession.user) {
						const separateUser = await (0, helpers_1.getItemAsync)(this.storage, this.storageKey + "-user");
						if (separateUser && (separateUser === null || separateUser === void 0 ? void 0 : separateUser.user)) {
							currentSession.user = separateUser.user;
							await (0, helpers_1.removeItemAsync)(this.storage, this.storageKey + "-user");
							await (0, helpers_1.setItemAsync)(this.storage, this.storageKey, currentSession);
						} else currentSession.user = (0, helpers_1.userNotAvailableProxy)();
					}
				}
				this._debug(debugName, "session from storage", currentSession);
				if (!this._isValidSession(currentSession)) {
					this._debug(debugName, "session is not valid");
					if (currentSession !== null) await this._removeSession();
					return;
				}
				const expiresWithMargin = ((_b = currentSession.expires_at) !== null && _b !== void 0 ? _b : Infinity) * 1e3 - Date.now() < constants_1.EXPIRY_MARGIN_MS;
				this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${constants_1.EXPIRY_MARGIN_MS}s`);
				if (expiresWithMargin) {
					if (this.autoRefreshToken && currentSession.refresh_token) {
						const { error } = await this._callRefreshToken(currentSession.refresh_token);
						if (error) if ((0, errors_1.isAuthRefreshDiscardedError)(error)) this._debug(debugName, "refresh discarded by commit guard", error);
						else this._debug(debugName, "refresh failed", error);
					}
				} else if (currentSession.user && currentSession.user.__isUserNotAvailableProxy === true) try {
					const { data, error: userError } = await this._getUser(currentSession.access_token);
					if (!userError && (data === null || data === void 0 ? void 0 : data.user)) {
						currentSession.user = data.user;
						await this._saveSession(currentSession);
						await this._notifyAllSubscribers("SIGNED_IN", currentSession);
					} else this._debug(debugName, "could not get user data, skipping SIGNED_IN notification");
				} catch (getUserError) {
					console.error("Error getting user data:", getUserError);
					this._debug(debugName, "error getting user data, skipping SIGNED_IN notification", getUserError);
				}
				else await this._notifyAllSubscribers("SIGNED_IN", currentSession);
			} catch (err) {
				this._debug(debugName, "error", err);
				if ((0, errors_1.isAuthRetryableFetchError)(err)) console.warn(err);
				else console.error(err);
				return;
			} finally {
				this._debug(debugName, "end");
			}
		}
		async _callRefreshToken(refreshToken) {
			var _a, _b;
			if (!refreshToken) throw new errors_1.AuthSessionMissingError();
			if (this.refreshingDeferred) return this.refreshingDeferred.promise;
			if (this.lastRefreshFailure && this.lastRefreshFailure.refreshToken === refreshToken && Date.now() < this.lastRefreshFailure.expiresAt) {
				this._debug("#_callRefreshToken()", "returning cached failure (cooldown active)");
				return this.lastRefreshFailure.result;
			}
			const debugName = `#_callRefreshToken()`;
			this._debug(debugName, "begin");
			try {
				this.refreshingDeferred = new helpers_1.Deferred();
				const storedAtStart = await (0, helpers_1.getItemAsync)(this.storage, this.storageKey);
				const { data, error } = await this._refreshAccessToken(refreshToken);
				if (error) throw error;
				if (!data.session) throw new errors_1.AuthSessionMissingError();
				const storedAfter = await (0, helpers_1.getItemAsync)(this.storage, this.storageKey);
				if (storedAtStart !== null && (storedAfter === null || storedAfter.refresh_token !== storedAtStart.refresh_token)) {
					this._debug(debugName, "commit guard: storage changed since refresh started, discarding rotated tokens", {
						startedWith: "present",
						nowHolds: storedAfter ? "replaced" : "cleared"
					});
					const discarded = {
						data: null,
						error: new errors_1.AuthRefreshDiscardedError()
					};
					this.refreshingDeferred.resolve(discarded);
					return discarded;
				}
				const epochBeforeSave = this._sessionRemovalEpoch;
				await this._saveSession(data.session);
				if (this._sessionRemovalEpoch !== epochBeforeSave) {
					this._debug(debugName, "commit guard (post-save): _removeSession ran during _saveSession, undoing write");
					await (0, helpers_1.removeItemAsync)(this.storage, this.storageKey);
					if (this.userStorage) await (0, helpers_1.removeItemAsync)(this.userStorage, this.storageKey + "-user");
					const discarded = {
						data: null,
						error: new errors_1.AuthRefreshDiscardedError()
					};
					this.refreshingDeferred.resolve(discarded);
					return discarded;
				}
				await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
				const result = {
					data: data.session,
					error: null
				};
				this.lastRefreshFailure = null;
				this.refreshingDeferred.resolve(result);
				return result;
			} catch (error) {
				this._debug(debugName, "error", error);
				if ((0, errors_1.isAuthError)(error)) {
					const result = {
						data: null,
						error
					};
					if (!(0, errors_1.isAuthRetryableFetchError)(error)) {
						const storedNow = await (0, helpers_1.getItemAsync)(this.storage, this.storageKey);
						if (!!((storedNow === null || storedNow === void 0 ? void 0 : storedNow.expires_at) && storedNow.expires_at * 1e3 > Date.now())) this._debug(debugName, "proactive refresh failed, access token still valid — preserving session");
						else await this._removeSession();
					}
					this.lastRefreshFailure = {
						refreshToken,
						result,
						expiresAt: Date.now() + constants_1.REFRESH_FAILURE_COOLDOWN_MS
					};
					(_a = this.refreshingDeferred) === null || _a === void 0 || _a.resolve(result);
					return result;
				}
				(_b = this.refreshingDeferred) === null || _b === void 0 || _b.reject(error);
				throw error;
			} finally {
				this.refreshingDeferred = null;
				this._debug(debugName, "end");
			}
		}
		async _notifyAllSubscribers(event, session, broadcast = true) {
			if (this._pendingInitNotifications !== null && broadcast) {
				this._pendingInitNotifications.push({
					event,
					session,
					broadcast
				});
				return;
			}
			const debugName = `#_notifyAllSubscribers(${event})`;
			this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
			try {
				if (this.broadcastChannel && broadcast) this.broadcastChannel.postMessage({
					event,
					session
				});
				const errors = [];
				const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
					try {
						await x.callback(event, session);
					} catch (e) {
						errors.push(e);
					}
				});
				await Promise.all(promises);
				if (errors.length > 0) {
					for (let i = 0; i < errors.length; i += 1) console.error(errors[i]);
					throw errors[0];
				}
			} finally {
				this._debug(debugName, "end");
			}
		}
		async _saveSession(session) {
			this._debug("#_saveSession()", session);
			this.suppressGetSessionWarning = true;
			const sessionToProcess = Object.assign({}, session);
			const userIsProxy = sessionToProcess.user && sessionToProcess.user.__isUserNotAvailableProxy === true;
			if (this.userStorage) {
				if (!userIsProxy && sessionToProcess.user) await (0, helpers_1.setItemAsync)(this.userStorage, this.storageKey + "-user", { user: sessionToProcess.user });
				else if (userIsProxy) {}
				const mainSessionData = Object.assign({}, sessionToProcess);
				delete mainSessionData.user;
				const clonedMainSessionData = (0, helpers_1.deepClone)(mainSessionData);
				await (0, helpers_1.setItemAsync)(this.storage, this.storageKey, clonedMainSessionData);
			} else {
				const clonedSession = (0, helpers_1.deepClone)(sessionToProcess);
				await (0, helpers_1.setItemAsync)(this.storage, this.storageKey, clonedSession);
			}
		}
		async _removeSession() {
			this._sessionRemovalEpoch += 1;
			this._debug("#_removeSession()");
			this.lastRefreshFailure = null;
			this.suppressGetSessionWarning = false;
			await (0, helpers_1.removeItemAsync)(this.storage, this.storageKey);
			await (0, helpers_1.removeAllPKCEVerifiers)(this.storage, this.storageKey);
			await (0, helpers_1.removeItemAsync)(this.storage, this.storageKey + "-user");
			if (this.userStorage) await (0, helpers_1.removeItemAsync)(this.userStorage, this.storageKey + "-user");
			await this._notifyAllSubscribers("SIGNED_OUT", null);
		}
		_removeVisibilityChangedCallback() {
			this._debug("#_removeVisibilityChangedCallback()");
			const callback = this.visibilityChangedCallback;
			this.visibilityChangedCallback = null;
			try {
				if (callback && (0, helpers_1.isBrowser)() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) window.removeEventListener("visibilitychange", callback);
			} catch (e) {
				console.error("removing visibilitychange callback failed", e);
			}
		}
		async _startAutoRefresh() {
			await this._stopAutoRefresh();
			this._debug("#_startAutoRefresh()");
			const ticker = setInterval(() => this._autoRefreshTokenTick(), constants_1.AUTO_REFRESH_TICK_DURATION_MS);
			this.autoRefreshTicker = ticker;
			if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") ticker.unref();
			else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") Deno.unrefTimer(ticker);
			const timeout = setTimeout(async () => {
				await this.initializePromise;
				await this._autoRefreshTokenTick();
			}, 0);
			this.autoRefreshTickTimeout = timeout;
			if (timeout && typeof timeout === "object" && typeof timeout.unref === "function") timeout.unref();
			else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") Deno.unrefTimer(timeout);
		}
		async _stopAutoRefresh() {
			this._debug("#_stopAutoRefresh()");
			const ticker = this.autoRefreshTicker;
			this.autoRefreshTicker = null;
			if (ticker) clearInterval(ticker);
			const timeout = this.autoRefreshTickTimeout;
			this.autoRefreshTickTimeout = null;
			if (timeout) clearTimeout(timeout);
		}
		async startAutoRefresh() {
			this._removeVisibilityChangedCallback();
			await this._startAutoRefresh();
		}
		async stopAutoRefresh() {
			this._removeVisibilityChangedCallback();
			await this._stopAutoRefresh();
		}
		async dispose() {
			var _a;
			this._removeVisibilityChangedCallback();
			await this._stopAutoRefresh();
			(_a = this.broadcastChannel) === null || _a === void 0 || _a.close();
			this.broadcastChannel = null;
			this.stateChangeEmitters.clear();
		}
		async _autoRefreshTokenTick() {
			this._debug("#_autoRefreshTokenTick()", "begin");
			if (this.lock != null) {
				try {
					await this._acquireLock(0, async () => {
						try {
							const now = Date.now();
							try {
								return await this._useSession(async (result) => {
									const { data: { session } } = result;
									if (!session || !session.refresh_token || !session.expires_at) {
										this._debug("#_autoRefreshTokenTick()", "no session");
										return;
									}
									const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / constants_1.AUTO_REFRESH_TICK_DURATION_MS);
									this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${constants_1.AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${constants_1.AUTO_REFRESH_TICK_THRESHOLD} ticks`);
									if (expiresInTicks <= constants_1.AUTO_REFRESH_TICK_THRESHOLD) await this._callRefreshToken(session.refresh_token);
								});
							} catch (e) {
								console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
							}
						} finally {
							this._debug("#_autoRefreshTokenTick()", "end");
						}
					});
				} catch (e) {
					if (e instanceof locks_1.LockAcquireTimeoutError) this._debug("auto refresh token tick lock not available");
					else throw e;
				}
				return;
			}
			if (this.refreshingDeferred !== null) {
				this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
				return;
			}
			try {
				const now = Date.now();
				try {
					await this._useSession(async (result) => {
						const { data: { session } } = result;
						if (!session || !session.refresh_token || !session.expires_at) {
							this._debug("#_autoRefreshTokenTick()", "no session");
							return;
						}
						const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / constants_1.AUTO_REFRESH_TICK_DURATION_MS);
						this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${constants_1.AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${constants_1.AUTO_REFRESH_TICK_THRESHOLD} ticks`);
						if (expiresInTicks <= constants_1.AUTO_REFRESH_TICK_THRESHOLD) await this._callRefreshToken(session.refresh_token);
					});
				} catch (e) {
					console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
				}
			} finally {
				this._debug("#_autoRefreshTokenTick()", "end");
			}
		}
		async _handleVisibilityChange() {
			this._debug("#_handleVisibilityChange()");
			if (!(0, helpers_1.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
				if (this.autoRefreshToken) this.startAutoRefresh();
				return false;
			}
			try {
				this.visibilityChangedCallback = async () => {
					try {
						await this._onVisibilityChanged(false);
					} catch (error) {
						this._debug("#visibilityChangedCallback", "error", error);
					}
				};
				window === null || window === void 0 || window.addEventListener("visibilitychange", this.visibilityChangedCallback);
				await this._onVisibilityChanged(true);
			} catch (error) {
				console.error("_handleVisibilityChange", error);
			}
		}
		async _onVisibilityChanged(calledFromInitialize) {
			const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
			this._debug(methodName, "visibilityState", document.visibilityState);
			if (document.visibilityState === "visible") {
				if (this.autoRefreshToken) this._startAutoRefresh();
				if (!calledFromInitialize) {
					await this.initializePromise;
					if (this.lock != null) await this._acquireLock(this.lockAcquireTimeout, async () => {
						if (document.visibilityState !== "visible") {
							this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
							return;
						}
						await this._recoverAndRefresh();
					});
					else {
						if (document.visibilityState !== "visible") {
							this._debug(methodName, "visibilityState is no longer visible, skipping recovery");
							return;
						}
						await this._recoverAndRefresh();
					}
				}
			} else if (document.visibilityState === "hidden") {
				if (this.autoRefreshToken) this._stopAutoRefresh();
			}
		}
		async _getUrlForProvider(url, provider, options) {
			let redirectTo = options === null || options === void 0 ? void 0 : options.redirectTo;
			let codeChallenge = null;
			let codeChallengeMethod = null;
			let flowId = null;
			if (this.flowType === "pkce") {
				[codeChallenge, codeChallengeMethod, flowId] = await this._getCodeChallengeAndMethod();
				redirectTo = this._maybeAppendFlowIdToRedirect(redirectTo, flowId);
			}
			const urlParams = [`provider=${encodeURIComponent(provider)}`];
			if (redirectTo) urlParams.push(`redirect_to=${encodeURIComponent(redirectTo)}`);
			if (options === null || options === void 0 ? void 0 : options.scopes) urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
			if (codeChallenge != null && codeChallengeMethod != null) {
				const flowParams = new URLSearchParams({
					code_challenge: `${encodeURIComponent(codeChallenge)}`,
					code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
				});
				urlParams.push(flowParams.toString());
			}
			if (options === null || options === void 0 ? void 0 : options.queryParams) {
				const query = new URLSearchParams(options.queryParams);
				urlParams.push(query.toString());
			}
			if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
			return {
				url: `${url}?${urlParams.join("&")}`,
				flowId
			};
		}
		_maybeAppendFlowIdToRedirect(redirectTo, flowId) {
			if (!redirectTo || !flowId || !this.experimental.appendPkceFlowIdToRedirects) return redirectTo !== null && redirectTo !== void 0 ? redirectTo : void 0;
			return (0, helpers_1.appendFlowIdToRedirectTo)(redirectTo, flowId);
		}
		async _getCodeChallengeAndMethod(isPasswordRecovery = false) {
			return (0, helpers_1.getCodeChallengeAndMethod)(this.storage, this.storageKey, isPasswordRecovery, (evictedFlowId) => this._debug("#_getCodeChallengeAndMethod()", "evicted oldest pending PKCE verifier slot", evictedFlowId));
		}
		async _unenroll(params) {
			try {
				return await this._useSession(async (result) => {
					var _a;
					const { data: sessionData, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					return await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
						headers: this.headers,
						jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _enroll(params) {
			try {
				return await this._useSession(async (result) => {
					var _a, _b;
					const { data: sessionData, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					const body = Object.assign({
						friendly_name: params.friendlyName,
						factor_type: params.factorType
					}, params.factorType === "phone" ? { phone: params.phone } : params.factorType === "totp" ? { issuer: params.issuer } : {});
					const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/factors`, {
						body,
						headers: this.headers,
						jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
					});
					if (error) return this._returnResult({
						data: null,
						error
					});
					if (params.factorType === "totp" && data.type === "totp" && ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
					return this._returnResult({
						data,
						error: null
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _verify(params) {
			const run = async () => {
				try {
					return await this._useSession(async (result) => {
						var _a;
						const { data: sessionData, error: sessionError } = result;
						if (sessionError) return this._returnResult({
							data: null,
							error: sessionError
						});
						const body = Object.assign({ challenge_id: params.challengeId }, "webauthn" in params ? { webauthn: Object.assign(Object.assign({}, params.webauthn), { credential_response: params.webauthn.type === "create" ? (0, webauthn_1.serializeCredentialCreationResponse)(params.webauthn.credential_response) : (0, webauthn_1.serializeCredentialRequestResponse)(params.webauthn.credential_response) }) } : { code: params.code });
						const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
							body,
							headers: this.headers,
							jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
						});
						if (error) return this._returnResult({
							data: null,
							error
						});
						await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
						await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
						return this._returnResult({
							data,
							error
						});
					});
				} catch (error) {
					if ((0, errors_1.isAuthError)(error)) return this._returnResult({
						data: null,
						error
					});
					throw error;
				}
			};
			if (this.lock != null) return this._acquireLock(this.lockAcquireTimeout, run);
			return run();
		}
		async _challenge(params) {
			const run = async () => {
				try {
					return await this._useSession(async (result) => {
						var _a;
						const { data: sessionData, error: sessionError } = result;
						if (sessionError) return this._returnResult({
							data: null,
							error: sessionError
						});
						const response = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
							body: params,
							headers: this.headers,
							jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
						});
						if (response.error) return response;
						const { data } = response;
						if (data.type !== "webauthn") return {
							data,
							error: null
						};
						switch (data.webauthn.type) {
							case "create": return {
								data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: (0, webauthn_1.deserializeCredentialCreationOptions)(data.webauthn.credential_options.publicKey) }) }) }),
								error: null
							};
							case "request": return {
								data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: (0, webauthn_1.deserializeCredentialRequestOptions)(data.webauthn.credential_options.publicKey) }) }) }),
								error: null
							};
						}
					});
				} catch (error) {
					if ((0, errors_1.isAuthError)(error)) return this._returnResult({
						data: null,
						error
					});
					throw error;
				}
			};
			if (this.lock != null) return this._acquireLock(this.lockAcquireTimeout, run);
			return run();
		}
		async _challengeAndVerify(params) {
			const { data: challengeData, error: challengeError } = await this._challenge({ factorId: params.factorId });
			if (challengeError) return this._returnResult({
				data: null,
				error: challengeError
			});
			return await this._verify({
				factorId: params.factorId,
				challengeId: challengeData.id,
				code: params.code
			});
		}
		async _listFactors() {
			var _a;
			const { data: { user }, error: userError } = await this.getUser();
			if (userError) return {
				data: null,
				error: userError
			};
			const data = {
				all: [],
				phone: [],
				totp: [],
				webauthn: []
			};
			for (const factor of (_a = user === null || user === void 0 ? void 0 : user.factors) !== null && _a !== void 0 ? _a : []) {
				data.all.push(factor);
				if (factor.status === "verified") data[factor.factor_type].push(factor);
			}
			return {
				data,
				error: null
			};
		}
		async _getAuthenticatorAssuranceLevel(jwt) {
			var _a, _b, _c, _d;
			if (jwt) try {
				const { payload } = (0, helpers_1.decodeJWT)(jwt);
				let currentLevel = null;
				if (payload.aal) currentLevel = payload.aal;
				let nextLevel = currentLevel;
				const { data: { user }, error: userError } = await this.getUser(jwt);
				if (userError) return this._returnResult({
					data: null,
					error: userError
				});
				if (((_b = (_a = user === null || user === void 0 ? void 0 : user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : []).length > 0) nextLevel = "aal2";
				const currentAuthenticationMethods = payload.amr || [];
				return {
					data: {
						currentLevel,
						nextLevel,
						currentAuthenticationMethods
					},
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
			const { data: { session }, error: sessionError } = await this.getSession();
			if (sessionError) return this._returnResult({
				data: null,
				error: sessionError
			});
			if (!session) return {
				data: {
					currentLevel: null,
					nextLevel: null,
					currentAuthenticationMethods: []
				},
				error: null
			};
			const { payload } = (0, helpers_1.decodeJWT)(session.access_token);
			let currentLevel = null;
			if (payload.aal) currentLevel = payload.aal;
			let nextLevel = currentLevel;
			if (((_d = (_c = session.user.factors) === null || _c === void 0 ? void 0 : _c.filter((factor) => factor.status === "verified")) !== null && _d !== void 0 ? _d : []).length > 0) nextLevel = "aal2";
			const currentAuthenticationMethods = payload.amr || [];
			return {
				data: {
					currentLevel,
					nextLevel,
					currentAuthenticationMethods
				},
				error: null
			};
		}
		async _getAuthorizationDetails(authorizationId) {
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/oauth/authorizations/${authorizationId}`, {
						headers: this.headers,
						jwt: session.access_token,
						xform: (data) => ({
							data,
							error: null
						})
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _approveAuthorization(authorizationId, options) {
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					const response = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
						headers: this.headers,
						jwt: session.access_token,
						body: { action: "approve" },
						xform: (data) => ({
							data,
							error: null
						})
					});
					if (response.data && response.data.redirect_url) {
						if ((0, helpers_1.isBrowser)() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) window.location.assign(response.data.redirect_url);
					}
					return response;
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _denyAuthorization(authorizationId, options) {
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					const response = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
						headers: this.headers,
						jwt: session.access_token,
						body: { action: "deny" },
						xform: (data) => ({
							data,
							error: null
						})
					});
					if (response.data && response.data.redirect_url) {
						if ((0, helpers_1.isBrowser)() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) window.location.assign(response.data.redirect_url);
					}
					return response;
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _listOAuthGrants() {
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					return await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
						headers: this.headers,
						jwt: session.access_token,
						xform: (data) => ({
							data,
							error: null
						})
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _revokeOAuthGrant(options) {
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
						headers: this.headers,
						jwt: session.access_token,
						query: { client_id: options.clientId },
						noResolveJson: true
					});
					return {
						data: {},
						error: null
					};
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async fetchJwk(kid, jwks = { keys: [] }) {
			let jwk = jwks.keys.find((key) => key.kid === kid);
			if (jwk) return jwk;
			const now = Date.now();
			jwk = this.jwks.keys.find((key) => key.kid === kid);
			if (jwk && this.jwks_cached_at + constants_1.JWKS_TTL > now) return jwk;
			const { data, error } = await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
			if (error) throw error;
			if (!data.keys || data.keys.length === 0) return null;
			this.jwks = data;
			this.jwks_cached_at = now;
			jwk = data.keys.find((key) => key.kid === kid);
			if (!jwk) return null;
			return jwk;
		}
		async getClaims(jwt, options = {}) {
			try {
				let token = jwt;
				if (!token) {
					const { data, error } = await this.getSession();
					if (error || !data.session) return this._returnResult({
						data: null,
						error
					});
					token = data.session.access_token;
				}
				const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload } } = (0, helpers_1.decodeJWT)(token);
				if (!(options === null || options === void 0 ? void 0 : options.allowExpired)) try {
					(0, helpers_1.validateExp)(payload.exp);
				} catch (e) {
					throw new errors_1.AuthInvalidJwtError(e instanceof Error ? e.message : "JWT validation failed");
				}
				const signingKey = !header.alg || header.alg.startsWith("HS") || !header.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(header.kid, (options === null || options === void 0 ? void 0 : options.keys) ? { keys: options.keys } : options === null || options === void 0 ? void 0 : options.jwks);
				if (!signingKey) {
					const { error } = await this.getUser(token);
					if (error) throw error;
					return {
						data: {
							claims: payload,
							header,
							signature
						},
						error: null
					};
				}
				const algorithm = (0, helpers_1.getAlgorithm)(header.alg);
				const publicKey = await crypto.subtle.importKey("jwk", signingKey, algorithm, true, ["verify"]);
				if (!await crypto.subtle.verify(algorithm, publicKey, signature, (0, base64url_1.stringToUint8Array)(`${rawHeader}.${rawPayload}`))) throw new errors_1.AuthInvalidJwtError("Invalid JWT signature");
				return {
					data: {
						claims: payload,
						header,
						signature
					},
					error: null
				};
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async signInWithPasskey(credentials) {
			var _a, _b, _c;
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				if (!(0, webauthn_1.browserSupportsWebAuthn)()) return this._returnResult({
					data: null,
					error: new errors_1.AuthUnknownError("Browser does not support WebAuthn", null)
				});
				const { data: options, error: optionsError } = await this._startPasskeyAuthentication({ options: { captchaToken: (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.captchaToken } });
				if (optionsError || !options) return this._returnResult({
					data: null,
					error: optionsError
				});
				const publicKeyOptions = (0, webauthn_1.deserializeCredentialRequestOptions)(options.options);
				const signal = (_c = (_b = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _b === void 0 ? void 0 : _b.signal) !== null && _c !== void 0 ? _c : webauthn_1.webAuthnAbortService.createNewAbortSignal();
				const { data: credential, error: credentialError } = await (0, webauthn_1.getCredential)({
					publicKey: publicKeyOptions,
					signal
				});
				if (credentialError || !credential) return this._returnResult({
					data: null,
					error: credentialError !== null && credentialError !== void 0 ? credentialError : new errors_1.AuthUnknownError("WebAuthn ceremony failed", null)
				});
				const serialized = (0, webauthn_1.serializeCredentialRequestResponse)(credential);
				return this._verifyPasskeyAuthentication({
					challengeId: options.challenge_id,
					credential: serialized
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async registerPasskey(credentials) {
			var _a, _b;
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				if (!(0, webauthn_1.browserSupportsWebAuthn)()) return this._returnResult({
					data: null,
					error: new errors_1.AuthUnknownError("Browser does not support WebAuthn", null)
				});
				const { data: options, error: optionsError } = await this._startPasskeyRegistration();
				if (optionsError || !options) return this._returnResult({
					data: null,
					error: optionsError
				});
				const publicKeyOptions = (0, webauthn_1.deserializeCredentialCreationOptions)(options.options);
				const signal = (_b = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.signal) !== null && _b !== void 0 ? _b : webauthn_1.webAuthnAbortService.createNewAbortSignal();
				const { data: credential, error: credentialError } = await (0, webauthn_1.createCredential)({
					publicKey: publicKeyOptions,
					signal
				});
				if (credentialError || !credential) return this._returnResult({
					data: null,
					error: credentialError !== null && credentialError !== void 0 ? credentialError : new errors_1.AuthUnknownError("WebAuthn ceremony failed", null)
				});
				const serialized = (0, webauthn_1.serializeCredentialCreationResponse)(credential);
				return this._verifyPasskeyRegistration({
					challengeId: options.challenge_id,
					credential: serialized
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _startPasskeyRegistration() {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/passkeys/registration/options`, {
						headers: this.headers,
						jwt: session.access_token,
						body: {}
					});
					if (error) return this._returnResult({
						data: null,
						error
					});
					return this._returnResult({
						data,
						error: null
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _verifyPasskeyRegistration(params) {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, {
						headers: this.headers,
						jwt: session.access_token,
						body: {
							challenge_id: params.challengeId,
							credential: params.credential
						}
					});
					if (error) return this._returnResult({
						data: null,
						error
					});
					return this._returnResult({
						data,
						error: null
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _startPasskeyAuthentication(params) {
			var _a;
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, {
					headers: this.headers,
					body: { gotrue_meta_security: { captcha_token: (_a = params === null || params === void 0 ? void 0 : params.options) === null || _a === void 0 ? void 0 : _a.captchaToken } }
				});
				if (error) return this._returnResult({
					data: null,
					error
				});
				return this._returnResult({
					data,
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _verifyPasskeyAuthentication(params) {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				const { data, error } = await (0, fetch_1._request)(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, {
					headers: this.headers,
					body: {
						challenge_id: params.challengeId,
						credential: params.credential
					},
					xform: fetch_1._sessionResponse
				});
				if (error) return this._returnResult({
					data: null,
					error
				});
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("SIGNED_IN", data.session);
				}
				return this._returnResult({
					data,
					error: null
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _listPasskeys() {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					const { data, error } = await (0, fetch_1._request)(this.fetch, "GET", `${this.url}/passkeys`, {
						headers: this.headers,
						jwt: session.access_token,
						xform: (data) => ({
							data,
							error: null
						})
					});
					if (error) return this._returnResult({
						data: null,
						error
					});
					return this._returnResult({
						data,
						error: null
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _updatePasskey(params) {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					const { data, error } = await (0, fetch_1._request)(this.fetch, "PATCH", `${this.url}/passkeys/${params.passkeyId}`, {
						headers: this.headers,
						jwt: session.access_token,
						body: { friendly_name: params.friendlyName }
					});
					if (error) return this._returnResult({
						data: null,
						error
					});
					return this._returnResult({
						data,
						error: null
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
		async _deletePasskey(params) {
			(0, helpers_1.assertPasskeyExperimentalEnabled)(this.experimental);
			try {
				return await this._useSession(async (result) => {
					const { data: { session }, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					if (!session) return this._returnResult({
						data: null,
						error: new errors_1.AuthSessionMissingError()
					});
					const { error } = await (0, fetch_1._request)(this.fetch, "DELETE", `${this.url}/passkeys/${params.passkeyId}`, {
						headers: this.headers,
						jwt: session.access_token,
						noResolveJson: true
					});
					if (error) return this._returnResult({
						data: null,
						error
					});
					return this._returnResult({
						data: null,
						error: null
					});
				});
			} catch (error) {
				if ((0, errors_1.isAuthError)(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		}
	};
	GoTrueClient.nextInstanceID = {};
	exports.default = GoTrueClient;
}));
var require_AuthAdminApi = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_GoTrueAdminApi()).default;
}));
var require_AuthClient = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_GoTrueClient()).default;
}));
var import_main$2 = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.processLock = exports.lockInternals = exports.NavigatorLockAcquireTimeoutError = exports.navigatorLock = exports.AuthClient = exports.AuthAdminApi = exports.GoTrueClient = exports.GoTrueAdminApi = void 0;
	const tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	exports.GoTrueAdminApi = tslib_1.__importDefault(require_GoTrueAdminApi()).default;
	exports.GoTrueClient = tslib_1.__importDefault(require_GoTrueClient()).default;
	exports.AuthAdminApi = tslib_1.__importDefault(require_AuthAdminApi()).default;
	exports.AuthClient = tslib_1.__importDefault(require_AuthClient()).default;
	tslib_1.__exportStar(require_types(), exports);
	tslib_1.__exportStar(require_errors(), exports);
	var locks_1 = require_locks();
	Object.defineProperty(exports, "navigatorLock", {
		enumerable: true,
		get: function() {
			return locks_1.navigatorLock;
		}
	});
	Object.defineProperty(exports, "NavigatorLockAcquireTimeoutError", {
		enumerable: true,
		get: function() {
			return locks_1.NavigatorLockAcquireTimeoutError;
		}
	});
	Object.defineProperty(exports, "lockInternals", {
		enumerable: true,
		get: function() {
			return locks_1.internals;
		}
	});
	Object.defineProperty(exports, "processLock", {
		enumerable: true,
		get: function() {
			return locks_1.processLock;
		}
	});
}))();
const version = "2.111.0";
let JS_ENV = "";
let JS_RUNTIME_VERSION;
if (typeof Deno !== "undefined") {
	var _Deno$version;
	JS_ENV = "deno";
	JS_RUNTIME_VERSION = (_Deno$version = Deno.version) === null || _Deno$version === void 0 ? void 0 : _Deno$version.deno;
} else if (typeof document !== "undefined") JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") JS_ENV = "react-native";
else {
	var _process$version;
	JS_ENV = "node";
	const _process = globalThis["process"];
	JS_RUNTIME_VERSION = _process === null || _process === void 0 || (_process$version = _process["version"]) === null || _process$version === void 0 ? void 0 : _process$version.replace(/^v/, "");
}
const _runtimeMeta = [`runtime=${JS_ENV}`];
if (JS_RUNTIME_VERSION) _runtimeMeta.push(`runtime-version=${JS_RUNTIME_VERSION}`);
const DEFAULT_GLOBAL_OPTIONS = { headers: { "X-Client-Info": `supabase-js/${version}; ${_runtimeMeta.join("; ")}` } };
const DEFAULT_DB_OPTIONS = { schema: "public" };
const DEFAULT_AUTH_OPTIONS = {
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
	flowType: "implicit"
};
const DEFAULT_REALTIME_OPTIONS = {};
const DEFAULT_TRACE_PROPAGATION_OPTIONS = {
	enabled: false,
	respectSamplingDecision: true
};
function __awaiter(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}
let otelModulePromise = null;
const OTEL_PKG = "@opentelemetry/api";
function loadOtel() {
	if (otelModulePromise === null) otelModulePromise = import(OTEL_PKG).catch(() => null);
	return otelModulePromise;
}
function extractTraceContext() {
	return __awaiter(this, void 0, void 0, function* () {
		try {
			const otel = yield loadOtel();
			if (!otel || !otel.propagation || !otel.context) return null;
			const carrier = {};
			otel.propagation.inject(otel.context.active(), carrier);
			const traceparent = carrier["traceparent"];
			if (!traceparent) return null;
			return {
				traceparent,
				tracestate: carrier["tracestate"],
				baggage: carrier["baggage"]
			};
		} catch (_a) {
			return null;
		}
	});
}
function parseTraceParent(traceparent) {
	if (!traceparent || typeof traceparent !== "string") return null;
	const parts = traceparent.split("-");
	if (parts.length !== 4) return null;
	const [version$1, traceId, parentId, traceFlags] = parts;
	if (version$1.length !== 2 || traceId.length !== 32 || parentId.length !== 16 || traceFlags.length !== 2) return null;
	const hexRegex = /^[0-9a-f]+$/i;
	if (!hexRegex.test(version$1) || !hexRegex.test(traceId) || !hexRegex.test(parentId) || !hexRegex.test(traceFlags)) return null;
	if (traceId === "00000000000000000000000000000000" || parentId === "0000000000000000") return null;
	return {
		version: version$1,
		traceId,
		parentId,
		traceFlags,
		isSampled: (parseInt(traceFlags, 16) & 1) === 1
	};
}
function shouldPropagateToTarget(targetUrl, targets) {
	if (!targetUrl || !targets || targets.length === 0) return false;
	let url;
	if (targetUrl instanceof URL) url = targetUrl;
	else try {
		url = new URL(targetUrl);
	} catch (error) {
		return false;
	}
	for (const target of targets) try {
		if (typeof target === "string") {
			if (matchStringTarget(url.hostname, target)) return true;
		} else if (target instanceof RegExp) {
			if (target.test(url.hostname)) return true;
		} else if (typeof target === "function") {
			if (target(url)) return true;
		}
	} catch (error) {
		continue;
	}
	return false;
}
function matchStringTarget(hostname, target) {
	if (target === hostname) return true;
	if (target.startsWith("*.")) {
		const domain = target.slice(2);
		if (hostname.endsWith(domain)) {
			if (hostname === domain || hostname.endsWith("." + domain)) return true;
		}
	}
	return false;
}
function getDefaultPropagationTargets(supabaseUrl) {
	const targets = [];
	try {
		const url = new URL(supabaseUrl);
		targets.push(url.hostname);
	} catch (error) {}
	targets.push("*.supabase.co", "*.supabase.in");
	targets.push("localhost", "127.0.0.1", "[::1]");
	return targets;
}
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
const resolveFetch = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
const resolveHeadersConstructor = () => {
	return Headers;
};
const isNewApiKey = (key) => key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
const TEMP_KEY_PREFIX = "sb_temp_";
const warnedKeySubtypes = new Set();
const checkApiKeyFormat = (key) => {
	var _key$match$, _key$match;
	if (!key.startsWith("sb_") || isNewApiKey(key) || key.startsWith(TEMP_KEY_PREFIX)) return;
	const subtype = (_key$match$ = (_key$match = key.match(/^sb_[a-zA-Z0-9]+_/)) === null || _key$match === void 0 ? void 0 : _key$match[0]) !== null && _key$match$ !== void 0 ? _key$match$ : "unknown";
	if (warnedKeySubtypes.has(subtype)) return;
	warnedKeySubtypes.add(subtype);
	console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type.");
};
const fetchWithAuth = (supabaseKey, supabaseUrl, getAccessToken, customFetch, tracePropagationOptions, options) => {
	const fetch$1 = resolveFetch(customFetch);
	const HeadersConstructor = resolveHeadersConstructor();
	const traceEnabled = (tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.enabled) === true;
	const respectSampling = (tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.respectSamplingDecision) !== false;
	const traceTargets = traceEnabled ? getDefaultPropagationTargets(supabaseUrl) : null;
	const allowKeyAsBearer = !((options === null || options === void 0 ? void 0 : options.omitApiKeyAsBearer) && isNewApiKey(supabaseKey));
	return async (input, init) => {
		const realToken = await getAccessToken();
		let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
		if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
		if (!headers.has("Authorization")) {
			const bearer = realToken !== null && realToken !== void 0 ? realToken : allowKeyAsBearer ? supabaseKey : null;
			if (bearer) headers.set("Authorization", `Bearer ${bearer}`);
		}
		if (traceTargets) {
			const traceHeaders = await getTraceHeaders(input, traceTargets, respectSampling);
			if (traceHeaders) {
				if (traceHeaders.traceparent && !headers.has("traceparent")) headers.set("traceparent", traceHeaders.traceparent);
				if (traceHeaders.tracestate && !headers.has("tracestate")) headers.set("tracestate", traceHeaders.tracestate);
				if (traceHeaders.baggage && !headers.has("baggage")) headers.set("baggage", traceHeaders.baggage);
			}
		}
		return fetch$1(input, _objectSpread2(_objectSpread2({}, init), {}, { headers }));
	};
};
async function getTraceHeaders(input, targets, respectSampling) {
	if (!shouldPropagateToTarget(typeof input === "string" ? input : input instanceof URL ? input : input.url, targets)) return null;
	const traceContext = await extractTraceContext();
	if (!traceContext || !traceContext.traceparent) return null;
	if (respectSampling) {
		const parsed = parseTraceParent(traceContext.traceparent);
		if (parsed && !parsed.isSampled) return null;
	}
	return traceContext;
}
function normalizeTracePropagation(value) {
	return typeof value === "boolean" ? { enabled: value } : value;
}
function ensureTrailingSlash(url) {
	return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
	var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header, _ref, _tracePropagationOpti, _ref2, _tracePropagationOpti2;
	const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
	const { db: DEFAULT_DB_OPTIONS$1, auth: DEFAULT_AUTH_OPTIONS$1, realtime: DEFAULT_REALTIME_OPTIONS$1, global: DEFAULT_GLOBAL_OPTIONS$1 } = defaults;
	const tracePropagationOptions = normalizeTracePropagation(options.tracePropagation);
	const DEFAULT_TRACE_PROPAGATION_OPTIONS$1 = normalizeTracePropagation(defaults.tracePropagation);
	const result = {
		db: _objectSpread2(_objectSpread2({}, DEFAULT_DB_OPTIONS$1), dbOptions),
		auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
		realtime: _objectSpread2(_objectSpread2({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
		storage: {},
		global: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, { headers: _objectSpread2(_objectSpread2({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== void 0 ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _globalOptions$header !== void 0 ? _globalOptions$header : {}) }),
		tracePropagation: {
			enabled: (_ref = (_tracePropagationOpti = tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.enabled) !== null && _tracePropagationOpti !== void 0 ? _tracePropagationOpti : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === void 0 ? void 0 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.enabled) !== null && _ref !== void 0 ? _ref : false,
			respectSamplingDecision: (_ref2 = (_tracePropagationOpti2 = tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.respectSamplingDecision) !== null && _tracePropagationOpti2 !== void 0 ? _tracePropagationOpti2 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === void 0 ? void 0 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.respectSamplingDecision) !== null && _ref2 !== void 0 ? _ref2 : true
		},
		accessToken: async () => ""
	};
	if (options.accessToken) result.accessToken = options.accessToken;
	else delete result.accessToken;
	return result;
}
function validateSupabaseUrl(supabaseUrl) {
	const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
	if (!trimmedUrl) throw new Error("supabaseUrl is required.");
	if (!trimmedUrl.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
	try {
		return new URL(ensureTrailingSlash(trimmedUrl));
	} catch (_unused) {
		throw Error("Invalid supabaseUrl: Provided URL is malformed.");
	}
}
var SupabaseAuthClient = class extends import_main$2.AuthClient {
	constructor(options) {
		super(options);
	}
};
var SupabaseClient = class {
	constructor(supabaseUrl, supabaseKey, options) {
		var _settings$auth$storag, _settings$global$head;
		this.supabaseUrl = supabaseUrl;
		this.supabaseKey = supabaseKey;
		const baseUrl = validateSupabaseUrl(supabaseUrl);
		if (!supabaseKey) throw new Error("supabaseKey is required.");
		checkApiKeyFormat(supabaseKey);
		this.realtimeUrl = new URL("realtime/v1", baseUrl);
		this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
		this.authUrl = new URL("auth/v1", baseUrl);
		this.storageUrl = new URL("storage/v1", baseUrl);
		this.functionsUrl = new URL("functions/v1", baseUrl);
		const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
		const DEFAULTS = {
			db: DEFAULT_DB_OPTIONS,
			realtime: DEFAULT_REALTIME_OPTIONS,
			auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS), {}, { storageKey: defaultStorageKey }),
			global: DEFAULT_GLOBAL_OPTIONS,
			tracePropagation: DEFAULT_TRACE_PROPAGATION_OPTIONS
		};
		const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
		this.settings = settings;
		this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== void 0 ? _settings$auth$storag : "";
		this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== void 0 ? _settings$global$head : {};
		if (!settings.accessToken) {
			var _settings$auth;
			this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== void 0 ? _settings$auth : {}, this.headers, settings.global.fetch);
		} else {
			this.accessToken = settings.accessToken;
			this.auth = new Proxy({}, { get: (_, prop) => {
				throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
			} });
		}
		this.fetch = fetchWithAuth(supabaseKey, supabaseUrl, this._getSessionToken.bind(this), settings.global.fetch, settings.tracePropagation);
		this.functionsFetch = fetchWithAuth(supabaseKey, supabaseUrl, this._getSessionToken.bind(this), settings.global.fetch, settings.tracePropagation, { omitApiKeyAsBearer: true });
		this.realtime = this._initRealtimeClient(_objectSpread2({
			headers: this.headers,
			accessToken: this._getAccessToken.bind(this),
			fetch: this.fetch
		}, settings.realtime));
		if (this.accessToken) Promise.resolve(this.accessToken()).then((token) => this.realtime.setAuth(token)).catch((e) => console.warn("Failed to set initial Realtime auth token:", e));
		this.rest = new PostgrestClient(new URL("rest/v1", baseUrl).href, {
			headers: this.headers,
			schema: settings.db.schema,
			fetch: this.fetch,
			timeout: settings.db.timeout,
			urlLengthLimit: settings.db.urlLengthLimit
		});
		this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
		if (!settings.accessToken) this._listenForAuthEvents();
	}
	get functions() {
		return new import_main.FunctionsClient(this.functionsUrl.href, {
			headers: this.headers,
			customFetch: this.functionsFetch
		});
	}
	from(relation) {
		return this.rest.from(relation);
	}
	schema(schema) {
		return this.rest.schema(schema);
	}
	rpc(fn, args = {}, options = {
		head: false,
		get: false,
		count: void 0
	}) {
		return this.rest.rpc(fn, args, options);
	}
	channel(name, opts = { config: {} }) {
		return this.realtime.channel(name, opts);
	}
	getChannels() {
		return this.realtime.getChannels();
	}
	removeChannel(channel) {
		return this.realtime.removeChannel(channel);
	}
	removeAllChannels() {
		return this.realtime.removeAllChannels();
	}
	async _getSessionToken() {
		var _this = this;
		var _data$session$access_, _data$session;
		if (_this.accessToken) return await _this.accessToken();
		const { data } = await _this.auth.getSession();
		return (_data$session$access_ = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token) !== null && _data$session$access_ !== void 0 ? _data$session$access_ : null;
	}
	async _getAccessToken() {
		var _this2 = this;
		var _await$this$_getSessi;
		return (_await$this$_getSessi = await _this2._getSessionToken()) !== null && _await$this$_getSessi !== void 0 ? _await$this$_getSessi : _this2.supabaseKey;
	}
	_initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError, experimental, lockAcquireTimeout, skipAutoInitialize }, headers, fetch$1) {
		const authHeaders = {
			Authorization: `Bearer ${this.supabaseKey}`,
			apikey: `${this.supabaseKey}`
		};
		return new SupabaseAuthClient({
			url: this.authUrl.href,
			headers: _objectSpread2(_objectSpread2({}, authHeaders), headers),
			storageKey,
			autoRefreshToken,
			persistSession,
			detectSessionInUrl,
			storage,
			userStorage,
			flowType,
			lock,
			debug,
			throwOnError,
			experimental,
			fetch: fetch$1,
			lockAcquireTimeout,
			skipAutoInitialize,
			hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === "authorization")
		});
	}
	_initRealtimeClient(options) {
		return new import_main$1.RealtimeClient(this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, options), {}, { params: _objectSpread2(_objectSpread2({}, { apikey: this.supabaseKey }), options === null || options === void 0 ? void 0 : options.params) }));
	}
	_listenForAuthEvents() {
		return this.auth.onAuthStateChange((event, session) => {
			this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
		});
	}
	_handleTokenChanged(event, source, token) {
		if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN" || event === "INITIAL_SESSION") && this.changedAccessToken !== token) {
			this.changedAccessToken = token;
			this.realtime.setAuth(token);
		} else if (event === "SIGNED_OUT") {
			this.realtime.setAuth();
			if (source == "STORAGE") this.auth.signOut();
			this.changedAccessToken = void 0;
		}
	}
};
const createClient = (supabaseUrl, supabaseKey, options) => {
	return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
	if (typeof window !== "undefined" || globalThis["Deno"] !== void 0) return false;
	const _process = globalThis["process"];
	if (!_process) return false;
	const processVersion = _process["version"];
	if (processVersion === void 0 || processVersion === null) return false;
	const versionMatch = processVersion.match(/^v(\d+)\./);
	if (!versionMatch) return false;
	return parseInt(versionMatch[1], 10) <= 20;
}
if (shouldShowDeprecationWarning()) console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");
function getDb() {
	const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !serviceKey) throw new Error("Supabase no está configurado (falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY).");
	return createClient(url, serviceKey, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
function normalizePlate(plate) {
	return plate.toUpperCase().replace(/[\s-]/g, "");
}
function formatARS(amount) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		maximumFractionDigits: 0
	}).format(amount);
}
async function findVehicleByPlate(plate) {
	const db = getDb();
	const target = normalizePlate(plate);
	const { data, error } = await db.from("vehicles").select("*");
	if (error) throw new Error(error.message);
	return data.find((v) => normalizePlate(v.plate) === target) ?? null;
}
async function listMultasByPlate(plate) {
	const db = getDb();
	const target = normalizePlate(plate);
	const { data, error } = await db.from("multas").select("*").order("infraction_date", { ascending: false });
	if (error) throw new Error(error.message);
	return data.filter((m) => normalizePlate(m.plate) === target);
}
async function getMultaById(id) {
	const { data, error } = await getDb().from("multas").select("*").eq("id", id).maybeSingle();
	if (error) throw new Error(error.message);
	return data ?? null;
}
async function markMultaPaid(id) {
	const { error } = await getDb().from("multas").update({ status: "pagada" }).eq("id", id);
	if (error) throw new Error(error.message);
}
async function markVehiclePatentePaid(id) {
	const { error } = await getDb().from("vehicles").update({
		patente_status: "al_dia",
		patente_amount_due: 0
	}).eq("id", id);
	if (error) throw new Error(error.message);
}
async function recordPayment(input) {
	const { data, error } = await getDb().from("payments").insert({
		kind: input.kind,
		reference_id: input.referenceId,
		plate: input.plate,
		amount: input.amount,
		status: input.status,
		stripe_session_id: input.stripeSessionId ?? null,
		stripe_payment_intent: input.stripePaymentIntent ?? null,
		idempotency_key: input.idempotencyKey ?? null
	}).select("*").single();
	if (error) throw new Error(error.message);
	return data;
}
var get_patente_status_exports = __exportAll({ default: () => get_patente_status_default });
var get_patente_status_default = defineTool({
	description: "Consulta el estado de la patente de un vehículo por su número de patente (dominio). Devuelve marca, modelo, estado (al_dia/pendiente/vencida), período, monto adeudado y vencimiento.",
	inputSchema: object({ plate: string().min(3).describe("Número de patente / dominio, ej: 'AB123CD' o 'AE 482 KP'") }),
	async execute({ plate }) {
		const vehicle = await findVehicleByPlate(plate);
		if (!vehicle) return {
			found: false,
			message: `No encontré ningún vehículo con la patente ${plate}.`
		};
		return {
			found: true,
			vehicleId: vehicle.id,
			plate: vehicle.plate,
			brand: vehicle.brand,
			model: vehicle.model,
			year: vehicle.year,
			patenteStatus: vehicle.patente_status,
			period: vehicle.patente_period,
			amountDue: vehicle.patente_amount_due,
			dueDate: vehicle.patente_due_date
		};
	}
});
var list_multas_exports = __exportAll({ default: () => list_multas_default });
var list_multas_default = defineTool({
	description: "Lista las multas / infracciones asociadas a una patente, con su estado (pendiente/pagada/en_proceso), monto, descripción, lugar y descuento por pago voluntario si corresponde.",
	inputSchema: object({
		plate: string().min(3).describe("Número de patente / dominio"),
		onlyPending: boolean().optional().describe("Si es true, devuelve solo las multas pendientes")
	}),
	async execute({ plate, onlyPending }) {
		const multas = await listMultasByPlate(plate);
		const filtered = onlyPending ? multas.filter((m) => m.status === "pendiente") : multas;
		return {
			plate,
			count: filtered.length,
			totalPending: filtered.filter((m) => m.status === "pendiente").reduce((sum, m) => sum + Number(m.amount), 0),
			multas: filtered.map((m) => ({
				id: m.id,
				code: m.code,
				description: m.description,
				location: m.location,
				infractionDate: m.infraction_date,
				amount: Number(m.amount),
				status: m.status,
				source: m.source,
				discountUntil: m.discount_until,
				discountAmount: m.discount_amount != null ? Number(m.discount_amount) : null
			}))
		};
	}
});
var Error_exports = __exportAll({
	RateLimitError: () => RateLimitError,
	StripeAPIError: () => StripeAPIError,
	StripeAuthenticationError: () => StripeAuthenticationError,
	StripeCardError: () => StripeCardError,
	StripeConnectionError: () => StripeConnectionError,
	StripeError: () => StripeError,
	StripeIdempotencyError: () => StripeIdempotencyError,
	StripeInvalidClientError: () => StripeInvalidClientError,
	StripeInvalidGrantError: () => StripeInvalidGrantError,
	StripeInvalidRequestError: () => StripeInvalidRequestError,
	StripeInvalidScopeError: () => StripeInvalidScopeError,
	StripeOAuthError: () => StripeOAuthError,
	StripeOAuthInvalidRequestError: () => StripeOAuthInvalidRequestError,
	StripePermissionError: () => StripePermissionError,
	StripeRateLimitError: () => StripeRateLimitError,
	StripeSignatureVerificationError: () => StripeSignatureVerificationError,
	StripeUnsupportedGrantTypeError: () => StripeUnsupportedGrantTypeError,
	StripeUnsupportedResponseTypeError: () => StripeUnsupportedResponseTypeError,
	TemporarySessionExpiredError: () => TemporarySessionExpiredError,
	generateOAuthError: () => generateOAuthError,
	generateV1Error: () => generateV1Error,
	generateV2Error: () => generateV2Error
});
const generateV1Error = (rawStripeError) => {
	const statusCode = rawStripeError.statusCode;
	if (statusCode === 429 || statusCode === 400 && rawStripeError.code === "rate_limit") return new StripeRateLimitError(rawStripeError);
	if (statusCode === 400 || statusCode === 404) {
		if (rawStripeError.type === "idempotency_error") return new StripeIdempotencyError(rawStripeError);
		return new StripeInvalidRequestError(rawStripeError);
	}
	if (statusCode === 401) return new StripeAuthenticationError(rawStripeError);
	if (statusCode === 402) return new StripeCardError(rawStripeError);
	if (statusCode === 403) return new StripePermissionError(rawStripeError);
	return new StripeAPIError(rawStripeError);
};
const generateOAuthError = (rawStripeError) => {
	switch (rawStripeError.type) {
		case "invalid_grant": return new StripeInvalidGrantError(rawStripeError);
		case "invalid_client": return new StripeInvalidClientError(rawStripeError);
		case "invalid_request": return new StripeOAuthInvalidRequestError(rawStripeError);
		case "invalid_scope": return new StripeInvalidScopeError(rawStripeError);
		case "unsupported_grant_type": return new StripeUnsupportedGrantTypeError(rawStripeError);
		case "unsupported_response_type": return new StripeUnsupportedResponseTypeError(rawStripeError);
		default: return new StripeOAuthError(rawStripeError);
	}
};
const generateV2Error = (rawStripeError) => {
	switch (rawStripeError.type) {
		case "idempotency_error": return new StripeIdempotencyError(rawStripeError);
		case "rate_limit": return new RateLimitError(rawStripeError);
		case "temporary_session_expired": return new TemporarySessionExpiredError(rawStripeError);
	}
	switch (rawStripeError.code) {
		case "invalid_fields": return new StripeInvalidRequestError(rawStripeError);
	}
	return generateV1Error(rawStripeError);
};
var StripeError = class extends Error {
	constructor(raw = {}, type = null) {
		super(raw.message);
		this.type = type || this.constructor.name;
		this.raw = raw;
		this.rawType = raw.type;
		this.detail = raw.detail;
		this.headers = raw.headers;
		this.requestId = raw.requestId;
		this.statusCode = raw.statusCode;
		this.message = raw.message ?? "";
		this.userMessage = raw.user_message;
		this.advice_code = raw.advice_code;
		this.charge = raw.charge;
		this.code = raw.code;
		this.decline_code = raw.decline_code;
		this.doc_url = raw.doc_url;
		this.network_advice_code = raw.network_advice_code;
		this.network_decline_code = raw.network_decline_code;
		this.param = raw.param;
		this.payment_intent = raw.payment_intent;
		this.payment_method = raw.payment_method;
		this.payment_method_type = raw.payment_method_type;
		this.request_log_url = raw.request_log_url;
		this.setup_intent = raw.setup_intent;
		this.source = raw.source;
		this.user_message = raw.user_message;
	}
};
StripeError.generate = generateV1Error;
var StripeCardError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeCardError");
		this.decline_code = raw.decline_code ?? "";
	}
};
var StripeInvalidRequestError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeInvalidRequestError");
	}
};
var StripeAPIError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeAPIError");
	}
};
var StripeAuthenticationError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeAuthenticationError");
	}
};
var StripePermissionError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripePermissionError");
	}
};
var StripeRateLimitError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeRateLimitError");
	}
};
var StripeConnectionError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeConnectionError");
	}
};
var StripeSignatureVerificationError = class extends StripeError {
	constructor(header, payload, raw = {}) {
		super(raw, "StripeSignatureVerificationError");
		this.header = header;
		this.payload = payload;
	}
};
var StripeIdempotencyError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeIdempotencyError");
	}
};
var StripeOAuthError = class extends StripeError {
	constructor(raw = {}, type = "StripeOAuthError") {
		super(raw, type);
	}
};
var StripeInvalidGrantError = class extends StripeOAuthError {
	constructor(raw = {}) {
		super(raw, "StripeInvalidGrantError");
	}
};
var StripeInvalidClientError = class extends StripeOAuthError {
	constructor(raw = {}) {
		super(raw, "StripeInvalidClientError");
	}
};
var StripeOAuthInvalidRequestError = class extends StripeOAuthError {
	constructor(raw = {}) {
		super(raw, "StripeOAuthInvalidRequestError");
	}
};
var StripeInvalidScopeError = class extends StripeOAuthError {
	constructor(raw = {}) {
		super(raw, "StripeInvalidScopeError");
	}
};
var StripeUnsupportedGrantTypeError = class extends StripeOAuthError {
	constructor(raw = {}) {
		super(raw, "StripeUnsupportedGrantTypeError");
	}
};
var StripeUnsupportedResponseTypeError = class extends StripeOAuthError {
	constructor(raw = {}) {
		super(raw, "StripeUnsupportedResponseTypeError");
	}
};
var RateLimitError = class extends StripeError {
	constructor(rawStripeError = {}) {
		super(rawStripeError, "RateLimitError");
	}
};
var TemporarySessionExpiredError = class extends StripeError {
	constructor(rawStripeError = {}) {
		super(rawStripeError, "TemporarySessionExpiredError");
	}
};
var HttpClient = class HttpClient {
	getClientName() {
		throw new Error("getClientName not implemented.");
	}
	makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
		throw new Error("makeRequest not implemented.");
	}
	static makeTimeoutError() {
		const timeoutErr = new TypeError(HttpClient.TIMEOUT_ERROR_CODE);
		timeoutErr.code = HttpClient.TIMEOUT_ERROR_CODE;
		return timeoutErr;
	}
};
HttpClient.CONNECTION_CLOSED_ERROR_CODES = ["ECONNRESET", "EPIPE"];
HttpClient.TIMEOUT_ERROR_CODE = "ETIMEDOUT";
var HttpClientResponse = class {
	constructor(statusCode, headers) {
		this._statusCode = statusCode;
		this._headers = headers;
	}
	getStatusCode() {
		return this._statusCode;
	}
	getHeaders() {
		return this._headers;
	}
	getRawResponse() {
		throw new Error("getRawResponse not implemented.");
	}
	toStream(streamCompleteCallback) {
		throw new Error("toStream not implemented.");
	}
	toJSON() {
		throw new Error("toJSON not implemented.");
	}
};
const DEFAULT_BASE_ADDRESSES = {
	api: "api.stripe.com",
	files: "files.stripe.com",
	connect: "connect.stripe.com",
	meter_events: "meter-events.stripe.com"
};
function queryStringifyRequestData(data) {
	return stringifyRequestData(data);
}
function encodeQueryValue(value) {
	return encodeURIComponent(value).replace(/!/g, "%21").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/'/g, "%27").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function valueToString(value) {
	if (value instanceof Date) return Math.floor(value.getTime() / 1e3).toString();
	if (value === null) return "";
	return String(value);
}
function stringifyRequestData(data) {
	const pairs = [];
	function encode(key, value) {
		if (value === void 0) return;
		if (value === null || typeof value !== "object" || value instanceof Date) {
			pairs.push(encodeQueryValue(key) + "=" + encodeQueryValue(valueToString(value)));
			return;
		}
		if (Array.isArray(value)) {
			for (let i = 0; i < value.length; i++) if (value[i] !== void 0) encode(key + "[" + i + "]", value[i]);
			return;
		}
		for (const k of Object.keys(value)) encode(key + "[" + k + "]", value[k]);
	}
	if (typeof data === "object" && data !== null) for (const key of Object.keys(data)) encode(key, data[key]);
	return pairs.join("&");
}
const makeURLInterpolator = (() => {
	const rc = {
		"\n": "\\n",
		"\"": "\\\"",
		"\u2028": "\\u2028",
		"\u2029": "\\u2029"
	};
	return (str) => {
		const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
		return (outputs) => {
			return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => {
				const output = outputs[$1];
				if (isValidEncodeUriComponentType(output)) return encodeURIComponent(output);
				return "";
			});
		};
	};
})();
function isValidEncodeUriComponentType(value) {
	return [
		"number",
		"string",
		"boolean"
	].includes(typeof value);
}
function processOptions(options) {
	const result = {
		authenticator: null,
		headers: {},
		settings: {},
		streaming: false,
		apiBase: null
	};
	if (!options) return result;
	if (options.apiKey) result.authenticator = createApiKeyAuthenticator(options.apiKey);
	if (options.idempotencyKey) result.headers["Idempotency-Key"] = options.idempotencyKey;
	if (options.stripeAccount) result.headers["Stripe-Account"] = options.stripeAccount;
	if (options.stripeContext) {
		if (result.headers["Stripe-Account"]) throw new Error("Can't specify both stripeAccount and stripeContext.");
		result.headers["Stripe-Context"] = options.stripeContext;
	}
	if (options.apiVersion) result.headers["Stripe-Version"] = options.apiVersion;
	if (Number.isInteger(options.maxNetworkRetries)) result.settings.maxNetworkRetries = options.maxNetworkRetries;
	if (Number.isInteger(options.timeout)) result.settings.timeout = options.timeout;
	if (options.authenticator) {
		if (options.apiKey) throw new Error("Can't specify both apiKey and authenticator.");
		if (typeof options.authenticator !== "function") throw new Error("The authenticator must be a function receiving a request as the first parameter.");
		result.authenticator = options.authenticator;
	}
	if (options.headers) Object.assign(result.headers, options.headers);
	if (options.streaming) result.streaming = true;
	return result;
}
function removeNullish(obj) {
	if (typeof obj !== "object") throw new Error("Argument must be an object");
	return Object.keys(obj).reduce((result, key) => {
		if (obj[key] != null) result[key] = obj[key];
		return result;
	}, {});
}
function normalizeHeaders(obj) {
	if (!(obj && typeof obj === "object")) return obj;
	return Object.keys(obj).reduce((result, header) => {
		result[normalizeHeader(header)] = obj[header];
		return result;
	}, {});
}
function normalizeHeader(header) {
	return header.split("-").map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()).join("-");
}
function pascalToCamelCase(name) {
	if (name === "OAuth") return "oauth";
	else return name[0].toLowerCase() + name.substring(1);
}
function isObject(obj) {
	const type = typeof obj;
	return (type === "function" || type === "object") && !!obj;
}
function flattenAndStringify(data) {
	const result = {};
	const step = (obj, prevKey) => {
		Object.entries(obj).forEach(([key, value]) => {
			const newKey = prevKey ? `${prevKey}[${key}]` : key;
			if (isObject(value)) if (!(value instanceof Uint8Array) && !Object.prototype.hasOwnProperty.call(value, "data")) return step(value, newKey);
			else result[newKey] = value;
			else result[newKey] = String(value);
		});
	};
	step(data, null);
	return result;
}
function validateInteger(name, n, defaultVal) {
	if (!Number.isInteger(n)) if (defaultVal !== void 0) return defaultVal;
	else throw new Error(`${name} must be an integer`);
	return n;
}
const AI_AGENTS = [
	["ANTIGRAVITY_CLI_ALIAS", "antigravity"],
	["CLAUDECODE", "claude_code"],
	["CLINE_ACTIVE", "cline"],
	["CODEX_SANDBOX", "codex_cli"],
	["CODEX_THREAD_ID", "codex_cli"],
	["CODEX_SANDBOX_NETWORK_DISABLED", "codex_cli"],
	["CODEX_CI", "codex_cli"],
	["CURSOR_AGENT", "cursor"],
	["GEMINI_CLI", "gemini_cli"],
	["OPENCLAW_SHELL", "openclaw"],
	["OPENCODE", "open_code"]
];
function detectAIAgent(env) {
	for (const [envVar, agentName] of AI_AGENTS) if (env[envVar]) return agentName;
	return "";
}
function createApiKeyAuthenticator(apiKey) {
	const authenticator = (request) => {
		request.headers.Authorization = "Bearer " + apiKey;
		return Promise.resolve();
	};
	authenticator._apiKey = apiKey;
	return authenticator;
}
function concat(arrays) {
	const totalLength = arrays.reduce((len, array) => len + array.length, 0);
	const merged = new Uint8Array(totalLength);
	let offset = 0;
	arrays.forEach((array) => {
		merged.set(array, offset);
		offset += array.length;
	});
	return merged;
}
function dateTimeReplacer(key, value) {
	if (this[key] instanceof Date) return Math.floor(this[key].getTime() / 1e3).toString();
	return value;
}
function jsonStringifyRequestData(data) {
	return JSON.stringify(data, dateTimeReplacer);
}
function getAPIMode(path) {
	if (!path) return "v1";
	return path.startsWith("/v2") ? "v2" : "v1";
}
function parseHttpHeaderAsString(header) {
	if (Array.isArray(header)) return header.join(", ");
	return String(header);
}
function parseHeadersForFetch(headers) {
	return Object.entries(headers).map(([key, value]) => {
		return [key, parseHttpHeaderAsString(value)];
	});
}
const CALL_SITE_MARKER = "\nOriginating from:";
function attachCallSiteToError(err, callSiteStack) {
	if (!err || !err.stack || !callSiteStack) return;
	const callerFrames = callSiteStack.substring(callSiteStack.indexOf("\n") + 1);
	const existingMarkerIdx = err.stack.indexOf(CALL_SITE_MARKER);
	err.stack = `${existingMarkerIdx >= 0 ? err.stack.substring(0, existingMarkerIdx) : err.stack}${CALL_SITE_MARKER}\n${callerFrames}`;
}
var RequestSender = class RequestSender {
	constructor(stripe, maxBufferedRequestMetric) {
		this._stripe = stripe;
		this._maxBufferedRequestMetric = maxBufferedRequestMetric;
	}
	_normalizeStripeContext(optsContext, clientContext) {
		if (optsContext) return optsContext.toString() || null;
		return clientContext?.toString() || null;
	}
	_addHeadersDirectlyToObject(obj, headers) {
		obj.requestId = headers["request-id"];
		obj.stripeAccount = obj.stripeAccount || headers["stripe-account"];
		obj.apiVersion = obj.apiVersion || headers["stripe-version"];
		obj.idempotencyKey = obj.idempotencyKey || headers["idempotency-key"];
	}
	_makeResponseEvent(requestEvent, statusCode, headers) {
		const requestEndTime = Date.now();
		const requestDurationMs = requestEndTime - requestEvent.request_start_time;
		return removeNullish({
			api_version: headers["stripe-version"],
			account: headers["stripe-account"],
			idempotency_key: headers["idempotency-key"],
			method: requestEvent.method,
			path: requestEvent.path,
			status: statusCode,
			request_id: this._getRequestId(headers),
			elapsed: requestDurationMs,
			request_start_time: requestEvent.request_start_time,
			request_end_time: requestEndTime
		});
	}
	_getRequestId(headers) {
		return headers["request-id"];
	}
	_emitStripeNotice(headers) {
		const notice = headers["stripe-notice"];
		if (notice) this._stripe._platformFunctions.emitWarning(typeof notice === "string" ? notice : notice[0]);
	}
	_streamingResponseHandler(requestEvent, usage, callback) {
		return (res) => {
			const headers = res.getHeaders();
			this._emitStripeNotice(headers);
			const streamCompleteCallback = () => {
				const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
				this._stripe._emitter.emit("response", responseEvent);
				this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed, usage);
			};
			const stream = res.toStream(streamCompleteCallback);
			this._addHeadersDirectlyToObject(stream, headers);
			return callback(null, stream);
		};
	}
	_jsonResponseHandler(requestEvent, apiMode, usage, callback) {
		return (res) => {
			const headers = res.getHeaders();
			this._emitStripeNotice(headers);
			const requestId = this._getRequestId(headers);
			const statusCode = res.getStatusCode();
			const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
			res.toJSON().then((jsonResponse) => {
				if (this._stripe.getEmitEventBodiesEnabled()) responseEvent.body = jsonResponse;
				if (jsonResponse.error) {
					const isOAuth = typeof jsonResponse.error === "string";
					if (isOAuth) jsonResponse.error = {
						type: jsonResponse.error,
						message: jsonResponse.error_description
					};
					jsonResponse.error.headers = headers;
					jsonResponse.error.statusCode = statusCode;
					jsonResponse.error.requestId = requestId;
					let err;
					if (isOAuth) err = generateOAuthError(jsonResponse.error);
					else if (apiMode === "v2") err = generateV2Error(jsonResponse.error);
					else err = generateV1Error(jsonResponse.error);
					throw err;
				}
				return jsonResponse;
			}, (e) => {
				if (this._stripe.getEmitEventBodiesEnabled() && e.rawBody) responseEvent.body = e.rawBody;
				throw new StripeAPIError({
					message: "Invalid JSON received from the Stripe API",
					exception: e,
					requestId: headers["request-id"]
				});
			}).then((jsonResponse) => {
				this._stripe._emitter.emit("response", responseEvent);
				this._recordRequestMetrics(requestId, responseEvent.elapsed, usage);
				const rawResponse = res.getRawResponse();
				this._addHeadersDirectlyToObject(rawResponse, headers);
				Object.defineProperty(jsonResponse, "lastResponse", {
					enumerable: false,
					writable: false,
					value: rawResponse
				});
				callback(null, jsonResponse);
			}, (e) => {
				this._stripe._emitter.emit("response", responseEvent);
				callback(e, null);
			});
		};
	}
	static _generateConnectionErrorMessage(requestRetries) {
		return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ""}`;
	}
	static _shouldRetry(res, numRetries, maxRetries, error) {
		if (error && numRetries === 0 && HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) return true;
		if (numRetries >= maxRetries) return false;
		if (!res) return true;
		if (res.getHeaders()["stripe-should-retry"] === "false") return false;
		if (res.getHeaders()["stripe-should-retry"] === "true") return true;
		if (res.getStatusCode() === 409) return true;
		if (res.getStatusCode() >= 500) return true;
		return false;
	}
	_getSleepTimeInMS(numRetries) {
		const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
		const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
		let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(2, numRetries - 1), maxNetworkRetryDelay);
		sleepSeconds *= .5 * (1 + Math.random());
		sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
		return sleepSeconds * 1e3;
	}
	_getMaxNetworkRetries(settings = {}) {
		return settings.maxNetworkRetries !== void 0 && Number.isInteger(settings.maxNetworkRetries) ? settings.maxNetworkRetries : this._stripe.getMaxNetworkRetries();
	}
	_defaultIdempotencyKey(method, settings, apiMode) {
		const maxRetries = this._getMaxNetworkRetries(settings);
		const genKey = () => `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
		if (apiMode === "v2") {
			if (method === "POST" || method === "DELETE") return genKey();
		} else if (apiMode === "v1") {
			if (method === "POST" && maxRetries > 0) return genKey();
		}
		return null;
	}
	_makeHeaders({ contentType, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings, stripeAccount, stripeContext, apiMode }) {
		const defaultHeaders = {
			Accept: "application/json",
			"Content-Type": contentType,
			"User-Agent": this._getUserAgentString(apiMode),
			"X-Stripe-Client-User-Agent": clientUserAgent,
			"X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
			"Stripe-Version": apiVersion,
			"Stripe-Account": stripeAccount,
			"Stripe-Context": stripeContext,
			"Idempotency-Key": this._defaultIdempotencyKey(method, userSuppliedSettings, apiMode)
		};
		const methodHasPayload = method == "POST" || method == "PUT" || method == "PATCH";
		if (methodHasPayload || contentLength) {
			if (!methodHasPayload) this._stripe._platformFunctions.emitWarning(`${method} method had non-zero contentLength but no payload is expected for this verb`);
			defaultHeaders["Content-Length"] = contentLength;
		}
		return Object.assign(removeNullish(defaultHeaders), normalizeHeaders(userSuppliedHeaders));
	}
	_getUserAgentString(apiMode) {
		const packageVersion = this._stripe.getConstant("PACKAGE_VERSION");
		const appInfo = this._stripe._appInfo ? this._stripe.getAppInfoAsString() : "";
		const aiAgent = this._stripe.getConstant("AI_AGENT");
		let uaString = `Stripe/${apiMode} NodeBindings/${packageVersion}`;
		if (appInfo) uaString += ` ${appInfo}`;
		if (aiAgent) uaString += ` AIAgent/${aiAgent}`;
		return uaString;
	}
	_getTelemetryHeader() {
		if (this._stripe.getTelemetryEnabled() && this._stripe._prevRequestMetrics.length > 0) {
			const metrics = this._stripe._prevRequestMetrics.shift();
			return JSON.stringify({ last_request_metrics: metrics });
		}
	}
	_recordRequestMetrics(requestId, requestDurationMs, usage) {
		if (this._stripe.getTelemetryEnabled() && requestId) if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) this._stripe._platformFunctions.emitWarning("Request metrics buffer is full, dropping telemetry message.");
		else {
			const m = {
				request_id: requestId,
				request_duration_ms: requestDurationMs
			};
			if (usage && usage.length > 0) m.usage = usage;
			this._stripe._prevRequestMetrics.push(m);
		}
	}
	_rawRequest(method, path, params, options, usage) {
		return new Promise((resolve, reject) => {
			try {
				const requestMethod = method.toUpperCase();
				if (requestMethod !== "POST" && params && Object.keys(params).length !== 0) throw new Error("rawRequest only supports params on POST requests. Please pass null and add your parameters to path.");
				const data = requestMethod === "POST" ? Object.assign({}, params) : null;
				const processed = processOptions(options);
				if (options?.additionalHeaders) Object.assign(processed.headers, options.additionalHeaders);
				const apiBase = processed.apiBase || (options?.apiBase ?? null);
				const host = apiBase ? this._stripe.resolveBaseAddress(apiBase) : null;
				this._request(requestMethod, host, path, data, processed.authenticator, {
					headers: processed.headers,
					settings: processed.settings,
					streaming: processed.streaming
				}, usage || ["raw_request"], (err, response) => {
					if (err) reject(err);
					else resolve(response);
				});
			} catch (err) {
				reject(err);
			}
		});
	}
	_getContentLength(data) {
		return typeof data === "string" ? new TextEncoder().encode(data).length : data.length;
	}
	_request(method, host, path, data, authenticator, options, usage = [], callback, requestDataProcessor = null) {
		let requestData;
		authenticator = authenticator ?? this._stripe._authenticator;
		const apiMode = getAPIMode(path);
		const retryRequest = (requestFn, apiVersion, headers, requestRetries) => {
			return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries), apiVersion, headers, requestRetries + 1);
		};
		const makeRequest = (apiVersion, headers, numRetries) => {
			const timeout = options.settings && options.settings.timeout && Number.isInteger(options.settings.timeout) && options.settings.timeout >= 0 ? options.settings.timeout : this._stripe.getApiField("timeout");
			const request = {
				host: host || this._stripe.getApiField("host"),
				port: this._stripe.getApiField("port"),
				path,
				method,
				headers: Object.assign({}, headers),
				body: requestData,
				protocol: this._stripe.getApiField("protocol")
			};
			if (!authenticator) throw Error("Authenticator was't initialized. Please pass an API Key or an Authenticator when initializing StripeClient.");
			authenticator(request).then(() => {
				const req = this._stripe.getApiField("httpClient").makeRequest(request.host, request.port, request.path, request.method, request.headers, request.body, request.protocol, timeout);
				const requestStartTime = Date.now();
				const requestEvent = removeNullish({
					api_version: apiVersion,
					account: parseHttpHeaderAsString(headers["Stripe-Account"]),
					idempotency_key: parseHttpHeaderAsString(headers["Idempotency-Key"]),
					method,
					path,
					body: this._stripe.getEmitEventBodiesEnabled() ? data ?? void 0 : void 0,
					request_start_time: requestStartTime
				});
				const requestRetries = numRetries || 0;
				const maxRetries = this._getMaxNetworkRetries(options.settings || {});
				this._stripe._emitter.emit("request", requestEvent);
				req.then((res) => {
					if (RequestSender._shouldRetry(res, requestRetries, maxRetries)) return retryRequest(makeRequest, apiVersion, headers, requestRetries);
					else if (options.streaming && res.getStatusCode() < 400) return this._streamingResponseHandler(requestEvent, usage, callback)(res);
					else return this._jsonResponseHandler(requestEvent, apiMode, usage, callback)(res);
				}).catch((error) => {
					if (RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) return retryRequest(makeRequest, apiVersion, headers, requestRetries);
					else return callback(new StripeConnectionError({
						message: error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE ? `Request aborted due to timeout being reached (${timeout}ms)` : RequestSender._generateConnectionErrorMessage(requestRetries),
						detail: error
					}));
				});
			}).catch((e) => {
				throw new StripeError({
					message: "Unable to authenticate the request",
					exception: e
				});
			});
		};
		const prepareAndMakeRequest = (error, data) => {
			if (error) return callback(error);
			requestData = data;
			this._stripe.getClientUserAgent((clientUserAgent) => {
				const apiVersion = this._stripe.getApiField("version");
				const headers = this._makeHeaders({
					contentType: apiMode == "v2" ? "application/json" : "application/x-www-form-urlencoded",
					contentLength: this._getContentLength(data),
					apiVersion,
					clientUserAgent,
					method,
					userSuppliedHeaders: options.headers ?? null,
					userSuppliedSettings: options.settings ?? {},
					stripeAccount: options.stripeAccount ?? this._stripe.getApiField("stripeAccount"),
					stripeContext: this._normalizeStripeContext(options.stripeContext, this._stripe.getApiField("stripeContext")),
					apiMode
				});
				makeRequest(apiVersion, headers, 0);
			});
		};
		if (requestDataProcessor) requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
		else {
			let stringifiedData;
			if (apiMode == "v2") stringifiedData = data ? jsonStringifyRequestData(data) : "";
			else stringifiedData = queryStringifyRequestData(data || {});
			prepareAndMakeRequest(null, stringifiedData);
		}
	}
};
const ROUNDING_PRESETS = {
	"ubb-usage-count": {
		mode: "significant-figures",
		value: 15
	},
	"v1-api": {
		mode: "decimal-places",
		value: 12
	}
};
const PLAIN_NOTATION_DIGIT_LIMIT = 30;
const MAX_EXPONENT = 1e6;
var DecimalImpl = class DecimalImpl {
	constructor(coefficient, exponent) {
		const [normalizedCoef, normalizedExp] = DecimalImpl.normalize(coefficient, exponent);
		this._coefficient = normalizedCoef;
		this._exponent = normalizedExp;
		Object.freeze(this);
	}
	static normalize(coefficient, exponent) {
		if (coefficient === 0n) return [0n, 0];
		let coef = coefficient;
		let exp = exponent;
		while (coef !== 0n && coef % 10n === 0n) {
			coef /= 10n;
			exp += 1;
		}
		return [coef, exp];
	}
	static roundDivision(quotient, remainder, divisor, direction) {
		if (remainder === 0n) return quotient;
		if (direction === "round-down") return quotient;
		const roundDir = remainder > 0n === divisor > 0n ? 1n : -1n;
		if (direction === "round-up") return quotient + roundDir;
		if (direction === "ceil") return roundDir === 1n ? quotient + 1n : quotient;
		if (direction === "floor") return roundDir === -1n ? quotient - 1n : quotient;
		const absRemainder = remainder < 0n ? -remainder : remainder;
		const absDivisor = divisor < 0n ? -divisor : divisor;
		const doubled = absRemainder * 2n;
		let cmp;
		if (doubled === absDivisor) cmp = 0;
		else if (doubled < absDivisor) cmp = -1;
		else cmp = 1;
		if (cmp < 0) return quotient;
		if (cmp > 0) return quotient + roundDir;
		if (direction === "half-up") return quotient + roundDir;
		if (direction === "half-down") return quotient;
		if (quotient % 2n === 0n) return quotient;
		else return quotient + roundDir;
	}
	add(other) {
		const otherImpl = other;
		if (this._exponent === otherImpl._exponent) return new DecimalImpl(this._coefficient + otherImpl._coefficient, this._exponent);
		if (this._exponent < otherImpl._exponent) {
			const scale = 10n ** BigInt(otherImpl._exponent - this._exponent);
			return new DecimalImpl(this._coefficient + otherImpl._coefficient * scale, this._exponent);
		} else {
			const scale = 10n ** BigInt(this._exponent - otherImpl._exponent);
			return new DecimalImpl(this._coefficient * scale + otherImpl._coefficient, otherImpl._exponent);
		}
	}
	sub(other) {
		const otherImpl = other;
		if (this._exponent === otherImpl._exponent) return new DecimalImpl(this._coefficient - otherImpl._coefficient, this._exponent);
		if (this._exponent < otherImpl._exponent) {
			const scale = 10n ** BigInt(otherImpl._exponent - this._exponent);
			return new DecimalImpl(this._coefficient - otherImpl._coefficient * scale, this._exponent);
		} else {
			const scale = 10n ** BigInt(this._exponent - otherImpl._exponent);
			return new DecimalImpl(this._coefficient * scale - otherImpl._coefficient, otherImpl._exponent);
		}
	}
	mul(other) {
		const otherImpl = other;
		return new DecimalImpl(this._coefficient * otherImpl._coefficient, this._exponent + otherImpl._exponent);
	}
	div(other, precision, direction) {
		if (precision < 0 || !Number.isInteger(precision)) throw new Error("precision must be a non-negative integer");
		const otherImpl = other;
		if (otherImpl._coefficient === 0n) throw new Error("Division by zero");
		const scale = this._exponent - otherImpl._exponent + precision;
		let quotient;
		let remainder;
		let roundingDivisor;
		if (scale >= 0) {
			const scaledDividend = this._coefficient * 10n ** BigInt(scale);
			quotient = scaledDividend / otherImpl._coefficient;
			remainder = scaledDividend % otherImpl._coefficient;
			roundingDivisor = otherImpl._coefficient;
		} else {
			const scaledDivisor = otherImpl._coefficient * 10n ** BigInt(-scale);
			quotient = this._coefficient / scaledDivisor;
			remainder = this._coefficient % scaledDivisor;
			roundingDivisor = scaledDivisor;
		}
		const roundedQuotient = DecimalImpl.roundDivision(quotient, remainder, roundingDivisor, direction);
		return new DecimalImpl(roundedQuotient, -precision);
	}
	cmp(other) {
		const otherImpl = other;
		if (this._exponent === otherImpl._exponent) {
			if (this._coefficient < otherImpl._coefficient) return -1;
			if (this._coefficient > otherImpl._coefficient) return 1;
			return 0;
		}
		if (this._exponent < otherImpl._exponent) {
			const scale = 10n ** BigInt(otherImpl._exponent - this._exponent);
			const scaledOther = otherImpl._coefficient * scale;
			if (this._coefficient < scaledOther) return -1;
			if (this._coefficient > scaledOther) return 1;
			return 0;
		} else {
			const scale = 10n ** BigInt(this._exponent - otherImpl._exponent);
			const scaledThis = this._coefficient * scale;
			if (scaledThis < otherImpl._coefficient) return -1;
			if (scaledThis > otherImpl._coefficient) return 1;
			return 0;
		}
	}
	eq(other) {
		return this.cmp(other) === 0;
	}
	lt(other) {
		return this.cmp(other) === -1;
	}
	lte(other) {
		return this.cmp(other) <= 0;
	}
	gt(other) {
		return this.cmp(other) === 1;
	}
	gte(other) {
		return this.cmp(other) >= 0;
	}
	isZero() {
		return this._coefficient === 0n;
	}
	isNegative() {
		return this._coefficient < 0n;
	}
	isPositive() {
		return this._coefficient > 0n;
	}
	neg() {
		return new DecimalImpl(-this._coefficient, this._exponent);
	}
	abs() {
		if (this._coefficient < 0n) return new DecimalImpl(-this._coefficient, this._exponent);
		return this;
	}
	round(direction, options) {
		const resolved = typeof options === "string" ? ROUNDING_PRESETS[options] : options;
		if (resolved === void 0) throw new Error(`Unknown rounding preset: "${options}"`);
		if (resolved.value < 0 || !Number.isInteger(resolved.value)) throw new Error("DecimalRoundingOptions.value must be a non-negative integer");
		if (resolved.mode === "decimal-places") {
			const fixed = this.toFixed(resolved.value, direction);
			return Decimal.from(fixed);
		}
		if (this._coefficient === 0n) return this;
		const currentSigFigs = (this._coefficient < 0n ? (-this._coefficient).toString() : this._coefficient.toString()).length;
		if (resolved.value === 0) return Decimal.zero;
		if (currentSigFigs <= resolved.value) return this;
		const digitsToTrim = currentSigFigs - resolved.value;
		const divisor = 10n ** BigInt(digitsToTrim);
		const quotient = this._coefficient / divisor;
		const remainder = this._coefficient % divisor;
		const rounded = DecimalImpl.roundDivision(quotient, remainder, divisor, direction);
		return new DecimalImpl(rounded, this._exponent + digitsToTrim);
	}
	toString() {
		if (this._coefficient === 0n) return "0";
		const coeffStr = this._coefficient.toString();
		const isNeg = coeffStr.startsWith("-");
		const absCoeffStr = isNeg ? coeffStr.slice(1) : coeffStr;
		if (this._exponent < 0) {
			const decimalPlaces = -this._exponent;
			if ((decimalPlaces >= absCoeffStr.length ? decimalPlaces - absCoeffStr.length : 0) > PLAIN_NOTATION_DIGIT_LIMIT) {
				if (absCoeffStr.length === 1) return `${coeffStr}E${String(this._exponent)}`;
				const intPart = absCoeffStr[0] ?? "";
				const fracPart = absCoeffStr.slice(1);
				const adjustedExp = this._exponent + absCoeffStr.length - 1;
				return `${isNeg ? "-" : ""}${intPart}.${fracPart}E${String(adjustedExp)}`;
			}
			if (decimalPlaces >= absCoeffStr.length) {
				const leadingZeros = "0".repeat(decimalPlaces - absCoeffStr.length);
				return `${isNeg ? "-" : ""}0.${leadingZeros}${absCoeffStr}`;
			} else {
				const integerPart = absCoeffStr.slice(0, absCoeffStr.length - decimalPlaces);
				const fractionalPart = absCoeffStr.slice(absCoeffStr.length - decimalPlaces);
				return `${isNeg ? "-" : ""}${integerPart}.${fractionalPart}`;
			}
		}
		if (absCoeffStr.length + this._exponent <= PLAIN_NOTATION_DIGIT_LIMIT) {
			if (this._exponent === 0) return coeffStr;
			const trailingZeros = "0".repeat(this._exponent);
			return `${isNeg ? "-" : ""}${absCoeffStr}${trailingZeros}`;
		} else {
			if (absCoeffStr.length === 1) return `${coeffStr}E+${String(this._exponent)}`;
			const integerPart = absCoeffStr[0] ?? "";
			const fractionalPart = absCoeffStr.slice(1);
			const adjustedExponent = this._exponent + absCoeffStr.length - 1;
			return `${isNeg ? "-" : ""}${integerPart}.${fractionalPart}E+${String(adjustedExponent)}`;
		}
	}
	toJSON() {
		return this.toString();
	}
	toNumber() {
		return Number(this.toString());
	}
	toFixed(decimalPlaces, direction) {
		if (decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) throw new Error("decimalPlaces must be a non-negative integer");
		const formatFixed = (coef) => {
			const coeffStr = coef.toString();
			const isNeg = coeffStr.startsWith("-");
			const absCoeffStr = isNeg ? coeffStr.slice(1) : coeffStr;
			if (decimalPlaces === 0) return coeffStr;
			if (decimalPlaces >= absCoeffStr.length) {
				const leadingZeros = "0".repeat(decimalPlaces - absCoeffStr.length);
				return `${isNeg ? "-" : ""}0.${leadingZeros}${absCoeffStr}`;
			} else {
				const integerPart = absCoeffStr.slice(0, absCoeffStr.length - decimalPlaces);
				const fractionalPart = absCoeffStr.slice(absCoeffStr.length - decimalPlaces);
				return `${isNeg ? "-" : ""}${integerPart}.${fractionalPart}`;
			}
		};
		const targetExponent = -decimalPlaces;
		if (this._exponent === targetExponent) return formatFixed(this._coefficient);
		if (this._exponent < targetExponent) {
			const scaleDiff = targetExponent - this._exponent;
			const divisor = 10n ** BigInt(scaleDiff);
			const quotient = this._coefficient / divisor;
			const remainder = this._coefficient % divisor;
			return formatFixed(DecimalImpl.roundDivision(quotient, remainder, divisor, direction));
		} else {
			const scaleDiff = this._exponent - targetExponent;
			return formatFixed(this._coefficient * 10n ** BigInt(scaleDiff));
		}
	}
	valueOf() {
		return this.toString();
	}
};
const Decimal = {
	from(value) {
		if (typeof value === "bigint") return new DecimalImpl(value, 0);
		if (typeof value === "number") {
			if (!Number.isFinite(value)) throw new Error("Number must be finite");
			return Decimal.from(value.toString());
		}
		const trimmed = value.trim();
		if (trimmed === "") throw new Error("Cannot parse empty string as Decimal");
		const match = /^([+-]?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(trimmed);
		if (!match) throw new Error(`Invalid decimal string: ${value}`);
		const sign = match[1] === "-" ? -1n : 1n;
		const integerPart = match[2] ?? "";
		const fractionalPart = match[3] ?? "";
		const exponentPart = match[4] ? Number(match[4]) : 0;
		if (!Number.isSafeInteger(exponentPart) || exponentPart > MAX_EXPONENT || exponentPart < -1e6) throw new Error(`Exponent out of range: ${String(match[4])} exceeds safe integer bounds`);
		const coefficientStr = integerPart + fractionalPart;
		const coefficient = sign * BigInt(coefficientStr);
		const exponent = exponentPart - fractionalPart.length;
		if (!Number.isSafeInteger(exponent) || exponent > MAX_EXPONENT || exponent < -1e6) throw new Error(`Computed exponent out of range: ${String(exponent)} exceeds safe integer bounds`);
		return new DecimalImpl(coefficient, exponent);
	},
	zero: new DecimalImpl(0n, 0)
};
const coerceV2RequestData = (data, schema) => {
	if (data == null) return data;
	switch (schema.kind) {
		case "int64_string": return typeof data === "bigint" || typeof data === "number" ? String(data) : data;
		case "decimal_string": return typeof data.toFixed === "function" && typeof data.isZero === "function" ? data.toString() : data;
		case "object": {
			if (typeof data !== "object" || Array.isArray(data)) return data;
			const obj = data;
			const result = {};
			for (const key of Object.keys(obj)) {
				const fieldSchema = schema.fields[key];
				result[key] = fieldSchema ? coerceV2RequestData(obj[key], fieldSchema) : obj[key];
			}
			return result;
		}
		case "array":
			if (!Array.isArray(data)) return data;
			return data.map((element) => coerceV2RequestData(element, schema.element));
		case "nullable": return coerceV2RequestData(data, schema.inner);
	}
};
const coerceV2ResponseData = (data, schema) => {
	if (data == null) return data;
	switch (schema.kind) {
		case "int64_string":
			if (typeof data === "string") try {
				return BigInt(data);
			} catch {
				throw new Error(`Failed to coerce int64_string value: expected an integer string, got '${data}'`);
			}
			return data;
		case "decimal_string":
			if (typeof data === "string") try {
				return Decimal.from(data);
			} catch {
				throw new Error(`Failed to coerce decimal_string value: expected a decimal string, got '${data}'`);
			}
			return data;
		case "object": {
			if (typeof data !== "object" || Array.isArray(data)) return data;
			const obj = data;
			for (const key of Object.keys(schema.fields)) if (key in obj) obj[key] = coerceV2ResponseData(obj[key], schema.fields[key]);
			return obj;
		}
		case "array":
			if (!Array.isArray(data)) return data;
			for (let i = 0; i < data.length; i++) data[i] = coerceV2ResponseData(data[i], schema.element);
			return data;
		case "nullable": return coerceV2ResponseData(data, schema.inner);
	}
};
var V1Iterator = class {
	constructor(firstPagePromise, params, options, method, path, spec, stripeResource) {
		this.index = 0;
		this.pagePromise = firstPagePromise;
		this.promiseCache = { currentPromise: null };
		this.params = params;
		this.options = options;
		this.method = method;
		this.path = path;
		this.spec = spec;
		this.stripeResource = stripeResource;
	}
	async iterate(pageResult) {
		if (!(pageResult && pageResult.data && typeof pageResult.data.length === "number")) throw Error("Unexpected: Stripe API response does not have a well-formed `data` array.");
		const reverseIteration = !!this.params.ending_before;
		if (this.index < pageResult.data.length) {
			const idx = reverseIteration ? pageResult.data.length - 1 - this.index : this.index;
			const value = pageResult.data[idx];
			this.index += 1;
			return {
				value,
				done: false
			};
		} else if (pageResult.has_more) {
			this.index = 0;
			this.pagePromise = this.getNextPage(pageResult);
			const nextPageResult = await this.pagePromise;
			return this.iterate(nextPageResult);
		}
		return {
			done: true,
			value: void 0
		};
	}
	getNextPage(_pageResult) {
		throw new Error("Unimplemented");
	}
	async _next() {
		return this.iterate(await this.pagePromise);
	}
	next() {
		if (this.promiseCache.currentPromise) return this.promiseCache.currentPromise;
		const nextPromise = (async () => {
			const ret = await this._next();
			this.promiseCache.currentPromise = null;
			return ret;
		})();
		this.promiseCache.currentPromise = nextPromise;
		return nextPromise;
	}
};
var V1ListIterator = class extends V1Iterator {
	getNextPage(pageResult) {
		const reverseIteration = !!this.params.ending_before;
		const lastId = getLastId(pageResult, reverseIteration);
		const nextParams = {
			...this.params,
			[reverseIteration ? "ending_before" : "starting_after"]: lastId
		};
		return this.stripeResource._makeRequest(this.method, this.path, nextParams, this.options, this.spec);
	}
};
var V1SearchIterator = class extends V1Iterator {
	getNextPage(pageResult) {
		if (!pageResult.next_page) throw Error("Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.");
		const nextParams = {
			...this.params,
			page: pageResult.next_page
		};
		return this.stripeResource._makeRequest(this.method, this.path, nextParams, this.options, this.spec);
	}
};
var V2ListIterator = class {
	constructor(firstPagePromise, options, spec, stripeResource) {
		this.firstPagePromise = firstPagePromise;
		this.currentPageIterator = null;
		this.nextPageUrl = null;
		this.promiseCache = { currentPromise: null };
		this.options = options;
		this.spec = spec;
		this.stripeResource = stripeResource;
	}
	async initFirstPage() {
		if (this.firstPagePromise) {
			const page = await this.firstPagePromise;
			this.firstPagePromise = null;
			this.currentPageIterator = page.data[Symbol.iterator]();
			this.nextPageUrl = page.next_page_url || null;
		}
	}
	async turnPage() {
		if (!this.nextPageUrl) return null;
		const page = await this.stripeResource._makeRequest("GET", this.nextPageUrl, void 0, this.options, this.spec);
		this.nextPageUrl = page.next_page_url || null;
		this.currentPageIterator = page.data[Symbol.iterator]();
		return this.currentPageIterator;
	}
	async _next() {
		await this.initFirstPage();
		if (this.currentPageIterator) {
			const result = this.currentPageIterator.next();
			if (!result.done) return {
				done: false,
				value: result.value
			};
		}
		return this.nextFromNewPage();
	}
	async nextFromNewPage() {
		const nextPageIterator = await this.turnPage();
		if (!nextPageIterator) return {
			done: true,
			value: void 0
		};
		const result = nextPageIterator.next();
		if (!result.done) return {
			done: false,
			value: result.value
		};
		return this.nextFromNewPage();
	}
	next() {
		if (this.promiseCache.currentPromise) return this.promiseCache.currentPromise;
		const nextPromise = (async () => {
			try {
				return await this._next();
			} finally {
				this.promiseCache.currentPromise = null;
			}
		})();
		this.promiseCache.currentPromise = nextPromise;
		return nextPromise;
	}
};
const makeAutoPaginationMethods = (stripeResource, params, options, method, path, spec, firstPagePromise) => {
	const apiMode = getAPIMode(path);
	const methodType = spec?.methodType;
	if (apiMode !== "v2" && methodType === "search") return makeAutoPaginationMethodsFromIterator(new V1SearchIterator(firstPagePromise, params, options, method, path, spec, stripeResource));
	if (apiMode !== "v2" && methodType === "list") return makeAutoPaginationMethodsFromIterator(new V1ListIterator(firstPagePromise, params, options, method, path, spec, stripeResource));
	if (apiMode === "v2" && methodType === "list") return makeAutoPaginationMethodsFromIterator(new V2ListIterator(firstPagePromise, options, spec, stripeResource));
	return null;
};
const makeAutoPaginationMethodsFromIterator = (iterator) => {
	const autoPagingEach = makeAutoPagingEach((...args) => iterator.next(...args));
	const autoPaginationMethods = {
		autoPagingEach,
		autoPagingToArray: makeAutoPagingToArray(autoPagingEach),
		next: () => iterator.next(),
		return: () => {
			return {};
		},
		[getAsyncIteratorSymbol()]: () => {
			return autoPaginationMethods;
		}
	};
	return autoPaginationMethods;
};
function getAsyncIteratorSymbol() {
	if (typeof Symbol !== "undefined" && Symbol.asyncIterator) return Symbol.asyncIterator;
	return "@@asyncIterator";
}
function getDoneCallback(args) {
	if (args.length < 2) return null;
	const onDone = args[1];
	if (typeof onDone !== "function") throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
	return onDone;
}
function getItemCallback(args) {
	if (args.length === 0) return;
	const onItem = args[0];
	if (typeof onItem !== "function") throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
	if (onItem.length === 2) return onItem;
	if (onItem.length > 2) throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
	return function _onItem(item, next) {
		next(onItem(item));
	};
}
function getLastId(listResult, reverseIteration) {
	const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
	const lastItem = listResult.data[lastIdx];
	const lastId = lastItem && lastItem.id;
	if (!lastId) throw Error("Unexpected: No `id` found on the last item while auto-paging a list.");
	return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
	return function autoPagingEach() {
		const callSiteStack = new Error().stack;
		const args = [].slice.call(arguments);
		const onItem = getItemCallback(args);
		const onDone = getDoneCallback(args);
		if (args.length > 2) throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
		const autoPagePromise = wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem).catch((err) => {
			attachCallSiteToError(err, callSiteStack);
			throw err;
		});
		if (onDone) autoPagePromise.then(() => onDone(), (err) => onDone(err));
		return autoPagePromise;
	};
}
function makeAutoPagingToArray(autoPagingEach) {
	return function autoPagingToArray(opts, onDone) {
		const callSiteStack = new Error().stack;
		const limit = opts && opts.limit;
		if (!limit) throw Error("You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.");
		if (limit > 1e4) throw Error("You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.");
		const promise = new Promise((resolve, reject) => {
			const items = [];
			autoPagingEach((item) => {
				items.push(item);
				if (items.length >= limit) return false;
			}).then(() => {
				resolve(items);
			}).catch((err) => {
				attachCallSiteToError(err, callSiteStack);
				reject(err);
			});
		});
		if (onDone) promise.then((items) => onDone(null, items), (err) => onDone(err));
		return promise;
	};
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
	return new Promise((resolve, reject) => {
		function handleIteration(iterResult) {
			if (iterResult.done) {
				resolve();
				return;
			}
			const item = iterResult.value;
			return new Promise((next) => {
				onItem(item, next);
			}).then((shouldContinue) => {
				if (shouldContinue === false) return handleIteration({
					done: true,
					value: void 0
				});
				else return asyncIteratorNext().then(handleIteration);
			});
		}
		asyncIteratorNext().then(handleIteration).catch(reject);
	});
}
var StripeResource = class {
	constructor(stripe, deprecatedUrlData) {
		this.resourcePath = "";
		this.requestDataProcessor = null;
		this._stripe = stripe;
		if (deprecatedUrlData) throw new Error("Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.");
		this.basePath = makeURLInterpolator(this.basePath || stripe.getApiField("basePath"));
		const rawPath = this.path || "";
		this.resourcePath = rawPath;
		this.path = makeURLInterpolator(rawPath);
		this.initialize(stripe, deprecatedUrlData);
	}
	initialize(_stripe, _deprecatedUrlData) {}
	_makeRequest(method, path, params, options, spec) {
		const requestMethod = method.toUpperCase();
		const data = (spec?.encode || ((data) => data))(params ? { ...params } : {});
		const processed = processOptions(options);
		const apiBase = processed.apiBase || spec?.apiBase || null;
		const host = apiBase ? this._stripe.resolveBaseAddress(apiBase) : null;
		const streaming = processed.streaming || !!spec?.streaming;
		const headers = Object.assign(processed.headers, spec?.headers);
		const usage = spec?.usage || [];
		const dataInQuery = requestMethod === "GET" || requestMethod === "DELETE";
		let bodyData = dataInQuery ? null : data;
		const queryData = dataInQuery ? data : {};
		try {
			if (spec?.validator) spec.validator(data, { headers });
			if (spec?.requestSchema && bodyData) bodyData = coerceV2RequestData(bodyData, spec.requestSchema);
		} catch (err) {
			return Promise.reject(err);
		}
		const callSiteStack = new Error().stack;
		const innerPromise = new Promise((resolve, reject) => {
			function requestCallback(err, response) {
				if (err) {
					attachCallSiteToError(err, callSiteStack);
					reject(err);
				} else try {
					if (spec?.responseSchema) coerceV2ResponseData(response, spec.responseSchema);
					resolve(spec?.transformResponseData ? spec.transformResponseData(response) : response);
				} catch (e) {
					reject(e);
				}
			}
			const fullPath = [
				path,
				Object.keys(queryData).length === 0 ? "" : "?",
				queryStringifyRequestData(queryData)
			].join("");
			this._stripe._requestSender._request(requestMethod, host, fullPath, bodyData, processed.authenticator, {
				headers,
				settings: processed.settings,
				streaming
			}, usage, requestCallback, this.requestDataProcessor?.bind(this));
		});
		if (spec?.methodType) Object.assign(innerPromise, makeAutoPaginationMethods(this, params ? { ...params } : {}, options, requestMethod, path, spec, innerPromise));
		return innerPromise;
	}
};
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
var StripeContext = class StripeContext {
	constructor(segments = []) {
		this._segments = [...segments];
	}
	get segments() {
		return [...this._segments];
	}
	push(segment) {
		if (!segment) throw new Error("Segment cannot be null or undefined");
		return new StripeContext([...this._segments, segment]);
	}
	pop() {
		if (this._segments.length === 0) throw new Error("Cannot pop from an empty context");
		return new StripeContext(this._segments.slice(0, -1));
	}
	toString() {
		return this._segments.join("/");
	}
	static parse(contextStr) {
		if (!contextStr) return new StripeContext([]);
		return new StripeContext(contextStr.split("/"));
	}
};
var CryptoProvider = class {
	computeHMACSignature(payload, secret) {
		throw new Error("computeHMACSignature not implemented.");
	}
	computeHMACSignatureAsync(payload, secret) {
		throw new Error("computeHMACSignatureAsync not implemented.");
	}
	computeSHA256Async(data) {
		throw new Error("computeSHA256 not implemented.");
	}
};
var CryptoProviderOnlySupportsAsyncError = class extends Error {};
var NodeCryptoProvider = class extends CryptoProvider {
	computeHMACSignature(payload, secret) {
		return crypto$1.createHmac("sha256", secret).update(payload, "utf8").digest("hex");
	}
	async computeHMACSignatureAsync(payload, secret) {
		return await this.computeHMACSignature(payload, secret);
	}
	async computeSHA256Async(data) {
		return new Uint8Array(await crypto$1.createHash("sha256").update(data).digest());
	}
};
const http = http_.default || http_;
const https = https_.default || https_;
const defaultHttpAgent = new http.Agent({ keepAlive: true });
const defaultHttpsAgent = new https.Agent({ keepAlive: true });
var NodeHttpClient = class extends HttpClient {
	constructor(agent) {
		super();
		this._agent = agent;
	}
	getClientName() {
		return "node";
	}
	makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
		const isInsecureConnection = protocol === "http";
		let agent = this._agent;
		if (!agent) agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
		return new Promise((resolve, reject) => {
			const req = (isInsecureConnection ? http : https).request({
				host,
				port,
				path,
				method,
				agent,
				headers,
				ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5"
			});
			req.setTimeout(timeout, () => {
				req.destroy(HttpClient.makeTimeoutError());
			});
			req.on("response", (res) => {
				resolve(new NodeHttpClientResponse(res));
			});
			req.on("error", (error) => {
				reject(error);
			});
			req.once("socket", (socket) => {
				if (socket.connecting) socket.once(isInsecureConnection ? "connect" : "secureConnect", () => {
					req.write(requestData);
					req.end();
				});
				else {
					req.write(requestData);
					req.end();
				}
			});
		});
	}
};
var NodeHttpClientResponse = class extends HttpClientResponse {
	constructor(res) {
		super(res.statusCode, res.headers || {});
		this._res = res;
	}
	getRawResponse() {
		return this._res;
	}
	toStream(streamCompleteCallback) {
		this._res.once("end", () => streamCompleteCallback());
		return this._res;
	}
	toJSON() {
		return new Promise((resolve, reject) => {
			let response = "";
			this._res.setEncoding("utf8");
			this._res.on("data", (chunk) => {
				response += chunk;
			});
			this._res.once("end", () => {
				try {
					resolve(JSON.parse(response));
				} catch (e) {
					if (e instanceof Error) e.rawBody = response;
					reject(e);
				}
			});
		});
	}
};
var FetchHttpClient = class FetchHttpClient extends HttpClient {
	constructor(fetchFn) {
		super();
		if (!fetchFn) {
			if (!globalThis.fetch) throw new Error("fetch() function not provided and is not defined in the global scope. You must provide a fetch implementation.");
			fetchFn = globalThis.fetch;
		}
		if (globalThis.AbortController) this._fetchFn = FetchHttpClient.makeFetchWithAbortTimeout(fetchFn);
		else this._fetchFn = FetchHttpClient.makeFetchWithRaceTimeout(fetchFn);
	}
	static makeFetchWithRaceTimeout(fetchFn) {
		return (url, init, timeout) => {
			let pendingTimeoutId;
			const timeoutPromise = new Promise((_, reject) => {
				pendingTimeoutId = setTimeout(() => {
					pendingTimeoutId = null;
					reject(HttpClient.makeTimeoutError());
				}, timeout);
			});
			const fetchPromise = fetchFn(url, init);
			return Promise.race([fetchPromise, timeoutPromise]).finally(() => {
				if (pendingTimeoutId) clearTimeout(pendingTimeoutId);
			});
		};
	}
	static makeFetchWithAbortTimeout(fetchFn) {
		return async (url, init, timeout) => {
			const abort = new AbortController();
			let timeoutId = setTimeout(() => {
				timeoutId = null;
				abort.abort(HttpClient.makeTimeoutError());
			}, timeout);
			try {
				return await fetchFn(url, {
					...init,
					signal: abort.signal
				});
			} catch (err) {
				if (err.name === "AbortError") throw HttpClient.makeTimeoutError();
				else throw err;
			} finally {
				if (timeoutId) clearTimeout(timeoutId);
			}
		};
	}
	getClientName() {
		return "fetch";
	}
	async makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
		const isInsecureConnection = protocol === "http";
		if (!path.startsWith("/")) throw new Error(`Only relative paths are supported, got: "${path}"`);
		const url = new URL(`${isInsecureConnection ? "http" : "https"}://${host}${path}`);
		url.port = port;
		const body = requestData || (method == "POST" || method == "PUT" || method == "PATCH" ? "" : void 0);
		return new FetchHttpClientResponse(await this._fetchFn(url.toString(), {
			method,
			headers: parseHeadersForFetch(headers),
			body
		}, timeout));
	}
};
var FetchHttpClientResponse = class FetchHttpClientResponse extends HttpClientResponse {
	constructor(res) {
		super(res.status, FetchHttpClientResponse._transformHeadersToObject(res.headers));
		this._res = res;
	}
	getRawResponse() {
		return this._res;
	}
	toStream(streamCompleteCallback) {
		streamCompleteCallback();
		return this._res.body;
	}
	toJSON() {
		return this._res.text().then((text) => {
			try {
				return JSON.parse(text);
			} catch (e) {
				if (e instanceof Error) e.rawBody = text;
				throw e;
			}
		});
	}
	static _transformHeadersToObject(headers) {
		const headersObj = {};
		for (const entry of headers) {
			if (!Array.isArray(entry) || entry.length != 2) throw new Error("Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.");
			headersObj[entry[0]] = entry[1];
		}
		return headersObj;
	}
};
var SubtleCryptoProvider = class extends CryptoProvider {
	constructor(subtleCrypto) {
		super();
		this.subtleCrypto = subtleCrypto || crypto.subtle;
	}
	computeHMACSignature(payload, secret) {
		throw new CryptoProviderOnlySupportsAsyncError("SubtleCryptoProvider cannot be used in a synchronous context.");
	}
	async computeHMACSignatureAsync(payload, secret) {
		const encoder = new TextEncoder();
		const key = await this.subtleCrypto.importKey("raw", encoder.encode(secret), {
			name: "HMAC",
			hash: { name: "SHA-256" }
		}, false, ["sign"]);
		const signatureBuffer = await this.subtleCrypto.sign("hmac", key, encoder.encode(payload));
		const signatureBytes = new Uint8Array(signatureBuffer);
		const signatureHexCodes = new Array(signatureBytes.length);
		for (let i = 0; i < signatureBytes.length; i++) signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
		return signatureHexCodes.join("");
	}
	async computeSHA256Async(data) {
		return new Uint8Array(await this.subtleCrypto.digest("SHA-256", data));
	}
};
const byteHexMapping = new Array(256);
for (let i = 0; i < byteHexMapping.length; i++) byteHexMapping[i] = i.toString(16).padStart(2, "0");
var PlatformFunctions = class {
	constructor() {
		this._fetchFn = null;
		this._agent = null;
	}
	getPlatformInfo() {
		return null;
	}
	getTelemetryId() {
		return null;
	}
	emitWarning(warning) {
		console.warn(`Stripe: ${warning}`);
	}
	getEnv() {
		return null;
	}
	getRuntimeVersion() {
		return null;
	}
	uuid4() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 | 0;
			return (c === "x" ? r : r & 3 | 8).toString(16);
		});
	}
	secureCompare(a, b) {
		if (a.length !== b.length) return false;
		const len = a.length;
		let result = 0;
		for (let i = 0; i < len; ++i) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
		return result === 0;
	}
	createEmitter() {
		throw new Error("createEmitter not implemented.");
	}
	tryBufferData(data) {
		throw new Error("tryBufferData not implemented.");
	}
	createNodeHttpClient(agent) {
		throw new Error("createNodeHttpClient not implemented.");
	}
	createFetchHttpClient(fetchFn) {
		return new FetchHttpClient(fetchFn);
	}
	createDefaultHttpClient() {
		throw new Error("createDefaultHttpClient not implemented.");
	}
	createNodeCryptoProvider() {
		throw new Error("createNodeCryptoProvider not implemented.");
	}
	createSubtleCryptoProvider(subtleCrypto) {
		return new SubtleCryptoProvider(subtleCrypto);
	}
	createDefaultCryptoProvider() {
		throw new Error("createDefaultCryptoProvider not implemented.");
	}
};
var StreamProcessingError = class extends StripeError {};
var NodePlatformFunctions = class extends PlatformFunctions {
	constructor() {
		super(...arguments);
		this._telemetryId = void 0;
	}
	uuid4() {
		if (crypto$1.randomUUID) return crypto$1.randomUUID();
		return super.uuid4();
	}
	getPlatformInfo() {
		return `${process.platform} ${os.release()} ${os.arch()}`;
	}
	emitWarning(warning) {
		if (typeof process.emitWarning === "function") process.emitWarning(warning, "Stripe");
		else super.emitWarning(warning);
	}
	getEnv() {
		return process.env;
	}
	getRuntimeVersion() {
		return process.version;
	}
	getTelemetryId() {
		if (this._telemetryId !== void 0) return this._telemetryId;
		const filePath = this._getTelemetryIdPath();
		if (!filePath) {
			this._telemetryId = null;
			return null;
		}
		try {
			const content = fs.readFileSync(filePath, "utf8").trim();
			if (content) {
				this._telemetryId = content;
				return content;
			}
		} catch {}
		const newId = crypto$1.randomBytes(16).toString("hex");
		try {
			fs.mkdirSync(path.dirname(filePath), { recursive: true });
			fs.writeFileSync(filePath, newId, "utf8");
		} catch {
			this._telemetryId = null;
			return null;
		}
		this._telemetryId = newId;
		return newId;
	}
	_getTelemetryIdPath() {
		if (process.platform === "win32") {
			const appData = process.env.APPDATA;
			if (!appData) return null;
			return path.join(appData, "Stripe", "telemetry_id");
		}
		const xdg = process.env.XDG_CONFIG_HOME;
		if (xdg) return path.join(xdg, "stripe", "telemetry_id");
		const home = os.homedir();
		if (!home) return null;
		return path.join(home, ".config", "stripe", "telemetry_id");
	}
	secureCompare(a, b) {
		if (!a || !b) throw new Error("secureCompare must receive two arguments");
		if (a.length !== b.length) return false;
		if (crypto$1.timingSafeEqual) {
			const textEncoder = new TextEncoder();
			const aEncoded = textEncoder.encode(a);
			const bEncoded = textEncoder.encode(b);
			return crypto$1.timingSafeEqual(aEncoded, bEncoded);
		}
		return super.secureCompare(a, b);
	}
	createEmitter() {
		return new EventEmitter();
	}
	tryBufferData(data) {
		if (!(data.file.data instanceof EventEmitter)) return Promise.resolve(data);
		const bufferArray = [];
		return new Promise((resolve, reject) => {
			data.file.data.on("data", (line) => {
				bufferArray.push(line);
			}).once("end", () => {
				const bufferData = Object.assign({}, data);
				bufferData.file.data = concat(bufferArray);
				resolve(bufferData);
			}).on("error", (err) => {
				reject(new StreamProcessingError({
					message: "An error occurred while attempting to process the file for upload.",
					detail: err
				}));
			});
		});
	}
	createNodeHttpClient(agent) {
		return new NodeHttpClient(agent);
	}
	createDefaultHttpClient() {
		return new NodeHttpClient();
	}
	createNodeCryptoProvider() {
		return new NodeCryptoProvider();
	}
	createDefaultCryptoProvider() {
		return this.createNodeCryptoProvider();
	}
};
function createWebhooks(platformFunctions) {
	const Webhook = {
		DEFAULT_TOLERANCE: 300,
		signature: null,
		constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
			try {
				if (!this.signature) throw new Error("ERR: missing signature helper, unable to verify");
				cryptoProvider = cryptoProvider || getCryptoProvider();
				this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
			} catch (e) {
				if (e instanceof CryptoProviderOnlySupportsAsyncError) e.message += "\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`";
				throw e;
			}
			const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
			if (jsonPayload && jsonPayload.object === "v2.core.event") throw new Error("You passed an event notification to stripe.webhooks.constructEvent, which expects a webhook payload. Use stripe.parseEventNotification instead.");
			return jsonPayload;
		},
		async constructEventAsync(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
			if (!this.signature) throw new Error("ERR: missing signature helper, unable to verify");
			cryptoProvider = cryptoProvider || getCryptoProvider();
			await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
			const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
			if (jsonPayload && jsonPayload.object === "v2.core.event") throw new Error("You passed an event notification to stripe.webhooks.constructEvent, which expects a webhook payload. Use stripe.parseEventNotificationAsync instead.");
			return jsonPayload;
		},
		generateTestHeaderString: function(opts) {
			const preparedOpts = prepareOptions(opts);
			const signature = preparedOpts.signature || preparedOpts.cryptoProvider.computeHMACSignature(preparedOpts.payloadString, preparedOpts.secret);
			return preparedOpts.generateHeaderString(signature);
		},
		generateTestHeaderStringAsync: async function(opts) {
			const preparedOpts = prepareOptions(opts);
			const signature = preparedOpts.signature || await preparedOpts.cryptoProvider.computeHMACSignatureAsync(preparedOpts.payloadString, preparedOpts.secret);
			return preparedOpts.generateHeaderString(signature);
		}
	};
	const signature = {
		EXPECTED_SCHEME: "v1",
		verifyHeader(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
			const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
			const secretContainsWhitespace = /\s/.test(secret);
			cryptoProvider = cryptoProvider || getCryptoProvider();
			validateComputedSignature(payload, header, details, cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret), tolerance || 0, suspectPayloadType, secretContainsWhitespace, receivedAt);
			return true;
		},
		async verifyHeaderAsync(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
			const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
			const secretContainsWhitespace = /\s/.test(secret);
			cryptoProvider = cryptoProvider || getCryptoProvider();
			return validateComputedSignature(payload, header, details, await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret), tolerance || 0, suspectPayloadType, secretContainsWhitespace, receivedAt);
		}
	};
	function makeHMACContent(payload, details) {
		return `${details.timestamp}.${payload}`;
	}
	function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
		if (Array.isArray(encodedHeader)) throw new Error("Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.");
		if (!encodedPayload) throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, { message: "No webhook payload was provided." });
		const suspectPayloadType = typeof encodedPayload != "string" && !(encodedPayload instanceof Uint8Array);
		const textDecoder = new TextDecoder("utf8");
		const decodedPayload = encodedPayload instanceof Uint8Array ? textDecoder.decode(encodedPayload) : encodedPayload;
		if (encodedHeader == null || encodedHeader == "") throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, { message: "No stripe-signature header value was provided." });
		const decodedHeader = encodedHeader instanceof Uint8Array ? textDecoder.decode(encodedHeader) : encodedHeader;
		const details = parseHeader(decodedHeader, expectedScheme);
		if (!details || details.timestamp === -1) throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, { message: "Unable to extract timestamp and signatures from header" });
		if (!details.signatures.length) throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, { message: "No signatures found with expected scheme" });
		return {
			decodedPayload,
			decodedHeader,
			details,
			suspectPayloadType
		};
	}
	function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt) {
		const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
		const whitespaceMessage = secretContainsWhitespace ? "\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value" : "";
		if (!signatureFound) {
			if (suspectPayloadType) throw new StripeSignatureVerificationError(header, payload, { message: "Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. \nSignature verification is impossible without access to the original signed material. \n\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature\n" + whitespaceMessage });
			throw new StripeSignatureVerificationError(header, payload, { message: "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? \n If a webhook request is being forwarded by a third-party tool, ensure that the exact request body, including JSON formatting and new line style, is preserved.\n\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature\n" + whitespaceMessage });
		}
		const timestampAge = Math.floor((typeof receivedAt === "number" ? receivedAt : Date.now()) / 1e3) - details.timestamp;
		if (tolerance > 0 && timestampAge > tolerance) throw new StripeSignatureVerificationError(header, payload, { message: "Timestamp outside the tolerance zone" });
		return true;
	}
	function parseHeader(header, scheme) {
		if (typeof header !== "string") return null;
		scheme = scheme || signature.EXPECTED_SCHEME;
		return header.split(",").reduce((accum, item) => {
			const kv = item.split("=");
			if (kv[0] === "t") accum.timestamp = parseInt(kv[1], 10);
			if (kv[0] === scheme) accum.signatures.push(kv[1]);
			return accum;
		}, {
			timestamp: -1,
			signatures: []
		});
	}
	let webhooksCryptoProviderInstance = null;
	function getCryptoProvider() {
		if (!webhooksCryptoProviderInstance) webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
		return webhooksCryptoProviderInstance;
	}
	function prepareOptions(opts) {
		if (!opts) throw new StripeError({ message: "Options are required" });
		const timestamp = opts.timestamp && Math.floor(opts.timestamp) || Math.floor(Date.now() / 1e3);
		const scheme = opts.scheme || signature.EXPECTED_SCHEME;
		const cryptoProvider = opts.cryptoProvider || getCryptoProvider();
		const payloadString = `${timestamp}.${opts.payload}`;
		const generateHeaderString = (signature) => {
			return `t=${timestamp},${scheme}=${signature}`;
		};
		return {
			...opts,
			timestamp,
			scheme,
			cryptoProvider,
			payloadString,
			generateHeaderString
		};
	}
	Webhook.signature = signature;
	return Webhook;
}
const ApiVersion = "2026-07-29.dahlia";
function ResourceNamespace(stripe, resources) {
	for (const name in resources) {
		if (!Object.prototype.hasOwnProperty.call(resources, name)) continue;
		const camelCaseName = name[0].toLowerCase() + name.substring(1);
		const resource = new resources[name](stripe);
		this[camelCaseName] = resource;
	}
}
function resourceNamespace(namespace, resources) {
	return function(stripe) {
		return new ResourceNamespace(stripe, resources);
	};
}
var AccountLinkResource$1 = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v2/core/account_links", params, options);
	}
};
var AccountTokenResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v2/core/account_tokens", params, options, { requestSchema: {
			kind: "object",
			fields: { identity: {
				kind: "object",
				fields: { individual: {
					kind: "object",
					fields: { relationship: {
						kind: "object",
						fields: { percent_ownership: { kind: "decimal_string" } }
					} }
				} }
			} }
		} });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v2/core/account_tokens/${encodeURIComponent(id)}`, params, options);
	}
};
var AccountResource$2 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/financial_connections/accounts", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/financial_connections/accounts/${encodeURIComponent(id)}`, params, options);
	}
	disconnect(id, params, options) {
		return this._makeRequest("POST", `/v1/financial_connections/accounts/${encodeURIComponent(id)}/disconnect`, params, options);
	}
	refresh(id, params, options) {
		return this._makeRequest("POST", `/v1/financial_connections/accounts/${encodeURIComponent(id)}/refresh`, params, options);
	}
	subscribe(id, params, options) {
		return this._makeRequest("POST", `/v1/financial_connections/accounts/${encodeURIComponent(id)}/subscribe`, params, options);
	}
	unsubscribe(id, params, options) {
		return this._makeRequest("POST", `/v1/financial_connections/accounts/${encodeURIComponent(id)}/unsubscribe`, params, options);
	}
	listOwners(id, params, options) {
		return this._makeRequest("GET", `/v1/financial_connections/accounts/${encodeURIComponent(id)}/owners`, params, options, { methodType: "list" });
	}
};
var PersonResource = class extends StripeResource {
	list(accountId, params, options) {
		return this._makeRequest("GET", `/v2/core/accounts/${encodeURIComponent(accountId)}/persons`, params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { relationship: {
							kind: "object",
							fields: { percent_ownership: { kind: "decimal_string" } }
						} }
					}
				} }
			}
		});
	}
	create(accountId, params, options) {
		return this._makeRequest("POST", `/v2/core/accounts/${encodeURIComponent(accountId)}/persons`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { relationship: {
					kind: "object",
					fields: { percent_ownership: { kind: "decimal_string" } }
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { relationship: {
					kind: "object",
					fields: { percent_ownership: { kind: "decimal_string" } }
				} }
			}
		});
	}
	del(accountId, id, params, options) {
		return this._makeRequest("DELETE", `/v2/core/accounts/${encodeURIComponent(accountId)}/persons/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(accountId, id, params, options) {
		return this._makeRequest("GET", `/v2/core/accounts/${encodeURIComponent(accountId)}/persons/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { relationship: {
				kind: "object",
				fields: { percent_ownership: { kind: "decimal_string" } }
			} }
		} });
	}
	update(accountId, id, params, options) {
		return this._makeRequest("POST", `/v2/core/accounts/${encodeURIComponent(accountId)}/persons/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { relationship: {
					kind: "object",
					fields: { percent_ownership: { kind: "decimal_string" } }
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { relationship: {
					kind: "object",
					fields: { percent_ownership: { kind: "decimal_string" } }
				} }
			}
		});
	}
};
var PersonTokenResource = class extends StripeResource {
	create(accountId, params, options) {
		return this._makeRequest("POST", `/v2/core/accounts/${encodeURIComponent(accountId)}/person_tokens`, params, options, { requestSchema: {
			kind: "object",
			fields: { relationship: {
				kind: "object",
				fields: { percent_ownership: { kind: "decimal_string" } }
			} }
		} });
	}
	retrieve(accountId, id, params, options) {
		return this._makeRequest("GET", `/v2/core/accounts/${encodeURIComponent(accountId)}/person_tokens/${encodeURIComponent(id)}`, params, options);
	}
};
var AccountResource$1 = class extends StripeResource {
	constructor(stripe) {
		super(stripe);
		this.stripe = stripe;
		this.persons = new PersonResource(stripe);
		this.personTokens = new PersonTokenResource(stripe);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v2/core/accounts", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { identity: {
							kind: "object",
							fields: { individual: {
								kind: "object",
								fields: { relationship: {
									kind: "object",
									fields: { percent_ownership: { kind: "decimal_string" } }
								} }
							} }
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v2/core/accounts", params, options, {
			requestSchema: {
				kind: "object",
				fields: { identity: {
					kind: "object",
					fields: { individual: {
						kind: "object",
						fields: { relationship: {
							kind: "object",
							fields: { percent_ownership: { kind: "decimal_string" } }
						} }
					} }
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { identity: {
					kind: "object",
					fields: { individual: {
						kind: "object",
						fields: { relationship: {
							kind: "object",
							fields: { percent_ownership: { kind: "decimal_string" } }
						} }
					} }
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v2/core/accounts/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { identity: {
				kind: "object",
				fields: { individual: {
					kind: "object",
					fields: { relationship: {
						kind: "object",
						fields: { percent_ownership: { kind: "decimal_string" } }
					} }
				} }
			} }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v2/core/accounts/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { identity: {
					kind: "object",
					fields: { individual: {
						kind: "object",
						fields: { relationship: {
							kind: "object",
							fields: { percent_ownership: { kind: "decimal_string" } }
						} }
					} }
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { identity: {
					kind: "object",
					fields: { individual: {
						kind: "object",
						fields: { relationship: {
							kind: "object",
							fields: { percent_ownership: { kind: "decimal_string" } }
						} }
					} }
				} }
			}
		});
	}
	close(id, params, options) {
		return this._makeRequest("POST", `/v2/core/accounts/${encodeURIComponent(id)}/close`, params, options, { responseSchema: {
			kind: "object",
			fields: { identity: {
				kind: "object",
				fields: { individual: {
					kind: "object",
					fields: { relationship: {
						kind: "object",
						fields: { percent_ownership: { kind: "decimal_string" } }
					} }
				} }
			} }
		} });
	}
};
var ActiveEntitlementResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/entitlements/active_entitlements", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/entitlements/active_entitlements/${encodeURIComponent(id)}`, params, options);
	}
};
var AlertResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/billing/alerts", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/billing/alerts", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/billing/alerts/${encodeURIComponent(id)}`, params, options);
	}
	activate(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/alerts/${encodeURIComponent(id)}/activate`, params, options);
	}
	archive(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/alerts/${encodeURIComponent(id)}/archive`, params, options);
	}
	deactivate(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/alerts/${encodeURIComponent(id)}/deactivate`, params, options);
	}
};
var AssociationResource = class extends StripeResource {
	find(params, options) {
		return this._makeRequest("GET", "/v1/tax/associations/find", params, options);
	}
};
var AuthorizationResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/authorizations", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							fleet: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { reported_breakdown: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												non_fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												tax: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															local_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															national_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										}
									} }
								}
							},
							fuel: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										quantity_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_cost_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							transactions: {
								kind: "array",
								element: {
									kind: "object",
									fields: { purchase_details: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												fleet: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { reported_breakdown: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	fuel: {
																		kind: "nullable",
																		inner: {
																			kind: "object",
																			fields: { gross_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			} }
																		}
																	},
																	non_fuel: {
																		kind: "nullable",
																		inner: {
																			kind: "object",
																			fields: { gross_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			} }
																		}
																	},
																	tax: {
																		kind: "nullable",
																		inner: {
																			kind: "object",
																			fields: {
																				local_amount_decimal: {
																					kind: "nullable",
																					inner: { kind: "decimal_string" }
																				},
																				national_amount_decimal: {
																					kind: "nullable",
																					inner: { kind: "decimal_string" }
																				}
																			}
																		}
																	}
																}
															}
														} }
													}
												},
												fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															quantity_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_cost_decimal: { kind: "decimal_string" }
														}
													}
												}
											}
										}
									} }
								}
							}
						}
					}
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/authorizations/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/authorizations/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
	approve(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/authorizations/${encodeURIComponent(id)}/approve`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
	decline(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/authorizations/${encodeURIComponent(id)}/decline`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
};
var AuthorizationResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/test_helpers/issuing/authorizations", params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					fleet: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "object",
							fields: {
								fuel: {
									kind: "object",
									fields: { gross_amount_decimal: { kind: "decimal_string" } }
								},
								non_fuel: {
									kind: "object",
									fields: { gross_amount_decimal: { kind: "decimal_string" } }
								},
								tax: {
									kind: "object",
									fields: {
										local_amount_decimal: { kind: "decimal_string" },
										national_amount_decimal: { kind: "decimal_string" }
									}
								}
							}
						} }
					},
					fuel: {
						kind: "object",
						fields: {
							quantity_decimal: { kind: "decimal_string" },
							unit_cost_decimal: { kind: "decimal_string" }
						}
					}
				}
			},
			responseSchema: {
				kind: "object",
				fields: {
					fleet: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { reported_breakdown: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { gross_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										non_fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { gross_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										tax: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													local_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													national_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										}
									}
								}
							} }
						}
					},
					fuel: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: {
								quantity_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								},
								unit_cost_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					},
					transactions: {
						kind: "array",
						element: {
							kind: "object",
							fields: { purchase_details: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										fleet: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { reported_breakdown: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															non_fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															tax: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: {
																		local_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		national_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															}
														}
													}
												} }
											}
										},
										fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													quantity_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_cost_decimal: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							} }
						}
					}
				}
			}
		});
	}
	capture(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/authorizations/${encodeURIComponent(id)}/capture`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { purchase_details: {
					kind: "object",
					fields: {
						fleet: {
							kind: "object",
							fields: { reported_breakdown: {
								kind: "object",
								fields: {
									fuel: {
										kind: "object",
										fields: { gross_amount_decimal: { kind: "decimal_string" } }
									},
									non_fuel: {
										kind: "object",
										fields: { gross_amount_decimal: { kind: "decimal_string" } }
									},
									tax: {
										kind: "object",
										fields: {
											local_amount_decimal: { kind: "decimal_string" },
											national_amount_decimal: { kind: "decimal_string" }
										}
									}
								}
							} }
						},
						fuel: {
							kind: "object",
							fields: {
								quantity_decimal: { kind: "decimal_string" },
								unit_cost_decimal: { kind: "decimal_string" }
							}
						},
						receipt: {
							kind: "array",
							element: {
								kind: "object",
								fields: { quantity: { kind: "decimal_string" } }
							}
						}
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: {
					fleet: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { reported_breakdown: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { gross_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										non_fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { gross_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										tax: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													local_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													national_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										}
									}
								}
							} }
						}
					},
					fuel: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: {
								quantity_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								},
								unit_cost_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					},
					transactions: {
						kind: "array",
						element: {
							kind: "object",
							fields: { purchase_details: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										fleet: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { reported_breakdown: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															non_fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															tax: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: {
																		local_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		national_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															}
														}
													}
												} }
											}
										},
										fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													quantity_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_cost_decimal: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							} }
						}
					}
				}
			}
		});
	}
	expire(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/authorizations/${encodeURIComponent(id)}/expire`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
	finalizeAmount(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/authorizations/${encodeURIComponent(id)}/finalize_amount`, params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					fleet: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "object",
							fields: {
								fuel: {
									kind: "object",
									fields: { gross_amount_decimal: { kind: "decimal_string" } }
								},
								non_fuel: {
									kind: "object",
									fields: { gross_amount_decimal: { kind: "decimal_string" } }
								},
								tax: {
									kind: "object",
									fields: {
										local_amount_decimal: { kind: "decimal_string" },
										national_amount_decimal: { kind: "decimal_string" }
									}
								}
							}
						} }
					},
					fuel: {
						kind: "object",
						fields: {
							quantity_decimal: { kind: "decimal_string" },
							unit_cost_decimal: { kind: "decimal_string" }
						}
					}
				}
			},
			responseSchema: {
				kind: "object",
				fields: {
					fleet: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { reported_breakdown: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { gross_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										non_fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { gross_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										tax: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													local_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													national_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										}
									}
								}
							} }
						}
					},
					fuel: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: {
								quantity_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								},
								unit_cost_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					},
					transactions: {
						kind: "array",
						element: {
							kind: "object",
							fields: { purchase_details: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										fleet: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { reported_breakdown: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															non_fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															tax: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: {
																		local_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		national_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															}
														}
													}
												} }
											}
										},
										fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													quantity_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_cost_decimal: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							} }
						}
					}
				}
			}
		});
	}
	respond(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/authorizations/${encodeURIComponent(id)}/fraud_challenges/respond`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
	increment(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/authorizations/${encodeURIComponent(id)}/increment`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
	reverse(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/authorizations/${encodeURIComponent(id)}/reverse`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				fleet: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { reported_breakdown: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									non_fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { gross_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											} }
										}
									},
									tax: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												local_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												national_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							}
						} }
					}
				},
				fuel: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_cost_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				transactions: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				}
			}
		} });
	}
};
var CalculationResource = class extends StripeResource {
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/tax/calculations/${encodeURIComponent(id)}`, params, options);
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/tax/calculations", params, options);
	}
	listLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/tax/calculations/${encodeURIComponent(id)}/line_items`, params, options, { methodType: "list" });
	}
};
var CardholderResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/cardholders", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/issuing/cardholders", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/cardholders/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/cardholders/${encodeURIComponent(id)}`, params, options);
	}
};
var CardResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/cards", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/issuing/cards", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/cards/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/cards/${encodeURIComponent(id)}`, params, options);
	}
};
var CardResource = class extends StripeResource {
	deliverCard(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/cards/${encodeURIComponent(id)}/shipping/deliver`, params, options);
	}
	failCard(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/cards/${encodeURIComponent(id)}/shipping/fail`, params, options);
	}
	returnCard(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/cards/${encodeURIComponent(id)}/shipping/return`, params, options);
	}
	shipCard(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/cards/${encodeURIComponent(id)}/shipping/ship`, params, options);
	}
	submitCard(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/cards/${encodeURIComponent(id)}/shipping/submit`, params, options);
	}
};
var ConfigurationResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/billing_portal/configurations", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/billing_portal/configurations", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/billing_portal/configurations/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/billing_portal/configurations/${encodeURIComponent(id)}`, params, options);
	}
};
var ConfigurationResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/terminal/configurations/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/terminal/configurations/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/configurations/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/terminal/configurations", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/terminal/configurations", params, options);
	}
};
var ConfirmationTokenResource$1 = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/test_helpers/confirmation_tokens", params, options);
	}
};
var ConnectionTokenResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/terminal/connection_tokens", params, options);
	}
};
var CreditBalanceSummaryResource = class extends StripeResource {
	retrieve(params, options) {
		return this._makeRequest("GET", "/v1/billing/credit_balance_summary", params, options);
	}
};
var CreditBalanceTransactionResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/billing/credit_balance_transactions", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/billing/credit_balance_transactions/${encodeURIComponent(id)}`, params, options);
	}
};
var CreditGrantResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/billing/credit_grants", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/billing/credit_grants", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/billing/credit_grants/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/credit_grants/${encodeURIComponent(id)}`, params, options);
	}
	expire(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/credit_grants/${encodeURIComponent(id)}/expire`, params, options);
	}
	voidGrant(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/credit_grants/${encodeURIComponent(id)}/void`, params, options);
	}
};
var CreditReversalResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/credit_reversals", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/treasury/credit_reversals", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/credit_reversals/${encodeURIComponent(id)}`, params, options);
	}
};
var CustomerResource$1 = class extends StripeResource {
	fundCashBalance(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/customers/${encodeURIComponent(id)}/fund_cash_balance`, params, options);
	}
};
var DebitReversalResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/debit_reversals", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/treasury/debit_reversals", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/debit_reversals/${encodeURIComponent(id)}`, params, options);
	}
};
var DisputeResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/disputes", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/issuing/disputes", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/disputes/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/disputes/${encodeURIComponent(id)}`, params, options);
	}
	submit(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/disputes/${encodeURIComponent(id)}/submit`, params, options);
	}
};
var EarlyFraudWarningResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/radar/early_fraud_warnings", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/radar/early_fraud_warnings/${encodeURIComponent(id)}`, params, options);
	}
};
var EventDestinationResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v2/core/event_destinations", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v2/core/event_destinations", params, options);
	}
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v2/core/event_destinations/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v2/core/event_destinations/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v2/core/event_destinations/${encodeURIComponent(id)}`, params, options);
	}
	disable(id, params, options) {
		return this._makeRequest("POST", `/v2/core/event_destinations/${encodeURIComponent(id)}/disable`, params, options);
	}
	enable(id, params, options) {
		return this._makeRequest("POST", `/v2/core/event_destinations/${encodeURIComponent(id)}/enable`, params, options);
	}
	ping(id, params, options) {
		return this._makeRequest("POST", `/v2/core/event_destinations/${encodeURIComponent(id)}/ping`, params, options);
	}
};
var EventResource$1 = class extends StripeResource {
	list(params, options) {
		const transformResponseData = (response) => {
			return {
				...response,
				data: response.data.map(this.addFetchRelatedObjectIfNeeded.bind(this))
			};
		};
		return this._makeRequest("GET", "/v2/core/events", params, options, {
			methodType: "list",
			transformResponseData
		});
	}
	retrieve(id, params, options) {
		const transformResponseData = (response) => {
			return this.addFetchRelatedObjectIfNeeded(response);
		};
		return this._makeRequest("GET", `/v2/core/events/${encodeURIComponent(id)}`, params, options, { transformResponseData });
	}
	addFetchRelatedObjectIfNeeded(pulledEvent) {
		if (!pulledEvent.related_object || !pulledEvent.related_object.url) return pulledEvent;
		return {
			...pulledEvent,
			fetchRelatedObject: () => this._makeRequest("GET", pulledEvent.related_object.url, void 0, {
				stripeContext: pulledEvent.context,
				headers: { "Stripe-Request-Trigger": `event=${pulledEvent.id}` }
			})
		};
	}
};
var FeatureResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/entitlements/features", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/entitlements/features", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/entitlements/features/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/entitlements/features/${encodeURIComponent(id)}`, params, options);
	}
};
var FinancialAccountResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/financial_accounts", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/treasury/financial_accounts", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/financial_accounts/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/treasury/financial_accounts/${encodeURIComponent(id)}`, params, options);
	}
	close(id, params, options) {
		return this._makeRequest("POST", `/v1/treasury/financial_accounts/${encodeURIComponent(id)}/close`, params, options);
	}
	updateFeatures(id, params, options) {
		return this._makeRequest("POST", `/v1/treasury/financial_accounts/${encodeURIComponent(id)}/features`, params, options);
	}
	retrieveFeatures(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/financial_accounts/${encodeURIComponent(id)}/features`, params, options);
	}
};
var ImportResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v2/commerce/product_catalog/imports", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { status_details: {
							kind: "object",
							fields: {
								processing: {
									kind: "object",
									fields: {
										error_count: { kind: "int64_string" },
										success_count: { kind: "int64_string" }
									}
								},
								succeeded: {
									kind: "object",
									fields: { success_count: { kind: "int64_string" } }
								},
								succeeded_with_errors: {
									kind: "object",
									fields: {
										error_count: { kind: "int64_string" },
										error_file: {
											kind: "object",
											fields: { size: { kind: "int64_string" } }
										},
										samples: {
											kind: "array",
											element: {
												kind: "object",
												fields: { row: { kind: "int64_string" } }
											}
										},
										success_count: { kind: "int64_string" }
									}
								}
							}
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v2/commerce/product_catalog/imports", params, options, { responseSchema: {
			kind: "object",
			fields: { status_details: {
				kind: "object",
				fields: {
					processing: {
						kind: "object",
						fields: {
							error_count: { kind: "int64_string" },
							success_count: { kind: "int64_string" }
						}
					},
					succeeded: {
						kind: "object",
						fields: { success_count: { kind: "int64_string" } }
					},
					succeeded_with_errors: {
						kind: "object",
						fields: {
							error_count: { kind: "int64_string" },
							error_file: {
								kind: "object",
								fields: { size: { kind: "int64_string" } }
							},
							samples: {
								kind: "array",
								element: {
									kind: "object",
									fields: { row: { kind: "int64_string" } }
								}
							},
							success_count: { kind: "int64_string" }
						}
					}
				}
			} }
		} });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v2/commerce/product_catalog/imports/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { status_details: {
				kind: "object",
				fields: {
					processing: {
						kind: "object",
						fields: {
							error_count: { kind: "int64_string" },
							success_count: { kind: "int64_string" }
						}
					},
					succeeded: {
						kind: "object",
						fields: { success_count: { kind: "int64_string" } }
					},
					succeeded_with_errors: {
						kind: "object",
						fields: {
							error_count: { kind: "int64_string" },
							error_file: {
								kind: "object",
								fields: { size: { kind: "int64_string" } }
							},
							samples: {
								kind: "array",
								element: {
									kind: "object",
									fields: { row: { kind: "int64_string" } }
								}
							},
							success_count: { kind: "int64_string" }
						}
					}
				}
			} }
		} });
	}
};
var InboundTransferResource$1 = class extends StripeResource {
	fail(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/inbound_transfers/${encodeURIComponent(id)}/fail`, params, options);
	}
	returnInboundTransfer(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/inbound_transfers/${encodeURIComponent(id)}/return`, params, options);
	}
	succeed(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/inbound_transfers/${encodeURIComponent(id)}/succeed`, params, options);
	}
};
var InboundTransferResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/inbound_transfers", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/treasury/inbound_transfers", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/inbound_transfers/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/treasury/inbound_transfers/${encodeURIComponent(id)}/cancel`, params, options);
	}
};
var LocationResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/terminal/locations/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/terminal/locations/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/locations/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/terminal/locations", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/terminal/locations", params, options);
	}
};
var MeterEventAdjustmentResource$1 = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/billing/meter_event_adjustments", params, options);
	}
};
var MeterEventAdjustmentResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v2/billing/meter_event_adjustments", params, options);
	}
};
var MeterEventSessionResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v2/billing/meter_event_session", params, options);
	}
};
var MeterEventStreamResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v2/billing/meter_event_stream", params, options, { apiBase: "meter_events" });
	}
};
var MeterEventResource$1 = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/billing/meter_events", params, options);
	}
};
var MeterEventResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v2/billing/meter_events", params, options);
	}
};
var MeterResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/billing/meters", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/billing/meters", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/billing/meters/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/meters/${encodeURIComponent(id)}`, params, options);
	}
	deactivate(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/meters/${encodeURIComponent(id)}/deactivate`, params, options);
	}
	reactivate(id, params, options) {
		return this._makeRequest("POST", `/v1/billing/meters/${encodeURIComponent(id)}/reactivate`, params, options);
	}
	listEventSummaries(id, params, options) {
		return this._makeRequest("GET", `/v1/billing/meters/${encodeURIComponent(id)}/event_summaries`, params, options, { methodType: "list" });
	}
};
var OnboardingLinkResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/terminal/onboarding_links", params, options);
	}
};
var OrderResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/climate/orders", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { metric_tons: { kind: "decimal_string" } }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/climate/orders", params, options, {
			requestSchema: {
				kind: "object",
				fields: { metric_tons: { kind: "decimal_string" } }
			},
			responseSchema: {
				kind: "object",
				fields: { metric_tons: { kind: "decimal_string" } }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/climate/orders/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { metric_tons: { kind: "decimal_string" } }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/climate/orders/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { metric_tons: { kind: "decimal_string" } }
		} });
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/climate/orders/${encodeURIComponent(id)}/cancel`, params, options, { responseSchema: {
			kind: "object",
			fields: { metric_tons: { kind: "decimal_string" } }
		} });
	}
};
var OutboundPaymentResource$1 = class extends StripeResource {
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_payments/${encodeURIComponent(id)}`, params, options);
	}
	fail(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_payments/${encodeURIComponent(id)}/fail`, params, options);
	}
	post(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_payments/${encodeURIComponent(id)}/post`, params, options);
	}
	returnOutboundPayment(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_payments/${encodeURIComponent(id)}/return`, params, options);
	}
};
var OutboundPaymentResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/outbound_payments", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/treasury/outbound_payments", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/outbound_payments/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/treasury/outbound_payments/${encodeURIComponent(id)}/cancel`, params, options);
	}
};
var OutboundTransferResource$1 = class extends StripeResource {
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_transfers/${encodeURIComponent(id)}`, params, options);
	}
	fail(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_transfers/${encodeURIComponent(id)}/fail`, params, options);
	}
	post(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_transfers/${encodeURIComponent(id)}/post`, params, options);
	}
	returnOutboundTransfer(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/treasury/outbound_transfers/${encodeURIComponent(id)}/return`, params, options);
	}
};
var OutboundTransferResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/outbound_transfers", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/treasury/outbound_transfers", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/outbound_transfers/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/treasury/outbound_transfers/${encodeURIComponent(id)}/cancel`, params, options);
	}
};
var PaymentEvaluationResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/radar/payment_evaluations", params, options);
	}
};
var PersonalizationDesignResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/personalization_designs", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/issuing/personalization_designs", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/personalization_designs/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/personalization_designs/${encodeURIComponent(id)}`, params, options);
	}
};
var PersonalizationDesignResource = class extends StripeResource {
	activate(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/personalization_designs/${encodeURIComponent(id)}/activate`, params, options);
	}
	deactivate(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/personalization_designs/${encodeURIComponent(id)}/deactivate`, params, options);
	}
	reject(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/personalization_designs/${encodeURIComponent(id)}/reject`, params, options);
	}
};
var PhysicalBundleResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/physical_bundles", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/physical_bundles/${encodeURIComponent(id)}`, params, options);
	}
};
var ProductResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/climate/products", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { metric_tons_available: { kind: "decimal_string" } }
					}
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/climate/products/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { metric_tons_available: { kind: "decimal_string" } }
		} });
	}
};
var ReaderResource$1 = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/terminal/readers/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/terminal/readers/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/terminal/readers", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/terminal/readers", params, options);
	}
	cancelAction(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/cancel_action`, params, options);
	}
	collectInputs(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/collect_inputs`, params, options);
	}
	collectPaymentMethod(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/collect_payment_method`, params, options);
	}
	confirmPaymentIntent(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/confirm_payment_intent`, params, options);
	}
	processPaymentIntent(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/process_payment_intent`, params, options);
	}
	processSetupIntent(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/process_setup_intent`, params, options);
	}
	refundPayment(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/refund_payment`, params, options);
	}
	setReaderDisplay(id, params, options) {
		return this._makeRequest("POST", `/v1/terminal/readers/${encodeURIComponent(id)}/set_reader_display`, params, options);
	}
};
var ReaderResource = class extends StripeResource {
	presentPaymentMethod(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/terminal/readers/${encodeURIComponent(id)}/present_payment_method`, params, options);
	}
	succeedInputCollection(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/terminal/readers/${encodeURIComponent(id)}/succeed_input_collection`, params, options);
	}
	timeoutInputCollection(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/terminal/readers/${encodeURIComponent(id)}/timeout_input_collection`, params, options);
	}
};
var ReceivedCreditResource$1 = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/test_helpers/treasury/received_credits", params, options);
	}
};
var ReceivedCreditResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/received_credits", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/received_credits/${encodeURIComponent(id)}`, params, options);
	}
};
var ReceivedDebitResource$1 = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/test_helpers/treasury/received_debits", params, options);
	}
};
var ReceivedDebitResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/received_debits", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/received_debits/${encodeURIComponent(id)}`, params, options);
	}
};
var RefundResource$1 = class extends StripeResource {
	expire(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/refunds/${encodeURIComponent(id)}/expire`, params, options);
	}
};
var RegistrationResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/tax/registrations", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/tax/registrations", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/tax/registrations/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/tax/registrations/${encodeURIComponent(id)}`, params, options);
	}
};
var ReportRunResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/reporting/report_runs", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/reporting/report_runs", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/reporting/report_runs/${encodeURIComponent(id)}`, params, options);
	}
};
var ReportTypeResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/reporting/report_types", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/reporting/report_types/${encodeURIComponent(id)}`, params, options);
	}
};
var RequestResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/forwarding/requests", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/forwarding/requests", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/forwarding/requests/${encodeURIComponent(id)}`, params, options);
	}
};
var ScheduledQueryRunResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/sigma/scheduled_query_runs", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/sigma/scheduled_query_runs/${encodeURIComponent(id)}`, params, options);
	}
};
var SecretResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/apps/secrets", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/apps/secrets", params, options);
	}
	find(params, options) {
		return this._makeRequest("GET", "/v1/apps/secrets/find", params, options);
	}
	deleteWhere(params, options) {
		return this._makeRequest("POST", "/v1/apps/secrets/delete", params, options);
	}
};
var SessionResource$2 = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/billing_portal/sessions", params, options);
	}
};
var SessionResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/checkout/sessions", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							currency_conversion: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { fx_rate: { kind: "decimal_string" } }
								}
							},
							line_items: {
								kind: "object",
								fields: { data: {
									kind: "array",
									element: {
										kind: "object",
										fields: { price: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													currency_options: {
														kind: "array",
														element: {
															kind: "object",
															fields: {
																tiers: {
																	kind: "array",
																	element: {
																		kind: "object",
																		fields: {
																			flat_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			},
																			unit_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			}
																		}
																	}
																},
																unit_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																}
															}
														}
													},
													tiers: {
														kind: "array",
														element: {
															kind: "object",
															fields: {
																flat_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																},
																unit_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																}
															}
														}
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										} }
									}
								} }
							}
						}
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/checkout/sessions", params, options, {
			requestSchema: {
				kind: "object",
				fields: { line_items: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price_data: {
							kind: "object",
							fields: { unit_amount_decimal: { kind: "decimal_string" } }
						} }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: {
					currency_conversion: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { fx_rate: { kind: "decimal_string" } }
						}
					},
					line_items: {
						kind: "object",
						fields: { data: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											currency_options: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														tiers: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	flat_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											tiers: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														flat_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											unit_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											}
										}
									}
								} }
							}
						} }
					}
				}
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/checkout/sessions/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				currency_conversion: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { fx_rate: { kind: "decimal_string" } }
					}
				},
				line_items: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: { price: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										currency_options: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													tiers: {
														kind: "array",
														element: {
															kind: "object",
															fields: {
																flat_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																},
																unit_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																}
															}
														}
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							} }
						}
					} }
				}
			}
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/checkout/sessions/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { line_items: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price_data: {
							kind: "object",
							fields: { unit_amount_decimal: { kind: "decimal_string" } }
						} }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: {
					currency_conversion: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { fx_rate: { kind: "decimal_string" } }
						}
					},
					line_items: {
						kind: "object",
						fields: { data: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											currency_options: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														tiers: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	flat_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											tiers: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														flat_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											unit_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											}
										}
									}
								} }
							}
						} }
					}
				}
			}
		});
	}
	expire(id, params, options) {
		return this._makeRequest("POST", `/v1/checkout/sessions/${encodeURIComponent(id)}/expire`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				currency_conversion: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { fx_rate: { kind: "decimal_string" } }
					}
				},
				line_items: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: { price: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										currency_options: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													tiers: {
														kind: "array",
														element: {
															kind: "object",
															fields: {
																flat_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																},
																unit_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																}
															}
														}
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							} }
						}
					} }
				}
			}
		} });
	}
	listLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/checkout/sessions/${encodeURIComponent(id)}/line_items`, params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						} }
					}
				} }
			}
		});
	}
};
var SessionResource = class extends StripeResource {
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/financial_connections/sessions/${encodeURIComponent(id)}`, params, options);
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/financial_connections/sessions", params, options);
	}
};
var SettingResource = class extends StripeResource {
	retrieve(params, options) {
		return this._makeRequest("GET", "/v1/tax/settings", params, options);
	}
	update(params, options) {
		return this._makeRequest("POST", "/v1/tax/settings", params, options);
	}
};
var SupplierResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/climate/suppliers", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/climate/suppliers/${encodeURIComponent(id)}`, params, options);
	}
};
var TestClockResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/test_helpers/test_clocks/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/test_helpers/test_clocks/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/test_helpers/test_clocks", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/test_helpers/test_clocks", params, options);
	}
	advance(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/test_clocks/${encodeURIComponent(id)}/advance`, params, options);
	}
};
var TokenResource$1 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/tokens", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/tokens/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/tokens/${encodeURIComponent(id)}`, params, options);
	}
};
var TransactionEntryResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/transaction_entries", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { flow_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: { issuing_authorization: {
									kind: "object",
									fields: {
										fleet: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { reported_breakdown: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															non_fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { gross_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	} }
																}
															},
															tax: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: {
																		local_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		national_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															}
														}
													}
												} }
											}
										},
										fuel: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: {
													quantity_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_cost_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										transactions: {
											kind: "array",
											element: {
												kind: "object",
												fields: { purchase_details: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															fleet: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: { reported_breakdown: {
																		kind: "nullable",
																		inner: {
																			kind: "object",
																			fields: {
																				fuel: {
																					kind: "nullable",
																					inner: {
																						kind: "object",
																						fields: { gross_amount_decimal: {
																							kind: "nullable",
																							inner: { kind: "decimal_string" }
																						} }
																					}
																				},
																				non_fuel: {
																					kind: "nullable",
																					inner: {
																						kind: "object",
																						fields: { gross_amount_decimal: {
																							kind: "nullable",
																							inner: { kind: "decimal_string" }
																						} }
																					}
																				},
																				tax: {
																					kind: "nullable",
																					inner: {
																						kind: "object",
																						fields: {
																							local_amount_decimal: {
																								kind: "nullable",
																								inner: { kind: "decimal_string" }
																							},
																							national_amount_decimal: {
																								kind: "nullable",
																								inner: { kind: "decimal_string" }
																							}
																						}
																					}
																				}
																			}
																		}
																	} }
																}
															},
															fuel: {
																kind: "nullable",
																inner: {
																	kind: "object",
																	fields: {
																		quantity_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_cost_decimal: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												} }
											}
										}
									}
								} }
							}
						} }
					}
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/transaction_entries/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { flow_details: {
				kind: "nullable",
				inner: {
					kind: "object",
					fields: { issuing_authorization: {
						kind: "object",
						fields: {
							fleet: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { reported_breakdown: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												non_fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												tax: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															local_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															national_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										}
									} }
								}
							},
							fuel: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										quantity_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_cost_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							transactions: {
								kind: "array",
								element: {
									kind: "object",
									fields: { purchase_details: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												fleet: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { reported_breakdown: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	fuel: {
																		kind: "nullable",
																		inner: {
																			kind: "object",
																			fields: { gross_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			} }
																		}
																	},
																	non_fuel: {
																		kind: "nullable",
																		inner: {
																			kind: "object",
																			fields: { gross_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			} }
																		}
																	},
																	tax: {
																		kind: "nullable",
																		inner: {
																			kind: "object",
																			fields: {
																				local_amount_decimal: {
																					kind: "nullable",
																					inner: { kind: "decimal_string" }
																				},
																				national_amount_decimal: {
																					kind: "nullable",
																					inner: { kind: "decimal_string" }
																				}
																			}
																		}
																	}
																}
															}
														} }
													}
												},
												fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															quantity_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_cost_decimal: { kind: "decimal_string" }
														}
													}
												}
											}
										}
									} }
								}
							}
						}
					} }
				}
			} }
		} });
	}
};
var TransactionResource$4 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/financial_connections/transactions", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/financial_connections/transactions/${encodeURIComponent(id)}`, params, options);
	}
};
var TransactionResource$3 = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/issuing/transactions", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { purchase_details: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									fleet: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: { reported_breakdown: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														non_fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { gross_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																} }
															}
														},
														tax: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	local_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	national_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														}
													}
												}
											} }
										}
									},
									fuel: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												quantity_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_cost_decimal: { kind: "decimal_string" }
											}
										}
									}
								}
							}
						} }
					}
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/issuing/transactions/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { purchase_details: {
				kind: "nullable",
				inner: {
					kind: "object",
					fields: {
						fleet: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: { reported_breakdown: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											fuel: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: { gross_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													} }
												}
											},
											non_fuel: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: { gross_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													} }
												}
											},
											tax: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														local_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														national_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											}
										}
									}
								} }
							}
						},
						fuel: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									quantity_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									unit_cost_decimal: { kind: "decimal_string" }
								}
							}
						}
					}
				}
			} }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/issuing/transactions/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { purchase_details: {
				kind: "nullable",
				inner: {
					kind: "object",
					fields: {
						fleet: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: { reported_breakdown: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											fuel: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: { gross_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													} }
												}
											},
											non_fuel: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: { gross_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													} }
												}
											},
											tax: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														local_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														national_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											}
										}
									}
								} }
							}
						},
						fuel: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									quantity_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									unit_cost_decimal: { kind: "decimal_string" }
								}
							}
						}
					}
				}
			} }
		} });
	}
};
var TransactionResource$2 = class extends StripeResource {
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/tax/transactions/${encodeURIComponent(id)}`, params, options);
	}
	createFromCalculation(params, options) {
		return this._makeRequest("POST", "/v1/tax/transactions/create_from_calculation", params, options);
	}
	createReversal(params, options) {
		return this._makeRequest("POST", "/v1/tax/transactions/create_reversal", params, options);
	}
	listLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/tax/transactions/${encodeURIComponent(id)}/line_items`, params, options, { methodType: "list" });
	}
};
var TransactionResource$1 = class extends StripeResource {
	refund(id, params, options) {
		return this._makeRequest("POST", `/v1/test_helpers/issuing/transactions/${encodeURIComponent(id)}/refund`, params, options, { responseSchema: {
			kind: "object",
			fields: { purchase_details: {
				kind: "nullable",
				inner: {
					kind: "object",
					fields: {
						fleet: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: { reported_breakdown: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											fuel: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: { gross_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													} }
												}
											},
											non_fuel: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: { gross_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													} }
												}
											},
											tax: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														local_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														national_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											}
										}
									}
								} }
							}
						},
						fuel: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									quantity_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									unit_cost_decimal: { kind: "decimal_string" }
								}
							}
						}
					}
				}
			} }
		} });
	}
	createForceCapture(params, options) {
		return this._makeRequest("POST", "/v1/test_helpers/issuing/transactions/create_force_capture", params, options, {
			requestSchema: {
				kind: "object",
				fields: { purchase_details: {
					kind: "object",
					fields: {
						fleet: {
							kind: "object",
							fields: { reported_breakdown: {
								kind: "object",
								fields: {
									fuel: {
										kind: "object",
										fields: { gross_amount_decimal: { kind: "decimal_string" } }
									},
									non_fuel: {
										kind: "object",
										fields: { gross_amount_decimal: { kind: "decimal_string" } }
									},
									tax: {
										kind: "object",
										fields: {
											local_amount_decimal: { kind: "decimal_string" },
											national_amount_decimal: { kind: "decimal_string" }
										}
									}
								}
							} }
						},
						fuel: {
							kind: "object",
							fields: {
								quantity_decimal: { kind: "decimal_string" },
								unit_cost_decimal: { kind: "decimal_string" }
							}
						},
						receipt: {
							kind: "array",
							element: {
								kind: "object",
								fields: { quantity: { kind: "decimal_string" } }
							}
						}
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { purchase_details: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							fleet: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { reported_breakdown: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												non_fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												tax: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															local_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															national_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										}
									} }
								}
							},
							fuel: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										quantity_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_cost_decimal: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				} }
			}
		});
	}
	createUnlinkedRefund(params, options) {
		return this._makeRequest("POST", "/v1/test_helpers/issuing/transactions/create_unlinked_refund", params, options, {
			requestSchema: {
				kind: "object",
				fields: { purchase_details: {
					kind: "object",
					fields: {
						fleet: {
							kind: "object",
							fields: { reported_breakdown: {
								kind: "object",
								fields: {
									fuel: {
										kind: "object",
										fields: { gross_amount_decimal: { kind: "decimal_string" } }
									},
									non_fuel: {
										kind: "object",
										fields: { gross_amount_decimal: { kind: "decimal_string" } }
									},
									tax: {
										kind: "object",
										fields: {
											local_amount_decimal: { kind: "decimal_string" },
											national_amount_decimal: { kind: "decimal_string" }
										}
									}
								}
							} }
						},
						fuel: {
							kind: "object",
							fields: {
								quantity_decimal: { kind: "decimal_string" },
								unit_cost_decimal: { kind: "decimal_string" }
							}
						},
						receipt: {
							kind: "array",
							element: {
								kind: "object",
								fields: { quantity: { kind: "decimal_string" } }
							}
						}
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { purchase_details: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: {
							fleet: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { reported_breakdown: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												non_fuel: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: { gross_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														} }
													}
												},
												tax: {
													kind: "nullable",
													inner: {
														kind: "object",
														fields: {
															local_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															national_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										}
									} }
								}
							},
							fuel: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										quantity_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_cost_decimal: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				} }
			}
		});
	}
};
var TransactionResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/treasury/transactions", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { entries: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: { data: {
									kind: "array",
									element: {
										kind: "object",
										fields: { flow_details: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { issuing_authorization: {
													kind: "object",
													fields: {
														fleet: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: { reported_breakdown: {
																	kind: "nullable",
																	inner: {
																		kind: "object",
																		fields: {
																			fuel: {
																				kind: "nullable",
																				inner: {
																					kind: "object",
																					fields: { gross_amount_decimal: {
																						kind: "nullable",
																						inner: { kind: "decimal_string" }
																					} }
																				}
																			},
																			non_fuel: {
																				kind: "nullable",
																				inner: {
																					kind: "object",
																					fields: { gross_amount_decimal: {
																						kind: "nullable",
																						inner: { kind: "decimal_string" }
																					} }
																				}
																			},
																			tax: {
																				kind: "nullable",
																				inner: {
																					kind: "object",
																					fields: {
																						local_amount_decimal: {
																							kind: "nullable",
																							inner: { kind: "decimal_string" }
																						},
																						national_amount_decimal: {
																							kind: "nullable",
																							inner: { kind: "decimal_string" }
																						}
																					}
																				}
																			}
																		}
																	}
																} }
															}
														},
														fuel: {
															kind: "nullable",
															inner: {
																kind: "object",
																fields: {
																	quantity_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_cost_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														transactions: {
															kind: "array",
															element: {
																kind: "object",
																fields: { purchase_details: {
																	kind: "nullable",
																	inner: {
																		kind: "object",
																		fields: {
																			fleet: {
																				kind: "nullable",
																				inner: {
																					kind: "object",
																					fields: { reported_breakdown: {
																						kind: "nullable",
																						inner: {
																							kind: "object",
																							fields: {
																								fuel: {
																									kind: "nullable",
																									inner: {
																										kind: "object",
																										fields: { gross_amount_decimal: {
																											kind: "nullable",
																											inner: { kind: "decimal_string" }
																										} }
																									}
																								},
																								non_fuel: {
																									kind: "nullable",
																									inner: {
																										kind: "object",
																										fields: { gross_amount_decimal: {
																											kind: "nullable",
																											inner: { kind: "decimal_string" }
																										} }
																									}
																								},
																								tax: {
																									kind: "nullable",
																									inner: {
																										kind: "object",
																										fields: {
																											local_amount_decimal: {
																												kind: "nullable",
																												inner: { kind: "decimal_string" }
																											},
																											national_amount_decimal: {
																												kind: "nullable",
																												inner: { kind: "decimal_string" }
																											}
																										}
																									}
																								}
																							}
																						}
																					} }
																				}
																			},
																			fuel: {
																				kind: "nullable",
																				inner: {
																					kind: "object",
																					fields: {
																						quantity_decimal: {
																							kind: "nullable",
																							inner: { kind: "decimal_string" }
																						},
																						unit_cost_decimal: { kind: "decimal_string" }
																					}
																				}
																			}
																		}
																	}
																} }
															}
														}
													}
												} }
											}
										} }
									}
								} }
							}
						} }
					}
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/treasury/transactions/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { entries: {
				kind: "nullable",
				inner: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: { flow_details: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { issuing_authorization: {
										kind: "object",
										fields: {
											fleet: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: { reported_breakdown: {
														kind: "nullable",
														inner: {
															kind: "object",
															fields: {
																fuel: {
																	kind: "nullable",
																	inner: {
																		kind: "object",
																		fields: { gross_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		} }
																	}
																},
																non_fuel: {
																	kind: "nullable",
																	inner: {
																		kind: "object",
																		fields: { gross_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		} }
																	}
																},
																tax: {
																	kind: "nullable",
																	inner: {
																		kind: "object",
																		fields: {
																			local_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			},
																			national_amount_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			}
																		}
																	}
																}
															}
														}
													} }
												}
											},
											fuel: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														quantity_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														unit_cost_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											transactions: {
												kind: "array",
												element: {
													kind: "object",
													fields: { purchase_details: {
														kind: "nullable",
														inner: {
															kind: "object",
															fields: {
																fleet: {
																	kind: "nullable",
																	inner: {
																		kind: "object",
																		fields: { reported_breakdown: {
																			kind: "nullable",
																			inner: {
																				kind: "object",
																				fields: {
																					fuel: {
																						kind: "nullable",
																						inner: {
																							kind: "object",
																							fields: { gross_amount_decimal: {
																								kind: "nullable",
																								inner: { kind: "decimal_string" }
																							} }
																						}
																					},
																					non_fuel: {
																						kind: "nullable",
																						inner: {
																							kind: "object",
																							fields: { gross_amount_decimal: {
																								kind: "nullable",
																								inner: { kind: "decimal_string" }
																							} }
																						}
																					},
																					tax: {
																						kind: "nullable",
																						inner: {
																							kind: "object",
																							fields: {
																								local_amount_decimal: {
																									kind: "nullable",
																									inner: { kind: "decimal_string" }
																								},
																								national_amount_decimal: {
																									kind: "nullable",
																									inner: { kind: "decimal_string" }
																								}
																							}
																						}
																					}
																				}
																			}
																		} }
																	}
																},
																fuel: {
																	kind: "nullable",
																	inner: {
																		kind: "object",
																		fields: {
																			quantity_decimal: {
																				kind: "nullable",
																				inner: { kind: "decimal_string" }
																			},
																			unit_cost_decimal: { kind: "decimal_string" }
																		}
																	}
																}
															}
														}
													} }
												}
											}
										}
									} }
								}
							} }
						}
					} }
				}
			} }
		} });
	}
};
var ValueListItemResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/radar/value_list_items/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/radar/value_list_items/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/radar/value_list_items", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/radar/value_list_items", params, options);
	}
};
var ValueListResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/radar/value_lists/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/radar/value_lists/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/radar/value_lists/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/radar/value_lists", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/radar/value_lists", params, options);
	}
};
var VerificationReportResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/identity/verification_reports", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/identity/verification_reports/${encodeURIComponent(id)}`, params, options);
	}
};
var VerificationSessionResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/identity/verification_sessions", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/identity/verification_sessions", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/identity/verification_sessions/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/identity/verification_sessions/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/identity/verification_sessions/${encodeURIComponent(id)}/cancel`, params, options);
	}
	redact(id, params, options) {
		return this._makeRequest("POST", `/v1/identity/verification_sessions/${encodeURIComponent(id)}/redact`, params, options);
	}
};
var AccountResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/accounts/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		if (typeof id === "string") return this._makeRequest("GET", `/v1/accounts/${encodeURIComponent(id)}`, params, options);
		else return this._makeRequest("GET", "/v1/account", params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(id)}`, params, options);
	}
	retrieveCurrent(params, options) {
		return this._makeRequest("GET", "/v1/account", params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/accounts", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/accounts", params, options);
	}
	reject(id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(id)}/reject`, params, options);
	}
	unreject(id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(id)}/unreject`, params, options);
	}
	listCapabilities(id, params, options) {
		return this._makeRequest("GET", `/v1/accounts/${encodeURIComponent(id)}/capabilities`, params, options, { methodType: "list" });
	}
	retrieveCapability(accountId, id, params, options) {
		return this._makeRequest("GET", `/v1/accounts/${encodeURIComponent(accountId)}/capabilities/${encodeURIComponent(id)}`, params, options);
	}
	updateCapability(accountId, id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(accountId)}/capabilities/${encodeURIComponent(id)}`, params, options);
	}
	deleteExternalAccount(accountId, id, params, options) {
		return this._makeRequest("DELETE", `/v1/accounts/${encodeURIComponent(accountId)}/external_accounts/${encodeURIComponent(id)}`, params, options);
	}
	retrieveExternalAccount(accountId, id, params, options) {
		return this._makeRequest("GET", `/v1/accounts/${encodeURIComponent(accountId)}/external_accounts/${encodeURIComponent(id)}`, params, options);
	}
	updateExternalAccount(accountId, id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(accountId)}/external_accounts/${encodeURIComponent(id)}`, params, options);
	}
	listExternalAccounts(id, params, options) {
		return this._makeRequest("GET", `/v1/accounts/${encodeURIComponent(id)}/external_accounts`, params, options, { methodType: "list" });
	}
	createExternalAccount(id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(id)}/external_accounts`, params, options);
	}
	createLoginLink(id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(id)}/login_links`, params, options);
	}
	deletePerson(accountId, id, params, options) {
		return this._makeRequest("DELETE", `/v1/accounts/${encodeURIComponent(accountId)}/persons/${encodeURIComponent(id)}`, params, options);
	}
	retrievePerson(accountId, id, params, options) {
		return this._makeRequest("GET", `/v1/accounts/${encodeURIComponent(accountId)}/persons/${encodeURIComponent(id)}`, params, options);
	}
	updatePerson(accountId, id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(accountId)}/persons/${encodeURIComponent(id)}`, params, options);
	}
	listPersons(id, params, options) {
		return this._makeRequest("GET", `/v1/accounts/${encodeURIComponent(id)}/persons`, params, options, { methodType: "list" });
	}
	createPerson(id, params, options) {
		return this._makeRequest("POST", `/v1/accounts/${encodeURIComponent(id)}/persons`, params, options);
	}
};
var AccountLinkResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/account_links", params, options);
	}
};
var AccountSessionResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/account_sessions", params, options);
	}
};
var ApplePayDomainResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/apple_pay/domains/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/apple_pay/domains/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/apple_pay/domains", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/apple_pay/domains", params, options);
	}
};
var ApplicationFeeResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/application_fees", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/application_fees/${encodeURIComponent(id)}`, params, options);
	}
	retrieveRefund(feeId, id, params, options) {
		return this._makeRequest("GET", `/v1/application_fees/${encodeURIComponent(feeId)}/refunds/${encodeURIComponent(id)}`, params, options);
	}
	updateRefund(feeId, id, params, options) {
		return this._makeRequest("POST", `/v1/application_fees/${encodeURIComponent(feeId)}/refunds/${encodeURIComponent(id)}`, params, options);
	}
	listRefunds(id, params, options) {
		return this._makeRequest("GET", `/v1/application_fees/${encodeURIComponent(id)}/refunds`, params, options, { methodType: "list" });
	}
	createRefund(id, params, options) {
		return this._makeRequest("POST", `/v1/application_fees/${encodeURIComponent(id)}/refunds`, params, options);
	}
};
var BalanceResource = class extends StripeResource {
	retrieve(params, options) {
		return this._makeRequest("GET", "/v1/balance", params, options);
	}
};
var BalanceSettingResource = class extends StripeResource {
	retrieve(params, options) {
		return this._makeRequest("GET", "/v1/balance_settings", params, options);
	}
	update(params, options) {
		return this._makeRequest("POST", "/v1/balance_settings", params, options);
	}
};
var BalanceTransactionResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/balance_transactions", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/balance_transactions/${encodeURIComponent(id)}`, params, options);
	}
};
var ChargeResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/charges", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/charges", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/charges/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/charges/${encodeURIComponent(id)}`, params, options);
	}
	search(params, options) {
		return this._makeRequest("GET", "/v1/charges/search", params, options, { methodType: "search" });
	}
	capture(id, params, options) {
		return this._makeRequest("POST", `/v1/charges/${encodeURIComponent(id)}/capture`, params, options);
	}
};
var ConfirmationTokenResource = class extends StripeResource {
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/confirmation_tokens/${encodeURIComponent(id)}`, params, options);
	}
};
var CountrySpecResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/country_specs", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/country_specs/${encodeURIComponent(id)}`, params, options);
	}
};
var CouponResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/coupons/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/coupons/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/coupons/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/coupons", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/coupons", params, options);
	}
};
var CreditNoteResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/credit_notes", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { lines: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							} }
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/credit_notes", params, options, {
			requestSchema: {
				kind: "object",
				fields: { lines: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: { kind: "decimal_string" } }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { lines: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: { unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							} }
						}
					} }
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/credit_notes/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						} }
					}
				} }
			} }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/credit_notes/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						} }
					}
				} }
			} }
		} });
	}
	preview(params, options) {
		return this._makeRequest("GET", "/v1/credit_notes/preview", params, options, {
			requestSchema: {
				kind: "object",
				fields: { lines: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: { kind: "decimal_string" } }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { lines: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: { unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							} }
						}
					} }
				} }
			}
		});
	}
	voidCreditNote(id, params, options) {
		return this._makeRequest("POST", `/v1/credit_notes/${encodeURIComponent(id)}/void`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						} }
					}
				} }
			} }
		} });
	}
	listPreviewLineItems(params, options) {
		return this._makeRequest("GET", "/v1/credit_notes/preview/lines", params, options, {
			methodType: "list",
			requestSchema: {
				kind: "object",
				fields: { lines: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: { kind: "decimal_string" } }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						} }
					}
				} }
			}
		});
	}
	listLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/credit_notes/${encodeURIComponent(id)}/lines`, params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { unit_amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						} }
					}
				} }
			}
		});
	}
};
var CustomerResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/customers/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { subscriptions: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { items: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										plan: {
											kind: "object",
											fields: {
												amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										},
										price: {
											kind: "object",
											fields: {
												currency_options: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							} }
						} }
					}
				} }
			} }
		} });
	}
	deleteDiscount(id, params, options) {
		return this._makeRequest("DELETE", `/v1/customers/${encodeURIComponent(id)}/discount`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/customers", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { subscriptions: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: { items: {
										kind: "object",
										fields: { data: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													plan: {
														kind: "object",
														fields: {
															amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															}
														}
													},
													price: {
														kind: "object",
														fields: {
															currency_options: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		tiers: {
																			kind: "array",
																			element: {
																				kind: "object",
																				fields: {
																					flat_amount_decimal: {
																						kind: "nullable",
																						inner: { kind: "decimal_string" }
																					},
																					unit_amount_decimal: {
																						kind: "nullable",
																						inner: { kind: "decimal_string" }
																					}
																				}
																			}
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										} }
									} }
								}
							} }
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/customers", params, options, { responseSchema: {
			kind: "object",
			fields: { subscriptions: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { items: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										plan: {
											kind: "object",
											fields: {
												amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										},
										price: {
											kind: "object",
											fields: {
												currency_options: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							} }
						} }
					}
				} }
			} }
		} });
	}
	search(params, options) {
		return this._makeRequest("GET", "/v1/customers/search", params, options, {
			methodType: "search",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { subscriptions: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: { items: {
										kind: "object",
										fields: { data: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													plan: {
														kind: "object",
														fields: {
															amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															}
														}
													},
													price: {
														kind: "object",
														fields: {
															currency_options: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		tiers: {
																			kind: "array",
																			element: {
																				kind: "object",
																				fields: {
																					flat_amount_decimal: {
																						kind: "nullable",
																						inner: { kind: "decimal_string" }
																					},
																					unit_amount_decimal: {
																						kind: "nullable",
																						inner: { kind: "decimal_string" }
																					}
																				}
																			}
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										} }
									} }
								}
							} }
						} }
					}
				} }
			}
		});
	}
	listBalanceTransactions(id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(id)}/balance_transactions`, params, options, { methodType: "list" });
	}
	createBalanceTransaction(id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(id)}/balance_transactions`, params, options);
	}
	retrieveBalanceTransaction(customerId, id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(customerId)}/balance_transactions/${encodeURIComponent(id)}`, params, options);
	}
	updateBalanceTransaction(customerId, id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(customerId)}/balance_transactions/${encodeURIComponent(id)}`, params, options);
	}
	retrieveCashBalance(id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(id)}/cash_balance`, params, options);
	}
	updateCashBalance(id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(id)}/cash_balance`, params, options);
	}
	listCashBalanceTransactions(id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(id)}/cash_balance_transactions`, params, options, { methodType: "list" });
	}
	retrieveCashBalanceTransaction(customerId, id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(customerId)}/cash_balance_transactions/${encodeURIComponent(id)}`, params, options);
	}
	createFundingInstructions(id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(id)}/funding_instructions`, params, options);
	}
	listPaymentMethods(id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(id)}/payment_methods`, params, options, { methodType: "list" });
	}
	retrievePaymentMethod(customerId, id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(customerId)}/payment_methods/${encodeURIComponent(id)}`, params, options);
	}
	listSources(id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(id)}/sources`, params, options, { methodType: "list" });
	}
	createSource(id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(id)}/sources`, params, options);
	}
	retrieveSource(customerId, id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(customerId)}/sources/${encodeURIComponent(id)}`, params, options);
	}
	updateSource(customerId, id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(customerId)}/sources/${encodeURIComponent(id)}`, params, options);
	}
	deleteSource(customerId, id, params, options) {
		return this._makeRequest("DELETE", `/v1/customers/${encodeURIComponent(customerId)}/sources/${encodeURIComponent(id)}`, params, options);
	}
	verifySource(customerId, id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(customerId)}/sources/${encodeURIComponent(id)}/verify`, params, options);
	}
	deleteTaxId(customerId, id, params, options) {
		return this._makeRequest("DELETE", `/v1/customers/${encodeURIComponent(customerId)}/tax_ids/${encodeURIComponent(id)}`, params, options);
	}
	retrieveTaxId(customerId, id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(customerId)}/tax_ids/${encodeURIComponent(id)}`, params, options);
	}
	listTaxIds(id, params, options) {
		return this._makeRequest("GET", `/v1/customers/${encodeURIComponent(id)}/tax_ids`, params, options, { methodType: "list" });
	}
	createTaxId(id, params, options) {
		return this._makeRequest("POST", `/v1/customers/${encodeURIComponent(id)}/tax_ids`, params, options);
	}
};
var CustomerSessionResource = class extends StripeResource {
	create(params, options) {
		return this._makeRequest("POST", "/v1/customer_sessions", params, options);
	}
};
var DisputeResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/disputes", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/disputes/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/disputes/${encodeURIComponent(id)}`, params, options);
	}
	close(id, params, options) {
		return this._makeRequest("POST", `/v1/disputes/${encodeURIComponent(id)}/close`, params, options);
	}
};
var EphemeralKeyResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/ephemeral_keys/${encodeURIComponent(id)}`, params, options);
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/ephemeral_keys", params, options, { validator: (data, options) => {
			if (!options.headers || !options.headers["Stripe-Version"]) throw new Error("Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node");
		} });
	}
};
var EventResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/events", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/events/${encodeURIComponent(id)}`, params, options);
	}
};
var ExchangeRateResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/exchange_rates", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/exchange_rates/${encodeURIComponent(id)}`, params, options);
	}
};
const multipartDataGenerator = (method, data, headers) => {
	const segno = (Math.round(Math.random() * 0x2386f26fc10000) + Math.round(Math.random() * 0x2386f26fc10000)).toString();
	headers["Content-Type"] = `multipart/form-data; boundary=${segno}`;
	const textEncoder = new TextEncoder();
	let buffer = new Uint8Array(0);
	const endBuffer = textEncoder.encode("\r\n");
	function push(l) {
		const prevBuffer = buffer;
		const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
		buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
		buffer.set(prevBuffer);
		buffer.set(newBuffer, prevBuffer.length);
		buffer.set(endBuffer, buffer.length - 2);
	}
	function q(s) {
		return `"${s.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
	}
	const flattenedData = flattenAndStringify(data);
	for (const k in flattenedData) {
		if (!Object.prototype.hasOwnProperty.call(flattenedData, k)) continue;
		const v = flattenedData[k];
		push(`--${segno}`);
		if (Object.prototype.hasOwnProperty.call(v, "data")) {
			const typedEntry = v;
			push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || "blob")}`);
			push(`Content-Type: ${typedEntry.type || "application/octet-stream"}`);
			push("");
			push(typedEntry.data);
		} else {
			push(`Content-Disposition: form-data; name=${q(k)}`);
			push("");
			push(v);
		}
	}
	push(`--${segno}--`);
	return buffer;
};
function multipartRequestDataProcessor(method, data, headers, callback) {
	data = data || {};
	if (method !== "POST") return callback(null, queryStringifyRequestData(data));
	this._stripe._platformFunctions.tryBufferData(data).then((bufferedData) => {
		return callback(null, multipartDataGenerator(method, bufferedData, headers));
	}).catch((err) => callback(err, null));
}
var FileResource = class extends StripeResource {
	constructor() {
		super(...arguments);
		this.requestDataProcessor = multipartRequestDataProcessor;
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/files", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/files", params, options, {
			headers: { "Content-Type": "multipart/form-data" },
			apiBase: "files"
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/files/${encodeURIComponent(id)}`, params, options);
	}
};
var FileLinkResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/file_links", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/file_links", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/file_links/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/file_links/${encodeURIComponent(id)}`, params, options);
	}
};
var InvoiceResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/invoices/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/invoices/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/invoices", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { lines: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										pricing: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										quantity_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							} }
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/invoices", params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	search(params, options) {
		return this._makeRequest("GET", "/v1/invoices/search", params, options, {
			methodType: "search",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { lines: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										pricing: {
											kind: "nullable",
											inner: {
												kind: "object",
												fields: { unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												} }
											}
										},
										quantity_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							} }
						} }
					}
				} }
			}
		});
	}
	addLines(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/add_lines`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { lines: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							price_data: {
								kind: "object",
								fields: { unit_amount_decimal: { kind: "decimal_string" } }
							},
							quantity_decimal: { kind: "decimal_string" }
						}
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { lines: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								pricing: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: { unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										} }
									}
								},
								quantity_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					} }
				} }
			}
		});
	}
	attachPayment(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/attach_payment`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	finalizeInvoice(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/finalize`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	markUncollectible(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/mark_uncollectible`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	pay(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/pay`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	removeLines(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/remove_lines`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	sendInvoice(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/send`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	updateLines(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/update_lines`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { lines: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							price_data: {
								kind: "object",
								fields: { unit_amount_decimal: { kind: "decimal_string" } }
							},
							quantity_decimal: { kind: "decimal_string" }
						}
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { lines: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								pricing: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: { unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										} }
									}
								},
								quantity_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					} }
				} }
			}
		});
	}
	voidInvoice(id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(id)}/void`, params, options, { responseSchema: {
			kind: "object",
			fields: { lines: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			} }
		} });
	}
	createPreview(params, options) {
		return this._makeRequest("POST", "/v1/invoices/create_preview", params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					invoice_items: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								price_data: {
									kind: "object",
									fields: { unit_amount_decimal: { kind: "decimal_string" } }
								},
								quantity_decimal: { kind: "decimal_string" },
								unit_amount_decimal: { kind: "decimal_string" }
							}
						}
					},
					schedule_details: {
						kind: "object",
						fields: { phases: {
							kind: "array",
							element: {
								kind: "object",
								fields: {
									add_invoice_items: {
										kind: "array",
										element: {
											kind: "object",
											fields: { price_data: {
												kind: "object",
												fields: { unit_amount_decimal: { kind: "decimal_string" } }
											} }
										}
									},
									items: {
										kind: "array",
										element: {
											kind: "object",
											fields: { price_data: {
												kind: "object",
												fields: { unit_amount_decimal: { kind: "decimal_string" } }
											} }
										}
									}
								}
							}
						} }
					},
					subscription_details: {
						kind: "object",
						fields: { items: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price_data: {
									kind: "object",
									fields: { unit_amount_decimal: { kind: "decimal_string" } }
								} }
							}
						} }
					}
				}
			},
			responseSchema: {
				kind: "object",
				fields: { lines: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								pricing: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: { unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										} }
									}
								},
								quantity_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					} }
				} }
			}
		});
	}
	listLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/invoices/${encodeURIComponent(id)}/lines`, params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			}
		});
	}
	updateLineItem(invoiceId, id, params, options) {
		return this._makeRequest("POST", `/v1/invoices/${encodeURIComponent(invoiceId)}/lines/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					price_data: {
						kind: "object",
						fields: { unit_amount_decimal: { kind: "decimal_string" } }
					},
					quantity_decimal: { kind: "decimal_string" }
				}
			},
			responseSchema: {
				kind: "object",
				fields: {
					pricing: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							} }
						}
					},
					quantity_decimal: {
						kind: "nullable",
						inner: { kind: "decimal_string" }
					}
				}
			}
		});
	}
};
var InvoiceItemResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/invoiceitems/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/invoiceitems/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				pricing: {
					kind: "nullable",
					inner: {
						kind: "object",
						fields: { unit_amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						} }
					}
				},
				quantity_decimal: { kind: "decimal_string" }
			}
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/invoiceitems/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					price_data: {
						kind: "object",
						fields: { unit_amount_decimal: { kind: "decimal_string" } }
					},
					quantity_decimal: { kind: "decimal_string" },
					unit_amount_decimal: { kind: "decimal_string" }
				}
			},
			responseSchema: {
				kind: "object",
				fields: {
					pricing: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							} }
						}
					},
					quantity_decimal: { kind: "decimal_string" }
				}
			}
		});
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/invoiceitems", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							pricing: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: { unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									} }
								}
							},
							quantity_decimal: { kind: "decimal_string" }
						}
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/invoiceitems", params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					price_data: {
						kind: "object",
						fields: { unit_amount_decimal: { kind: "decimal_string" } }
					},
					quantity_decimal: { kind: "decimal_string" },
					unit_amount_decimal: { kind: "decimal_string" }
				}
			},
			responseSchema: {
				kind: "object",
				fields: {
					pricing: {
						kind: "nullable",
						inner: {
							kind: "object",
							fields: { unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							} }
						}
					},
					quantity_decimal: { kind: "decimal_string" }
				}
			}
		});
	}
};
var InvoicePaymentResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/invoice_payments", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/invoice_payments/${encodeURIComponent(id)}`, params, options);
	}
};
var InvoiceRenderingTemplateResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/invoice_rendering_templates", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/invoice_rendering_templates/${encodeURIComponent(id)}`, params, options);
	}
	archive(id, params, options) {
		return this._makeRequest("POST", `/v1/invoice_rendering_templates/${encodeURIComponent(id)}/archive`, params, options);
	}
	unarchive(id, params, options) {
		return this._makeRequest("POST", `/v1/invoice_rendering_templates/${encodeURIComponent(id)}/unarchive`, params, options);
	}
};
var MandateResource = class extends StripeResource {
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/mandates/${encodeURIComponent(id)}`, params, options);
	}
};
var OAuthResource = class extends StripeResource {
	constructor() {
		super(...arguments);
		this.basePath = makeURLInterpolator("/");
	}
	authorizeUrl(params, options) {
		params = params || {};
		options = options || {};
		let path = "oauth/authorize";
		if (options.express) path = `express/${path}`;
		if (!params.response_type) params.response_type = "code";
		if (!params.client_id) params.client_id = this._stripe.getClientId();
		if (!params.scope) params.scope = "read_write";
		return `https://${this._stripe.resolveBaseAddress("connect")}/${path}?${queryStringifyRequestData(params)}`;
	}
	token(params, options) {
		return this._makeRequest("POST", "/oauth/token", params, options, { apiBase: "connect" });
	}
	deauthorize(params, options) {
		if (!params.client_id) params.client_id = this._stripe.getClientId();
		return this._makeRequest("POST", "/oauth/deauthorize", params, options, { apiBase: "connect" });
	}
};
var PaymentAttemptRecordResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payment_attempt_records", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_attempt_records/${encodeURIComponent(id)}`, params, options);
	}
};
var PaymentIntentResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payment_intents", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/payment_intents", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_intents/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_intents/${encodeURIComponent(id)}`, params, options);
	}
	search(params, options) {
		return this._makeRequest("GET", "/v1/payment_intents/search", params, options, { methodType: "search" });
	}
	applyCustomerBalance(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_intents/${encodeURIComponent(id)}/apply_customer_balance`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_intents/${encodeURIComponent(id)}/cancel`, params, options);
	}
	capture(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_intents/${encodeURIComponent(id)}/capture`, params, options);
	}
	confirm(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_intents/${encodeURIComponent(id)}/confirm`, params, options);
	}
	incrementAuthorization(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_intents/${encodeURIComponent(id)}/increment_authorization`, params, options);
	}
	verifyMicrodeposits(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_intents/${encodeURIComponent(id)}/verify_microdeposits`, params, options);
	}
	listAmountDetailsLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_intents/${encodeURIComponent(id)}/amount_details_line_items`, params, options, { methodType: "list" });
	}
};
var PaymentLinkResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payment_links", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { line_items: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: { price: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												currency_options: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									} }
								}
							} }
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/payment_links", params, options, {
			requestSchema: {
				kind: "object",
				fields: { line_items: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price_data: {
							kind: "object",
							fields: { unit_amount_decimal: { kind: "decimal_string" } }
						} }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { line_items: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: { price: {
								kind: "nullable",
								inner: {
									kind: "object",
									fields: {
										currency_options: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													tiers: {
														kind: "array",
														element: {
															kind: "object",
															fields: {
																flat_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																},
																unit_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																}
															}
														}
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							} }
						}
					} }
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_links/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { line_items: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						} }
					}
				} }
			} }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_links/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { line_items: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						} }
					}
				} }
			} }
		} });
	}
	listLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_links/${encodeURIComponent(id)}/line_items`, params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						} }
					}
				} }
			}
		});
	}
};
var PaymentMethodResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payment_methods", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/payment_methods", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_methods/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_methods/${encodeURIComponent(id)}`, params, options);
	}
	attach(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_methods/${encodeURIComponent(id)}/attach`, params, options);
	}
	detach(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_methods/${encodeURIComponent(id)}/detach`, params, options);
	}
};
var PaymentMethodConfigurationResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payment_method_configurations", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/payment_method_configurations", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_method_configurations/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_method_configurations/${encodeURIComponent(id)}`, params, options);
	}
};
var PaymentMethodDomainResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payment_method_domains", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/payment_method_domains", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_method_domains/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_method_domains/${encodeURIComponent(id)}`, params, options);
	}
	validate(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_method_domains/${encodeURIComponent(id)}/validate`, params, options);
	}
};
var PaymentRecordResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payment_records", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payment_records/${encodeURIComponent(id)}`, params, options);
	}
	reportPaymentAttempt(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_records/${encodeURIComponent(id)}/report_payment_attempt`, params, options);
	}
	reportPaymentAttemptCanceled(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_records/${encodeURIComponent(id)}/report_payment_attempt_canceled`, params, options);
	}
	reportPaymentAttemptFailed(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_records/${encodeURIComponent(id)}/report_payment_attempt_failed`, params, options);
	}
	reportPaymentAttemptGuaranteed(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_records/${encodeURIComponent(id)}/report_payment_attempt_guaranteed`, params, options);
	}
	reportPaymentAttemptInformational(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_records/${encodeURIComponent(id)}/report_payment_attempt_informational`, params, options);
	}
	reportRefund(id, params, options) {
		return this._makeRequest("POST", `/v1/payment_records/${encodeURIComponent(id)}/report_refund`, params, options);
	}
	reportPayment(params, options) {
		return this._makeRequest("POST", "/v1/payment_records/report_payment", params, options);
	}
};
var PayoutResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/payouts", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/payouts", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/payouts/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/payouts/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/payouts/${encodeURIComponent(id)}/cancel`, params, options);
	}
	reverse(id, params, options) {
		return this._makeRequest("POST", `/v1/payouts/${encodeURIComponent(id)}/reverse`, params, options);
	}
};
var PlanResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/plans/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/plans/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				amount_decimal: {
					kind: "nullable",
					inner: { kind: "decimal_string" }
				},
				tiers: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							flat_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				}
			}
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/plans/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				amount_decimal: {
					kind: "nullable",
					inner: { kind: "decimal_string" }
				},
				tiers: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							flat_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				}
			}
		} });
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/plans", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							}
						}
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/plans", params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					amount_decimal: { kind: "decimal_string" },
					tiers: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								flat_amount_decimal: { kind: "decimal_string" },
								unit_amount_decimal: { kind: "decimal_string" }
							}
						}
					}
				}
			},
			responseSchema: {
				kind: "object",
				fields: {
					amount_decimal: {
						kind: "nullable",
						inner: { kind: "decimal_string" }
					},
					tiers: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								flat_amount_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								},
								unit_amount_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					}
				}
			}
		});
	}
};
var PriceResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/prices", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							currency_options: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/prices", params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					currency_options: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								tiers: {
									kind: "array",
									element: {
										kind: "object",
										fields: {
											flat_amount_decimal: { kind: "decimal_string" },
											unit_amount_decimal: { kind: "decimal_string" }
										}
									}
								},
								unit_amount_decimal: { kind: "decimal_string" }
							}
						}
					},
					tiers: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								flat_amount_decimal: { kind: "decimal_string" },
								unit_amount_decimal: { kind: "decimal_string" }
							}
						}
					},
					unit_amount_decimal: { kind: "decimal_string" }
				}
			},
			responseSchema: {
				kind: "object",
				fields: {
					currency_options: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								tiers: {
									kind: "array",
									element: {
										kind: "object",
										fields: {
											flat_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											},
											unit_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											}
										}
									}
								},
								unit_amount_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					},
					tiers: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								flat_amount_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								},
								unit_amount_decimal: {
									kind: "nullable",
									inner: { kind: "decimal_string" }
								}
							}
						}
					},
					unit_amount_decimal: {
						kind: "nullable",
						inner: { kind: "decimal_string" }
					}
				}
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/prices/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				currency_options: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				tiers: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							flat_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				unit_amount_decimal: {
					kind: "nullable",
					inner: { kind: "decimal_string" }
				}
			}
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/prices/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				currency_options: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				tiers: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							flat_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				},
				unit_amount_decimal: {
					kind: "nullable",
					inner: { kind: "decimal_string" }
				}
			}
		} });
	}
	search(params, options) {
		return this._makeRequest("GET", "/v1/prices/search", params, options, {
			methodType: "search",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							currency_options: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				} }
			}
		});
	}
};
var ProductResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/products/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/products/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/products/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/products", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/products", params, options, { requestSchema: {
			kind: "object",
			fields: { default_price_data: {
				kind: "object",
				fields: {
					currency_options: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								tiers: {
									kind: "array",
									element: {
										kind: "object",
										fields: {
											flat_amount_decimal: { kind: "decimal_string" },
											unit_amount_decimal: { kind: "decimal_string" }
										}
									}
								},
								unit_amount_decimal: { kind: "decimal_string" }
							}
						}
					},
					unit_amount_decimal: { kind: "decimal_string" }
				}
			} }
		} });
	}
	search(params, options) {
		return this._makeRequest("GET", "/v1/products/search", params, options, { methodType: "search" });
	}
	deleteFeature(productId, id, params, options) {
		return this._makeRequest("DELETE", `/v1/products/${encodeURIComponent(productId)}/features/${encodeURIComponent(id)}`, params, options);
	}
	retrieveFeature(productId, id, params, options) {
		return this._makeRequest("GET", `/v1/products/${encodeURIComponent(productId)}/features/${encodeURIComponent(id)}`, params, options);
	}
	listFeatures(id, params, options) {
		return this._makeRequest("GET", `/v1/products/${encodeURIComponent(id)}/features`, params, options, { methodType: "list" });
	}
	createFeature(id, params, options) {
		return this._makeRequest("POST", `/v1/products/${encodeURIComponent(id)}/features`, params, options);
	}
};
var PromotionCodeResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/promotion_codes", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/promotion_codes", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/promotion_codes/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/promotion_codes/${encodeURIComponent(id)}`, params, options);
	}
};
var QuoteResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/quotes", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { computed: {
							kind: "object",
							fields: { upfront: {
								kind: "object",
								fields: { line_items: {
									kind: "object",
									fields: { data: {
										kind: "array",
										element: {
											kind: "object",
											fields: { price: {
												kind: "nullable",
												inner: {
													kind: "object",
													fields: {
														currency_options: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	tiers: {
																		kind: "array",
																		element: {
																			kind: "object",
																			fields: {
																				flat_amount_decimal: {
																					kind: "nullable",
																					inner: { kind: "decimal_string" }
																				},
																				unit_amount_decimal: {
																					kind: "nullable",
																					inner: { kind: "decimal_string" }
																				}
																			}
																		}
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														tiers: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	flat_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											} }
										}
									} }
								} }
							} }
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/quotes", params, options, {
			requestSchema: {
				kind: "object",
				fields: { line_items: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price_data: {
							kind: "object",
							fields: { unit_amount_decimal: { kind: "decimal_string" } }
						} }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { computed: {
					kind: "object",
					fields: { upfront: {
						kind: "object",
						fields: { line_items: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: { price: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												currency_options: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									} }
								}
							} }
						} }
					} }
				} }
			}
		});
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/quotes/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { computed: {
				kind: "object",
				fields: { upfront: {
					kind: "object",
					fields: { line_items: {
						kind: "object",
						fields: { data: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											currency_options: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														tiers: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	flat_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											tiers: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														flat_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											unit_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											}
										}
									}
								} }
							}
						} }
					} }
				} }
			} }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/quotes/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { line_items: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price_data: {
							kind: "object",
							fields: { unit_amount_decimal: { kind: "decimal_string" } }
						} }
					}
				} }
			},
			responseSchema: {
				kind: "object",
				fields: { computed: {
					kind: "object",
					fields: { upfront: {
						kind: "object",
						fields: { line_items: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: { price: {
										kind: "nullable",
										inner: {
											kind: "object",
											fields: {
												currency_options: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									} }
								}
							} }
						} }
					} }
				} }
			}
		});
	}
	accept(id, params, options) {
		return this._makeRequest("POST", `/v1/quotes/${encodeURIComponent(id)}/accept`, params, options, { responseSchema: {
			kind: "object",
			fields: { computed: {
				kind: "object",
				fields: { upfront: {
					kind: "object",
					fields: { line_items: {
						kind: "object",
						fields: { data: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											currency_options: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														tiers: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	flat_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											tiers: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														flat_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											unit_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											}
										}
									}
								} }
							}
						} }
					} }
				} }
			} }
		} });
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/quotes/${encodeURIComponent(id)}/cancel`, params, options, { responseSchema: {
			kind: "object",
			fields: { computed: {
				kind: "object",
				fields: { upfront: {
					kind: "object",
					fields: { line_items: {
						kind: "object",
						fields: { data: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											currency_options: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														tiers: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	flat_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											tiers: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														flat_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											unit_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											}
										}
									}
								} }
							}
						} }
					} }
				} }
			} }
		} });
	}
	finalizeQuote(id, params, options) {
		return this._makeRequest("POST", `/v1/quotes/${encodeURIComponent(id)}/finalize`, params, options, { responseSchema: {
			kind: "object",
			fields: { computed: {
				kind: "object",
				fields: { upfront: {
					kind: "object",
					fields: { line_items: {
						kind: "object",
						fields: { data: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price: {
									kind: "nullable",
									inner: {
										kind: "object",
										fields: {
											currency_options: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														tiers: {
															kind: "array",
															element: {
																kind: "object",
																fields: {
																	flat_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	},
																	unit_amount_decimal: {
																		kind: "nullable",
																		inner: { kind: "decimal_string" }
																	}
																}
															}
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											tiers: {
												kind: "array",
												element: {
													kind: "object",
													fields: {
														flat_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														},
														unit_amount_decimal: {
															kind: "nullable",
															inner: { kind: "decimal_string" }
														}
													}
												}
											},
											unit_amount_decimal: {
												kind: "nullable",
												inner: { kind: "decimal_string" }
											}
										}
									}
								} }
							}
						} }
					} }
				} }
			} }
		} });
	}
	pdf(id, params, options) {
		return this._makeRequest("GET", `/v1/quotes/${encodeURIComponent(id)}/pdf`, params, options, {
			apiBase: "files",
			streaming: true
		});
	}
	listComputedUpfrontLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/quotes/${encodeURIComponent(id)}/computed_upfront_line_items`, params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						} }
					}
				} }
			}
		});
	}
	listLineItems(id, params, options) {
		return this._makeRequest("GET", `/v1/quotes/${encodeURIComponent(id)}/line_items`, params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { price: {
							kind: "nullable",
							inner: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						} }
					}
				} }
			}
		});
	}
};
var RefundResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/refunds", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/refunds", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/refunds/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/refunds/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/refunds/${encodeURIComponent(id)}/cancel`, params, options);
	}
};
var ReviewResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/reviews", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/reviews/${encodeURIComponent(id)}`, params, options);
	}
	approve(id, params, options) {
		return this._makeRequest("POST", `/v1/reviews/${encodeURIComponent(id)}/approve`, params, options);
	}
};
var SetupAttemptResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/setup_attempts", params, options, { methodType: "list" });
	}
};
var SetupIntentResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/setup_intents", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/setup_intents", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/setup_intents/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/setup_intents/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/setup_intents/${encodeURIComponent(id)}/cancel`, params, options);
	}
	confirm(id, params, options) {
		return this._makeRequest("POST", `/v1/setup_intents/${encodeURIComponent(id)}/confirm`, params, options);
	}
	verifyMicrodeposits(id, params, options) {
		return this._makeRequest("POST", `/v1/setup_intents/${encodeURIComponent(id)}/verify_microdeposits`, params, options);
	}
};
var ShippingRateResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/shipping_rates", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/shipping_rates", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/shipping_rates/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/shipping_rates/${encodeURIComponent(id)}`, params, options);
	}
};
var SourceResource = class extends StripeResource {
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/sources/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/sources/${encodeURIComponent(id)}`, params, options);
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/sources", params, options);
	}
	verify(id, params, options) {
		return this._makeRequest("POST", `/v1/sources/${encodeURIComponent(id)}/verify`, params, options);
	}
	listSourceTransactions(id, params, options) {
		return this._makeRequest("GET", `/v1/sources/${encodeURIComponent(id)}/source_transactions`, params, options, { methodType: "list" });
	}
};
var SubscriptionResource = class extends StripeResource {
	cancel(id, params, options) {
		return this._makeRequest("DELETE", `/v1/subscriptions/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { items: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							plan: {
								kind: "object",
								fields: {
									amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							},
							price: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				} }
			} }
		} });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/subscriptions/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: { items: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							plan: {
								kind: "object",
								fields: {
									amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							},
							price: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				} }
			} }
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/subscriptions/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					add_invoice_items: {
						kind: "array",
						element: {
							kind: "object",
							fields: { price_data: {
								kind: "object",
								fields: { unit_amount_decimal: { kind: "decimal_string" } }
							} }
						}
					},
					items: {
						kind: "array",
						element: {
							kind: "object",
							fields: { price_data: {
								kind: "object",
								fields: { unit_amount_decimal: { kind: "decimal_string" } }
							} }
						}
					}
				}
			},
			responseSchema: {
				kind: "object",
				fields: { items: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								plan: {
									kind: "object",
									fields: {
										amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										}
									}
								},
								price: {
									kind: "object",
									fields: {
										currency_options: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													tiers: {
														kind: "array",
														element: {
															kind: "object",
															fields: {
																flat_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																},
																unit_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																}
															}
														}
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							}
						}
					} }
				} }
			}
		});
	}
	deleteDiscount(id, params, options) {
		return this._makeRequest("DELETE", `/v1/subscriptions/${encodeURIComponent(id)}/discount`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/subscriptions", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { items: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										plan: {
											kind: "object",
											fields: {
												amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										},
										price: {
											kind: "object",
											fields: {
												currency_options: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							} }
						} }
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/subscriptions", params, options, {
			requestSchema: {
				kind: "object",
				fields: {
					add_invoice_items: {
						kind: "array",
						element: {
							kind: "object",
							fields: { price_data: {
								kind: "object",
								fields: { unit_amount_decimal: { kind: "decimal_string" } }
							} }
						}
					},
					items: {
						kind: "array",
						element: {
							kind: "object",
							fields: { price_data: {
								kind: "object",
								fields: { unit_amount_decimal: { kind: "decimal_string" } }
							} }
						}
					}
				}
			},
			responseSchema: {
				kind: "object",
				fields: { items: {
					kind: "object",
					fields: { data: {
						kind: "array",
						element: {
							kind: "object",
							fields: {
								plan: {
									kind: "object",
									fields: {
										amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										}
									}
								},
								price: {
									kind: "object",
									fields: {
										currency_options: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													tiers: {
														kind: "array",
														element: {
															kind: "object",
															fields: {
																flat_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																},
																unit_amount_decimal: {
																	kind: "nullable",
																	inner: { kind: "decimal_string" }
																}
															}
														}
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							}
						}
					} }
				} }
			}
		});
	}
	search(params, options) {
		return this._makeRequest("GET", "/v1/subscriptions/search", params, options, {
			methodType: "search",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: { items: {
							kind: "object",
							fields: { data: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										plan: {
											kind: "object",
											fields: {
												amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												}
											}
										},
										price: {
											kind: "object",
											fields: {
												currency_options: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															tiers: {
																kind: "array",
																element: {
																	kind: "object",
																	fields: {
																		flat_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		},
																		unit_amount_decimal: {
																			kind: "nullable",
																			inner: { kind: "decimal_string" }
																		}
																	}
																}
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							} }
						} }
					}
				} }
			}
		});
	}
	migrate(id, params, options) {
		return this._makeRequest("POST", `/v1/subscriptions/${encodeURIComponent(id)}/migrate`, params, options, { responseSchema: {
			kind: "object",
			fields: { items: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							plan: {
								kind: "object",
								fields: {
									amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							},
							price: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				} }
			} }
		} });
	}
	resume(id, params, options) {
		return this._makeRequest("POST", `/v1/subscriptions/${encodeURIComponent(id)}/resume`, params, options, { responseSchema: {
			kind: "object",
			fields: { items: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							plan: {
								kind: "object",
								fields: {
									amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							},
							price: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				} }
			} }
		} });
	}
};
var SubscriptionItemResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/subscription_items/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/subscription_items/${encodeURIComponent(id)}`, params, options, { responseSchema: {
			kind: "object",
			fields: {
				plan: {
					kind: "object",
					fields: {
						amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						},
						tiers: {
							kind: "array",
							element: {
								kind: "object",
								fields: {
									flat_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				},
				price: {
					kind: "object",
					fields: {
						currency_options: {
							kind: "array",
							element: {
								kind: "object",
								fields: {
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						},
						tiers: {
							kind: "array",
							element: {
								kind: "object",
								fields: {
									flat_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						},
						unit_amount_decimal: {
							kind: "nullable",
							inner: { kind: "decimal_string" }
						}
					}
				}
			}
		} });
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/subscription_items/${encodeURIComponent(id)}`, params, options, {
			requestSchema: {
				kind: "object",
				fields: { price_data: {
					kind: "object",
					fields: { unit_amount_decimal: { kind: "decimal_string" } }
				} }
			},
			responseSchema: {
				kind: "object",
				fields: {
					plan: {
						kind: "object",
						fields: {
							amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							}
						}
					},
					price: {
						kind: "object",
						fields: {
							currency_options: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				}
			}
		});
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/subscription_items", params, options, {
			methodType: "list",
			responseSchema: {
				kind: "object",
				fields: { data: {
					kind: "array",
					element: {
						kind: "object",
						fields: {
							plan: {
								kind: "object",
								fields: {
									amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									}
								}
							},
							price: {
								kind: "object",
								fields: {
									currency_options: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												tiers: {
													kind: "array",
													element: {
														kind: "object",
														fields: {
															flat_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															},
															unit_amount_decimal: {
																kind: "nullable",
																inner: { kind: "decimal_string" }
															}
														}
													}
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									tiers: {
										kind: "array",
										element: {
											kind: "object",
											fields: {
												flat_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												},
												unit_amount_decimal: {
													kind: "nullable",
													inner: { kind: "decimal_string" }
												}
											}
										}
									},
									unit_amount_decimal: {
										kind: "nullable",
										inner: { kind: "decimal_string" }
									}
								}
							}
						}
					}
				} }
			}
		});
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/subscription_items", params, options, {
			requestSchema: {
				kind: "object",
				fields: { price_data: {
					kind: "object",
					fields: { unit_amount_decimal: { kind: "decimal_string" } }
				} }
			},
			responseSchema: {
				kind: "object",
				fields: {
					plan: {
						kind: "object",
						fields: {
							amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							},
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							}
						}
					},
					price: {
						kind: "object",
						fields: {
							currency_options: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										tiers: {
											kind: "array",
											element: {
												kind: "object",
												fields: {
													flat_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													},
													unit_amount_decimal: {
														kind: "nullable",
														inner: { kind: "decimal_string" }
													}
												}
											}
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							tiers: {
								kind: "array",
								element: {
									kind: "object",
									fields: {
										flat_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										},
										unit_amount_decimal: {
											kind: "nullable",
											inner: { kind: "decimal_string" }
										}
									}
								}
							},
							unit_amount_decimal: {
								kind: "nullable",
								inner: { kind: "decimal_string" }
							}
						}
					}
				}
			}
		});
	}
};
var SubscriptionScheduleResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/subscription_schedules", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/subscription_schedules", params, options, { requestSchema: {
			kind: "object",
			fields: { phases: {
				kind: "array",
				element: {
					kind: "object",
					fields: {
						add_invoice_items: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price_data: {
									kind: "object",
									fields: { unit_amount_decimal: { kind: "decimal_string" } }
								} }
							}
						},
						items: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price_data: {
									kind: "object",
									fields: { unit_amount_decimal: { kind: "decimal_string" } }
								} }
							}
						}
					}
				}
			} }
		} });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/subscription_schedules/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/subscription_schedules/${encodeURIComponent(id)}`, params, options, { requestSchema: {
			kind: "object",
			fields: { phases: {
				kind: "array",
				element: {
					kind: "object",
					fields: {
						add_invoice_items: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price_data: {
									kind: "object",
									fields: { unit_amount_decimal: { kind: "decimal_string" } }
								} }
							}
						},
						items: {
							kind: "array",
							element: {
								kind: "object",
								fields: { price_data: {
									kind: "object",
									fields: { unit_amount_decimal: { kind: "decimal_string" } }
								} }
							}
						}
					}
				}
			} }
		} });
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/subscription_schedules/${encodeURIComponent(id)}/cancel`, params, options);
	}
	release(id, params, options) {
		return this._makeRequest("POST", `/v1/subscription_schedules/${encodeURIComponent(id)}/release`, params, options);
	}
};
var TaxCodeResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/tax_codes", params, options, { methodType: "list" });
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/tax_codes/${encodeURIComponent(id)}`, params, options);
	}
};
var TaxIdResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/tax_ids/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/tax_ids/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/tax_ids", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/tax_ids", params, options);
	}
};
var TaxRateResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/tax_rates", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/tax_rates", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/tax_rates/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/tax_rates/${encodeURIComponent(id)}`, params, options);
	}
};
var TokenResource = class extends StripeResource {
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/tokens/${encodeURIComponent(id)}`, params, options);
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/tokens", params, options);
	}
};
var TopupResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/topups", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/topups", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/topups/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/topups/${encodeURIComponent(id)}`, params, options);
	}
	cancel(id, params, options) {
		return this._makeRequest("POST", `/v1/topups/${encodeURIComponent(id)}/cancel`, params, options);
	}
};
var TransferResource = class extends StripeResource {
	list(params, options) {
		return this._makeRequest("GET", "/v1/transfers", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/transfers", params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/transfers/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/transfers/${encodeURIComponent(id)}`, params, options);
	}
	listReversals(id, params, options) {
		return this._makeRequest("GET", `/v1/transfers/${encodeURIComponent(id)}/reversals`, params, options, { methodType: "list" });
	}
	createReversal(id, params, options) {
		return this._makeRequest("POST", `/v1/transfers/${encodeURIComponent(id)}/reversals`, params, options);
	}
	retrieveReversal(transferId, id, params, options) {
		return this._makeRequest("GET", `/v1/transfers/${encodeURIComponent(transferId)}/reversals/${encodeURIComponent(id)}`, params, options);
	}
	updateReversal(transferId, id, params, options) {
		return this._makeRequest("POST", `/v1/transfers/${encodeURIComponent(transferId)}/reversals/${encodeURIComponent(id)}`, params, options);
	}
};
var WebhookEndpointResource = class extends StripeResource {
	del(id, params, options) {
		return this._makeRequest("DELETE", `/v1/webhook_endpoints/${encodeURIComponent(id)}`, params, options);
	}
	retrieve(id, params, options) {
		return this._makeRequest("GET", `/v1/webhook_endpoints/${encodeURIComponent(id)}`, params, options);
	}
	update(id, params, options) {
		return this._makeRequest("POST", `/v1/webhook_endpoints/${encodeURIComponent(id)}`, params, options);
	}
	list(params, options) {
		return this._makeRequest("GET", "/v1/webhook_endpoints", params, options, { methodType: "list" });
	}
	create(params, options) {
		return this._makeRequest("POST", "/v1/webhook_endpoints", params, options);
	}
};
var resources_exports = __exportAll({
	Account: () => AccountResource,
	AccountLinks: () => AccountLinkResource,
	AccountSessions: () => AccountSessionResource,
	Accounts: () => AccountResource,
	ApplePayDomains: () => ApplePayDomainResource,
	ApplicationFees: () => ApplicationFeeResource,
	Apps: () => Apps$1,
	Balance: () => BalanceResource,
	BalanceSettings: () => BalanceSettingResource,
	BalanceTransactions: () => BalanceTransactionResource,
	Balances: () => BalanceResource,
	Billing: () => Billing$2,
	BillingPortal: () => BillingPortal$1,
	Charges: () => ChargeResource,
	Checkout: () => Checkout$1,
	Climate: () => Climate$1,
	ConfirmationTokens: () => ConfirmationTokenResource,
	CountrySpecs: () => CountrySpecResource,
	Coupons: () => CouponResource,
	CreditNotes: () => CreditNoteResource,
	CustomerSessions: () => CustomerSessionResource,
	Customers: () => CustomerResource,
	Disputes: () => DisputeResource,
	Entitlements: () => Entitlements$1,
	EphemeralKeys: () => EphemeralKeyResource,
	Events: () => EventResource,
	ExchangeRates: () => ExchangeRateResource,
	FileLinks: () => FileLinkResource,
	Files: () => FileResource,
	FinancialConnections: () => FinancialConnections$1,
	Forwarding: () => Forwarding$1,
	Identity: () => Identity$1,
	InvoiceItems: () => InvoiceItemResource,
	InvoicePayments: () => InvoicePaymentResource,
	InvoiceRenderingTemplates: () => InvoiceRenderingTemplateResource,
	Invoices: () => InvoiceResource,
	Issuing: () => Issuing$2,
	Mandates: () => MandateResource,
	OAuthResource: () => OAuthResource,
	PaymentAttemptRecords: () => PaymentAttemptRecordResource,
	PaymentIntents: () => PaymentIntentResource,
	PaymentLinks: () => PaymentLinkResource,
	PaymentMethodConfigurations: () => PaymentMethodConfigurationResource,
	PaymentMethodDomains: () => PaymentMethodDomainResource,
	PaymentMethods: () => PaymentMethodResource,
	PaymentRecords: () => PaymentRecordResource,
	Payouts: () => PayoutResource,
	Plans: () => PlanResource,
	Prices: () => PriceResource,
	Products: () => ProductResource,
	PromotionCodes: () => PromotionCodeResource,
	Quotes: () => QuoteResource,
	Radar: () => Radar$1,
	Refunds: () => RefundResource,
	Reporting: () => Reporting$1,
	Reviews: () => ReviewResource,
	SetupAttempts: () => SetupAttemptResource,
	SetupIntents: () => SetupIntentResource,
	ShippingRates: () => ShippingRateResource,
	Sigma: () => Sigma$1,
	Sources: () => SourceResource,
	SubscriptionItems: () => SubscriptionItemResource,
	SubscriptionSchedules: () => SubscriptionScheduleResource,
	Subscriptions: () => SubscriptionResource,
	Tax: () => Tax$1,
	TaxCodes: () => TaxCodeResource,
	TaxIds: () => TaxIdResource,
	TaxRates: () => TaxRateResource,
	Terminal: () => Terminal$2,
	TestHelpers: () => TestHelpers$1,
	Tokens: () => TokenResource,
	Topups: () => TopupResource,
	Transfers: () => TransferResource,
	Treasury: () => Treasury$2,
	V2: () => V2$1,
	WebhookEndpoints: () => WebhookEndpointResource
});
const Apps$1 = resourceNamespace("apps", { Secrets: SecretResource });
const Billing$2 = resourceNamespace("billing", {
	Alerts: AlertResource,
	CreditBalanceSummary: CreditBalanceSummaryResource,
	CreditBalanceTransactions: CreditBalanceTransactionResource,
	CreditGrants: CreditGrantResource,
	MeterEventAdjustments: MeterEventAdjustmentResource$1,
	MeterEvents: MeterEventResource$1,
	Meters: MeterResource
});
const BillingPortal$1 = resourceNamespace("billingPortal", {
	Configurations: ConfigurationResource$1,
	Sessions: SessionResource$2
});
const Checkout$1 = resourceNamespace("checkout", { Sessions: SessionResource$1 });
const Climate$1 = resourceNamespace("climate", {
	Orders: OrderResource,
	Products: ProductResource$1,
	Suppliers: SupplierResource
});
const Entitlements$1 = resourceNamespace("entitlements", {
	ActiveEntitlements: ActiveEntitlementResource,
	Features: FeatureResource
});
const FinancialConnections$1 = resourceNamespace("financialConnections", {
	Accounts: AccountResource$2,
	Sessions: SessionResource,
	Transactions: TransactionResource$4
});
const Forwarding$1 = resourceNamespace("forwarding", { Requests: RequestResource });
const Identity$1 = resourceNamespace("identity", {
	VerificationReports: VerificationReportResource,
	VerificationSessions: VerificationSessionResource
});
const Issuing$2 = resourceNamespace("issuing", {
	Authorizations: AuthorizationResource$1,
	Cardholders: CardholderResource,
	Cards: CardResource$1,
	Disputes: DisputeResource$1,
	PersonalizationDesigns: PersonalizationDesignResource$1,
	PhysicalBundles: PhysicalBundleResource,
	Tokens: TokenResource$1,
	Transactions: TransactionResource$3
});
const Radar$1 = resourceNamespace("radar", {
	EarlyFraudWarnings: EarlyFraudWarningResource,
	PaymentEvaluations: PaymentEvaluationResource,
	ValueListItems: ValueListItemResource,
	ValueLists: ValueListResource
});
const Reporting$1 = resourceNamespace("reporting", {
	ReportRuns: ReportRunResource,
	ReportTypes: ReportTypeResource
});
const Sigma$1 = resourceNamespace("sigma", { ScheduledQueryRuns: ScheduledQueryRunResource });
const Tax$1 = resourceNamespace("tax", {
	Associations: AssociationResource,
	Calculations: CalculationResource,
	Registrations: RegistrationResource,
	Settings: SettingResource,
	Transactions: TransactionResource$2
});
const Terminal$2 = resourceNamespace("terminal", {
	Configurations: ConfigurationResource,
	ConnectionTokens: ConnectionTokenResource,
	Locations: LocationResource,
	OnboardingLinks: OnboardingLinkResource,
	Readers: ReaderResource$1
});
const TestHelpers$1 = resourceNamespace("testHelpers", {
	ConfirmationTokens: ConfirmationTokenResource$1,
	Customers: CustomerResource$1,
	Refunds: RefundResource$1,
	TestClocks: TestClockResource,
	Issuing: resourceNamespace("issuing", {
		Authorizations: AuthorizationResource,
		Cards: CardResource,
		PersonalizationDesigns: PersonalizationDesignResource,
		Transactions: TransactionResource$1
	}),
	Terminal: resourceNamespace("terminal", { Readers: ReaderResource }),
	Treasury: resourceNamespace("treasury", {
		InboundTransfers: InboundTransferResource$1,
		OutboundPayments: OutboundPaymentResource$1,
		OutboundTransfers: OutboundTransferResource$1,
		ReceivedCredits: ReceivedCreditResource$1,
		ReceivedDebits: ReceivedDebitResource$1
	})
});
const Treasury$2 = resourceNamespace("treasury", {
	CreditReversals: CreditReversalResource,
	DebitReversals: DebitReversalResource,
	FinancialAccounts: FinancialAccountResource,
	InboundTransfers: InboundTransferResource,
	OutboundPayments: OutboundPaymentResource,
	OutboundTransfers: OutboundTransferResource,
	ReceivedCredits: ReceivedCreditResource,
	ReceivedDebits: ReceivedDebitResource,
	TransactionEntries: TransactionEntryResource,
	Transactions: TransactionResource
});
const V2$1 = resourceNamespace("v2", {
	Billing: resourceNamespace("billing", {
		MeterEventAdjustments: MeterEventAdjustmentResource,
		MeterEventSession: MeterEventSessionResource,
		MeterEventStream: MeterEventStreamResource,
		MeterEvents: MeterEventResource
	}),
	Commerce: resourceNamespace("commerce", { ProductCatalog: resourceNamespace("productCatalog", { Imports: ImportResource }) }),
	Core: resourceNamespace("core", {
		AccountLinks: AccountLinkResource$1,
		AccountTokens: AccountTokenResource,
		Accounts: AccountResource$1,
		EventDestinations: EventDestinationResource,
		Events: EventResource$1
	})
});
var Apps = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.secrets = new SecretResource(stripe);
	}
};
var Billing$1 = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.alerts = new AlertResource(stripe);
		this.creditBalanceSummaries = new CreditBalanceSummaryResource(stripe);
		this.creditBalanceTransactions = new CreditBalanceTransactionResource(stripe);
		this.creditGrants = new CreditGrantResource(stripe);
		this.meters = new MeterResource(stripe);
		this.meterEvents = new MeterEventResource$1(stripe);
		this.meterEventAdjustments = new MeterEventAdjustmentResource$1(stripe);
	}
};
var BillingPortal = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.configurations = new ConfigurationResource$1(stripe);
		this.sessions = new SessionResource$2(stripe);
	}
};
var Checkout = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.sessions = new SessionResource$1(stripe);
	}
};
var Climate = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.orders = new OrderResource(stripe);
		this.products = new ProductResource$1(stripe);
		this.suppliers = new SupplierResource(stripe);
	}
};
var Entitlements = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.activeEntitlements = new ActiveEntitlementResource(stripe);
		this.features = new FeatureResource(stripe);
	}
};
var FinancialConnections = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.accounts = new AccountResource$2(stripe);
		this.sessions = new SessionResource(stripe);
		this.transactions = new TransactionResource$4(stripe);
	}
};
var Forwarding = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.requests = new RequestResource(stripe);
	}
};
var Identity = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.verificationReports = new VerificationReportResource(stripe);
		this.verificationSessions = new VerificationSessionResource(stripe);
	}
};
var Issuing$1 = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.authorizations = new AuthorizationResource$1(stripe);
		this.cards = new CardResource$1(stripe);
		this.cardholders = new CardholderResource(stripe);
		this.disputes = new DisputeResource$1(stripe);
		this.personalizationDesigns = new PersonalizationDesignResource$1(stripe);
		this.physicalBundles = new PhysicalBundleResource(stripe);
		this.tokens = new TokenResource$1(stripe);
		this.transactions = new TransactionResource$3(stripe);
	}
};
var Radar = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.earlyFraudWarnings = new EarlyFraudWarningResource(stripe);
		this.paymentEvaluations = new PaymentEvaluationResource(stripe);
		this.valueLists = new ValueListResource(stripe);
		this.valueListItems = new ValueListItemResource(stripe);
	}
};
var Reporting = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.reportRuns = new ReportRunResource(stripe);
		this.reportTypes = new ReportTypeResource(stripe);
	}
};
var Sigma = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.scheduledQueryRuns = new ScheduledQueryRunResource(stripe);
	}
};
var Tax = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.associations = new AssociationResource(stripe);
		this.calculations = new CalculationResource(stripe);
		this.registrations = new RegistrationResource(stripe);
		this.settings = new SettingResource(stripe);
		this.transactions = new TransactionResource$2(stripe);
	}
};
var Terminal$1 = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.configurations = new ConfigurationResource(stripe);
		this.connectionTokens = new ConnectionTokenResource(stripe);
		this.locations = new LocationResource(stripe);
		this.onboardingLinks = new OnboardingLinkResource(stripe);
		this.readers = new ReaderResource$1(stripe);
	}
};
var Issuing = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.authorizations = new AuthorizationResource(stripe);
		this.cards = new CardResource(stripe);
		this.personalizationDesigns = new PersonalizationDesignResource(stripe);
		this.transactions = new TransactionResource$1(stripe);
	}
};
var Terminal = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.readers = new ReaderResource(stripe);
	}
};
var Treasury$1 = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.inboundTransfers = new InboundTransferResource$1(stripe);
		this.outboundPayments = new OutboundPaymentResource$1(stripe);
		this.outboundTransfers = new OutboundTransferResource$1(stripe);
		this.receivedCredits = new ReceivedCreditResource$1(stripe);
		this.receivedDebits = new ReceivedDebitResource$1(stripe);
	}
};
var TestHelpers = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.confirmationTokens = new ConfirmationTokenResource$1(stripe);
		this.customers = new CustomerResource$1(stripe);
		this.refunds = new RefundResource$1(stripe);
		this.testClocks = new TestClockResource(stripe);
		this.issuing = new Issuing(stripe);
		this.terminal = new Terminal(stripe);
		this.treasury = new Treasury$1(stripe);
	}
};
var Treasury = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.creditReversals = new CreditReversalResource(stripe);
		this.debitReversals = new DebitReversalResource(stripe);
		this.financialAccounts = new FinancialAccountResource(stripe);
		this.inboundTransfers = new InboundTransferResource(stripe);
		this.outboundPayments = new OutboundPaymentResource(stripe);
		this.outboundTransfers = new OutboundTransferResource(stripe);
		this.receivedCredits = new ReceivedCreditResource(stripe);
		this.receivedDebits = new ReceivedDebitResource(stripe);
		this.transactions = new TransactionResource(stripe);
		this.transactionEntries = new TransactionEntryResource(stripe);
	}
};
var Billing = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.meterEvents = new MeterEventResource(stripe);
		this.meterEventAdjustments = new MeterEventAdjustmentResource(stripe);
		this.meterEventSession = new MeterEventSessionResource(stripe);
		this.meterEventStream = new MeterEventStreamResource(stripe);
	}
};
var ProductCatalog = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.imports = new ImportResource(stripe);
	}
};
var Commerce = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.productCatalog = new ProductCatalog(stripe);
	}
};
var Core = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.accounts = new AccountResource$1(stripe);
		this.accountLinks = new AccountLinkResource$1(stripe);
		this.accountTokens = new AccountTokenResource(stripe);
		this.events = new EventResource$1(stripe);
		this.eventDestinations = new EventDestinationResource(stripe);
	}
};
var V2 = class {
	constructor(stripe) {
		this.stripe = stripe;
		this.billing = new Billing(stripe);
		this.commerce = new Commerce(stripe);
		this.core = new Core(stripe);
	}
};
const DEFAULT_HOST = "api.stripe.com";
const DEFAULT_PORT = "443";
const DEFAULT_BASE_PATH = "/v1/";
const DEFAULT_API_VERSION = ApiVersion;
const DEFAULT_TIMEOUT = 8e4;
const MAX_NETWORK_RETRY_DELAY_SEC = 5;
const INITIAL_NETWORK_RETRY_DELAY_SEC = .5;
const APP_INFO_PROPERTIES = [
	"name",
	"version",
	"url",
	"partner_id"
];
const ALLOWED_CONFIG_PROPERTIES = [
	"authenticator",
	"apiVersion",
	"typescript",
	"maxNetworkRetries",
	"httpAgent",
	"httpClient",
	"timeout",
	"host",
	"port",
	"protocol",
	"telemetry",
	"emitEventBodies",
	"appInfo",
	"stripeAccount",
	"stripeContext"
];
const defaultRequestSenderFactory = (stripe) => new RequestSender(stripe, StripeResource.MAX_BUFFERED_REQUEST_METRICS);
var Stripe = class Stripe {
	static initialize(platformFunctions, requestSenderFactory = defaultRequestSenderFactory) {
		Stripe._platformFunctions = platformFunctions;
		Stripe._requestSenderFactory = requestSenderFactory;
		Stripe.webhooks = createWebhooks(platformFunctions);
		Stripe.createNodeHttpClient = platformFunctions.createNodeHttpClient;
		Stripe.createFetchHttpClient = platformFunctions.createFetchHttpClient;
		Stripe.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
		Stripe.createSubtleCryptoProvider = platformFunctions.createSubtleCryptoProvider;
		const env = platformFunctions.getEnv();
		const runtimeVersion = platformFunctions.getRuntimeVersion();
		Stripe.aiAgent = env ? detectAIAgent(env) : "";
		Stripe.AI_AGENT = Stripe.aiAgent;
		Stripe.USER_AGENT = {
			bindings_version: Stripe.PACKAGE_VERSION,
			lang: "node",
			typescript: false,
			...runtimeVersion ? { lang_version: runtimeVersion } : {},
			...Stripe.aiAgent ? { ai_agent: Stripe.aiAgent } : {}
		};
	}
	constructor(key, config = {}) {
		this._authenticator = null;
		const props = this._getPropsFromConfig(config);
		this._platformFunctions = Stripe._platformFunctions;
		Object.defineProperty(this, "_emitter", {
			value: this._platformFunctions.createEmitter(),
			enumerable: false,
			configurable: false,
			writable: false
		});
		this.VERSION = Stripe.PACKAGE_VERSION;
		this.on = this._emitter.on.bind(this._emitter);
		this.once = this._emitter.once.bind(this._emitter);
		this.off = this._emitter.removeListener.bind(this._emitter);
		const agent = props.httpAgent || null;
		this._api = {
			host: props.host || DEFAULT_HOST,
			port: props.port || DEFAULT_PORT,
			protocol: props.protocol || "https",
			basePath: DEFAULT_BASE_PATH,
			version: props.apiVersion || DEFAULT_API_VERSION,
			timeout: validateInteger("timeout", props.timeout, DEFAULT_TIMEOUT),
			maxNetworkRetries: validateInteger("maxNetworkRetries", props.maxNetworkRetries, 2),
			agent,
			httpClient: props.httpClient || (agent ? this._platformFunctions.createNodeHttpClient(agent) : this._platformFunctions.createDefaultHttpClient()),
			dev: false,
			stripeAccount: props.stripeAccount || null,
			stripeContext: props.stripeContext || null
		};
		const typescript = props.typescript || false;
		if (typescript !== Stripe.USER_AGENT.typescript) Stripe.USER_AGENT.typescript = typescript;
		if (props.appInfo) this._setAppInfo(props.appInfo);
		this._setAuthenticator(key, props.authenticator || null);
		this.errors = Error_exports;
		this.Decimal = Decimal;
		this.webhooks = Stripe.webhooks;
		this._prevRequestMetrics = [];
		this._enableTelemetry = props.telemetry !== false;
		this._emitEventBodies = props.emitEventBodies === true;
		this._requestSender = Stripe._requestSenderFactory(this);
		this.accountLinks = new AccountLinkResource(this);
		this.accountSessions = new AccountSessionResource(this);
		this.accounts = new AccountResource(this);
		this.applePayDomains = new ApplePayDomainResource(this);
		this.applicationFees = new ApplicationFeeResource(this);
		this.balance = new BalanceResource(this);
		this.balanceSettings = new BalanceSettingResource(this);
		this.balanceTransactions = new BalanceTransactionResource(this);
		this.charges = new ChargeResource(this);
		this.confirmationTokens = new ConfirmationTokenResource(this);
		this.countrySpecs = new CountrySpecResource(this);
		this.coupons = new CouponResource(this);
		this.creditNotes = new CreditNoteResource(this);
		this.customerSessions = new CustomerSessionResource(this);
		this.customers = new CustomerResource(this);
		this.disputes = new DisputeResource(this);
		this.ephemeralKeys = new EphemeralKeyResource(this);
		this.events = new EventResource(this);
		this.exchangeRates = new ExchangeRateResource(this);
		this.fileLinks = new FileLinkResource(this);
		this.files = new FileResource(this);
		this.invoiceItems = new InvoiceItemResource(this);
		this.invoicePayments = new InvoicePaymentResource(this);
		this.invoiceRenderingTemplates = new InvoiceRenderingTemplateResource(this);
		this.invoices = new InvoiceResource(this);
		this.mandates = new MandateResource(this);
		this.paymentAttemptRecords = new PaymentAttemptRecordResource(this);
		this.paymentIntents = new PaymentIntentResource(this);
		this.paymentLinks = new PaymentLinkResource(this);
		this.paymentMethodConfigurations = new PaymentMethodConfigurationResource(this);
		this.paymentMethodDomains = new PaymentMethodDomainResource(this);
		this.paymentMethods = new PaymentMethodResource(this);
		this.paymentRecords = new PaymentRecordResource(this);
		this.payouts = new PayoutResource(this);
		this.plans = new PlanResource(this);
		this.prices = new PriceResource(this);
		this.products = new ProductResource(this);
		this.promotionCodes = new PromotionCodeResource(this);
		this.quotes = new QuoteResource(this);
		this.refunds = new RefundResource(this);
		this.reviews = new ReviewResource(this);
		this.setupAttempts = new SetupAttemptResource(this);
		this.setupIntents = new SetupIntentResource(this);
		this.shippingRates = new ShippingRateResource(this);
		this.sources = new SourceResource(this);
		this.subscriptionItems = new SubscriptionItemResource(this);
		this.subscriptionSchedules = new SubscriptionScheduleResource(this);
		this.subscriptions = new SubscriptionResource(this);
		this.taxCodes = new TaxCodeResource(this);
		this.taxIds = new TaxIdResource(this);
		this.taxRates = new TaxRateResource(this);
		this.tokens = new TokenResource(this);
		this.topups = new TopupResource(this);
		this.transfers = new TransferResource(this);
		this.webhookEndpoints = new WebhookEndpointResource(this);
		this.apps = new Apps(this);
		this.billing = new Billing$1(this);
		this.billingPortal = new BillingPortal(this);
		this.checkout = new Checkout(this);
		this.climate = new Climate(this);
		this.entitlements = new Entitlements(this);
		this.financialConnections = new FinancialConnections(this);
		this.forwarding = new Forwarding(this);
		this.identity = new Identity(this);
		this.issuing = new Issuing$1(this);
		this.radar = new Radar(this);
		this.reporting = new Reporting(this);
		this.sigma = new Sigma(this);
		this.tax = new Tax(this);
		this.terminal = new Terminal$1(this);
		this.testHelpers = new TestHelpers(this);
		this.treasury = new Treasury(this);
		this.v2 = new V2(this);
		this.account = this.accounts;
		this.oauth = new OAuthResource(this);
	}
	rawRequest(method, path, params, options) {
		return this._requestSender._rawRequest(method, path, params, options);
	}
	_setAuthenticator(key, authenticator) {
		if (key && authenticator) throw new Error("Can't specify both apiKey and authenticator");
		if (!key && !authenticator) throw new Error("Neither apiKey nor config.authenticator provided");
		this._authenticator = key ? createApiKeyAuthenticator(key) : authenticator;
	}
	_setAppInfo(info) {
		if (info && typeof info !== "object") throw new Error("AppInfo must be an object.");
		if (info && !info.name) throw new Error("AppInfo.name is required");
		info = info || {};
		this._appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
			if (typeof info[prop] == "string") {
				accum = accum || {};
				accum[prop] = info[prop];
			}
			return accum;
		}, {});
	}
	setClientId(clientId) {
		this._clientId = clientId;
	}
	getClientId() {
		return this._clientId;
	}
	getConstant(c) {
		switch (c) {
			case "DEFAULT_HOST": return DEFAULT_HOST;
			case "DEFAULT_PORT": return DEFAULT_PORT;
			case "DEFAULT_BASE_PATH": return DEFAULT_BASE_PATH;
			case "DEFAULT_API_VERSION": return DEFAULT_API_VERSION;
			case "DEFAULT_TIMEOUT": return DEFAULT_TIMEOUT;
			case "MAX_NETWORK_RETRY_DELAY_SEC": return MAX_NETWORK_RETRY_DELAY_SEC;
			case "INITIAL_NETWORK_RETRY_DELAY_SEC": return INITIAL_NETWORK_RETRY_DELAY_SEC;
		}
		return Stripe[c];
	}
	resolveBaseAddress(apiBase) {
		const instanceHost = this.getApiField("host");
		if (instanceHost !== DEFAULT_HOST) return instanceHost;
		return DEFAULT_BASE_ADDRESSES[apiBase];
	}
	getMaxNetworkRetries() {
		return this.getApiField("maxNetworkRetries");
	}
	_setApiNumberField(prop, n, defaultVal) {
		const val = validateInteger(prop, n, defaultVal);
		this._setApiField(prop, val);
	}
	getMaxNetworkRetryDelay() {
		return MAX_NETWORK_RETRY_DELAY_SEC;
	}
	getInitialNetworkRetryDelay() {
		return INITIAL_NETWORK_RETRY_DELAY_SEC;
	}
	getClientUserAgent(cb) {
		return this.getClientUserAgentSeeded(Stripe.USER_AGENT, cb);
	}
	getClientUserAgentSeeded(seed, cb) {
		const userAgent = {};
		for (const field in seed) {
			if (!Object.prototype.hasOwnProperty.call(seed, field)) continue;
			userAgent[field] = encodeURIComponent(seed[field] ?? "null");
		}
		const platformInfo = this._platformFunctions.getPlatformInfo();
		if (platformInfo && this.getTelemetryEnabled()) userAgent.platform = encodeURIComponent(platformInfo);
		else delete userAgent.platform;
		const client = this.getApiField("httpClient");
		if (client) userAgent.httplib = encodeURIComponent(client.getClientName());
		if (this._appInfo) userAgent.application = this._appInfo;
		cb(JSON.stringify(userAgent));
	}
	getAppInfoAsString() {
		if (!this._appInfo) return "";
		let formatted = this._appInfo.name;
		if (this._appInfo.version) formatted += `/${this._appInfo.version}`;
		if (this._appInfo.url) formatted += ` (${this._appInfo.url})`;
		return formatted;
	}
	getTelemetryEnabled() {
		return this._enableTelemetry;
	}
	getEmitEventBodiesEnabled() {
		return this._emitEventBodies;
	}
	_prepResources() {
		for (const name in resources_exports) {
			if (!Object.prototype.hasOwnProperty.call(resources_exports, name)) continue;
			this[pascalToCamelCase(name.replace("Resource", ""))] = new resources_exports[name](this);
		}
	}
	_getPropsFromConfig(config) {
		if (!config) return {};
		const isString = typeof config === "string";
		if (!(config === Object(config) && !Array.isArray(config)) && !isString) throw new Error("Config must either be an object or a string");
		if (isString) return { apiVersion: config };
		if (Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)).length > 0) throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(", ")}`);
		return config;
	}
	_setApiField(key, value) {
		this._api[key] = value;
	}
	getApiField(key) {
		return this._api[key];
	}
	parseEventNotification(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
		if (!this.webhooks.signature) throw new Error("ERR: missing signature helper, unable to verify");
		this.webhooks.signature.verifyHeader(payload, header, secret, tolerance || this.webhooks.DEFAULT_TOLERANCE, cryptoProvider || this._platformFunctions.createDefaultCryptoProvider(), receivedAt);
		const eventNotification = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
		if (eventNotification && eventNotification.object === "event") throw new Error("You passed a webhook payload to stripe.parseEventNotification, which expects an event notification. Use stripe.webhooks.constructEvent instead.");
		if (eventNotification.context) eventNotification.context = StripeContext.parse(eventNotification.context);
		eventNotification.fetchEvent = () => {
			return this._requestSender._rawRequest("GET", `/v2/core/events/${eventNotification.id}`, void 0, {
				stripeContext: eventNotification.context,
				headers: { "Stripe-Request-Trigger": `event=${eventNotification.id}` }
			}, ["fetch_event"]);
		};
		eventNotification.fetchRelatedObject = () => {
			if (!eventNotification.related_object) return Promise.resolve(null);
			return this._requestSender._rawRequest("GET", eventNotification.related_object.url, void 0, {
				stripeContext: eventNotification.context,
				headers: { "Stripe-Request-Trigger": `event=${eventNotification.id}` }
			}, ["fetch_related_object"]);
		};
		return eventNotification;
	}
	async parseEventNotificationAsync(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
		if (!this.webhooks.signature) throw new Error("ERR: missing signature helper, unable to verify");
		await this.webhooks.signature.verifyHeaderAsync(payload, header, secret, tolerance || this.webhooks.DEFAULT_TOLERANCE, cryptoProvider || this._platformFunctions.createDefaultCryptoProvider(), receivedAt);
		const eventNotification = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
		if (eventNotification && eventNotification.object === "event") throw new Error("You passed a webhook payload to stripe.parseEventNotificationAsync, which expects an event notification. Use stripe.webhooks.constructEventAsync instead.");
		if (eventNotification.context) eventNotification.context = StripeContext.parse(eventNotification.context);
		eventNotification.fetchEvent = () => {
			return this._requestSender._rawRequest("GET", `/v2/core/events/${eventNotification.id}`, void 0, {
				stripeContext: eventNotification.context,
				headers: { "Stripe-Request-Trigger": `event=${eventNotification.id}` }
			}, ["fetch_event"]);
		};
		eventNotification.fetchRelatedObject = () => {
			if (!eventNotification.related_object) return Promise.resolve(null);
			return this._requestSender._rawRequest("GET", eventNotification.related_object.url, void 0, {
				stripeContext: eventNotification.context,
				headers: { "Stripe-Request-Trigger": `event=${eventNotification.id}` }
			}, ["fetch_related_object"]);
		};
		return eventNotification;
	}
};
Stripe.PACKAGE_VERSION = "22.4.0";
Stripe.API_VERSION = ApiVersion;
Stripe.aiAgent = "";
Stripe.AI_AGENT = "";
Stripe.USER_AGENT = {
	bindings_version: Stripe.PACKAGE_VERSION,
	lang: "node",
	typescript: false
};
Stripe.StripeResource = StripeResource;
Stripe.resources = resources_exports;
Stripe.HttpClient = HttpClient;
Stripe.HttpClientResponse = HttpClientResponse;
Stripe.CryptoProvider = CryptoProvider;
Stripe.StripeContext = StripeContext;
Stripe.errors = Error_exports;
Stripe.Decimal = Decimal;
Stripe._requestSenderFactory = defaultRequestSenderFactory;
Stripe.initialize(new NodePlatformFunctions());
let cached = null;
function getStripe() {
	if (cached) return cached;
	const key = process.env.STRIPE_SECRET_KEY;
	if (!key) throw new Error("Stripe no está configurado (falta STRIPE_SECRET_KEY).");
	cached = new Stripe(key);
	return cached;
}
function baseUrl() {
	if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return "http://localhost:3000";
}
async function createCheckoutSession(input) {
	const stripe = getStripe();
	const root = baseUrl();
	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		line_items: [{
			quantity: 1,
			price_data: {
				currency: "usd",
				unit_amount: toUsdCents(input.amount),
				product_data: { name: input.description }
			}
		}],
		metadata: input.metadata,
		success_url: `${root}${input.successPath}`,
		cancel_url: `${root}${input.cancelPath}`
	}, { idempotencyKey: input.idempotencyKey });
	return {
		id: session.id,
		url: session.url
	};
}
const ARS_PER_USD = 1050;
function toUsdCents(ars) {
	const usd = ars / ARS_PER_USD;
	return Math.max(50, Math.round(usd * 100));
}
var pay_multa_exports = __exportAll({ default: () => pay_multa_default });
var pay_multa_default = defineTool({
	description: "Paga una multa/infracción por su id. El monto lo determina el servidor desde la base de datos (aplica descuento por pago voluntario si sigue vigente). Requiere confirmación humana antes de cobrar.",
	inputSchema: object({ multaId: string().describe("Id de la multa a pagar (de list_multas o scan_gmail_multas)") }),
	approval: always(),
	async execute({ multaId }) {
		const multa = await getMultaById(multaId);
		if (!multa) return {
			ok: false,
			message: "No encontré esa multa."
		};
		if (multa.status === "pagada") return {
			ok: false,
			message: "Esa multa ya figura como pagada."
		};
		const today = new Date().toISOString().slice(0, 10);
		const discountValid = multa.discount_amount != null && multa.discount_until != null && multa.discount_until >= today;
		const amount = discountValid ? Number(multa.discount_amount) : Number(multa.amount);
		const idempotencyKey = `multa:${multa.id}`;
		const checkout = await createCheckoutSession({
			description: `Multa ${multa.code ?? multa.id} - ${multa.plate}`,
			amount,
			successPath: `/multas?paid=${multa.id}`,
			cancelPath: `/multas?canceled=${multa.id}`,
			metadata: {
				kind: "multa",
				multaId: multa.id,
				plate: multa.plate
			},
			idempotencyKey
		});
		await recordPayment({
			kind: "multa",
			referenceId: multa.id,
			plate: multa.plate,
			amount,
			status: "paid",
			stripeSessionId: checkout.id,
			idempotencyKey
		});
		await markMultaPaid(multa.id);
		return {
			ok: true,
			multaId: multa.id,
			code: multa.code,
			plate: multa.plate,
			amountPaid: amount,
			amountPaidLabel: formatARS(amount),
			discountApplied: discountValid,
			checkoutUrl: checkout.url,
			message: `Pago realizado: ${formatARS(amount)} por la multa ${multa.code ?? multa.id}. La infracción quedó como pagada.`
		};
	}
});
var pay_patente_exports = __exportAll({ default: () => pay_patente_default });
var pay_patente_default = defineTool({
	description: "Paga la patente de un vehículo identificado por su patente/dominio. El monto adeudado lo determina el servidor desde la base de datos. Requiere confirmación humana antes de cobrar.",
	inputSchema: object({ plate: string().min(3).describe("Número de patente / dominio del vehículo a pagar") }),
	approval: always(),
	async execute({ plate }) {
		const vehicle = await findVehicleByPlate(plate);
		if (!vehicle) return {
			ok: false,
			message: `No encontré un vehículo con la patente ${plate}.`
		};
		if (vehicle.patente_status === "al_dia" || Number(vehicle.patente_amount_due) <= 0) return {
			ok: false,
			message: "La patente ya está al día, no hay saldo pendiente."
		};
		const amount = Number(vehicle.patente_amount_due);
		const idempotencyKey = `patente:${vehicle.id}:${vehicle.patente_period ?? "actual"}`;
		const checkout = await createCheckoutSession({
			description: `Patente ${vehicle.plate} - ${vehicle.patente_period ?? "período actual"}`,
			amount,
			successPath: `/patente?paid=${vehicle.id}`,
			cancelPath: `/patente?canceled=${vehicle.id}`,
			metadata: {
				kind: "patente",
				vehicleId: vehicle.id,
				plate: vehicle.plate
			},
			idempotencyKey
		});
		await recordPayment({
			kind: "patente",
			referenceId: vehicle.id,
			plate: vehicle.plate,
			amount,
			status: "paid",
			stripeSessionId: checkout.id,
			idempotencyKey
		});
		await markVehiclePatentePaid(vehicle.id);
		return {
			ok: true,
			plate: vehicle.plate,
			period: vehicle.patente_period,
			amountPaid: amount,
			amountPaidLabel: formatARS(amount),
			checkoutUrl: checkout.url,
			message: `Pago realizado: ${formatARS(amount)} por la patente ${vehicle.plate}. La patente quedó al día.`
		};
	}
});
function gmailConfigured() {
	return Boolean(process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN);
}
const DEMO_INBOX = [{
	emailId: "gmail-demo-101",
	plate: "AB123CD",
	code: "ACTA-2026-01120",
	description: "Circular sin luces bajas encendidas en autopista",
	location: "Autopista 25 de Mayo, altura Boedo",
	infractionDate: "2026-01-25",
	amount: 54e3,
	discountUntil: "2026-02-20",
	discountAmount: 27e3,
	from: "notificaciones@infracciones.gob.ar",
	subject: "Nueva infracción registrada - Dominio AB123CD",
	receivedAt: "2026-01-27T09:12:00Z"
}, {
	emailId: "gmail-demo-102",
	plate: "AD789GH",
	code: "ACTA-2026-00890",
	description: "Uso de teléfono celular al conducir",
	location: "Av. Del Libertador y Dorrego, CABA",
	infractionDate: "2026-01-18",
	amount: 72e3,
	discountUntil: "2026-02-10",
	discountAmount: 36e3,
	from: "notificaciones@infracciones.gob.ar",
	subject: "Nueva infracción registrada - Dominio AD789GH",
	receivedAt: "2026-01-19T14:40:00Z"
}];
async function getAccessToken() {
	const res = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: process.env.GMAIL_CLIENT_ID,
			client_secret: process.env.GMAIL_CLIENT_SECRET,
			refresh_token: process.env.GMAIL_REFRESH_TOKEN,
			grant_type: "refresh_token"
		})
	});
	if (!res.ok) throw new Error(`Gmail OAuth falló: ${res.status} ${await res.text()}`);
	return (await res.json()).access_token;
}
function decodeBody(data) {
	if (!data) return "";
	return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}
function extractText(payload) {
	if (!payload) return "";
	if (payload.body?.data) return decodeBody(payload.body.data);
	for (const part of payload.parts ?? []) {
		const text = extractText(part);
		if (text) return text;
	}
	return "";
}
function parseInfractionText(text) {
	const plate = text.match(/\b([A-Z]{2}\s?\d{3}\s?[A-Z]{2}|[A-Z]{3}\s?\d{3})\b/i)?.[1];
	const code = text.match(/ACTA[-\s]?[\d-]+/i)?.[0];
	const amount = text.match(/\$\s?([\d.]+)/)?.[1];
	return {
		plate: plate ? plate.toUpperCase().replace(/\s/g, "") : void 0,
		code: code ?? void 0,
		amount: amount ? Number(amount.replace(/\./g, "")) : void 0
	};
}
async function fetchMultaEmails() {
	if (!gmailConfigured()) return DEMO_INBOX;
	const token = await getAccessToken();
	const listRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent("subject:(infracción OR multa OR acta) newer_than:180d")}&maxResults=25`, { headers: { Authorization: `Bearer ${token}` } });
	if (!listRes.ok) throw new Error(`Gmail list falló: ${listRes.status}`);
	const list = await listRes.json();
	const out = [];
	for (const { id } of list.messages ?? []) {
		const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`, { headers: { Authorization: `Bearer ${token}` } });
		if (!msgRes.ok) continue;
		const msg = await msgRes.json();
		const headers = msg.payload?.headers ?? [];
		const subject = headers.find((h) => h.name.toLowerCase() === "subject")?.value ?? "";
		const from = headers.find((h) => h.name.toLowerCase() === "from")?.value ?? "";
		const parsed = parseInfractionText(`${subject}\n${extractText(msg.payload)}`);
		if (!parsed.plate || !parsed.amount) continue;
		out.push({
			emailId: msg.id,
			plate: parsed.plate,
			code: parsed.code ?? `ACTA-${msg.id.slice(0, 8)}`,
			description: subject || "Infracción de tránsito",
			location: null,
			infractionDate: msg.internalDate ? new Date(Number(msg.internalDate)).toISOString().slice(0, 10) : null,
			amount: parsed.amount,
			discountUntil: null,
			discountAmount: null,
			from,
			subject,
			receivedAt: msg.internalDate ? new Date(Number(msg.internalDate)).toISOString() : new Date().toISOString()
		});
	}
	return out;
}
var scan_gmail_multas_exports = __exportAll({ default: () => scan_gmail_multas_default });
var scan_gmail_multas_default = defineTool({
	description: "Revisa la casilla de Gmail conectada en busca de emails de infracciones/multas nuevas, las parsea y registra las que no estén cargadas todavía. Devuelve las multas nuevas encontradas. Usar cuando el usuario pide 'revisar el mail' o 'buscar multas nuevas'.",
	inputSchema: object({ plate: string().optional().describe("Opcional: filtrar por una patente específica. Si se omite, revisa todas.") }),
	async execute({ plate }) {
		const db = getDb();
		const emails = await fetchMultaEmails();
		const target = plate ? plate.toUpperCase().replace(/[\s-]/g, "") : null;
		const relevant = target ? emails.filter((e) => e.plate.toUpperCase().replace(/[\s-]/g, "") === target) : emails;
		const newlyRegistered = [];
		for (const email of relevant) {
			const { data: existing } = await db.from("multas").select("id").eq("email_id", email.emailId).maybeSingle();
			if (existing) continue;
			const { error } = await db.from("multas").insert({
				plate: email.plate,
				code: email.code,
				description: email.description,
				location: email.location,
				infraction_date: email.infractionDate,
				amount: email.amount,
				status: "pendiente",
				source: "email",
				email_id: email.emailId,
				discount_until: email.discountUntil,
				discount_amount: email.discountAmount
			});
			if (error) continue;
			newlyRegistered.push({
				code: email.code,
				plate: email.plate,
				description: email.description,
				amount: email.amount,
				discountAmount: email.discountAmount,
				discountUntil: email.discountUntil
			});
		}
		return {
			gmailConnected: gmailConfigured(),
			mode: gmailConfigured() ? "gmail" : "demo",
			scanned: relevant.length,
			newCount: newlyRegistered.length,
			newMultas: newlyRegistered,
			note: gmailConfigured() ? void 0 : "Gmail no está conectado: se usó una bandeja de demostración. Configurá GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN para leer tu casilla real."
		};
	}
});
const moduleMap = Object.freeze({ "nodes": Object.freeze({ "__root__": Object.freeze({ "modules": Object.freeze({
	"agent.ts": agent_exports,
	"channels/eve.ts": eve_exports,
	"tools/get_patente_status.ts": get_patente_status_exports,
	"tools/list_multas.ts": list_multas_exports,
	"tools/pay_multa.ts": pay_multa_exports,
	"tools/pay_patente.ts": pay_patente_exports,
	"tools/scan_gmail_multas.ts": scan_gmail_multas_exports
}) }) }) });
export { moduleMap as default, moduleMap };
