require('./database');
var cookie = require('./cookie.jsx');

var koa = require('koa');
var koaBody = require('koa-body')();
var router = require('koa-router')();
var mongoose = require('mongoose');
var Todolist = mongoose.model('Todolist');
var Todo = mongoose.model('Todo');

var app = new koa();
app.use(koaBody);
app.use(cookie);

// 获取所有todolists
router.get('/api/todolist', function *(next) {
    let user_id =
        this.cookies ?
            this.cookies.get('cookieID') : undefined;

    let todolists = yield Todolist
        .find({ user_id: user_id })
        .sort('-created');
    this.body = todolists;
});

// 新建列表
router.post('/api/createlist', function *(next) {
    let user_id =
        this.cookies ?
            this.cookies.get('cookieID') : undefined;

    try {
        yield new Todolist({
            user_id: user_id,
            list_name: this.request.body.list_name
        }).save();
    } catch (e) {
        this.body = {
            errno: 1,
            msg: e
        };
    }

    this.body = {
        errno: 0,
        msg: 'ok'
    };
});

// 列表详情页
router.get('/api/detail/:listname', function *(next) {
    let user_id =
        this.cookies ?
            this.cookies.get('cookieID') : undefined;

    let todos = yield Todo.find({
        user_id: user_id,
        list_name: this.params.listname
    }).sort('-created');

    this.body = todos;
});

// 修改详情页事件状态
router.post('/api/switchstate', function *(next) {
    let user_id =
        this.cookies ?
            this.cookies.get('cookieID') : undefined;

    let is_done = this.request.body.is_not_done === 'false';
    let list_name = this.request.body.list_name;

    try {
        yield Todo.update({
            user_id: user_id,
            list_name: list_name,
            item_name: this.request.body.item_name
        },{
            finished: is_done
        });

        let result = yield Todo.find({
            user_id: user_id,
            list_name: list_name,
            finished: false
        }).sort('deadline').limit(1);

        yield Todolist.update({
                user_id: user_id,
                list_name: list_name,
            }, {
                '$inc': {finished_item_count: (is_done ? 1 : -1)},
                nearest_deadline: (result.length ? result[0].deadline : null)
            });
    } catch (e) {
        this.body = {
            errno: 1,
            msg: e
        };
    }

    this.body = {
        errno: 0,
        msg: 'ok'
    };
});

// 详情页添加
router.post('/api/detailadd', function *(next) {
    let user_id =
        this.cookies ?
            this.cookies.get('cookieID') : undefined;

    try {
        let todo = yield new Todo({
            user_id: user_id,
            list_name: this.request.body.list_name,
            item_name: this.request.body.item_name,
            deadline: this.request.body.deadline
        }).save();

        let result = yield Todo.find({
            user_id: user_id,
            list_name: todo.list_name,
            finished: false
        }).sort('deadline').limit(1);

        yield Todolist.update({
            user_id: user_id,
            list_name: todo.list_name
        },{
            '$inc': {item_count: 1},
            nearest_deadline: result[0].deadline
        });
    } catch (e) {
        this.body = {
            errno: 1,
            msg: e
        };
    }

    this.body = {
        errno: 0,
        msg: 'ok'
    };
});

// 搜索详情
router.get('/api/search/:keyword', function *(next) {
    let user_id =
        this.cookies ?
            this.cookies.get('cookieID') : undefined;

    let query = new RegExp(this.params.keyword);

    try {
        let todos = yield Todo.find({
            user_id: user_id,
            item_name: query
        }).sort('-created');

        let lists = yield Todolist.find({
            user_id: user_id,
            list_name: query
        }).sort('-created');

        this.body = {
            list: lists,
            item: todos
        };
    } catch (e) {
        this.body = {
            list: [],
            item: []
        };
    }
});

// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
