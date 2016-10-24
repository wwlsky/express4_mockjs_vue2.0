var Mock = require('mockjs');

function list() {
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-5': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            first: '@FIRST',
            last: '@LAST',
            full: '@first @last',
            date: '@DATE'
        }]
    });
    return data;
};

function test() {
    var data = Mock.mock({
        'tests|8': [{
            guid: '@guid',
            image: '@image',
            title: '@ctitle(5,10)',
            text: '@cparagraph',
            date: '@date(yyyy-MM-dd)',
            address: {
                region: '@region',
                province: '@province',
                city: '@city',
                county: '@county',
                zip: '@zip'
            }
        }]
    });
    return data;
}

module.exports = {
    list: list,
    test: test
};