var fs = require('fs');
var NUMBER_OF_PRODUCTS = 26;//products +1
var obj = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
var conversation_log_file;
greetings = false;
current_type = -1;
console.log('Say Hi to get started');
var stdin = process.openStdin();

//console.log(getProductBySubscriptionRange(10,100));

stdin.addListener('data', function (d) {

    var input = d.toString().trim();
    //console.log(obj['questionsAndAnswers']);

    answered = false;


    // console.log(qa);
    // console.log(qa.q);
    //console.log(current_type);
    if (current_type != -1) {

        if (input.indexOf('search') > -1) {
            answer = obj['questionsAndAnswers'][3].a;
            console.log(answer);
            message = 'user: ' + input + '\nbot: ' + answer + '\n';
            current_type = 3;
            writeToFileAsync(conversation_log_file, message);
            answered = true;
        } else
            if (current_type == 3) {
                answered = true;
                current_type = 2;
                s_r_arr = []
                s_r_arr = s_r_arr.concat(getProductByName(input, true));
                s_r_arr = s_r_arr.concat(getProductByBrand(input, true));
                s_r_arr = s_r_arr.concat(getProductByCategory(input, true));
                search_results = new Set(s_r_arr);
                answer = obj['questionsAndAnswers'][4].a + "\n" + s_r_arr;
                console.log(obj['questionsAndAnswers'][4].a);
                console.log(search_results);
                message = 'user: ' + input + '\nbot: ' + answer + '\n';
                writeToFileAsync(conversation_log_file, message);
            }
            else if (input.indexOf('product') > -1) {
                answer = obj['questionsAndAnswers'][3].a;
                console.log(answer);
                message = 'user: ' + input + '\nbot: ' + answer + '\n';
                current_type = 4;
                writeToFileAsync(conversation_log_file, message);
                answered = true;
            } else
                if (current_type == 4) {
                    answered = true;
                    current_type = 2;
                    s_r_arr = []
                    s_r_arr = s_r_arr.concat(getProductByName(input, true));
                    search_results = new Set(s_r_arr);
                    answer = obj['questionsAndAnswers'][4].a + "\n" + s_r_arr;
                    console.log(obj['questionsAndAnswers'][4].a);
                    console.log(search_results);
                    message = 'user: ' + input + '\nbot: ' + answer + '\n';
                    writeToFileAsync(conversation_log_file, message);
                } else if (input.indexOf('brand') > -1) {
                    answer = obj['questionsAndAnswers'][3].a;
                    console.log(answer);
                    message = 'user: ' + input + '\nbot: ' + answer + '\n';
                    current_type = 5;
                    writeToFileAsync(conversation_log_file, message);
                    answered = true;
                } else
                    if (current_type == 5) {
                        answered = true;
                        current_type = 2;
                        s_r_arr = []
                        s_r_arr = s_r_arr.concat(getProductByBrand(input, true));
                        search_results = new Set(s_r_arr);
                        answer = obj['questionsAndAnswers'][4].a + "\n" + s_r_arr;
                        console.log(obj['questionsAndAnswers'][4].a);
                        console.log(search_results);
                        message = 'user: ' + input + '\nbot: ' + answer + '\n';
                        writeToFileAsync(conversation_log_file, message);
                    } else if (input.indexOf('category') > -1) {
                        answer = obj['questionsAndAnswers'][3].a;
                        console.log(answer);
                        message = 'user: ' + input + '\nbot: ' + answer + '\n';
                        current_type = 6;
                        writeToFileAsync(conversation_log_file, message);
                        answered = true;
                    } else
                        if (current_type == 6) {
                            answered = true;
                            current_type = 2;
                            s_r_arr = []
                            s_r_arr = s_r_arr.concat(getProductByCategory(input, true));
                            search_results = new Set(s_r_arr);
                            answer = obj['questionsAndAnswers'][4].a + "\n" + s_r_arr;
                            console.log(obj['questionsAndAnswers'][4].a);
                            console.log(search_results);
                            message = 'user: ' + input + '\nbot: ' + answer + '\n';
                            writeToFileAsync(conversation_log_file, message);
                        } else if (input.indexOf('price') > -1) {
                            answer = obj['questionsAndAnswers'][5].a;
                            console.log(answer);
                            message = 'user: ' + input + '\nbot: ' + answer + '\n';
                            current_type = 7;
                            writeToFileAsync(conversation_log_file, message);
                            answered = true;
                        } else
                            if (current_type == 7) {
                                answered = true;
                                current_type = 2;
                                s_r_arr = []
                                s_r_arr = s_r_arr.concat(getProductBySubscriptionRange(input - 10, input + 10, true));
                                search_results = new Set(s_r_arr);
                                answer = obj['questionsAndAnswers'][4].a + "\n" + s_r_arr;
                                console.log(obj['questionsAndAnswers'][4].a);
                                console.log(search_results);
                                message = 'user: ' + input + '\nbot: ' + answer + '\n';
                                writeToFileAsync(conversation_log_file, message);
                            }
    } else
        obj['questionsAndAnswers'].forEach(qa => {
            if (qa.q.indexOf(input) > -1 && !answered) {



                if (qa.type == 1) {
                    console.log(qa.a);
                    answered = true;
                    greetings = true;
                    conversation_log_file = 'conversation_logs\\conv_' + new Date().toLocaleDateString() + '.log';
                    //+ '_' + new Date().toLocaleTimeString().replace(/[&\/\\#,+()$~%.'':*?<>{}]/g, '_') + '.log';
                    message = 'user: ' + input + '\nbot: ' + qa.a + '\n';
                    current_type = 1;
                    writeToFileAsync(conversation_log_file, message);
                }
            }
        });

    i = getRandomInt(1, 3)
    if (!answered) {
        if (i % 2 == 0) {
            console.log('Pardon my stupidity, try with different keywords ');
        }
        else
            console.log('I don\'t get it, kindly say something different');
        if (current_type == 2) {
            console.log(obj['questionsAndAnswers'][0].a);
            answered = true;
            greetings = true;
            message = 'user: ' + input + '\nbot: ' + obj['questionsAndAnswers'][0].a + '\n';
            current_type = 2;
            writeToFileAsync(conversation_log_file, message);
        }
    }
});

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