var NUMBER_OF_PRODUCTS = 26;//products +1
var obj = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));

function ChatTree() {
    var node = new Node('root', "which category?");
    this._root = node;
}
function Node(data, msg) {
    this.data = data;
    this.msg = msg;
    this.parent = null;
    this.children = [];
}
var current_level = 1;
var lastkeyword = '';
function respondAdvanced(input) {
    var mySet = new Set();
    console.log(current_level);
    console.log(input);
    console.log(lastkeyword);
    if (current_level == 1) {
        for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
            product = obj['products'][i];
            mySet.add(product.category);
        }
        lastkeyword = input;
        message = 'user: ' + input + '\nbot: ' + JSON.stringify(Array.from(mySet)) + '\n';
        writeToFileAsync(conversation_log_file, message);
        if(mySet.size!=0)
        current_level = 2;
        return 'which category? \n' + JSON.stringify(Array.from(mySet));
    }else if (current_level == 2) {
        for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
            product = obj['products'][i];
            if (product.category.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            mySet.add(product.brand);
            }
        }
        lastkeyword = input;
        message = 'user: ' + input + '\nbot: ' + JSON.stringify(Array.from(mySet)) + '\n';
        writeToFileAsync(conversation_log_file, message);
        if(mySet.size!=0)
        current_level = 3;
        return 'which brand? \n' + JSON.stringify(Array.from(mySet));
    }else if (current_level == 3) {
        for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
            product = obj['products'][i];
            if (product.brand.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            mySet.add(product.product_name);
            }
        }
        lastkeyword = input;
        message = 'user: ' + input + '\nbot: ' + JSON.stringify(Array.from(mySet)) + '\n';
        writeToFileAsync(conversation_log_file, message);
        if(mySet.size!=0)
        current_level = 4;
        return 'which one? \n' + JSON.stringify(Array.from(mySet));
    }else if (current_level == 4) {
        for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
            product = obj['products'][i];
            if (product.product_name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            mySet.add(product);
            }
        }
        lastkeyword = input;
        message = 'user: ' + input + '\nbot: ' + JSON.stringify(Array.from(mySet)) + '\n';
        writeToFileAsync(conversation_log_file, message);
        if(mySet.size!=0)
        current_level = 1;
        return 'Check those: \n' + JSON.stringify(Array.from(mySet));
    }
}
/*
building chat tree
not completed yet
*/
function productsUtility() {
    var chatTree = new ChatTree();
    //level one: category
    //level two: brand
    //level three: price
    //level four: name
    var obj = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
    var categories = new Set();
    var brands = new Set();
    var prices = new Set('+50', '-50');
    for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
        product = obj['products'][i];
        categories.add(product.category);
    }
    for (i = 1; i < categories.size(); i++) {
        chatTree._root.children.add(new Node(categories[i], 'which brand?'));
    }
    for (i = 1; i < categories.size(); i++) {
        chatTree._root.children.add(categories[i]);
    }
}

/*
products helper
author: Mouaz
date: 16/1/2018
*/
function getProductById(id) {
    return obj['products'][id];
}
function getProductByName(name, multiple) {
    result = []
    for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
        product = obj['products'][i];
        if (product.product_name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
            if (multiple)
                result.push(product);
            else
                return product;
        }
    }
    return result;
}
function getProductByBrand(brand, multiple) {
    result = []
    for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
        product = obj['products'][i];
        if (product.brand.toLowerCase().indexOf(brand.toLowerCase()) > -1) {
            if (multiple)
                result.push(product);
            else
                return product;
        }
    }
    return result;
}
function getProductByCategory(category, multiple) {
    result = []
    for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
        product = obj['products'][i];
        if (product.category.toLowerCase().indexOf(category.toLowerCase()) > -1) {
            if (multiple)
                result.push(product);
            else
                return product;
        }
    }
    return result;
}
function getProductBySubscriptionRange(minimum, maximum, multiple) {
    result = []
    for (i = 1; i < NUMBER_OF_PRODUCTS; i++) {
        product = obj['products'][i];
        if (minimum < product.subscription_plan_price
            && product.subscription_plan_price < maximum) {
            if (multiple)
                result.push(product);
            else
                return product;
        }
    }
    return result;
}
/*
author:Mouaz
in logging we usually use 
*/
function writeToFileAsync(file, message) {
    var fs = require('fs');
    fs.appendFile(file, message, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}
/*
copied from stackoverflow
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}