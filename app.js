import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

const generateTestArray = () => {
    const result = [];
    for (let i = 0; i < 1000000; ++i) {
        result.push({
            a: i,
            b: i / 2,
            r: 0,
        });
    }
    return result;
};

const array = generateTestArray();

// --- for

router.get("/for/arrayForEach", (ctx) => {
    array.forEach((x) => {
        x.r = x.a + x.b;
    });
    ctx.body = "done";
});

router.get("/for/forOf", (ctx) => {
    for (const obj of array) {
        obj.r = obj.a + obj.b;
    }
    ctx.body = "done";
});

router.get("/for/forArrayLengthIndexing", (ctx) => {
    for (let i = 0; i < array.length; ++i) {
        array[i].r = array[i].a + array[i].b;
    }
    ctx.body = "done";
});

router.get("/for/forLenIndexing", (ctx) => {
    const len = array.length;
    for (let i = 0; i < len; ++i) {
        array[i].r = array[i].a + array[i].b;
    }
    ctx.body = "done";
});

router.get("/for/forArrayLengthTmpElement", (ctx) => {
    for (let i = 0; i < array.length; ++i) {
        const x = array[i];
        x.r = x.a + x.b;
    }
    ctx.body = "done";
});

router.get("/for/forLenTmpElement", (ctx) => {
    const len = array.length;
    for (let i = 0; i < len; ++i) {
        const x = array[i];
        x.r = x.a + x.b;
    }
    ctx.body = "done";
});

// --- map

router.get("/map/arrayMap", (ctx) => {
    const r = array.map((x) => x.a + x.b);
    ctx.body = "done";
});

router.get("/map/arrayMmapDestructuring", (ctx) => {
    const r = array.map(({ a, b }) => a + b);
    ctx.body = "done";
});

router.get("/map/forOf", (ctx) => {
    const result = [];
    for (const obj of array) {
        result.push(obj.a + obj.b);
    }
    ctx.body = "done";
});

router.get("/map/forOfDestructuring", (ctx) => {
    const result = [];
    for (const { a, b } of array) {
        result.push(a + b);
    }
    ctx.body = "done";
});

router.get("/map/forInitArray", (ctx) => {
    const result = new Array(array.length);
    for (let i = 0; i < array.length; ++i) {
        result[i] = array[i].a + array[i].b;
    }
    ctx.body = "done";
});

// --- reduce

router.get("/reduce/arrayReduce", (ctx) => {
    const r = array.reduce((p, x) => p + x.a + x.b, 0);
    ctx.body = "done";
});

router.get("/reduce/arrayReduceDestructuring", (ctx) => {
    const r = array.reduce((p, { a, b }) => p + a + b, 0);
    ctx.body = "done";
});

router.get("/reduce/forOf", (ctx) => {
    let result = 0;
    for (const { a, b } of array) {
        result += a + b;
    }
    ctx.body = "done";
});

router.get("/reduce/for", (ctx) => {
    let result = 0;
    for (let i = 0; i < array.length; ++i) {
        result += array[i].a + array[i].b;
    }
    ctx.body = "done";
});

app.use(router.routes());

app.listen(3000);